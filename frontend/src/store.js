import {combineReducers, createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import { countryEntityReducer, stripeAccountReducer, stripePersonalReducer } from "./reducers/stripeReducers";
import { userRegisterReducer, userLoginReducer,  } from "./reducers/userReducer";



const reducer = combineReducers({
  userRegisterReducer: userRegisterReducer,
  userLoginReducer: userLoginReducer,
  stripeAccountReducer: stripeAccountReducer,
  countryEntityReducer: countryEntityReducer,
  stripePersonalReducer: stripePersonalReducer

})

const userInfoStorage = localStorage.getItem('hotelUserInfo')?
  JSON.parse(localStorage.getItem('hotelUserInfo')) : null

const userAccountDetails = localStorage.getItem('userAccountDetails')? 
  JSON.parse(localStorage.getItem('userAccountDetails')): ''

const stripeInfo = localStorage.getItem("stripeInfo")?
  JSON.parse(localStorage.getItem("stripeInfo")) : {}

const countryEntity = localStorage.getItem("countryEntity")?
  JSON.parse(localStorage.getItem("countryEntity")) : {}

const personalDetails = localStorage.getItem("personalDetails")?
  JSON.parse(localStorage.getItem("personalDetails")) : {}

const initialReducer = {
  userRegisterReducer:  {user: userInfoStorage},
  userLoginReducer:  {user: userInfoStorage},
  stripeAccountReducer: {
    userAccount: userAccountDetails,
    stripeInfo: stripeInfo,
    countryEntity: countryEntity,
    personalDetails: personalDetails
  }
}
const middleware = [thunkMiddleware]

const store = createStore(
  reducer, 
  initialReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store