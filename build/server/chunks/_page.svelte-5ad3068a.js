import { c as create_ssr_component, e as escape } from './ssr-fdd97ea6.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `   <div><h1 data-svelte-h="svelte-5qhn6g">My Blog</h1> <main><div> ${escape(data.company.name)} ${escape(data.user)}</div></main></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-5ad3068a.js.map
