import TransactionService from "../services/transaction.services.js";
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const TransactionController = {
    async createTransaction(req, res) {
        try {
            const { nama_game, id_gameUser, nominal_topup, harga_topup, jenis_pembayaran, alamat_email } = req.body;

            // Create transaction data
            const transactionData = {
                nama_game: nama_game,
                id_gameUser: id_gameUser,
                nominal_topup: nominal_topup,
                harga_topup: harga_topup.toString(), // Convert to string
                jenis_pembayaran: jenis_pembayaran,
                alamat_email: alamat_email
            };

            const newTransaction = await TransactionService.createTransaction(transactionData);

            // Send email notification
            const transporter = nodemailer.createTransport({
                // Configure SMTP or use services like Gmail
                // For example, for Gmail:
                service: 'gmail',
                auth: {
                    user: process.env.MAIL_SYSTEM, // Replace with your email
                    pass: process.env.MAIL_PASS
                }
            });

            const mailOptions = {
                from: process.env.MAIL_SYSTEM, // Replace with your email
                to: alamat_email,
                subject: 'Notification: Transaction Created',
                text: 'Your transaction has been successfully created.',
                attachments: [
                    {
                        filename: 'image.jpg',
                        path: 'public/img/qrcode_auth.png' // Replace with your image path
                    }
                ]
            };

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });

            await req.flash('infoTransactionSuccess', 'Proses pembelian berhasil, untuk proses pembayaran telah di kirim pada email aktif anda');
            // Return response
            res.redirect('/');
            console.log('New transaction created successfully:', newTransaction);
        } catch (error) {
            console.log('Error creating transaction:', error);
        }
    }
};

export default TransactionController;
