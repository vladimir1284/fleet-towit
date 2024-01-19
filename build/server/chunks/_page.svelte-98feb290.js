import { c as create_ssr_component, v as validate_component, j as add_attribute, b as compute_rest_props, g as spread, i as escape_object, h as escape_attribute_value, k as getContext } from './ssr-fdd97ea6.js';
import { B as Button } from './Button-f9503678.js';
import { C as Card } from './Card-8cc0fbbc.js';
import { C as ChevronDownSolid, D as Dropdown, a as DropdownItem } from './ChevronDownSolid-e15805e3.js';
import { twMerge } from 'tailwind-merge';
import './names-11b10067.js';
import './Frame-7dd03585.js';
import './index2-0d39f80d.js';
import './Wrapper-a42d71ad.js';

const Chart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { options } = $$props;
  if ($$props.options === void 0 && $$bindings.options && options !== void 0)
    $$bindings.options(options);
  return `<div${add_attribute("class", $$props.class, 0)}></div> `;
});
const A = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["href", "color", "aClass"]);
  let { href = "#" } = $$props;
  let { color = "text-primary-600 dark:text-primary-500" } = $$props;
  let { aClass = "inline-flex items-center hover:underline" } = $$props;
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.aClass === void 0 && $$bindings.aClass && aClass !== void 0)
    $$bindings.aClass(aClass);
  return `<a${spread(
    [
      escape_object($$restProps),
      { href: escape_attribute_value(href) },
      {
        class: escape_attribute_value(twMerge(aClass, color, $$props.class))
      }
    ],
    {}
  )}>${slots.default ? slots.default({}) : ``}</a> `;
});
const ChevronRightSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "chevron right solid" } = $$props;
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
      { viewBox: "0 0 6 10" }
    ],
    {}
  )}><path fill="currentColor" d="M1.01 10a.997.997 0 0 1-.705-1.705L3.59 5.006.305 1.717A.999.999 0 1 1 1.715.305L5.709 4.3a1 1 0 0 1 0 1.412L1.716 9.707A.998.998 0 0 1 1.01 10Z"></path></svg> `;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let options = {
    chart: {
      height: "100%",
      width: "170%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: { enabled: false },
      toolbar: { show: true }
    },
    tooltip: { enabled: true, x: { show: true } },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"]
      }
    },
    dataLabels: { enabled: true },
    stroke: { width: 6 },
    grid: {
      show: true,
      strokeDashArray: 4,
      padding: { left: 2, right: 2, top: 0 }
    },
    series: [
      {
        name: "Profit",
        data: [200, 2e3, 1278, 800, -640],
        color: "#1A56DB"
      }
    ],
    xaxis: {
      categories: ["Jan", "Feb", "Apr", "March", "May", "Jun"],
      labels: { show: true },
      axisBorder: { show: false },
      axisTicks: { show: false }
    },
    yaxis: { show: true }
  };
  return `${validate_component(Card, "Card").$$render(
    $$result,
    {
      size: "lg",
      padding: "lg",
      class: "w-[9xl]  h-[25%]"
    },
    {},
    {
      default: () => {
        return `<div class="flex justify-between"><div data-svelte-h="svelte-17konpu"><h5 class="leading-none text-3xl font-bold text-gray-900 dark:text-white pb-2">Monthly history</h5></div> <div class="flex items-center px-2.5 py-0.5 text-base font-semibold text-green-500 dark:text-green-500 text-center">12%
			${validate_component(ChevronRightSolid, "ChevronRightSolid").$$render($$result, { class: "w-3 h-3 ms-1" }, {}, {})}</div></div> ${validate_component(Chart, "Chart").$$render($$result, { options }, {}, {})} <div class="grid grid-cols-1 items-center border-gray-200 border-t dark:border-gray-700 justify-between"><div class="flex justify-between items-center pt-5">${validate_component(Button, "Button").$$render(
          $$result,
          {
            class: "text-sm font-medium text-gray-500 dark:text-gray-400 hover:text-gray-900 text-center inline-flex items-center dark:hover:text-white bg-transparent hover:bg-transparent dark:bg-transparent dark:hover:bg-transparent focus:ring-transparent dark:focus:ring-transparent py-0"
          },
          {},
          {
            default: () => {
              return `Last 7 days${validate_component(ChevronDownSolid, "ChevronDownSolid").$$render($$result, { class: "w-2.5 m-2.5 ms-1.5" }, {}, {})}`;
            }
          }
        )} ${validate_component(Dropdown, "Dropdown").$$render($$result, { class: "w-40", offset: "-6" }, {}, {
          default: () => {
            return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
              default: () => {
                return `Yesterday`;
              }
            })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
              default: () => {
                return `Today`;
              }
            })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
              default: () => {
                return `Last 7 days`;
              }
            })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
              default: () => {
                return `Last 30 days`;
              }
            })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
              default: () => {
                return `Last 90 days`;
              }
            })}`;
          }
        })} ${validate_component(A, "A").$$render(
          $$result,
          {
            href: "/",
            class: "uppercase text-sm font-semibold hover:text-primary-700 dark:hover:text-primary-500 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 px-3 py-2 hover:no-underline"
          },
          {},
          {
            default: () => {
              return `Users Report
				${validate_component(ChevronRightSolid, "ChevronRightSolid").$$render($$result, { class: "w-2.5 h-2.5 ms-1.5" }, {}, {})}`;
            }
          }
        )}</div></div>`;
      }
    }
  )}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-98feb290.js.map
