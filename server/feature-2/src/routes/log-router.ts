import express from "express"
import { login, loginLimiter, logout } from "../controllers/log-controller"

const router = express.Router()

router.route("/login").post(loginLimiter, login)
router.route("/logout").post(logout)

export default router; 