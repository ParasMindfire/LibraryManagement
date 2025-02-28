import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const Person = sequelize.define('Person', {
  person_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  fname: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  lname: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING(255),
    // unique: true,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  roles: {
    type: DataTypes.STRING(255),
    allowNull: false,
    defaultValue: 'reader',
  },
  person_email: {
    type: DataTypes.STRING(255),
    // unique: true,
    defaultValue: 'N/A',
  },
  library_name:{
    type:DataTypes.STRING(255),
    defaultValue: 'N/A',
  }
}, {
  tableName: 'person',
  timestamps: false
});

export default Person;