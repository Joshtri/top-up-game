import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path from 'path';

import 'dotenv/config';
const app = express();
const PORT = process.env.PORT;


import mainRoute from './routes/main.route.js';

// Gunakan middleware untuk membaca JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//atur view engine menggunakan ejs.
app.set('view engine', 'ejs');

// Gunakan middleware untuk menyajikan file statis dari folder 'public'
// eslint-disable-next-line no-undef
app.use(express.static(path.join(process.cwd(), 'public')));

// Tentukan lokasi folder views
app.set('views', path.join(__dirname, 'views'));

app.use('/', mainRoute);

app.listen(PORT,()=>{
    console.log('server running on port ' + PORT);
});


