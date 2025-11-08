import express from 'express';
import * as notesController from "../controllers/notes.controller.js";
import * as authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/create', authMiddleware.userAuth, notesController.create);
router.put('/update/:id', authMiddleware.userAuth, notesController.update);

export default router;