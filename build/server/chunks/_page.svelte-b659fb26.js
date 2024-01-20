import { c as create_ssr_component, v as validate_component, b as compute_rest_props, k as getContext, g as spread, i as escape_object, h as escape_attribute_value, j as add_attribute, f as compute_slots } from './ssr-fdd97ea6.js';
import { S as Section } from './Section-cc2828ca.js';
import { twMerge } from 'tailwind-merge';
import { B as Button } from './Button-f9503678.js';
import './names-11b10067.js';

const ArrowRightSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "arrow right solid" } = $$props;
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
      { viewBox: "0 0 14 12" }
    ],
    {}
  )}><path fill="currentColor" d="M13.923 6.382a1 1 0 0 0-.217-1.09l-4-4a1 1 0 1 0-1.414 1.414L10.586 5H1a1 1 0 0 0 0 2h9.586L8.293 9.293a1 1 0 1 0 1.414 1.414l4-4a.999.999 0 0 0 .216-.325Z"></path></svg> `;
});
const HeroHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["h1Class", "h2Class", "pClass"]);
  let $$slots = compute_slots(slots);
  let { h1Class = "mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white" } = $$props;
  let { h2Class = "mb-8 lg:mb-16 text-3xl font-extrabold tracking-tight leading-tight text-center text-gray-900 dark:text-white md:text-4xl" } = $$props;
  let { pClass = "mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400" } = $$props;
  if ($$props.h1Class === void 0 && $$bindings.h1Class && h1Class !== void 0)
    $$bindings.h1Class(h1Class);
  if ($$props.h2Class === void 0 && $$bindings.h2Class && h2Class !== void 0)
    $$bindings.h2Class(h2Class);
  if ($$props.pClass === void 0 && $$bindings.pClass && pClass !== void 0)
    $$bindings.pClass(pClass);
  return `<div${add_attribute("class", $$props.class, 0)}>${$$slots.h1 ? `<h1${spread(
    [
      {
        class: escape_attribute_value(twMerge(h1Class, $$props.classH1))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${slots.h1 ? slots.h1({}) : ``}</h1>` : ``} ${$$slots.h2 ? `<h2${add_attribute("class", twMerge(h2Class, $$props.classH2), 0)}>${slots.h2 ? slots.h2({}) : ``}</h2>` : ``} ${$$slots.paragraph ? `<p${add_attribute("class", twMerge(pClass, $$props.classP), 0)}>${slots.paragraph ? slots.paragraph({}) : ``}</p>` : ``} ${slots.default ? slots.default({}) : ``}</div> `;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(Section, "Section").$$render($$result, { name: "heroVisual" }, {}, {
    default: () => {
      return `<div class="mr-auto place-self-center md:col-span-2">${validate_component(HeroHeader, "HeroHeader").$$render(
        $$result,
        {
          h1Class: "max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white",
          pClass: "max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400"
        },
        {},
        {
          paragraph: () => {
            return `Custom text.`;
          },
          h1: () => {
            return `Custom text`;
          },
          default: () => {
            return `<a href="/signin">${validate_component(Button, "Button").$$render(
              $$result,
              {
                size: "xl",
                color: "blue",
                class: "inline-flex items-center justify-center mr-3"
              },
              {},
              {
                default: () => {
                  return `Sign in${validate_component(ArrowRightSolid, "ArrowRightSolid").$$render($$result, { size: "md", class: "ml-2 -mr-1" }, {}, {})}`;
                }
              }
            )}</a>`;
          }
        }
      )}</div>`;
    }
  })}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-b659fb26.js.map
