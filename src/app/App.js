import React from "react"
import { Switch, Route, BrowserRouter as Router } from "react-router-dom"
import store, { rrfProps } from "./store"
import { Provider } from "react-redux"
import { ReactReduxFirebaseProvider } from "react-redux-firebase"
import "bootstrap/dist/css/bootstrap.min.css"

// Firebase Imports
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import { firebaseConfig } from './config'

// Pages
import LoginPage from "./../pages/LoginPage"
import { HomePage } from "./../pages/HomePage"
import { ChatPage } from "./../pages/ChatPage"
import { RegisterPage } from "./../pages/RegisterPage"

// Features

//Components
import { PrivateRoute } from "../components/PrivateRoute"

// Firebase Init
firebase.initializeApp(firebaseConfig)
firebase.firestore()

const App = () => {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider {...rrfProps}>
        <Router>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <PrivateRoute path="/chat" component={ChatPage} />
          </Switch>
        </Router>
      </ReactReduxFirebaseProvider>
    </Provider>
  )
}

export default App
