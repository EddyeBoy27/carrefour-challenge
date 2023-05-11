import dotenv from 'dotenv';
dotenv.config();

export default {
  mongodb: {
    host: process.env.MONGO_HOST || 'localhost',
    port: parseInt(process.env.MONGO_PORT, 10) || 27017,
    user: process.env.MONGO_USER || '',
    password: process.env.MONGO_PASSWORD || '',
    database: process.env.MONGO_DATABASE || 'mydatabase',
  },
  postgresql: {
    host: process.env.POSTGRES_HOST || 'localhost',
    port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
    user: process.env.POSTGRES_USER || '',
    password: process.env.POSTGRES_PASSWORD || '',
    database: process.env.POSTGRES_DATABASE || 'mydatabase',
  },
  api: {
    port: parseInt(process.env.API_PORT, 10) || 3000,
    secret: process.env.API_SECRET || 'mysecret',
  },
};
