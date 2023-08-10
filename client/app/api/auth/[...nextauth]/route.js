import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options = {
  CredentialsProvider: CredentialsProvider({
    name: 'Credentials',
    credentials: {
      username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
      password: { label: 'Password', type: 'password' },
    },
    async authorize(credentials) {
      const user = {
        id: 1,
        name: 'test',
        email: 'test1@test.com',
        password: 'testiram',
      }
      if (
        credentials?.email === user.email &&
        credentials.password === user.password
      ) {
        return user
      } else {
        return null
      }
    },
  }),
  pages: {
    signIn: '/login',
  },
  session: {
    jwt: true,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
}

const handler = NextAuth(options)

export { handler as GET, handler as POST }
