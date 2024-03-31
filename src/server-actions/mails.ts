"use server";
import nodemailer from "nodemailer";

export const sendEmail = async ({
  recipientEmail,
  subject,
  html,
}: {
  recipientEmail: string;
  subject: string;
  html: string;
}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // Use `true` for port 465, `false` for all other ports
      auth: {
        user: process.env.NODEMAILER_AUTH_USER,
        pass: process.env.NODEMAILER_AUTH_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.NODEMAILER_AUTH_USER,
      to: recipientEmail,
      subject,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent to: ", recipientEmail);
    return true;
  } catch (error: any) {
    console.error("Error sending email: ", error);
  }
};
