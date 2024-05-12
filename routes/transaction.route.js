import express from "express";
const router = express.Router();

import transactionController from "../controllers/transaction.controller.js";



router.post('/topup_pay',transactionController.createTransaction);
// router.post('/login', customerController.loginAccount);

// router.get('/game/:id', MainController.detailPage);

// router.get('/sign-up', MainController.signUpPage);


export default router;