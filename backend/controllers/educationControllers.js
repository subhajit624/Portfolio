import Education from "../models/educationModel.js";


export const createEducation = async (req, res) => {
  try {
    const {
      institution,
      degree,
      fieldOfStudy,
      startYear,
      endYear,
      gpa,
      percentage,
      location,
      description
    } = req.body;

    if (!institution || !degree || !fieldOfStudy || !startYear) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const education = await Education.create({
      institution,
      degree,
      fieldOfStudy,
      startYear,
      endYear,
      gpa,
      percentage,
      location,
      description
    });

    res.status(201).json({
      message: "Education added successfully",
      education
    });

  } catch (error) {
    console.log("Error creating education:", error);
    res.status(500).json({ message: "Server error while creating education" });
  }
};


export const getEducation = async (req, res) => {
  try {
    const educationList = await Education.aggregate([
      {
        $addFields: {
          startYearNum: { $toInt: "$startYear" } // convert string → number
        }
      },
      {
        $sort: { startYearNum: -1 } // latest starting year first
      },
      {
        $project: { startYearNum: 0 } // remove temporary field
      }
    ]);

    res.status(200).json(educationList);

  } catch (error) {
    console.log("Error fetching education:", error);
    res.status(500).json({ message: "Server error while fetching education" });
  }
};



export const deleteEducation = async (req, res) => {
  try {
    const { id } = req.params;

    const education = await Education.findByIdAndDelete(id);

    if (!education) {
      return res.status(404).json({ message: "Education not found" });
    }

    res.status(200).json({ message: "Education deleted successfully" });

  } catch (error) {
    console.log("Error deleting education:", error);
    res.status(500).json({ message: "Server error while deleting education" });
  }
};
