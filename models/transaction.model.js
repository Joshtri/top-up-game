import mongoose from 'mongoose';

// Skema Mongoose untuk model Transaction
const transactionSchema = new mongoose.Schema({
    id_gameUser: {
        type: String,
        required: true,
        maxlength: 100
    },
    nama_game: {
        type: String,
        required: true,
        maxlength: 100
    },
    nominal_topup: {
        type: String,
        required: true,
        maxlength: 50
    },
    harga_topup: {
        type: String,
        required: true,
        maxlength: 50
    },
    jenis_pembayaran: {
        type: String,
        required: true,
        maxlength: 100
    },
    alamat_email: {
        type: String,
        required: true,
        maxlength: 100
    },
    // Tambahkan referensi ke pelanggan
    id_customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer'
    }
}, { timestamps: true });

// Buat model Mongoose dari skema
const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
