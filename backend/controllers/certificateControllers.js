import cloudinary from "../config/cloudinaryConfig.js";
import streamifier from "streamifier";
import Certificate from "../models/certificatesModel.js";

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


export const createCertificate = async (req, res) => {
  try {
    const { name, description, issuedBy, issueDate,link } = req.body;

    let imageUrl = "";

    // If image uploaded
    if (req.file) {
      const result = await uploadFromBuffer(
        req.file.buffer,
        "certificates",
        "image"
      );
      imageUrl = result.secure_url;
    }

    const certificate = new Certificate({
      name,
      description,
      image: imageUrl,
      issuedBy,
      issueDate,
      link
    });

    await certificate.save();

    res.status(201).json({
      message: "Certificate created successfully",
      certificate
    });

  } catch (error) {
    console.error("Error creating certificate:", error);
    res.status(500).json({ message: "Error creating certificate", error: error.message });
  }
};

export const getCertificates = async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });

    res.status(200).json({
      certificates
    });

  } catch (error) {
    console.log("Error fetching certificates:", error);
    res.status(500).json({ message: "Error fetching certificates", error: error.message });
  }
};

export const deleteCertificate = async(req, res) => {
    try {
        const {id} = req.params;
        const certificate = await Certificate.findByIdAndDelete(id);
        if (!certificate) {
            return res.status(404).json({ message: "Certificate not found" });
        }
        res.status(200).json({ message: "Certificate deleted successfully" });
    } catch (error) {
        console.log("Error deleting certificate:", error);
        res.status(500).json({ message: "Error deleting certificate", error: error.message });
    }

}
