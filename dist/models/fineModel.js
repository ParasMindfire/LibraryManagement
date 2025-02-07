import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import Person from './personModel.js';
const Fine = sequelize.define('Fine', {
    fine_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    reader_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Person,
            key: 'person_id',
        },
        onDelete: 'CASCADE',
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'pending',
    }
}, {
    tableName: 'fine',
    timestamps: false
});
export default Fine;
