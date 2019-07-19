import { connection } from './connection';
import { createHash } from '../utils/tokens';

const getAllPublicInfo = () => new Promise((result, reject) => {
    connection.query({
        sql: `SELECT username, email 
            FROM users ;`
    }, (error, results, fields) => (error) ? reject(error) : result(results));
});

const addUser = (username, password, email) => new Promise((result, reject) => {
    (!username || !password || !email) ? reject('Some field for request to database is empty')
        : connection.query({
            sql: `INSERT INTO users(username, password, email, created_at) 
                VALUE (?, ?, ?, now());`,
            values: [username, createHash(password), email]
        }, (error, results, fields) => (error) ? reject(error) : result(results));
});

const updateUserByField = (setField, setValue, byField, byValue) => new Promise((result, reject) => {
    (!setField || !setValue || !byField || !byValue) ? reject('Some field for request to database is empty')
        : connection.query({
            sql: `UPDATE users
                SET ${setField} = ? , updated_at = now() 
                WHERE ${byField} = ? ;`,
            values: [setValue, byValue]
        }, (error, results, fields) => (error) ? reject(error) : result(results));
});

const getUserByField = (field, value) => new Promise((result, reject) => {
    (!field || !value) ? reject('Some field for request to database is empty')
        : connection.query({
            sql: `SELECT * FROM users
            WHERE ${field} = ? ;`,
            values: [value]
        }, (error, results, fields) => (error) ? reject(error) : result(results));
});

export { addUser, getAllPublicInfo, getUserByField, updateUserByField };
