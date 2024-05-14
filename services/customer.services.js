import Customer from '../models/customer.model.js';
import bcrypt from 'bcrypt';

const CustomerService = {
    async createAccount(accountData) {
        try {
            const newCustomer = new Customer(accountData);
            await newCustomer.save();
            return newCustomer;
        } catch (error) {
            throw new Error(`Error saat membuat akun: ${error.message}`);
        }
    },

    async loginAccount(accountData) {
        try {
            // Lakukan proses autentikasi menggunakan data akun yang diberikan
            const { email, password } = accountData;
            const customer = await Customer.findOne({ email });

            if (!customer) {
                throw new Error('Email tidak terdaftar');
            }

            const passwordMatch = await bcrypt.compare(password, customer.password);
            if (!passwordMatch) {
                throw new Error('Password salah');
            }

            return customer;
        } catch (error) {
            throw new Error(`Error saat login akun: ${error.message}`);
        }
    }
};

export default CustomerService;
