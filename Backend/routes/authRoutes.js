import express from "express";
import passport from "passport";
import { signup, login, logout, chekAuth, getAllUser , googleOAuthCallback } from "../controllers/authController.js";
import { authenticateJWT } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/getAllUser', getAllUser)
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post('/isAuth', authenticateJWT, chekAuth)
router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));
router.get("/google/callback", passport.authenticate("google", { session: false }), googleOAuthCallback);

export default router;
