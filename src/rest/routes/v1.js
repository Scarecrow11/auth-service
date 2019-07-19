import express from 'express';
import { auth } from './auth';
import { users } from './users';

const v1 = express.Router();

v1.use('/auth', auth);
v1.use('/users', users);

export { v1 };