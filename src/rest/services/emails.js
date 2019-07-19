
import nodemailer from 'nodemailer';
import { mailSMTP } from '../../config/config';

const transporter = nodemailer.createTransport(
    {
        host: mailSMTP.host,
        port: mailSMTP.port,
        secure: false,
        auth: {
            user: mailSMTP.user,
            pass: mailSMTP.password
        },
        logger: true,
        debug: false // include SMTP traffic in the logs
    },
    {
        from: mailSMTP.user,
        headers: {
            'X-Laziness-level': 1000 // just an example header, no need to use this
        }
    }
);

const refreshPassEmail = (email, name, code) => {
    // Message object
    let message = {
        to: email,
        subject: 'Restore password',

        html:
            `<h1><b>Hello</b> ${name}, </h1>
            <p>You requested a password recovery, if it was not you, then just ignore this letter</p>
            <p>Please send code below to verify new password.<br/></p>
            <h1>${code}</h1>
            <p> Сode is valid 15 minutes. </p>`,
    };

    transporter.sendMail(message);
    transporter.close();
};

const confirmEmailLatter = (email, name, code) => {
    // Message object
    let message = {
        to: email,
        subject: 'Verify your email',

        html:
            `<h1><b>VERIFY EMAIL</b></h1>
            <h3><b>Hello</b> ${name}, </h3>
            <p>Please send code below to verify your email address.</p>
            <p>Verifying your email address ensures an extra layer of security for your account.<br/></p>
            <h1>${code}</h1>
            <p> Сode is valid 15 minutes. </p>`,
    };

    transporter.sendMail(message);
    transporter.close();
};

export { refreshPassEmail, confirmEmailLatter };