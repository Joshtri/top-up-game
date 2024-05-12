import express from "express";
const router = express.Router();

import customerController from "../controllers/customer.controller.js";



router.post('/post_createAccount',customerController.createAccount);
router.post('/login', customerController.loginAccount);

// router.get('/game/:id', MainController.detailPage);

// router.get('/sign-up', MainController.signUpPage);


export default router;