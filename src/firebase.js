import firebase from "firebase/app"
import "firebase/auth"

const app = firebase.initializeApp({
  apiKey: "AIzaSyCPez96rwR1ZWG09W6pzyR_u1vNN0lhejc",
  authDomain: "cliente2c-72f60.firebaseapp.com",
  projectId: "cliente2c-72f60",
  storageBucket: "cliente2c-72f60.appspot.com",
  messagingSenderId: "221218923418",
  appId: "1:221218923418:web:994a3df385903bd630d023",
  measurementId: "G-FCGTCZERPK"
})

export const auth = app.auth()
export default app