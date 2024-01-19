import './index-d41d8d8d.js';
import { U as UNDEFINED, N as NAN, P as POSITIVE_INFINITY, a as NEGATIVE_INFINITY, b as NEGATIVE_ZERO, H as HOLE } from './constants-34d965bd.js';

function parse(serialized, revivers) {
  return unflatten(JSON.parse(serialized), revivers);
}
function unflatten(parsed, revivers) {
  if (typeof parsed === "number")
    return hydrate(parsed, true);
  if (!Array.isArray(parsed) || parsed.length === 0) {
    throw new Error("Invalid input");
  }
  const values = (
    /** @type {any[]} */
    parsed
  );
  const hydrated = Array(values.length);
  function hydrate(index, standalone = false) {
    if (index === UNDEFINED)
      return void 0;
    if (index === NAN)
      return NaN;
    if (index === POSITIVE_INFINITY)
      return Infinity;
    if (index === NEGATIVE_INFINITY)
      return -Infinity;
    if (index === NEGATIVE_ZERO)
      return -0;
    if (standalone)
      throw new Error(`Invalid input`);
    if (index in hydrated)
      return hydrated[index];
    const value = values[index];
    if (!value || typeof value !== "object") {
      hydrated[index] = value;
    } else if (Array.isArray(value)) {
      if (typeof value[0] === "string") {
        const type = value[0];
        const reviver = revivers?.[type];
        if (reviver) {
          return hydrated[index] = reviver(hydrate(value[1]));
        }
        switch (type) {
          case "Date":
            hydrated[index] = new Date(value[1]);
            break;
          case "Set":
            const set = /* @__PURE__ */ new Set();
            hydrated[index] = set;
            for (let i = 1; i < value.length; i += 1) {
              set.add(hydrate(value[i]));
            }
            break;
          case "Map":
            const map = /* @__PURE__ */ new Map();
            hydrated[index] = map;
            for (let i = 1; i < value.length; i += 2) {
              map.set(hydrate(value[i]), hydrate(value[i + 1]));
            }
            break;
          case "RegExp":
            hydrated[index] = new RegExp(value[1], value[2]);
            break;
          case "Object":
            hydrated[index] = Object(value[1]);
            break;
          case "BigInt":
            hydrated[index] = BigInt(value[1]);
            break;
          case "null":
            const obj = /* @__PURE__ */ Object.create(null);
            hydrated[index] = obj;
            for (let i = 1; i < value.length; i += 2) {
              obj[value[i]] = hydrate(value[i + 1]);
            }
            break;
          default:
            throw new Error(`Unknown type ${type}`);
        }
      } else {
        const array = new Array(value.length);
        hydrated[index] = array;
        for (let i = 0; i < value.length; i += 1) {
          const n = value[i];
          if (n === HOLE)
            continue;
          array[i] = hydrate(n);
        }
      }
    } else {
      const object = {};
      hydrated[index] = object;
      for (const key in value) {
        const n = value[key];
        object[key] = hydrate(n);
      }
    }
    return hydrated[index];
  }
  return hydrate(0);
}
function splitPath(path) {
  return path.toString().split(/[[\].]+/).filter((p) => p);
}
function mergePath(path) {
  return path.reduce((acc, next) => {
    const key = String(next);
    if (typeof next === "number" || /^\d+$/.test(key))
      acc += `[${key}]`;
    else if (!acc)
      acc += key;
    else
      acc += `.${key}`;
    return acc;
  }, "");
}
class SuperFormError extends Error {
  constructor(message) {
    super(message);
    Object.setPrototypeOf(this, SuperFormError.prototype);
  }
}
function setPath(parent, key, value) {
  parent[key] = value;
  return "skip";
}
function isInvalidPath(originalPath, pathData) {
  return pathData.value !== void 0 && typeof pathData.value !== "object" && pathData.path.length < originalPath.length;
}
function pathExists(obj, path, options = {}) {
  if (!options.modifier) {
    options.modifier = (pathData) => isInvalidPath(path, pathData) ? void 0 : pathData.value;
  }
  const exists = traversePath(obj, path, options.modifier);
  if (!exists)
    return void 0;
  if (options.value === void 0)
    return exists;
  return options.value(exists.value) ? exists : void 0;
}
function traversePath(obj, realPath, modifier) {
  if (!realPath.length)
    return void 0;
  const path = [realPath[0]];
  let parent = obj;
  while (path.length < realPath.length) {
    const key2 = path[path.length - 1];
    const value = modifier ? modifier({
      parent,
      key: String(key2),
      value: parent[key2],
      path: path.map((p) => String(p)),
      isLeaf: false,
      set: (v) => setPath(parent, key2, v)
    }) : parent[key2];
    if (value === void 0)
      return void 0;
    else
      parent = value;
    path.push(realPath[path.length]);
  }
  const key = realPath[realPath.length - 1];
  return {
    parent,
    key: String(key),
    value: parent[key],
    path: realPath.map((p) => String(p)),
    isLeaf: true,
    set: (v) => setPath(parent, key, v)
  };
}
function traversePaths(parent, modifier, path = []) {
  for (const key in parent) {
    const value = parent[key];
    const isLeaf = value === null || typeof value !== "object";
    const pathData = {
      parent,
      key,
      value,
      path: path.map(String).concat([key]),
      isLeaf,
      set: (v) => setPath(parent, key, v)
    };
    const status = modifier(pathData);
    if (status === "abort")
      return status;
    else if (status === "skip")
      continue;
    else if (!isLeaf) {
      const status2 = traversePaths(value, modifier, pathData.path);
      if (status2 === "abort")
        return status2;
    }
  }
}
async function traversePathsAsync(parent, modifier, path = []) {
  for (const key in parent) {
    const value = parent[key];
    const isLeaf = value === null || typeof value !== "object";
    const pathData = {
      parent,
      key,
      value,
      path: path.map(String).concat([key]),
      isLeaf,
      set: (v) => setPath(parent, key, v)
    };
    const status = await modifier(pathData);
    if (status === "abort")
      return status;
    else if (status === "skip")
      break;
    else if (!isLeaf) {
      const status2 = traversePaths(value, modifier, pathData.path);
      if (status2 === "abort")
        return status2;
    }
  }
}
function eqSet(xs, ys) {
  return xs === ys || xs.size === ys.size && [...xs].every((x) => ys.has(x));
}
function comparePaths(newObj, oldObj) {
  const diffPaths = /* @__PURE__ */ new Map();
  function checkPath(data, compareTo) {
    const exists = traversePath(compareTo, data.path);
    function addDiff() {
      diffPaths.set(data.path.join(" "), data.path);
    }
    if (data.isLeaf) {
      if (!exists) {
        addDiff();
      } else if (data.value !== exists.value) {
        addDiff();
      }
    } else if (exists) {
      if (data.value instanceof Date && exists.value instanceof Date && data.value.getTime() != exists.value.getTime()) {
        addDiff();
      } else if (data.value instanceof Set && exists.value instanceof Set && !eqSet(data.value, exists.value)) {
        addDiff();
      }
    }
  }
  traversePaths(newObj, (data) => checkPath(data, oldObj));
  traversePaths(oldObj, (data) => checkPath(data, newObj));
  return Array.from(diffPaths.values());
}
function setPaths(obj, paths, value) {
  for (const path of paths) {
    const leaf = traversePath(obj, path, ({ parent, key, value: value2 }) => {
      if (value2 === void 0 || typeof value2 !== "object") {
        parent[key] = {};
      }
      return parent[key];
    });
    if (leaf)
      leaf.parent[leaf.key] = value;
  }
}
function klona(x) {
  if (typeof x !== "object")
    return x;
  var k, tmp, str = Object.prototype.toString.call(x);
  if (str === "[object Object]") {
    if (x.constructor !== Object && typeof x.constructor === "function") {
      tmp = new x.constructor();
      for (k in x) {
        if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
          tmp[k] = klona(x[k]);
        }
      }
    } else {
      tmp = {};
      for (k in x) {
        if (k === "__proto__") {
          Object.defineProperty(tmp, k, {
            value: klona(x[k]),
            configurable: true,
            enumerable: true,
            writable: true
          });
        } else {
          tmp[k] = klona(x[k]);
        }
      }
    }
    return tmp;
  }
  if (str === "[object Array]") {
    k = x.length;
    for (tmp = Array(k); k--; ) {
      tmp[k] = klona(x[k]);
    }
    return tmp;
  }
  if (str === "[object Set]") {
    tmp = /* @__PURE__ */ new Set();
    x.forEach(function(val) {
      tmp.add(klona(val));
    });
    return tmp;
  }
  if (str === "[object Map]") {
    tmp = /* @__PURE__ */ new Map();
    x.forEach(function(val, key) {
      tmp.set(klona(key), klona(val));
    });
    return tmp;
  }
  if (str === "[object Date]") {
    return /* @__PURE__ */ new Date(+x);
  }
  if (str === "[object RegExp]") {
    tmp = new RegExp(x.source, x.flags);
    tmp.lastIndex = x.lastIndex;
    return tmp;
  }
  if (str === "[object DataView]") {
    return new x.constructor(klona(x.buffer));
  }
  if (str === "[object ArrayBuffer]") {
    return x.slice(0);
  }
  if (str.slice(-6) === "Array]") {
    return new x.constructor(x);
  }
  return x;
}
function clone(data) {
  return klona(data);
}
function unwrapZodType(zodType) {
  const originalType = zodType;
  let _wrapped = true;
  let isNullable = false;
  let isOptional = false;
  let hasDefault = false;
  let effects = void 0;
  let defaultValue = void 0;
  while (_wrapped) {
    switch (zodType._def.typeName) {
      case "ZodNullable":
        isNullable = true;
        zodType = zodType.unwrap();
        break;
      case "ZodDefault":
        hasDefault = true;
        defaultValue = zodType._def.defaultValue();
        zodType = zodType._def.innerType;
        break;
      case "ZodOptional":
        isOptional = true;
        zodType = zodType.unwrap();
        break;
      case "ZodEffects":
        if (!effects)
          effects = zodType;
        zodType = zodType._def.schema;
        break;
      case "ZodPipeline":
        zodType = zodType._def.out;
        break;
      case "ZodBranded":
        zodType = zodType.unwrap();
        break;
      default:
        _wrapped = false;
    }
  }
  return {
    zodType,
    originalType,
    isNullable,
    isOptional,
    hasDefault,
    defaultValue,
    effects
  };
}
function hashCode(str) {
  let hash = 0;
  for (let i = 0, len = str.length; i < len; i++) {
    const chr = str.charCodeAt(i);
    hash = (hash << 5) - hash + chr;
    hash |= 0;
  }
  if (hash < 0)
    hash = hash >>> 0;
  return hash.toString(36);
}
function entityHash(schema) {
  return hashCode(_entityHash(schema));
}
function _entityHash(type) {
  let hash = "";
  const unwrapped = unwrapZodType(type);
  switch (unwrapped.zodType._def.typeName) {
    case "ZodObject": {
      for (const [field, zodType] of Object.entries(unwrapped.zodType.shape)) {
        hash += "ZodObject:" + field + ":" + _entityHash(zodType);
      }
      break;
    }
    case "ZodArray": {
      const inner = unwrapped.zodType;
      hash += "ZodArray:" + _entityHash(inner.element);
      break;
    }
    default:
      hash += unwrapped.zodType._def.typeName;
  }
  return hash;
}
function entityData(schema, warnings) {
  const cached = getCached(schema);
  if (cached)
    return cached;
  const entity = {
    typeInfo: schemaInfo(schema),
    defaultEntity: defaultValues(schema),
    constraints: constraints(schema, warnings),
    keys: Object.keys(schema.keyof().Values),
    hash: entityHash(schema),
    errorShape: errorShape(schema)
  };
  setCached(schema, entity);
  return entity;
}
function setCached(schema, entity) {
  entityCache.set(schema, entity);
}
function getCached(schema) {
  return entityCache.get(schema);
}
const entityCache = /* @__PURE__ */ new WeakMap();
function schemaInfo(schema) {
  return _mapSchema(schema, (obj) => unwrapZodType(obj));
}
function valueOrDefault(value, schemaInfo2) {
  if (value)
    return value;
  const { zodType, isNullable, isOptional, hasDefault, defaultValue } = schemaInfo2;
  if (hasDefault)
    return defaultValue;
  if (isNullable)
    return null;
  if (isOptional)
    return void 0;
  if (zodType._def.typeName == "ZodString")
    return "";
  if (zodType._def.typeName == "ZodNumber")
    return 0;
  if (zodType._def.typeName == "ZodBoolean")
    return false;
  if (zodType._def.typeName == "ZodArray")
    return [];
  if (zodType._def.typeName == "ZodObject") {
    return defaultValues(zodType);
  }
  if (zodType._def.typeName == "ZodSet")
    return /* @__PURE__ */ new Set();
  if (zodType._def.typeName == "ZodRecord")
    return {};
  if (zodType._def.typeName == "ZodBigInt")
    return BigInt(0);
  if (zodType._def.typeName == "ZodSymbol")
    return Symbol();
  return void 0;
}
function defaultValues(schema) {
  while (schema._def.typeName == "ZodEffects") {
    schema = schema._def.schema;
  }
  if (!(schema._def.typeName == "ZodObject")) {
    throw new SuperFormError("Only Zod schema objects can be used with defaultValues. Define the schema with z.object({ ... }) and optionally refine/superRefine/transform at the end.");
  }
  const realSchema = schema;
  const fields = Object.keys(realSchema.keyof().Values);
  const schemaTypeInfo = schemaInfo(realSchema);
  return Object.fromEntries(fields.map((field) => {
    const typeInfo = schemaTypeInfo[field];
    const newValue = valueOrDefault(void 0, typeInfo);
    return [field, newValue];
  }));
}
function constraints(schema, warnings) {
  function constraint(key, zodType, info) {
    const output = {};
    if (zodType._def.typeName == "ZodString") {
      const zodString = zodType;
      const patterns = zodString._def.checks.filter((f) => f.kind == "regex");
      if (patterns.length > 1 && warnings?.multipleRegexps !== false) {
        console.warn(`Field "${key}" has more than one regexp, only the first one will be used in constraints. Set the warnings.multipleRegexps option to false to disable this warning.`);
      }
      const pattern = patterns.length > 0 && patterns[0].kind == "regex" ? patterns[0].regex.source : void 0;
      if (pattern)
        output.pattern = pattern;
      if (zodString.minLength !== null)
        output.minlength = zodString.minLength;
      if (zodString.maxLength !== null)
        output.maxlength = zodString.maxLength;
    } else if (zodType._def.typeName == "ZodNumber") {
      const zodNumber = zodType;
      const steps = zodNumber._def.checks.filter((f) => f.kind == "multipleOf");
      if (steps.length > 1 && warnings?.multipleSteps !== false) {
        console.warn(`Field "${key}" has more than one step, only the first one will be used in constraints. Set the warnings.multipleSteps option to false to disable this warning.`);
      }
      const step = steps.length > 0 && steps[0].kind == "multipleOf" ? steps[0].value : null;
      if (zodNumber.minValue !== null)
        output.min = zodNumber.minValue;
      if (zodNumber.maxValue !== null)
        output.max = zodNumber.maxValue;
      if (step !== null)
        output.step = step;
    } else if (zodType._def.typeName == "ZodDate") {
      const zodDate = zodType;
      if (zodDate.minDate)
        output.min = zodDate.minDate.toISOString();
      if (zodDate.maxDate)
        output.max = zodDate.maxDate.toISOString();
    } else if (zodType._def.typeName == "ZodArray") {
      if (zodType._def.minLength)
        output.min = zodType._def.minLength.value;
      if (zodType._def.maxLength)
        output.max = zodType._def.maxLength.value;
      if (zodType._def.exactLength)
        output.min = output.max = zodType._def.exactLength.value;
    }
    if (!info.isNullable && !info.isOptional) {
      output.required = true;
    }
    return Object.keys(output).length > 0 ? output : void 0;
  }
  function mapField(key, value) {
    const info = unwrapZodType(value);
    value = info.zodType;
    if (value._def.typeName == "ZodArray") {
      return mapField(key, value._def.type);
    } else if (value._def.typeName == "ZodObject") {
      return constraints(value, warnings);
    } else {
      return constraint(key, value, info);
    }
  }
  return _mapSchema(schema, (obj, key) => {
    return mapField(key, obj);
  }, (data) => !!data);
}
function _mapSchema(schema, factory, filter) {
  const keys = schema.keyof().Values;
  return Object.fromEntries(Object.keys(keys).map((key) => [key, factory(schema.shape[key], key)]).filter((entry) => filter ? filter(entry[1]) : true));
}
const _cachedErrorShapes = /* @__PURE__ */ new WeakMap();
function errorShape(schema) {
  if (!_cachedErrorShapes.has(schema)) {
    _cachedErrorShapes.set(schema, _errorShape(schema));
  }
  return _cachedErrorShapes.get(schema);
}
function _errorShape(type) {
  const unwrapped = unwrapZodType(type).zodType;
  if (unwrapped._def.typeName == "ZodObject") {
    return Object.fromEntries(Object.entries(unwrapped.shape).map(([key, value]) => {
      return [key, _errorShape(value)];
    }).filter((entry) => entry[1] !== void 0));
  } else if (unwrapped._def.typeName == "ZodArray") {
    return _errorShape(unwrapped._def.type) ?? {};
  } else if (unwrapped._def.typeName == "ZodRecord") {
    return _errorShape(unwrapped._def.valueType) ?? {};
  } else if (unwrapped._def.typeName == "ZodUnion") {
    const options = unwrapped._def.options;
    return options.reduce((shape, next) => {
      const nextShape = _errorShape(next);
      if (nextShape)
        shape = { ...shape ?? {}, ...nextShape };
      return shape;
    }, void 0);
  }
  return void 0;
}
function mapErrors(obj, errorShape2, inObject = true) {
  const output = {};
  const entries = Object.entries(obj);
  if ("_errors" in obj && obj._errors.length) {
    if (!errorShape2 || !inObject) {
      return obj._errors;
    } else {
      output._errors = obj._errors;
    }
  }
  for (const [key, value] of entries.filter(([key2]) => key2 !== "_errors")) {
    const numericKey = /^\d+$/.test(key);
    output[key] = mapErrors(
      value,
      errorShape2 ? numericKey ? errorShape2 : errorShape2[key] : void 0,
      !!errorShape2?.[key]
      // We're not in an object if there is no key in the ErrorShape
    );
  }
  return output;
}
function flattenErrors(errors) {
  return _flattenErrors(errors, []);
}
function _flattenErrors(errors, path) {
  const entries = Object.entries(errors);
  return entries.filter(([, value]) => value !== void 0).flatMap(([key, messages]) => {
    if (Array.isArray(messages) && messages.length > 0) {
      const currPath = path.concat([key]);
      return { path: mergePath(currPath), messages };
    } else {
      return _flattenErrors(errors[key], path.concat([key]));
    }
  });
}
function clearErrors(Errors, options) {
  Errors.update(($errors) => {
    traversePaths($errors, (pathData) => {
      if (pathData.path.length == 1 && pathData.path[0] == "_errors" && !options.clearFormLevelErrors) {
        return;
      }
      if (Array.isArray(pathData.value)) {
        return pathData.set(void 0);
      }
    });
    if (options.undefinePath)
      setPaths($errors, [options.undefinePath], void 0);
    return $errors;
  });
}

function formDataToValidation(data, schemaData, preprocessed) {
  const strictData = {};
  const parsedData = {};
  const { schemaKeys, entityInfo } = schemaData;
  for (const key of schemaKeys) {
    const typeInfo = entityInfo.typeInfo[key];
    const entries = data.getAll(key);
    if (!(typeInfo.zodType._def.typeName == "ZodArray")) {
      parsedData[key] = parseSingleEntry(key, entries[0], typeInfo);
    } else {
      const arrayType = unwrapZodType(typeInfo.zodType._def.type);
      parsedData[key] = entries.map((e) => parseSingleEntry(key, e, arrayType));
    }
    if (!entries.length && !typeInfo.isOptional) {
      strictData[key] = void 0;
    } else {
      strictData[key] = parsedData[key];
    }
  }
  for (const key of Object.keys(strictData)) {
    if (strictData[key] === void 0)
      delete strictData[key];
  }
  return { parsed: parsedData, partial: strictData };
  function parseSingleEntry(key, entry, typeInfo) {
    if (preprocessed && preprocessed.includes(key)) {
      return entry;
    }
    if (entry && typeof entry !== "string") {
      return void 0;
    }
    return parseFormDataEntry(key, entry, typeInfo);
  }
  function parseFormDataEntry(field, value, typeInfo) {
    const newValue = valueOrDefault(value, typeInfo);
    const zodType = typeInfo.zodType;
    const typeName = zodType._def.typeName;
    if (!value && typeName != "ZodBoolean") {
      return newValue;
    }
    if (typeName == "ZodString") {
      return value;
    } else if (typeName == "ZodNumber") {
      return zodType.isInt ? parseInt(value ?? "", 10) : parseFloat(value ?? "");
    } else if (typeName == "ZodBoolean") {
      return Boolean(value == "false" ? "" : value).valueOf();
    } else if (typeName == "ZodDate") {
      return new Date(value ?? "");
    } else if (typeName == "ZodArray") {
      const arrayType = unwrapZodType(zodType._def.type);
      return parseFormDataEntry(field, value, arrayType);
    } else if (typeName == "ZodBigInt") {
      try {
        return BigInt(value ?? ".");
      } catch {
        return NaN;
      }
    } else if (typeName == "ZodLiteral") {
      const literalType = typeof zodType.value;
      if (literalType === "string")
        return value;
      else if (literalType === "number")
        return parseFloat(value ?? "");
      else if (literalType === "boolean")
        return Boolean(value).valueOf();
      else {
        throw new SuperFormError("Unsupported ZodLiteral type: " + literalType);
      }
    } else if (typeName == "ZodUnion" || typeName == "ZodEnum" || typeName == "ZodAny") {
      return value;
    } else if (typeName == "ZodNativeEnum") {
      const zodEnum = zodType;
      if (value !== null && value in zodEnum.enum) {
        const enumValue = zodEnum.enum[value];
        if (typeof enumValue === "number")
          return enumValue;
        else if (enumValue in zodEnum.enum)
          return zodEnum.enum[enumValue];
      } else if (value !== null && Object.values(zodEnum.enum).includes(value)) {
        return value;
      }
      return void 0;
    } else if (typeName == "ZodSymbol") {
      return Symbol(String(value));
    }
    if (typeName == "ZodObject") {
      throw new SuperFormError(`Object found in form field "${field}". Set the dataType option to "json" and add use:enhance on the client to use nested data structures. More information: https://superforms.rocks/concepts/nested-data`);
    }
    throw new SuperFormError("Unsupported Zod default type: " + zodType.constructor.name);
  }
}
function dataToValidate(parsed, schemaData) {
  const strict = schemaData.opts?.strict ?? false;
  if (!parsed.data) {
    return schemaData.hasEffects || schemaData.opts.errors === true ? schemaData.entityInfo.defaultEntity : void 0;
  } else if (strict && parsed.partialData) {
    return parsed.partialData;
  } else
    return parsed.data;
}
function parseFormData(formData, schemaData, preprocessed) {
  function tryParseSuperJson() {
    if (formData.has("__superform_json")) {
      try {
        const output = parse(formData.getAll("__superform_json").join("") ?? "");
        if (typeof output === "object") {
          return output;
        }
      } catch {
      }
    }
    return null;
  }
  const data = tryParseSuperJson();
  const id = formData.get("__superform_id")?.toString() ?? void 0;
  if (data) {
    return { id, data, posted: true, partialData: null };
  }
  const parsed = formDataToValidation(formData, schemaData, preprocessed);
  return {
    id,
    data: parsed.parsed,
    partialData: parsed.partial,
    posted: true
  };
}
function parseSearchParams(data, schemaData, preprocessed) {
  if (data instanceof URL)
    data = data.searchParams;
  const convert = new FormData();
  for (const [key, value] of data.entries()) {
    convert.append(key, value);
  }
  const output = parseFormData(convert, schemaData, preprocessed);
  output.posted = false;
  return output;
}
function validateResult(parsed, schemaData, result) {
  const { opts: options, entityInfo } = schemaData;
  const posted = parsed.posted;
  const id = parsed.data ? options.id ?? parsed.id ?? entityInfo.hash : options.id ?? entityInfo.hash;
  if (!parsed.data) {
    let data = void 0;
    let errors = {};
    const valid = result?.success ?? false;
    const addErrors = options.errors ?? options.strict;
    if (result) {
      if (result.success) {
        data = result.data;
      } else if (addErrors) {
        errors = mapErrors(result.error.format(), entityInfo.errorShape);
      }
    }
    return {
      id,
      valid,
      posted,
      errors,
      // Copy the default entity so it's not modified
      data: data ?? clone(entityInfo.defaultEntity),
      constraints: entityInfo.constraints
    };
  } else {
    const { opts: options2, schemaKeys, entityInfo: entityInfo2, unwrappedSchema } = schemaData;
    if (!result) {
      throw new SuperFormError("Validation data exists without validation result.");
    }
    if (!result.success) {
      const partialData = parsed.data;
      const errors = options2.errors !== false ? mapErrors(result.error.format(), entityInfo2.errorShape) : {};
      const zodKeyStatus = unwrappedSchema._def.unknownKeys;
      let data;
      if (options2.strict) {
        data = parsed.data;
      } else if (zodKeyStatus == "passthrough") {
        data = { ...clone(entityInfo2.defaultEntity), ...partialData };
      } else {
        data = Object.fromEntries(schemaKeys.map((key) => [
          key,
          key in partialData ? partialData[key] : clone(entityInfo2.defaultEntity[key])
        ]));
      }
      return {
        id,
        valid: false,
        posted,
        errors,
        data,
        constraints: entityInfo2.constraints
      };
    } else {
      return {
        id,
        valid: true,
        posted,
        errors: {},
        data: result.data,
        constraints: entityInfo2.constraints
      };
    }
  }
}
function getSchemaData(schema, options) {
  const originalSchema = schema;
  let unwrappedSchema = schema;
  let hasEffects = false;
  while (unwrappedSchema._def.typeName == "ZodEffects") {
    hasEffects = true;
    unwrappedSchema = unwrappedSchema._def.schema;
  }
  if (!(unwrappedSchema._def.typeName == "ZodObject")) {
    throw new SuperFormError("Only Zod schema objects can be used with superValidate. Define the schema with z.object({ ... }) and optionally refine/superRefine/transform at the end.");
  }
  const entityInfo = entityData(unwrappedSchema, options?.warnings);
  return {
    originalSchema,
    unwrappedSchema,
    hasEffects,
    entityInfo,
    schemaKeys: entityInfo.keys,
    opts: options ?? {}
  };
}
async function superValidate(data, schema, options) {
  if (data && typeof data === "object" && "safeParseAsync" in data) {
    options = schema;
    schema = data;
    data = null;
  }
  const schemaData = getSchemaData(schema, options);
  async function tryParseFormData(request) {
    let formData = void 0;
    try {
      formData = await request.formData();
    } catch (e) {
      if (e instanceof TypeError && e.message.includes("already been consumed")) {
        throw e;
      }
      return {
        id: void 0,
        data: void 0,
        posted: false,
        partialData: void 0
      };
    }
    return parseFormData(formData, schemaData, options?.preprocessed);
  }
  async function parseRequest() {
    let parsed2;
    if (data instanceof FormData) {
      parsed2 = parseFormData(data, schemaData, options?.preprocessed);
    } else if (data instanceof URL || data instanceof URLSearchParams) {
      parsed2 = parseSearchParams(data, schemaData, options?.preprocessed);
    } else if (data instanceof Request) {
      parsed2 = await tryParseFormData(data);
    } else if (data && typeof data === "object" && "request" in data && data.request instanceof Request) {
      parsed2 = await tryParseFormData(data.request);
    } else if (options?.strict) {
      const params = new URLSearchParams(data);
      parsed2 = parseSearchParams(params, schemaData, options?.preprocessed);
    } else {
      parsed2 = {
        id: void 0,
        posted: false,
        data,
        partialData: data
      };
    }
    const toValidate = dataToValidate(parsed2, schemaData);
    const result2 = toValidate ? await schemaData.originalSchema.safeParseAsync(toValidate) : void 0;
    return { parsed: parsed2, result: result2 };
  }
  const { parsed, result } = await parseRequest();
  const superValidated = validateResult(parsed, schemaData, result);
  return superValidated;
}

export { SuperFormError as S, clearErrors as a, splitPath as b, clone as c, comparePaths as d, setPaths as e, flattenErrors as f, errorShape as g, traversePathsAsync as h, traversePaths as i, isInvalidPath as j, mergePath as k, parse as l, mapErrors as m, pathExists as p, superValidate as s, traversePath as t };
//# sourceMappingURL=superValidate-395df3da.js.map
