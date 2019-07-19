import express from 'express';
import { all, current } from '../controllers/users';
import { checkAuth, checkEmail, updateActivity } from '../middleware/auth';
import { forgotPassword, checkCodePass, checkCodeEmail } from '../controllers/emails';

const users = express.Router();

users.get('/', [checkAuth, updateActivity], all);

users.get('/current/', [checkAuth, updateActivity], current);

users.get('/forgotpassword', [checkEmail, updateActivity], forgotPassword);

users.post('/checkcodepassword', checkEmail, checkCodePass);

users.post('/checkcodeemail', checkEmail, checkCodeEmail)

export { users };
