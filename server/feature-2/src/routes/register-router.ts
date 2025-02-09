import express from "express"
import { confirmEmail, register } from "../controllers/register-controller"

const router = express.Router()

router.route("/").post(register)
router.route("/confirm-email").get(confirmEmail)

export default router; 