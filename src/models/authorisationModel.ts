import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const Authorisation = sequelize.define('Authorisation', {
  auth_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  isOwner: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  person_email: {
    type: DataTypes.STRING(255),
    // unique: true,
    defaultValue: 'N/A',
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