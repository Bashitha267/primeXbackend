import transporter from "../config/nodemailer.js";
import Order from "../models/orderModel.js";

// POST: Add a new order
const adminEmail = "nimeshspc2k17@gmail.com";

const addOrder = async (req, res) => {
  try {
    // DEBUG: print environment variables (safely)
    console.log("EMAIL:", process.env.EMAIL ? "SET" : "NOT SET");
    console.log("PASSWORD:", process.env.PASSWORD ? "SET" : "NOT SET");

    const { email, name, phone, projectDetails, service } = req.body;

    // DEBUG: print received order data
    console.log("Received order:", { email, name, phone, projectDetails, service });

    // Save order
    const newOrder = await Order.create({ email, name, phone, projectDetails, service });

    // Client email
    const mailOptions = {
      from: `"PrimeX Studio" <${process.env.EMAIL}>`,
      to: email,
      subject: "Order Received - Thank You",
      html: `
        <h3>Hi ${name},</h3>
        <p>Thank you for contacting Us. We have received the following details:</p>
        <ul>
          <li><strong>Service:</strong> ${service}</li>
          <li><strong>Project Details:</strong> ${projectDetails}</li>
        </ul>
        <p>We will get back to you shortly.</p>
        <p>Best regards,<br/>PrimeX Studios</p>
      `,
    };

    // Admin email
    const mailOptionsadmin = {
      from: `"PrimeX Studio" <${process.env.EMAIL}>`,
      to: adminEmail,
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
      `,
    };

    // Send emails
    console.log("Sending client email...");
    await transporter.sendMail(mailOptions);
    console.log("Client email sent ✅");

    console.log("Sending admin email...");
    await transporter.sendMail(mailOptionsadmin);
    console.log("Admin email sent ✅");

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
