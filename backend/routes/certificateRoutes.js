import express from "express";
import multer from "multer";
import { createCertificate, deleteCertificate, getCertificates } from "../controllers/certificateControllers.js";

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/create", upload.single("image"), createCertificate);
router.get("/get", getCertificates);
router.delete("/delete/:id", deleteCertificate);

export default router;