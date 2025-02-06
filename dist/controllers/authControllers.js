import sequelize from '../db/index.js';
export const verifyAuthorisation = async (req, res) => {
    try {
        const { isOwner, person_email, person_pass_hash } = req.body;
        // console.log("fname "+fname+" lname "+lname+" phone "+phone+" address "+address+" roles "+roles);
        const toVerifyPerson = await sequelize.query("select * from authorisation where person_email=?", {
            replacements: [person_email]
        });
        console.log("type ", typeof (toVerifyPerson[0][0]));
        const person = toVerifyPerson[0][0];
        // if(person?.person_pass_hash==)
        console.log("verifiedPen ", person);
        res.json({ message: "ok" });
        // const postUser = await sequelize.query("insert into person (fname,lname,phone,address,roles) values (?,?,?,?,?) returning",{
        //     replacements:[fname,lname,phone,address,roles]
        // });
        // console.log("postUserController ",postUser);
        // res.json(postUser);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};
