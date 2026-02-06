import cloudinary from "../config/cloudinaryConfig.js";
import streamifier from "streamifier";
import Project from "../models/projectModel.js";

// Upload helper for memory buffer
const uploadFromBuffer = (buffer, folder, resourceType) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: resourceType },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};


export const createProject = async (req, res) => {
  try {
    const { title, description, deployedLink, gitLink, tech } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "Image is required" });
    }

    // Upload image to Cloudinary
    const result = await uploadFromBuffer(
      req.file.buffer,
      "projects",
      "image"
    );

    const project = new Project({
      image: result.secure_url,
      title,
      description,
      deployedLink,
      gitLink,
      tech: tech ? tech.split(",") : []
    });

    await project.save();

    res.status(201).json({
      message: "Project created successfully",
      project
    });

  } catch (error) {
    console.error("Error creating project:", error);
    res.status(500).json({ message: "Error creating project", error: error.message });
  }
};

export const getProjects = async(req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.status(200).json(projects);
    } catch (error) {
        console.log("Error fetching projects:", error);
        res.status(500).json({ message: "Error fetching projects", error: error.message });
    }
}

export const deleteProject = async(req, res) => {
    try {
        const { id } = req.params;
        const project = await Project.findByIdAndDelete(id);
        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }
        res.status(200).json({ message: "Project deleted successfully" });
    } catch (error) {
        console.log("Error deleting project:", error);
        res.status(500).json({ message: "Error deleting project", error: error.message });
    }
}