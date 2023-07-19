import nodemailer from 'nodemailer';
import bcryptjs from 'bcryptjs';
import User from '@/models/user-model';

const EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours
export enum EmailType {
  VERIFY,
  RESET,
}

export async function sendEmail({ email, emailType, userId }: any) {
  try {
    // create a hashed token to serve as verifyToken
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === EmailType.VERIFY) {
      const dbRes = await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: new Date(Date.now() + EXPIRY_TIME),
      });
    }

    if (emailType === EmailType.RESET) {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: new Date(Date.now() + EXPIRY_TIME),
      });
    }

    var transporter = nodemailer.createTransport({
      host: 'sandbox.smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASSWORD,
      },
    });

    const verifyMessage =
      emailType === EmailType.VERIFY
        ? 'Verify your email'
        : 'Reset your password';

    const verifyLink = `${process.env.DOMAIN}/verifyemail?token=${hashedToken}`;

    const mailOptions = {
      from: 'todosnext@gmail.com',
      to: email,
      subject: verifyMessage,
      html: `<p>
      Click 
      <a href="${verifyLink}">${verifyLink}</a> 
      to ${verifyMessage} or copy and pase the link below into your browser 
      <br/>
      ${verifyLink}
      </p>`,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
}
