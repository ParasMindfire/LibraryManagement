import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js'

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
    // unique: true,
  },
}, {
  tableName: 'library_table',
  timestamps: false
});


export default LibraryTable;















