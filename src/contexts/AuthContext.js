import React, { useContext, useState, useEffect } from "react"
import { auth, fns } from "../firebase"

const AuthContext = React.createContext()

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem('authUser')))
  const [loading, setLoading] = useState(false)

  function signup(email, password, ville, numClient, tel) {
    const registerUser = fns.httpsCallable('registerUser');
    return registerUser({email, password, ville, numClient, tel})
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

  function getCurrentUser(){
    return JSON.parse(window.localStorage.getItem('authUser'));
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if(authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser))
        setCurrentUser(authUser)
        console.log("I am changing to online")
      } else {
        localStorage.removeItem("authUser")
        setCurrentUser(null)
        console.log("I am changing to offline")
      }
      
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
    verifyEmail,
    getCurrentUser
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}