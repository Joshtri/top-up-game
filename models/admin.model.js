import mongoose from 'mongoose';

// Skema Mongoose untuk model Admin
const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        maxlength: 100
    },

    password: {
        type: String,
        required: true,
        maxlength: 100
    }
}, { timestamps: true });

// Buat model Mongoose dari skema
const Admin = mongoose.model('Admin', adminSchema);

export default Admin;
