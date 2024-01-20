import { sentryHandle, handleErrorWithSentry } from '@sentry/sveltekit';
import { d as dev } from './environment-e346e637.js';
import { b as base } from './paths-57a6d830.js';
import { p as private_env } from './index-497d987b.js';
import { Auth } from '@auth/core';
import Google from '@auth/core/providers/google';
import EmailProvider from '@auth/core/providers/email';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import './sentry-release-injection-file-4a7720ec.js';
import './stringify-7b836d4a.js';
import './constants-34d965bd.js';
import './index-d41d8d8d.js';
import './index2-0d39f80d.js';
import './ssr-fdd97ea6.js';

function sequence(...handlers) {
  const length = handlers.length;
  if (!length)
    return ({ event, resolve }) => resolve(event);
  return ({ event, resolve }) => {
    return apply_handle(0, event, {});
    function apply_handle(i, event2, parent_options) {
      const handle2 = handlers[i];
      return handle2({
        event: event2,
        resolve: (event3, options) => {
          const transformPageChunk = async ({ html, done }) => {
            if (options?.transformPageChunk) {
              html = await options.transformPageChunk({ html, done }) ?? "";
            }
            if (parent_options?.transformPageChunk) {
              html = await parent_options.transformPageChunk({ html, done }) ?? "";
            }
            return html;
          };
          const filterSerializedResponseHeaders = parent_options?.filterSerializedResponseHeaders ?? options?.filterSerializedResponseHeaders;
          const preload = parent_options?.preload ?? options?.preload;
          return i < length - 1 ? apply_handle(i + 1, event3, {
            transformPageChunk,
            filterSerializedResponseHeaders,
            preload
          }) : resolve(event3, { transformPageChunk, filterSerializedResponseHeaders, preload });
        }
      });
    }
  };
}
async function getSession(req, config) {
  config.secret ??= private_env.AUTH_SECRET;
  config.trustHost ??= true;
  const prefix = config.prefix ?? `${base}/auth`;
  const url = new URL(prefix + "/session", req.url);
  const request = new Request(url, { headers: req.headers });
  const response = await Auth(request, config);
  const { status = 200 } = response;
  const data = await response.json();
  if (!data || !Object.keys(data).length)
    return null;
  if (status === 200)
    return data;
  throw new Error(data.message);
}
const actions = [
  "providers",
  "session",
  "csrf",
  "signin",
  "signout",
  "callback",
  "verify-request",
  "error"
];
function AuthHandle(svelteKitAuthOptions) {
  return async function({ event, resolve }) {
    const authOptions = typeof svelteKitAuthOptions === "object" ? svelteKitAuthOptions : await svelteKitAuthOptions(event);
    const { prefix = `${base}/auth` } = authOptions;
    const { url, request } = event;
    event.locals.getSession ??= () => getSession(request, authOptions);
    const action = url.pathname.slice(prefix.length + 1).split("/")[0];
    if (!actions.includes(action) || !url.pathname.startsWith(prefix + "/")) {
      return resolve(event);
    }
    return Auth(request, authOptions);
  };
}
function SvelteKitAuth(options) {
  if (typeof options === "object") {
    options.secret ??= private_env.AUTH_SECRET;
    options.trustHost ??= !!(private_env.AUTH_TRUST_HOST ?? private_env.VERCEL ?? dev);
    options.prefix ??= `${base}/auth`;
  }
  return AuthHandle(options);
}
const GOOGLE_CLIENT_ID = "401046444958-oo0nm02gu09o0t0tmuav8vr2cuqtl7jo.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";
const SMTP_USER = "info@towithouston.com";
const SMTP_PASSWORD = "ysQeHzAZ6#KV$KT";
const SMTP_HOST = "smtp.ionos.com";
const SMTP_PORT = "587";
const EMAIL_FROM = "info@towithouston.com";
var _global = typeof window !== "undefined" ? window : typeof globalThis !== "undefined" ? globalThis : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
_global["__sentry_sveltekit_output_dir"] = "build";
const prisma = new PrismaClient();
const handleAuth = async (...args) => {
  const [{ event }] = args;
  return SvelteKitAuth({
    callbacks: {
      async signIn({ user }) {
        let guest = await prisma.user.findFirst({ where: { email: user.email } });
        if (guest) {
          return true;
        } else {
          console.log("Unauthorized: ", user);
          return false;
        }
      },
      async session({ session, user }) {
        session.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image
        };
        event.locals.session = session;
        return session;
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
      signIn: "/signin",
      //error: '/auth/error', // Error code passed in query string as ?error=
      verifyRequest: "/verifyRequest"
    }
  })(...args);
};
const handle = sequence(sentryHandle(), handleAuth);
const handleError = handleErrorWithSentry();

export { handle, handleError };
//# sourceMappingURL=hooks.server-aea965e1.js.map
