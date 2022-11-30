import nodemailer from "nodemailer";

export const sendEmail = async () => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.TRANSPORTER_USER,
          pass: process.env.TRANSPORTER_PASS
        }
      });
      
      const mailOptions = {
        from: process.env.TRANSPORTER_USER,
        to: process.env.TO_EMAIL,
        subject: 'Subject',
        text: 'Email content'
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
       console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
          // do something useful
        }
      });
};
