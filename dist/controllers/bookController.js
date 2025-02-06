import sequelize from "../db/index.js";
export const getAllBooks = async (req, res) => {
    const [books] = await sequelize.query("SELECT * from books");
    return res.status(200).json({ books: books });
};
export const createBooks = async (req, res) => {
    try {
        const { title, author, genre, ISBN, total_copies } = req.body;
        if (!title || !author || !genre || !ISBN || !total_copies) {
            return res.status(400).json({ message: 'All Books fields are required' });
        }
        const [bookResult] = await sequelize.query("INSERT INTO books (title, author, genre, isbn, total_copies) VALUES (?, ?, ?, ?, ?) ", { replacements: [title, author, genre, ISBN, total_copies] });
        if (!bookResult || bookResult.length === 0) {
            return res.status(500).json({ error: "Error creating books" });
        }
        res.status(201).json({ message: 'Books entered successfully', bookResult: bookResult });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
export const updateBooks = async (req, res) => {
    try {
        const { email } = req.body.auth;
        const [validPerson] = await sequelize.query("select roles from person where person_email=?", { replacements: [email] });
        console.log("valid person ", validPerson);
        if (!validPerson || validPerson.length === 0) {
            return res.status(500).json({ error: "Error creating validPerson" });
        }
        const { copies, isbn } = req.body;
        if (!copies) {
            return res.status(400).json({ message: 'Update Books Field is Missing' });
        }
        const [updatedBook] = await sequelize.query("UPDATE books SET total_copies=? where isbn=?", { replacements: [copies, isbn] });
        if (!updatedBook || updatedBook.length === 0) {
            return res.status(500).json({ error: "Error updating books" });
        }
        res.status(201).json({ message: 'Books updated successfully', updatedBook: updatedBook });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};
