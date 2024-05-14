import express from "express";
const router = express.Router();

import MainController from "../controllers/main.controller.js";



router.get('/',MainController.mainPage);
router.get('/game/:id', MainController.detailPage);

router.get('/sign-up', MainController.signUpPage);

// Router untuk logout
router.get('/logout', (req, res) => {
    // Hapus session admin
    req.session.destroy((err) => {
        if (err) {
            console.error('Error saat menghapus session:', err);
            res.redirect('/'); // Redirect ke halaman dashboard jika terjadi kesalahan
        } else {
            // Jika session berhasil dihapus, redirect ke halaman login
            res.redirect('/');
        }
    });
});

export default router;