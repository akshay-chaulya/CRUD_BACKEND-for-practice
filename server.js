import express from 'express';
import userRouter from './routes/user.route.js';
import notesRouter from './routes/notes.route.js';
import connectDB from './db/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use('/user', userRouter);
app.use('/notes', notesRouter);

connectDB().then(() => {
app.listen(5000, () => {
    console.log('Server is running on port 5000');
});
});