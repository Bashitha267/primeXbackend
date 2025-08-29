import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      trim: true,
      required: true,
    },
    service: {
      type: String,
      required: true, // e.g., "Web Development", "Graphic Design"
      trim: true,
    },
    projectDetails:{
        type: String,
        required:true,
    }
   
  },
  { timestamps: true } // automatically adds createdAt and updatedAt
);

// module.exports = mongoose.model("Order", OrderSchema);
const Order=mongoose.model('Orders',OrderSchema)
export default Order;