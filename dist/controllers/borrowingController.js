import sequelize from '../db/index.js';
export const getAllBorrowings = async (req, res) => {
    const [borrowings] = await sequelize.query("SELECT * from borrowing");
    return res.status(200).json({ borrowings: borrowings });
};
export const getAllfines = async (req, res) => {
    try {
        const [getAllFines] = await sequelize.query("select * from fine");
        return res.status(200).json({ getAllBooks: getAllFines });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const assignBooks = async (req, res) => {
    try {
        const { librarian_id, reader_id, book_id } = req.body;
        if (!librarian_id || !reader_id || !book_id) {
            return res.status(400).json({ message: 'All Borrowing fields are required' });
        }
        const [assignResult] = await sequelize.query("INSERT INTO borrowing (librarian_id, reader_id, book_id, borrow_date, due_date) VALUES (?, ?, ?, CURDATE(), ADDDATE(CURDATE(),interval 14 day)) ", { replacements: [librarian_id, reader_id, book_id] });
        if (!assignResult || assignResult.length === 0) {
            return res.status(500).json({ error: "Error creating books" });
        }
        res.status(201).json({ message: 'Borrowings entered successfully', assignResult: assignResult });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const checkDefaulters = async (req, res) => {
    try {
        const [defaulters] = await sequelize.query("SELECT * FROM borrowing WHERE CURDATE() > due_date AND fine_id = -1");
        console.log("defaulters ", defaulters);
        if (!defaulters || defaulters.length === 0) {
            return res.status(404).json({ message: "No defaulters detected." });
        }
        for (const defaulter of defaulters) {
            const borrowing_id = defaulter.borrowing_id;
            const reader_id = defaulter.reader_id;
            const fine_amount = 100;
            console.log(reader_id + " " + fine_amount + " " + "pending");
            const [result] = await sequelize.query("INSERT INTO fine (reader_id, amount, status) VALUES (?, ?, ?)", {
                replacements: [reader_id, fine_amount, 'pending'],
            });
            console.log("result ", result);
            const fine_id = result;
            console.log("fine id ", result.fine_id);
            await sequelize.query("UPDATE borrowing SET fine_id = ? WHERE borrowing_id = ?", {
                replacements: [fine_id, borrowing_id],
            });
        }
        res.status(200).json({ message: 'Defaulters processed successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const updateFines = async (req, res) => {
    try {
        const [defaultersWithFine] = await sequelize.query("SELECT * FROM borrowing WHERE fine_id != -1");
        if (!defaultersWithFine || defaultersWithFine.length === 0) {
            return res.status(404).json({ message: "No defaulters with pending fines." });
        }
        for (const defaulter of defaultersWithFine) {
            const borrowing_id = defaulter.borrowing_id;
            const fine_id = defaulter.fine_id;
            const [fineRecord] = await sequelize.query("SELECT amount FROM fine WHERE fine_id = ? AND status = 'pending'", {
                replacements: [fine_id],
            });
            if (fineRecord && fineRecord.length > 0) {
                const currentFine = fineRecord[0].amount;
                const newFineAmount = currentFine + 100;
                await sequelize.query("UPDATE fine SET amount = ? WHERE fine_id = ?", {
                    replacements: [newFineAmount, fine_id],
                });
            }
        }
        res.status(200).json({ message: 'Fines updated successfully' });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
