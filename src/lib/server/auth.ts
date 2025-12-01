import { betterAuth } from 'better-auth/minimal';
import { sveltekitCookies } from 'better-auth/svelte-kit';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { magicLink } from 'better-auth/plugins';
import { getDrizzleClient, type DrizzleClient } from './db';
import { account, session, user, verification } from './better-auth-schema';
import { sendVerificationEmail, sendMagicLinkEmail } from './email';
import { getRequestEvent } from '$app/server';

const getGoogleConfig = (platform?: App.Platform) => {
	const googleClientId = platform?.env?.GOOGLE_CLIENT_ID;
	const googleClientSecret = platform?.env?.GOOGLE_CLIENT_SECRET;
	if (!googleClientId || !googleClientSecret) {
		throw new Error('GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET must be set on platform.env');
	}

	return {
		google: {
			clientId: googleClientId,
			clientSecret: googleClientSecret
		}
	};
};

export function createAuth(platform?: App.Platform, db?: DrizzleClient) {
	const database = db ?? getDrizzleClient(platform);

	const auth = betterAuth({
		secret: platform?.env?.BETTER_AUTH_SECRET ?? 'dev-secret-change-me',
		basePath: '/api/auth',
		emailAndPassword: { enabled: true, requireEmailVerification: true },
		emailVerification: {
			sendOnSignUp: true,
			sendOnSignIn: true,
			sendVerificationEmail
		},
		database: drizzleAdapter(database, {
			provider: 'sqlite',
			schema: {
				user,
				session,
				account,
				verification
			}
		}),
		socialProviders: getGoogleConfig(platform),
		plugins: [
			magicLink({
				sendMagicLink: async ({ email, url }) => {
					await sendMagicLinkEmail({ email, url });
				}
			}),
			sveltekitCookies(getRequestEvent)
		]
	});

	return auth;
}
