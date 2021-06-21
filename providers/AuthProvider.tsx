import * as React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../lib/firebase";
import firebase from "firebase/app";
import { Maybe } from "../types";

const contextDefaultValues = {
  user: undefined
}
export const AuthContext = React.createContext<AuthContextState>(contextDefaultValues);

export const AuthProvider: React.FC = ({ children }) => {  
  const [user] = useAuthState(auth)

  React.useEffect(() => {
    let unsubscribe
    if (user) {
      const ref = firestore.collection('users').doc(user.uid);
      unsubscribe = ref.onSnapshot((doc) => {
      });
    }
    return unsubscribe;
  }, [user])

  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

type AuthContextState = {
  user: firebase.User | null | undefined
}