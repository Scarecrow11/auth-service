import { connection } from './connection';

const addCurrentLogin = (userId) => new Promise((result, reject) => {
    connection.query({
        sql: `INSERT INTO activity(created_at, user_id) 
            VALUES (now() , ?);`,
        values: [userId]
    }, (error, results, fields) => (error) ? reject(error) : result(results));
});

const closeCurrentLogin = (loginId) => new Promise((result, reject) => {
    connection.query({
        sql: `UPDATE activity
            SET updated_at = now(), deleted_at = now()
            WHERE deleted_at is null AND id = ? ;`,
        values: [loginId]
    }, (error, results, fields) => (error) ? reject(error) : result(results));
});

const getCurrentLogin = (logId) => new Promise((result, reject) => {
    connection.query({
        sql: `SELECT created_at as login, deleted_at as logout 
            FROM activity
            WHERE deleted_at is null AND id = ? ;`,
        values: [logId]
    }, (error, results, fields) => (error) ? reject(error)
        : (results[0]) ? result(results[0]) : reject('You don`t login'));
});

const setLastActiv = (logId) => new Promise((result, reject) => {
    connection.query({
        sql: `UPDATE activity
        SET updated_at = now()
        WHERE id = ?;`,
        values: [logId]
    }, (error, results, fields) => (error) ? reject(error) : result(results));
});

export { addCurrentLogin, closeCurrentLogin, getCurrentLogin, setLastActiv };

