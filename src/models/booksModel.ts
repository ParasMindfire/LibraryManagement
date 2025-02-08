import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';

const Books = sequelize.define('Books', {
  book_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  genre: {
    type: DataTypes.STRING(255),
    allowNull: false,
  },
  isbn: {
    type: DataTypes.STRING(255),
    // unique:true,
    allowNull: false,
  },
  total_copies: {
    type: DataTypes.INTEGER,
    defaultValue:0,
  },
}, {
  tableName: 'books',
  timestamps: false
});

export default Books;