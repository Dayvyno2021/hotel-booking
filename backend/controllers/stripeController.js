import User from "../models/userModel.js"
// import stripe from "stripe"

// const strype = stripe(process.env.STRIPE_SECRET)


//@ desc: POST find user
//@ route: GET /api/create-connect-account
//@ access: private

// `${user.name.substring(0, 3)}-${accountId}`

const createConnectAccount = async(req, res) =>{
  try {
    const user = await User.findById(req.user._id).select('-password')

    if (!user.stripe_account_id){
      const accountId = Math.floor(Math.random() * (10000000000 - 1)) + 1;
      user.stripe_account_id = `${user.name.substring(0, 3)}-${accountId}`
      await user.save();
      res.json({
        email: user.email,
        _id: user._id
      })

    } else if (user){
      res.json({
        email: user.email,
        _id: user._id
      })
    }
    else{
      res.status(400).json({message: "This stripe thing don still fail again"})
    }

  } catch (error) {
    res.status(400).json({
      message: "Unathorized user",
      systemMessage: error
    })
  }
}


//@ desc: POST find Update Account Status
//@ route: POST '/api/get-account-status'
//@ access: private

const getAccountStatus = async(req, res)=>{

  try {
    
    const userUpdate = await User.findById(req.user._id).select("-password")
    if (userUpdate){
      userUpdate.stripe_seller = {
        id : userUpdate.stripe_account_id,
        object : "account",
        charges_enabled: true,
        country: req.user.country,
        details_submitted: true,
        default_currency: "NGN",
        balance: 100000
      }
      await userUpdate.save()

      res.json(userUpdate)

    } else{
      res.status(400).json({
        message: "Payment was not accepted"
      })
    }

  } catch (error) {
    res.status(400).json({
      message: "Server down, could not make payment",
      systemMessage: process.env.NODE_ENV==='production'? null : error
    })
  }  
    
}

//@ desc: POST update Account Balance
//@ route: POST '/api/get-account-balance'
//@ access: private

const getAccountBalance = async(req, res)=>{   
  try {
    const user = await User.findById(req.user._id).select('-password')
    if (user && user.stripe_seller){
      res.json(user.stripe_seller.balance)
    } else res.json(10000)
  } catch (error) {
    res.status(400).json({
      message: "Could not find user account balance",
      systemMessage: process.env.NODE_ENV==='production'? null : error
    })
  }
}


export {createConnectAccount, getAccountStatus, getAccountBalance}