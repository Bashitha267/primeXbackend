// eventModel.js
import mongoose from "mongoose";

const EventSchema = new mongoose.Schema(
  {
    //front end displaying
    eventName: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    images: {
      type: [String], // Array of image URLs/paths
      required: true,
    },
    category: {
      type: String,
      enum: ["wedding", "conferences", "birthday", "live", "other","photoshoots"],
      default: "other",
    },
    //backend
    status: {
      type: String,
      enum: ["planned", "completed", "cancelled"],
      default: "planned",
    },
    notes: {
      type: String,
      trim: true,
    },

    // 💰 Financial Tracking
    budget: {
      type: Number, // total budget for the event
      default: 0,
    },
    advance: {
      type: Number, // advance payment amount
      default: 0,
    },
    advanceDate: {
      type: Date, // when advance was paid
    },
    fullPaymentDate: {
      type: Date, // when final payment is due/paid
    },

    // 📅 Event Timeline
    eventDate: {
      type: Date, // actual event date
      required: false,
    },
  },
  { timestamps: true }
);

// module.exports = mongoose.model("Events", EventSchema);
const EventModel=mongoose.model('Events',EventSchema)
export default EventModel;
