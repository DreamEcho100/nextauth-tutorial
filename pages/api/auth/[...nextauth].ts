import NextAuth, { NextAuthOptions } from 'next-auth';
// import GoogleProvider from 'next-auth/providers/google';
// import FacebookProvider from 'next-auth/providers/facebook';
import CredentialsProvider from 'next-auth/providers/credentials';
import GithubProvider from 'next-auth/providers/github';
// import TwitterProvider from 'next-auth/providers/twitter';
// import Auth0Provider from 'next-auth/providers/auth0';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

// import AppleProvider from "next-auth/providers/apple"
// import EmailProvider from "next-auth/providers/email"

const prisma = new PrismaClient();

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
	// https://next-auth.js.org/configuration/providers/oauth
	adapter: PrismaAdapter(prisma),
	providers: [
		EmailProvider({
			server: process.env.EMAIL_SERVER,
			from: process.env.EMAIL_FROM,
		}),
		CredentialsProvider({
			credentials: {
				email: {
					label: 'Email',
					type: 'text ',
					placeholder: 'jsmith@example.com',
				},
				password: { label: 'Password', type: 'password' },
			},
			async authorize(credentials, req) {
				// You need to provide your own logic here that takes the credentials
				// submitted and returns either a object representing a user or value
				// that is false/null if the credentials are invalid.
				// e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
				// You can also use the `req` object to obtain additional parameters
				// (i.e., the request IP address)
				const res = await fetch('http://localhost:3000/api/login', {
					method: 'POST',
					body: JSON.stringify(credentials),
					headers: { 'Content-Type': 'application/json' },
				});

				// interface IUser {
				// 	name: string;
				// 	email: string;
				// }

				const user /*: IUser*/ = await res.json();

				// If no error and we have user data, return it
				if (res.ok && user) {
					console.dir(res);
					console.dir(user);
					return user;
				}
				// Return null if user data could not be retrieved
				return null;
			},
		}),
		GithubProvider({
			clientId: process.env.GITHUB_ID,
			clientSecret: process.env.GITHUB_SECRET,
			// // https://docs.github.com/en/developers/apps/building-oauth-apps/scopes-for-oauth-apps
			// scope: ['read:user, user:email'],
		}),
		/*
    // Temporarily removing the Apple provider from the demo site as the
    // callback URL for it needs updating due to Vercel changing domains
    Providers.Apple({
      clientId: process.env.APPLE_ID,
      clientSecret: {
        appleId: process.env.APPLE_ID,
        teamId: process.env.APPLE_TEAM_ID,
        privateKey: process.env.APPLE_PRIVATE_KEY,
        keyId: process.env.APPLE_KEY_ID,
      },
    }),
    */
		// FacebookProvider({
		//   clientId: process.env.FACEBOOK_ID,
		//   clientSecret: process.env.FACEBOOK_SECRET,
		// }),
		// GoogleProvider({
		//   clientId: process.env.GOOGLE_ID,
		//   clientSecret: process.env.GOOGLE_SECRET,
		// }),
		// TwitterProvider({
		//   clientId: process.env.TWITTER_ID,
		//   clientSecret: process.env.TWITTER_SECRET,
		// }),
		// Auth0Provider({
		//   clientId: process.env.AUTH0_ID,
		//   clientSecret: process.env.AUTH0_SECRET,
		//   issuer: process.env.AUTH0_ISSUER,
		// }),
	],
	theme: {
		colorScheme: 'dark',
	},
	// Events are useful for logging
	// https://next-auth.js.org/configuration/events
	events: {
		signIn: ({ user, account, profile, isNewUser }) => {
			console.log(`isNewUser: ${JSON.stringify(isNewUser)}`);
		},
		// updateUser({ user })
	},
	secret: process.env.SECRET,
	// session: {
	//   jwt: true
	// }
	// jwt: {
	//   secret: process.env.SECRET,
	// }
	// callbacks: {
	// 	async jwt({ token }) {
	// 		token.userRole = 'admin';
	// 		return token;
	// 	},
	// },
};

export default NextAuth(authOptions);
