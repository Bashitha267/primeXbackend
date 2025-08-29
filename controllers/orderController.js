import transporter from "../config/nodemailer.js";
import Order from "../models/orderModel.js";
// POST: Add a new order
const adminEmail = "nimeshspc2k17@gmail.com"
const addOrder = async (req, res) => {
  try {
    // Create and save the new Order document
    const {email,name,phone,projectDetails,service}=req.body
    const newOrder = await Order.create(req.body);
    console.log(process.env.EMAIL)
    console.log(process.env.PASSWORD)


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
     const mailOptionsadmin = {
  from: `"PrimeX Studio" <${process.env.EMAIL}>`,
  to: adminEmail, // client email
  
  subject: "New Order Alert,PrimeX Studios",
  html: `
    <h3>New Order from ${name},</h3>
   
   
    <ul>
      <li><strong>Service:</strong> ${service}</li>
      <li><strong>Project Details:</strong> ${projectDetails}</li>
       <li><strong>Client Contact:</strong>${phone}</li>
       <li><strong>Client Email:</strong>${email}</li>
        

    </ul>
     <p>Check the admin dashboard for more details.</p>
    <p>PrimeX Studios</p>
  `,
};
   await transporter.sendMail(mailOptions);
    console.log("Client email sent ✅");

    await transporter.sendMail(mailOptionsadmin);
    console.log("Admin email sent ✅");
    res.status(201).json({
      success: true,
      message: "Order created successfully",
    
    });









  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create order or Email sending error",
      error: error.message,
    });
  }
};

// GET: Fetch all orders
const getOrders = async (req, res) => {
  try {
    // You can adjust fields to return only what you want for frontend
    const orders = await Order.find();

    res.status(200).json({
      success: true,
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export default { addOrder, getOrders };
