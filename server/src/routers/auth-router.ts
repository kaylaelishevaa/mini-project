import express from "express";
import { Register, confirmEmail, login } from "../controllers/auth-controller";

const router = express.Router();

router.route("/register").post(Register);
router.route("/login").post(login);
router.route("/logout").post(login);
router.route("/confirm-email").get(confirmEmail);

export default router;
