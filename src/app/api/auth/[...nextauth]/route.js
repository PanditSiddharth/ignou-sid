import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken"

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          })
    ],
    callbacks: {
        async session(session, user) {
          // Generate JWT token with additional fields
          const token = jwt.sign({
            image: session?.session?.user?.image,
            email: session?.session?.user?.email,
            name: session?.session?.user?.name,
            // Add any other fields you want to include
          }, process.env.JWT_TOKEN);
    
          // Add the JWT token to the user's session
          session.session.token = token;
    
          return session;
        },
      },
})

export { handler as GET, handler as POST }