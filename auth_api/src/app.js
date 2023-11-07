import exress from 'express';

import authRouter from './routes/auth-router.js';
import userRouter from './routes/user-router.js';

const app = exress();

app.use(exress.json());

app.use('/auth', authRouter);
app.use('/me', userRouter);

export default app;
