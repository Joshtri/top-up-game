import express from "express";
const router = express.Router();

import MainController from "../controllers/main.controller.js";



router.get('/',MainController.mainPage);
router.get('/game/:id', MainController.detailPage);

router.get('/sign-up', MainController.signUpPage);

// Router untuk logout
router.get('/logout', MainController.logOut);
router.get('/riwayat_transaksi', MainController.riwayatPage);
export default router;