import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import Person from './personModel.js';


const Authorisation = sequelize.define('Authorisation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  isOwner: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  person_email: {
    type: DataTypes.STRING(255),
    defaultValue: 'N/A',
    references: {
      model: Person,
      key: 'person_email',
    },
    onDelete: 'CASCADE',
  },
  person_pass_hash: {
    type: DataTypes.STRING(255),
    // unique: true,
    defaultValue: 'N/A',
  },
}, {
  tableName: 'authorisation',
  timestamps: false
});


export default Authorisation;