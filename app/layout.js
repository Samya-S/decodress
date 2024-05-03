import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import StoreProvider from './StoreProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CodesWear',
  description: 'CodesWear.com - Wear the code',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <Navbar />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  )
}