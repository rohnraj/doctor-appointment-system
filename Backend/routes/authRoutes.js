import express from "express";
import { signup, login, logout, chekAuth, getAllUser, googleController, googleCallbackController } from "../controllers/authController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/getAllUser', getAllUser)
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post('/isAuth', authenticateJWT, chekAuth)
router.get('/google', googleController)
router.get('/google/callback', googleCallbackController)


export default router;
