import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    image: {
        type: String
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    deployedLink: {
        type: String
    },
    gitLink: {
        type: String
    },
    tech: [{
        type: String
    }]
}, { timestamps: true });

const Project = mongoose.model("Project", projectSchema);

export default Project;