// import Admin from "../models/admin.model.js";
import AdminService from "../services/admin.services.js";
// import TransactionService from "../services/transaction.services.js";

const AdminController = {
    async loginAdmin(req,res){
        try {
            const { email, password } = req.body;

            // Panggil fungsi loginAccount dari CustomerService
            const admin = await AdminService.loginAccount({ email, password });

            // Jika autentikasi berhasil, simpan data pengguna ke dalam session
            req.session.admin = {
                password: admin.password,
                username: admin.username,
                createdAt : admin.createdAt
                // Tambahkan atribut sesuai kebutuhan
            };

            // Kirimkan respons sukses ke klien
            await req.flash('infoLoginSuccess', 'Login Berhasil, Selamat Datang di SI Delta Store😃😃');  
            res.redirect('/adm/dashboard_delta');
            // res.status(200).json({ message: 'Login berhasil', data: customer });
        } catch (error) {
            // Tangani kesalahan dengan mengirimkan respons dengan status kesalahan
            res.status(500).json({ error: error.message });
        }
    },


    async loginAdminPage(req,res){
        try {
            const title = "Login Admin | Delta Store Admin";
            res.render('login_adm',{
                title
            });
        } catch (error) {
            console.log(error);
        }
    },




    async dashboardAdminPage(req, res) {
        try {
            const title = "Dashboard Admin | Delta Store Admin";
            
            // Panggil fungsi dashboardPage dari AdminService
            const getData = await AdminService.dashboardPage();

            res.render('dashboard', {
                getData,
                title
            });

            console.log(getData);
        } catch (error) {
            console.log(error);
        }
    },

    async customerPage(req,res){
        try {
            const title = "Customer Data | Delta Store Admin";

            const getDataCustomer = await AdminService.customerData();
            res.render('data_customer',{
                title,
                getDataCustomer
            });
            
            console.log(getDataCustomer);
        } catch (error) {
            console.log(error);
        }
    },

    async customerTransactionPage(req, res) {
        try {
            const title = "Transaction Data | Delta Store Admin";
            // Dapatkan id pelanggan dari permintaan (request)
            const customerId = req.params.customerId;
    
            // Panggil fungsi customerTransactionData dari service
            const transactions = await AdminService.customerTransactionData(customerId);
    
            // Lakukan apa pun yang diperlukan dengan data transaksi di sini
            // Sebagai contoh, Anda dapat merender halaman dengan data tersebut
            res.render('data_transaksi', { transactions , title});
    
        } catch (error) {
            console.log(error);
            // Tangani kesalahan
        }
    }


};




export default AdminController;