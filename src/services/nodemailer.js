import nodemailer from "nodemailer";
const hbs = require("nodemailer-express-handlebars");
const path = require('path')

export const sendEmail = async (books) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.TRANSPORTER_USER,
      pass: process.env.TRANSPORTER_PASS,
    },
  });

  // point to the template folder
  const handlebarOptions = {
    viewEngine: {
      partialsDir: path.resolve(__dirname, "../views/"),
      defaultLayout: false,
    },
    viewPath: path.resolve(__dirname, "../views/"),
  };

  // use a template file with nodemailer
  transporter.use("compile", hbs(handlebarOptions));

  const mailOptions = {
    from: process.env.TRANSPORTER_USER,
    to: process.env.TO_EMAIL,
    subject: "Subject",
    template: "../views/email",
    context: {
        books
    }
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      // do something useful
    }
  });
};
