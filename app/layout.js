import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import StoreProvider from './StoreProvider'
import ErrorBoundary from '@/components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Decodress - Dress Decoded, Style Encoded',
  description: 'Decodress - Dress Decoded, Style Encoded',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
          <StoreProvider>
            <Navbar />
            {children}
            <Footer />
          </StoreProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
