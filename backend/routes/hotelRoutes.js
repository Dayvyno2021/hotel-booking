import {admin, protect} from '../middleware/authMiddleware.js'
import formidableMiddleware from 'express-formidable'
const router = express.Router()
import express from 'express'
import { 
  allHotels, 
  createHotel, 
  deleteHotelAdmin, 
  image, 
  sellerHotels,
  singleHotel
} from '../controllers/hotelControllers.js'



router.route('/create-hotel').post(protect, formidableMiddleware(), createHotel)
router.route('/hotels').get(allHotels)
router.route('/hotel/image/:hotelId').get(image)
router.route('/seller-hotels').get(protect, sellerHotels)
router.route('/hotel/delete/:id').delete(protect, admin, deleteHotelAdmin)
router.route('/hotel/:hotelId').get(singleHotel)

export default router