import * as nodemailer from 'nodemailer';

export const sendMail = async (options: any) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

    const mailOptions = {
      from: process.env.USER,
      to: options.email,
      subject: options.subject,
      text: options.message,
    };

    transporter.sendMail(mailOptions);
  } catch (error) {
    console.log(error);
    throw error;
  }
};
