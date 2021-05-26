import * as nodemailer from "nodemailer";
import mailConfig from '../config/mailConfig';

class Mail {

    constructor() { }

    sendMail(to: string, subject: string, message: string) {

        let mailOptions = {
            from: "donotreply@faculdade.com.br",
            to,
            subject,
            html: message
        };

        const transporter = nodemailer.createTransport({
            host: mailConfig.host,
            port: mailConfig.port,
            secure: false,
            auth: {
                user: mailConfig.user,
                pass: mailConfig.password
            },
            tls: { rejectUnauthorized: false }
        });


        console.log(mailOptions);

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return error;
            } else {
                return "E-mail enviado com sucesso!";
            }
        });
    }


}

export default new Mail;