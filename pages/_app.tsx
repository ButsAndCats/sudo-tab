import '../styles/global.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { AppProvider } from '../providers/AppProvider'
import { ModalProvider } from '../providers/ModalProvider'
import { AuthProvider } from '../providers/AuthProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ModalProvider>
        <AppProvider>
          <Component {...pageProps} />
        </AppProvider>
      </ModalProvider>
    </AuthProvider>
  )
}
export default MyApp
