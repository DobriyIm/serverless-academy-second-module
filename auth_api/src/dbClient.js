import pg from 'pg';
import { dbConfig } from '../config.js';

const client = new pg.Client(dbConfig.connectionString);

export default client;
