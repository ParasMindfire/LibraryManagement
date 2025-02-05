import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
const LibraryTable = sequelize.define('LibraryTable', {
    library_ID: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    library_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'library_table',
    timestamps: false
});
export default LibraryTable;
// association.js
// import LibraryTable from './LibraryTable.js';
// import OwnerAuth from './OwnerAuth.js';
// import Authorisation from './Authorisation.js';
// import Person from './Person.js';
// // 📌 One Library has One Owner
// LibraryTable.hasOne(OwnerAuth, { foreignKey: 'owner_id', onDelete: 'CASCADE' });
// OwnerAuth.belongsTo(LibraryTable, { foreignKey: 'owner_id' });
// // 📌 Optional: If you want a relation between Authorisation and Person
// Authorisation.belongsTo(Person, { foreignKey: 'person_email', targetKey: 'phone' });
// export { LibraryTable, OwnerAuth, Authorisation, Person };
// const initDB = async () => {
//     try {
//       await sequelize.authenticate();
//       console.log('✅ Database connected successfully.');
//       await sequelize.sync({ alter: true }); // ❗ Use `alter: true` for production-safe updates
//       console.log('✅ All tables synced successfully.');
//     } catch (error) {
//       console.error('❌ Error connecting to the database:', error);
//     }
//   };
//   initDB(); // Call function to connect DB & sync
