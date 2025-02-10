import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import Person from './personModel.js';
import Books from './booksModel.js';
const Borrowing = sequelize.define('Borrowing', {
    borrowing_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    librarian_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Person,
            key: 'person_id',
        },
        onDelete: 'CASCADE',
    },
    reader_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Person,
            key: 'person_id',
        },
        onDelete: 'CASCADE',
    },
    book_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Books,
            key: 'book_id',
        },
        onDelete: 'CASCADE',
    },
    borrow_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    fine_id: {
        type: DataTypes.INTEGER,
        defaultValue: -1,
    },
    status: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 'borrowed',
    }
}, {
    tableName: 'borrowing',
    timestamps: false
});
export default Borrowing;
