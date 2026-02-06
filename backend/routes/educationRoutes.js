import express from "express";
import { createEducation, deleteEducation, getEducation } from "../controllers/educationControllers.js";

const router = express.Router();

router.post('/create', createEducation);
router.get('/get', getEducation);
router.delete('/delete/:id', deleteEducation);

export default router;