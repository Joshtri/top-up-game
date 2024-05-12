// Di model Transaction
import { DataTypes } from "sequelize";
import sequelize from '../config/database.js';
import Customer from './customer.model.js'; // Import model Customer

const Transaction = sequelize.define('Transaction',{
    id_transaction: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_gameUser: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    nama_game: {
        type: DataTypes.STRING(100),
        allowNull: false
    },

    nominal_topup: {
        type: DataTypes.STRING(50),
        allowNull: false
    },

    harga_topup:{
        type: DataTypes.STRING(50),
        allowNull: false
    },

    jenis_pembayaran: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    alamat_email: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: 'transactions',
    timestamps: true
});

// Tambahkan relasi dengan pelanggan
Transaction.belongsTo(Customer, { foreignKey: 'id_customer', as: 'customer' });

export default Transaction;
