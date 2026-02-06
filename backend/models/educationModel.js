import mongoose from "mongoose";

const educationSchema = new mongoose.Schema({
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    fieldOfStudy: { type: String, required: true },
    startYear: { type: String, required: true },
    endYear: { type: String },
    gpa: { type: String },
    percentage: { type: String },
    location: { type: String },
    description: { type: String }
}, { timestamps: true });

const Education = mongoose.model("Education", educationSchema);

export default Education;