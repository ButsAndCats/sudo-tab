import router from "next/dist/client/router";
import React, { useEffect } from "react";
import { auth, googleAuthProvider } from "../lib/firebase"
import { AuthContext } from "../providers/AuthProvider";
import { Button } from "../components/Button";
import { GoogleIcon } from "../components/icons/Icons";

export default function SignupPage({ }) {
  const { user } = React.useContext(AuthContext);

  useEffect(() => {
    if (user) {
      router.push('/')
    }
  }, [user])

  return (
    <main className="max-w-2xl mx-auto px-4 py-4">
      <h1 className="text-4xl font-bold mb-4">Sign up or login</h1>
      <p className="mb-4">Login with Google to use your new tab settings across multiple browsers.</p>
      <GoogleSignUpButton />
    </main>
  )
}

const GoogleSignUpButton: React.FC = () => {
  const signInWithGoogle = async () => {
    await auth.signInWithPopup(googleAuthProvider);
  }
  return (
    <Button colour="google" onClick={() => signInWithGoogle()} className="flex items-center pl-2">
      <GoogleIcon /><span className="pl-4">Sign in with Google</span>
    </Button>
  )
}

