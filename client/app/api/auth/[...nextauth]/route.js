import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials'

const handler = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Email',
          required: true,
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
          required: true,
        },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/api/users/login`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credentials),
          }
        )
        const user = await res.json()
        if (res.ok && user) {
          return user
        } else {
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      user && (token.user = user)
      return token
    },
    async session({ session, user, token }) {
      session = {
        user: token.user,
      }
      return session
    },
  },
  session: {
    jwt: true,
    maxAge: 24 * 60 * 60,
  },
  theme: {
    colorScheme: 'light',
  },
  pages: {
    signIn: '/login',
  },
})

export { handler as GET, handler as POST }
