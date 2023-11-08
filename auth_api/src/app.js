import express from 'express';

import authRouter from './routes/auth-router.js';
import userRouter from './routes/user-router.js';

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/me', userRouter);

export default app;
