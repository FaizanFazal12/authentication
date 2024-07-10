import dbConnect from "@/app/connect/connect";
import User from "@/models/User";
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks:{
    async signIn({ user, account, profile, email, credentials }) {
      if (account.provider === 'github') {
        await dbConnect();

       
        const existingUser = await User.findOne({ email: email });

        if (!existingUser) {
         
          const newUser = new User({
            name: profile.name,
            username: profile.login,
            email: profile.email,
            image: profile.avatar_url,
            
          });

          await newUser.save();
        } else {
          // Update the user's profile information if necessary
          existingUser.name = profile.name;
          existingUser.username = profile.login;
          existingUser.image = profile.avatar_url;
          existingUser.email= profile.email;
          // Add other fields if necessary

          await existingUser.save();
        }
        return true;
      }

      // Add your own logic here to check if the user is allowed to sign in
     
    },
  }
}

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions)