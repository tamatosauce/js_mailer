/**
 * Created by siraj on 5/03/2018.
 */

const nodemailer = require('nodemailer');
const fs = require('fs');

const EMAIL_USER ='';
const EMAIL_PASS ='';

/** smtp configuration for nodemailer */
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS
    }
});

module.exports = {

    readHTMLTemplate: function (templatePath) {
        return new Promise((resolve, reject) => {
            fs.readFile(templatePath, {encoding: 'utf-8'}, function (err, html) {
                if (err) {
                    reject(err);
                }
                else {
                    resolve(html);
                }
            });
        });
    },

    sendMail: async function (mailOptions) {
        try {
            let info = await transporter.sendMail(mailOptions);
            console.log(info);
            return true;
        } catch (e) {
            console.log(e);
            return false;
        }
    }
};
