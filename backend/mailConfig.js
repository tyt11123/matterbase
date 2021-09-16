const nodemailer = require("nodemailer");
const Email = require("email-templates");
require("dotenv").config();

var mailConfig;
if (process.env.NODE_ENV === "production") {
  // all emails are delivered to destination
  mailConfig = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  };
} else {
  // all emails are catched by ethereal.email
  mailConfig = {
    host: "smtp.ethereal.email",
    port: 587,
    auth: {
      user: "linnie50@ethereal.email",
      pass: "2bQUGrWdCtWEEhxArb",
    },
  };
}

const transporter = nodemailer.createTransport(mailConfig);
const email = (process.env.NODE_ENV === "production") ?
  // production environment
  new Email({
    message: {
      from: "noreply@matterbase.com",
    },
    transport: transporter,
    views: {
      options: {
        extension: "hbs",
      },
    },
  }) :
  // send emails in development/test env:
  new Email({
    message: {
      from: "noreply@matterbase.com",
    },
    send: true,
    transport: transporter,
    views: {
      options: {
        extension: "hbs",
      },
    },
  });

module.exports = email;