import nodemailer from "nodemailer";

// Create transporter object using basic authentication
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USERNAME, // Your Gmail address
    pass: process.env.EMAIL_APP_PASSWORD, // App password you generated
  },
});

// Send email function remains the same
const sendEmail = async ({ name, email, message }) => {
  // define email options
  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: "New Contact Form Submission - Guides Connected",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  return transporter.sendMail(mailOptions);
};

export default sendEmail;
