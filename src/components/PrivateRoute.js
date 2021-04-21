import React from "react"
import { useSelector } from "react-redux";
import { isEmpty } from "react-redux-firebase";
import { Route, Redirect } from "react-router-dom"
import { selectAuthFirebaseState } from './../features/auth/authSlice';

export const PrivateRoute = ({ component: Component, ...rest }) => {
const authState = useSelector(selectAuthFirebaseState);

  return (
    <Route
      {...rest}
      render={(props) =>
        !isEmpty(authState) ? <Component {...props} /> : <Redirect to={"/"} />
      }
    />
  )
}
