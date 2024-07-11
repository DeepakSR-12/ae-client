import NextAuth from 'next-auth';
import TwitterProvider from 'next-auth/providers/twitter';

export const authOptions = {
	providers: [
		TwitterProvider({
			clientId: process.env.TWITTER_CLIENT_ID!,
			clientSecret: process.env.TWITTER_CLIENT_SECRET!,
			version: '2.0',
		}),
	],
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user, account, profile, email }) {
			if (user) {
				token.user = user;
			}
			if (account) {
				token.account = account;
			}
			if (profile) {
				token.profile = profile;
			}
			if (email) {
				token.email = email;
			}
			// Add any credentials if they exist
			return token;
		},
		async session({ session, token }) {
			session.token = token;
			console.log(":::: session,,,", session)
			return session;
		},
		async signIn({ user, account, profile, email, credentials }) {
			// api call to save information
			console.log(" user, account, profile, email, credentials",  user, account, profile, email, credentials)
			return true;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
