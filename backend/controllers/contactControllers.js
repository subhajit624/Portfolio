import Contact from "../models/contactModel.js";


export const createContact = async(req, res) => {
    try {
        const { appname, username, link } = req.body;
    if (!appname || !username || !link) {
        return res.status(400).json({ message: "All fields are required" });
    }
    const contact = await Contact.create({
        appname,
        username,
        link
    })
    res.status(201).json({ message: "Contact created successfully", contact });

    } catch (error) {
        console.log("Error creating contact:", error);
        res.status(500).json({ message: "Server error in create contact" });
    }
}

export const getContacts = async(req, res) => {
    try {
        const contacts = await Contact.find().sort({ createdAt: 1 });
        res.status(200).json({ contacts });
    } catch (error) {
        console.log("Error fetching contacts:", error);
        res.status(500).json({ message: "Server error in get contacts" });
    }
}

export const deleteContact = async(req, res) => {
    const { id } = req.params;
    try {
        const contact = await Contact.findByIdAndDelete(id);
        if (!contact) {
            return res.status(404).json({ message: "Contact not found" });
        }
        res.status(200).json({ message: "Contact deleted successfully" });
    } catch (error) {
        console.log("Error deleting contact:", error);
        res.status(500).json({ message: "Server error in delete contact" });
    }
}