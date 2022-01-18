import User from "../models/userModel.js";
import generateToken from '../utils/authToken.js'

//@ desc: POST To create a new user
//@ route: POST /api/user/register
//@ access: public

const registerUser = async(req, res)=>{
 
  try {
    const {name, email, password} = req.body;
    if (!name || !email || !password){
      res.status(400).json('Bad Request, all fields are required')
    } else{
      const userExists = await User.findOne({email}).select('-password')
      if (userExists){
        res.status(400).json({message:'User already exists, try another email'})
      } else{

        const user = await User.create({name, email, password})
        if (user){
          res.json({
            name: user.name,
            email: user.email,
            token: generateToken(user._id),
            _id: user._id,
            isAdmin: user.isAdmin
          })
        } else{
          res.status(400).json('Could not create new user')
        }
      } 
    }
  } catch (error) {
    res.status(400).json({
      message: 'Could not create User',
      systemMessage: process.NODE_ENV === 'production'? null : error
    })
  }

}

//@ desc: POST user login
//@ route: POST /api/user/login
//@ access: public

const login = async(req, res) =>{
  try {
    const {email, password} = req.body
    if (!email || !password){
      res.status(400).json("Bad Request, Email and Password required")
    }else{
      const emailYes = await User.findOne({email})
      if (emailYes && emailYes.checkpassword(password)){
        res.json({
          name: emailYes.name,
          email: emailYes.email,
          token: generateToken(emailYes._id),
          _id: emailYes._id,
          isAdmin: emailYes.isAdmin
        })
      } else{
        res.status(400).json("Server could not find user")
      }
    }
    
  } catch (error) {
    res.status(400).json({
      message: "We could not find any user"
    })
  }
}

//@ desc: GET find user
//@ route: GET /api/user/profile
//@ access: private

const profile = async(req, res) =>{
  try {
    const user = await User.findById(req.user._id).select('-password')
    if (user){
      res.json(user)
    } else{
      res.status(400).json("User not found")
    }
  } catch (error) {
    res.status(400).json({
      message: "Unathorized user: " + error
    })
  }
}

export {
  registerUser,
  login,
  profile
}