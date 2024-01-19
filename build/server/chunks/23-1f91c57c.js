import { wrapServerLoadWithSentry } from '@sentry/sveltekit';
import { b as bypassPrisma, c as companyPrisma } from './prisma-50863289.js';
import './sentry-release-injection-file-4a7720ec.js';
import '@prisma/client';

const load$1 = async () => {
  const newCompany = await bypassPrisma.company.create({
    data: {
      name: "MyCompanyTest",
      email: "CompanyEmail@email.com"
    }
  });
  let context = companyPrisma(newCompany.id);
  let user = await context.user.create({ data: {
    companyId: newCompany.id
  } });
  return { text: "Hello", company: newCompany, user: user.id };
};
const load = load$1 ? wrapServerLoadWithSentry(load$1) : void 0;

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 23;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-5ad3068a.js')).default;
const server_id = "src/routes/testing/+page.server.ts";
const imports = ["_app/immutable/nodes/23.PM8-Qd82.js","_app/immutable/chunks/scheduler.RAkbNlF_.js","_app/immutable/chunks/index.5brJxJeu.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=23-1f91c57c.js.map
