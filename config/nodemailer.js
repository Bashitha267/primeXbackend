import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,           // 465 for SSL, 587 for TLS
  secure: true,        // true for port 465
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD, // Use an App Password for Gmail
  },
});

// Optional: verify SMTP connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error("SMTP connection failed:", error);
  } else {
    console.log("SMTP ready to send emails ✅");
  }
});

export default transporter;
