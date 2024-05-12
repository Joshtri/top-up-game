import TransactionService from "../services/transaction.services.js";
import nodemailer from 'nodemailer';
import 'dotenv/config';

const TransactionController = {

    async createTransaction(req, res) {
        try {
            const { nama_game, id_gameUser, nominal_topup, harga_topup, jenis_pembayaran, alamat_email } = req.body;

            // Create account with hashed password
            const transactionData = {
                nama_game: nama_game,
                id_gameUser: id_gameUser,
                nominal_topup: nominal_topup,
                harga_topup: harga_topup.toString(), // Ubah ke string tunggal
                jenis_pembayaran: jenis_pembayaran,
                alamat_email: alamat_email
            };

            const newTransaction = await TransactionService.createTransaction(transactionData);

            // Send email notification
            const transporter = nodemailer.createTransport({
                // Konfigurasi SMTP atau gunakan layanan seperti Gmail
                // Misalnya untuk Gmail:
                service: 'gmail',
                auth: {
                    // eslint-disable-next-line no-undef
                    user: process.env.MAIL_SYSTEM, // Ganti dengan email Anda
                    // eslint-disable-next-line no-undef
                    pass: process.env.MAIL_PASS
                }
            });
            const imagePath = 'public/img/qrcode_auth.png'; // Ganti dengan path gambar Anda

            const mailOptions = {
                // eslint-disable-next-line no-undef
                from: process.env.MAIL_SYSTEM, // Ganti dengan email Anda
                to: alamat_email, // Gunakan alamat email dari req.body
                subject: 'Notification: Transaction Created',
                text: 'Your transaction has been successfully created.',
                attachments: [
                    {
                        filename: 'image.jpg', // Nama file lampiran
                        path: imagePath // Path ke gambar yang akan dilampirkan
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

            // Return response
            res.redirect('/');
            console.log('New transaction created successfully:', newTransaction);
        } catch (error) {
            console.log('Error creating transaction:', error);
        }
    }

};

export default TransactionController;