import {combineReducers, createStore, applyMiddleware } from "redux"
import { composeWithDevTools } from 'redux-devtools-extension';
import thunkMiddleware from 'redux-thunk'
import { userRegisterReducer, userLoginReducer } from "./reducers/userReducer";



const reducer = combineReducers({
  userRegisterReducer: userRegisterReducer,
  userLoginReducer: userLoginReducer
})

const userInfoStorage = localStorage.getItem('hotelUserInfo')?

JSON.parse(localStorage.getItem('hotelUserInfo')) : null

const initialReducer = {
  userRegisterReducer:  {user: userInfoStorage}
}
const middleware = [thunkMiddleware]

const store = createStore(
  reducer, 
  initialReducer,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store