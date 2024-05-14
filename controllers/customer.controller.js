import bcrypt from 'bcrypt';
import CustomerService from '../services/customer.services.js';
import Customer from '../models/customer.model.js';

const CustomerController = {
    async createAccount(req, res) {
        try {
            const { name, email, password } = req.body;

            // Generate hashed password using bcrypt
            const hashedPassword = await bcrypt.hash(password, 10);

            // Create account with hashed password
            const accountData = {
                name: name,
                email: email,
                password: hashedPassword
            };

            // Create a new customer using Mongoose
            const newCustomer = await Customer.create(accountData);

            // Return response
            res.redirect('/');
            console.log('Account created successfully:', newCustomer);
        } catch (error) {
            console.log(error);
        }
    },
    async loginAccount(req, res) {
        try {
            const { email, password } = req.body;

            // Panggil fungsi loginAccount dari CustomerService
            const customer = await CustomerService.loginAccount({ email, password });

            // Jika autentikasi berhasil, simpan data pengguna ke dalam session
            req.session.user = {
                id_customer: customer.id_customer,
                name: customer.name,
                email: customer.email,
                createdAt : customer.createdAt
                // Tambahkan atribut sesuai kebutuhan
            };

            // Kirimkan respons sukses ke klien
            await req.flash('infoLoginSuccess', 'Login Berhasil, Selamat Datang di Delta Store 😃😃');  
            res.redirect('/');
            // res.status(200).json({ message: 'Login berhasil', data: customer });
        } catch (error) {
            // Tangani kesalahan dengan mengirimkan respons dengan status kesalahan
            res.status(500).json({ error: error.message });
        }
    }
};

export default CustomerController;
