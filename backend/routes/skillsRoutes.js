import express from "express";
import { createSkill, deleteSkill, getSkills} from "../controllers/skillsControllers.js";

const router = express.Router();

router.post('/create', createSkill);
router.get('/get', getSkills);
router.delete('/delete/:id', deleteSkill);

export default router;