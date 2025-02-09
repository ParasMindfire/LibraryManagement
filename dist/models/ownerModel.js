"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const index_js_1 = __importDefault(require("../db/index.js"));
const OwnerTable = index_js_1.default.define('OwnerTable', {
    owner_id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    owner_name: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
    owner_email: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
        unique: true,
    },
    owner_pass_hash: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: false,
    },
}, {
    tableName: 'owner_table',
    timestamps: false,
});
exports.default = OwnerTable;
