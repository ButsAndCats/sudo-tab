import * as React from "react";
import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import "firebase/storage"
import { Maybe } from "../types";
import { useAuthState } from "react-firebase-hooks/auth";

const contextDefaultValues = {
  auth: undefined,
  googleAuthProvider: undefined,
  firestore: undefined,
  storage: undefined,
  user: undefined,
  handleAuth: () => {
    console.error('handleAuth is not defined');
  },
}

export const FirebaseContext = React.createContext<FirebaseContextState>(contextDefaultValues);

export const FirebaseProvider: React.FC = ({ children }) => {  
  const [auth, setAuth] = React.useState<FirebaseContextState["auth"]>(contextDefaultValues.auth);
  const [googleAuthProvider, setGoogleAuthProvider] = React.useState<FirebaseContextState["googleAuthProvider"]>(contextDefaultValues.googleAuthProvider);
  const [firestore, setFirestore] = React.useState<FirebaseContextState["firestore"]>(contextDefaultValues.firestore);
  const [storage, setStorage] = React.useState<FirebaseContextState["storage"]>(contextDefaultValues.storage);
  const [loaded, setLoaded] = React.useState<boolean>(false);
  const [user] = useAuthState(firebase.auth())
  
  React.useEffect(() => {
    const _auth = firebase.auth()
    const _googleAuthProvider = new firebase.auth.GoogleAuthProvider()
    const _firestore = firebase.firestore()
    const _storage = firebase.storage()
    console.log(firebase)
    setAuth(_auth)
    setGoogleAuthProvider(_googleAuthProvider);
    setFirestore(_firestore)
    setStorage(_storage)
    setLoaded(true)
  }, [])

  const handleAuth = React.useCallback((interactive = true) => {
    
    if (chrome?.identity) { 
      // Running as an extension
      chrome.identity.getAuthToken({
        interactive,
      }, (token) => {
        if (token && auth) {
          const credential = firebase.auth.GoogleAuthProvider.credential(null, token)
          auth.signInWithCredential(credential).catch(function (error) {
            if (error.code === 'auth/invalid-credential') {
              chrome.identity.removeCachedAuthToken({ token }, function() {
                handleAuth()
              })
            }
          })
        } else {
          console.error('The OAuth Token was null');
        }
      })
    } else {
      if (googleAuthProvider) {
        // Running in dev mode
        auth?.signInWithPopup(googleAuthProvider);
      }
    }
    
  }, [auth, googleAuthProvider]);

  return (
    <FirebaseContext.Provider
      value={{
        auth,
        googleAuthProvider,
        firestore,
        storage,
        user,
        handleAuth,
      }}
    >
      {loaded ? children : null}
    </FirebaseContext.Provider>
  )
}

type FirebaseContextState = {
  auth: Maybe<firebase.auth.Auth>
  googleAuthProvider: Maybe<firebase.auth.GoogleAuthProvider>
  firestore: Maybe<firebase.firestore.Firestore>
  storage: Maybe<firebase.storage.Storage>
  user: Maybe<firebase.User | null>
  handleAuth: () => void
}