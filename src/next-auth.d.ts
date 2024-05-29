import NextAuth, { type DefaultSession } from 'next-auth';

export type ExtendedUser = DefaultSession['user'] & {
	role: number;
	role_name: string;
};

declare module 'next-auth' {
	interface Session {
		user: ExtendedUser;
	}
}
