import fs from 'fs/promises'; // Import modul fs untuk membaca file
import path from 'path'; // Import modul path untuk menangani path file
import sequelize from '../config/database.js';
const jsonFileName = 'dummyData.json';
const jsonFilePath = new URL(`../config/${jsonFileName}`, import.meta.url);

import Customer from '../models/customer.model.js';
import Transaction from '../models/transaction.model.js';
// Fungsi untuk melakukan sinkronisasi model dengan basis data
async function syncDatabase() {
    try {
        await sequelize.sync({ alter: true });
        console.log('Model berhasil disinkronkan dengan basis data.');
    } catch (error) {
        console.error('Gagal melakukan sinkronisasi model dengan basis data:', error);
    }
}   

const MainController = {
    async mainPage(req, res) {
        try {
            const title = "Top Up Game | Main Page";

            // Panggil fungsi sinkronisasi model dengan basis data
            // await syncDatabase();

            const customer = await Customer.findAll();
            const transaction = await Transaction.findAll();

            // Membaca file JSON
            const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
            const gamesData = JSON.parse(jsonData);

            // Melanjutkan dengan me-render tampilan dengan data dari JSON
            res.render('index', {
                title,
                games: gamesData, // Menyertakan data game ke dalam objek yang dikirim ke tampilan
                currentPage: req.path, // Menggunakan path saat ini sebagai nilai currentPage
                customer,
                session: req.session // Sertakan objek sesi ke dalam objek yang dikirim ke tampilan
            });
        } catch (error) {
            console.log(error);
            throw error;
        }
    },

    //detail produk topUp
    async detailPage(req,res){
        try {
            const title = "Top Up";
            // Membaca file JSON
            const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
            const gamesData = JSON.parse(jsonData);

            const gameId = req.params.id;
            // Ambil data game dengan ID yang sesuai dari file JSON
            const game = gamesData.find(game => game.id === parseInt(gameId));
            // Render halaman detail game dengan data game yang dipilih
            res.render('detail_product', { 
                game,
                title,
                session: req.session // Sertakan objek sesi ke dalam objek yang dikirim ke tampilan
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Terjadi kesalahan saat memuat halaman detail game.');
        }
    },

    // halamaan untuk buat akun.
    async signUpPage(req,res){
        try {
            const title = "Top Up Delta | Buat Akun";
            res.render('createAccount',{
                title,
                session: req.session // Sertakan objek sesi ke dalam objek yang dikirim ke tampilan
            });
        } catch (error) {
            console.log(error);
        }
    }
};

export default MainController;
