import express from "express";
const router = express.Router();

import AdminController from "../controllers/admin.controller.js";

import protect from "../config/auth/protect.js";

router.get('/login_adm', AdminController.loginAdminPage);

router.post('/login_admin', AdminController.loginAdmin);

router.get('/dashboard_delta',protect, AdminController.dashboardAdminPage);

// Route untuk logout
router.get('/logout', (req, res) => {
    // Hapus sesi pengguna
    req.session.destroy((err) => {
        if (err) {
            console.error("Error saat menghapus sesi:", err);
        } else {
            console.log("Sesi pengguna berhasil dihapus.");
        }
        // Redirect ke halaman login setelah logout
        res.redirect('/adm/login_adm');
    });
});

router.get('/data_customer',protect, AdminController.customerPage);
router.get('/data_transaksi',protect, AdminController.customerTransactionPage);

export default router;