import express from "express";
import passport from "passport";
import { signup, login, logout, chekAuth, getAllUser } from "../controllers/authController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/getAllUser', getAllUser)
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post('/isAuth', authenticateJWT, chekAuth)


export default router;
