import NextAuth from 'next-auth';
import { ENV } from './server/env';
import AzureADProvider from 'next-auth/providers/azure-ad';
import CredentialsProvider from 'next-auth/providers/credentials';
import { ExtendedUser } from './next-auth';

enum AuthScopes {
	General = 2 << 0,
	Finance = 2 << 1,
	Order = 2 << 2,
	Info = 2 << 3,
	Email = 2 << 4,
}

export enum ReadClaims {
	General = AuthScopes.General,
	Finance = AuthScopes.Finance,
	Order = AuthScopes.Order,
	Info = AuthScopes.Info,
	Email = AuthScopes.Email,
}

export enum WriteClaims {
	General = (AuthScopes.General - 1) | ReadClaims.General,
	Finance = (AuthScopes.Finance - 1) | ReadClaims.Finance,
	Order = (AuthScopes.Order - 1) | ReadClaims.Order,
	Info = (AuthScopes.Info - 1) | ReadClaims.Info,
	Email = (AuthScopes.Email - 1) | ReadClaims.Email,
}

const ROLES = {
	super:
		WriteClaims.General |
		WriteClaims.Finance |
		WriteClaims.Order |
		WriteClaims.Info |
		WriteClaims.Email,
	test:
		WriteClaims.General |
		WriteClaims.Finance |
		WriteClaims.Order |
		WriteClaims.Info |
		WriteClaims.Email,
	finance: WriteClaims.General | WriteClaims.Finance | WriteClaims.Order | WriteClaims.Info,
	operator: WriteClaims.General | WriteClaims.Order | WriteClaims.Info | WriteClaims.Email,
	coordinator: WriteClaims.General | WriteClaims.Order | WriteClaims.Info | WriteClaims.Email,
	instructor: ReadClaims.General | ReadClaims.Order | ReadClaims.Info,
	support: ReadClaims.General | ReadClaims.Order | ReadClaims.Info,
};

export const {
	handlers: { GET, POST },
	auth,
	signIn,
	signOut,
} = NextAuth({
	session: { strategy: 'jwt' },
	providers: [
		CredentialsProvider({
			name: 'Dev Auth Provider',
			credentials: {
				name: { label: 'Username', type: 'text', placeholder: 'jsmith' },
				email: { label: 'Email', type: 'email', placeholder: 'jsmith@example.com' },
				password: { label: 'Password', type: 'password', placeholder: '' },
			},
			async authorize(credentials) {
				if (
					credentials?.name === 'reject' ||
					credentials?.name === null ||
					credentials?.email === null ||
					credentials?.password === null
				) {
					return null;
				}

				const roles = Object.keys(ROLES);
				const role = roles.includes(credentials?.name as string)
					? ROLES[credentials?.name as keyof typeof ROLES]
					: ROLES['test'];

				const role_name = roles.includes(credentials?.name as string)
					? (credentials?.name as keyof typeof ROLES)
					: 'test';

				const now = new Date();
				const time_hash = now.getTime().toString(16);

				const user: ExtendedUser = {
					id: time_hash,
					role: role,
					role_name: role_name,
					name: (credentials?.name as string) ?? '',
					email: (credentials.email as string) ?? '',
				};

				return user;
			},
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
	events: {},
	callbacks: {
		jwt({ token, account, user }) {
			if (user) {
				// User is available during sign-in
				const euser = user as ExtendedUser;
				token.id = euser.id;
				token.role = euser.role;
				token.role_name = euser.role_name;
			}
			return token;
		},

		session({ token, session }) {
			if (token.role && session.user) {
				session.user.role = token.role as any;
			}

			if (token.role_name && session.user) {
				session.user.role_name = token.role_name as any;
			}
			if (session.user) {
				//session.user.name = token.name;
				session.user.email = token.email ?? 'missing';
			}

			return session;
		},
	},
});
