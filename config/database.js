import { Sequelize } from 'sequelize';
import 'dotenv/config';

// Mengambil nilai variabel lingkungan dari file .env
const {
    POSTGRES_USER, 
    POSTGRES_PASSWORD, 
    POSTGRES_HOST, 
    POSTGRES_PORT, 
    POSTGRES_DATABASE 
// eslint-disable-next-line no-undef
} = process.env;

const sequelize = new Sequelize({
    dialect: 'postgres',
    host: POSTGRES_HOST,
    port: POSTGRES_PORT,
    username: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DATABASE
});

export default sequelize;