import { Router } from 'express';
import userController from '../controllers/user-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const userRouter = new Router();

userRouter
	.route('/')
	.get(authMiddleware.authenticate, userController.getOne);

export default userRouter;
