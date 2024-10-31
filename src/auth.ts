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
	General = AuthScopes.General >> 1,
	Finance = AuthScopes.Finance >> 1,
	Order = AuthScopes.Order >> 1,
	Info = AuthScopes.Info >> 1,
	Email = AuthScopes.Email >> 1,
}

export enum ReadWriteClaims {
	General = ReadClaims.General | WriteClaims.General,
	Finance = ReadClaims.Finance | WriteClaims.Finance,
	Order = ReadClaims.Order | WriteClaims.Order,
	Info = ReadClaims.Info | WriteClaims.Info,
	Email = ReadClaims.Email | WriteClaims.Email,
}

const ROLES = {
	super:
		ReadWriteClaims.General |
		ReadWriteClaims.Finance |
		ReadWriteClaims.Order |
		ReadWriteClaims.Info |
		ReadWriteClaims.Email,
	test:
		ReadWriteClaims.General |
		ReadWriteClaims.Finance |
		ReadWriteClaims.Order |
		ReadWriteClaims.Info |
		ReadWriteClaims.Email,
	finance:
		ReadWriteClaims.General |
		ReadWriteClaims.Finance |
		ReadWriteClaims.Order |
		ReadWriteClaims.Info,
	operator:
		ReadWriteClaims.General | ReadWriteClaims.Order | ReadWriteClaims.Info | ReadWriteClaims.Email,
	coordinator:
		ReadWriteClaims.General | ReadWriteClaims.Order | ReadWriteClaims.Info | ReadWriteClaims.Email,
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
	trustHost: true,
	providers: [
		...(!ENV.PRODUCTION
			? [
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

							console.log('Roles:', roles);
							console.log(credentials?.name);

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
				]
			: []),
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
			// Check if the role and role_name keys are present in the user object
			const euser = user as ExtendedUser;

			if (user && euser?.role && euser?.role_name) {
				const euser = user as ExtendedUser;
				token.id = euser.id;
				token.role = euser.role;
				// User is available during sign-in
				token.role_name = euser.role_name;
			}

			if (account?.provider === 'azure-ad') {
				// For now any account logging in with Azure AD will have the super role
				token.role = ROLES.super;
				token.role_name = 'super';
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
