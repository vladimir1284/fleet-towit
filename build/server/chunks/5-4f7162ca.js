import { wrapServerLoadWithSentry } from '@sentry/sveltekit';
import { r as redirect } from './index-d41d8d8d.js';
import './sentry-release-injection-file-4a7720ec.js';

const load$1 = async (event) => {
  const session = await event.locals.getSession();
  if (!session?.user)
    throw redirect(307, "/signin");
  else {
    throw redirect(307, "/dashboard");
  }
};
const load = load$1 ? wrapServerLoadWithSentry(load$1) : void 0;

var _page_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 5;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-b659fb26.js')).default;
const server_id = "src/routes/+page.server.ts";
const imports = ["_app/immutable/nodes/5.FHSRyMqs.js","_app/immutable/chunks/scheduler.RAkbNlF_.js","_app/immutable/chunks/index.5brJxJeu.js","_app/immutable/chunks/Section.aYSobVKn.js","_app/immutable/chunks/bundle-mjs.MFJMrG53.js","_app/immutable/chunks/Button.jSWztE31.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=5-4f7162ca.js.map
