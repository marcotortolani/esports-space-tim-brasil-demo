import { Montserrat, Poppins } from 'next/font/google'
import dynamic from 'next/dynamic'
import Providers from '@/providers/Providers'

const Header = dynamic(() => import('./components/ui/Header'))
const Footer = dynamic(() => import('./components/ui/Footer'))
const DownbarMobile = dynamic(() => import('./components/ui/DownbarMobile'))
import './globals.css'

import ChatBot from './components/ChatBot'
import Background from './components/home/Background'

import dictionary from '@/dictionary/lang.json'

const montserrat = Montserrat({
  subsets: ['latin'],
  preload: true,
  display: 'swap',
  variable: '--font-montserrat',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

const poppins = Poppins({
  subsets: ['latin'],
  preload: true,
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

export const metadata = {
  title: dictionary['title'],
  description: dictionary['description'],
  version: '1.2.1',
  openGraph: {
    title: dictionary['title'],
    description: dictionary['description'],
    url: '',
    siteName: dictionary['siteName'],
    locale: dictionary['locale'],
    type: 'website',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang={dictionary['lang']}>
      <body
        className={`${montserrat.variable} ${poppins.variable} z-0 relative w-screen overflow-scroll overflow-x-hidden scroll-smooth flex flex-col items-center bg-Background `}
      >
        <Background />
        <Header />
        <Providers>{children}</Providers>
        <DownbarMobile />
        <ChatBot />
        <Footer />
      </body>
    </html>
  )
}
