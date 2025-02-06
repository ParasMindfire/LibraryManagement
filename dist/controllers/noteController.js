import db from '../db/index.js';
// import { notes } from '../interfaces/notesInterface.js';
// let Notes:notes[]=[];
export const getNotes = async (req, res) => {
    try {
        const helooo = await db.query("SELECT * FROM notes");
        console.log("getNotesController ", helooo);
        res.json(helooo);
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
