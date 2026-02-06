import { Router } from "express";
import { createContact, deleteContact, getContacts } from "../controllers/contactControllers.js";

const router = Router();

router.post('/create', createContact);
router.get('/get', getContacts);
router.delete('/delete/:id', deleteContact);

export default router;