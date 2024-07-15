import dbConnect from "@/connect";
import User from "@/models/User";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === "github") {
        await dbConnect();

        const existingUser = await User.findOneAndUpdate(
          { email: profile.email },
          {
            name: profile.name,
            username: profile.login,
            image: profile.avatar_url,
            email: profile.email,
          },
          { new: true, upsert: true }
        );

        return true;
      }

      // Add your own logic here to check if the user is allowed to sign in
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);
