import React, { useContext, useState, useEffect } from "react"
import { auth, fns } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('authUser')))
  const [loading, setLoading] = useState(false)

  function signup(email, password, ville, numClient) {
    const registerUser = fns.httpsCallable('registerUser');
    return registerUser({email, password, ville, numClient})
  }

  function verifyEmail(){
    console.log(currentUser)
    return currentUser.sendEmailVerification()
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
  }

  function logout() {
    return auth.signOut()
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email)
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password)
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if(authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser))
        setCurrentUser(authUser)
      } else {
        localStorage.removeItem("authUser")
        setCurrentUser(null)
      }
      console.log(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    verifyEmail
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}