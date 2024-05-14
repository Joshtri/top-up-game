import mongoose from 'mongoose';

// Skema Mongoose untuk model Customer
const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        maxlength: 100
    },
    email: {
        type: String,
        required: true,
        maxlength: 50
    },
    password: {
        type: String,
        required: true,
        maxlength: 100
    }
}, { timestamps: true });

// Buat model Mongoose dari skema
const Customer = mongoose.model('Customer', customerSchema);

export default Customer;
