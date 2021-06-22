import '../styles/global.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import React from 'react'
import firebase from "firebase/app"
import { FirebaseProvider } from '../providers/FirebaseProvider'
import { AppProvider } from '../providers/AppProvider'
import { ModalProvider } from '../providers/ModalProvider'

function MyApp({ Component, pageProps }: AppProps) {
  const [loaded, setLoaded] = React.useState<boolean>(false);
  React.useEffect(() => {
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
      setLoaded(true)
    }
    
  }, [])
  
  return loaded ? (
    <FirebaseProvider>
      <ModalProvider>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </ModalProvider>
    </FirebaseProvider>
  ) : null
}
export default MyApp
