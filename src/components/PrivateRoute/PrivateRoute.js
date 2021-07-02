import React from 'react'

export default function ({ component: Component, ...rest }) {
    const { currentUser } = useAuth()
  
    return (
      <Route
        {...rest}
        render={props => {
          return currentUser ? <Component {...props} /> : <Redirect to="/login" />
        }}
      ></Route>
    )
}
