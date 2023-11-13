import { createClient } from 'redis';
import config from './config.js';

const client = createClient({
	password: config.DB_PASSWORD,
	socket: {
		host: config.DB_HOST,
		port: config.DB_PORT
	}
});

export default client;
