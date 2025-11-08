import express from 'express';
import * as userController from "../controllers/user.controller.js";
import * as authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.post("/logout", userController.logout);
router.get("/profile", authMiddleware.userAuth, userController.profile);

export default router;