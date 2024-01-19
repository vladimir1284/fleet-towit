import { c as create_ssr_component, v as validate_component } from './ssr-fdd97ea6.js';
import { M as Modal } from './Modal-5b883096.js';
import { C as CreateUserForm } from './CreateUserForm-6ff04ca9.js';
import 'tailwind-merge';
import './Frame-7dd03585.js';
import './names-11b10067.js';
import './Button-f9503678.js';
import './index3-bd5d745e.js';
import './index2-0d39f80d.js';
import './stores-4bc45be0.js';
import './superValidate-395df3da.js';
import './index-d41d8d8d.js';
import './constants-34d965bd.js';
import './environment-e346e637.js';
import './stringify-7b836d4a.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { data } = $$props;
  let popupModal = true;
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
    )}
aaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`;
  } while (!$$settled);
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-d6d543d9.js.map
