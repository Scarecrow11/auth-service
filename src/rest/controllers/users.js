import { getAllPublicInfo } from '../models/users';

const all = (req, res) =>
    getAllPublicInfo()
        .then(data => res.send({ status: true, data }))
        .catch(error => res.send({ status: false, error }));

const current = (req, res) =>
    res.send({ status: true, data: req.user });

export { all, current };