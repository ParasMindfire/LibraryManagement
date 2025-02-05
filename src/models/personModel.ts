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
    unique: true,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  roles: {
    type: DataTypes.ENUM('admin', 'librarian', 'reader'),
    allowNull: false,
    defaultValue: 'reader',
  },
}, {
  tableName: 'person',
  timestamps: false
});

export default Person;