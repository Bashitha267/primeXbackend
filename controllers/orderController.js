import sgMail from '@sendgrid/mail';
import dotenv from 'dotenv';
import Order from '../models/orderModel.js';
dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const adminEmail = "nimeshspc2k17@gmail.com"; // admin email

export const addOrder = async (req, res) => {
  try {
    const { email, name, phone, projectDetails, service } = req.body;

    // Save order in database
    const newOrder = await Order.create({ email, name, phone, projectDetails, service });

    // Client email
    const clientMsg = {
      to: email,
      from: "primexstudio2025@gmail.com", // must be verified
      subject: "Order Received - Thank You",
      html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for contacting us. We have received the following details:</p>
        <ul>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Project Details:</strong> ${projectDetails}</li>
        </ul>
        <p>We will get back to you shortly.</p>
        <p>Best regards,<br/>PrimeX Studios</p>
        <p style="font-size: 12px; color: gray;">PrimeX Studios, 123 Your Street, City, Country</p>
      `,
    };

    // Admin email
    const adminMsg = {
      to: adminEmail,
      from: "primexstudio2025@gmail.com", // same verified sender
      subject: "New Order Alert - PrimeX Studios",
      html: `
        <h3>New Order from ${name}</h3>
        <ul>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Project Details:</strong> ${projectDetails}</li>
          <li><strong>Client Contact:</strong> ${phone}</li>
          <li><strong>Client Email:</strong> ${email}</li>
        </ul>
        <p>Check the admin dashboard for more details.</p>
        <p>PrimeX Studios</p>
        <p style="font-size: 12px; color: gray;">PrimeX Studios, 123 Your Street, City, Country</p>
      `,
    };

    // Send emails concurrently
    await Promise.all([
      sgMail.send(clientMsg),
      sgMail.send(adminMsg)
    ]);

    console.log("Client and Admin emails sent ✅");

    res.status(201).json({
      success: true,
      message: "Order created successfully",
    });

  } catch (error) {
    console.error("Error in addOrder:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create order or send email",
      error: error.message,
    });
  }
};


// GET: Fetch all orders
const getOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Error in getOrders:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export default { addOrder, getOrders };
