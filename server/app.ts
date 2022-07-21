import dotenv from 'dotenv';
import express from 'express';
import mysql from 'mysql';
import cors from 'cors';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: process.env.USER,
  host: process.env.HOST,
  password: process.env.PWD,
  database: process.env.DB,
});

app.listen(8080, () => {
  console.log('MySQL have been started!');
});
