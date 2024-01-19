import { c as create_ssr_component, v as validate_component, b as compute_rest_props, a as subscribe, s as setContext, d as each, e as escape, f as compute_slots, g as spread, h as escape_attribute_value, i as escape_object, j as add_attribute, k as getContext } from './ssr-fdd97ea6.js';
import { F as Frame } from './Frame-7dd03585.js';
import { twMerge } from 'tailwind-merge';
import { w as writable } from './index2-0d39f80d.js';
import { p as page } from './stores-4bc45be0.js';
import { i as is_void } from './names-11b10067.js';
import { B as Button } from './Button-f9503678.js';
import { C as ChevronDownSolid, D as Dropdown, a as DropdownItem } from './ChevronDownSolid-e15805e3.js';
import './Wrapper-a42d71ad.js';

function quintOut(t) {
  return --t * t * t * t * t + 1;
}
const Indicator = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$slots = compute_slots(slots);
  let { color = "gray" } = $$props;
  let { rounded = false } = $$props;
  let { size = "md" } = $$props;
  let { border = false } = $$props;
  let { placement = void 0 } = $$props;
  let { offset = true } = $$props;
  const colors = {
    gray: "bg-gray-200",
    dark: "bg-gray-900 dark:bg-gray-700",
    blue: "bg-blue-600",
    orange: "bg-orange-600",
    green: "bg-green-500",
    red: "bg-red-500",
    purple: "bg-purple-500",
    indigo: "bg-indigo-500",
    yellow: "bg-yellow-300",
    teal: "bg-teal-500",
    none: ""
  };
  const sizes = {
    xs: "w-2 h-2",
    sm: "w-2.5 h-2.5",
    md: "w-3 h-3",
    lg: "w-3.5 h-3.5",
    xl: "w-6 h-6"
  };
  const placements = {
    // top
    "top-left": "top-0 start-0",
    "top-center": "top-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 rtl:translate-x-1/2",
    "top-right": "top-0 end-0",
    // center
    "center-left": "top-1/2 -translate-y-1/2 start-0",
    center: "top-1/2 -translate-y-1/2 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 rtl:translate-x-1/2",
    "center-right": "top-1/2 -translate-y-1/2 end-0",
    // bottom
    "bottom-left": "bottom-0 start-0",
    "bottom-center": "bottom-0 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 rtl:translate-x-1/2",
    "bottom-right": "bottom-0 end-0"
  };
  const offsets = {
    // top
    "top-left": "-translate-x-1/3 rtl:translate-x-1/3 -translate-y-1/3",
    "top-center": "-translate-y-1/3",
    "top-right": "translate-x-1/3 rtl:-translate-x-1/3 -translate-y-1/3",
    // center
    "center-left": "-translate-x-1/3 rtl:translate-x-1/3",
    center: "",
    "center-right": "translate-x-1/3 rtl:-translate-x-1/3",
    // bottom
    "bottom-left": "-translate-x-1/3 rtl:translate-x-1/3 translate-y-1/3",
    "bottom-center": "translate-y-1/3",
    "bottom-right": "translate-x-1/3 rtl:-translate-x-1/3 translate-y-1/3"
  };
  let dotClass;
  if ($$props.color === void 0 && $$bindings.color && color !== void 0)
    $$bindings.color(color);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.placement === void 0 && $$bindings.placement && placement !== void 0)
    $$bindings.placement(placement);
  if ($$props.offset === void 0 && $$bindings.offset && offset !== void 0)
    $$bindings.offset(offset);
  dotClass = twMerge("flex-shrink-0", rounded ? "rounded" : "rounded-full", border && "border-2 border-white dark:border-gray-800", sizes[size], colors[color], $$slots.default && "inline-flex items-center justify-center", placement && "absolute " + placements[placement], placement && offset && offsets[placement], $$props.class);
  return `<div${add_attribute("class", dotClass, 0)}>${slots.default ? slots.default({}) : ``}</div> `;
});
const Avatar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["src", "href", "rounded", "border", "stacked", "dot", "alt", "size"]);
  let $$slots = compute_slots(slots);
  let { src = "" } = $$props;
  let { href = void 0 } = $$props;
  let { rounded = false } = $$props;
  let { border = false } = $$props;
  let { stacked = false } = $$props;
  let { dot = void 0 } = $$props;
  let { alt = "" } = $$props;
  let { size = "md" } = $$props;
  const sizes = {
    xs: "w-6 h-6",
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-20 h-20",
    xl: "w-36 h-36",
    none: ""
  };
  let avatarClass;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0)
    $$bindings.src(src);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.rounded === void 0 && $$bindings.rounded && rounded !== void 0)
    $$bindings.rounded(rounded);
  if ($$props.border === void 0 && $$bindings.border && border !== void 0)
    $$bindings.border(border);
  if ($$props.stacked === void 0 && $$bindings.stacked && stacked !== void 0)
    $$bindings.stacked(stacked);
  if ($$props.dot === void 0 && $$bindings.dot && dot !== void 0)
    $$bindings.dot(dot);
  if ($$props.alt === void 0 && $$bindings.alt && alt !== void 0)
    $$bindings.alt(alt);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  dot = dot && {
    placement: "top-right",
    color: "gray",
    size: "lg",
    ...dot
  };
  avatarClass = twMerge(rounded ? "rounded" : "rounded-full", border && "p-1 ring-2 ring-gray-300 dark:ring-gray-500", sizes[size], stacked && "border-2 -ms-4 border-white dark:border-gray-800", "bg-gray-100 dark:bg-gray-600 text-gray-600 dark:text-gray-300", $$props.class);
  return `${!src || !!href || $$slots.default || dot ? `${((tag) => {
    return tag ? `<${href ? "a" : "div"}${spread(
      [
        { href: escape_attribute_value(href) },
        escape_object($$restProps),
        {
          class: "relative flex justify-center items-center " + escape(avatarClass, true)
        }
      ],
      {}
    )}>${is_void(tag) ? "" : `${src ? `<img${add_attribute("alt", alt, 0)}${add_attribute("src", src, 0)}${add_attribute("class", rounded ? "rounded" : "rounded-full", 0)}>` : `${slots.default ? slots.default({}) : `  <svg class="${"w-full h-full " + escape(rounded ? "rounded" : "rounded-full", true)}" fill="currentColor" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg> `}`} ${dot ? `${validate_component(Indicator, "Indicator").$$render($$result, Object.assign({}, { border: true }, { offset: rounded }, dot), {}, {})}` : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "div")}` : `<img${spread(
    [
      { alt: escape_attribute_value(alt) },
      { src: escape_attribute_value(src) },
      escape_object($$restProps),
      {
        class: escape_attribute_value(avatarClass)
      }
    ],
    {}
  )}>`} `;
});
const Breadcrumb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["solid", "navClass", "solidClass", "olClass", "ariaLabel"]);
  let { solid = false } = $$props;
  let { navClass = "flex" } = $$props;
  let { solidClass = "flex px-5 py-3 text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700" } = $$props;
  let { olClass = "inline-flex items-center space-x-1 rtl:space-x-reverse md:space-x-3 rtl:space-x-reverse" } = $$props;
  let { ariaLabel = "Breadcrumb" } = $$props;
  let classNav = solid ? solidClass : navClass;
  if ($$props.solid === void 0 && $$bindings.solid && solid !== void 0)
    $$bindings.solid(solid);
  if ($$props.navClass === void 0 && $$bindings.navClass && navClass !== void 0)
    $$bindings.navClass(navClass);
  if ($$props.solidClass === void 0 && $$bindings.solidClass && solidClass !== void 0)
    $$bindings.solidClass(solidClass);
  if ($$props.olClass === void 0 && $$bindings.olClass && olClass !== void 0)
    $$bindings.olClass(olClass);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  return `<nav${spread(
    [
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge(classNav, $$props.class))
      }
    ],
    {}
  )}><ol${add_attribute("class", twMerge(olClass, $$props.classOl), 0)}>${slots.default ? slots.default({}) : ``}</ol></nav> `;
});
const BreadcrumbItem = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["home", "href", "linkClass", "spanClass", "homeClass"]);
  let $$slots = compute_slots(slots);
  let { home = false } = $$props;
  let { href = void 0 } = $$props;
  let { linkClass = "ms-1 text-sm font-medium text-gray-700 hover:text-gray-900 md:ms-2 dark:text-gray-400 dark:hover:text-white" } = $$props;
  let { spanClass = "ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400" } = $$props;
  let { homeClass = "inline-flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white" } = $$props;
  if ($$props.home === void 0 && $$bindings.home && home !== void 0)
    $$bindings.home(home);
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.linkClass === void 0 && $$bindings.linkClass && linkClass !== void 0)
    $$bindings.linkClass(linkClass);
  if ($$props.spanClass === void 0 && $$bindings.spanClass && spanClass !== void 0)
    $$bindings.spanClass(spanClass);
  if ($$props.homeClass === void 0 && $$bindings.homeClass && homeClass !== void 0)
    $$bindings.homeClass(homeClass);
  return `<li${spread(
    [
      {
        class: escape_attribute_value(twMerge("inline-flex items-center", $$props.class))
      },
      escape_object($$restProps)
    ],
    {}
  )}>${home ? `<a${add_attribute("class", twMerge(homeClass, $$props.classHome), 0)}${add_attribute("href", href, 0)}>${$$slots.icon ? `${slots.icon ? slots.icon({}) : ``}` : `<svg class="w-4 h-4 me-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>`} ${slots.default ? slots.default({}) : ``}</a>` : `${$$slots.icon ? `${slots.icon ? slots.icon({}) : ``}` : `<svg class="w-6 h-6 text-gray-400 rtl:-scale-x-100" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd"></path></svg>`} ${href ? `<a${add_attribute("class", twMerge(linkClass, $$props.classLink), 0)}${add_attribute("href", href, 0)}>${slots.default ? slots.default({}) : ``}</a>` : `<span${add_attribute("class", twMerge(spanClass, $$props.classSpan), 0)}>${slots.default ? slots.default({}) : ``}</span>`}`}</li> `;
});
const NavContainer = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { fluid = false } = $$props;
  if ($$props.fluid === void 0 && $$bindings.fluid && fluid !== void 0)
    $$bindings.fluid(fluid);
  return `<div${add_attribute("class", twMerge("mx-auto flex flex-wrap justify-between items-center ", fluid ? "w-full" : "container", $$props.class), 0)}>${slots.default ? slots.default({}) : ``}</div> `;
});
const Navbar = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["fluid"]);
  let $hidden, $$unsubscribe_hidden;
  let { fluid = false } = $$props;
  let hidden = writable(true);
  $$unsubscribe_hidden = subscribe(hidden, (value) => $hidden = value);
  setContext("navHidden", hidden);
  let toggle = () => hidden.update((hidden2) => !hidden2);
  if ($$props.fluid === void 0 && $$bindings.fluid && fluid !== void 0)
    $$bindings.fluid(fluid);
  {
    {
      $$restProps.color = $$restProps.color ?? "navbar";
    }
  }
  $$unsubscribe_hidden();
  return `${validate_component(Frame, "Frame").$$render(
    $$result,
    Object.assign({}, { tag: "nav" }, $$restProps, {
      class: twMerge("px-2 sm:px-4 py-2.5 w-full", $$props.class)
    }),
    {},
    {
      default: () => {
        return `${validate_component(NavContainer, "NavContainer").$$render($$result, { fluid }, {}, {
          default: () => {
            return `${slots.default ? slots.default({ hidden: $hidden, toggle, NavContainer }) : ``}`;
          }
        })}`;
      }
    }
  )} `;
});
const NavLi = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let active;
  let liClass;
  let $$restProps = compute_rest_props($$props, ["href", "activeClass", "nonActiveClass"]);
  let { href = "" } = $$props;
  let { activeClass = void 0 } = $$props;
  let { nonActiveClass = void 0 } = $$props;
  const context = getContext("navbarContext") ?? {};
  const activeUrlStore = getContext("activeUrl");
  let navUrl = "";
  activeUrlStore.subscribe((value) => {
    navUrl = value;
  });
  if ($$props.href === void 0 && $$bindings.href && href !== void 0)
    $$bindings.href(href);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
    $$bindings.activeClass(activeClass);
  if ($$props.nonActiveClass === void 0 && $$bindings.nonActiveClass && nonActiveClass !== void 0)
    $$bindings.nonActiveClass(nonActiveClass);
  active = navUrl ? href === navUrl : false;
  liClass = twMerge(
    "block py-2 pe-4 ps-3 md:p-0 rounded md:border-0",
    active ? activeClass ?? context.activeClass : nonActiveClass ?? context.nonActiveClass,
    $$props.class
  );
  return `<li>${((tag) => {
    return tag ? `<${href ? "a" : "div"}${spread(
      [
        {
          role: escape_attribute_value(href ? void 0 : "link")
        },
        { href: escape_attribute_value(href) },
        escape_object($$restProps),
        { class: escape_attribute_value(liClass) }
      ],
      {}
    )}>${is_void(tag) ? "" : `${slots.default ? slots.default({}) : ``}`}${is_void(tag) ? "" : `</${tag}>`}` : "";
  })(href ? "a" : "div")}</li> `;
});
const NavUl = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "activeUrl",
    "divClass",
    "ulClass",
    "hidden",
    "slideParams",
    "activeClass",
    "nonActiveClass"
  ]);
  let $hiddenStore, $$unsubscribe_hiddenStore;
  const activeUrlStore = writable("");
  let { activeUrl = "" } = $$props;
  let { divClass = "w-full md:block md:w-auto" } = $$props;
  let { ulClass = "flex flex-col p-4 mt-4 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:text-sm md:font-medium" } = $$props;
  let { hidden = void 0 } = $$props;
  let { slideParams = {
    delay: 250,
    duration: 500,
    easing: quintOut
  } } = $$props;
  let { activeClass = "text-white bg-primary-700 md:bg-transparent md:text-primary-700 md:dark:text-white dark:bg-primary-600 md:dark:bg-transparent" } = $$props;
  let { nonActiveClass = "text-gray-700 hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-primary-700 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent" } = $$props;
  setContext("navbarContext", { activeClass, nonActiveClass });
  setContext("activeUrl", activeUrlStore);
  let hiddenStore = getContext("navHidden");
  $$unsubscribe_hiddenStore = subscribe(hiddenStore, (value) => $hiddenStore = value);
  let _hidden;
  let _divClass;
  let _ulClass;
  if ($$props.activeUrl === void 0 && $$bindings.activeUrl && activeUrl !== void 0)
    $$bindings.activeUrl(activeUrl);
  if ($$props.divClass === void 0 && $$bindings.divClass && divClass !== void 0)
    $$bindings.divClass(divClass);
  if ($$props.ulClass === void 0 && $$bindings.ulClass && ulClass !== void 0)
    $$bindings.ulClass(ulClass);
  if ($$props.hidden === void 0 && $$bindings.hidden && hidden !== void 0)
    $$bindings.hidden(hidden);
  if ($$props.slideParams === void 0 && $$bindings.slideParams && slideParams !== void 0)
    $$bindings.slideParams(slideParams);
  if ($$props.activeClass === void 0 && $$bindings.activeClass && activeClass !== void 0)
    $$bindings.activeClass(activeClass);
  if ($$props.nonActiveClass === void 0 && $$bindings.nonActiveClass && nonActiveClass !== void 0)
    $$bindings.nonActiveClass(nonActiveClass);
  {
    {
      activeUrlStore.set(activeUrl);
    }
  }
  _hidden = hidden ?? $hiddenStore ?? true;
  _divClass = twMerge(divClass, $$props.class);
  _ulClass = twMerge(
    ulClass,
    // 'divide-y md:divide-y-0 divide-gray-100 dark:divide-gray-700',
    $$props.classUl
  );
  $$unsubscribe_hiddenStore();
  return `${!_hidden ? `<div${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(_divClass) },
      { role: "button" },
      { tabindex: "0" }
    ],
    {}
  )}>${validate_component(Frame, "Frame").$$render(
    $$result,
    {
      tag: "ul",
      border: true,
      rounded: true,
      color: "navbarUl",
      class: _ulClass
    },
    {},
    {
      default: () => {
        return `${slots.default ? slots.default({}) : ``}`;
      }
    }
  )}</div>` : `<div${spread(
    [
      escape_object($$restProps),
      { class: escape_attribute_value(_divClass) },
      { hidden: _hidden || null }
    ],
    {}
  )}><ul${add_attribute("class", _ulClass, 0)}>${slots.default ? slots.default({}) : ``}</ul></div>`} `;
});
const Breadcumb = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  let crumbs = [];
  {
    {
      const tokens = $page.url.pathname.split("/").filter((t) => t !== "");
      let tokenPath = "";
      crumbs = tokens.map((t) => {
        tokenPath += "/" + t;
        t = t.charAt(0).toUpperCase() + t.slice(1);
        return { label: t, href: tokenPath };
      });
      crumbs = crumbs.slice(1);
      crumbs.unshift({ label: "Dashboard", href: "/dashboard" });
    }
  }
  $$unsubscribe_page();
  return `${validate_component(Breadcrumb, "Breadcrumb").$$render($$result, {}, {}, {
    default: () => {
      return `${each(crumbs, (crumb, i) => {
        return `${crumb.label === "Dashboard" ? `${crumbs.length <= 1 ? `${validate_component(BreadcrumbItem, "BreadcrumbItem").$$render($$result, { href: "/dashboard", home: true }, {}, {
          default: () => {
            return `Welcome back!`;
          }
        })}` : `${validate_component(BreadcrumbItem, "BreadcrumbItem").$$render($$result, { href: "/dashboard", home: true }, {}, {
          default: () => {
            return `Dashboard`;
          }
        })}`}` : `${validate_component(BreadcrumbItem, "BreadcrumbItem").$$render($$result, { href: crumb.href }, {}, {
          default: () => {
            return `${escape(crumb.label)} `;
          }
        })}`}`;
      })}`;
    }
  })}`;
});
const BellSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "bell solid" } = $$props;
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
      { viewBox: "0 0 14 20" }
    ],
    {}
  )}><path fill="currentColor" d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z"></path></svg> `;
});
const ChevronDownOutline = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, ["size", "role", "strokeLinecap", "strokeLinejoin", "strokeWidth", "ariaLabel"]);
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
  let { strokeLinecap = ctx.strokeLinecap || "round" } = $$props;
  let { strokeLinejoin = ctx.strokeLinejoin || "round" } = $$props;
  let { strokeWidth = ctx.strokeWidth || "2" } = $$props;
  let { ariaLabel = "chevron down outline" } = $$props;
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.role === void 0 && $$bindings.role && role !== void 0)
    $$bindings.role(role);
  if ($$props.strokeLinecap === void 0 && $$bindings.strokeLinecap && strokeLinecap !== void 0)
    $$bindings.strokeLinecap(strokeLinecap);
  if ($$props.strokeLinejoin === void 0 && $$bindings.strokeLinejoin && strokeLinejoin !== void 0)
    $$bindings.strokeLinejoin(strokeLinejoin);
  if ($$props.strokeWidth === void 0 && $$bindings.strokeWidth && strokeWidth !== void 0)
    $$bindings.strokeWidth(strokeWidth);
  if ($$props.ariaLabel === void 0 && $$bindings.ariaLabel && ariaLabel !== void 0)
    $$bindings.ariaLabel(ariaLabel);
  return `<svg${spread(
    [
      { xmlns: "http://www.w3.org/2000/svg" },
      { fill: "none" },
      escape_object($$restProps),
      {
        class: escape_attribute_value(twMerge("shrink-0", sizes[size], $$props.class))
      },
      { role: escape_attribute_value(role) },
      {
        "aria-label": escape_attribute_value(ariaLabel)
      },
      { viewBox: "0 0 10 7" }
    ],
    {}
  )}><path stroke="currentColor"${add_attribute("stroke-linecap", strokeLinecap, 0)}${add_attribute("stroke-linejoin", strokeLinejoin, 0)}${add_attribute("stroke-width", strokeWidth, 0)} d="m1 1.444 4 3.791 4-3.79"></path></svg> `;
});
const avatar = "/_app/immutable/assets/test.fm02USUA.png";
const Notifications = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let notifications = [
    {
      avatar: "/images/profile-picture-1.webp",
      dotColor: "bg-gray-300",
      sender: "Jese Leos",
      message: "Hey, what's up? All set for the presentation?",
      time: "a few moments ago"
    },
    {
      avatar: "/images/profile-picture-2.webp",
      dotColor: "bg-red-400",
      sender: "Joseph Mcfall",
      message: "and 5 others started following you.",
      time: "10 minutes ago"
    }
  ];
  return `<div id="bell" class="inline-flex items-center text-sm font-medium text-center text-gray-500 hover:text-gray-900 focus:outline-none dark:hover:text-white dark:text-gray-400">${validate_component(BellSolid, "BellSolid").$$render($$result, { class: "w-5 h-5kj" }, {}, {})} ${notifications.length > 0 ? `<div class="flex relative" data-svelte-h="svelte-1ebgg2s"><div class="inline-flex relative -top-2 end-3 w-3 h-3 bg-red-500 rounded-full border-2 border-white dark:border-gray-900"></div></div>` : ``}</div> ${validate_component(Dropdown, "Dropdown").$$render(
    $$result,
    {
      triggeredBy: "#bell",
      class: "w-full max-w-sm min-w-sm rounded divide-y divide-gray-100 shadow dark:bg-gray-800 dark:divide-gray-700"
    },
    {},
    {
      header: () => {
        return `<div slot="header" class="text-center py-2 font-bold" data-svelte-h="svelte-1gfnbuf">Notifications</div>`;
      },
      default: () => {
        return `${each(notifications, (notification) => {
          return `${validate_component(DropdownItem, "DropdownItem").$$render(
            $$result,
            {
              class: "flex space-x-4 rtl:space-x-reverse"
            },
            {},
            {
              default: () => {
                return `${validate_component(Avatar, "Avatar").$$render(
                  $$result,
                  {
                    src: notification.avatar,
                    dot: { color: notification.dotColor },
                    rounded: true
                  },
                  {},
                  {}
                )} <div class="ps-3 w-full"><div class="text-gray-500 text-sm mb-1.5 dark:text-gray-400">${escape(notification.message)}</div> <div class="text-xs text-primary-600 dark:text-primary-500">${escape(notification.time)}</div></div> `;
              }
            }
          )}`;
        })}`;
      }
    }
  )}`;
});
const ProfileHeader = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { userData } = $$props;
  console.log(userData);
  if ($$props.userData === void 0 && $$bindings.userData && userData !== void 0)
    $$bindings.userData(userData);
  return `<div class="flex space-x-4 rtl:space-x-reverse">${validate_component(Notifications, "Notifications").$$render($$result, {}, {}, {})} ${validate_component(Button, "Button").$$render(
    $$result,
    {
      class: "text-black focus:ring-0 w-10 h-10",
      color: "none",
      outline: false,
      pill: false
    },
    {},
    {
      default: () => {
        return `${userData && userData.name !== null ? `${escape(userData.name)}` : `-`} ${validate_component(ChevronDownSolid, "ChevronDownSolid").$$render(
          $$result,
          {
            class: "w-3 h-3 ms-2 text-black dark:text-white"
          },
          {},
          {}
        )}`;
      }
    }
  )} ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
    header: () => {
      return `<div slot="header" class="px-4 py-2"><span class="block text-sm text-gray-900 dark:text-white">${escape(userData.email)}</span> <span class="block truncate text-xs font-small" data-svelte-h="svelte-1w1hjsd">Company</span></div>`;
    },
    default: () => {
      return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
        default: () => {
          return `Dashboard`;
        }
      })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
        default: () => {
          return `Settings`;
        }
      })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, {}, {}, {
        default: () => {
          return `Sign out`;
        }
      })}`;
    }
  })} ${validate_component(Avatar, "Avatar").$$render($$result, { src: avatar, rounded: true }, {}, {})}</div>`;
});
const Admin_navLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NavUl, "NavUl").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(NavLi, "NavLi").$$render(
        $$result,
        {
          class: "cursor-pointer",
          href: "/dashboard"
        },
        {},
        {
          default: () => {
            return `Home`;
          }
        }
      )} ${validate_component(NavLi, "NavLi").$$render(
        $$result,
        {
          class: "cursor-pointer",
          href: "/admin/users/"
        },
        {},
        {
          default: () => {
            return `Users`;
          }
        }
      )} ${validate_component(NavLi, "NavLi").$$render(
        $$result,
        {
          class: "cursor-pointer",
          href: "/admin/companies"
        },
        {},
        {
          default: () => {
            return `Companies`;
          }
        }
      )}`;
    }
  })}`;
});
const User_navLink = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  return `${validate_component(NavUl, "NavUl").$$render($$result, {}, {}, {
    default: () => {
      return `${validate_component(NavLi, "NavLi").$$render($$result, { class: "cursor-pointer" }, {}, {
        default: () => {
          return `Dashboard${validate_component(ChevronDownOutline, "ChevronDownOutline").$$render(
            $$result,
            {
              class: "w-3 h-3 ms-2 text-black-800 dark:text-white inline"
            },
            {},
            {}
          )}`;
        }
      })} ${validate_component(Dropdown, "Dropdown").$$render($$result, { class: "w-44 z-20" }, {}, {
        default: () => {
          return `${validate_component(DropdownItem, "DropdownItem").$$render($$result, { href: "/dashboard" }, {}, {
            default: () => {
              return `Dashboard`;
            }
          })} ${validate_component(DropdownItem, "DropdownItem").$$render($$result, { href: "/custom-dashboard" }, {}, {
            default: () => {
              return `Custom dashboard`;
            }
          })}`;
        }
      })} ${validate_component(NavLi, "NavLi").$$render($$result, { class: "cursor-pointer" }, {}, {
        default: () => {
          return `Inspections${validate_component(ChevronDownOutline, "ChevronDownOutline").$$render(
            $$result,
            {
              class: "w-3 h-3 ms-2 text-black-800 dark:text-white inline"
            },
            {},
            {}
          )}`;
        }
      })} ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(DropdownItem, "DropdownItem").$$render(
            $$result,
            {
              label: "Inspection history",
              href: "/dashboard/inspections"
            },
            {},
            {
              default: () => {
                return `Inspection history`;
              }
            }
          )} ${validate_component(DropdownItem, "DropdownItem").$$render(
            $$result,
            {
              label: "Forms",
              href: "/dashboard/inspections/forms"
            },
            {},
            {
              default: () => {
                return `Forms`;
              }
            }
          )} ${validate_component(DropdownItem, "DropdownItem").$$render(
            $$result,
            {
              label: "Exception report",
              href: "/dashboard/inspections/exception-report"
            },
            {},
            {
              default: () => {
                return `Exception report`;
              }
            }
          )}`;
        }
      })} ${validate_component(NavLi, "NavLi").$$render($$result, { class: "cursor-pointer" }, {}, {
        default: () => {
          return `Maintence${validate_component(ChevronDownOutline, "ChevronDownOutline").$$render(
            $$result,
            {
              class: "w-3 h-3 ms-2 text-black-800 dark:text-white inline"
            },
            {},
            {}
          )}`;
        }
      })} ${validate_component(Dropdown, "Dropdown").$$render($$result, {}, {}, {
        default: () => {
          return `${validate_component(DropdownItem, "DropdownItem").$$render(
            $$result,
            {
              label: "Defects",
              href: "/dashboard/maintenance/defects"
            },
            {},
            {
              default: () => {
                return `Defects`;
              }
            }
          )} ${validate_component(DropdownItem, "DropdownItem").$$render(
            $$result,
            {
              label: "Service tasks",
              href: "/dashboard/maintenance/service-tasks"
            },
            {},
            {
              default: () => {
                return `Service tasks`;
              }
            }
          )} ${validate_component(DropdownItem, "DropdownItem").$$render(
            $$result,
            {
              label: "Service programs",
              href: "/dashboard/maintenance/service-programs"
            },
            {},
            {
              default: () => {
                return `Service programs`;
              }
            }
          )} ${validate_component(DropdownItem, "DropdownItem").$$render(
            $$result,
            {
              label: "Service schedule",
              href: "/dashboard/maintenance/service-schedule"
            },
            {},
            {
              default: () => {
                return `Service schedule`;
              }
            }
          )} ${validate_component(DropdownItem, "DropdownItem").$$render(
            $$result,
            {
              label: "Work orders",
              href: "/dashboard/maintenance/work-orders"
            },
            {},
            {
              default: () => {
                return `Work orders`;
              }
            }
          )} ${validate_component(DropdownItem, "DropdownItem").$$render(
            $$result,
            {
              label: "Inventory",
              href: "/dashboard/maintenance/inventory"
            },
            {},
            {
              default: () => {
                return `Inventory`;
              }
            }
          )}`;
        }
      })} ${validate_component(NavLi, "NavLi").$$render(
        $$result,
        {
          class: "cursor-pointer",
          href: "/dashboard/assets"
        },
        {},
        {
          default: () => {
            return `Assets${validate_component(ChevronDownOutline, "ChevronDownOutline").$$render(
              $$result,
              {
                class: "w-3 h-3 ms-2 text-black-800 dark:text-white inline"
              },
              {},
              {}
            )}`;
          }
        }
      )} ${validate_component(NavLi, "NavLi").$$render(
        $$result,
        {
          class: "cursor-pointer",
          href: "/dashboard/reports"
        },
        {},
        {
          default: () => {
            return `Reports${validate_component(ChevronDownOutline, "ChevronDownOutline").$$render(
              $$result,
              {
                class: "w-3 h-3 ms-2 text-black-800 dark:text-white inline"
              },
              {},
              {}
            )}`;
          }
        }
      )}`;
    }
  })}`;
});
const Navlinks = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { is_admin = false } = $$props;
  if ($$props.is_admin === void 0 && $$bindings.is_admin && is_admin !== void 0)
    $$bindings.is_admin(is_admin);
  return `${!is_admin ? `${validate_component(Admin_navLink, "AdminNavLink").$$render($$result, {}, {}, {})}` : `${validate_component(User_navLink, "UserNavLink").$$render($$result, {}, {}, {})}`}`;
});
const Header = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${validate_component(Navbar, "Navbar").$$render(
    $$result,
    {
      class: "flex justify-evenly px-2 sm:px-4 py-2.5 fixed w-full z-20 top-0 start-0 border-b"
    },
    {},
    {
      default: () => {
        return `${validate_component(Breadcumb, "Breadcumb").$$render($$result, {}, {}, {})} ${validate_component(Navlinks, "Navlinks").$$render($$result, {}, {}, {})} ${validate_component(ProfileHeader, "ProfileHeader").$$render($$result, { userData: data }, {}, {})}`;
      }
    }
  )}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `${$$result.head += `<!-- HEAD_svelte-6c2v2_START -->${$$result.title = `<title>FLEET-TOWIT</title>`, ""}<!-- HEAD_svelte-6c2v2_END -->`, ""} <div class="flex flex-col justify-between mx-auto w-full"><header class="mb-20">${validate_component(Header, "Header").$$render($$result, { data: data.session.user }, {}, {})}</header> <main class="flex justify-evenly flex-wrap w-full gap-2 ">${slots.default ? slots.default({}) : ``}</main></div>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-dcc6bfef.js.map
