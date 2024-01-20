import { c as create_ssr_component, v as validate_component, d as each, e as escape, p as createEventDispatcher, a as subscribe, b as compute_rest_props, k as getContext, g as spread, i as escape_object, h as escape_attribute_value } from './ssr-fdd97ea6.js';
import { T as Table, G as GradientButton, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell, F as FileEditSolid, f as TrashBinSolid } from './TrashBinSolid-bd62bd88.js';
import { C as Card } from './Card-8cc0fbbc.js';
import { M as Modal, F as FloatingLabelInput } from './Modal-5b883096.js';
import { B as Button } from './Button-f9503678.js';
import { twMerge } from 'tailwind-merge';
import { s as superForm, E as EnvelopeSolid } from './index3-bd5d745e.js';
import './names-11b10067.js';
import './Frame-7dd03585.js';
import './index2-0d39f80d.js';
import './stores-4bc45be0.js';
import './superValidate-395df3da.js';
import './index-d41d8d8d.js';
import './constants-34d965bd.js';
import './environment-e346e637.js';
import './stringify-7b836d4a.js';

const BuildingSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "building solid" } = $$props;
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
      { viewBox: "0 0 18 18" }
    ],
    {}
  )}><path fill="currentColor" d="M17 16h-1V2a1 1 0 1 0 0-2H2a1 1 0 0 0 0 2v14H1a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM5 4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V4Zm0 5V8a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1Zm6 7H7v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3Zm2-7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1Zm0-4a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1Z"></path></svg> `;
});
const CreateCompanyForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $errors, $$unsubscribe_errors;
  let $form, $$unsubscribe_form;
  let $constraints, $$unsubscribe_constraints;
  let { data } = $$props;
  const dispatch = createEventDispatcher();
  const { form, errors, constraints, enhance } = superForm(data.form, {
    onUpdated: async ({ form: form2 }) => {
      console.log(form2);
      if (form2.valid) {
        dispatch("formvalid", false);
      }
    }
  });
  $$unsubscribe_form = subscribe(form, (value) => $form = value);
  $$unsubscribe_errors = subscribe(errors, (value) => $errors = value);
  $$unsubscribe_constraints = subscribe(constraints, (value) => $constraints = value);
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<form action="/admin/companies" method="POST"><div class="grid gap-4 sm:grid-cols-2 sm:gap-6"><div class="sm:col-span-2">${validate_component(FloatingLabelInput, "FloatingLabelInput").$$render(
      $$result,
      Object.assign(
        {},
        { style: "outlined" },
        { type: "text" },
        { id: "name" },
        { name: "name" },
        { required: true },
        {
          "aria-invalid": $errors.name ? "true" : void 0
        },
        $constraints.name,
        { value: $form.name }
      ),
      {
        value: ($$value) => {
          $form.name = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(BuildingSolid, "BuildingSolid").$$render($$result, { class: "w-6 h-6 inline" }, {}, {})}
				Company name`;
        }
      }
    )} ${$errors.name ? `<span class="text-red-600">${escape($errors.name)}</span>` : ``}</div> <div class="sm:col-span-2">${validate_component(FloatingLabelInput, "FloatingLabelInput").$$render(
      $$result,
      Object.assign(
        {},
        { style: "outlined" },
        { type: "email" },
        { id: "email" },
        { name: "email" },
        { required: true },
        {
          "aria-invalid": $errors.email ? "true" : void 0
        },
        $constraints.email,
        { value: $form.email }
      ),
      {
        value: ($$value) => {
          $form.email = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(EnvelopeSolid, "EnvelopeSolid").$$render($$result, { class: "w-6 h-6 inline" }, {}, {})}
				Company email`;
        }
      }
    )} ${$errors.email ? `<span class="text-red-600">${escape($errors.email)}</span>` : ``}</div> <div class="flex sm:col-span-2 justify-center items-center">${validate_component(Button, "Button").$$render($$result, { type: "submit", class: "w-40" }, {}, {
      default: () => {
        return `Create company`;
      }
    })}</div></div></form>`;
  } while (!$$settled);
  $$unsubscribe_errors();
  $$unsubscribe_form();
  $$unsubscribe_constraints();
  return $$rendered;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let popupModal = false;
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `${validate_component(Modal, "Modal").$$render(
      $$result,
      { size: "xs", open: popupModal },
      {
        open: ($$value) => {
          popupModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(CreateCompanyForm, "CreateCompanyForm").$$render($$result, { data }, {}, {})}`;
        }
      }
    )} <div>${validate_component(Card, "Card").$$render($$result, { size: "9xl" }, {}, {
      default: () => {
        return `${validate_component(Table, "Table").$$render($$result, {}, {}, {
          default: () => {
            return `<caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">${validate_component(GradientButton, "GradientButton").$$render($$result, { shadow: true, color: "blue" }, {}, {
              default: () => {
                return `Create Company`;
              }
            })}</caption> ${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "text-center" }, {}, {
                  default: () => {
                    return `COMPANY NAME`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "text-center" }, {}, {
                  default: () => {
                    return `COMPANY EMAIL`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "text-center" }, {}, {
                  default: () => {
                    return `COMPANY OWNER`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "text-center" }, {}, {
                  default: () => {
                    return `COMPANY USERS`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, { class: "text-center" }, {}, {})}`;
              }
            })} ${validate_component(TableBody, "TableBody").$$render($$result, { class: "divide-y" }, {}, {
              default: () => {
                return `${each(data.companies, (company) => {
                  return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "text-center" }, {}, {
                        default: () => {
                          return `${escape(company.name)}`;
                        }
                      })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "text-center" }, {}, {
                        default: () => {
                          return `${escape(company.email)}`;
                        }
                      })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "text-center" }, {}, {
                        default: () => {
                          return `${escape(company.owner?.email || "-")}`;
                        }
                      })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: "text-center" }, {}, {
                        default: () => {
                          return `<a class="cursor-pointer" data-svelte-h="svelte-1x2ezra">See users</a>`;
                        }
                      })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: " flex w-32 justify-between" }, {}, {
                        default: () => {
                          return `${validate_component(FileEditSolid, "FileEditSolid").$$render($$result, { class: "text-gray-400" }, {}, {})} ${validate_component(TrashBinSolid, "TrashBinSolid").$$render($$result, { class: "text-red-500" }, {}, {})} `;
                        }
                      })} `;
                    }
                  })}`;
                })}`;
              }
            })}`;
          }
        })}`;
      }
    })} ${``}</div>`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-3618ef38.js.map
