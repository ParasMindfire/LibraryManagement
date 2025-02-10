import LibraryTable from "./libraryModel.js";
import OwnerTable from "./ownerAuthModel.js";
import Authorisation from "./authorisationModel.js";
import Person from "./personModel.js"
import Books from "./booksModel.js";
import Borrowing from "./borrowingModel.js";
import Fine from "./fineModel.js";

const syncTables=async()=>{
    await OwnerTable.sync({alter: true});
    console.log('OwnerAuth Table synced successfully.');
    
    await LibraryTable.sync({ alter: true });
    console.log('LibraryTable synced successfully.');

    await Person.sync({alter:true});
    console.log('Person Table synced successfully.');

    await Authorisation.sync({alter:true});
    console.log('Authorisation Table synced successfully.');

    await Books.sync({alter:true});
    console.log('Books Table synced successfully. OK ?');

    await Borrowing.sync({alter:true});
    console.log('Borrowing Table synced successfully.');

    await Fine.sync({alter:true});
    console.log('Fine Table synced successfully.');
}

export default syncTables;