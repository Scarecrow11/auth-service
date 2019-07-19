import { createHash } from '../utils/tokens';
import { updateUserByField } from '../models/users';
import { refreshPassEmail } from '../services/emails';
import { closeConfirmLog } from '../models/confirmation';
import { getCode, checkCodeError } from '../utils/emailCode';

const forgotPassword = async (req, res) => {
    let code = await getCode(req.user.id);
    if (code) {
        refreshPassEmail(req.user.email, req.user.username, code);
        res.send({ status: true, data: 'Check email' });
    } else {
        res.send({ status: false, data: 'Error connect with database' });
    }
};

const checkCodePass = async (req, res) => {
    const { id } = req.user;
    const { code, password } = req.body;
    let error = await checkCodeError(id, code);
    if (error) res.send(error);
    else updateUserByField('password', createHash(password), 'id', id)
        .then(data => {
            closeConfirmLog(id);
            res.send({ status: true, data: 'Refresh password success' });
        })
        .catch(error => res.send({ status: false, data: 'Error connect with database', error }));
};

const checkCodeEmail = async (req, res) => {
    const { id } = req.user;
    let error = await checkCodeError(id, req.body.code);
    if (error) res.send(error);
    else updateUserByField('username', username, 'id', id)
        .then(data => {
            closeConfirmLog(id);
            res.send({ status: true, data: 'Confirm email success' });
        })
        .catch(error => res.send({ status: false, error }));
};

export { forgotPassword, checkCodePass, checkCodeEmail };