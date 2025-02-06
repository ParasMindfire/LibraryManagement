import sequelize from '../db/index.js';
export const postUsers = async (req, res) => {
    try {
        const { fname, lname, phone, address, roles } = req.body;
        // console.log("fname "+fname+" lname "+lname+" phone "+phone+" address "+address+" roles "+roles);
        const postUser = await sequelize.query("insert into person (fname,lname,phone,address,roles) values (?,?,?,?,?) returning", {
            replacements: [fname, lname, phone, address, roles]
        });
        console.log("postUserController ", postUser);
        res.json(postUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
export const getPerson = async (req, res) => {
    try {
        const getAllPerson = await sequelize.query("SELECT * FROM person");
        //   console.log("getAllPersonController ",getAllPerson[0]);
        res.json(getAllPerson[0]);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
// export const updatePerson = async (req: Request, res: Response) => {
//     try {
//       const updatePerson = await sequelize.query("SELECT * FROM person");
//     //   console.log("getAllPersonController ",getAllPerson[0]);
//       res.json(getAllPerson[0]);
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
// };
