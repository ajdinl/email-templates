import '../styles/globals.scss'
import { Roboto } from 'next/font/google'
import Provider from './context/Provider'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'The Email Template Application',
  description: 'A simple application to create and send email templates',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <Provider>
        <body className={roboto.className}>{children}</body>
      </Provider>
    </html>
  )
}
