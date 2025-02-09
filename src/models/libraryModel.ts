import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import OwnerTable from './ownerAuthModel.js';

const LibraryTable = sequelize.define('LibraryTable', {
  library_id: {
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
    references: {
      model: OwnerTable,
      key: 'owner_id',
    },
    onDelete: 'CASCADE',
  },
}, {
  tableName: 'library_table',
  timestamps: false
});


export default LibraryTable;
