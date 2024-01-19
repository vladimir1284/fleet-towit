import { wrapServerLoadWithSentry } from '@sentry/sveltekit';
import { r as redirect } from './index-d41d8d8d.js';
import { g as getAdminCompany } from './admin-92ee4c14.js';
import { b as bypassPrisma } from './prisma-50863289.js';
import { Role } from '@prisma/client';
import './sentry-release-injection-file-4a7720ec.js';
import '@auth/core/providers/email';

const load$1 = async (event) => {
  const session = await event.locals.getSession();
  const adminCompany = await getAdminCompany();
  const companyUser = await bypassPrisma.companyUser.findFirst({ where: { userId: session?.user?.id, companyId: adminCompany?.id } });
  if (!(companyUser?.role === Role.ADMIN || companyUser?.role === Role.OWNER)) {
    throw redirect(307, "/dashboard");
  }
};
const load = load$1 ? wrapServerLoadWithSentry(load$1) : void 0;

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 3;
let component_cache;
const component = async () => component_cache ??= (await import('./layout.svelte-49c2aaca.js')).default;
const server_id = "src/routes/(authenticated)/admin/+layout.server.ts";
const imports = ["_app/immutable/nodes/3.pPso37c-.js","_app/immutable/chunks/scheduler.RAkbNlF_.js","_app/immutable/chunks/index.5brJxJeu.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=3-e05abbda.js.map
