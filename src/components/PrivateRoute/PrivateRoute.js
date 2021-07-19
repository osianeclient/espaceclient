import React from "react"
import { Route, Redirect } from "react-router-dom"
import { useAuth } from "contexts/AuthContext"

export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth()
  
  console.log(currentUser)
  return (
    <Route
      {...rest}
      render={props => {
        return currentUser.emailVerified ? <Component {...props} /> : <Redirect to="/auth/login" />
      }}
    ></Route>
  )
}
