import sequelize from '../db/index.js';
export const getLibraries = async (req, res) => {
    try {
        const getAllLibraries = await sequelize.query("SELECT * FROM library_table");
        // console.log("getNotesController ",getAllLibraries[0]);
        res.json(getAllLibraries[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getAllOwners = async (req, res) => {
    try {
        const getAllOwners = await sequelize.query("select * from owner_auth");
        // console.log("getNotesController ",getAllOwners[0]);
        res.json(getAllOwners[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// export const addNotes=async(req:Request,res:Response)=>{
//     try{
//         const comingTitle=req.body.title;
//         const comingContents=req.body.contents;
//         const query = "INSERT INTO notes (title, contents) VALUES (?, ?)";
//         const values=[comingTitle,comingContents];
//         // const result = await pool.query(query, values);
//         const currNote:notes={
//             title:comingTitle,
//             contents:comingContents
//         }
//         Notes.push(currNote);
//         // console.log("curr Notes",currNote);
//         res.status(201).json(Notes);
//     }catch(error){
//         console.error(error);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// }
// export const updateNotes=async(req:)
