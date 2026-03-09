import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        // Demo accounts for development
        const demoUsers = [
          { id: "1", email: "admin@influencermarketing.tr", password: "admin123", name: "Admin User", role: "admin", plan: "enterprise", company: "InfluencerMarketing.tr", image: null },
          { id: "2", email: "demo@influencermarketing.tr", password: "demo123", name: "Demo User", role: "user", plan: "professional", company: "Demo Company", image: null },
          { id: "3", email: "user@influencermarketing.tr", password: "user123", name: "Free User", role: "user", plan: "free", company: "Startup Inc.", image: null },
        ]

        const user = demoUsers.find(
          (u) => u.email === credentials.email && u.password === credentials.password
        )

        if (user) {
          return { id: user.id, email: user.email, name: user.name, role: user.role, plan: user.plan, company: user.company, image: user.image }
        }

        // For any other email/password combo in dev, create a user
        if (process.env.NODE_ENV === "development") {
          return { id: "dev-user", email: credentials.email, name: "Dev User", role: "user", plan: "professional", company: "Dev Co.", image: null }
        }

        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role
        token.plan = (user as any).plan
        token.company = (user as any).company
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.sub
        ;(session.user as any).role = token.role
        ;(session.user as any).plan = token.plan
        ;(session.user as any).company = token.company
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}
