import NextAuth from "next-auth"
import { ENV } from "./server/env";
import AzureADProvider from "next-auth/providers/azure-ad";
import CredentialsProvider from "next-auth/providers/credentials";


export const { handlers: { GET, POST }, auth, signIn, signOut, } = NextAuth({
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Dev Auth Provider",
      credentials: {
        name: { label: "Username", type: "text", placeholder: "jsmith" },
        email: { label: "Username", type: "text", placeholder: "jsmith" },
      },
      async authorize(credentials) {
        if (credentials?.name === "admin") {
            return null;
        }
        
        const user: any = {
          // id: v4(),
          name: credentials?.name || "hey",
          email: credentials?.email || "ho",
          // image: null,
        }


        return user
      }
    }),
    AzureADProvider({
      clientId: ENV.AZURE_AD_CLIENT_ID,
      clientSecret: ENV.AZURE_AD_CLIENT_SECRET,
      tenantId: ENV.AZURE_AD_TENANT_ID,
      // authorization: {
      //   params: { scope: "openid profile user.Read email" },
      //   url: `https://login.microsoftonline.com/${ENV.AZURE_AD_TENANT_ID!}/oauth2/v2.0/authorize`,
      // },
      // token: {
      //   params: { scope: "openid profile user.Read email" },
      //   url: `https://login.microsoftonline.com/${ENV.AZURE_AD_TENANT_ID!}/oauth2/v2.0/token`,
      // },
    }),
  ],
  events: {
  },
  callbacks: {
    async session({ token, session }) {

      if (session.user) {
        session.user.role = "alma";
      }
      // if (token.sub && session.user) {
      //   session.user.id = token.sub;
      // }

      // if (token.role && session.user) {
      //   session.user.role = token.role as any;
      // }

    
      // if (session.user) {
      //   session.user.name = token.name;
      //   session.user.email = token.email;
      // }

      return session;
    },

    // async jwt({ token }) {
    //   return token;
    // }
  },
  
});
