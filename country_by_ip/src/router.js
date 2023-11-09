import { Router } from 'express';
import controller from './controller.js';

const router = new Router();

router.route('/ping').get(controller.getCountryByIp);

export default router;
