/* eslint-disable @typescript-eslint/ban-ts-comment */
//@ts-nocheck
import { sequence } from '@sveltejs/kit/hooks';
import { handleErrorWithSentry, sentryHandle } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';
import { type Handle } from '@sveltejs/kit';
import { SvelteKitAuth } from '@auth/sveltekit';
import Google from '@auth/core/providers/google';
import {
	GOOGLE_CLIENT_ID,
	GOOGLE_CLIENT_SECRET,
	SMTP_HOST,
	SMTP_PORT,
	SMTP_USER,
	SMTP_PASSWORD,
	EMAIL_FROM,
	ENVIRONMENT,
	AUTH_SECRET
} from '$env/static/private';
import EmailProvider from '@auth/core/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { getTenantUsers } from '$lib/actions/user';
const prisma = new PrismaClient();

import { getAdminTenant } from '$lib/actions/admin';
import { bypassPrisma, tenantPrisma } from '$lib/prisma';
import {
	USER_TENANT_HEADER,
	BAD_REQUEST_RESPONSE,
	FORBIDDEN_ACCESS_RESPONSE
} from '$lib/shared/helpers';

const handleAuth = (async (...args) => {
	const [{ event }] = args;
	return SvelteKitAuth({
		callbacks: {
			async signIn({ user }) {
				const guest = await prisma.user.findFirst({ where: { email: user.email } });
				if (guest) {
					return true;
				} else {
					console.log('Unauthorized: ', user);
					// Return false to display a default error message
					return false;
					// Or you can return a URL to redirect to:
					// return '/unauthorized'
				}
			},
			async session({ session, user }) {
				const tenantUsers = await getTenantUsers({ userId: user.id });
				const defaultTenantUser = tenantUsers.find(tenantUser => tenantUser.is_default);
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
				from: EMAIL_FROM,
				allowDangerousEmailAccountLinking: true
			})
		],
		pages: {
			signIn: '/signin',
			error: '/error', // Error code passed in query string as ?error=
			verifyRequest: '/verifyRequest'
		},
		trustHost: true,
		secret: AUTH_SECRET
	})(...args);
}) satisfies Handle;

if (ENVIRONMENT === 'Production') {
	Sentry.init({
		dsn: 'https://264c6d3e8448a85d1a3717e5ef22a502@o4506418139299840.ingest.sentry.io/4506418143035392',
		tracesSampleRate: 1.0
	});
}

const handleGenericActionRequest: Handle = async ({ event, resolve }) => {
	// Remove the conditional to turn it into a generic handle.
	if (event.url.pathname.startsWith('/api/inventory/parts')) {
		const session = await event.locals.getSession();
		if (!session?.user) {
			return new Response(FORBIDDEN_ACCESS_RESPONSE, { status: 403 });
		}
		// Request header configuration.
		const userTenantHeader = event.request.headers.get(USER_TENANT_HEADER);
		const user = session.user as CustomUserSession;
		const currentUserData = user.tenantUsers.find(
			(tenantUser) => tenantUser.id === userTenantHeader
		);

		if (!currentUserData) {
			return new Response(BAD_REQUEST_RESPONSE, { status: 400 });
		}
		const adminTenant = await getAdminTenant();
		const currentPrismaClient =
			currentUserData.tenant.id === adminTenant?.id
				? bypassPrisma
				: tenantPrisma(currentUserData.tenant.id);

		event.locals.currentPrismaClient = currentPrismaClient;
	}
	const response = await resolve(event);
	return response;
};

// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
export const handle = sequence(sentryHandle(), handleAuth, handleGenericActionRequest);

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
