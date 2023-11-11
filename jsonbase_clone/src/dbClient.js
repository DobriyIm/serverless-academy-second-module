import pg from 'pg';
import { dbConfig } from '../config.js';

const client = new pg.Client(dbConfig.CONNECTION_STRING);

export default client;
