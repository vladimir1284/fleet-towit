import { c as create_ssr_component, b as compute_rest_props, k as getContext, g as spread, i as escape_object, h as escape_attribute_value, q as get_store_value, t as onDestroy, u as set_current_component, r as run_all, w as current_component } from './ssr-fdd97ea6.js';
import { twMerge } from 'tailwind-merge';
import { w as writable, d as derived } from './index2-0d39f80d.js';
import { p as page, n as navigating } from './stores-4bc45be0.js';
import { c as clone$1, S as SuperFormError, a as clearErrors, b as splitPath, t as traversePath, d as comparePaths, p as pathExists, e as setPaths, f as flattenErrors, m as mapErrors, g as errorShape, h as traversePathsAsync, i as traversePaths, j as isInvalidPath, k as mergePath, l as parse } from './superValidate-395df3da.js';
import { b as browser } from './environment-e346e637.js';
import { s as stringify } from './stringify-7b836d4a.js';
import './index-d41d8d8d.js';

const dirty_components = [];
const binding_callbacks = [];
let render_callbacks = [];
const flush_callbacks = [];
const resolved_promise = /* @__PURE__ */ Promise.resolve();
let update_scheduled = false;
function schedule_update() {
  if (!update_scheduled) {
    update_scheduled = true;
    resolved_promise.then(flush);
  }
}
function tick() {
  schedule_update();
  return resolved_promise;
}
function add_render_callback(fn) {
  render_callbacks.push(fn);
}
const seen_callbacks = /* @__PURE__ */ new Set();
let flushidx = 0;
function flush() {
  if (flushidx !== 0) {
    return;
  }
  const saved_component = current_component;
  do {
    try {
      while (flushidx < dirty_components.length) {
        const component = dirty_components[flushidx];
        flushidx++;
        set_current_component(component);
        update(component.$$);
      }
    } catch (e) {
      dirty_components.length = 0;
      flushidx = 0;
      throw e;
    }
    set_current_component(null);
    dirty_components.length = 0;
    flushidx = 0;
    while (binding_callbacks.length)
      binding_callbacks.pop()();
    for (let i = 0; i < render_callbacks.length; i += 1) {
      const callback = render_callbacks[i];
      if (!seen_callbacks.has(callback)) {
        seen_callbacks.add(callback);
        callback();
      }
    }
    render_callbacks.length = 0;
  } while (dirty_components.length);
  while (flush_callbacks.length) {
    flush_callbacks.pop()();
  }
  update_scheduled = false;
  seen_callbacks.clear();
  set_current_component(saved_component);
}
function update($$) {
  if ($$.fragment !== null) {
    $$.update();
    run_all($$.before_update);
    const dirty = $$.dirty;
    $$.dirty = [-1];
    $$.fragment && $$.fragment.p($$.ctx, dirty);
    $$.after_update.forEach(add_render_callback);
  }
}
function client_method(key) {
  {
    if (key === "before_navigate" || key === "after_navigate" || key === "on_navigate" || key === "push_state" || key === "replace_state") {
      return () => {
      };
    } else {
      const name_lookup = {
        disable_scroll_handling: "disableScrollHandling",
        preload_data: "preloadData",
        preload_code: "preloadCode",
        invalidate_all: "invalidateAll"
      };
      return () => {
        throw new Error(`Cannot call ${name_lookup[key] ?? key}(...) on the server`);
      };
    }
  }
}
const EnvelopeSolid = create_ssr_component(($$result, $$props, $$bindings, slots) => {
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
  let { ariaLabel = "envelope solid" } = $$props;
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
      { viewBox: "0 0 20 16" }
    ],
    {}
  )}><g fill="currentColor"><path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z"></path><path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z"></path></g></svg> `;
});
const invalidateAll = /* @__PURE__ */ client_method("invalidate_all");
const beforeNavigate = /* @__PURE__ */ client_method("before_navigate");
const afterNavigate = /* @__PURE__ */ client_method("after_navigate");
function fieldProxy(form, path) {
  const path2 = splitPath(path);
  const proxy = derived(form, ($form) => {
    const data = traversePath($form, path2);
    return data?.value;
  });
  return {
    subscribe(...params) {
      const unsub = proxy.subscribe(...params);
      return () => unsub();
    },
    update(upd) {
      form.update((f) => {
        const output = traversePath(f, path2, ({ parent, key, value }) => {
          if (value === void 0)
            parent[key] = /\D/.test(key) ? {} : [];
          return parent[key];
        });
        if (output)
          output.parent[output.key] = upd(output.value);
        return f;
      });
    },
    set(value) {
      form.update((f) => {
        const output = traversePath(f, path2, ({ parent, key, value: value2 }) => {
          if (value2 === void 0)
            parent[key] = /\D/.test(key) ? {} : [];
          return parent[key];
        });
        if (output)
          output.parent[output.key] = value;
        return f;
      });
    }
  };
}
async function clientValidation(validators, checkData, formId, constraints, posted) {
  return _clientValidation(validators, checkData, formId, constraints, posted);
}
async function _clientValidation(validators, checkData, formId, constraints, posted) {
  let valid = true;
  let clientErrors = {};
  if (validators) {
    if ("safeParseAsync" in validators) {
      const validator = validators;
      const result = await validator.safeParseAsync(checkData);
      valid = result.success;
      if (!result.success) {
        clientErrors = mapErrors(
          result.error.format(),
          errorShape(validator)
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        );
      } else {
        checkData = result.data;
      }
    } else {
      checkData = { ...checkData };
      for (const [key, value] of Object.entries(validators)) {
        if (typeof value === "function" && !(key in checkData)) {
          checkData[key] = void 0;
        }
      }
      const validator = validators;
      const newErrors = [];
      await traversePathsAsync(checkData, async ({ value, path }) => {
        const validationPath = path.filter((p) => /\D/.test(String(p)));
        const maybeValidator = traversePath(validator, validationPath);
        if (typeof maybeValidator?.value === "function") {
          const check = maybeValidator.value;
          let errors;
          if (Array.isArray(value)) {
            for (const key in value) {
              try {
                errors = await check(value[key]);
                if (errors) {
                  valid = false;
                  newErrors.push({
                    path: path.concat([key]),
                    errors: typeof errors === "string" ? [errors] : errors ?? void 0
                  });
                }
              } catch (e) {
                valid = false;
                console.error(`Error in form validators for field "${path}":`, e);
              }
            }
          } else {
            try {
              errors = await check(value);
              if (errors) {
                valid = false;
                newErrors.push({
                  path,
                  errors: typeof errors === "string" ? [errors] : errors ?? void 0
                });
              }
            } catch (e) {
              valid = false;
              console.error(`Error in form validators for field "${path}":`, e);
            }
          }
        }
      });
      for (const { path, errors } of newErrors) {
        const errorPath = traversePath(clientErrors, path, ({ parent, key, value }) => {
          if (value === void 0)
            parent[key] = {};
          return parent[key];
        });
        if (errorPath) {
          const { parent, key } = errorPath;
          parent[key] = errors;
        }
      }
    }
  }
  return {
    valid,
    posted,
    errors: clientErrors,
    data: checkData,
    constraints,
    message: void 0,
    id: formId
  };
}
async function validateObjectErrors(formOptions, Form2, Errors, tainted) {
  if (typeof formOptions.validators !== "object" || !("safeParseAsync" in formOptions.validators)) {
    return;
  }
  const validators = formOptions.validators;
  const result = await validators.safeParseAsync(get_store_value(Form2));
  if (!result.success) {
    const newErrors = mapErrors(result.error.format(), errorShape(validators));
    Errors.update((currentErrors) => {
      traversePaths(currentErrors, (pathData) => {
        if (pathData.key == "_errors") {
          return pathData.set(void 0);
        }
      });
      traversePaths(newErrors, (pathData) => {
        if (pathData.key == "_errors") {
          const taintedPath = pathData.path.length == 1 ? { value: true } : tainted && traversePath(tainted, pathData.path.slice(0, -1));
          if (taintedPath && taintedPath.value) {
            return setPaths(currentErrors, [pathData.path], pathData.value);
          }
        }
      });
      return currentErrors;
    });
  } else {
    Errors.update((currentErrors) => {
      traversePaths(currentErrors, (pathData) => {
        if (pathData.key == "_errors") {
          return pathData.set(void 0);
        }
      });
      return currentErrors;
    });
  }
}
async function validateField(path, formOptions, data, Errors, Tainted, options = {}) {
  function Errors_clear() {
    clearErrors(Errors, { undefinePath: path, clearFormLevelErrors: true });
  }
  function Errors_update(errorMsgs) {
    if (typeof errorMsgs === "string")
      errorMsgs = [errorMsgs];
    if (options.update === true || options.update == "errors") {
      Errors.update((errors) => {
        const error = traversePath(errors, path, (node) => {
          if (isInvalidPath(path, node)) {
            throw new SuperFormError("Errors can only be added to form fields, not to arrays or objects in the schema. Path: " + node.path.slice(0, -1));
          } else if (node.value === void 0) {
            node.parent[node.key] = {};
            return node.parent[node.key];
          } else {
            return node.value;
          }
        });
        if (!error)
          throw new SuperFormError("Error path could not be created: " + path);
        error.parent[error.key] = errorMsgs ?? void 0;
        return errors;
      });
    }
    return errorMsgs ?? void 0;
  }
  const result = await _validateField(path, formOptions.validators, data, Errors, Tainted, options);
  if (result.validated) {
    if (result.validated === "all" && !result.errors) {
      Errors_clear();
    } else {
      result.errors = Errors_update(result.errors);
    }
  } else if (result.validated === false && formOptions.defaultValidator == "clear") {
    result.errors = Errors_update(result.errors);
  }
  return result;
}
async function _validateField(path, validators, data, Errors, Tainted, options = {}) {
  if (options.update === void 0)
    options.update = true;
  if (options.taint === void 0)
    options.taint = false;
  if (typeof options.errors == "string")
    options.errors = [options.errors];
  const Context = {
    value: options.value,
    shouldUpdate: true,
    currentData: void 0,
    // Remove numeric indices, they're not used for validators.
    validationPath: path.filter((p) => /\D/.test(String(p)))
  };
  async function defaultValidate() {
    return { validated: false, errors: void 0, data: void 0 };
  }
  function Tainted_isPathTainted(path2, tainted) {
    if (tainted === void 0)
      return false;
    const leaf = traversePath(tainted, path2);
    if (!leaf)
      return false;
    return leaf.value;
  }
  function Errors_update(updater) {
    Errors.update(updater);
  }
  function Errors_clearAll() {
    clearErrors(Errors, { undefinePath: null, clearFormLevelErrors: true });
  }
  function Errors_fromZod(errors, validator) {
    return mapErrors(errors.format(), errorShape(validator));
  }
  if (!("value" in options)) {
    Context.currentData = get_store_value(data);
    const dataToValidate = traversePath(Context.currentData, path);
    Context.value = dataToValidate?.value;
  } else if (options.update === true || options.update === "value") {
    data.update(($data) => {
      setPaths($data, [path], Context.value);
      return Context.currentData = $data;
    }, { taint: options.taint });
  } else {
    Context.shouldUpdate = false;
  }
  if (typeof validators !== "object") {
    return defaultValidate();
  }
  if ("safeParseAsync" in validators) {
    if (!Context.shouldUpdate) {
      Context.currentData = clone$1(Context.currentData ?? get_store_value(data));
      setPaths(Context.currentData, [path], Context.value);
    }
    const result = await validators.safeParseAsync(Context.currentData);
    if (!result.success) {
      const newErrors = Errors_fromZod(result.error, validators);
      if (options.update === true || options.update == "errors") {
        const taintedFields = get_store_value(Tainted);
        Errors_update((currentErrors) => {
          traversePaths(currentErrors, (pathData) => {
            if (pathData.key == "_errors") {
              return pathData.set(void 0);
            }
          });
          traversePaths(newErrors, (pathData) => {
            if (pathData.key == "_errors" && (pathData.path.length == 1 || Tainted_isPathTainted(pathData.path.slice(0, -1), taintedFields))) {
              return setPaths(currentErrors, [pathData.path], pathData.value);
            }
            if (!Array.isArray(pathData.value))
              return;
            if (Tainted_isPathTainted(pathData.path, taintedFields)) {
              setPaths(currentErrors, [pathData.path], pathData.value);
            }
            return "skip";
          });
          return currentErrors;
        });
      }
      const current = traversePath(newErrors, path);
      return {
        validated: true,
        errors: options.errors ?? current?.value,
        data: void 0
      };
    } else {
      Errors_clearAll();
      return {
        validated: true,
        errors: void 0,
        data: result.data
        // For a successful Zod result, return the possibly transformed data.
      };
    }
  } else {
    const validator = traversePath(validators, Context.validationPath);
    if (!validator || validator.value === void 0) {
      return defaultValidate();
    } else {
      const result = await validator.value(Context.value);
      return {
        validated: true,
        errors: result ? options.errors ?? result : result,
        data: void 0
        // No transformation for Superforms validators
      };
    }
  }
}
function applyAction(result) {
  {
    throw new Error("Cannot call applyAction(...) on the server");
  }
}
function deserialize(result) {
  const parsed = JSON.parse(result);
  if (parsed.data) {
    parsed.data = parse(parsed.data);
  }
  return parsed;
}
function clone(element) {
  return (
    /** @type {T} */
    HTMLElement.prototype.cloneNode.call(element)
  );
}
function enhance(form_element, submit = () => {
}) {
  const fallback_callback = async ({
    action,
    result,
    reset = true,
    invalidateAll: shouldInvalidateAll = true
  }) => {
    if (result.type === "success") {
      if (reset) {
        HTMLFormElement.prototype.reset.call(form_element);
      }
      if (shouldInvalidateAll) {
        await invalidateAll();
      }
    }
    if (location.origin + location.pathname === action.origin + action.pathname || result.type === "redirect" || result.type === "error") {
      applyAction();
    }
  };
  async function handle_submit(event) {
    const method = event.submitter?.hasAttribute("formmethod") ? (
      /** @type {HTMLButtonElement | HTMLInputElement} */
      event.submitter.formMethod
    ) : clone(form_element).method;
    if (method !== "post")
      return;
    event.preventDefault();
    const action = new URL(
      // We can't do submitter.formAction directly because that property is always set
      event.submitter?.hasAttribute("formaction") ? (
        /** @type {HTMLButtonElement | HTMLInputElement} */
        event.submitter.formAction
      ) : clone(form_element).action
    );
    const form_data = new FormData(form_element);
    const submitter_name = event.submitter?.getAttribute("name");
    if (submitter_name) {
      form_data.append(submitter_name, event.submitter?.getAttribute("value") ?? "");
    }
    const controller = new AbortController();
    let cancelled = false;
    const cancel = () => cancelled = true;
    const callback = await submit({
      action,
      cancel,
      controller,
      formData: form_data,
      formElement: form_element,
      submitter: event.submitter
    }) ?? fallback_callback;
    if (cancelled)
      return;
    let result;
    try {
      const response = await fetch(action, {
        method: "POST",
        headers: {
          accept: "application/json",
          "x-sveltekit-action": "true"
        },
        cache: "no-store",
        body: form_data,
        signal: controller.signal
      });
      result = deserialize(await response.text());
      if (result.type === "error")
        result.status = response.status;
    } catch (error) {
      if (
        /** @type {any} */
        error?.name === "AbortError"
      )
        return;
      result = { type: "error", error };
    }
    callback({
      action,
      formData: form_data,
      formElement: form_element,
      update: (opts) => fallback_callback({
        action,
        result,
        reset: opts?.reset,
        invalidateAll: opts?.invalidateAll
      }),
      // @ts-expect-error generic constraints stuff we don't care about
      result
    });
  }
  HTMLFormElement.prototype.addEventListener.call(form_element, "submit", handle_submit);
  return {
    destroy() {
      HTMLFormElement.prototype.removeEventListener.call(form_element, "submit", handle_submit);
    }
  };
}
const isElementInViewport = (el, topOffset = 0) => {
  const rect = el.getBoundingClientRect();
  return rect.top >= topOffset && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
};
const scrollToAndCenter = (el, offset = 1.125, behavior = "smooth") => {
  const elementRect = el.getBoundingClientRect();
  const absoluteElementTop = elementRect.top + window.pageYOffset;
  const top = absoluteElementTop - window.innerHeight / (2 * offset);
  window.scrollTo({ left: 0, top, behavior });
};
var FetchStatus;
(function(FetchStatus2) {
  FetchStatus2[FetchStatus2["Idle"] = 0] = "Idle";
  FetchStatus2[FetchStatus2["Submitting"] = 1] = "Submitting";
  FetchStatus2[FetchStatus2["Delayed"] = 2] = "Delayed";
  FetchStatus2[FetchStatus2["Timeout"] = 3] = "Timeout";
})(FetchStatus || (FetchStatus = {}));
const activeTimers = /* @__PURE__ */ new Set();
let _initialized = false;
function Form(formEl, timers, options) {
  let state = FetchStatus.Idle;
  let delayedTimeout, timeoutTimeout;
  let aboutToNavigate = false;
  const Timers = activeTimers;
  function Timers_start() {
    Timers_clear();
    Timers_setState(state != FetchStatus.Delayed ? FetchStatus.Submitting : FetchStatus.Delayed);
    delayedTimeout = window.setTimeout(() => {
      if (delayedTimeout && state == FetchStatus.Submitting)
        Timers_setState(FetchStatus.Delayed);
    }, options.delayMs);
    timeoutTimeout = window.setTimeout(() => {
      if (timeoutTimeout && state == FetchStatus.Delayed)
        Timers_setState(FetchStatus.Timeout);
    }, options.timeoutMs);
    Timers.add(Timers_clear);
  }
  function Timers_clear() {
    clearTimeout(delayedTimeout);
    clearTimeout(timeoutTimeout);
    delayedTimeout = timeoutTimeout = 0;
    Timers.delete(Timers_clear);
    Timers_setState(FetchStatus.Idle);
  }
  function Timers_clearAll() {
    Timers.forEach((t) => t());
    Timers.clear();
  }
  function Timers_setState(s) {
    state = s;
    timers.submitting.set(state >= FetchStatus.Submitting);
    timers.delayed.set(state >= FetchStatus.Delayed);
    timers.timeout.set(state >= FetchStatus.Timeout);
  }
  const ErrorTextEvents = formEl;
  function ErrorTextEvents__selectText(e) {
    const target = e.target;
    if (options.selectErrorText)
      target.select();
  }
  function ErrorTextEvents_addErrorTextListeners() {
    if (!options.selectErrorText)
      return;
    ErrorTextEvents.querySelectorAll("input").forEach((el) => {
      el.addEventListener("invalid", ErrorTextEvents__selectText);
    });
  }
  function ErrorTextEvents_removeErrorTextListeners() {
    if (!options.selectErrorText)
      return;
    ErrorTextEvents.querySelectorAll("input").forEach((el) => el.removeEventListener("invalid", ErrorTextEvents__selectText));
  }
  const Form2 = formEl;
  function Form_shouldAutoFocus(userAgent) {
    if (typeof options.autoFocusOnError === "boolean")
      return options.autoFocusOnError;
    else
      return !/iPhone|iPad|iPod|Android/i.test(userAgent);
  }
  const Form_scrollToFirstError = async () => {
    if (options.scrollToError == "off")
      return;
    const selector = options.errorSelector;
    if (!selector)
      return;
    await tick();
    let el;
    el = Form2.querySelector(selector);
    if (!el)
      return;
    el = el.querySelector(selector) ?? el;
    const nav = options.stickyNavbar ? document.querySelector(options.stickyNavbar) : null;
    if (typeof options.scrollToError != "string") {
      el.scrollIntoView(options.scrollToError);
    } else if (!isElementInViewport(el, nav?.offsetHeight ?? 0)) {
      scrollToAndCenter(el, void 0, options.scrollToError);
    }
    if (!Form_shouldAutoFocus(navigator.userAgent))
      return;
    let focusEl;
    focusEl = el;
    if (!["INPUT", "SELECT", "BUTTON", "TEXTAREA"].includes(focusEl.tagName)) {
      focusEl = focusEl.querySelector('input:not([type="hidden"]):not(.flatpickr-input), select, textarea');
    }
    if (focusEl) {
      try {
        focusEl.focus({ preventScroll: true });
        if (options.selectErrorText && focusEl.tagName == "INPUT") {
          focusEl.select();
        }
      } catch (err) {
      }
    }
  };
  {
    ErrorTextEvents_addErrorTextListeners();
    const completed = (cancelled, clearIfNotNavigating = false) => {
      Timers_clear();
      if (!cancelled)
        setTimeout(Form_scrollToFirstError);
      if (clearIfNotNavigating && !aboutToNavigate) {
        Timers_clearAll();
      }
    };
    onDestroy(() => {
      ErrorTextEvents_removeErrorTextListeners();
      completed(true);
    });
    if (!_initialized) {
      beforeNavigate(() => {
        aboutToNavigate = true;
      });
      afterNavigate((nav) => {
        if (nav.type == "enter")
          return;
        aboutToNavigate = false;
        Timers_clearAll();
      });
      _initialized = true;
    }
    return {
      submitting: () => {
        aboutToNavigate = false;
        Timers_start();
      },
      completed,
      scrollToFirstError: () => {
        setTimeout(Form_scrollToFirstError);
      },
      isSubmitting: () => state === FetchStatus.Submitting || state === FetchStatus.Delayed
    };
  }
}
function cancelFlash(options) {
  if (!options.flashMessage || !browser)
    return;
  if (!shouldSyncFlash(options))
    return;
  document.cookie = `flash=; Max-Age=0; Path=${options.flashMessage.cookiePath ?? "/"};`;
}
function shouldSyncFlash(options) {
  if (!options.flashMessage || !browser)
    return false;
  return options.syncFlashMessage;
}
const noCustomValidityDataAttribute = "noCustomValidity";
function setCustomValidity(el, errors) {
  const message = errors && errors.length ? errors.join("\n") : "";
  el.setCustomValidity(message);
  if (message)
    el.reportValidity();
}
function setCustomValidityForm(formEl, errors) {
  for (const el of formEl.querySelectorAll("input,select,textarea,button")) {
    if (noCustomValidityDataAttribute in el.dataset) {
      continue;
    }
    const error = traversePath(errors, splitPath(el.name));
    setCustomValidity(el, error?.value);
    if (error?.value)
      return;
  }
}
function formEnhance(formEl, submitting, delayed, timeout, errs, Form_updateFromActionResult, options, data, message, enableTaintedForm, formEvents, formId, constraints, tainted, lastChanges, Context_findValidationForms, posted) {
  enableTaintedForm();
  const errors = errs;
  async function updateCustomValidity(validityEl, event, errors2) {
    if (!options.customValidity)
      return;
    if (options.validationMethod == "submit-only")
      return;
    if ("setCustomValidity" in validityEl) {
      validityEl.setCustomValidity("");
    }
    if (event == "input" && options.validationMethod == "onblur")
      return;
    if (noCustomValidityDataAttribute in validityEl.dataset)
      return;
    setCustomValidity(validityEl, errors2);
  }
  async function htmlInputChange(change, event, target) {
    if (options.validationMethod == "submit-only")
      return;
    const result = await validateField(change, options, data, errors, tainted);
    if (result.data && target)
      data.set(result.data);
    if (options.customValidity) {
      const name = CSS.escape(mergePath(change));
      const el = formEl.querySelector(`[name="${name}"]`);
      if (el)
        updateCustomValidity(el, event, result.errors);
    }
  }
  const immediateInputTypes = ["checkbox", "radio", "range"];
  function isImmediateInput(el) {
    return el && (el instanceof HTMLSelectElement || el instanceof HTMLInputElement && immediateInputTypes.includes(el.type));
  }
  async function checkBlur(e) {
    if (options.validationMethod == "oninput" || options.validationMethod == "submit-only") {
      return;
    }
    const immediateUpdate = isImmediateInput(e.target);
    if (immediateUpdate)
      await new Promise((r) => setTimeout(r, 0));
    const changes = get_store_value(lastChanges);
    if (!changes.length)
      return;
    const target = e.target instanceof HTMLElement ? e.target : null;
    for (const change of changes) {
      htmlInputChange(change, "blur", immediateUpdate ? null : target);
    }
    lastChanges.set([]);
  }
  async function checkInput(e) {
    if (options.validationMethod == "onblur" || options.validationMethod == "submit-only") {
      return;
    }
    const immediateUpdate = isImmediateInput(e.target);
    if (immediateUpdate)
      await new Promise((r) => setTimeout(r, 0));
    const changes = get_store_value(lastChanges);
    if (!changes.length)
      return;
    const target = e.target instanceof HTMLElement ? e.target : null;
    for (const change of changes) {
      const hadErrors = (
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        immediateUpdate || traversePath(get_store_value(errors), change)
      );
      if (immediateUpdate || typeof hadErrors == "object" && hadErrors.key in hadErrors.parent) {
        setTimeout(() => htmlInputChange(change, "input", immediateUpdate ? target : null), 0);
      }
    }
  }
  formEl.addEventListener("focusout", checkBlur);
  formEl.addEventListener("input", checkInput);
  onDestroy(() => {
    formEl.removeEventListener("focusout", checkBlur);
    formEl.removeEventListener("input", checkInput);
  });
  const htmlForm = Form(formEl, { submitting, delayed, timeout }, options);
  let currentRequest;
  return enhance(formEl, async (submit) => {
    const _submitCancel = submit.cancel;
    let cancelled = false;
    function cancel(resetTimers = true) {
      cancelled = true;
      if (resetTimers && htmlForm.isSubmitting()) {
        htmlForm.completed(true);
      }
      return _submitCancel();
    }
    submit.cancel = cancel;
    if (htmlForm.isSubmitting() && options.multipleSubmits == "prevent") {
      cancel(false);
    } else {
      if (htmlForm.isSubmitting() && options.multipleSubmits == "abort") {
        if (currentRequest)
          currentRequest.abort();
      }
      htmlForm.submitting();
      currentRequest = submit.controller;
      for (const event of formEvents.onSubmit) {
        await event(submit);
      }
    }
    if (cancelled) {
      if (options.flashMessage)
        cancelFlash(options);
    } else {
      const noValidate = !options.SPA && (formEl.noValidate || (submit.submitter instanceof HTMLButtonElement || submit.submitter instanceof HTMLInputElement) && submit.submitter.formNoValidate);
      const validation = await clientValidation(noValidate ? void 0 : options.validators, get_store_value(data), get_store_value(formId), get_store_value(constraints), get_store_value(posted));
      if (!validation.valid) {
        cancel(false);
        const result = {
          type: "failure",
          status: (typeof options.SPA === "boolean" ? void 0 : options.SPA?.failStatus) ?? 400,
          data: { form: validation }
        };
        setTimeout(() => validationResponse({ result }), 0);
      }
      if (!cancelled) {
        switch (options.clearOnSubmit) {
          case "errors-and-message":
            errors.clear();
            message.set(void 0);
            break;
          case "errors":
            errors.clear();
            break;
          case "message":
            message.set(void 0);
            break;
        }
        if (options.flashMessage && (options.clearOnSubmit == "errors-and-message" || options.clearOnSubmit == "message") && shouldSyncFlash(options)) {
          options.flashMessage.module.getFlash(page).set(void 0);
        }
        const submitData = "formData" in submit ? submit.formData : submit.data;
        if (options.SPA) {
          cancel(false);
          const validationResult = { ...validation, posted: true };
          const result = {
            type: validationResult.valid ? "success" : "failure",
            status: validationResult.valid ? 200 : typeof options.SPA == "object" ? options.SPA?.failStatus : 400,
            data: { form: validationResult }
          };
          setTimeout(() => validationResponse({ result }), 0);
        } else if (options.dataType === "json") {
          const postData = validation.data;
          const chunks = chunkSubstr(stringify(postData), options.jsonChunkSize ?? 5e5);
          for (const chunk of chunks) {
            submitData.append("__superform_json", chunk);
          }
          Object.keys(postData).forEach((key) => {
            if (typeof submitData.get(key) === "string") {
              submitData.delete(key);
            }
          });
        }
        if (!options.SPA && !submitData.has("__superform_id")) {
          const id = get_store_value(formId);
          if (id !== void 0)
            submitData.set("__superform_id", id);
        }
      }
    }
    function chunkSubstr(str, size) {
      const numChunks = Math.ceil(str.length / size);
      const chunks = new Array(numChunks);
      for (let i = 0, o = 0; i < numChunks; ++i, o += size) {
        chunks[i] = str.substring(o, o + size);
      }
      return chunks;
    }
    async function validationResponse(event) {
      const result = event.result.type ? event.result : {
        type: "error",
        status: 500,
        error: event.result
      };
      currentRequest = null;
      let cancelled2 = false;
      const data2 = {
        result,
        formEl,
        cancel: () => cancelled2 = true
      };
      for (const event2 of formEvents.onResult) {
        await event2(data2);
      }
      if (!cancelled2) {
        if ((result.type === "success" || result.type == "failure") && result.data) {
          const forms = Context_findValidationForms(result.data);
          if (!forms.length) {
            throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
          }
          for (const newForm of forms) {
            if (newForm.id !== get_store_value(formId))
              continue;
            const data3 = {
              form: newForm,
              formEl,
              cancel: () => cancelled2 = true
            };
            for (const event2 of formEvents.onUpdate) {
              await event2(data3);
            }
            if (!cancelled2 && options.customValidity) {
              setCustomValidityForm(formEl, data3.form.errors);
            }
          }
        }
        if (!cancelled2) {
          if (result.type !== "error") {
            if (result.type === "success" && options.invalidateAll) {
              await invalidateAll();
            }
            if (options.applyAction) {
              await applyAction();
            } else {
              await Form_updateFromActionResult(result);
            }
          } else {
            if (options.applyAction) {
              if (options.onError == "apply") {
                await applyAction();
              } else {
                ({
                  type: "failure",
                  status: Math.floor(result.status || 500),
                  data: result
                });
                await applyAction();
              }
            }
            if (options.onError !== "apply") {
              const data3 = { result, message };
              for (const onErrorEvent of formEvents.onError) {
                if (onErrorEvent !== "apply" && (onErrorEvent != defaultOnError || !options.flashMessage?.onError)) {
                  await onErrorEvent(data3);
                }
              }
            }
          }
          if (options.flashMessage) {
            if (result.type == "error" && options.flashMessage.onError) {
              await options.flashMessage.onError({
                result,
                message: options.flashMessage.module.getFlash(page)
              });
            }
          }
        }
      }
      if (cancelled2 && options.flashMessage) {
        cancelFlash(options);
      }
      if (cancelled2 || result.type != "redirect") {
        htmlForm.completed(cancelled2);
      } else if (result.type == "redirect") {
        if (new URL(result.location, /^https?:\/\//.test(result.location) ? void 0 : document.location.origin).pathname == document.location.pathname) {
          setTimeout(() => {
            htmlForm.completed(true, true);
          }, 0);
        } else {
          const unsub = navigating.subscribe(($nav) => {
            if ($nav)
              return;
            unsub();
            htmlForm.completed(cancelled2);
          });
        }
      }
    }
    return validationResponse;
  });
}
const defaultOnError = (event) => {
  console.warn("Unhandled Superform error, use onError event to handle it:", event.result.error);
};
const defaultFormOptions = {
  applyAction: true,
  invalidateAll: true,
  resetForm: false,
  autoFocusOnError: "detect",
  scrollToError: "smooth",
  errorSelector: '[aria-invalid="true"],[data-invalid]',
  selectErrorText: false,
  stickyNavbar: void 0,
  taintedMessage: "Do you want to leave this page? Changes you made may not be saved.",
  onSubmit: void 0,
  onResult: void 0,
  onUpdate: void 0,
  onUpdated: void 0,
  onError: defaultOnError,
  dataType: "form",
  validators: void 0,
  defaultValidator: "keep",
  customValidity: false,
  clearOnSubmit: "errors-and-message",
  delayMs: 500,
  timeoutMs: 8e3,
  multipleSubmits: "prevent",
  validation: void 0,
  SPA: void 0,
  validateMethod: "auto"
};
const formIds = /* @__PURE__ */ new WeakMap();
const initializedForms = /* @__PURE__ */ new WeakMap();
function multipleFormIdError(id) {
  return `Duplicate form id's found: "${id}". Multiple forms will receive the same data. Use the id option to differentiate between them, or if this is intended, set the warnings.duplicateId option to false in superForm to disable this warning. More information: https://superforms.rocks/concepts/multiple-forms`;
}
function superForm(form, options = {}) {
  {
    options = {
      ...defaultFormOptions,
      ...options
    };
    if (options.SPA && options.validators === void 0) {
      console.warn("No validators set for superForm in SPA mode. Add them to the validators option, or set it to false to disable this warning.");
    }
  }
  let _formId = options.id;
  if (!form || Context_isValidationObject(form) === false) {
    if (options.warnings?.noValidationAndConstraints !== false) {
      console.warn((form ? "Form data sent directly to superForm instead of through superValidate. No initial data validation is made. " : "No form data sent to superForm, schema type safety cannot be guaranteed. ") + "Also, no constraints will exist for the form. Set the warnings.noValidationAndConstraints option to false to disable this warning.");
    }
    form = {
      valid: false,
      posted: false,
      errors: {},
      data: form ?? {},
      constraints: {}
    };
  } else {
    if (_formId === void 0)
      _formId = form.id;
  }
  const _initialFormId = _formId;
  const _currentPage = get_store_value(page);
  if (options.warnings?.duplicateId !== false) {
    if (!formIds.has(_currentPage)) {
      formIds.set(_currentPage, /* @__PURE__ */ new Set([_initialFormId]));
    } else {
      const currentForms = formIds.get(_currentPage);
      if (currentForms?.has(_initialFormId)) {
        console.warn(multipleFormIdError(_initialFormId));
      } else {
        currentForms?.add(_initialFormId);
      }
    }
  }
  if (!initializedForms.has(form)) {
    initializedForms.set(form, clone$1(form));
  }
  const initialForm = initializedForms.get(form);
  if (typeof initialForm.valid !== "boolean") {
    throw new SuperFormError("A non-validation object was passed to superForm. It should be an object of type SuperValidated, usually returned from superValidate.");
  }
  const postedData = _currentPage.form;
  if (postedData && typeof postedData === "object") {
    for (const postedForm of Context_findValidationForms(postedData).reverse()) {
      if (postedForm.id === _formId && !initializedForms.has(postedForm)) {
        initializedForms.set(postedData, postedData);
        const pageDataForm = form;
        form = postedForm;
        if (form.valid && options.resetForm && (options.resetForm === true || options.resetForm())) {
          form = clone$1(pageDataForm);
          form.message = clone$1(postedForm.message);
        }
        break;
      }
    }
  } else {
    form = clone$1(initialForm);
  }
  const form2 = form;
  const _errors = writable(form2.errors);
  const FormId = writable(_formId);
  const Context = {
    taintedMessage: options.taintedMessage,
    taintedFormState: clone$1(initialForm.data)
  };
  function Context_randomId(length = 8) {
    return Math.random().toString(36).substring(2, length + 2);
  }
  function Context_setTaintedFormState(data) {
    Context.taintedFormState = clone$1(data);
  }
  function Context_findValidationForms(data) {
    const forms = Object.values(data).filter((v) => Context_isValidationObject(v) !== false);
    return forms;
  }
  function Context_isValidationObject(object) {
    if (!object || typeof object !== "object")
      return false;
    if (!("valid" in object && "errors" in object && typeof object.valid === "boolean")) {
      return false;
    }
    return "id" in object && typeof object.id === "string" ? object.id : void 0;
  }
  function Context_useEnhanceEnabled() {
    options.taintedMessage = Context.taintedMessage;
    if (_formId === void 0)
      FormId.set(Context_randomId());
  }
  function Context_newFormStore(data) {
    const _formData = writable(data);
    return {
      subscribe: _formData.subscribe,
      set: (value, options2 = {}) => {
        Tainted_update(value, Context.taintedFormState, options2.taint ?? true);
        Context_setTaintedFormState(value);
        return _formData.set(clone$1(value));
      },
      update: (updater, options2 = {}) => {
        return _formData.update((value) => {
          const output = updater(value);
          Tainted_update(output, Context.taintedFormState, options2.taint ?? true);
          Context_setTaintedFormState(output);
          return output;
        });
      }
    };
  }
  const Unsubscriptions = [
    FormId.subscribe((id) => _formId = id)
  ];
  function Unsubscriptions_unsubscribe() {
    Unsubscriptions.forEach((unsub) => unsub());
  }
  const Form2 = Context_newFormStore(form2.data);
  function Form_checkForNestedData(key, value) {
    if (!value || typeof value !== "object")
      return;
    if (Array.isArray(value)) {
      if (value.length > 0)
        Form_checkForNestedData(key, value[0]);
    } else if (!(value instanceof Date)) {
      throw new SuperFormError(`Object found in form field "${key}". Set the dataType option to "json" and add use:enhance to use nested data structures. More information: https://superforms.rocks/concepts/nested-data`);
    }
  }
  async function Form_updateFromValidation(form3, untaint) {
    if (form3.valid && untaint && options.resetForm && (options.resetForm === true || options.resetForm())) {
      Form_reset(form3.message);
    } else {
      rebind(form3, untaint);
    }
    if (formEvents.onUpdated.length) {
      await tick();
    }
    for (const event of formEvents.onUpdated) {
      event({ form: form3 });
    }
  }
  function Form_reset(message, data, id) {
    const resetData = clone$1(initialForm);
    resetData.data = { ...resetData.data, ...data };
    if (id !== void 0)
      resetData.id = id;
    rebind(resetData, true, message);
  }
  const Form_updateFromActionResult = async (result, untaint) => {
    if (result.type == "error") {
      throw new SuperFormError(`ActionResult of type "${result.type}" cannot be passed to update function.`);
    }
    if (result.type == "redirect") {
      if (options.resetForm && (options.resetForm === true || options.resetForm())) {
        Form_reset();
      }
      return;
    }
    if (typeof result.data !== "object") {
      throw new SuperFormError("Non-object validation data returned from ActionResult.");
    }
    const forms = Context_findValidationForms(result.data);
    if (!forms.length) {
      throw new SuperFormError("No form data returned from ActionResult. Make sure you return { form } in the form actions.");
    }
    for (const newForm of forms) {
      if (newForm.id !== _formId)
        continue;
      await Form_updateFromValidation(newForm, untaint ?? (result.status >= 200 && result.status < 300));
    }
  };
  const LastChanges = writable([]);
  const Message = writable(form2.message);
  const Constraints = writable(form2.constraints);
  const Posted = writable(false);
  const Errors = {
    subscribe: _errors.subscribe,
    set: _errors.set,
    update: _errors.update,
    /**
     * To work with client-side validation, errors cannot be deleted but must
     * be set to undefined, to know where they existed before (tainted+error check in oninput)
     */
    clear: () => clearErrors(_errors, {
      undefinePath: null,
      clearFormLevelErrors: true
    })
  };
  const Tainted = writable();
  async function Tainted__validate(path, taint) {
    let shouldValidate = options.validationMethod === "oninput";
    if (!shouldValidate) {
      const errorContent = get_store_value(Errors);
      const errorNode = errorContent ? pathExists(errorContent, path, {
        modifier: (pathData) => {
          if (isInvalidPath(path, pathData)) {
            throw new SuperFormError("Errors can only be added to form fields, not to arrays or objects in the schema. Path: " + pathData.path.slice(0, -1));
          }
          return pathData.value;
        }
      }) : void 0;
      const hasError = errorNode && errorNode.key in errorNode.parent;
      shouldValidate = !!hasError;
    }
    if (shouldValidate) {
      await validateField(path, options, Form2, Errors, Tainted, { taint });
      return true;
    } else {
      return false;
    }
  }
  async function Tainted_update(newObj, compareAgainst, taintOptions) {
    if (taintOptions == "ignore")
      return;
    let paths = comparePaths(newObj, compareAgainst);
    if (typeof taintOptions === "object") {
      if (typeof taintOptions.fields === "string")
        taintOptions.fields = [taintOptions.fields];
      paths = taintOptions.fields.map((path) => splitPath(path));
      taintOptions = true;
    }
    LastChanges.set(paths);
    if (paths.length) {
      if (taintOptions === "untaint-all") {
        Tainted.set(void 0);
      } else {
        Tainted.update((tainted) => {
          if (taintOptions !== true && tainted) {
            const _tainted = tainted;
            paths = paths.filter((path) => pathExists(_tainted, path));
            if (paths.length) {
              if (!tainted)
                tainted = {};
              setPaths(tainted, paths, void 0);
            }
          } else if (taintOptions === true) {
            if (!tainted)
              tainted = {};
            setPaths(tainted, paths, true);
          }
          return tainted;
        });
      }
      if (!(options.validationMethod == "onblur" || options.validationMethod == "submit-only")) {
        let updated = false;
        for (const path of paths) {
          updated = updated || await Tainted__validate(path, taintOptions);
        }
        if (!updated) {
          await validateObjectErrors(options, Form2, Errors, get_store_value(Tainted));
        }
      }
    }
  }
  function Tainted_set(tainted, newData) {
    Tainted.set(tainted);
    Context_setTaintedFormState(newData);
  }
  const Submitting = writable(false);
  const Delayed = writable(false);
  const Timeout = writable(false);
  const AllErrors = derived(Errors, ($errors) => {
    if (!$errors)
      return [];
    return flattenErrors($errors);
  });
  options.taintedMessage = void 0;
  onDestroy(() => {
    Unsubscriptions_unsubscribe();
    for (const events of Object.values(formEvents)) {
      events.length = 0;
    }
    formIds.get(_currentPage)?.delete(_initialFormId);
  });
  if (options.dataType !== "json") {
    for (const [key, value] of Object.entries(form2.data)) {
      Form_checkForNestedData(key, value);
    }
  }
  function rebind(form3, untaint, message) {
    if (untaint) {
      Tainted_set(typeof untaint === "boolean" ? void 0 : untaint, form3.data);
    }
    message = message ?? form3.message;
    Form2.set(form3.data, { taint: "ignore" });
    Message.set(message);
    Errors.set(form3.errors);
    FormId.set(form3.id);
    Posted.set(form3.posted);
    if (options.flashMessage && shouldSyncFlash(options)) {
      const flash = options.flashMessage.module.getFlash(page);
      if (message && get_store_value(flash) === void 0) {
        flash.set(message);
      }
    }
  }
  const formEvents = {
    onSubmit: options.onSubmit ? [options.onSubmit] : [],
    onResult: options.onResult ? [options.onResult] : [],
    onUpdate: options.onUpdate ? [options.onUpdate] : [],
    onUpdated: options.onUpdated ? [options.onUpdated] : [],
    onError: options.onError ? [options.onError] : []
  };
  const Fields = Object.fromEntries(Object.keys(initialForm.data).map((key) => {
    return [
      key,
      {
        name: key,
        value: fieldProxy(Form2, key),
        errors: fieldProxy(Errors, key),
        constraints: fieldProxy(Constraints, key)
      }
    ];
  }));
  async function validate(path, opts) {
    if (path === void 0) {
      return clientValidation(options.validators, get_store_value(Form2), _formId, get_store_value(Constraints), false);
    }
    const result = await validateField(splitPath(path), options, Form2, Errors, Tainted, opts);
    return result.errors;
  }
  return {
    form: Form2,
    formId: FormId,
    errors: Errors,
    message: Message,
    constraints: Constraints,
    fields: Fields,
    tainted: Tainted,
    submitting: derived(Submitting, ($s) => $s),
    delayed: derived(Delayed, ($d) => $d),
    timeout: derived(Timeout, ($t) => $t),
    options,
    capture: function() {
      return {
        valid: initialForm.valid,
        posted: get_store_value(Posted),
        errors: get_store_value(Errors),
        data: get_store_value(Form2),
        constraints: get_store_value(Constraints),
        message: get_store_value(Message),
        id: _formId,
        tainted: get_store_value(Tainted)
      };
    },
    restore: function(snapshot) {
      return rebind(snapshot, snapshot.tainted ?? true);
    },
    validate,
    enhance: (el, events) => {
      if (events) {
        if (events.onError) {
          if (options.onError === "apply") {
            throw new SuperFormError('options.onError is set to "apply", cannot add any onError events.');
          } else if (events.onError === "apply") {
            throw new SuperFormError('Cannot add "apply" as onError event in use:enhance.');
          }
          formEvents.onError.push(events.onError);
        }
        if (events.onResult)
          formEvents.onResult.push(events.onResult);
        if (events.onSubmit)
          formEvents.onSubmit.push(events.onSubmit);
        if (events.onUpdate)
          formEvents.onUpdate.push(events.onUpdate);
        if (events.onUpdated)
          formEvents.onUpdated.push(events.onUpdated);
      }
      return formEnhance(el, Submitting, Delayed, Timeout, Errors, Form_updateFromActionResult, options, Form2, Message, Context_useEnhanceEnabled, formEvents, FormId, Constraints, Tainted, LastChanges, Context_findValidationForms, Posted);
    },
    allErrors: AllErrors,
    posted: Posted,
    reset: (options2) => Form_reset(options2?.keepMessage ? get_store_value(Message) : void 0, options2?.data, options2?.id)
  };
}

export { EnvelopeSolid as E, superForm as s };
//# sourceMappingURL=index3-bd5d745e.js.map
