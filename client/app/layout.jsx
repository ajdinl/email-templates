import '../styles/globals.scss'
import { Roboto } from 'next/font/google'
import Provider from './context/Provider'
import { getServerSession } from 'next-auth/next'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: 'The Email Template Application',
  description: 'A simple application to create and send email templates',
}

export default async function RootLayout({ children }) {
  const session = await getServerSession()
  return (
    <html lang='en'>
      <Provider>
        <body className={roboto.className}>{children}</body>
      </Provider>
    </html>
  )
}
