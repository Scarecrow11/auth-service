import { passport } from '../middleware/passport';
import { sendConfirmLetter } from '../utils/emailCode';
import { createToken, passportErrorCheck } from '../utils/tokens';
import { addCurrentLogin, closeCurrentLogin } from '../models/activity';

const register = (req, res, next) =>
    passport.authenticate('register', (error, user, info) => {
        const check = passportErrorCheck(error, info);
        if (check) res.send(check);
        else {
            sendConfirmLetter(user.id, user.email, user.username);
            res.send({ status: true, data: 'User created, please check email for verify email' });
        }
    })(req, res, next);

const login = (req, res, next) =>
    passport.authenticate('login', (error, user, info) => {
        const check = passportErrorCheck(error, info);
        if (check) res.send(check);
        else addCurrentLogin(user.id)
            .then(log => res.send({ status: true, data: 'User login', token: createToken({ id: user.id, username: user.username, logId: log.insertId }) }))
            .catch(error => res.send({ status: false, error }));
    })(req, req, next);

const logout = (req, res) =>
    closeCurrentLogin(req.user.logId)
        .then(data => res.send({ status: true, data: 'Logout success.' }))
        .catch(error => res.send({ status: false, data: 'Repead logout.', error }));


export { logout, login, register };