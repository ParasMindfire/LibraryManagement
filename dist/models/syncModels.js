import LibraryTable from "./libraryModel.js";
import OwnerAuth from "./ownerAuthModel.js";
import Authorisation from "./authorisationModel.js";
import Person from "./personModel.js";
import Books from "./booksModel.js";
const syncTables = async () => {
    await LibraryTable.sync({ alter: true });
    console.log('LibraryTable synced successfully.');
    await OwnerAuth.sync({ alter: true });
    console.log('OwnerAuth Table synced successfully.');
    await Person.sync({ alter: true });
    console.log('Person Table synced successfully.');
    await Authorisation.sync({ alter: true });
    console.log('Authorisation Table synced successfully.');
    await Books.sync({ alter: true });
    console.log('Books Table synced successfully. OK ?');
};
export default syncTables;
