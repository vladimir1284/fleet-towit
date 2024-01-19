import { c as create_ssr_component, p as createEventDispatcher, a as subscribe, j as add_attribute, v as validate_component, e as escape, b as compute_rest_props, g as spread, i as escape_object, h as escape_attribute_value, d as each } from './ssr-fdd97ea6.js';
import { B as Button } from './Button-f9503678.js';
import { F as FloatingLabelInput } from './Modal-5b883096.js';
import { twMerge } from 'tailwind-merge';
import { s as superForm, E as EnvelopeSolid } from './index3-bd5d745e.js';

const common = "block w-full";
const Select = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$restProps = compute_rest_props($$props, [
    "items",
    "value",
    "placeholder",
    "underline",
    "size",
    "defaultClass",
    "underlineClass"
  ]);
  let { items = [] } = $$props;
  let { value = void 0 } = $$props;
  let { placeholder = "Choose option ..." } = $$props;
  let { underline = false } = $$props;
  let { size = "md" } = $$props;
  let { defaultClass = "text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" } = $$props;
  let { underlineClass = "text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer" } = $$props;
  const sizes = {
    sm: "text-sm p-2",
    md: "text-sm p-2.5",
    lg: "text-base py-3 px-4"
  };
  let selectClass;
  if ($$props.items === void 0 && $$bindings.items && items !== void 0)
    $$bindings.items(items);
  if ($$props.value === void 0 && $$bindings.value && value !== void 0)
    $$bindings.value(value);
  if ($$props.placeholder === void 0 && $$bindings.placeholder && placeholder !== void 0)
    $$bindings.placeholder(placeholder);
  if ($$props.underline === void 0 && $$bindings.underline && underline !== void 0)
    $$bindings.underline(underline);
  if ($$props.size === void 0 && $$bindings.size && size !== void 0)
    $$bindings.size(size);
  if ($$props.defaultClass === void 0 && $$bindings.defaultClass && defaultClass !== void 0)
    $$bindings.defaultClass(defaultClass);
  if ($$props.underlineClass === void 0 && $$bindings.underlineClass && underlineClass !== void 0)
    $$bindings.underlineClass(underlineClass);
  selectClass = twMerge(common, underline ? underlineClass : defaultClass, sizes[size], underline && "!px-0", $$props.class);
  return `<select${spread(
    [
      escape_object($$restProps),
      {
        class: escape_attribute_value(selectClass)
      }
    ],
    {}
  )}>${placeholder ? `<option disabled selected value="">${escape(placeholder)}</option>` : ``}${items.length ? each(items, ({ value: value2, name }) => {
    return `<option${add_attribute("value", value2, 0)}>${escape(name)}</option>`;
  }) : `${slots.default ? slots.default({}) : ``}`}</select> `;
});
const CreateUserForm = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $form, $$unsubscribe_form;
  let $constraints, $$unsubscribe_constraints;
  let $errors, $$unsubscribe_errors;
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
  let roles = [{ value: "ADMIN", name: "ADMIN" }, { value: "STAFF", name: "STAFF" }];
  if ($$props.data === void 0 && $$bindings.data && data !== void 0)
    $$bindings.data(data);
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<form class="flex flex-col justify-center align-center space-y-6" method="POST"><input hidden name="id"${add_attribute("value", $form.id, 0)}> <div class="sm:col-span-2">${validate_component(FloatingLabelInput, "FloatingLabelInput").$$render(
      $$result,
      Object.assign(
        {},
        { style: "outlined" },
        {
          class: "focus:ring-0 border-blue-500 focus:outline-0 focus:ring-2 focus:ring-blue-500"
        },
        { type: "text" },
        { name: "email" },
        { placeholder: "Insert your email" },
        { required: true },
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
			Email`;
        }
      }
    )} ${$errors.email ? `<span class="text-red-600">${escape($errors.email)}</span>` : ``}</div> ${validate_component(Select, "Select").$$render(
      $$result,
      {
        class: "mt-2",
        items: roles,
        name: "role",
        placeholder: "Select a role...",
        value: $form.role
      },
      {
        value: ($$value) => {
          $form.role = $$value;
          $$settled = false;
        }
      },
      {}
    )} ${validate_component(Button, "Button").$$render(
      $$result,
      {
        type: "submit",
        class: "w-[50%] mx-auto block"
      },
      {},
      {
        default: () => {
          return `Create user`;
        }
      }
    )}</form>`;
  } while (!$$settled);
  $$unsubscribe_form();
  $$unsubscribe_constraints();
  $$unsubscribe_errors();
  return $$rendered;
});

export { CreateUserForm as C };
//# sourceMappingURL=CreateUserForm-6ff04ca9.js.map
