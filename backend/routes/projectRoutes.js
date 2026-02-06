import express from 'express';
import multer from 'multer';
import { createProject, deleteProject, getProjects } from '../controllers/projectControllers.js';

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/create',upload.single('image'), createProject);
router.get('/get', getProjects);
router.delete('/delete/:id', deleteProject);

export default router;