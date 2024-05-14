import fs from 'fs/promises'; // Import modul fs untuk membaca file
import path from 'path'; // Import modul path untuk menangani path file
import Customer from '../models/customer.model.js';
import Transaction from '../models/transaction.model.js';

const jsonFileName = 'dummyData.json';
const jsonFilePath = new URL(`../config/${jsonFileName}`, import.meta.url);

// Fungsi untuk melakukan sinkronisasi model dengan basis data
async function syncDatabase() {
    try {
        // Tidak diperlukan untuk Mongoose
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

            // Membaca file JSON
            const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
            const gamesData = JSON.parse(jsonData);
            
            const messageSuccessLogin = await req.flash('infoLoginSuccess');
            const messageSuccessTransaction = await req.flash('infoTransactionSuccess');
            const messageSuccessLogout = req.flash('infoLogOutSucces');

            // Melanjutkan dengan me-render tampilan dengan data dari JSON
            res.render('index', {
                title,
                games: gamesData, // Menyertakan data game ke dalam objek yang dikirim ke tampilan
                currentPage: req.path, // Menggunakan path saat ini sebagai nilai currentPage
                session: req.session, // Sertakan objek sesi ke dalam objek yang dikirim ke tampilan
                messageSuccessLogin,
                messageSuccessTransaction,
                messageSuccessLogout
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
                session: req.session, // Sertakan objek sesi ke dalam objek yang dikirim ke tampilan
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
    },

    async logOut(req, res) {
        try {
            req.session.destroy((err) => {
                if (err) {
                    console.error('Error saat menghapus session:', err);
                    res.redirect('/'); // Redirect ke halaman dashboard jika terjadi kesalahan
                } else {
                    req.flash('infoLogOutSucces', 'Log out dari akun anda berhasil');
                    // Jika session berhasil dihapus, redirect ke halaman login
                    res.redirect('/');
                }
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },

    async riwayatPage(req,res){
        try {
            // Misalkan Anda memiliki model Transaction yang menghubungkan setiap transaksi dengan pengguna
            // Anda dapat menggunakan data sesi pengguna (req.session.userId) untuk mencari transaksi yang terkait
            const userId = req.session.userId; // Ambil ID pengguna dari sesi
            const title = "Top Up Delta | Riwayat Transaksi";
            // Mengambil data transaksi berdasarkan ID pengguna
            const transactions = await Transaction.find({ userId });

            // Kirim data transaksi ke tampilan
            res.render('riwayat_transaksi', {  title,session: req.session, // Sertakan objek sesi ke dalam objek yang dikirim ke tampilan
        });
        } catch (error) {
            console.error('Error saat mengambil riwayat transaksi:', error);
            res.status(500).send('Internal Server Error');
        }
    }
    
};

export default MainController;
