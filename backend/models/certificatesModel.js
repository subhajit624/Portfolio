import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String},
    image: { type: String},
    issuedBy: { type: String},
    issueDate: { type: String},
    link: {type: String}
}, { timestamps: true } );

const Certificate = mongoose.model("Certificate", certificateSchema);

export default Certificate;