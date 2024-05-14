import Transaction from '../models/transaction.model.js';

const TransactionService = {
    async createTransaction(transactionData) {
        try {
            const newTransaction = new Transaction(transactionData);
            await newTransaction.save();
            return newTransaction;
        } catch (error) {
            throw new Error(`Error saat membuat transaksi: ${error.message}`);
        }
    },
};

export default TransactionService;
