import { c as create_ssr_component, v as validate_component, b as compute_rest_props, k as getContext, g as spread, i as escape_object, h as escape_attribute_value } from './ssr-fdd97ea6.js';
import { C as Card } from './Card-8cc0fbbc.js';
import { twMerge } from 'tailwind-merge';
import './Frame-7dd03585.js';
import './names-11b10067.js';

const CheckSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "ariaLabel"]);
  const ctx = getContext("iconCtx") ?? {};
  const sizes = {
    xs: "w-3 h-3",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-8 h-8"
  };
  let { size = ctx.size || "md" } = $$props;
  let { role = ctx.role || "img" } = $$props;
  let { ariaLabel = "check solid" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "currentColor" },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { viewBox: "0 0 17 12" }
    ],
    {}
  )}><path fill="currentColor" d="M5.667 11.875h-.015a1 1 0 0 1-.714-.314L.272 6.6a1 1 0 1 1 1.456-1.372l3.959 4.207 8.6-8.643a1 1 0 1 1 1.418 1.41l-9.33 9.378a.991.991 0 0 1-.708.295Z"></path></svg> `;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Card, "Card").$$render(
    $$result,
    {
      class: "flex flex-col justify-center align-center",
      size: "xs"
    },
    {},
    {
      default: () => {
        return `${validate_component(CheckSolid, "CheckSolid").$$render($$result, { class: "w-4 h-4" }, {}, {})} <h5 data-svelte-h="svelte-1pafjfx">The link has been sent to your email</h5>`;
      }
    }
  )}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-c0f64eb9.js.map
