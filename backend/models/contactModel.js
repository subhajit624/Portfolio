import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    appname: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    link: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;