import express from 'express';

import authRouter from './routes/auth-router.js';
import fileRouter from './routes/file-router.js';

const app = express();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/', fileRouter);

export default app;
