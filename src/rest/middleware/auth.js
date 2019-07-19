
import { passport } from './passport';
import { getUserByField } from '../models/users';
import { getCurrentLogin, setLastActiv } from '../models/activity';

const checkAuth = (req, res, next) =>
    passport.authenticate('jwt', (error, user, info) => {
        if (error) {
            res.send({ status: false, error });
        } else if (info !== undefined) {
            res.send({ status: false, error: info.message });
        } else {
            getCurrentLogin(user.logId)
                .then(log => {
                    if (log) {
                        req.user = user;
                        next();
                    } else res.send({ status: false, error: 'You don`t login' })
                })
                .catch(error => res.send({ status: false, error }))
        }
    })(req, res, next);

const updateActivity = (req, res, next) =>
    setLastActiv(req.user.logId)
        .then(data => next())
        .catch(error => res.send({ status: false, error }));

const checkEmail = (req, res, next) =>
    getUserByField('email', req.body.email)
        .then(user => {
            if (!user[0]) res.send({ status: false, error: 'Email dont found' })
            else {
                req.user = user[0];
                next();
            }
        })
        .catch(error => res.send({ status: false, error }));

export { checkAuth, updateActivity, checkEmail };