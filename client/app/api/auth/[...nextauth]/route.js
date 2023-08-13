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
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Password',
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

        return user
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      user && (token.user = user)
      return token
    },
    async session({ session, token, user }) {
      session = {
        ...session,
        user: {
          id: user.id,
          ...session.user,
        },
      }
      return session
    },
  },
})

export { handler as GET, handler as POST }
