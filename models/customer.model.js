import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';


const Customer = sequelize.define('customer',{
    id_customer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {    
        type: DataTypes.STRING(50),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'customers',
    timestamps: true
});


export default Customer;