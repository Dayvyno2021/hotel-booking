import express from "express";
import { createConnectAccount, getAccountStatus } from "../controllers/stripeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.route('/create-connect-account').post(protect, createConnectAccount)
router.route('/get-account-status').post(protect, getAccountStatus)

export default router