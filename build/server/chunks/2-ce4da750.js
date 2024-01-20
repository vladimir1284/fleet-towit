import { wrapServerLoadWithSentry } from '@sentry/sveltekit';
import { r as redirect } from './index-d41d8d8d.js';
import './sentry-release-injection-file-4a7720ec.js';

const load$1 = async (event) => {
  const session = await event.locals.getSession();
  if (!session?.user)
    throw redirect(307, "/signin");
  return { session };
};
const load = load$1 ? wrapServerLoadWithSentry(load$1) : void 0;

var _layout_server_ts = /*#__PURE__*/Object.freeze({
  __proto__: null,
  load: load
});

const index = 2;
let component_cache;
const component = async () => component_cache ??= (await import('./_layout.svelte-dcc6bfef.js')).default;
const server_id = "src/routes/(authenticated)/+layout.server.ts";
const imports = ["_app/immutable/nodes/2.9GsPn54r.js","_app/immutable/chunks/scheduler.RAkbNlF_.js","_app/immutable/chunks/index.5brJxJeu.js","_app/immutable/chunks/bundle-mjs.MFJMrG53.js","_app/immutable/chunks/Frame.iI6vPlRK.js","_app/immutable/chunks/index.XGR6uEzK.js","_app/immutable/chunks/each.N9yYRwnS.js","_app/immutable/chunks/stores.qfWq5sye.js","_app/immutable/chunks/singletons.LsHtuZJq.js","_app/immutable/chunks/paths.zrnwqn2j.js","_app/immutable/chunks/Button.jSWztE31.js","_app/immutable/chunks/ChevronDownSolid.0DYj7pQ6.js","_app/immutable/chunks/Wrapper.7OPnYao8.js","_app/immutable/chunks/client.orZM4Qyk.js","_app/immutable/chunks/index.KuOYZF30.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _layout_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=2-ce4da750.js.map
