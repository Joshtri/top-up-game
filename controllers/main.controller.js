import fs from 'fs/promises'; // Import modul fs untuk membaca file
import path from 'path'; // Import modul path untuk menangani path file

const jsonFileName = 'dummyData.json';
const jsonFilePath = new URL(`../config/${jsonFileName}`, import.meta.url);

const MainController = {
    async mainPage(req, res) {
        try {
            const title = "Top Up Game | Main Page";

            // Membaca file JSON
            const jsonData = await fs.readFile(jsonFilePath, 'utf-8');
            const gamesData = JSON.parse(jsonData);

            // Melanjutkan dengan me-render tampilan dengan data dari JSON
            res.render('index', {
                title,
                games: gamesData // Menyertakan data game ke dalam objek yang dikirim ke tampilan
            });

            console.log(gamesData);
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
                title 
            });
        } catch (error) {
            console.error(error);
            res.status(500).send('Terjadi kesalahan saat memuat halaman detail game.');
        }
    }
};

export default MainController;
