import { c as create_ssr_component, v as validate_component, d as each, e as escape, j as add_attribute, p as createEventDispatcher } from './ssr-fdd97ea6.js';
import { T as Table, G as GradientButton, a as TableHead, b as TableHeadCell, c as TableBody, d as TableBodyRow, e as TableBodyCell, F as FileEditSolid, f as TrashBinSolid } from './TrashBinSolid-bd62bd88.js';
import { C as Card } from './Card-8cc0fbbc.js';
import { M as Modal } from './Modal-5b883096.js';
import { C as CreateUserForm } from './CreateUserForm-6ff04ca9.js';
import { B as Button } from './Button-f9503678.js';
import './index3-bd5d745e.js';
import './index-d41d8d8d.js';
import 'tailwind-merge';
import './names-11b10067.js';
import './Frame-7dd03585.js';
import './index2-0d39f80d.js';
import './stores-4bc45be0.js';
import './superValidate-395df3da.js';
import './constants-34d965bd.js';
import './environment-e346e637.js';
import './stringify-7b836d4a.js';

const DeleteUserForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  console.log(data);
  createEventDispatcher();
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  return `<div class="flex flex-col justify-center align-center space-y-6"><div class="sm:col-span-2" data-svelte-h="svelte-pgejhq"><h1>Delete user?</h1></div> ${validate_component(Button, "Button").$$render($$result, { class: "w-[50%] mx-auto block" }, {}, {
    default: () => {
      return `Delete`;
    }
  })}</div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let popupModal = false;
  let deleteModal = false;
  let selectedId = "";
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
      {
        size: "xs",
        padding: "md",
        open: popupModal
      },
      {
        open: ($$value) => {
          popupModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(CreateUserForm, "CreateUserForm").$$render($$result, { data }, {}, {})}`;
        }
      }
    )} ${validate_component(Modal, "Modal").$$render(
      $$result,
      {
        size: "xs",
        padding: "md",
        open: deleteModal
      },
      {
        open: ($$value) => {
          deleteModal = $$value;
          $$settled = false;
        }
      },
      {
        default: () => {
          return `${validate_component(DeleteUserForm, "DeleteUserForm").$$render($$result, { data: selectedId }, {}, {})}`;
        }
      }
    )} <div>${validate_component(Card, "Card").$$render($$result, { size: "9xl" }, {}, {
      default: () => {
        return `${validate_component(Table, "Table").$$render($$result, {}, {}, {
          default: () => {
            return `<caption class="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800">${validate_component(GradientButton, "GradientButton").$$render($$result, { shadow: true, color: "blue" }, {}, {
              default: () => {
                return `Create user`;
              }
            })}</caption> ${validate_component(TableHead, "TableHead").$$render($$result, {}, {}, {
              default: () => {
                return `${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `EMAIL`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `NAME`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {
                  default: () => {
                    return `ROLE`;
                  }
                })} ${validate_component(TableHeadCell, "TableHeadCell").$$render($$result, {}, {}, {})}`;
              }
            })} ${validate_component(TableBody, "TableBody").$$render($$result, { class: "divide-y" }, {}, {
              default: () => {
                return `${each(data.users, (user) => {
                  return `${validate_component(TableBodyRow, "TableBodyRow").$$render($$result, {}, {}, {
                    default: () => {
                      return `${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `${escape(user.user.email)}`;
                        }
                      })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `${escape(user.user.name || "-")}`;
                        }
                      })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, {}, {}, {
                        default: () => {
                          return `${escape(user.role)}`;
                        }
                      })} ${validate_component(TableBodyCell, "TableBodyCell").$$render($$result, { class: " flex w-32 justify-between" }, {}, {
                        default: () => {
                          return `<a${add_attribute("href", "./users/update/" + user.id, 0)}>${validate_component(FileEditSolid, "FileEditSolid").$$render($$result, { class: "text-gray-400" }, {}, {})}</a> ${validate_component(TrashBinSolid, "TrashBinSolid").$$render($$result, { class: "text-red-500" }, {}, {})} `;
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
//# sourceMappingURL=_page.svelte-fbabcb33.js.map
