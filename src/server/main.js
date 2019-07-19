import '@babel/polyfill';
import cors from 'cors';
import express from 'express';
import passport from 'passport';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { router } from '../rest/routes/router';
import { main } from '../config/config';

const app = express();
const { host, port } = main.server;

app.use(cors());
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(passport.initialize())
app.use('/', router);

app.listen(port, host);
console.log('server listen on', host, port);
