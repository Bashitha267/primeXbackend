// models.js
import mongoose from "mongoose";

// Define schema
const ProjectSchema = new mongoose.Schema(
  {
    //client
    clientName: {
      type: String,
      trim: true,
    },
    clientEmail: {
      type: String,
      trim: true,
      lowercase: true,
    },
    clientPhone: {
      type: String,
      trim: true,
    },
    //front end display
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    technologies: {
      type: [String], // Array of strings
      default: [],
    },
    image: {
      type: String,
      required: true, // Store image URL or file path
    },
    url: {
      type: String,
      required: true, // External project link
    },
    //backend
    hostingStartDate: {
      type: Date,
    },
    hostingEndDate: {
      type: Date,
    },
    domainStartDate: {
      type: Date,
    },
    domainEndDate: {
      type: Date,
    },
    contact: {
      type: String, // Alternative contact info if needed
    },

    // 💰 Financial details
    total: {
      price:{
        type:Number
      }
    },
    advance: {
      type: Number, // advance payment
      default: 0,
    },
    advancePaymentDate: {
      type: Date, // when advance was paid
    },
    fullPaymentDate: {
      type: Date, // when full payment is made
    },

    // 🛠️ Extra Features
    extraFunctionalities: {
      type: [String], // array of custom added features (e.g., "SEO", "Payment Gateway")
      default: [],
    },

    status: {
      type: String,
      enum: ["active", "expired", "pending renewal"],
      default: "active",
    },
    notes: {
      type: String,
      trim: true,
    },
    publish:{
      type:Boolean,
      default:false,
    }
  },
  { timestamps: true }
);

// Export model
const webModel=mongoose.model('WebSites',ProjectSchema)
export default webModel;