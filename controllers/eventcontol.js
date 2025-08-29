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

export default { addEvent, getEvents };
