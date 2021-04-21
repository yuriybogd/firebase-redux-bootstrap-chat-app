import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { rootReducer } from "./rootReducer"
import firebase from 'firebase/app'
import rrfConfig from "./config"
import { createFirestoreInstance } from 'redux-firestore'
import { getFirebase } from 'react-redux-firebase'

// Ignore Firebase serializable Actions
const middleware = getDefaultMiddleware({
  serializableCheck: false,
  thunk: {
    extraArgument: { getFirebase },
  },
})

const store = configureStore({
  reducer: rootReducer,
  middleware
})

export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
}

export default store
