import Skill from "../models/skillsModel.js";


export const createSkill = async(req, res) => {
   try {
    const { name, tech } = req.body;
    if (!name || !tech) {
        return res.status(400).json({ message: "All Fields are Required" });
    }
    const skill = await Skill.create({ name, tech });
    res.status(201).json({ message: "Skill Created Successfully", skill });
   } catch (error) {
    console.log("Error in creating skill", error);
    res.status(500).json({ message: "Server Error in create Skill" });
   }
};

export const getSkills = async(req, res) => {
  try {
    const skills = await Skill.find().sort({ createdAt: 1 });
    res.status(200).json({message: "Get All Skills Successfully", skills });
  } catch (error) {
    console.log("Error in getting skills", error);
    res.status(500).json({ message: "Server Error in getskill" });
  }
};

export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const skill = await Skill.findByIdAndDelete(id);
    if(!skill){
        return res.status(404).json({ message: "Skill Not Found" });
    }
    res.status(200).json({ message: "Skill Deleted Successfully" });
  } catch (error) {
    console.log("Error in deleting skill", error);
    res.status(500).json({ message: "Server Error in delete skill" });
  }
};