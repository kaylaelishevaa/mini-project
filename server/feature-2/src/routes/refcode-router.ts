import express from "express"
import { redeemPoints, checkoutTicket } from "../controllers/refcode-controller"
import { roleGuard } from "../middleware/auth-middleware"

const router = express.Router()

router.route("/redeem-points").post(roleGuard("CUSTOMERS"), redeemPoints)
router.route("/checkout").post(roleGuard("CUSTOMERS"), checkoutTicket)

export default router; 