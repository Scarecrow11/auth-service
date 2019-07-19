import { confirmEmailLatter } from '../services/emails';
import { expireTimeEmailsCodes } from '../../config/config';
import { addConfirmLog, getConfirmLog } from '../models/confirmation';

const getCode = async (userId) => {
    let code = Math.floor(100000 + Math.random() * 900000);
    return await addConfirmLog(userId, code);
};

const sendConfirmLetter = async (id, email, username) => {
    let code = await getCode(id);
    if (code) {
        confirmEmailLatter(email, username, code);
        return true;
    } else
        return false;
};

const checkCodeError = (id, code) =>
    getConfirmLog(id, code)
        .then(log => {           
            if (typeof (log) == 'undefined')
                return { status: false, data: 'Wrong code' };
            else if (log.created_at.getTime() > new Date().getTime() - (expireTimeEmailsCodes * 60))
                return { status: false, data: 'Code timeout' };
            return null;
        })
        .catch(error => error);

export { getCode, checkCodeError, sendConfirmLetter };