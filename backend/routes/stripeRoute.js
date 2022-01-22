import express from "express";
import { 
  createConnectAccount, 
  getAccountBalance, 
  getAccountStatus 
} from "../controllers/stripeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.route('/create-connect-account').post(protect, createConnectAccount)
router.route('/get-account-status').post(protect, getAccountStatus)
router.route('/get-account-balance').post(protect, getAccountBalance)

export default router