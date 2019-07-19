import { connection } from './connection';

const addConfirmLog = (userId, code) => new Promise((result, reject) => {
    connection.query({
        sql: `INSERT INTO confirmation(user_id, code, created_at) 
        VALUE (?, ?, now());`,
        values: [userId, code]
    }, (error, results, fields) => (error) ? reject(false) : result(code));
});

const getConfirmLog = (userId, code) => new Promise((result, reject) => {
    connection.query({
        sql: `SELECT code, created_at FROM confirmation 	
        WHERE deleted_at is null AND user_id = ? AND code = ? ;`,
        values: [userId, code]
    }, (error, results, fields) => (error) ? reject(error) : result(results[0]));
});

const closeConfirmLog = (userId) => new Promise((result, reject) => {
    connection.query({
        sql: `UPDATE confirmation 
        SET deleted_at = now() 
        WHERE user_id = ?;`,
        values: [userId]
    }, (error, results, fields) => (error) ? reject(error) : result(results));
});

export { addConfirmLog, getConfirmLog, closeConfirmLog };