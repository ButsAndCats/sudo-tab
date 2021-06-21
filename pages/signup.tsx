import router from "next/dist/client/router";
import React, { useEffect } from "react";
import { auth, googleAuthProvider } from "../lib/firebase"
import { AuthContext } from "../providers/AuthProvider";

export default function SignupPage({ }) {
  const { user, username } = React.useContext(AuthContext);

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  return (
    <main>
      <h1>Signup</h1>

      <GoogleSignUpButton />
    </main>
  )
}

const GoogleSignUpButton: React.FC = () => {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  }
  return (
    <button onClick={() => signInWithGoogle()}>
      Sign in with google
    </button>
  )
}

