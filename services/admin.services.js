import Admin from '../models/admin.model.js';
import Customer from '../models/customer.model.js';
import Transaction from '../models/transaction.model.js';

import bcrypt from 'bcrypt';


const AdminService = {

    async loginAccount(accountData) {
        try {
            // Lakukan proses autentikasi menggunakan data akun yang diberikan
            const { email, password } = accountData;
            const admin = await Admin.findOne({ email });

            if (!admin) {
                throw new Error('Email tidak terdaftar');
            }

            const passwordMatch = await bcrypt.compare(password, admin.password);
            if (!passwordMatch) {
                throw new Error('Password salah');
            }

            return admin;
        } catch (error) {
            throw new Error(`Error saat login akun: ${error.message}`);
        }
    },

    async dashboardPage() {
        try {
            const data = "dashboard page";
            return data;
        } catch (error) {
            console.log(error);
        }
    },
    async customerData() {
        try {
            // Di sini, Anda dapat menulis logika untuk mengambil data pelanggan
            const customerData = await Customer.find();
            return customerData;
        } catch (error) {
            throw new Error(`Error saat memuat data pelanggan: ${error.message}`);
        }
    },

    async customerTransactionData(customerId) {
        try {
            // Menggunakan model Transaction untuk mencari transaksi berdasarkan id pelanggan
            const customerTransactions = await Transaction.find({ id_customer: customerId }).exec();
            
            // Mengembalikan data transaksi pelanggan
            return customerTransactions;
        } catch (error) {
            // Tangani kesalahan
            throw new Error(`Error saat memuat data transaksi pelanggan: ${error.message}`);
        }
    }
};



export default AdminService;


