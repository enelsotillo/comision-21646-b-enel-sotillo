import { sequelize } from "../config/database.js";
import { DataTypes } from "sequelize";

export const taskModel = sequelize.define('tasks', {
    title: {
        type: DataTypes.STRING,
        allowNull: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
    poster: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    timestamps: true
})