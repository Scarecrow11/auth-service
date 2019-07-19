import passport from 'passport';
import { Strategy } from 'passport-jwt';
import { token, checkPass } from '../utils/tokens';
import { sendConfirmLetter } from '../utils/emailCode';
import { addUser, getUserByField } from '../models/users';
import { Strategy as localStrategy } from 'passport-local';

passport.use('register', new localStrategy({
    passReqToCallback: true,
    usernameField: 'username',
    passwordField: 'password',
    session: false,
}, async (req, username, password, done) => {
    try {
        const { email } = req.body;
        let hasUsername = await getUserByField('username', username);
        if (hasUsername[0]) return done(null, false, { message: 'Username already taken' });

        let hasEmail = await getUserByField('email', email);
        if (hasEmail[0]) return done(null, false, { message: 'Email already used' });

        let add = await addUser(username, password, email);
        return done(null, { id: add.insertId, username: username, password: password, email: email });
    } catch (error) {
        return done(error);
    }
}));

passport.use('login', new localStrategy({
    usernameField: 'username',
    passwordField: 'password',
    session: false,
}, async (username, password, done) => {
    let user = await getUserByField('username', username)
        .catch(error => { return done(error) });
    if (!user[0]) return done(null, false, { message: 'Username dont found' });

    if (!user[0].updated_at) {
        sendConfirmLetter(user[0].id, user[0].email, user[0].username);
        return done('Verify email, check email');
    }

    if (!checkPass(password, user[0].password))
        return done(null, false, { message: 'Passwords do not match' });
    return done(null, { id: user[0].id, username: user[0].username });
}));

passport.use('jwt', new Strategy(token.jwt, (jwt_payload, done) => {
    if (jwt_payload == void (0)) {
        done({ status: false, data: 'Token dont found' });
    } else getUserByField('username', jwt_payload.username)
        .then(user => {
            done(null, { logId: jwt_payload.logId, ...user[0] });
        })
        .catch(error => done(error));
}));

export { passport };