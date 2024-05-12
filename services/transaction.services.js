import nodemailer from 'nodemailer';

import Transaction from '../models/transaction.model.js';


const TransactionService = {

    async createTransaction(transactionData){
        try {
            const newTransaction = await Transaction.create(transactionData);
            return newTransaction;
        } catch (error) {
            throw new Error(`Error saat membuat transaksi: ${error.message}`);
        }
    },

};


export default TransactionService;