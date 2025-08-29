// graphicModel.js
import mongoose from "mongoose";

const GraphicSchema = new mongoose.Schema(
  {
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
    //frontend
    title: {
      type: String,
      required: true, // Design project title
      trim: true,
    },
    description: {
      type: String,
      required: true, // Short details about the design project
      trim: true,
    },
    //frontend
    image: {
      type: String, // Single image URL / file path
      required: true,
    },

    // 📅 Dates
    requiredDate: {
      type: Date, // Client deadline
      required: true,
    },
    deliveredDate: {
      type: Date, // When design was delivered
    },

    // 🎨 Category
    //frontend
    category: {
      type: String,
      enum: [
        "all designs",
        "social media",
        "visiting cards",
        "booklets",
        "t-shirt",
        "banners",
        "artworks",
      ],
      default: "all designs",
    },

    notes: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Graphic", GraphicSchema);

const graphicModels=mongoose.model("Graphic", GraphicSchema);
export default graphicModels;