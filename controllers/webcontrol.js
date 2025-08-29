import webModel from "../models/webModel.js";

const addwebProject = async (req, res) => {
  try {
    const {
      clientName,
      clientEmail,
      clientPhone,
      title,
      description,
      technologies,
      image,
      url,
      publish,
      hostingStartDate,
      hostingEndDate,
      domainStartDate,
      domainEndDate,
      contact,
      total,
      advance,
      advancePaymentDate,
      fullPaymentDate,
      extraFunctionalities,
      status,
      notes,
    } = req.body;

    // Create new WebSite document
    const newwebProject=await webModel.create(req.body)

    await newwebProject.save();

    res.status(201).json({
      success: true,
      message: "Website project created successfully",
     
    });
  } catch (error) {
    
    res.status(500).json({
      success: false,
      message: "Failed to create website project",
      error: error.message,
    });
  }
};

// export default addwebProject;

//getdata to frontend
// controllers/websiteController.js
 // adjust path if needed

// GET: Fetch all websites with selected fields
const getWebSites = async (req, res) => {
  try {
    const websites = await webModel.find({publish:true}, "title description technologies image url");

    res.status(200).json({
      success: true,
      count: websites.length,
      websites
    });
  } catch (error) {
    // console.error("Error fetching websites:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch websites",
      error: error.message,
    });
  }
};

export default {getWebSites,addwebProject};
