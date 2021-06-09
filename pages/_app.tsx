import '../styles/global.css'
import 'tailwindcss/tailwind.css'
import type { AppProps } from 'next/app'
import React from 'react'
import { AppProvider } from '../providers/AppProvider'
import { ModalProvider } from '../providers/ModalProvider'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ModalProvider>
      <AppProvider>
        <Component {...pageProps} />
      </AppProvider>
    </ModalProvider>
  )
}
export default MyApp
