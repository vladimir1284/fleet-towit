import { sequence } from '@sveltejs/kit/hooks';
import { handleErrorWithSentry, sentryHandle } from '@sentry/sveltekit';
import * as Sentry from '@sentry/sveltekit';
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
	ENVIRONMENT
} from '$env/static/private';
import EmailProvider from '@auth/core/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const ska_handle = SvelteKitAuth({
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
		//signOut: '/auth/signout',
		//error: '/auth/error', // Error code passed in query string as ?error=
		verifyRequest: '/verifyRequest' // (used for check email message)
		//newUser: '/signup' // New users will be directed here on first sign in (leave the property out if not of interest)
	}
});
if (ENVIRONMENT==="Production") {
	Sentry.init({
		dsn: 'https://264c6d3e8448a85d1a3717e5ef22a502@o4506418139299840.ingest.sentry.io/4506418143035392',
		tracesSampleRate: 1.0
	});		
}
// If you have custom handlers, make sure to place them after `sentryHandle()` in the `sequence` function.
export const handle = sequence(sentryHandle(), ska_handle);

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();
