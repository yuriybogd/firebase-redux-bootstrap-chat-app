import { firebaseReducer } from "react-redux-firebase"
import { combineReducers } from "redux"

// Reducers
import authReducer from "../features/auth/authSlice"

export const rootReducer = combineReducers({
  firebase: firebaseReducer,
  auth: authReducer,
})
