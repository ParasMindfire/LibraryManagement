import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
const OwnerTable = sequelize.define('OwnerTable', {
    owner_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    owner_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    owner_email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        // unique: true,
    },
    owner_pass_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'owner_table',
    timestamps: false,
});
export default OwnerTable;
