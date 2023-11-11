import { Router } from 'express';
import fileController from '../controllers/file-controller.js';
import authMiddleware from '../middlewares/auth-middleware.js';

const fileRouter = new Router();

fileRouter
	.route('/*')
	.get(authMiddleware.authenticate, fileController.getOne)
	.put(authMiddleware.authenticate, fileController.createOne);

export default fileRouter;
