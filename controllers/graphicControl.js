import graphicModel from "../models/graphicModel.js";

// POST: Add a new graphic project
const addGraphic = async (req, res) => {
  try {
    // Create and save the new Graphic document
    const newGraphic = await graphicModel.create(req.body);

    res.status(201).json({
      success: true,
      message: "Graphic project created successfully",
    //   data: newGraphic, // return the created document
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create graphic project",
      error: error.message,
    });
  }
};

// GET: Fetch all graphics with selected fields
const getGraphics = async (req, res) => {
  try {
    const graphics = await graphicModel.find({}, "title category image");
    
    res.status(200).json({
      success: true,
      count: graphics.length,
     graphics, // only selected fields
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch graphics",
      error: error.message,
    });
  }
};

export default { addGraphic, getGraphics };
