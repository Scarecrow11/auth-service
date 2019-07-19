import mysql from 'mysql';
import { main } from '../../config/config';

const connection = mysql.createConnection(main.database);

const connect = () => connection.query({ sql: `SELECT 1 + 1` });

setInterval(connect, 1000);

export { connection }