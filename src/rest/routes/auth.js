import express from 'express';
import { checkAuth } from '../middleware/auth';
import { login, logout, register } from '../controllers/auth';

const auth = express.Router();

auth.post('/register', register);

auth.post('/login', login);

auth.post('/logout', checkAuth, logout);

export { auth };