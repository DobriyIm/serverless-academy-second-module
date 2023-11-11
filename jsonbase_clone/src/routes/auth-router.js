import { Router } from 'express';
import authController from '../controllers/auth-controller.js';

const authRouter = new Router();

authRouter.route('/sign-up').post(authController.signUp);
authRouter.route('/sign-in').post(authController.signIn);

export default authRouter;
