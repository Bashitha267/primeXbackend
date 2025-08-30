import cloudinary from "../config/cloudinary.js";
import EventModel from "../models/eventModel.js";
// POST: Add a new event
const addEvent = async (req, res) => {
  try {
    // Create and save the new Event document
    const newEvent = await EventModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Event created successfully",
       // returning the created document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create event",
      error: error.message,
    });
  }
};

// GET: Fetch all events with selected fields
const getEvents = async (req, res) => {
  try {
    const events = await EventModel.find({}, "eventName description category images");

    res.status(200).json({
      success: true,
      count: events.length,
    events, // only selected fields
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch events",
      error: error.message,
    });
  }
};





export const uploadImages = async (req, res) => {
  // 1. Check if files exist on the request
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).json({ success: false, error: "No files were uploaded." });
  }

  // 2. Normalize the files input to always be an array
  const files = Array.isArray(req.files.images) ? req.files.images : [req.files.images];

  try {
    // 3. Create an array of upload promises
    const uploadPromises = files.map(file => {
      // Create a base64 string from the file buffer for Cloudinary
      const b64 = Buffer.from(file.data).toString("base64");
      let dataURI = "data:" + file.mimetype + ";base64," + b64;
      
      // Return the promise from Cloudinary's uploader
      // The 'folder' property has been removed to upload to the default directory
      return cloudinary.uploader.upload(dataURI, {
        resource_type: "auto", // Automatically detect the resource type
      });
    });

    // 4. Wait for all promises to resolve
    const results = await Promise.all(uploadPromises);

    // 5. Extract the secure URLs from the results
    const urls = results.map(result => result.secure_url);

    // 6. Send a success response with the URLs
    res.json({ success: true, urls });

  } catch (err) {
    console.error("Error during Cloudinary upload:", err);
    res.status(500).json({ success: false, error: "Image upload failed. Please try again." });
  }
};

export default { addEvent, getEvents };

