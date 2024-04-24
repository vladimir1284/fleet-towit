//@ts-ignore
import { sequence } from '@sveltejs/kit/hooks';
import { handleErrorWithSentry } from '@sentry/sveltekit';
// import * as Sentry from '@sentry/sveltekit';
import { type Handle } from '@sveltejs/kit';
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import Credentials from '@auth/core/providers/credentials';
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	SMTP_HOST,
	SMTP_PORT,
	SMTP_USER,
	SMTP_PASSWORD,
	EMAIL_FROM,
	ENVIRONMENT,
	KILLBILL,
	AUTH_SECRET
} from '$env/static/private';
import EmailProvider from '@auth/core/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { getTenantUsers } from '$lib/actions/tenantUsers';
import { redirect } from '@sveltejs/kit';
const prisma = new PrismaClient();

import { getAdminTenant } from '$lib/actions/admin';
import { bypassPrisma, tenantPrisma } from '$lib/prisma';
import { building } from '$app/environment';
import { syncKillBill } from './killbill/killbill';

/*
if (KILLBILL === true) {
	console.log('Kill Bill initial sync!');
	if (!building) {
		syncKillBill();
	}
}
*/
const handleAuth = (async (...args) => {
	const [{ event }] = args;
	return SvelteKitAuth({
		callbacks: {
			async signIn({ account, user }) {
				if (account?.provider === 'google') {
					return true;
				}
				const guest = await prisma.user.findFirst({ where: { email: user.email } });
				if (guest) {
					console.log('Authorized: ', user);
					return true;
				} else {
					console.log('Unauthorized: ', user);
					// Return false to display a default error message
					return false;
					// Or you can return a URL to redirect to:
					// return '/unauthorized'
				}
			},
			jwt({ token, user }) {
				console.log(user);
				if (user) {
					// User is available during sign-in
					token.id = user.id;
				}
				return token;
			},
			async session({ session, token }) {
				console.log(token, 'candle');
				const user = token
				const tenantUsers = await getTenantUsers({ id: user.id });
				const defaultTenantUser = tenantUsers.find((tenantUser) => tenantUser.is_default);
				session.user = {
					id: user.id,
					name: user.name,
					email: user.email,
					image: user.image,
					tenantUsers,
					defaultTenantUser
				};
				event.locals.session = session;
				return session;
			},
			async redirect({ url, baseUrl }) {
				/* Allows relative callback URLs
				if (url.startsWith('/')) return `${baseUrl}${url}`;

				// Allows callback URLs on the same origin
				if (new URL(url).origin === baseUrl) return url;
				*/
				return baseUrl;
			}
		},
		adapter: PrismaAdapter(prisma),
		providers: [
			Google({
				clientId: GOOGLE_CLIENT_ID,
				clientSecret: GOOGLE_CLIENT_SECRET,
				allowDangerousEmailAccountLinking: true
			}),
			EmailProvider({
				server: {
					host: SMTP_HOST,
					port: SMTP_PORT,
					auth: {
						user: SMTP_USER,
						pass: SMTP_PASSWORD
					}
				},
				from: EMAIL_FROM
			}),
			Credentials({
				credentials: {
					email: {},
					password: {}
				},
				authorize: async (credentials) => {
					let user = null;
					//const pwHash = saltAndHashPassword(credentials.password);
					const pwHash = credentials.password;
					user = await prisma.user.findFirst({
						where: {
							email: credentials.email,
							pwHash: pwHash
						}
					});
					if (!user) {
						throw new Error('User not found.');
					}
					return user;
				}
			})
		],
		pages: {
			signIn: '/signin',
			//error: '/error', // Error code passed in query string as ?error=
			verifyRequest: '/verifyRequest'
		},
		trustHost: true,
		secret: AUTH_SECRET,
		session: {
			strategy: 'jwt'
		}
	})(...args);
}) satisfies Handle;

// if (ENVIRONMENT === 'Production') {
// 	Sentry.init({
// 		dsn: 'https://264c6d3e8448a85d1a3717e5ef22a502@o4506418139299840.ingest.sentry.io/4506418143035392',
// 		tracesSampleRate: 1.0
// 	});
// }
const adminPaths = ['/admin'];
const apiPaths = ['/api'];

function isAdminPath(path: string) {
	return adminPaths.some((adminPath) => path === adminPath || path.startsWith(adminPath + '/'));
}

function isApiPath(path: string) {
	return apiPaths.some((apiPath) => path === apiPath || path.startsWith(apiPath + '/'));
}

const handleGenericActionRequest: Handle = async ({ event, resolve }) => {
	const session = await event.locals.getSession();

	if (!session?.user && isApiPath(new URL(event.request.url).pathname)) {
		if (ENVIRONMENT == 'Production') {
			return new Response('Forbidden', { status: 403 });
		}
	}

	if (session) {
		const currentUserData = session?.user.defaultTenantUser;
		const adminTenant = await getAdminTenant();
		const currentPrismaClient =
			currentUserData?.tenantId == adminTenant?.id
				? bypassPrisma
				: tenantPrisma(currentUserData?.tenantId);
		event.locals.currentInstance = {
			currentTenant: currentUserData?.tenant,
			currentTenantUser: currentUserData,
			currentPrismaClient: currentPrismaClient
		};

		if (
			!currentUserData?.tenant.isAdmin &&
			currentUserData?.role !== 'ADMIN' &&
			isAdminPath(new URL(event.request.url).pathname)
		) {
			throw redirect(302, '/dashboard');
		}
	}
	const response = await resolve(event);
	return response;
};

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
// export const handle = sequence(sentryHandle(), handleAuth, handleGenericActionRequest);
export const handle = sequence(handleAuth, handleGenericActionRequest);

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
