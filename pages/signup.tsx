import router from "next/dist/client/router";
import React, { useEffect } from "react";
import { Button } from "../components/Button";
import { Google } from "../components/icons/Icons";
import { FirebaseContext } from "../providers/FirebaseProvider";

export default function SignupPage() {
  const { user } = React.useContext(FirebaseContext);
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
  const { handleAuth } = React.useContext(FirebaseContext);
  const signInWithGoogle = async () => {
    await handleAuth?.()
  }
  return (
    <Button colour="google" onClick={() => signInWithGoogle()} className="flex items-center pl-2">
      <Google /><span className="pl-4">Sign in with Google</span>
    </Button>
  )
}
