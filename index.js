/* eslint-disable no-undef */
import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import session from 'express-session';
import cors from 'cors';
import flash from 'connect-flash';
import path from 'path';
import redis from 'redis';
import RedisStore from 'connect-redis';
import connectDB from './config/database.js';


import 'dotenv/config';
const app = express();
const PORT = process.env.PORT;


import mainRoute from './routes/main.route.js';
import customerRoute from './routes/customer.route.js';
import transactionRoute from './routes/transaction.route.js';
connectDB();
const client = redis.createClient({
  password: process.env.REDIS_PASS,
  socket: { 
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  }
});
(async () => { await client.connect(); })();

app.set('trust proxy', true);

// Express Session
app.use(
    session({
      proxy: true,
      secret: 'secret',
      resave: false,
      saveUninitialized: true,
      name: 'top-up-game',
      store: new RedisStore({ 
        client: client,
        // ttl: 3600, // waktu kadaluwarsa dalam detik (misalnya 1 jam)
      
      
      }),
    
      
    })
);


app.use(cors());

app.use(flash({ sessionKeyName: 'flashMessage' }));
// Gunakan middleware untuk membaca JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.json());
app.set('trust proxy', true);


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//atur view engine menggunakan ejs.
app.set('view engine', 'ejs');

// Gunakan middleware untuk menyajikan file statis dari folder 'public'
// eslint-disable-next-line no-undef
app.use(express.static(path.join(process.cwd(), 'public')));
app.use('/', mainRoute, customerRoute, transactionRoute);
// Tentukan lokasi folder views
app.set('views', path.join(__dirname, 'views'));



app.listen(PORT,()=>{
    console.log('server running on port ' + PORT);
});


