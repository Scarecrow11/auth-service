const main = {
    server: {
        host: 'localhost',
        port: 3500
    },
    database: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'api3'
    },
};

const mailSMTP = {
    host: 'smtp.gmail.com',
    port: 587,
    user: 'dimon.smaile1@gmail.com',
    password: 'ffifiwtptugzwazb'
}

const expireTimeEmailsCodes = 15;// time in minutes

const tokenConfig = {
    secret: 'TfbTq2NfLzqMcbVY9EpGQ2p',
    expire: '5 minutes'
};

export { main, expireTimeEmailsCodes, mailSMTP, tokenConfig }