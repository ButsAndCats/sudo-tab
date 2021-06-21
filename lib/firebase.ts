import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"

  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAKAXfP8_th0g-bRuDEty6yiTOBNBmGOFY",
  authDomain: "sudo-tab.firebaseapp.com",
  projectId: "sudo-tab",
  storageBucket: "sudo-tab.appspot.com",
  messagingSenderId: "473342681499",
  appId: "1:473342681499:web:2230c5896d876b7dab013e",
  measurementId: "G-YW56N2EVEQ"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig)
}

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();

export const firestore = firebase.firestore()
export const storage = firebase.storage()