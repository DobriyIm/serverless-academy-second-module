import { Router } from 'express';
import controller from './controller.js';

const router = new Router();

router.route('/shorter').post(controller.createShortLink);

router.route('/*').get(controller.redirect);

export default router;
