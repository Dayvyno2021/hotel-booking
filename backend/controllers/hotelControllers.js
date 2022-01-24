import Hotel from "../models/hotelModel.js";
import fs from 'fs'


//@ desc: POST To create or add a new hotel
//@ route: POST '/api/create-hotel
//@ access private
export const createHotel = async(req, res) =>{
  try {
    const fields = req.fields
    const files = req.files

    const hotel =await new Hotel(fields)

    //Handle Image
    if (files && files.image){
      hotel.image.data = fs.readFileSync(files.image.path)
      hotel.image.ContentType = files.image.type
      hotel.postedBy = req.user._id
    }
    await hotel.save((err, result)=>{
      if (err){
        res.status(404).json({message: "image file could not be saved"})
      } else{
        res.json(result)
      }
    })

  } catch (error) {
    res.status(400).json({
      message: "Could not save data",
      systemMessage: process.env.NODE_ENV==="production"? null : error
    })
  }
}

//@ desc GET all available hotels
//@ route GET'/api/hotel
//@ access: public
export const allHotels = async(req, res) =>{
  try {
    const hotels = await Hotel.find({})
    .limit(24).select("-image.data").populate('postedBy', '_id name');
    if (hotels){
      res.json(hotels)
    } else{
      res.status(400).json({message: "Could not access hotels"})
    }

  } catch (error) {
    res.status(400).json({
      message: "Server down",
      systemMessage: process.env.NODE_ENV==="production"? null : error
    })
  }
}

//@ desc GET describe a particular hotel
//@ route GET'/api/hotel/image/:hotelId
//@ access: public
export const image = async(req, res) =>{
  try {
    const hotel = await Hotel.findById(req.params.hotelId)
    if (hotel && hotel.image && hotel.image.data !== null){
      res.set('Content-Type', hotel.image.ContentType)
      res.send(hotel.image.data)
    }

  } catch (error) {
    res.status(400).json({
      message: "Server down, could not fetch image",
      systemMessage: process.env.NODE_ENV==="production"? null : error
    })
  }
}


//@ desc GET all the hotels of a seller
//@ route GET'/api/seller-hotels
//@ access: private
export const sellerHotels = async(req, res) =>{
  try {
    const allSellerhotel = await Hotel.find({postedBy: req.user._id})
    .select('-image.data').populate('postedBy', '_id name')

    if (allSellerhotel){
      res.json(allSellerhotel)
    }else{
      res.status(400).json({message: "Could not find seller\'s Id"})
    }

  } catch (error) {
    res.status(400).json({
      message: "Server down, could not find seller\'s hotel",
      systemMessage: process.env.NODE_ENV==="production"? null : error
    })
  }
}


//@ desc GET Delete Hotel by Admin only
//@ route GET'/api/hotel/delete/:id
//@ access: private, admin
export const deleteHotelAdmin = async(req, res) =>{
  try {
    const hotel = await Hotel.findById(req.params.id)

    // const removed = await Hotel.findByIdAndDelete(req.params.id)
    // removed is the hotel that was deleted. you can return to frontend if you like


    if (hotel){
      await hotel.remove()
      res.json('Hotel Deleted')
    } else{
      res.status(400).json({
        message: 'Problem deleting hotel'
      })
    }

  } catch (error) {
    res.status(400).json({
      message: "Server down, could not delete hotel",
      systemMessage: process.env.NODE_ENV==="production"? null : error
    })
  }
}


//@ desc GET Delete Hotel by Admin only
//@ route GET'/api/hotel/:hotelId'
//@ access: private
export const singleHotel = async(req, res) =>{
  try {
    const hotel = await Hotel.findById(req.params.hotelId)
    .select('-image.data').populate('postedBy', '_id name')
    if (hotel){
      res.json(hotel)
    } else{
      res.status(404).json({
        message: "Hotel not found"
      })
    }
  } catch (error) {
    res.status(400).json({
      message: "Server down, could not fetch hotel",
      systemMessage: process.env.NODE_ENV==="production"? null : error
    })
  }
}