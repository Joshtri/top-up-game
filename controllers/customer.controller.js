import fs from 'fs/promises'; // Import modul fs untuk membaca file
import path from 'path'; // Import modul path untuk menangani path file
import bcrypt from 'bcrypt';


import CustomerService from '../services/customer.services.js';


const CustomerController = {

    async createAccount(req,res){

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

            const newCustomer = await CustomerService.createAccount(accountData);

            // Return response

            res.redirect('/');
            console.log('Account created successfully + ', newCustomer);

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
                id_customer: customer.id, // Sesuaikan dengan nama atribut yang sesuai dengan data pelanggan Anda
                name: customer.name,
                email: customer.email,
                // Tambahkan atribut sesuai kebutuhan
            };
    
            // Kirimkan respons sukses ke klien
            res.redirect('/');
            // res.status(200).json({ message: 'Login berhasil', data: customer });
        } catch (error) {
            // Tangani kesalahan dengan mengirimkan respons dengan status kesalahan
            res.status(500).json({ error: error.message });
        }
    }
    

};





export default CustomerController;
