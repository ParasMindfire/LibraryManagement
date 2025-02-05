import { DataTypes } from 'sequelize';
import sequelize from '../db/index.js';
import LibraryTable from './libraryModel.js';
const OwnerAuth = sequelize.define('OwnerAuth', {
    owner_auth_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    owner_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        references: {
            model: LibraryTable,
            key: 'owner_id',
        },
        onDelete: 'CASCADE',
    },
    owner_pass_hash: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    owner_email: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
}, {
    tableName: 'owner_auth',
    timestamps: false
});
export default OwnerAuth;
