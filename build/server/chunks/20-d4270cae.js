import { wrapServerLoadWithSentry } from '@sentry/sveltekit';
import { s as superValidate } from './superValidate-395df3da.js';
import { f as fail } from './index-d41d8d8d.js';
import { U as UserSchema } from './index4-9810528c.js';
import './sentry-release-injection-file-4a7720ec.js';
import './constants-34d965bd.js';
import 'zod';

const crudSchema = UserSchema.extend({
  id: UserSchema.shape.id.optional()
});
const load$1 = async () => {
  const form = await superValidate(UserSchema);
  return { form };
};
const actions = {
  default: async ({ request }) => {
    const form = await superValidate(request, crudSchema);
    if (!form.valid) {
      console.log("validation fail");
      return fail(400, { form });
    }
    console.log("validation passed");
    form.valid = true;
    return { form };
  }
};
const load = load$1 ? wrapServerLoadWithSentry(load$1) : void 0;

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions,
  load: load
});

const index = 20;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-55737c63.js')).default;
const server_id = "src/routes/(unauthenticated)/signin/+page.server.ts";
const imports = ["_app/immutable/nodes/20.JrEi2qJA.js","_app/immutable/chunks/scheduler.RAkbNlF_.js","_app/immutable/chunks/index.5brJxJeu.js","_app/immutable/chunks/bundle-mjs.MFJMrG53.js","_app/immutable/chunks/Button.jSWztE31.js","_app/immutable/chunks/Card.MHFaTJAb.js","_app/immutable/chunks/Frame.iI6vPlRK.js","_app/immutable/chunks/Wrapper.7OPnYao8.js","_app/immutable/chunks/index.RB1Qc8eZ.js","_app/immutable/chunks/singletons.LsHtuZJq.js","_app/immutable/chunks/index.XGR6uEzK.js","_app/immutable/chunks/paths.zrnwqn2j.js","_app/immutable/chunks/stores.qfWq5sye.js","_app/immutable/chunks/stringify.ZBF_Z-nX.js","_app/immutable/chunks/client.orZM4Qyk.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=20-d4270cae.js.map
