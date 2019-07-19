import bcrypt from 'bcrypt';
import jsonwebtoken from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';
import { tokenConfig } from '../../config/config';

const createHash = (password) => bcrypt.hashSync(password, 10);

const checkPass = (pass, hash) => bcrypt.compareSync(pass, hash);

let token = {
    jwt: {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: tokenConfig.secret
    },
    expiresIn: tokenConfig.expire
}

const createToken = (body) => jsonwebtoken.sign(
    body,
    token.jwt.secretOrKey,
    { expiresIn: token.expiresIn }
);

const passportErrorCheck = (error, info) => {
    if (error) return error;
    if (info !== undefined) return { status: false, error: info.message }
    return null;
}

export { token, createToken, createHash, checkPass, passportErrorCheck }