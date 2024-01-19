import { wrapServerLoadWithSentry } from '@sentry/sveltekit';
import { s as superValidate } from './superValidate-395df3da.js';
import { f as fail } from './index-d41d8d8d.js';
import { g as getAdminCompany, a as createCompanyUser, b as listCompanyUsers } from './admin-92ee4c14.js';
import { Role } from '@prisma/client';
import { z } from 'zod';
import './sentry-release-injection-file-4a7720ec.js';
import './constants-34d965bd.js';
import './prisma-50863289.js';
import '@auth/core/providers/email';

let fixSchema = z.object({
  role: z.enum(["STAFF", "ADMIN", "OWNER"]),
  email: z.string().email(),
  id: z.string().optional()
});
const load$1 = async () => {
  const adminCompany = await getAdminCompany();
  let userCompanyList = await listCompanyUsers({ companyId: adminCompany?.id || "" });
  const form = await superValidate(fixSchema);
  return { form, users: userCompanyList };
};
const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, fixSchema);
    const adminCompany = await getAdminCompany();
    console.log(form);
    if (!form.valid) {
      console.log("validation fail");
      return fail(400, { form });
    }
    console.log("validation passed");
    await createCompanyUser({
      email: form.data.email,
      companyId: adminCompany?.id || "",
      userRole: Role[form.data.role]
    });
    form.valid = true;
    let userCompanyList = await listCompanyUsers({ companyId: adminCompany?.id || "" });
    return { form, users: userCompanyList };
  }
};
const load = load$1 ? wrapServerLoadWithSentry(load$1) : void 0;

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 7;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-fbabcb33.js')).default;
const server_id = "src/routes/(authenticated)/admin/users/+page.server.ts";
const imports = ["_app/immutable/nodes/7.Lv9ymzFr.js","_app/immutable/chunks/scheduler.RAkbNlF_.js","_app/immutable/chunks/index.5brJxJeu.js","_app/immutable/chunks/each.N9yYRwnS.js","_app/immutable/chunks/FileEditSolid.ms6lgoOX.js","_app/immutable/chunks/bundle-mjs.MFJMrG53.js","_app/immutable/chunks/index.KuOYZF30.js","_app/immutable/chunks/Frame.iI6vPlRK.js","_app/immutable/chunks/Modal.TkqycPy2.js","_app/immutable/chunks/Button.jSWztE31.js","_app/immutable/chunks/Card.MHFaTJAb.js","_app/immutable/chunks/CheckSolid.F3P5LcSA.js","_app/immutable/chunks/TrashBinSolid.9m9EZefE.js","_app/immutable/chunks/CreateUserForm.2wxeZm7h.js","_app/immutable/chunks/index.RB1Qc8eZ.js","_app/immutable/chunks/singletons.LsHtuZJq.js","_app/immutable/chunks/index.XGR6uEzK.js","_app/immutable/chunks/paths.zrnwqn2j.js","_app/immutable/chunks/stores.qfWq5sye.js","_app/immutable/chunks/stringify.ZBF_Z-nX.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=7-b0133f25.js.map
