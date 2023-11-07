import { Router } from 'express';
import authController from '../controllers/auth-controller.js';

const authRouter = new Router();

authRouter.route('/sign-up').post(authController.signup);
authRouter.route('/sign-in').post(authController.signin);

export default authRouter;
