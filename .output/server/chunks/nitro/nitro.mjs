import process from 'node:process';globalThis._importMeta_=globalThis._importMeta_||{url:"file:///_entry.js",env:process.env};import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remark2rehype from 'remark-rehype';
import remarkMDC, { parseFrontMatter } from 'remark-mdc';
import remarkGFM from 'remark-gfm';
import rehypeExternalLinks from 'rehype-external-links';
import rehypeSortAttributeValues from 'rehype-sort-attribute-values';
import rehypeSortAttributes from 'rehype-sort-attributes';
import rehypeRaw from 'rehype-raw';
import { detab } from 'detab';
import { normalizeUri } from 'micromark-util-sanitize-uri';
import { toString } from 'hast-util-to-string';
import Slugger from 'github-slugger';
import qiniu from 'qiniu';
import http, { Server as Server$1 } from 'node:http';
import https, { Server } from 'node:https';
import { promises, existsSync } from 'node:fs';
import { dirname as dirname$1, resolve as resolve$1, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return undefined;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
const ENC_SLASH_RE = /%2f/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode$1(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodePath(text) {
  return decode$1(text.replace(ENC_SLASH_RE, "%252F"));
}
function decodeQueryKey(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode$1(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === undefined) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== undefined).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const PROTOCOL_SCRIPT_RE = /^[\s\0]*(blob|data|javascript|vbscript):$/i;
const TRAILING_SLASH_RE = /\/$|\/\?|\/#/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function isRelative(inputString) {
  return ["./", "../"].some((string_) => inputString.startsWith(string_));
}
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function isScriptProtocol(protocol) {
  return !!protocol && PROTOCOL_SCRIPT_RE.test(protocol);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/");
  }
  return TRAILING_SLASH_RE.test(input);
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
  if (!hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
  }
  const [s0, ...s] = path.split("?");
  const cleanPath = s0.endsWith("/") ? s0.slice(0, -1) : s0;
  return (cleanPath || "/") + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  if (!respectQueryAndFragment) {
    return input.endsWith("/") ? input : input + "/";
  }
  if (hasTrailingSlash(input, true)) {
    return input || "/";
  }
  let path = input;
  let fragment = "";
  const fragmentIndex = input.indexOf("#");
  if (fragmentIndex >= 0) {
    path = input.slice(0, fragmentIndex);
    fragment = input.slice(fragmentIndex);
    if (!path) {
      return fragment;
    }
  }
  const [s0, ...s] = path.split("?");
  return s0 + "/" + (s.length > 0 ? `?${s.join("?")}` : "") + fragment;
}
function hasLeadingSlash(input = "") {
  return input.startsWith("/");
}
function withLeadingSlash(input = "") {
  return hasLeadingSlash(input) ? input : "/" + input;
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withoutBase(input, base) {
  if (isEmptyURL(base)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (!input.startsWith(_base)) {
    return input;
  }
  const trimmed = input.slice(_base.length);
  return trimmed[0] === "/" ? trimmed : "/" + trimmed;
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function getQuery$1(input) {
  return parseQuery(parseURL(input).search);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}
function joinRelativeURL(..._input) {
  const JOIN_SEGMENT_SPLIT_RE = /\/(?!\/)/;
  const input = _input.filter(Boolean);
  const segments = [];
  let segmentsDepth = 0;
  for (const i of input) {
    if (!i || i === "/") {
      continue;
    }
    for (const [sindex, s] of i.split(JOIN_SEGMENT_SPLIT_RE).entries()) {
      if (!s || s === ".") {
        continue;
      }
      if (s === "..") {
        if (segments.length === 1 && hasProtocol(segments[0])) {
          continue;
        }
        segments.pop();
        segmentsDepth--;
        continue;
      }
      if (sindex === 1 && segments[segments.length - 1]?.endsWith(":/")) {
        segments[segments.length - 1] += "/" + s;
        continue;
      }
      segments.push(s);
      segmentsDepth++;
    }
  }
  let url = segments.join("/");
  if (segmentsDepth >= 0) {
    if (input[0]?.startsWith("/") && !url.startsWith("/")) {
      url = "/" + url;
    } else if (input[0]?.startsWith("./") && !url.startsWith("./")) {
      url = "./" + url;
    }
  } else {
    url = "../".repeat(-1 * segmentsDepth) + url;
  }
  if (input[input.length - 1]?.endsWith("/") && !url.endsWith("/")) {
    url += "/";
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

function parse(str, options) {
  if (typeof str !== "string") {
    throw new TypeError("argument str must be a string");
  }
  const obj = {};
  const opt = options || {};
  const dec = opt.decode || decode;
  let index = 0;
  while (index < str.length) {
    const eqIdx = str.indexOf("=", index);
    if (eqIdx === -1) {
      break;
    }
    let endIdx = str.indexOf(";", index);
    if (endIdx === -1) {
      endIdx = str.length;
    } else if (endIdx < eqIdx) {
      index = str.lastIndexOf(";", eqIdx - 1) + 1;
      continue;
    }
    const key = str.slice(index, eqIdx).trim();
    if (opt?.filter && !opt?.filter(key)) {
      index = endIdx + 1;
      continue;
    }
    if (undefined === obj[key]) {
      let val = str.slice(eqIdx + 1, endIdx).trim();
      if (val.codePointAt(0) === 34) {
        val = val.slice(1, -1);
      }
      obj[key] = tryDecode(val, dec);
    }
    index = endIdx + 1;
  }
  return obj;
}
function decode(str) {
  return str.includes("%") ? decodeURIComponent(str) : str;
}
function tryDecode(str, decode2) {
  try {
    return decode2(str);
  } catch {
    return str;
  }
}

const fieldContentRegExp = /^[\u0009\u0020-\u007E\u0080-\u00FF]+$/;
function serialize(name, value, options) {
  const opt = options || {};
  const enc = opt.encode || encodeURIComponent;
  if (typeof enc !== "function") {
    throw new TypeError("option encode is invalid");
  }
  if (!fieldContentRegExp.test(name)) {
    throw new TypeError("argument name is invalid");
  }
  const encodedValue = enc(value);
  if (encodedValue && !fieldContentRegExp.test(encodedValue)) {
    throw new TypeError("argument val is invalid");
  }
  let str = name + "=" + encodedValue;
  if (undefined !== opt.maxAge && opt.maxAge !== null) {
    const maxAge = opt.maxAge - 0;
    if (Number.isNaN(maxAge) || !Number.isFinite(maxAge)) {
      throw new TypeError("option maxAge is invalid");
    }
    str += "; Max-Age=" + Math.floor(maxAge);
  }
  if (opt.domain) {
    if (!fieldContentRegExp.test(opt.domain)) {
      throw new TypeError("option domain is invalid");
    }
    str += "; Domain=" + opt.domain;
  }
  if (opt.path) {
    if (!fieldContentRegExp.test(opt.path)) {
      throw new TypeError("option path is invalid");
    }
    str += "; Path=" + opt.path;
  }
  if (opt.expires) {
    if (!isDate(opt.expires) || Number.isNaN(opt.expires.valueOf())) {
      throw new TypeError("option expires is invalid");
    }
    str += "; Expires=" + opt.expires.toUTCString();
  }
  if (opt.httpOnly) {
    str += "; HttpOnly";
  }
  if (opt.secure) {
    str += "; Secure";
  }
  if (opt.priority) {
    const priority = typeof opt.priority === "string" ? opt.priority.toLowerCase() : opt.priority;
    switch (priority) {
      case "low": {
        str += "; Priority=Low";
        break;
      }
      case "medium": {
        str += "; Priority=Medium";
        break;
      }
      case "high": {
        str += "; Priority=High";
        break;
      }
      default: {
        throw new TypeError("option priority is invalid");
      }
    }
  }
  if (opt.sameSite) {
    const sameSite = typeof opt.sameSite === "string" ? opt.sameSite.toLowerCase() : opt.sameSite;
    switch (sameSite) {
      case true: {
        str += "; SameSite=Strict";
        break;
      }
      case "lax": {
        str += "; SameSite=Lax";
        break;
      }
      case "strict": {
        str += "; SameSite=Strict";
        break;
      }
      case "none": {
        str += "; SameSite=None";
        break;
      }
      default: {
        throw new TypeError("option sameSite is invalid");
      }
    }
  }
  if (opt.partitioned) {
    str += "; Partitioned";
  }
  return str;
}
function isDate(val) {
  return Object.prototype.toString.call(val) === "[object Date]" || val instanceof Date;
}

const defaults$1 = Object.freeze({
  ignoreUnknown: false,
  respectType: false,
  respectFunctionNames: false,
  respectFunctionProperties: false,
  unorderedObjects: true,
  unorderedArrays: false,
  unorderedSets: false,
  excludeKeys: undefined,
  excludeValues: undefined,
  replacer: undefined
});
function objectHash(object, options) {
  if (options) {
    options = { ...defaults$1, ...options };
  } else {
    options = defaults$1;
  }
  const hasher = createHasher(options);
  hasher.dispatch(object);
  return hasher.toString();
}
const defaultPrototypesKeys = Object.freeze([
  "prototype",
  "__proto__",
  "constructor"
]);
function createHasher(options) {
  let buff = "";
  let context = /* @__PURE__ */ new Map();
  const write = (str) => {
    buff += str;
  };
  return {
    toString() {
      return buff;
    },
    getContext() {
      return context;
    },
    dispatch(value) {
      if (options.replacer) {
        value = options.replacer(value);
      }
      const type = value === null ? "null" : typeof value;
      return this[type](value);
    },
    object(object) {
      if (object && typeof object.toJSON === "function") {
        return this.object(object.toJSON());
      }
      const objString = Object.prototype.toString.call(object);
      let objType = "";
      const objectLength = objString.length;
      if (objectLength < 10) {
        objType = "unknown:[" + objString + "]";
      } else {
        objType = objString.slice(8, objectLength - 1);
      }
      objType = objType.toLowerCase();
      let objectNumber = null;
      if ((objectNumber = context.get(object)) === undefined) {
        context.set(object, context.size);
      } else {
        return this.dispatch("[CIRCULAR:" + objectNumber + "]");
      }
      if (typeof Buffer !== "undefined" && Buffer.isBuffer && Buffer.isBuffer(object)) {
        write("buffer:");
        return write(object.toString("utf8"));
      }
      if (objType !== "object" && objType !== "function" && objType !== "asyncfunction") {
        if (this[objType]) {
          this[objType](object);
        } else if (!options.ignoreUnknown) {
          this.unkown(object, objType);
        }
      } else {
        let keys = Object.keys(object);
        if (options.unorderedObjects) {
          keys = keys.sort();
        }
        let extraKeys = [];
        if (options.respectType !== false && !isNativeFunction(object)) {
          extraKeys = defaultPrototypesKeys;
        }
        if (options.excludeKeys) {
          keys = keys.filter((key) => {
            return !options.excludeKeys(key);
          });
          extraKeys = extraKeys.filter((key) => {
            return !options.excludeKeys(key);
          });
        }
        write("object:" + (keys.length + extraKeys.length) + ":");
        const dispatchForKey = (key) => {
          this.dispatch(key);
          write(":");
          if (!options.excludeValues) {
            this.dispatch(object[key]);
          }
          write(",");
        };
        for (const key of keys) {
          dispatchForKey(key);
        }
        for (const key of extraKeys) {
          dispatchForKey(key);
        }
      }
    },
    array(arr, unordered) {
      unordered = unordered === undefined ? options.unorderedArrays !== false : unordered;
      write("array:" + arr.length + ":");
      if (!unordered || arr.length <= 1) {
        for (const entry of arr) {
          this.dispatch(entry);
        }
        return;
      }
      const contextAdditions = /* @__PURE__ */ new Map();
      const entries = arr.map((entry) => {
        const hasher = createHasher(options);
        hasher.dispatch(entry);
        for (const [key, value] of hasher.getContext()) {
          contextAdditions.set(key, value);
        }
        return hasher.toString();
      });
      context = contextAdditions;
      entries.sort();
      return this.array(entries, false);
    },
    date(date) {
      return write("date:" + date.toJSON());
    },
    symbol(sym) {
      return write("symbol:" + sym.toString());
    },
    unkown(value, type) {
      write(type);
      if (!value) {
        return;
      }
      write(":");
      if (value && typeof value.entries === "function") {
        return this.array(
          Array.from(value.entries()),
          true
          /* ordered */
        );
      }
    },
    error(err) {
      return write("error:" + err.toString());
    },
    boolean(bool) {
      return write("bool:" + bool);
    },
    string(string) {
      write("string:" + string.length + ":");
      write(string);
    },
    function(fn) {
      write("fn:");
      if (isNativeFunction(fn)) {
        this.dispatch("[native]");
      } else {
        this.dispatch(fn.toString());
      }
      if (options.respectFunctionNames !== false) {
        this.dispatch("function-name:" + String(fn.name));
      }
      if (options.respectFunctionProperties) {
        this.object(fn);
      }
    },
    number(number) {
      return write("number:" + number);
    },
    xml(xml) {
      return write("xml:" + xml.toString());
    },
    null() {
      return write("Null");
    },
    undefined() {
      return write("Undefined");
    },
    regexp(regex) {
      return write("regex:" + regex.toString());
    },
    uint8array(arr) {
      write("uint8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint8clampedarray(arr) {
      write("uint8clampedarray:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int8array(arr) {
      write("int8array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint16array(arr) {
      write("uint16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int16array(arr) {
      write("int16array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    uint32array(arr) {
      write("uint32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    int32array(arr) {
      write("int32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float32array(arr) {
      write("float32array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    float64array(arr) {
      write("float64array:");
      return this.dispatch(Array.prototype.slice.call(arr));
    },
    arraybuffer(arr) {
      write("arraybuffer:");
      return this.dispatch(new Uint8Array(arr));
    },
    url(url) {
      return write("url:" + url.toString());
    },
    map(map) {
      write("map:");
      const arr = [...map];
      return this.array(arr, options.unorderedSets !== false);
    },
    set(set) {
      write("set:");
      const arr = [...set];
      return this.array(arr, options.unorderedSets !== false);
    },
    file(file) {
      write("file:");
      return this.dispatch([file.name, file.size, file.type, file.lastModfied]);
    },
    blob() {
      if (options.ignoreUnknown) {
        return write("[blob]");
      }
      throw new Error(
        'Hashing Blob objects is currently not supported\nUse "options.replacer" or "options.ignoreUnknown"\n'
      );
    },
    domwindow() {
      return write("domwindow");
    },
    bigint(number) {
      return write("bigint:" + number.toString());
    },
    /* Node.js standard native objects */
    process() {
      return write("process");
    },
    timer() {
      return write("timer");
    },
    pipe() {
      return write("pipe");
    },
    tcp() {
      return write("tcp");
    },
    udp() {
      return write("udp");
    },
    tty() {
      return write("tty");
    },
    statwatcher() {
      return write("statwatcher");
    },
    securecontext() {
      return write("securecontext");
    },
    connection() {
      return write("connection");
    },
    zlib() {
      return write("zlib");
    },
    context() {
      return write("context");
    },
    nodescript() {
      return write("nodescript");
    },
    httpparser() {
      return write("httpparser");
    },
    dataview() {
      return write("dataview");
    },
    signal() {
      return write("signal");
    },
    fsevent() {
      return write("fsevent");
    },
    tlswrap() {
      return write("tlswrap");
    }
  };
}
const nativeFunc = "[native code] }";
const nativeFuncLength = nativeFunc.length;
function isNativeFunction(f) {
  if (typeof f !== "function") {
    return false;
  }
  return Function.prototype.toString.call(f).slice(-nativeFuncLength) === nativeFunc;
}

var __defProp$1 = Object.defineProperty;
var __defNormalProp$1 = (obj, key, value) => key in obj ? __defProp$1(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField$1 = (obj, key, value) => {
  __defNormalProp$1(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
class WordArray {
  constructor(words, sigBytes) {
    __publicField$1(this, "words");
    __publicField$1(this, "sigBytes");
    words = this.words = words || [];
    this.sigBytes = sigBytes === undefined ? words.length * 4 : sigBytes;
  }
  toString(encoder) {
    return (encoder || Hex).stringify(this);
  }
  concat(wordArray) {
    this.clamp();
    if (this.sigBytes % 4) {
      for (let i = 0; i < wordArray.sigBytes; i++) {
        const thatByte = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
        this.words[this.sigBytes + i >>> 2] |= thatByte << 24 - (this.sigBytes + i) % 4 * 8;
      }
    } else {
      for (let j = 0; j < wordArray.sigBytes; j += 4) {
        this.words[this.sigBytes + j >>> 2] = wordArray.words[j >>> 2];
      }
    }
    this.sigBytes += wordArray.sigBytes;
    return this;
  }
  clamp() {
    this.words[this.sigBytes >>> 2] &= 4294967295 << 32 - this.sigBytes % 4 * 8;
    this.words.length = Math.ceil(this.sigBytes / 4);
  }
  clone() {
    return new WordArray([...this.words]);
  }
}
const Hex = {
  stringify(wordArray) {
    const hexChars = [];
    for (let i = 0; i < wordArray.sigBytes; i++) {
      const bite = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      hexChars.push((bite >>> 4).toString(16), (bite & 15).toString(16));
    }
    return hexChars.join("");
  }
};
const Base64 = {
  stringify(wordArray) {
    const keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const base64Chars = [];
    for (let i = 0; i < wordArray.sigBytes; i += 3) {
      const byte1 = wordArray.words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
      const byte2 = wordArray.words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
      const byte3 = wordArray.words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
      const triplet = byte1 << 16 | byte2 << 8 | byte3;
      for (let j = 0; j < 4 && i * 8 + j * 6 < wordArray.sigBytes * 8; j++) {
        base64Chars.push(keyStr.charAt(triplet >>> 6 * (3 - j) & 63));
      }
    }
    return base64Chars.join("");
  }
};
const Latin1 = {
  parse(latin1Str) {
    const latin1StrLength = latin1Str.length;
    const words = [];
    for (let i = 0; i < latin1StrLength; i++) {
      words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
    }
    return new WordArray(words, latin1StrLength);
  }
};
const Utf8 = {
  parse(utf8Str) {
    return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
  }
};
class BufferedBlockAlgorithm {
  constructor() {
    __publicField$1(this, "_data", new WordArray());
    __publicField$1(this, "_nDataBytes", 0);
    __publicField$1(this, "_minBufferSize", 0);
    __publicField$1(this, "blockSize", 512 / 32);
  }
  reset() {
    this._data = new WordArray();
    this._nDataBytes = 0;
  }
  _append(data) {
    if (typeof data === "string") {
      data = Utf8.parse(data);
    }
    this._data.concat(data);
    this._nDataBytes += data.sigBytes;
  }
  _doProcessBlock(_dataWords, _offset) {
  }
  _process(doFlush) {
    let processedWords;
    let nBlocksReady = this._data.sigBytes / (this.blockSize * 4);
    if (doFlush) {
      nBlocksReady = Math.ceil(nBlocksReady);
    } else {
      nBlocksReady = Math.max((nBlocksReady | 0) - this._minBufferSize, 0);
    }
    const nWordsReady = nBlocksReady * this.blockSize;
    const nBytesReady = Math.min(nWordsReady * 4, this._data.sigBytes);
    if (nWordsReady) {
      for (let offset = 0; offset < nWordsReady; offset += this.blockSize) {
        this._doProcessBlock(this._data.words, offset);
      }
      processedWords = this._data.words.splice(0, nWordsReady);
      this._data.sigBytes -= nBytesReady;
    }
    return new WordArray(processedWords, nBytesReady);
  }
}
class Hasher extends BufferedBlockAlgorithm {
  update(messageUpdate) {
    this._append(messageUpdate);
    this._process();
    return this;
  }
  finalize(messageUpdate) {
    if (messageUpdate) {
      this._append(messageUpdate);
    }
  }
}

var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, key + "" , value);
  return value;
};
const H = [
  1779033703,
  -1150833019,
  1013904242,
  -1521486534,
  1359893119,
  -1694144372,
  528734635,
  1541459225
];
const K = [
  1116352408,
  1899447441,
  -1245643825,
  -373957723,
  961987163,
  1508970993,
  -1841331548,
  -1424204075,
  -670586216,
  310598401,
  607225278,
  1426881987,
  1925078388,
  -2132889090,
  -1680079193,
  -1046744716,
  -459576895,
  -272742522,
  264347078,
  604807628,
  770255983,
  1249150122,
  1555081692,
  1996064986,
  -1740746414,
  -1473132947,
  -1341970488,
  -1084653625,
  -958395405,
  -710438585,
  113926993,
  338241895,
  666307205,
  773529912,
  1294757372,
  1396182291,
  1695183700,
  1986661051,
  -2117940946,
  -1838011259,
  -1564481375,
  -1474664885,
  -1035236496,
  -949202525,
  -778901479,
  -694614492,
  -200395387,
  275423344,
  430227734,
  506948616,
  659060556,
  883997877,
  958139571,
  1322822218,
  1537002063,
  1747873779,
  1955562222,
  2024104815,
  -2067236844,
  -1933114872,
  -1866530822,
  -1538233109,
  -1090935817,
  -965641998
];
const W = [];
class SHA256 extends Hasher {
  constructor() {
    super(...arguments);
    __publicField(this, "_hash", new WordArray([...H]));
  }
  /**
   * Resets the internal state of the hash object to initial values.
   */
  reset() {
    super.reset();
    this._hash = new WordArray([...H]);
  }
  _doProcessBlock(M, offset) {
    const H2 = this._hash.words;
    let a = H2[0];
    let b = H2[1];
    let c = H2[2];
    let d = H2[3];
    let e = H2[4];
    let f = H2[5];
    let g = H2[6];
    let h = H2[7];
    for (let i = 0; i < 64; i++) {
      if (i < 16) {
        W[i] = M[offset + i] | 0;
      } else {
        const gamma0x = W[i - 15];
        const gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
        const gamma1x = W[i - 2];
        const gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
        W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
      }
      const ch = e & f ^ ~e & g;
      const maj = a & b ^ a & c ^ b & c;
      const sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
      const sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
      const t1 = h + sigma1 + ch + K[i] + W[i];
      const t2 = sigma0 + maj;
      h = g;
      g = f;
      f = e;
      e = d + t1 | 0;
      d = c;
      c = b;
      b = a;
      a = t1 + t2 | 0;
    }
    H2[0] = H2[0] + a | 0;
    H2[1] = H2[1] + b | 0;
    H2[2] = H2[2] + c | 0;
    H2[3] = H2[3] + d | 0;
    H2[4] = H2[4] + e | 0;
    H2[5] = H2[5] + f | 0;
    H2[6] = H2[6] + g | 0;
    H2[7] = H2[7] + h | 0;
  }
  /**
   * Finishes the hash calculation and returns the hash as a WordArray.
   *
   * @param {string} messageUpdate - Additional message content to include in the hash.
   * @returns {WordArray} The finalised hash as a WordArray.
   */
  finalize(messageUpdate) {
    super.finalize(messageUpdate);
    const nBitsTotal = this._nDataBytes * 8;
    const nBitsLeft = this._data.sigBytes * 8;
    this._data.words[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math.floor(
      nBitsTotal / 4294967296
    );
    this._data.words[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
    this._data.sigBytes = this._data.words.length * 4;
    this._process();
    return this._hash;
  }
}
function sha256base64(message) {
  return new SHA256().finalize(message).toString(Base64);
}

function hash(object, options = {}) {
  const hashed = typeof object === "string" ? object : objectHash(object, options);
  return sha256base64(hashed).slice(0, 10);
}

function isEqual(object1, object2, hashOptions = {}) {
  if (object1 === object2) {
    return true;
  }
  if (objectHash(object1, hashOptions) === objectHash(object2, hashOptions)) {
    return true;
  }
  return false;
}

const NODE_TYPES = {
  NORMAL: 0,
  WILDCARD: 1,
  PLACEHOLDER: 2
};

function createRouter$1(options = {}) {
  const ctx = {
    options,
    rootNode: createRadixNode(),
    staticRoutesMap: {}
  };
  const normalizeTrailingSlash = (p) => options.strictTrailingSlash ? p : p.replace(/\/$/, "") || "/";
  if (options.routes) {
    for (const path in options.routes) {
      insert(ctx, normalizeTrailingSlash(path), options.routes[path]);
    }
  }
  return {
    ctx,
    lookup: (path) => lookup(ctx, normalizeTrailingSlash(path)),
    insert: (path, data) => insert(ctx, normalizeTrailingSlash(path), data),
    remove: (path) => remove(ctx, normalizeTrailingSlash(path))
  };
}
function lookup(ctx, path) {
  const staticPathNode = ctx.staticRoutesMap[path];
  if (staticPathNode) {
    return staticPathNode.data;
  }
  const sections = path.split("/");
  const params = {};
  let paramsFound = false;
  let wildcardNode = null;
  let node = ctx.rootNode;
  let wildCardParam = null;
  for (let i = 0; i < sections.length; i++) {
    const section = sections[i];
    if (node.wildcardChildNode !== null) {
      wildcardNode = node.wildcardChildNode;
      wildCardParam = sections.slice(i).join("/");
    }
    const nextNode = node.children.get(section);
    if (nextNode === undefined) {
      if (node && node.placeholderChildren.length > 1) {
        const remaining = sections.length - i;
        node = node.placeholderChildren.find((c) => c.maxDepth === remaining) || null;
      } else {
        node = node.placeholderChildren[0] || null;
      }
      if (!node) {
        break;
      }
      if (node.paramName) {
        params[node.paramName] = section;
      }
      paramsFound = true;
    } else {
      node = nextNode;
    }
  }
  if ((node === null || node.data === null) && wildcardNode !== null) {
    node = wildcardNode;
    params[node.paramName || "_"] = wildCardParam;
    paramsFound = true;
  }
  if (!node) {
    return null;
  }
  if (paramsFound) {
    return {
      ...node.data,
      params: paramsFound ? params : undefined
    };
  }
  return node.data;
}
function insert(ctx, path, data) {
  let isStaticRoute = true;
  const sections = path.split("/");
  let node = ctx.rootNode;
  let _unnamedPlaceholderCtr = 0;
  const matchedNodes = [node];
  for (const section of sections) {
    let childNode;
    if (childNode = node.children.get(section)) {
      node = childNode;
    } else {
      const type = getNodeType(section);
      childNode = createRadixNode({ type, parent: node });
      node.children.set(section, childNode);
      if (type === NODE_TYPES.PLACEHOLDER) {
        childNode.paramName = section === "*" ? `_${_unnamedPlaceholderCtr++}` : section.slice(1);
        node.placeholderChildren.push(childNode);
        isStaticRoute = false;
      } else if (type === NODE_TYPES.WILDCARD) {
        node.wildcardChildNode = childNode;
        childNode.paramName = section.slice(
          3
          /* "**:" */
        ) || "_";
        isStaticRoute = false;
      }
      matchedNodes.push(childNode);
      node = childNode;
    }
  }
  for (const [depth, node2] of matchedNodes.entries()) {
    node2.maxDepth = Math.max(matchedNodes.length - depth, node2.maxDepth || 0);
  }
  node.data = data;
  if (isStaticRoute === true) {
    ctx.staticRoutesMap[path] = node;
  }
  return node;
}
function remove(ctx, path) {
  let success = false;
  const sections = path.split("/");
  let node = ctx.rootNode;
  for (const section of sections) {
    node = node.children.get(section);
    if (!node) {
      return success;
    }
  }
  if (node.data) {
    const lastSection = sections.at(-1) || "";
    node.data = null;
    if (Object.keys(node.children).length === 0 && node.parent) {
      node.parent.children.delete(lastSection);
      node.parent.wildcardChildNode = null;
      node.parent.placeholderChildren = [];
    }
    success = true;
  }
  return success;
}
function createRadixNode(options = {}) {
  return {
    type: options.type || NODE_TYPES.NORMAL,
    maxDepth: 0,
    parent: options.parent || null,
    children: /* @__PURE__ */ new Map(),
    data: options.data || null,
    paramName: options.paramName || null,
    wildcardChildNode: null,
    placeholderChildren: []
  };
}
function getNodeType(str) {
  if (str.startsWith("**")) {
    return NODE_TYPES.WILDCARD;
  }
  if (str[0] === ":" || str === "*") {
    return NODE_TYPES.PLACEHOLDER;
  }
  return NODE_TYPES.NORMAL;
}

function toRouteMatcher(router) {
  const table = _routerNodeToTable("", router.ctx.rootNode);
  return _createMatcher(table, router.ctx.options.strictTrailingSlash);
}
function _createMatcher(table, strictTrailingSlash) {
  return {
    ctx: { table },
    matchAll: (path) => _matchRoutes(path, table, strictTrailingSlash)
  };
}
function _createRouteTable() {
  return {
    static: /* @__PURE__ */ new Map(),
    wildcard: /* @__PURE__ */ new Map(),
    dynamic: /* @__PURE__ */ new Map()
  };
}
function _matchRoutes(path, table, strictTrailingSlash) {
  if (strictTrailingSlash !== true && path.endsWith("/")) {
    path = path.slice(0, -1) || "/";
  }
  const matches = [];
  for (const [key, value] of _sortRoutesMap(table.wildcard)) {
    if (path === key || path.startsWith(key + "/")) {
      matches.push(value);
    }
  }
  for (const [key, value] of _sortRoutesMap(table.dynamic)) {
    if (path.startsWith(key + "/")) {
      const subPath = "/" + path.slice(key.length).split("/").splice(2).join("/");
      matches.push(..._matchRoutes(subPath, value));
    }
  }
  const staticMatch = table.static.get(path);
  if (staticMatch) {
    matches.push(staticMatch);
  }
  return matches.filter(Boolean);
}
function _sortRoutesMap(m) {
  return [...m.entries()].sort((a, b) => a[0].length - b[0].length);
}
function _routerNodeToTable(initialPath, initialNode) {
  const table = _createRouteTable();
  function _addNode(path, node) {
    if (path) {
      if (node.type === NODE_TYPES.NORMAL && !(path.includes("*") || path.includes(":"))) {
        if (node.data) {
          table.static.set(path, node.data);
        }
      } else if (node.type === NODE_TYPES.WILDCARD) {
        table.wildcard.set(path.replace("/**", ""), node.data);
      } else if (node.type === NODE_TYPES.PLACEHOLDER) {
        const subTable = _routerNodeToTable("", node);
        if (node.data) {
          subTable.static.set("/", node.data);
        }
        table.dynamic.set(path.replace(/\/\*|\/:\w+/, ""), subTable);
        return;
      }
    }
    for (const [childPath, child] of node.children.entries()) {
      _addNode(`${path}/${childPath}`.replace("//", "/"), child);
    }
  }
  _addNode(initialPath, initialNode);
  return table;
}

function isPlainObject(value) {
  if (value === null || typeof value !== "object") {
    return false;
  }
  const prototype = Object.getPrototypeOf(value);
  if (prototype !== null && prototype !== Object.prototype && Object.getPrototypeOf(prototype) !== null) {
    return false;
  }
  if (Symbol.iterator in value) {
    return false;
  }
  if (Symbol.toStringTag in value) {
    return Object.prototype.toString.call(value) === "[object Module]";
  }
  return true;
}

function _defu(baseObject, defaults, namespace = ".", merger) {
  if (!isPlainObject(defaults)) {
    return _defu(baseObject, {}, namespace, merger);
  }
  const object = Object.assign({}, defaults);
  for (const key in baseObject) {
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = baseObject[key];
    if (value === null || value === undefined) {
      continue;
    }
    if (merger && merger(object, key, value, namespace)) {
      continue;
    }
    if (Array.isArray(value) && Array.isArray(object[key])) {
      object[key] = [...value, ...object[key]];
    } else if (isPlainObject(value) && isPlainObject(object[key])) {
      object[key] = _defu(
        value,
        object[key],
        (namespace ? `${namespace}.` : "") + key.toString(),
        merger
      );
    } else {
      object[key] = value;
    }
  }
  return object;
}
function createDefu(merger) {
  return (...arguments_) => (
    // eslint-disable-next-line unicorn/no-array-reduce
    arguments_.reduce((p, c) => _defu(p, c, "", merger), {})
  );
}
const defu = createDefu();
const defuFn = createDefu((object, key, currentValue) => {
  if (object[key] !== undefined && typeof currentValue === "function") {
    object[key] = currentValue(object[key]);
    return true;
  }
});

function rawHeaders(headers) {
  const rawHeaders2 = [];
  for (const key in headers) {
    if (Array.isArray(headers[key])) {
      for (const h of headers[key]) {
        rawHeaders2.push(key, h);
      }
    } else {
      rawHeaders2.push(key, headers[key]);
    }
  }
  return rawHeaders2;
}
function mergeFns(...functions) {
  return function(...args) {
    for (const fn of functions) {
      fn(...args);
    }
  };
}
function createNotImplementedError(name) {
  throw new Error(`[unenv] ${name} is not implemented yet!`);
}

let defaultMaxListeners = 10;
let EventEmitter$1 = class EventEmitter {
  __unenv__ = true;
  _events = /* @__PURE__ */ Object.create(null);
  _maxListeners;
  static get defaultMaxListeners() {
    return defaultMaxListeners;
  }
  static set defaultMaxListeners(arg) {
    if (typeof arg !== "number" || arg < 0 || Number.isNaN(arg)) {
      throw new RangeError(
        'The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + "."
      );
    }
    defaultMaxListeners = arg;
  }
  setMaxListeners(n) {
    if (typeof n !== "number" || n < 0 || Number.isNaN(n)) {
      throw new RangeError(
        'The value of "n" is out of range. It must be a non-negative number. Received ' + n + "."
      );
    }
    this._maxListeners = n;
    return this;
  }
  getMaxListeners() {
    return _getMaxListeners(this);
  }
  emit(type, ...args) {
    if (!this._events[type] || this._events[type].length === 0) {
      return false;
    }
    if (type === "error") {
      let er;
      if (args.length > 0) {
        er = args[0];
      }
      if (er instanceof Error) {
        throw er;
      }
      const err = new Error(
        "Unhandled error." + (er ? " (" + er.message + ")" : "")
      );
      err.context = er;
      throw err;
    }
    for (const _listener of this._events[type]) {
      (_listener.listener || _listener).apply(this, args);
    }
    return true;
  }
  addListener(type, listener) {
    return _addListener(this, type, listener, false);
  }
  on(type, listener) {
    return _addListener(this, type, listener, false);
  }
  prependListener(type, listener) {
    return _addListener(this, type, listener, true);
  }
  once(type, listener) {
    return this.on(type, _wrapOnce(this, type, listener));
  }
  prependOnceListener(type, listener) {
    return this.prependListener(type, _wrapOnce(this, type, listener));
  }
  removeListener(type, listener) {
    return _removeListener(this, type, listener);
  }
  off(type, listener) {
    return this.removeListener(type, listener);
  }
  removeAllListeners(type) {
    return _removeAllListeners(this, type);
  }
  listeners(type) {
    return _listeners(this, type, true);
  }
  rawListeners(type) {
    return _listeners(this, type, false);
  }
  listenerCount(type) {
    return this.rawListeners(type).length;
  }
  eventNames() {
    return Object.keys(this._events);
  }
};
function _addListener(target, type, listener, prepend) {
  _checkListener(listener);
  if (target._events.newListener !== undefined) {
    target.emit("newListener", type, listener.listener || listener);
  }
  if (!target._events[type]) {
    target._events[type] = [];
  }
  if (prepend) {
    target._events[type].unshift(listener);
  } else {
    target._events[type].push(listener);
  }
  const maxListeners = _getMaxListeners(target);
  if (maxListeners > 0 && target._events[type].length > maxListeners && !target._events[type].warned) {
    target._events[type].warned = true;
    const warning = new Error(
      `[unenv] Possible EventEmitter memory leak detected. ${target._events[type].length} ${type} listeners added. Use emitter.setMaxListeners() to increase limit`
    );
    warning.name = "MaxListenersExceededWarning";
    warning.emitter = target;
    warning.type = type;
    warning.count = target._events[type]?.length;
    console.warn(warning);
  }
  return target;
}
function _removeListener(target, type, listener) {
  _checkListener(listener);
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  const lenBeforeFilter = target._events[type].length;
  target._events[type] = target._events[type].filter((fn) => fn !== listener);
  if (lenBeforeFilter === target._events[type].length) {
    return target;
  }
  if (target._events.removeListener) {
    target.emit("removeListener", type, listener.listener || listener);
  }
  if (target._events[type].length === 0) {
    delete target._events[type];
  }
  return target;
}
function _removeAllListeners(target, type) {
  if (!target._events[type] || target._events[type].length === 0) {
    return target;
  }
  if (target._events.removeListener) {
    for (const _listener of target._events[type]) {
      target.emit("removeListener", type, _listener.listener || _listener);
    }
  }
  delete target._events[type];
  return target;
}
function _wrapOnce(target, type, listener) {
  let fired = false;
  const wrapper = (...args) => {
    if (fired) {
      return;
    }
    target.removeListener(type, wrapper);
    fired = true;
    return args.length === 0 ? listener.call(target) : listener.apply(target, args);
  };
  wrapper.listener = listener;
  return wrapper;
}
function _getMaxListeners(target) {
  return target._maxListeners ?? EventEmitter$1.defaultMaxListeners;
}
function _listeners(target, type, unwrap) {
  let listeners = target._events[type];
  if (typeof listeners === "function") {
    listeners = [listeners];
  }
  return unwrap ? listeners.map((l) => l.listener || l) : listeners;
}
function _checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError(
      'The "listener" argument must be of type Function. Received type ' + typeof listener
    );
  }
}

const EventEmitter = globalThis.EventEmitter || EventEmitter$1;

class _Readable extends EventEmitter {
  __unenv__ = true;
  readableEncoding = null;
  readableEnded = true;
  readableFlowing = false;
  readableHighWaterMark = 0;
  readableLength = 0;
  readableObjectMode = false;
  readableAborted = false;
  readableDidRead = false;
  closed = false;
  errored = null;
  readable = false;
  destroyed = false;
  static from(_iterable, options) {
    return new _Readable(options);
  }
  constructor(_opts) {
    super();
  }
  _read(_size) {
  }
  read(_size) {
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  isPaused() {
    return true;
  }
  unpipe(_destination) {
    return this;
  }
  unshift(_chunk, _encoding) {
  }
  wrap(_oldStream) {
    return this;
  }
  push(_chunk, _encoding) {
    return false;
  }
  _destroy(_error, _callback) {
    this.removeAllListeners();
  }
  destroy(error) {
    this.destroyed = true;
    this._destroy(error);
    return this;
  }
  pipe(_destenition, _options) {
    return {};
  }
  compose(stream, options) {
    throw new Error("[unenv] Method not implemented.");
  }
  [Symbol.asyncDispose]() {
    this.destroy();
    return Promise.resolve();
  }
  // eslint-disable-next-line require-yield
  async *[Symbol.asyncIterator]() {
    throw createNotImplementedError("Readable.asyncIterator");
  }
  iterator(options) {
    throw createNotImplementedError("Readable.iterator");
  }
  map(fn, options) {
    throw createNotImplementedError("Readable.map");
  }
  filter(fn, options) {
    throw createNotImplementedError("Readable.filter");
  }
  forEach(fn, options) {
    throw createNotImplementedError("Readable.forEach");
  }
  reduce(fn, initialValue, options) {
    throw createNotImplementedError("Readable.reduce");
  }
  find(fn, options) {
    throw createNotImplementedError("Readable.find");
  }
  findIndex(fn, options) {
    throw createNotImplementedError("Readable.findIndex");
  }
  some(fn, options) {
    throw createNotImplementedError("Readable.some");
  }
  toArray(options) {
    throw createNotImplementedError("Readable.toArray");
  }
  every(fn, options) {
    throw createNotImplementedError("Readable.every");
  }
  flatMap(fn, options) {
    throw createNotImplementedError("Readable.flatMap");
  }
  drop(limit, options) {
    throw createNotImplementedError("Readable.drop");
  }
  take(limit, options) {
    throw createNotImplementedError("Readable.take");
  }
  asIndexedPairs(options) {
    throw createNotImplementedError("Readable.asIndexedPairs");
  }
}
const Readable = globalThis.Readable || _Readable;

class _Writable extends EventEmitter {
  __unenv__ = true;
  writable = true;
  writableEnded = false;
  writableFinished = false;
  writableHighWaterMark = 0;
  writableLength = 0;
  writableObjectMode = false;
  writableCorked = 0;
  closed = false;
  errored = null;
  writableNeedDrain = false;
  destroyed = false;
  _data;
  _encoding = "utf-8";
  constructor(_opts) {
    super();
  }
  pipe(_destenition, _options) {
    return {};
  }
  _write(chunk, encoding, callback) {
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return;
    }
    if (this._data === undefined) {
      this._data = chunk;
    } else {
      const a = typeof this._data === "string" ? Buffer.from(this._data, this._encoding || encoding || "utf8") : this._data;
      const b = typeof chunk === "string" ? Buffer.from(chunk, encoding || this._encoding || "utf8") : chunk;
      this._data = Buffer.concat([a, b]);
    }
    this._encoding = encoding;
    if (callback) {
      callback();
    }
  }
  _writev(_chunks, _callback) {
  }
  _destroy(_error, _callback) {
  }
  _final(_callback) {
  }
  write(chunk, arg2, arg3) {
    const encoding = typeof arg2 === "string" ? this._encoding : "utf-8";
    const cb = typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : undefined;
    this._write(chunk, encoding, cb);
    return true;
  }
  setDefaultEncoding(_encoding) {
    return this;
  }
  end(arg1, arg2, arg3) {
    const callback = typeof arg1 === "function" ? arg1 : typeof arg2 === "function" ? arg2 : typeof arg3 === "function" ? arg3 : undefined;
    if (this.writableEnded) {
      if (callback) {
        callback();
      }
      return this;
    }
    const data = arg1 === callback ? undefined : arg1;
    if (data) {
      const encoding = arg2 === callback ? undefined : arg2;
      this.write(data, encoding, callback);
    }
    this.writableEnded = true;
    this.writableFinished = true;
    this.emit("close");
    this.emit("finish");
    return this;
  }
  cork() {
  }
  uncork() {
  }
  destroy(_error) {
    this.destroyed = true;
    delete this._data;
    this.removeAllListeners();
    return this;
  }
  compose(stream, options) {
    throw new Error("[h3] Method not implemented.");
  }
}
const Writable = globalThis.Writable || _Writable;

const __Duplex = class {
  allowHalfOpen = true;
  _destroy;
  constructor(readable = new Readable(), writable = new Writable()) {
    Object.assign(this, readable);
    Object.assign(this, writable);
    this._destroy = mergeFns(readable._destroy, writable._destroy);
  }
};
function getDuplex() {
  Object.assign(__Duplex.prototype, Readable.prototype);
  Object.assign(__Duplex.prototype, Writable.prototype);
  return __Duplex;
}
const _Duplex = /* @__PURE__ */ getDuplex();
const Duplex = globalThis.Duplex || _Duplex;

class Socket extends Duplex {
  __unenv__ = true;
  bufferSize = 0;
  bytesRead = 0;
  bytesWritten = 0;
  connecting = false;
  destroyed = false;
  pending = false;
  localAddress = "";
  localPort = 0;
  remoteAddress = "";
  remoteFamily = "";
  remotePort = 0;
  autoSelectFamilyAttemptedAddresses = [];
  readyState = "readOnly";
  constructor(_options) {
    super();
  }
  write(_buffer, _arg1, _arg2) {
    return false;
  }
  connect(_arg1, _arg2, _arg3) {
    return this;
  }
  end(_arg1, _arg2, _arg3) {
    return this;
  }
  setEncoding(_encoding) {
    return this;
  }
  pause() {
    return this;
  }
  resume() {
    return this;
  }
  setTimeout(_timeout, _callback) {
    return this;
  }
  setNoDelay(_noDelay) {
    return this;
  }
  setKeepAlive(_enable, _initialDelay) {
    return this;
  }
  address() {
    return {};
  }
  unref() {
    return this;
  }
  ref() {
    return this;
  }
  destroySoon() {
    this.destroy();
  }
  resetAndDestroy() {
    const err = new Error("ERR_SOCKET_CLOSED");
    err.code = "ERR_SOCKET_CLOSED";
    this.destroy(err);
    return this;
  }
}

class IncomingMessage extends Readable {
  __unenv__ = {};
  aborted = false;
  httpVersion = "1.1";
  httpVersionMajor = 1;
  httpVersionMinor = 1;
  complete = true;
  connection;
  socket;
  headers = {};
  trailers = {};
  method = "GET";
  url = "/";
  statusCode = 200;
  statusMessage = "";
  closed = false;
  errored = null;
  readable = false;
  constructor(socket) {
    super();
    this.socket = this.connection = socket || new Socket();
  }
  get rawHeaders() {
    return rawHeaders(this.headers);
  }
  get rawTrailers() {
    return [];
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  get headersDistinct() {
    return _distinct(this.headers);
  }
  get trailersDistinct() {
    return _distinct(this.trailers);
  }
}
function _distinct(obj) {
  const d = {};
  for (const [key, value] of Object.entries(obj)) {
    if (key) {
      d[key] = (Array.isArray(value) ? value : [value]).filter(
        Boolean
      );
    }
  }
  return d;
}

class ServerResponse extends Writable {
  __unenv__ = true;
  statusCode = 200;
  statusMessage = "";
  upgrading = false;
  chunkedEncoding = false;
  shouldKeepAlive = false;
  useChunkedEncodingByDefault = false;
  sendDate = false;
  finished = false;
  headersSent = false;
  strictContentLength = false;
  connection = null;
  socket = null;
  req;
  _headers = {};
  constructor(req) {
    super();
    this.req = req;
  }
  assignSocket(socket) {
    socket._httpMessage = this;
    this.socket = socket;
    this.connection = socket;
    this.emit("socket", socket);
    this._flush();
  }
  _flush() {
    this.flushHeaders();
  }
  detachSocket(_socket) {
  }
  writeContinue(_callback) {
  }
  writeHead(statusCode, arg1, arg2) {
    if (statusCode) {
      this.statusCode = statusCode;
    }
    if (typeof arg1 === "string") {
      this.statusMessage = arg1;
      arg1 = undefined;
    }
    const headers = arg2 || arg1;
    if (headers) {
      if (Array.isArray(headers)) ; else {
        for (const key in headers) {
          this.setHeader(key, headers[key]);
        }
      }
    }
    this.headersSent = true;
    return this;
  }
  writeProcessing() {
  }
  setTimeout(_msecs, _callback) {
    return this;
  }
  appendHeader(name, value) {
    name = name.toLowerCase();
    const current = this._headers[name];
    const all = [
      ...Array.isArray(current) ? current : [current],
      ...Array.isArray(value) ? value : [value]
    ].filter(Boolean);
    this._headers[name] = all.length > 1 ? all : all[0];
    return this;
  }
  setHeader(name, value) {
    this._headers[name.toLowerCase()] = value;
    return this;
  }
  getHeader(name) {
    return this._headers[name.toLowerCase()];
  }
  getHeaders() {
    return this._headers;
  }
  getHeaderNames() {
    return Object.keys(this._headers);
  }
  hasHeader(name) {
    return name.toLowerCase() in this._headers;
  }
  removeHeader(name) {
    delete this._headers[name.toLowerCase()];
  }
  addTrailers(_headers) {
  }
  flushHeaders() {
  }
  writeEarlyHints(_headers, cb) {
    if (typeof cb === "function") {
      cb();
    }
  }
}

function hasProp(obj, prop) {
  try {
    return prop in obj;
  } catch {
    return false;
  }
}

class H3Error extends Error {
  static __h3_error__ = true;
  statusCode = 500;
  fatal = false;
  unhandled = false;
  statusMessage;
  data;
  cause;
  constructor(message, opts = {}) {
    super(message, opts);
    if (opts.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
  toJSON() {
    const obj = {
      message: this.message,
      statusCode: sanitizeStatusCode(this.statusCode, 500)
    };
    if (this.statusMessage) {
      obj.statusMessage = sanitizeStatusMessage(this.statusMessage);
    }
    if (this.data !== undefined) {
      obj.data = this.data;
    }
    return obj;
  }
}
function createError$1(input) {
  if (typeof input === "string") {
    return new H3Error(input);
  }
  if (isError(input)) {
    return input;
  }
  const err = new H3Error(input.message ?? input.statusMessage ?? "", {
    cause: input.cause || input
  });
  if (hasProp(input, "stack")) {
    try {
      Object.defineProperty(err, "stack", {
        get() {
          return input.stack;
        }
      });
    } catch {
      try {
        err.stack = input.stack;
      } catch {
      }
    }
  }
  if (input.data) {
    err.data = input.data;
  }
  if (input.statusCode) {
    err.statusCode = sanitizeStatusCode(input.statusCode, err.statusCode);
  } else if (input.status) {
    err.statusCode = sanitizeStatusCode(input.status, err.statusCode);
  }
  if (input.statusMessage) {
    err.statusMessage = input.statusMessage;
  } else if (input.statusText) {
    err.statusMessage = input.statusText;
  }
  if (err.statusMessage) {
    const originalMessage = err.statusMessage;
    const sanitizedMessage = sanitizeStatusMessage(err.statusMessage);
    if (sanitizedMessage !== originalMessage) {
      console.warn(
        "[h3] Please prefer using `message` for longer error messages instead of `statusMessage`. In the future, `statusMessage` will be sanitized by default."
      );
    }
  }
  if (input.fatal !== undefined) {
    err.fatal = input.fatal;
  }
  if (input.unhandled !== undefined) {
    err.unhandled = input.unhandled;
  }
  return err;
}
function sendError(event, error, debug) {
  if (event.handled) {
    return;
  }
  const h3Error = isError(error) ? error : createError$1(error);
  const responseBody = {
    statusCode: h3Error.statusCode,
    statusMessage: h3Error.statusMessage,
    stack: [],
    data: h3Error.data
  };
  if (debug) {
    responseBody.stack = (h3Error.stack || "").split("\n").map((l) => l.trim());
  }
  if (event.handled) {
    return;
  }
  const _code = Number.parseInt(h3Error.statusCode);
  setResponseStatus(event, _code, h3Error.statusMessage);
  event.node.res.setHeader("content-type", MIMES.json);
  event.node.res.end(JSON.stringify(responseBody, undefined, 2));
}
function isError(input) {
  return input?.constructor?.__h3_error__ === true;
}

function getQuery(event) {
  return getQuery$1(event.path || "");
}
function isMethod(event, expected, allowHead) {
  if (typeof expected === "string") {
    if (event.method === expected) {
      return true;
    }
  } else if (expected.includes(event.method)) {
    return true;
  }
  return false;
}
function assertMethod(event, expected, allowHead) {
  if (!isMethod(event, expected)) {
    throw createError$1({
      statusCode: 405,
      statusMessage: "HTTP method is not allowed."
    });
  }
}
function getRequestHeaders(event) {
  const _headers = {};
  for (const key in event.node.req.headers) {
    const val = event.node.req.headers[key];
    _headers[key] = Array.isArray(val) ? val.filter(Boolean).join(", ") : val;
  }
  return _headers;
}
function getRequestHeader(event, name) {
  const headers = getRequestHeaders(event);
  const value = headers[name.toLowerCase()];
  return value;
}

const RawBodySymbol = Symbol.for("h3RawBody");
const ParsedBodySymbol = Symbol.for("h3ParsedBody");
const PayloadMethods$1 = ["PATCH", "POST", "PUT", "DELETE"];
function readRawBody(event, encoding = "utf8") {
  assertMethod(event, PayloadMethods$1);
  const _rawBody = event._requestBody || event.web?.request?.body || event.node.req[RawBodySymbol] || event.node.req.rawBody || event.node.req.body;
  if (_rawBody) {
    const promise2 = Promise.resolve(_rawBody).then((_resolved) => {
      if (Buffer.isBuffer(_resolved)) {
        return _resolved;
      }
      if (typeof _resolved.pipeTo === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.pipeTo(
            new WritableStream({
              write(chunk) {
                chunks.push(chunk);
              },
              close() {
                resolve(Buffer.concat(chunks));
              },
              abort(reason) {
                reject(reason);
              }
            })
          ).catch(reject);
        });
      } else if (typeof _resolved.pipe === "function") {
        return new Promise((resolve, reject) => {
          const chunks = [];
          _resolved.on("data", (chunk) => {
            chunks.push(chunk);
          }).on("end", () => {
            resolve(Buffer.concat(chunks));
          }).on("error", reject);
        });
      }
      if (_resolved.constructor === Object) {
        return Buffer.from(JSON.stringify(_resolved));
      }
      if (_resolved instanceof URLSearchParams) {
        return Buffer.from(_resolved.toString());
      }
      return Buffer.from(_resolved);
    });
    return encoding ? promise2.then((buff) => buff.toString(encoding)) : promise2;
  }
  if (!Number.parseInt(event.node.req.headers["content-length"] || "") && !String(event.node.req.headers["transfer-encoding"] ?? "").split(",").map((e) => e.trim()).filter(Boolean).includes("chunked")) {
    return Promise.resolve(undefined);
  }
  const promise = event.node.req[RawBodySymbol] = new Promise(
    (resolve, reject) => {
      const bodyData = [];
      event.node.req.on("error", (err) => {
        reject(err);
      }).on("data", (chunk) => {
        bodyData.push(chunk);
      }).on("end", () => {
        resolve(Buffer.concat(bodyData));
      });
    }
  );
  const result = encoding ? promise.then((buff) => buff.toString(encoding)) : promise;
  return result;
}
async function readBody(event, options = {}) {
  const request = event.node.req;
  if (hasProp(request, ParsedBodySymbol)) {
    return request[ParsedBodySymbol];
  }
  const contentType = request.headers["content-type"] || "";
  const body = await readRawBody(event);
  let parsed;
  if (contentType === "application/json") {
    parsed = _parseJSON(body, options.strict ?? true);
  } else if (contentType.startsWith("application/x-www-form-urlencoded")) {
    parsed = _parseURLEncodedBody(body);
  } else if (contentType.startsWith("text/")) {
    parsed = body;
  } else {
    parsed = _parseJSON(body, options.strict ?? false);
  }
  request[ParsedBodySymbol] = parsed;
  return parsed;
}
function getRequestWebStream(event) {
  if (!PayloadMethods$1.includes(event.method)) {
    return;
  }
  const bodyStream = event.web?.request?.body || event._requestBody;
  if (bodyStream) {
    return bodyStream;
  }
  const _hasRawBody = RawBodySymbol in event.node.req || "rawBody" in event.node.req || "body" in event.node.req || "__unenv__" in event.node.req;
  if (_hasRawBody) {
    return new ReadableStream({
      async start(controller) {
        const _rawBody = await readRawBody(event, false);
        if (_rawBody) {
          controller.enqueue(_rawBody);
        }
        controller.close();
      }
    });
  }
  return new ReadableStream({
    start: (controller) => {
      event.node.req.on("data", (chunk) => {
        controller.enqueue(chunk);
      });
      event.node.req.on("end", () => {
        controller.close();
      });
      event.node.req.on("error", (err) => {
        controller.error(err);
      });
    }
  });
}
function _parseJSON(body = "", strict) {
  if (!body) {
    return undefined;
  }
  try {
    return destr(body, { strict });
  } catch {
    throw createError$1({
      statusCode: 400,
      statusMessage: "Bad Request",
      message: "Invalid JSON body"
    });
  }
}
function _parseURLEncodedBody(body) {
  const form = new URLSearchParams(body);
  const parsedForm = /* @__PURE__ */ Object.create(null);
  for (const [key, value] of form.entries()) {
    if (hasProp(parsedForm, key)) {
      if (!Array.isArray(parsedForm[key])) {
        parsedForm[key] = [parsedForm[key]];
      }
      parsedForm[key].push(value);
    } else {
      parsedForm[key] = value;
    }
  }
  return parsedForm;
}

function handleCacheHeaders(event, opts) {
  const cacheControls = ["public", ...opts.cacheControls || []];
  let cacheMatched = false;
  if (opts.maxAge !== undefined) {
    cacheControls.push(`max-age=${+opts.maxAge}`, `s-maxage=${+opts.maxAge}`);
  }
  if (opts.modifiedTime) {
    const modifiedTime = new Date(opts.modifiedTime);
    const ifModifiedSince = event.node.req.headers["if-modified-since"];
    event.node.res.setHeader("last-modified", modifiedTime.toUTCString());
    if (ifModifiedSince && new Date(ifModifiedSince) >= opts.modifiedTime) {
      cacheMatched = true;
    }
  }
  if (opts.etag) {
    event.node.res.setHeader("etag", opts.etag);
    const ifNonMatch = event.node.req.headers["if-none-match"];
    if (ifNonMatch === opts.etag) {
      cacheMatched = true;
    }
  }
  event.node.res.setHeader("cache-control", cacheControls.join(", "));
  if (cacheMatched) {
    event.node.res.statusCode = 304;
    if (!event.handled) {
      event.node.res.end();
    }
    return true;
  }
  return false;
}

const MIMES = {
  html: "text/html",
  json: "application/json"
};

const DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
  return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
  if (!statusCode) {
    return defaultStatusCode;
  }
  if (typeof statusCode === "string") {
    statusCode = Number.parseInt(statusCode, 10);
  }
  if (statusCode < 100 || statusCode > 999) {
    return defaultStatusCode;
  }
  return statusCode;
}

function parseCookies(event) {
  return parse(event.node.req.headers.cookie || "");
}
function getCookie(event, name) {
  return parseCookies(event)[name];
}
function setCookie(event, name, value, serializeOptions) {
  serializeOptions = { path: "/", ...serializeOptions };
  const cookieStr = serialize(name, value, serializeOptions);
  let setCookies = event.node.res.getHeader("set-cookie");
  if (!Array.isArray(setCookies)) {
    setCookies = [setCookies];
  }
  const _optionsHash = objectHash(serializeOptions);
  setCookies = setCookies.filter((cookieValue) => {
    return cookieValue && _optionsHash !== objectHash(parse(cookieValue));
  });
  event.node.res.setHeader("set-cookie", [...setCookies, cookieStr]);
}
function deleteCookie(event, name, serializeOptions) {
  setCookie(event, name, "", {
    ...serializeOptions,
    maxAge: 0
  });
}
function splitCookiesString(cookiesString) {
  if (Array.isArray(cookiesString)) {
    return cookiesString.flatMap((c) => splitCookiesString(c));
  }
  if (typeof cookiesString !== "string") {
    return [];
  }
  const cookiesStrings = [];
  let pos = 0;
  let start;
  let ch;
  let lastComma;
  let nextStart;
  let cookiesSeparatorFound;
  const skipWhitespace = () => {
    while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
      pos += 1;
    }
    return pos < cookiesString.length;
  };
  const notSpecialChar = () => {
    ch = cookiesString.charAt(pos);
    return ch !== "=" && ch !== ";" && ch !== ",";
  };
  while (pos < cookiesString.length) {
    start = pos;
    cookiesSeparatorFound = false;
    while (skipWhitespace()) {
      ch = cookiesString.charAt(pos);
      if (ch === ",") {
        lastComma = pos;
        pos += 1;
        skipWhitespace();
        nextStart = pos;
        while (pos < cookiesString.length && notSpecialChar()) {
          pos += 1;
        }
        if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
          cookiesSeparatorFound = true;
          pos = nextStart;
          cookiesStrings.push(cookiesString.slice(start, lastComma));
          start = pos;
        } else {
          pos = lastComma + 1;
        }
      } else {
        pos += 1;
      }
    }
    if (!cookiesSeparatorFound || pos >= cookiesString.length) {
      cookiesStrings.push(cookiesString.slice(start));
    }
  }
  return cookiesStrings;
}

const defer = typeof setImmediate === "undefined" ? (fn) => fn() : setImmediate;
function send(event, data, type) {
  if (type) {
    defaultContentType(event, type);
  }
  return new Promise((resolve) => {
    defer(() => {
      if (!event.handled) {
        event.node.res.end(data);
      }
      resolve();
    });
  });
}
function sendNoContent(event, code) {
  if (event.handled) {
    return;
  }
  if (!code && event.node.res.statusCode !== 200) {
    code = event.node.res.statusCode;
  }
  const _code = sanitizeStatusCode(code, 204);
  if (_code === 204) {
    event.node.res.removeHeader("content-length");
  }
  event.node.res.writeHead(_code);
  event.node.res.end();
}
function setResponseStatus(event, code, text) {
  if (code) {
    event.node.res.statusCode = sanitizeStatusCode(
      code,
      event.node.res.statusCode
    );
  }
  if (text) {
    event.node.res.statusMessage = sanitizeStatusMessage(text);
  }
}
function getResponseStatus(event) {
  return event.node.res.statusCode;
}
function getResponseStatusText(event) {
  return event.node.res.statusMessage;
}
function defaultContentType(event, type) {
  if (type && event.node.res.statusCode !== 304 && !event.node.res.getHeader("content-type")) {
    event.node.res.setHeader("content-type", type);
  }
}
function sendRedirect(event, location, code = 302) {
  event.node.res.statusCode = sanitizeStatusCode(
    code,
    event.node.res.statusCode
  );
  event.node.res.setHeader("location", location);
  const encodedLoc = location.replace(/"/g, "%22");
  const html = `<!DOCTYPE html><html><head><meta http-equiv="refresh" content="0; url=${encodedLoc}"></head></html>`;
  return send(event, html, MIMES.html);
}
function getResponseHeader(event, name) {
  return event.node.res.getHeader(name);
}
function setResponseHeaders(event, headers) {
  for (const [name, value] of Object.entries(headers)) {
    event.node.res.setHeader(
      name,
      value
    );
  }
}
const setHeaders = setResponseHeaders;
function setResponseHeader(event, name, value) {
  event.node.res.setHeader(name, value);
}
function appendResponseHeader(event, name, value) {
  let current = event.node.res.getHeader(name);
  if (!current) {
    event.node.res.setHeader(name, value);
    return;
  }
  if (!Array.isArray(current)) {
    current = [current.toString()];
  }
  event.node.res.setHeader(name, [...current, value]);
}
function removeResponseHeader(event, name) {
  return event.node.res.removeHeader(name);
}
function isStream(data) {
  if (!data || typeof data !== "object") {
    return false;
  }
  if (typeof data.pipe === "function") {
    if (typeof data._read === "function") {
      return true;
    }
    if (typeof data.abort === "function") {
      return true;
    }
  }
  if (typeof data.pipeTo === "function") {
    return true;
  }
  return false;
}
function isWebResponse(data) {
  return typeof Response !== "undefined" && data instanceof Response;
}
function sendStream(event, stream) {
  if (!stream || typeof stream !== "object") {
    throw new Error("[h3] Invalid stream provided.");
  }
  event.node.res._data = stream;
  if (!event.node.res.socket) {
    event._handled = true;
    return Promise.resolve();
  }
  if (hasProp(stream, "pipeTo") && typeof stream.pipeTo === "function") {
    return stream.pipeTo(
      new WritableStream({
        write(chunk) {
          event.node.res.write(chunk);
        }
      })
    ).then(() => {
      event.node.res.end();
    });
  }
  if (hasProp(stream, "pipe") && typeof stream.pipe === "function") {
    return new Promise((resolve, reject) => {
      stream.pipe(event.node.res);
      if (stream.on) {
        stream.on("end", () => {
          event.node.res.end();
          resolve();
        });
        stream.on("error", (error) => {
          reject(error);
        });
      }
      event.node.res.on("close", () => {
        if (stream.abort) {
          stream.abort();
        }
      });
    });
  }
  throw new Error("[h3] Invalid or incompatible stream provided.");
}
function sendWebResponse(event, response) {
  for (const [key, value] of response.headers) {
    if (key === "set-cookie") {
      event.node.res.appendHeader(key, splitCookiesString(value));
    } else {
      event.node.res.setHeader(key, value);
    }
  }
  if (response.status) {
    event.node.res.statusCode = sanitizeStatusCode(
      response.status,
      event.node.res.statusCode
    );
  }
  if (response.statusText) {
    event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  }
  if (response.redirected) {
    event.node.res.setHeader("location", response.url);
  }
  if (!response.body) {
    event.node.res.end();
    return;
  }
  return sendStream(event, response.body);
}

const PayloadMethods = /* @__PURE__ */ new Set(["PATCH", "POST", "PUT", "DELETE"]);
const ignoredHeaders = /* @__PURE__ */ new Set([
  "transfer-encoding",
  "accept-encoding",
  "connection",
  "keep-alive",
  "upgrade",
  "expect",
  "host",
  "accept"
]);
async function proxyRequest(event, target, opts = {}) {
  let body;
  let duplex;
  if (PayloadMethods.has(event.method)) {
    if (opts.streamRequest) {
      body = getRequestWebStream(event);
      duplex = "half";
    } else {
      body = await readRawBody(event, false).catch(() => undefined);
    }
  }
  const method = opts.fetchOptions?.method || event.method;
  const fetchHeaders = mergeHeaders$1(
    getProxyRequestHeaders(event, { host: target.startsWith("/") }),
    opts.fetchOptions?.headers,
    opts.headers
  );
  return sendProxy(event, target, {
    ...opts,
    fetchOptions: {
      method,
      body,
      duplex,
      ...opts.fetchOptions,
      headers: fetchHeaders
    }
  });
}
async function sendProxy(event, target, opts = {}) {
  let response;
  try {
    response = await _getFetch(opts.fetch)(target, {
      headers: opts.headers,
      ignoreResponseError: true,
      // make $ofetch.raw transparent
      ...opts.fetchOptions
    });
  } catch (error) {
    throw createError$1({
      status: 502,
      statusMessage: "Bad Gateway",
      cause: error
    });
  }
  event.node.res.statusCode = sanitizeStatusCode(
    response.status,
    event.node.res.statusCode
  );
  event.node.res.statusMessage = sanitizeStatusMessage(response.statusText);
  const cookies = [];
  for (const [key, value] of response.headers.entries()) {
    if (key === "content-encoding") {
      continue;
    }
    if (key === "content-length") {
      continue;
    }
    if (key === "set-cookie") {
      cookies.push(...splitCookiesString(value));
      continue;
    }
    event.node.res.setHeader(key, value);
  }
  if (cookies.length > 0) {
    event.node.res.setHeader(
      "set-cookie",
      cookies.map((cookie) => {
        if (opts.cookieDomainRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookieDomainRewrite,
            "domain"
          );
        }
        if (opts.cookiePathRewrite) {
          cookie = rewriteCookieProperty(
            cookie,
            opts.cookiePathRewrite,
            "path"
          );
        }
        return cookie;
      })
    );
  }
  if (opts.onResponse) {
    await opts.onResponse(event, response);
  }
  if (response._data !== undefined) {
    return response._data;
  }
  if (event.handled) {
    return;
  }
  if (opts.sendStream === false) {
    const data = new Uint8Array(await response.arrayBuffer());
    return event.node.res.end(data);
  }
  if (response.body) {
    for await (const chunk of response.body) {
      event.node.res.write(chunk);
    }
  }
  return event.node.res.end();
}
function getProxyRequestHeaders(event, opts) {
  const headers = /* @__PURE__ */ Object.create(null);
  const reqHeaders = getRequestHeaders(event);
  for (const name in reqHeaders) {
    if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
      headers[name] = reqHeaders[name];
    }
  }
  return headers;
}
function fetchWithEvent(event, req, init, options) {
  return _getFetch(options?.fetch)(req, {
    ...init,
    context: init?.context || event.context,
    headers: {
      ...getProxyRequestHeaders(event, {
        host: typeof req === "string" && req.startsWith("/")
      }),
      ...init?.headers
    }
  });
}
function _getFetch(_fetch) {
  if (_fetch) {
    return _fetch;
  }
  if (globalThis.fetch) {
    return globalThis.fetch;
  }
  throw new Error(
    "fetch is not available. Try importing `node-fetch-native/polyfill` for Node.js."
  );
}
function rewriteCookieProperty(header, map, property) {
  const _map = typeof map === "string" ? { "*": map } : map;
  return header.replace(
    new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"),
    (match, prefix, previousValue) => {
      let newValue;
      if (previousValue in _map) {
        newValue = _map[previousValue];
      } else if ("*" in _map) {
        newValue = _map["*"];
      } else {
        return match;
      }
      return newValue ? prefix + newValue : "";
    }
  );
}
function mergeHeaders$1(defaults, ...inputs) {
  const _inputs = inputs.filter(Boolean);
  if (_inputs.length === 0) {
    return defaults;
  }
  const merged = new Headers(defaults);
  for (const input of _inputs) {
    for (const [key, value] of Object.entries(input)) {
      if (value !== undefined) {
        merged.set(key, value);
      }
    }
  }
  return merged;
}

class H3Event {
  "__is_event__" = true;
  // Context
  node;
  // Node
  web;
  // Web
  context = {};
  // Shared
  // Request
  _method;
  _path;
  _headers;
  _requestBody;
  // Response
  _handled = false;
  // Hooks
  _onBeforeResponseCalled;
  _onAfterResponseCalled;
  constructor(req, res) {
    this.node = { req, res };
  }
  // --- Request ---
  get method() {
    if (!this._method) {
      this._method = (this.node.req.method || "GET").toUpperCase();
    }
    return this._method;
  }
  get path() {
    return this._path || this.node.req.url || "/";
  }
  get headers() {
    if (!this._headers) {
      this._headers = _normalizeNodeHeaders(this.node.req.headers);
    }
    return this._headers;
  }
  // --- Respoonse ---
  get handled() {
    return this._handled || this.node.res.writableEnded || this.node.res.headersSent;
  }
  respondWith(response) {
    return Promise.resolve(response).then(
      (_response) => sendWebResponse(this, _response)
    );
  }
  // --- Utils ---
  toString() {
    return `[${this.method}] ${this.path}`;
  }
  toJSON() {
    return this.toString();
  }
  // --- Deprecated ---
  /** @deprecated Please use `event.node.req` instead. */
  get req() {
    return this.node.req;
  }
  /** @deprecated Please use `event.node.res` instead. */
  get res() {
    return this.node.res;
  }
}
function isEvent(input) {
  return hasProp(input, "__is_event__");
}
function createEvent(req, res) {
  return new H3Event(req, res);
}
function _normalizeNodeHeaders(nodeHeaders) {
  const headers = new Headers();
  for (const [name, value] of Object.entries(nodeHeaders)) {
    if (Array.isArray(value)) {
      for (const item of value) {
        headers.append(name, item);
      }
    } else if (value) {
      headers.set(name, value);
    }
  }
  return headers;
}

function defineEventHandler(handler) {
  if (typeof handler === "function") {
    handler.__is_handler__ = true;
    return handler;
  }
  const _hooks = {
    onRequest: _normalizeArray(handler.onRequest),
    onBeforeResponse: _normalizeArray(handler.onBeforeResponse)
  };
  const _handler = (event) => {
    return _callHandler(event, handler.handler, _hooks);
  };
  _handler.__is_handler__ = true;
  _handler.__resolve__ = handler.handler.__resolve__;
  _handler.__websocket__ = handler.websocket;
  return _handler;
}
function _normalizeArray(input) {
  return input ? Array.isArray(input) ? input : [input] : undefined;
}
async function _callHandler(event, handler, hooks) {
  if (hooks.onRequest) {
    for (const hook of hooks.onRequest) {
      await hook(event);
      if (event.handled) {
        return;
      }
    }
  }
  const body = await handler(event);
  const response = { body };
  if (hooks.onBeforeResponse) {
    for (const hook of hooks.onBeforeResponse) {
      await hook(event, response);
    }
  }
  return response.body;
}
const eventHandler = defineEventHandler;
function isEventHandler(input) {
  return hasProp(input, "__is_handler__");
}
function toEventHandler(input, _, _route) {
  if (!isEventHandler(input)) {
    console.warn(
      "[h3] Implicit event handler conversion is deprecated. Use `eventHandler()` or `fromNodeMiddleware()` to define event handlers.",
      _route && _route !== "/" ? `
     Route: ${_route}` : "",
      `
     Handler: ${input}`
    );
  }
  return input;
}
function defineLazyEventHandler(factory) {
  let _promise;
  let _resolved;
  const resolveHandler = () => {
    if (_resolved) {
      return Promise.resolve(_resolved);
    }
    if (!_promise) {
      _promise = Promise.resolve(factory()).then((r) => {
        const handler2 = r.default || r;
        if (typeof handler2 !== "function") {
          throw new TypeError(
            "Invalid lazy handler result. It should be a function:",
            handler2
          );
        }
        _resolved = { handler: toEventHandler(r.default || r) };
        return _resolved;
      });
    }
    return _promise;
  };
  const handler = eventHandler((event) => {
    if (_resolved) {
      return _resolved.handler(event);
    }
    return resolveHandler().then((r) => r.handler(event));
  });
  handler.__resolve__ = resolveHandler;
  return handler;
}
const lazyEventHandler = defineLazyEventHandler;

function createApp(options = {}) {
  const stack = [];
  const handler = createAppEventHandler(stack, options);
  const resolve = createResolver(stack);
  handler.__resolve__ = resolve;
  const getWebsocket = cachedFn(() => websocketOptions(resolve, options));
  const app = {
    // @ts-expect-error
    use: (arg1, arg2, arg3) => use(app, arg1, arg2, arg3),
    resolve,
    handler,
    stack,
    options,
    get websocket() {
      return getWebsocket();
    }
  };
  return app;
}
function use(app, arg1, arg2, arg3) {
  if (Array.isArray(arg1)) {
    for (const i of arg1) {
      use(app, i, arg2, arg3);
    }
  } else if (Array.isArray(arg2)) {
    for (const i of arg2) {
      use(app, arg1, i, arg3);
    }
  } else if (typeof arg1 === "string") {
    app.stack.push(
      normalizeLayer({ ...arg3, route: arg1, handler: arg2 })
    );
  } else if (typeof arg1 === "function") {
    app.stack.push(normalizeLayer({ ...arg2, handler: arg1 }));
  } else {
    app.stack.push(normalizeLayer({ ...arg1 }));
  }
  return app;
}
function createAppEventHandler(stack, options) {
  const spacing = options.debug ? 2 : undefined;
  return eventHandler(async (event) => {
    event.node.req.originalUrl = event.node.req.originalUrl || event.node.req.url || "/";
    const _reqPath = event._path || event.node.req.url || "/";
    let _layerPath;
    if (options.onRequest) {
      await options.onRequest(event);
    }
    for (const layer of stack) {
      if (layer.route.length > 1) {
        if (!_reqPath.startsWith(layer.route)) {
          continue;
        }
        _layerPath = _reqPath.slice(layer.route.length) || "/";
      } else {
        _layerPath = _reqPath;
      }
      if (layer.match && !layer.match(_layerPath, event)) {
        continue;
      }
      event._path = _layerPath;
      event.node.req.url = _layerPath;
      const val = await layer.handler(event);
      const _body = val === undefined ? undefined : await val;
      if (_body !== undefined) {
        const _response = { body: _body };
        if (options.onBeforeResponse) {
          event._onBeforeResponseCalled = true;
          await options.onBeforeResponse(event, _response);
        }
        await handleHandlerResponse(event, _response.body, spacing);
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, _response);
        }
        return;
      }
      if (event.handled) {
        if (options.onAfterResponse) {
          event._onAfterResponseCalled = true;
          await options.onAfterResponse(event, undefined);
        }
        return;
      }
    }
    if (!event.handled) {
      throw createError$1({
        statusCode: 404,
        statusMessage: `Cannot find any path matching ${event.path || "/"}.`
      });
    }
    if (options.onAfterResponse) {
      event._onAfterResponseCalled = true;
      await options.onAfterResponse(event, undefined);
    }
  });
}
function createResolver(stack) {
  return async (path) => {
    let _layerPath;
    for (const layer of stack) {
      if (layer.route === "/" && !layer.handler.__resolve__) {
        continue;
      }
      if (!path.startsWith(layer.route)) {
        continue;
      }
      _layerPath = path.slice(layer.route.length) || "/";
      if (layer.match && !layer.match(_layerPath, undefined)) {
        continue;
      }
      let res = { route: layer.route, handler: layer.handler };
      if (res.handler.__resolve__) {
        const _res = await res.handler.__resolve__(_layerPath);
        if (!_res) {
          continue;
        }
        res = {
          ...res,
          ..._res,
          route: joinURL(res.route || "/", _res.route || "/")
        };
      }
      return res;
    }
  };
}
function normalizeLayer(input) {
  let handler = input.handler;
  if (handler.handler) {
    handler = handler.handler;
  }
  if (input.lazy) {
    handler = lazyEventHandler(handler);
  } else if (!isEventHandler(handler)) {
    handler = toEventHandler(handler, undefined, input.route);
  }
  return {
    route: withoutTrailingSlash(input.route),
    match: input.match,
    handler
  };
}
function handleHandlerResponse(event, val, jsonSpace) {
  if (val === null) {
    return sendNoContent(event);
  }
  if (val) {
    if (isWebResponse(val)) {
      return sendWebResponse(event, val);
    }
    if (isStream(val)) {
      return sendStream(event, val);
    }
    if (val.buffer) {
      return send(event, val);
    }
    if (val.arrayBuffer && typeof val.arrayBuffer === "function") {
      return val.arrayBuffer().then((arrayBuffer) => {
        return send(event, Buffer.from(arrayBuffer), val.type);
      });
    }
    if (val instanceof Error) {
      throw createError$1(val);
    }
    if (typeof val.end === "function") {
      return true;
    }
  }
  const valType = typeof val;
  if (valType === "string") {
    return send(event, val, MIMES.html);
  }
  if (valType === "object" || valType === "boolean" || valType === "number") {
    return send(event, JSON.stringify(val, undefined, jsonSpace), MIMES.json);
  }
  if (valType === "bigint") {
    return send(event, val.toString(), MIMES.json);
  }
  throw createError$1({
    statusCode: 500,
    statusMessage: `[h3] Cannot send ${valType} as response.`
  });
}
function cachedFn(fn) {
  let cache;
  return () => {
    if (!cache) {
      cache = fn();
    }
    return cache;
  };
}
function websocketOptions(evResolver, appOptions) {
  return {
    ...appOptions.websocket,
    async resolve(info) {
      const url = info.request?.url || info.url || "/";
      const { pathname } = typeof url === "string" ? parseURL(url) : url;
      const resolved = await evResolver(pathname);
      return resolved?.handler?.__websocket__ || {};
    }
  };
}

const RouterMethods = [
  "connect",
  "delete",
  "get",
  "head",
  "options",
  "post",
  "put",
  "trace",
  "patch"
];
function createRouter(opts = {}) {
  const _router = createRouter$1({});
  const routes = {};
  let _matcher;
  const router = {};
  const addRoute = (path, handler, method) => {
    let route = routes[path];
    if (!route) {
      routes[path] = route = { path, handlers: {} };
      _router.insert(path, route);
    }
    if (Array.isArray(method)) {
      for (const m of method) {
        addRoute(path, handler, m);
      }
    } else {
      route.handlers[method] = toEventHandler(handler, undefined, path);
    }
    return router;
  };
  router.use = router.add = (path, handler, method) => addRoute(path, handler, method || "all");
  for (const method of RouterMethods) {
    router[method] = (path, handle) => router.add(path, handle, method);
  }
  const matchHandler = (path = "/", method = "get") => {
    const qIndex = path.indexOf("?");
    if (qIndex !== -1) {
      path = path.slice(0, Math.max(0, qIndex));
    }
    const matched = _router.lookup(path);
    if (!matched || !matched.handlers) {
      return {
        error: createError$1({
          statusCode: 404,
          name: "Not Found",
          statusMessage: `Cannot find any route matching ${path || "/"}.`
        })
      };
    }
    let handler = matched.handlers[method] || matched.handlers.all;
    if (!handler) {
      if (!_matcher) {
        _matcher = toRouteMatcher(_router);
      }
      const _matches = _matcher.matchAll(path).reverse();
      for (const _match of _matches) {
        if (_match.handlers[method]) {
          handler = _match.handlers[method];
          matched.handlers[method] = matched.handlers[method] || handler;
          break;
        }
        if (_match.handlers.all) {
          handler = _match.handlers.all;
          matched.handlers.all = matched.handlers.all || handler;
          break;
        }
      }
    }
    if (!handler) {
      return {
        error: createError$1({
          statusCode: 405,
          name: "Method Not Allowed",
          statusMessage: `Method ${method} is not allowed on this route.`
        })
      };
    }
    return { matched, handler };
  };
  const isPreemptive = opts.preemptive || opts.preemtive;
  router.handler = eventHandler((event) => {
    const match = matchHandler(
      event.path,
      event.method.toLowerCase()
    );
    if ("error" in match) {
      if (isPreemptive) {
        throw match.error;
      } else {
        return;
      }
    }
    event.context.matchedRoute = match.matched;
    const params = match.matched.params || {};
    event.context.params = params;
    return Promise.resolve(match.handler(event)).then((res) => {
      if (res === undefined && isPreemptive) {
        return null;
      }
      return res;
    });
  });
  router.handler.__resolve__ = async (path) => {
    path = withLeadingSlash(path);
    const match = matchHandler(path);
    if ("error" in match) {
      return;
    }
    let res = {
      route: match.matched.path,
      handler: match.handler
    };
    if (match.handler.__resolve__) {
      const _res = await match.handler.__resolve__(path);
      if (!_res) {
        return;
      }
      res = { ...res, ..._res };
    }
    return res;
  };
  return router;
}
function toNodeListener(app) {
  const toNodeHandle = async function(req, res) {
    const event = createEvent(req, res);
    try {
      await app.handler(event);
    } catch (_error) {
      const error = createError$1(_error);
      if (!isError(_error)) {
        error.unhandled = true;
      }
      setResponseStatus(event, error.statusCode, error.statusMessage);
      if (app.options.onError) {
        await app.options.onError(error, event);
      }
      if (event.handled) {
        return;
      }
      if (error.unhandled || error.fatal) {
        console.error("[h3]", error.fatal ? "[fatal]" : "[unhandled]", error);
      }
      if (app.options.onBeforeResponse && !event._onBeforeResponseCalled) {
        await app.options.onBeforeResponse(event, { body: error });
      }
      await sendError(event, error, !!app.options.debug);
      if (app.options.onAfterResponse && !event._onAfterResponseCalled) {
        await app.options.onAfterResponse(event, { body: error });
      }
    }
  };
  return toNodeHandle;
}

function flatHooks(configHooks, hooks = {}, parentName) {
  for (const key in configHooks) {
    const subHook = configHooks[key];
    const name = parentName ? `${parentName}:${key}` : key;
    if (typeof subHook === "object" && subHook !== null) {
      flatHooks(subHook, hooks, name);
    } else if (typeof subHook === "function") {
      hooks[name] = subHook;
    }
  }
  return hooks;
}
const defaultTask = { run: (function_) => function_() };
const _createTask = () => defaultTask;
const createTask = typeof console.createTask !== "undefined" ? console.createTask : _createTask;
function serialTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return hooks.reduce(
    (promise, hookFunction) => promise.then(() => task.run(() => hookFunction(...args))),
    Promise.resolve()
  );
}
function parallelTaskCaller(hooks, args) {
  const name = args.shift();
  const task = createTask(name);
  return Promise.all(hooks.map((hook) => task.run(() => hook(...args))));
}
function callEachWith(callbacks, arg0) {
  for (const callback of [...callbacks]) {
    callback(arg0);
  }
}

class Hookable {
  constructor() {
    this._hooks = {};
    this._before = undefined;
    this._after = undefined;
    this._deprecatedMessages = undefined;
    this._deprecatedHooks = {};
    this.hook = this.hook.bind(this);
    this.callHook = this.callHook.bind(this);
    this.callHookWith = this.callHookWith.bind(this);
  }
  hook(name, function_, options = {}) {
    if (!name || typeof function_ !== "function") {
      return () => {
      };
    }
    const originalName = name;
    let dep;
    while (this._deprecatedHooks[name]) {
      dep = this._deprecatedHooks[name];
      name = dep.to;
    }
    if (dep && !options.allowDeprecated) {
      let message = dep.message;
      if (!message) {
        message = `${originalName} hook has been deprecated` + (dep.to ? `, please use ${dep.to}` : "");
      }
      if (!this._deprecatedMessages) {
        this._deprecatedMessages = /* @__PURE__ */ new Set();
      }
      if (!this._deprecatedMessages.has(message)) {
        console.warn(message);
        this._deprecatedMessages.add(message);
      }
    }
    if (!function_.name) {
      try {
        Object.defineProperty(function_, "name", {
          get: () => "_" + name.replace(/\W+/g, "_") + "_hook_cb",
          configurable: true
        });
      } catch {
      }
    }
    this._hooks[name] = this._hooks[name] || [];
    this._hooks[name].push(function_);
    return () => {
      if (function_) {
        this.removeHook(name, function_);
        function_ = undefined;
      }
    };
  }
  hookOnce(name, function_) {
    let _unreg;
    let _function = (...arguments_) => {
      if (typeof _unreg === "function") {
        _unreg();
      }
      _unreg = undefined;
      _function = undefined;
      return function_(...arguments_);
    };
    _unreg = this.hook(name, _function);
    return _unreg;
  }
  removeHook(name, function_) {
    if (this._hooks[name]) {
      const index = this._hooks[name].indexOf(function_);
      if (index !== -1) {
        this._hooks[name].splice(index, 1);
      }
      if (this._hooks[name].length === 0) {
        delete this._hooks[name];
      }
    }
  }
  deprecateHook(name, deprecated) {
    this._deprecatedHooks[name] = typeof deprecated === "string" ? { to: deprecated } : deprecated;
    const _hooks = this._hooks[name] || [];
    delete this._hooks[name];
    for (const hook of _hooks) {
      this.hook(name, hook);
    }
  }
  deprecateHooks(deprecatedHooks) {
    Object.assign(this._deprecatedHooks, deprecatedHooks);
    for (const name in deprecatedHooks) {
      this.deprecateHook(name, deprecatedHooks[name]);
    }
  }
  addHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    const removeFns = Object.keys(hooks).map(
      (key) => this.hook(key, hooks[key])
    );
    return () => {
      for (const unreg of removeFns.splice(0, removeFns.length)) {
        unreg();
      }
    };
  }
  removeHooks(configHooks) {
    const hooks = flatHooks(configHooks);
    for (const key in hooks) {
      this.removeHook(key, hooks[key]);
    }
  }
  removeAllHooks() {
    for (const key in this._hooks) {
      delete this._hooks[key];
    }
  }
  callHook(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(serialTaskCaller, name, ...arguments_);
  }
  callHookParallel(name, ...arguments_) {
    arguments_.unshift(name);
    return this.callHookWith(parallelTaskCaller, name, ...arguments_);
  }
  callHookWith(caller, name, ...arguments_) {
    const event = this._before || this._after ? { name, args: arguments_, context: {} } : undefined;
    if (this._before) {
      callEachWith(this._before, event);
    }
    const result = caller(
      name in this._hooks ? [...this._hooks[name]] : [],
      arguments_
    );
    if (result instanceof Promise) {
      return result.finally(() => {
        if (this._after && event) {
          callEachWith(this._after, event);
        }
      });
    }
    if (this._after && event) {
      callEachWith(this._after, event);
    }
    return result;
  }
  beforeEach(function_) {
    this._before = this._before || [];
    this._before.push(function_);
    return () => {
      if (this._before !== undefined) {
        const index = this._before.indexOf(function_);
        if (index !== -1) {
          this._before.splice(index, 1);
        }
      }
    };
  }
  afterEach(function_) {
    this._after = this._after || [];
    this._after.push(function_);
    return () => {
      if (this._after !== undefined) {
        const index = this._after.indexOf(function_);
        if (index !== -1) {
          this._after.splice(index, 1);
        }
      }
    };
  }
}
function createHooks() {
  return new Hookable();
}

const s=globalThis.Headers,i=globalThis.AbortController,l=globalThis.fetch||(()=>{throw new Error("[node-fetch-native] Failed to fetch: `globalThis.fetch` is not available!")});

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : undefined
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === undefined) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function resolveFetchOptions(request, input, defaults, Headers) {
  const headers = mergeHeaders(
    input?.headers ?? request?.headers,
    defaults?.headers,
    Headers
  );
  let query;
  if (defaults?.query || defaults?.params || input?.params || input?.query) {
    query = {
      ...defaults?.params,
      ...defaults?.query,
      ...input?.params,
      ...input?.query
    };
  }
  return {
    ...defaults,
    ...input,
    query,
    params: query,
    headers
  };
}
function mergeHeaders(input, defaults, Headers) {
  if (!defaults) {
    return new Headers(input);
  }
  const headers = new Headers(defaults);
  if (input) {
    for (const [key, value] of Symbol.iterator in input || Array.isArray(input) ? input : new Headers(input)) {
      headers.set(key, value);
    }
  }
  return headers;
}
async function callHooks(context, hooks) {
  if (hooks) {
    if (Array.isArray(hooks)) {
      for (const hook of hooks) {
        await hook(context);
      }
    } else {
      await hooks(context);
    }
  }
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early (Experimental)
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  // Gateway Timeout
]);
const nullBodyResponses$1 = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch$1(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = typeof context.options.retryDelay === "function" ? context.options.retryDelay(context) : context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: resolveFetchOptions(
        _request,
        _options,
        globalOptions.defaults,
        Headers
      ),
      response: undefined,
      error: undefined
    };
    if (context.options.method) {
      context.options.method = context.options.method.toUpperCase();
    }
    if (context.options.onRequest) {
      await callHooks(context, context.options.onRequest);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query) {
        context.request = withQuery(context.request, context.options.query);
        delete context.options.query;
      }
      if ("query" in context.options) {
        delete context.options.query;
      }
      if ("params" in context.options) {
        delete context.options.params;
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    let abortTimeout;
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      abortTimeout = setTimeout(() => {
        const error = new Error(
          "[TimeoutError]: The operation was aborted due to timeout"
        );
        error.name = "TimeoutError";
        error.code = 23;
        controller.abort(error);
      }, context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await callHooks(
          context,
          context.options.onRequestError
        );
      }
      return await onError(context);
    } finally {
      if (abortTimeout) {
        clearTimeout(abortTimeout);
      }
    }
    const hasBody = (context.response.body || // https://github.com/unjs/ofetch/issues/324
    // https://github.com/unjs/ofetch/issues/294
    // https://github.com/JakeChampion/fetch/issues/1454
    context.response._bodyInit) && !nullBodyResponses$1.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body || context.response._bodyInit;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await callHooks(
        context,
        context.options.onResponse
      );
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await callHooks(
          context,
          context.options.onResponseError
        );
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}, customGlobalOptions = {}) => createFetch$1({
    ...globalOptions,
    ...customGlobalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...customGlobalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return l;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new http.Agent(agentOptions);
  const httpsAgent = new https.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return l(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch = globalThis.fetch ? (...args) => globalThis.fetch(...args) : createNodeFetch();
const Headers$1 = globalThis.Headers || s;
const AbortController = globalThis.AbortController || i;
const ofetch = createFetch$1({ fetch, Headers: Headers$1, AbortController });
const $fetch$1 = ofetch;

const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createCall(handle) {
  return function callHandle(context) {
    const req = new IncomingMessage();
    const res = new ServerResponse(req);
    req.url = context.url || "/";
    req.method = context.method || "GET";
    req.headers = {};
    if (context.headers) {
      const headerEntries = typeof context.headers.entries === "function" ? context.headers.entries() : Object.entries(context.headers);
      for (const [name, value] of headerEntries) {
        if (!value) {
          continue;
        }
        req.headers[name.toLowerCase()] = value;
      }
    }
    req.headers.host = req.headers.host || context.host || "localhost";
    req.connection.encrypted = // @ts-ignore
    req.connection.encrypted || context.protocol === "https";
    req.body = context.body || null;
    req.__unenv__ = context.context;
    return handle(req, res).then(() => {
      let body = res._data;
      if (nullBodyResponses.has(res.statusCode) || req.method.toUpperCase() === "HEAD") {
        body = null;
        delete res._headers["content-length"];
      }
      const r = {
        body,
        headers: res._headers,
        status: res.statusCode,
        statusText: res.statusMessage
      };
      req.destroy();
      res.destroy();
      return r;
    });
  };
}

function createFetch(call, _fetch = global.fetch) {
  return async function ufetch(input, init) {
    const url = input.toString();
    if (!url.startsWith("/")) {
      return _fetch(url, init);
    }
    try {
      const r = await call({ url, ...init });
      return new Response(r.body, {
        status: r.status,
        statusText: r.statusText,
        headers: Object.fromEntries(
          Object.entries(r.headers).map(([name, value]) => [
            name,
            Array.isArray(value) ? value.join(",") : String(value) || ""
          ])
        )
      });
    } catch (error) {
      return new Response(error.toString(), {
        status: Number.parseInt(error.statusCode || error.code) || 500,
        statusText: error.statusText
      });
    }
  };
}

function hasReqHeader(event, name, includes) {
  const value = getRequestHeader(event, name);
  return value && typeof value === "string" && value.toLowerCase().includes(includes);
}
function isJsonRequest(event) {
  if (hasReqHeader(event, "accept", "text/html")) {
    return false;
  }
  return hasReqHeader(event, "accept", "application/json") || hasReqHeader(event, "user-agent", "curl/") || hasReqHeader(event, "user-agent", "httpie/") || hasReqHeader(event, "sec-fetch-mode", "cors") || event.path.startsWith("/api/") || event.path.endsWith(".json");
}
function normalizeError(error, isDev) {
  const cwd = typeof process.cwd === "function" ? process.cwd() : "/";
  const stack = (error.unhandled || error.fatal) ? [] : (error.stack || "").split("\n").splice(1).filter((line) => line.includes("at ")).map((line) => {
    const text = line.replace(cwd + "/", "./").replace("webpack:/", "").replace("file://", "").trim();
    return {
      text,
      internal: line.includes("node_modules") && !line.includes(".cache") || line.includes("internal") || line.includes("new Promise")
    };
  });
  const statusCode = error.statusCode || 500;
  const statusMessage = error.statusMessage ?? (statusCode === 404 ? "Not Found" : "");
  const message = error.unhandled ? "internal server error" : error.message || error.toString();
  return {
    stack,
    statusCode,
    statusMessage,
    message
  };
}
function _captureError(error, type) {
  console.error(`[nitro] [${type}]`, error);
  useNitroApp().captureError(error, { tags: [type] });
}
function trapUnhandledNodeErrors() {
  process.on(
    "unhandledRejection",
    (error) => _captureError(error, "unhandledRejection")
  );
  process.on(
    "uncaughtException",
    (error) => _captureError(error, "uncaughtException")
  );
}
function joinHeaders(value) {
  return Array.isArray(value) ? value.join(", ") : String(value);
}
function normalizeFetchResponse(response) {
  if (!response.headers.has("set-cookie")) {
    return response;
  }
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: normalizeCookieHeaders(response.headers)
  });
}
function normalizeCookieHeader(header = "") {
  return splitCookiesString(joinHeaders(header));
}
function normalizeCookieHeaders(headers) {
  const outgoingHeaders = new Headers();
  for (const [name, header] of headers) {
    if (name === "set-cookie") {
      for (const cookie of normalizeCookieHeader(header)) {
        outgoingHeaders.append("set-cookie", cookie);
      }
    } else {
      outgoingHeaders.set(name, joinHeaders(header));
    }
  }
  return outgoingHeaders;
}

const errorHandler = (async function errorhandler(error, event) {
  const { stack, statusCode, statusMessage, message } = normalizeError(error);
  const errorObject = {
    url: event.path,
    statusCode,
    statusMessage,
    message,
    stack: "",
    // TODO: check and validate error.data for serialisation into query
    data: error.data
  };
  if (error.unhandled || error.fatal) {
    const tags = [
      "[nuxt]",
      "[request error]",
      error.unhandled && "[unhandled]",
      error.fatal && "[fatal]",
      Number(errorObject.statusCode) !== 200 && `[${errorObject.statusCode}]`
    ].filter(Boolean).join(" ");
    console.error(tags, (error.message || error.toString() || "internal server error") + "\n" + stack.map((l) => "  " + l.text).join("  \n"));
  }
  if (event.handled) {
    return;
  }
  setResponseStatus(event, errorObject.statusCode !== 200 && errorObject.statusCode || 500, errorObject.statusMessage);
  if (isJsonRequest(event)) {
    setResponseHeader(event, "Content-Type", "application/json");
    return send(event, JSON.stringify(errorObject));
  }
  const reqHeaders = getRequestHeaders(event);
  const isRenderingError = event.path.startsWith("/__nuxt_error") || !!reqHeaders["x-nuxt-error"];
  const res = isRenderingError ? null : await useNitroApp().localFetch(
    withQuery(joinURL(useRuntimeConfig(event).app.baseURL, "/__nuxt_error"), errorObject),
    {
      headers: { ...reqHeaders, "x-nuxt-error": "true" },
      redirect: "manual"
    }
  ).catch(() => null);
  if (!res) {
    const { template } = await import('../_/error-500.mjs');
    if (event.handled) {
      return;
    }
    setResponseHeader(event, "Content-Type", "text/html;charset=UTF-8");
    return send(event, template(errorObject));
  }
  const html = await res.text();
  if (event.handled) {
    return;
  }
  for (const [header, value] of res.headers.entries()) {
    setResponseHeader(event, header, value);
  }
  setResponseStatus(event, res.status && res.status !== 200 ? res.status : undefined, res.statusText);
  return send(event, html);
});

const script = "\"use strict\";(()=>{const t=window,e=document.documentElement,c=[\"dark\",\"light\"],n=getStorageValue(\"localStorage\",\"nuxt-color-mode\")||\"system\";let i=n===\"system\"?u():n;const r=e.getAttribute(\"data-color-mode-forced\");r&&(i=r),l(i),t[\"__NUXT_COLOR_MODE__\"]={preference:n,value:i,getColorScheme:u,addColorScheme:l,removeColorScheme:d};function l(o){const s=\"\"+o+\"-mode\",a=\"\";e.classList?e.classList.add(s):e.className+=\" \"+s,a&&e.setAttribute(\"data-\"+a,o)}function d(o){const s=\"\"+o+\"-mode\",a=\"\";e.classList?e.classList.remove(s):e.className=e.className.replace(new RegExp(s,\"g\"),\"\"),a&&e.removeAttribute(\"data-\"+a)}function f(o){return t.matchMedia(\"(prefers-color-scheme\"+o+\")\")}function u(){if(t.matchMedia&&f(\"\").media!==\"not all\"){for(const o of c)if(f(\":\"+o).matches)return o}return\"light\"}})();function getStorageValue(t,e){switch(t){case\"localStorage\":return window.localStorage.getItem(e);case\"sessionStorage\":return window.sessionStorage.getItem(e);case\"cookie\":return getCookie(e);default:return null}}function getCookie(t){const c=(\"; \"+window.document.cookie).split(\"; \"+t+\"=\");if(c.length===2)return c.pop()?.split(\";\").shift()}";

const _6vKgLYr0WN = (function(nitro) {
  nitro.hooks.hook("render:html", (htmlContext) => {
    htmlContext.head.push(`<script>${script}<\/script>`);
  });
});

function defineNitroPlugin(def) {
  return def;
}

const _1mRKugVBZY = defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hook("render:html", (html, { event }) => {
    html.head.push(`<meta name="description" content="My custom description" />`);
  });
  nitroApp.hooks.hook("render:response", (response, { event }) => {
  });
});

const plugins = [
  _6vKgLYr0WN,
_1mRKugVBZY
];

const assets$1 = {
  "/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"2804-5qw4DnhfCXtj9+oV+cp2in3tUEs\"",
    "mtime": "2025-01-17T07:22:59.353Z",
    "size": 10244,
    "path": "../public/.DS_Store"
  },
  "/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"10be-nsD/biBjMyAiLueBR8vZfNmKcVg\"",
    "mtime": "2025-01-17T07:22:59.353Z",
    "size": 4286,
    "path": "../public/favicon.ico"
  },
  "/lib/auto-render.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"dbf-KGD+1PxcGAxcdwehcr+eZAixVfg\"",
    "mtime": "2025-01-17T07:22:59.202Z",
    "size": 3519,
    "path": "../public/lib/auto-render.min.js"
  },
  "/lib/busuanzi.pure.mini.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"797-JO596ST5TEuMGwi8V4iQEUofYEc\"",
    "mtime": "2025-01-17T07:22:59.217Z",
    "size": 1943,
    "path": "../public/lib/busuanzi.pure.mini.js"
  },
  "/lib/katex.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3ee7d-DMeOqBpmwCc4OaIsln4Vj8XHFIc\"",
    "mtime": "2025-01-17T07:22:59.218Z",
    "size": 257661,
    "path": "../public/lib/katex.min.js"
  },
  "/lib/mermaid.esm.min.mjs": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6288-O3Q61iOWOl6ILgbRQ5mLPf6eWrE\"",
    "mtime": "2025-01-17T07:22:59.217Z",
    "size": 25224,
    "path": "../public/lib/mermaid.esm.min.mjs"
  },
  "/lib/owo.json": {
    "type": "application/json",
    "etag": "\"17bd-cUyp1ZcgHqLIsX2eYjWS1PvTSl4\"",
    "mtime": "2025-01-17T07:22:59.216Z",
    "size": 6077,
    "path": "../public/lib/owo.json"
  },
  "/lib/twikoo.all.min.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"884f9-R8VfaLSQaHUWF8ZZ3Kn9nKxORl0\"",
    "mtime": "2025-01-17T07:22:59.221Z",
    "size": 558329,
    "path": "../public/lib/twikoo.all.min.js"
  },
  "/_nuxt/2Efg2yYO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b4-h9CMFyIF9wHCWADy3bZjT6R1YAo\"",
    "mtime": "2025-01-17T07:22:59.159Z",
    "size": 180,
    "path": "../public/_nuxt/2Efg2yYO.js"
  },
  "/_nuxt/2e2AfzR8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"27e-JwmyZHnA34lRJfc+ZfLcolhW3Xo\"",
    "mtime": "2025-01-17T07:22:59.159Z",
    "size": 638,
    "path": "../public/_nuxt/2e2AfzR8.js"
  },
  "/_nuxt/3LvaNghn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ba-Sl/Wnc4t23c3ny7NhCHK3qmf1wo\"",
    "mtime": "2025-01-17T07:22:59.159Z",
    "size": 442,
    "path": "../public/_nuxt/3LvaNghn.js"
  },
  "/_nuxt/8hJbfLBQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b4-b1+UysPem+H53KsrbDVO0YApzZ4\"",
    "mtime": "2025-01-17T07:22:59.159Z",
    "size": 180,
    "path": "../public/_nuxt/8hJbfLBQ.js"
  },
  "/_nuxt/AVK0HYnN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15747-zTDIFveS6KCZfRcvIxcC6kMJzGg\"",
    "mtime": "2025-01-17T07:22:59.160Z",
    "size": 87879,
    "path": "../public/_nuxt/AVK0HYnN.js"
  },
  "/_nuxt/B-Y7AaQD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"64-9pqwZABQyAj1LO6jOdVTATKCaLA\"",
    "mtime": "2025-01-17T07:22:59.159Z",
    "size": 100,
    "path": "../public/_nuxt/B-Y7AaQD.js"
  },
  "/_nuxt/B3isGyip.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"261-RWnYvFhhu5hva0RH0Q5NFA5Etxo\"",
    "mtime": "2025-01-17T07:22:59.159Z",
    "size": 609,
    "path": "../public/_nuxt/B3isGyip.js"
  },
  "/_nuxt/B7VJyA3u.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e176-Qngbdj06tLePswlFvWPk2JN3iCg\"",
    "mtime": "2025-01-17T07:22:59.160Z",
    "size": 57718,
    "path": "../public/_nuxt/B7VJyA3u.js"
  },
  "/_nuxt/BAvJ3V8z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e61-rer6wQAVoHDzWptitwBGvbi38UQ\"",
    "mtime": "2025-01-17T07:22:59.160Z",
    "size": 3681,
    "path": "../public/_nuxt/BAvJ3V8z.js"
  },
  "/_nuxt/BFATLUmG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"991-O+lq4ZQ7uG0waA+2AcxPUjRtTQI\"",
    "mtime": "2025-01-17T07:22:59.160Z",
    "size": 2449,
    "path": "../public/_nuxt/BFATLUmG.js"
  },
  "/_nuxt/BHRSvgfr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"876-Sb5KKxCr/6q/wZJ+F+GeT/u77f8\"",
    "mtime": "2025-01-17T07:22:59.160Z",
    "size": 2166,
    "path": "../public/_nuxt/BHRSvgfr.js"
  },
  "/_nuxt/BKG9mm3U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"7c1a-DTvvnxCLI0rkmPRMIEiJk3M95qg\"",
    "mtime": "2025-01-17T07:22:59.160Z",
    "size": 31770,
    "path": "../public/_nuxt/BKG9mm3U.js"
  },
  "/_nuxt/BLZ4AfLi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1d8-cU8Rd78xmqTDIzNn1yZjbsxs8Uc\"",
    "mtime": "2025-01-17T07:22:59.160Z",
    "size": 472,
    "path": "../public/_nuxt/BLZ4AfLi.js"
  },
  "/_nuxt/BMwJCpTE.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"14d-pMVju9IuFCcVlPTM4ML2Q0dl77c\"",
    "mtime": "2025-01-17T07:22:59.160Z",
    "size": 333,
    "path": "../public/_nuxt/BMwJCpTE.js"
  },
  "/_nuxt/BOLmu-zQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"141-Sj4HwlM/6wMCQRLD/FdUytBtS0g\"",
    "mtime": "2025-01-17T07:22:59.160Z",
    "size": 321,
    "path": "../public/_nuxt/BOLmu-zQ.js"
  },
  "/_nuxt/BORV-KD-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"815-XrEjEtaU9myrufuG+JtG4CYSdrc\"",
    "mtime": "2025-01-17T07:22:59.161Z",
    "size": 2069,
    "path": "../public/_nuxt/BORV-KD-.js"
  },
  "/_nuxt/BPS7UhIu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a07-koXri7OeDq/edj4+s3SV/3cLdLA\"",
    "mtime": "2025-01-17T07:22:59.161Z",
    "size": 2567,
    "path": "../public/_nuxt/BPS7UhIu.js"
  },
  "/_nuxt/BRNRgs2g.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"18a9b-BSQdPFGlx8jZU0igecEcchnfmGo\"",
    "mtime": "2025-01-17T07:22:59.161Z",
    "size": 101019,
    "path": "../public/_nuxt/BRNRgs2g.js"
  },
  "/_nuxt/BSQFPvEN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"36c-hF+0y3lLws8Lp9j6/nMjWSRQbGM\"",
    "mtime": "2025-01-17T07:22:59.161Z",
    "size": 876,
    "path": "../public/_nuxt/BSQFPvEN.js"
  },
  "/_nuxt/BS_oKxsZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"9743-dHS0bjudLeRYaUGjNS0wAeDIVvo\"",
    "mtime": "2025-01-17T07:22:59.161Z",
    "size": 38723,
    "path": "../public/_nuxt/BS_oKxsZ.js"
  },
  "/_nuxt/BWiBbTGa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"142d-rPhAGeef9AxRudYpsEyaF3Jm004\"",
    "mtime": "2025-01-17T07:22:59.161Z",
    "size": 5165,
    "path": "../public/_nuxt/BWiBbTGa.js"
  },
  "/_nuxt/BWsW_nfW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"841a-+K8RNJwzZtZSJItFq4AHIP+oPb4\"",
    "mtime": "2025-01-17T07:22:59.161Z",
    "size": 33818,
    "path": "../public/_nuxt/BWsW_nfW.js"
  },
  "/_nuxt/BaC5rtnu.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1fe-EosReehjvl3iYKDp+oMnoJUEKqQ\"",
    "mtime": "2025-01-17T07:22:59.161Z",
    "size": 510,
    "path": "../public/_nuxt/BaC5rtnu.js"
  },
  "/_nuxt/BgIFEIxQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5c58-ul3WiTDqu0U/Fb9z34iCd4ytuGo\"",
    "mtime": "2025-01-17T07:22:59.162Z",
    "size": 23640,
    "path": "../public/_nuxt/BgIFEIxQ.js"
  },
  "/_nuxt/BkCoDxPO.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"176-J3L7hcIfTh5wvscfXt2mpnE3bEc\"",
    "mtime": "2025-01-17T07:22:59.162Z",
    "size": 374,
    "path": "../public/_nuxt/BkCoDxPO.js"
  },
  "/_nuxt/BlSA3a6n.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b8-PSf7NFtd2M6hQveTqOX0gm7P0Ys\"",
    "mtime": "2025-01-17T07:22:59.162Z",
    "size": 184,
    "path": "../public/_nuxt/BlSA3a6n.js"
  },
  "/_nuxt/BmuA9RyM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1325-Snh0UNzI3ZFbdq7S7wEClKW1OIg\"",
    "mtime": "2025-01-17T07:22:59.162Z",
    "size": 4901,
    "path": "../public/_nuxt/BmuA9RyM.js"
  },
  "/_nuxt/BofqTti0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b7-galfLvsTeIvodiwf2QpT4XUervM\"",
    "mtime": "2025-01-17T07:22:59.162Z",
    "size": 183,
    "path": "../public/_nuxt/BofqTti0.js"
  },
  "/_nuxt/BuG_uJH1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b4-tZZHDITvOsormtsSway6T8IoyMM\"",
    "mtime": "2025-01-17T07:22:59.162Z",
    "size": 180,
    "path": "../public/_nuxt/BuG_uJH1.js"
  },
  "/_nuxt/By0mbI1J.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b7-GaIU/mlxZ5JvWyVBiOLhyOZCY5g\"",
    "mtime": "2025-01-17T07:22:59.162Z",
    "size": 183,
    "path": "../public/_nuxt/By0mbI1J.js"
  },
  "/_nuxt/C1-6wjvC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b3-G8H6zV65C4lRCWq/KEdvYAZtTaU\"",
    "mtime": "2025-01-17T07:22:59.162Z",
    "size": 179,
    "path": "../public/_nuxt/C1-6wjvC.js"
  },
  "/_nuxt/C3K81tr8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b4-KwREw394dG+/ydVQtD/UKNqLzHk\"",
    "mtime": "2025-01-17T07:22:59.162Z",
    "size": 180,
    "path": "../public/_nuxt/C3K81tr8.js"
  },
  "/_nuxt/C6zWapoB.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"49c-FEhwBteZg64vGRgvPJm2Om6NfNk\"",
    "mtime": "2025-01-17T07:22:59.162Z",
    "size": 1180,
    "path": "../public/_nuxt/C6zWapoB.js"
  },
  "/_nuxt/C7Gwgu9z.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"bc-HWnLvYjrkEAsZZWzPNX+SrBC+KE\"",
    "mtime": "2025-01-17T07:22:59.162Z",
    "size": 188,
    "path": "../public/_nuxt/C7Gwgu9z.js"
  },
  "/_nuxt/C9vD4Dkv.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"36af9-kZiW4voy/xVTGBI317TYV8SaLM0\"",
    "mtime": "2025-01-17T07:22:59.163Z",
    "size": 223993,
    "path": "../public/_nuxt/C9vD4Dkv.js"
  },
  "/_nuxt/CE_Pb0eD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"23f90-vTKusR087yX6oHzY45FtfWa73i4\"",
    "mtime": "2025-01-17T07:22:59.163Z",
    "size": 147344,
    "path": "../public/_nuxt/CE_Pb0eD.js"
  },
  "/_nuxt/CF-qHkKr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1b4-xCxBEgd2jFZKGmJeMD+OmAHB3T8\"",
    "mtime": "2025-01-17T07:22:59.163Z",
    "size": 436,
    "path": "../public/_nuxt/CF-qHkKr.js"
  },
  "/_nuxt/CGaugkOI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11d-ugOpb95uA55T5tmy3NiOIOd1rV0\"",
    "mtime": "2025-01-17T07:22:59.163Z",
    "size": 285,
    "path": "../public/_nuxt/CGaugkOI.js"
  },
  "/_nuxt/CIGw4hNa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"efc1-o40MXw8vDHN4IrXjIo1kg1fmoKM\"",
    "mtime": "2025-01-17T07:22:59.163Z",
    "size": 61377,
    "path": "../public/_nuxt/CIGw4hNa.js"
  },
  "/_nuxt/CKENkWA3.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d55-CqH4KVY7hg606UkokXYgAyHjMB8\"",
    "mtime": "2025-01-17T07:22:59.164Z",
    "size": 3413,
    "path": "../public/_nuxt/CKENkWA3.js"
  },
  "/_nuxt/CLKqlC66.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"590-H+7XOgIZnJ7NpXyLv+VtsQt3kRg\"",
    "mtime": "2025-01-17T07:22:59.163Z",
    "size": 1424,
    "path": "../public/_nuxt/CLKqlC66.js"
  },
  "/_nuxt/CRJsM4TN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"565e-edIZlz1ZtL7NgXP494078Vum3bo\"",
    "mtime": "2025-01-17T07:22:59.164Z",
    "size": 22110,
    "path": "../public/_nuxt/CRJsM4TN.js"
  },
  "/_nuxt/CVcjQLsc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"141-bg8igsCFcLkERWhcwR3kNciKtCg\"",
    "mtime": "2025-01-17T07:22:59.163Z",
    "size": 321,
    "path": "../public/_nuxt/CVcjQLsc.js"
  },
  "/_nuxt/CWS_N8Wa.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2ec-4JIV3lrSECGZwvKjHxCogsweNK0\"",
    "mtime": "2025-01-17T07:22:59.163Z",
    "size": 748,
    "path": "../public/_nuxt/CWS_N8Wa.js"
  },
  "/_nuxt/CWYMSl_f.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6d646-ghZbdrhuFMq1ts+94FU1/+zQ0AU\"",
    "mtime": "2025-01-17T07:22:59.164Z",
    "size": 448070,
    "path": "../public/_nuxt/CWYMSl_f.js"
  },
  "/_nuxt/CahfrvdL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"115-JFc98sMukTup/nf0fdG3tK42wH0\"",
    "mtime": "2025-01-17T07:22:59.164Z",
    "size": 277,
    "path": "../public/_nuxt/CahfrvdL.js"
  },
  "/_nuxt/Ccbek5Km.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ba-v5soGeHzZpaqUwq2ZzLBGx4TiU0\"",
    "mtime": "2025-01-17T07:22:59.164Z",
    "size": 442,
    "path": "../public/_nuxt/Ccbek5Km.js"
  },
  "/_nuxt/Ccm97YYe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"295e-gi8242YNxgGLi80bXFp2Xo3X8L4\"",
    "mtime": "2025-01-17T07:22:59.164Z",
    "size": 10590,
    "path": "../public/_nuxt/Ccm97YYe.js"
  },
  "/_nuxt/Ch_af2Y8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11a-ehq+1uW1AC4c1LpfCvBnmNuSh2I\"",
    "mtime": "2025-01-17T07:22:59.164Z",
    "size": 282,
    "path": "../public/_nuxt/Ch_af2Y8.js"
  },
  "/_nuxt/Cizhu0pJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b4-mVvE/FPTNwSORD5BJeOYItjbQ4c\"",
    "mtime": "2025-01-17T07:22:59.164Z",
    "size": 180,
    "path": "../public/_nuxt/Cizhu0pJ.js"
  },
  "/_nuxt/ClAa2E0D.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1709-6oS8DSWbEYqSjVYB3h5J8V5xJn8\"",
    "mtime": "2025-01-17T07:22:59.165Z",
    "size": 5897,
    "path": "../public/_nuxt/ClAa2E0D.js"
  },
  "/_nuxt/CmKTTxBW.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4a0-QhSTpwVjrC/PVWv/HHlzrTsQTiE\"",
    "mtime": "2025-01-17T07:22:59.165Z",
    "size": 1184,
    "path": "../public/_nuxt/CmKTTxBW.js"
  },
  "/_nuxt/CmQMFW7U.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"90-dXaaUOVFp9AcmnD0FzFEzdhfAi0\"",
    "mtime": "2025-01-17T07:22:59.167Z",
    "size": 144,
    "path": "../public/_nuxt/CmQMFW7U.js"
  },
  "/_nuxt/CnKSLFfw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"64-S3TBpEm4KtNjaZIQaCfRBwo4UxU\"",
    "mtime": "2025-01-17T07:22:59.165Z",
    "size": 100,
    "path": "../public/_nuxt/CnKSLFfw.js"
  },
  "/_nuxt/CnUJRWxz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"168e4c-k2BDp5r2lGxdW8j3IBIuKZt9pB8\"",
    "mtime": "2025-01-17T07:22:59.168Z",
    "size": 1478220,
    "path": "../public/_nuxt/CnUJRWxz.js"
  },
  "/_nuxt/Cr8wTb1G.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"29-bkaVI0DwSR3/Gxs2oTThevGbET0\"",
    "mtime": "2025-01-17T07:22:59.165Z",
    "size": 41,
    "path": "../public/_nuxt/Cr8wTb1G.js"
  },
  "/_nuxt/CrqKzF-a.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6016-Z3wD2fU/K6EKJSqEIufVDgfSdwE\"",
    "mtime": "2025-01-17T07:22:59.165Z",
    "size": 24598,
    "path": "../public/_nuxt/CrqKzF-a.js"
  },
  "/_nuxt/Csf_GJ5y.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2e73-o6IueyP5jtXB3KJ8DjPsiy9qYiE\"",
    "mtime": "2025-01-17T07:22:59.165Z",
    "size": 11891,
    "path": "../public/_nuxt/Csf_GJ5y.js"
  },
  "/_nuxt/CwiiREhY.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"116-LKEKtAeOZSJDNz/kLS3SjNDexuY\"",
    "mtime": "2025-01-17T07:22:59.165Z",
    "size": 278,
    "path": "../public/_nuxt/CwiiREhY.js"
  },
  "/_nuxt/CxYJgpPD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"458-rBNOfCragTlh0QGii9bhiWp3LHc\"",
    "mtime": "2025-01-17T07:22:59.166Z",
    "size": 1112,
    "path": "../public/_nuxt/CxYJgpPD.js"
  },
  "/_nuxt/CzCWZJdJ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11c52-d0YHJWngDeTyB5SiWoxiXuh5flE\"",
    "mtime": "2025-01-17T07:22:59.166Z",
    "size": 72786,
    "path": "../public/_nuxt/CzCWZJdJ.js"
  },
  "/_nuxt/Czva7_gc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"115-fnk8j+blggLOQp+Jn6CQciiy2IE\"",
    "mtime": "2025-01-17T07:22:59.166Z",
    "size": 277,
    "path": "../public/_nuxt/Czva7_gc.js"
  },
  "/_nuxt/D1KeaoRR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11d-4FgehDV5NB84TBKd/jndmgQH6Uw\"",
    "mtime": "2025-01-17T07:22:59.166Z",
    "size": 285,
    "path": "../public/_nuxt/D1KeaoRR.js"
  },
  "/_nuxt/D37boqFX.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"48-eU5qhtpjCRTq6ApKCJ3uBzpHfZU\"",
    "mtime": "2025-01-17T07:22:59.166Z",
    "size": 72,
    "path": "../public/_nuxt/D37boqFX.js"
  },
  "/_nuxt/D3RnfYIV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"64-m3bPhdrEi3pr8ofmADtswB7aldE\"",
    "mtime": "2025-01-17T07:22:59.166Z",
    "size": 100,
    "path": "../public/_nuxt/D3RnfYIV.js"
  },
  "/_nuxt/D3suyk0B.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6009-qCIcQsOSUfJwDm4XORc3RPCEjKI\"",
    "mtime": "2025-01-17T07:22:59.167Z",
    "size": 24585,
    "path": "../public/_nuxt/D3suyk0B.js"
  },
  "/_nuxt/D75EazHI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b4-k4NDxCvIPkQ3mTPG88dzo+23RjY\"",
    "mtime": "2025-01-17T07:22:59.167Z",
    "size": 180,
    "path": "../public/_nuxt/D75EazHI.js"
  },
  "/_nuxt/D9lxrxPU.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11c-gMk6o+F6YmryCewo9gA10A6fKLo\"",
    "mtime": "2025-01-17T07:22:59.167Z",
    "size": 284,
    "path": "../public/_nuxt/D9lxrxPU.js"
  },
  "/_nuxt/DB3RPV4F.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"aaf8-q6CI96X9n+BvQ21I4LuhMeY7KGw\"",
    "mtime": "2025-01-17T07:22:59.167Z",
    "size": 43768,
    "path": "../public/_nuxt/DB3RPV4F.js"
  },
  "/_nuxt/DEqITEo7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"188-8UobN1uJWXcsJeqKSZ8LZbZj1Jw\"",
    "mtime": "2025-01-17T07:22:59.167Z",
    "size": 392,
    "path": "../public/_nuxt/DEqITEo7.js"
  },
  "/_nuxt/DEyNyIsc.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1be-O4ifmGnOySkNjIBhg7I3Q+CnBA8\"",
    "mtime": "2025-01-17T07:22:59.167Z",
    "size": 446,
    "path": "../public/_nuxt/DEyNyIsc.js"
  },
  "/_nuxt/DI5n5LUF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"ecc-qqToSlDqFCUifJaa4L/xf+nHc5Q\"",
    "mtime": "2025-01-17T07:22:59.168Z",
    "size": 3788,
    "path": "../public/_nuxt/DI5n5LUF.js"
  },
  "/_nuxt/DI7dJB5x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5d8-BL3EaiM09lqpgcZy8DQKb6yIhXI\"",
    "mtime": "2025-01-17T07:22:59.168Z",
    "size": 1496,
    "path": "../public/_nuxt/DI7dJB5x.js"
  },
  "/_nuxt/DLWoUYZf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"454-q5pHKOfciQxfTmmfyCrYlf544Qk\"",
    "mtime": "2025-01-17T07:22:59.168Z",
    "size": 1108,
    "path": "../public/_nuxt/DLWoUYZf.js"
  },
  "/_nuxt/DLkRYTBt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"12e-0u57azzdYW9lwqh4TqOUYrDmc1k\"",
    "mtime": "2025-01-17T07:22:59.168Z",
    "size": 302,
    "path": "../public/_nuxt/DLkRYTBt.js"
  },
  "/_nuxt/DM5yBEQG.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"111fe-B7A957MA047zaHyqdrfr2ucZ0A4\"",
    "mtime": "2025-01-17T07:22:59.168Z",
    "size": 70142,
    "path": "../public/_nuxt/DM5yBEQG.js"
  },
  "/_nuxt/DPtBQMxV.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"c65-q0WGJ6Ko8+OYzwQuuBeBpZxWBEo\"",
    "mtime": "2025-01-17T07:22:59.169Z",
    "size": 3173,
    "path": "../public/_nuxt/DPtBQMxV.js"
  },
  "/_nuxt/DYASzpzn.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"141-bg8igsCFcLkERWhcwR3kNciKtCg\"",
    "mtime": "2025-01-17T07:22:59.169Z",
    "size": 321,
    "path": "../public/_nuxt/DYASzpzn.js"
  },
  "/_nuxt/DafVeun8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b4-bMBUuVPMc4rlAQQofsiB9Ct6q4o\"",
    "mtime": "2025-01-17T07:22:59.168Z",
    "size": 180,
    "path": "../public/_nuxt/DafVeun8.js"
  },
  "/_nuxt/DflRGzc_.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b6-SZoj4k95BHORt/UG7qgpXwxXWvk\"",
    "mtime": "2025-01-17T07:22:59.168Z",
    "size": 182,
    "path": "../public/_nuxt/DflRGzc_.js"
  },
  "/_nuxt/DgEVTt-c.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5040-VZr7Nm6pXKaroszT3lIHYzKw4Wk\"",
    "mtime": "2025-01-17T07:22:59.169Z",
    "size": 20544,
    "path": "../public/_nuxt/DgEVTt-c.js"
  },
  "/_nuxt/DkqDCrPp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2baf-5onYoI7yNBGmV24CpawwJUzthYk\"",
    "mtime": "2025-01-17T07:22:59.169Z",
    "size": 11183,
    "path": "../public/_nuxt/DkqDCrPp.js"
  },
  "/_nuxt/DltAdu5j.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2b6-rVLs8ufwEuXO2ebfRNz+o9sYLUo\"",
    "mtime": "2025-01-17T07:22:59.169Z",
    "size": 694,
    "path": "../public/_nuxt/DltAdu5j.js"
  },
  "/_nuxt/Dm1bDDA2.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b4-UXmLgccMp8mAG6wWe2v89OE817w\"",
    "mtime": "2025-01-17T07:22:59.169Z",
    "size": 180,
    "path": "../public/_nuxt/Dm1bDDA2.js"
  },
  "/_nuxt/DmCPPwvt.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b4-PiIMB985i9G7ezoginua4RAW44k\"",
    "mtime": "2025-01-17T07:22:59.169Z",
    "size": 180,
    "path": "../public/_nuxt/DmCPPwvt.js"
  },
  "/_nuxt/Dn15p5vD.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"180-wHKdaHc3f3+xpimReJ9eoMv9qIg\"",
    "mtime": "2025-01-17T07:22:59.169Z",
    "size": 384,
    "path": "../public/_nuxt/Dn15p5vD.js"
  },
  "/_nuxt/Doh-ppXK.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b4-ip9QHlVsFMGyY9RW1RNrYWHCXOg\"",
    "mtime": "2025-01-17T07:22:59.170Z",
    "size": 180,
    "path": "../public/_nuxt/Doh-ppXK.js"
  },
  "/_nuxt/DpWgIx6d.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ba-XYpph1QtcpTk2kguqwpPyLWYoA8\"",
    "mtime": "2025-01-17T07:22:59.170Z",
    "size": 442,
    "path": "../public/_nuxt/DpWgIx6d.js"
  },
  "/_nuxt/DqA1STMI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b0f-/np+DSIxUNdJWovYzKkp3KNCYMk\"",
    "mtime": "2025-01-17T07:22:59.170Z",
    "size": 2831,
    "path": "../public/_nuxt/DqA1STMI.js"
  },
  "/_nuxt/DqMC6dhr.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"349-UXSLJjRjSMNez6MVv1/mvZKLeNY\"",
    "mtime": "2025-01-17T07:22:59.170Z",
    "size": 841,
    "path": "../public/_nuxt/DqMC6dhr.js"
  },
  "/_nuxt/DsRl141T.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"af-PFaC7rRfxCXs0wCNkWbikYhS4Jc\"",
    "mtime": "2025-01-17T07:22:59.170Z",
    "size": 175,
    "path": "../public/_nuxt/DsRl141T.js"
  },
  "/_nuxt/DtCw6g_C.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"99-qb3izb6N19AKIBP77MJ0e5WZ+Zc\"",
    "mtime": "2025-01-17T07:22:59.170Z",
    "size": 153,
    "path": "../public/_nuxt/DtCw6g_C.js"
  },
  "/_nuxt/Dv5SB44s.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1446-3tDjqFRy5ZoB4RFpt+kn5cZYgDE\"",
    "mtime": "2025-01-17T07:22:59.170Z",
    "size": 5190,
    "path": "../public/_nuxt/Dv5SB44s.js"
  },
  "/_nuxt/DvJV_L36.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5d-xO3lF6h8ZxQkdBAmmT8fYDUts3Y\"",
    "mtime": "2025-01-17T07:22:59.171Z",
    "size": 93,
    "path": "../public/_nuxt/DvJV_L36.js"
  },
  "/_nuxt/DwVInUO0.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5908-7fxKHXrigtW58BM12pWEB7U0fzE\"",
    "mtime": "2025-01-17T07:22:59.170Z",
    "size": 22792,
    "path": "../public/_nuxt/DwVInUO0.js"
  },
  "/_nuxt/DwYbJ0YF.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"2a0-/9yQvlSW/56yMmV+/LDs90cvN/Q\"",
    "mtime": "2025-01-17T07:22:59.170Z",
    "size": 672,
    "path": "../public/_nuxt/DwYbJ0YF.js"
  },
  "/_nuxt/DxZS_loI.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1fa-xK/TUDcWy9vElOvrDF77eqlT9hM\"",
    "mtime": "2025-01-17T07:22:59.171Z",
    "size": 506,
    "path": "../public/_nuxt/DxZS_loI.js"
  },
  "/_nuxt/DzPQzHNq.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"66679-Zv4ogqUyxEfyZTCPI67jlwNutBE\"",
    "mtime": "2025-01-17T07:22:59.171Z",
    "size": 419449,
    "path": "../public/_nuxt/DzPQzHNq.js"
  },
  "/_nuxt/E8E_w1Wi.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ba-Xw7vsPjDfcTaOf7FdYWPHvkB2JU\"",
    "mtime": "2025-01-17T07:22:59.170Z",
    "size": 442,
    "path": "../public/_nuxt/E8E_w1Wi.js"
  },
  "/_nuxt/FJMW-dmM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"56-RNd2bS1ntipQ6RvlyTQ4o9KdfGQ\"",
    "mtime": "2025-01-17T07:22:59.171Z",
    "size": 86,
    "path": "../public/_nuxt/FJMW-dmM.js"
  },
  "/_nuxt/FirstChild.Dw0kPyE5.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"179-qzCUeIAAs8G9urmiHPLiMweUu98\"",
    "mtime": "2025-01-17T07:22:59.171Z",
    "size": 377,
    "path": "../public/_nuxt/FirstChild.Dw0kPyE5.css"
  },
  "/_nuxt/Gi6I4Gst.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"93-Ddd4j0nL7FejgC/2FVPkAQwObCg\"",
    "mtime": "2025-01-17T07:22:59.171Z",
    "size": 147,
    "path": "../public/_nuxt/Gi6I4Gst.js"
  },
  "/_nuxt/HU7gyXu9.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d53-bJWCCEVyqGtXk+4qz0LG8yBFovc\"",
    "mtime": "2025-01-17T07:22:59.172Z",
    "size": 3411,
    "path": "../public/_nuxt/HU7gyXu9.js"
  },
  "/_nuxt/Hyi3tpM6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"40c1b-hhgvAQrgp/hMbCC3t93cARY0Qy8\"",
    "mtime": "2025-01-17T07:22:59.172Z",
    "size": 265243,
    "path": "../public/_nuxt/Hyi3tpM6.js"
  },
  "/_nuxt/Mermaid.DEVcIlfL.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"252-uRH5znVkf0Znk44anWxDdw1Yv7A\"",
    "mtime": "2025-01-17T07:22:59.171Z",
    "size": 594,
    "path": "../public/_nuxt/Mermaid.DEVcIlfL.css"
  },
  "/_nuxt/OH1KEOlo.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"a04-RiD//VP+VdKyOGUNigzwBE/EZe8\"",
    "mtime": "2025-01-17T07:22:59.171Z",
    "size": 2564,
    "path": "../public/_nuxt/OH1KEOlo.js"
  },
  "/_nuxt/ProseCode.D585ImtF.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"19-u/QU2/A1MxW58UKXF2AJ0+moS6Y\"",
    "mtime": "2025-01-17T07:22:59.171Z",
    "size": 25,
    "path": "../public/_nuxt/ProseCode.D585ImtF.css"
  },
  "/_nuxt/ProseTable.B9KdEJ6R.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"248-uYI6DI55zITltcLs4VwYLZvE94w\"",
    "mtime": "2025-01-17T07:22:59.172Z",
    "size": 584,
    "path": "../public/_nuxt/ProseTable.B9KdEJ6R.css"
  },
  "/_nuxt/RLNgUAGN.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"11d-JVhb37q2v+5c6L4yNlRFCHFOhb8\"",
    "mtime": "2025-01-17T07:22:59.172Z",
    "size": 285,
    "path": "../public/_nuxt/RLNgUAGN.js"
  },
  "/_nuxt/RoJBPlIh.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"fcf1d-vRLtzQZyPksNR4zPUZlXnAcERe4\"",
    "mtime": "2025-01-17T07:22:59.175Z",
    "size": 1036061,
    "path": "../public/_nuxt/RoJBPlIh.js"
  },
  "/_nuxt/SaQFlxSM.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"5c0-kqo8pQHYNJCPZzeoVavvLi5FaVk\"",
    "mtime": "2025-01-17T07:22:59.172Z",
    "size": 1472,
    "path": "../public/_nuxt/SaQFlxSM.js"
  },
  "/_nuxt/Translate.CMz2BtXw.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"45-EckauSXS5gdZpUv03VSn13+dPII\"",
    "mtime": "2025-01-17T07:22:59.172Z",
    "size": 69,
    "path": "../public/_nuxt/Translate.CMz2BtXw.css"
  },
  "/_nuxt/UGGCoJOf.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"e6-n+lYMUoKibnOVkwTm/Upl5kaaVA\"",
    "mtime": "2025-01-17T07:22:59.172Z",
    "size": 230,
    "path": "../public/_nuxt/UGGCoJOf.js"
  },
  "/_nuxt/XafSfNz1.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"3199-3jXrRUKgFzkbN3bboTZB+m1JcM8\"",
    "mtime": "2025-01-17T07:22:59.173Z",
    "size": 12697,
    "path": "../public/_nuxt/XafSfNz1.js"
  },
  "/_nuxt/XebsAfsj.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"15cc-te1/LWU5rLQ1o/CTq41rBhrbB20\"",
    "mtime": "2025-01-17T07:22:59.173Z",
    "size": 5580,
    "path": "../public/_nuxt/XebsAfsj.js"
  },
  "/_nuxt/YI8IgXWQ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6426-y0f+cegUXLS/ORW4wdRCT+pBL6k\"",
    "mtime": "2025-01-17T07:22:59.173Z",
    "size": 25638,
    "path": "../public/_nuxt/YI8IgXWQ.js"
  },
  "/_nuxt/_...Dh2YT2RB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"2277-AgFh4lEggEW6d1mmVOtYZTpLkJk\"",
    "mtime": "2025-01-17T07:22:59.173Z",
    "size": 8823,
    "path": "../public/_nuxt/_...Dh2YT2RB.css"
  },
  "/_nuxt/archives.CEZbQfBT.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"336-3pSY7t4tp+ibee5B2jfbbuojl0k\"",
    "mtime": "2025-01-17T07:22:59.173Z",
    "size": 822,
    "path": "../public/_nuxt/archives.CEZbQfBT.css"
  },
  "/_nuxt/azyRCYbz.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"19c-yTE42naKXlrl8R/gkVOs+GVCKnk\"",
    "mtime": "2025-01-17T07:22:59.173Z",
    "size": 412,
    "path": "../public/_nuxt/azyRCYbz.js"
  },
  "/_nuxt/cyq0ncO7.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"17c-5uZRnjbOxGCS+jkmlCi5Sn26lyI\"",
    "mtime": "2025-01-17T07:22:59.174Z",
    "size": 380,
    "path": "../public/_nuxt/cyq0ncO7.js"
  },
  "/_nuxt/default.Bh19NxIm.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"326-6Y9tyl80eBV+wu/+78lZ0jt+vNQ\"",
    "mtime": "2025-01-17T07:22:59.174Z",
    "size": 806,
    "path": "../public/_nuxt/default.Bh19NxIm.css"
  },
  "/_nuxt/dheu8l3x.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"214b-UryjInQVLo2d5hvYsktNIDCyW1Q\"",
    "mtime": "2025-01-17T07:22:59.174Z",
    "size": 8523,
    "path": "../public/_nuxt/dheu8l3x.js"
  },
  "/_nuxt/e_gj_eN8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"23c1-FitlLHhI0W6hGDm7FWFrsoSy+bY\"",
    "mtime": "2025-01-17T07:22:59.174Z",
    "size": 9153,
    "path": "../public/_nuxt/e_gj_eN8.js"
  },
  "/_nuxt/entry.DMIBGjP6.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"b4-0UNZh0Og27GzyJA2LtEjqAwca7U\"",
    "mtime": "2025-01-17T07:22:59.175Z",
    "size": 180,
    "path": "../public/_nuxt/entry.DMIBGjP6.css"
  },
  "/_nuxt/error-404.Ba11UN-y.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"de4-XdHS6zO6smXevBMadJV/PZ3UPls\"",
    "mtime": "2025-01-17T07:22:59.174Z",
    "size": 3556,
    "path": "../public/_nuxt/error-404.Ba11UN-y.css"
  },
  "/_nuxt/error-500.CiL2nOmw.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"75c-K0wt3OWIorW+/DwxOdVh1UAhv8g\"",
    "mtime": "2025-01-17T07:22:59.175Z",
    "size": 1884,
    "path": "../public/_nuxt/error-500.CiL2nOmw.css"
  },
  "/_nuxt/g4ZAnvEp.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"55c6-uHV2OkRx5wJBICLnCyb8T0qy/xE\"",
    "mtime": "2025-01-17T07:22:59.175Z",
    "size": 21958,
    "path": "../public/_nuxt/g4ZAnvEp.js"
  },
  "/_nuxt/iTiR4liC.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"6a00-Fv8Ht8fBjgPV2YrzHtcji9etLqQ\"",
    "mtime": "2025-01-17T07:22:59.175Z",
    "size": 27136,
    "path": "../public/_nuxt/iTiR4liC.js"
  },
  "/_nuxt/index.Do5ziaES.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"60b-OplVD2i8vk7pUjiMRVnaT8tb31E\"",
    "mtime": "2025-01-17T07:22:59.175Z",
    "size": 1547,
    "path": "../public/_nuxt/index.Do5ziaES.css"
  },
  "/_nuxt/index.Dy7iXTYn.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"26a-bEz/kP7lQ3yfB2/mpvL1PxCz0Fg\"",
    "mtime": "2025-01-17T07:22:59.175Z",
    "size": 618,
    "path": "../public/_nuxt/index.Dy7iXTYn.css"
  },
  "/_nuxt/kKvjN2sZ.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"4ad-QRdydh5NZQx22eRG/ur2f03wnOY\"",
    "mtime": "2025-01-17T07:22:59.176Z",
    "size": 1197,
    "path": "../public/_nuxt/kKvjN2sZ.js"
  },
  "/_nuxt/kjAeH3H6.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b4-J6FnMtDGdzYWreJ1ZkHGIxfEPe4\"",
    "mtime": "2025-01-17T07:22:59.175Z",
    "size": 180,
    "path": "../public/_nuxt/kjAeH3H6.js"
  },
  "/_nuxt/lrSXhkDl.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"48ea4-JCTdFgzK50yhJvjBTR+e8kZ4C3w\"",
    "mtime": "2025-01-17T07:22:59.176Z",
    "size": 298660,
    "path": "../public/_nuxt/lrSXhkDl.js"
  },
  "/_nuxt/mZUIDDEL.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"85f5-yIrs0WYdPgO1QlMJt3KrZ3H41WU\"",
    "mtime": "2025-01-17T07:22:59.176Z",
    "size": 34293,
    "path": "../public/_nuxt/mZUIDDEL.js"
  },
  "/_nuxt/nezL6nGw.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"276-vlCyFuS3yitLhmNVzddGMQ5SkYU\"",
    "mtime": "2025-01-17T07:22:59.177Z",
    "size": 630,
    "path": "../public/_nuxt/nezL6nGw.js"
  },
  "/_nuxt/page-header.B5y0kguB.css": {
    "type": "text/css; charset=utf-8",
    "etag": "\"1f8f-45F1nbMxJdZqJcPNnbSAPYBBE4o\"",
    "mtime": "2025-01-17T07:22:59.176Z",
    "size": 8079,
    "path": "../public/_nuxt/page-header.B5y0kguB.css"
  },
  "/_nuxt/pgwMu3ei.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"113-q+7klCpXTDhd20wPKRn0LUYi4Tg\"",
    "mtime": "2025-01-17T07:22:59.176Z",
    "size": 275,
    "path": "../public/_nuxt/pgwMu3ei.js"
  },
  "/_nuxt/saPVZKVR.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"1ba-euw8IjYxL3lLCo9JZ1jpO4r9KME\"",
    "mtime": "2025-01-17T07:22:59.176Z",
    "size": 442,
    "path": "../public/_nuxt/saPVZKVR.js"
  },
  "/_nuxt/v1Xl9Gd-.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"d0-fQqS6b5D2LodT1qThPYuWGLdevc\"",
    "mtime": "2025-01-17T07:22:59.176Z",
    "size": 208,
    "path": "../public/_nuxt/v1Xl9Gd-.js"
  },
  "/_nuxt/voIKLLK8.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"b4-0Fml3gmtqgrWIALQWu4t50U+/u8\"",
    "mtime": "2025-01-17T07:22:59.176Z",
    "size": 180,
    "path": "../public/_nuxt/voIKLLK8.js"
  },
  "/_nuxt/wPfsAOPe.js": {
    "type": "text/javascript; charset=utf-8",
    "etag": "\"367-ZAiIXzLIhfr/+tnIEfPrQSCn3M4\"",
    "mtime": "2025-01-17T07:22:59.176Z",
    "size": 871,
    "path": "../public/_nuxt/wPfsAOPe.js"
  },
  "/img/.DS_Store": {
    "type": "text/plain; charset=utf-8",
    "etag": "\"3804-5XMvfCaLICKjCNAj2vhcfv9tOIg\"",
    "mtime": "2025-01-17T07:22:59.202Z",
    "size": 14340,
    "path": "../public/img/.DS_Store"
  },
  "/img/1.png": {
    "type": "image/png",
    "etag": "\"53458-+K+RBSUOzSwwohlvb0zlO55i65Q\"",
    "mtime": "2025-01-17T07:22:59.249Z",
    "size": 341080,
    "path": "../public/img/1.png"
  },
  "/img/20200601.png": {
    "type": "image/png",
    "etag": "\"26e4-3BK7XyOLUesOD/zlJllPCQCs8cc\"",
    "mtime": "2025-01-17T07:22:59.247Z",
    "size": 9956,
    "path": "../public/img/20200601.png"
  },
  "/img/20200609.jpg": {
    "type": "image/jpeg",
    "etag": "\"8944-SfGXoej/CWIhbjVNRxE9cG6IYVw\"",
    "mtime": "2025-01-17T07:22:59.248Z",
    "size": 35140,
    "path": "../public/img/20200609.jpg"
  },
  "/img/20201124032511.png": {
    "type": "image/png",
    "etag": "\"1efc-xN0CXAwfLPdCTAOJeSr9LpAfe3k\"",
    "mtime": "2025-01-17T07:22:59.217Z",
    "size": 7932,
    "path": "../public/img/20201124032511.png"
  },
  "/img/20211117.png": {
    "type": "image/png",
    "etag": "\"3858-osWLAh4oETWg/qXVf50CF8oc+ro\"",
    "mtime": "2025-01-17T07:22:59.218Z",
    "size": 14424,
    "path": "../public/img/20211117.png"
  },
  "/img/4fanhuidingbucheng.png": {
    "type": "image/png",
    "etag": "\"1649-Gel5rovjRYTcJelCUSmaS+kinac\"",
    "mtime": "2025-01-17T07:22:59.218Z",
    "size": 5705,
    "path": "../public/img/4fanhuidingbucheng.png"
  },
  "/img/ChromeExtensions.png": {
    "type": "image/png",
    "etag": "\"149a2-mtW34jxZdsgRGvj01W4NOf7w9kQ\"",
    "mtime": "2025-01-17T07:22:59.221Z",
    "size": 84386,
    "path": "../public/img/ChromeExtensions.png"
  },
  "/img/ChromeExtensionsHeader.png": {
    "type": "image/png",
    "etag": "\"81c8-WfIs8XHeucGC80g9bEKuf1g4zv8\"",
    "mtime": "2025-01-17T07:22:59.221Z",
    "size": 33224,
    "path": "../public/img/ChromeExtensionsHeader.png"
  },
  "/img/GitHub.png": {
    "type": "image/png",
    "etag": "\"22f9-ZB7sWM5YLyIx5sleeGaHeVryWLg\"",
    "mtime": "2025-01-17T07:22:59.221Z",
    "size": 8953,
    "path": "../public/img/GitHub.png"
  },
  "/img/QQ.png": {
    "type": "image/png",
    "etag": "\"28a9-e2dNO+W2BdbJi7YYDZ1udqfmTZI\"",
    "mtime": "2025-01-17T07:22:59.219Z",
    "size": 10409,
    "path": "../public/img/QQ.png"
  },
  "/img/a-bijibenbiji.png": {
    "type": "image/png",
    "etag": "\"1204-AyDi3KzmiVHtlcv5/IEkzAk0d14\"",
    "mtime": "2025-01-17T07:22:59.221Z",
    "size": 4612,
    "path": "../public/img/a-bijibenbiji.png"
  },
  "/img/action-scope-header.jpg": {
    "type": "image/jpeg",
    "etag": "\"1743e-zIDEAiA8rKW04SF2qEB0HAg2oTw\"",
    "mtime": "2025-01-17T07:22:59.222Z",
    "size": 95294,
    "path": "../public/img/action-scope-header.jpg"
  },
  "/img/action-scope.jpg": {
    "type": "image/jpeg",
    "etag": "\"24b17-UpCiqUoQXQ9L5nyy0OikxjzOgFM\"",
    "mtime": "2025-01-17T07:22:59.222Z",
    "size": 150295,
    "path": "../public/img/action-scope.jpg"
  },
  "/img/article.png": {
    "type": "image/png",
    "etag": "\"683-JkOvFQVKoYE0UHzFEUGODWgMdss\"",
    "mtime": "2025-01-17T07:22:59.221Z",
    "size": 1667,
    "path": "../public/img/article.png"
  },
  "/img/avatar.jpg": {
    "type": "image/jpeg",
    "etag": "\"12fc3-S4+KBofoVp4Xppl5zwjawPeYvTc\"",
    "mtime": "2025-01-17T07:22:59.222Z",
    "size": 77763,
    "path": "../public/img/avatar.jpg"
  },
  "/img/chart-bg.png": {
    "type": "image/png",
    "etag": "\"948c-h8bOtGAe4t04XITuJOQCZILUU28\"",
    "mtime": "2025-01-17T07:22:59.222Z",
    "size": 38028,
    "path": "../public/img/chart-bg.png"
  },
  "/img/clock.svg": {
    "type": "image/svg+xml",
    "etag": "\"1951-eAKd8GV/0etyWJtTUNqQPt0BzCo\"",
    "mtime": "2025-01-17T07:22:59.223Z",
    "size": 6481,
    "path": "../public/img/clock.svg"
  },
  "/img/code-header.jpg": {
    "type": "image/jpeg",
    "etag": "\"16532-7S0vKqnoMYcDhBfSrJuZ1ShJJx0\"",
    "mtime": "2025-01-17T07:22:59.224Z",
    "size": 91442,
    "path": "../public/img/code-header.jpg"
  },
  "/img/code.jpg": {
    "type": "image/jpeg",
    "etag": "\"30a1c-gTTLfbK81Nc/1X3NUTzVfZ87SM0\"",
    "mtime": "2025-01-17T07:22:59.226Z",
    "size": 199196,
    "path": "../public/img/code.jpg"
  },
  "/img/daojishi.png": {
    "type": "image/png",
    "etag": "\"1508-schVunm3TcHS92NyNjDj/ZpuX3s\"",
    "mtime": "2025-01-17T07:22:59.223Z",
    "size": 5384,
    "path": "../public/img/daojishi.png"
  },
  "/img/dashang.png": {
    "type": "image/png",
    "etag": "\"2c8c-vDimOs3cbzjByJPVY14vraAEjvU\"",
    "mtime": "2025-01-17T07:22:59.223Z",
    "size": 11404,
    "path": "../public/img/dashang.png"
  },
  "/img/dianzan.png": {
    "type": "image/png",
    "etag": "\"1391-ak9U9dSSozB5JkKh0qCN4Hi6N+8\"",
    "mtime": "2025-01-17T07:22:59.224Z",
    "size": 5009,
    "path": "../public/img/dianzan.png"
  },
  "/img/e08da34488b114bd4c665ba2fa520a31.svg": {
    "type": "image/svg+xml",
    "etag": "\"ca2-+88cPG1ECg+7e4cbjEoNvU6e5wU\"",
    "mtime": "2025-01-17T07:22:59.224Z",
    "size": 3234,
    "path": "../public/img/e08da34488b114bd4c665ba2fa520a31.svg"
  },
  "/img/echarts-view.jpg": {
    "type": "image/jpeg",
    "etag": "\"1c03c-A2cIk1poW3cXKwk+3vqUoYmPwHM\"",
    "mtime": "2025-01-17T07:22:59.226Z",
    "size": 114748,
    "path": "../public/img/echarts-view.jpg"
  },
  "/img/empty.png": {
    "type": "image/png",
    "etag": "\"3854-4SbNieApTKZmlwUmP4HVIwmpv9c\"",
    "mtime": "2025-01-17T07:22:59.226Z",
    "size": 14420,
    "path": "../public/img/empty.png"
  },
  "/img/error6.png": {
    "type": "image/png",
    "etag": "\"408b-tu9HEnaV+8TzKmhQlFb0ZT9H0Co\"",
    "mtime": "2025-01-17T07:22:59.225Z",
    "size": 16523,
    "path": "../public/img/error6.png"
  },
  "/img/fangwenliang.png": {
    "type": "image/png",
    "etag": "\"1346-SuTxNWoR05/I0e2XdLK198FWEWo\"",
    "mtime": "2025-01-17T07:22:59.225Z",
    "size": 4934,
    "path": "../public/img/fangwenliang.png"
  },
  "/img/fangwenliang1.png": {
    "type": "image/png",
    "etag": "\"15ff-I/CxfS4cExWclaCJFcsAoHogtLs\"",
    "mtime": "2025-01-17T07:22:59.226Z",
    "size": 5631,
    "path": "../public/img/fangwenliang1.png"
  },
  "/img/fenxiang.png": {
    "type": "image/png",
    "etag": "\"1afd-W2WYQn1JIcEBj8i53qVkBvWjN+o\"",
    "mtime": "2025-01-17T07:22:59.226Z",
    "size": 6909,
    "path": "../public/img/fenxiang.png"
  },
  "/img/forEach-banner.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ea4c-ofgVmJP6fKGnl+Hpb5pipJsix10\"",
    "mtime": "2025-01-17T07:22:59.229Z",
    "size": 125516,
    "path": "../public/img/forEach-banner.jpg"
  },
  "/img/forEach.jpg": {
    "type": "image/jpeg",
    "etag": "\"2ee00-cCW2wztRwHzJwhVH28iq21IhTPI\"",
    "mtime": "2025-01-17T07:22:59.229Z",
    "size": 192000,
    "path": "../public/img/forEach.jpg"
  },
  "/img/forof-header.jpg": {
    "type": "image/jpeg",
    "etag": "\"1739c-okr3WlXHHcyJpoEk/pKCIEVUVUM\"",
    "mtime": "2025-01-17T07:22:59.227Z",
    "size": 95132,
    "path": "../public/img/forof-header.jpg"
  },
  "/img/forof.jpg": {
    "type": "image/jpeg",
    "etag": "\"2630e-/HsR8NkanDFjhAonAMH76e+Lo4M\"",
    "mtime": "2025-01-17T07:22:59.228Z",
    "size": 156430,
    "path": "../public/img/forof.jpg"
  },
  "/img/guanyu.png": {
    "type": "image/png",
    "etag": "\"1598-y+jWDmjzZ3ClJbK0lazBoeXS3ig\"",
    "mtime": "2025-01-17T07:22:59.229Z",
    "size": 5528,
    "path": "../public/img/guanyu.png"
  },
  "/img/guidang.png": {
    "type": "image/png",
    "etag": "\"12b3-XkzMGBqZebnZKmNbDmdlKtqb26M\"",
    "mtime": "2025-01-17T07:22:59.229Z",
    "size": 4787,
    "path": "../public/img/guidang.png"
  },
  "/img/header.png": {
    "type": "image/png",
    "etag": "\"2088d-VOZklEBLCGXohCh+bTow+lEx5nk\"",
    "mtime": "2025-01-17T07:22:59.232Z",
    "size": 133261,
    "path": "../public/img/header.png"
  },
  "/img/icon1.png": {
    "type": "image/png",
    "etag": "\"1fa2-O+B+ofd4RB61IcJfKdwKUqUSrN0\"",
    "mtime": "2025-01-17T07:22:59.229Z",
    "size": 8098,
    "path": "../public/img/icon1.png"
  },
  "/img/img-error.svg": {
    "type": "image/svg+xml",
    "etag": "\"1ff4-4qSKQcqnCUF+I2NqlyuC+ugYCMg\"",
    "mtime": "2025-01-17T07:22:59.231Z",
    "size": 8180,
    "path": "../public/img/img-error.svg"
  },
  "/img/interview.png": {
    "type": "image/png",
    "etag": "\"cd6-uZj2XUmGLnuSJwT0Kdx6v1ZRzTY\"",
    "mtime": "2025-01-17T07:22:59.230Z",
    "size": 3286,
    "path": "../public/img/interview.png"
  },
  "/img/javascript.png": {
    "type": "image/png",
    "etag": "\"5607-O4XizyHm1kB7hUvlMl44FO7inCo\"",
    "mtime": "2025-01-17T07:22:59.231Z",
    "size": 22023,
    "path": "../public/img/javascript.png"
  },
  "/img/jisuan.png": {
    "type": "image/png",
    "etag": "\"1fd9-2mxQrElVj1m4JTr1iNpN+r5Osdc\"",
    "mtime": "2025-01-17T07:22:59.231Z",
    "size": 8153,
    "path": "../public/img/jisuan.png"
  },
  "/img/js-module-header.jpg": {
    "type": "image/jpeg",
    "etag": "\"5485d-Xo0tuds8E3YjNCz6PuR6kfiA6Mk\"",
    "mtime": "2025-01-17T07:22:59.234Z",
    "size": 346205,
    "path": "../public/img/js-module-header.jpg"
  },
  "/img/js-module.jpg": {
    "type": "image/jpeg",
    "etag": "\"43ae7-EbUt7Hh8c8rFmqUH1+Q3Cq8QHA4\"",
    "mtime": "2025-01-17T07:22:59.236Z",
    "size": 277223,
    "path": "../public/img/js-module.jpg"
  },
  "/img/juejin.png": {
    "type": "image/png",
    "etag": "\"e7a-JSPSp1uQ+SC0OdJQkdeCczc1cR0\"",
    "mtime": "2025-01-17T07:22:59.230Z",
    "size": 3706,
    "path": "../public/img/juejin.png"
  },
  "/img/lang.png": {
    "type": "image/png",
    "etag": "\"2ea-11KEy3OiMhvG3mf1NyDZRMHaX5I\"",
    "mtime": "2025-01-17T07:22:59.231Z",
    "size": 746,
    "path": "../public/img/lang.png"
  },
  "/img/lang.svg": {
    "type": "image/svg+xml",
    "etag": "\"3a6-sGDrfCnxRKolDVQh2yDL2vBuUiA\"",
    "mtime": "2025-01-17T07:22:59.233Z",
    "size": 934,
    "path": "../public/img/lang.svg"
  },
  "/img/leetcode.webp": {
    "type": "image/webp",
    "etag": "\"480-B0rGxS7ySA+CT0QujIl/nlzpaEs\"",
    "mtime": "2025-01-17T07:22:59.232Z",
    "size": 1152,
    "path": "../public/img/leetcode.webp"
  },
  "/img/lianjie.png": {
    "type": "image/png",
    "etag": "\"1b14-q9ZSnXJ2HLLmlcYz4rSerOmjNtQ\"",
    "mtime": "2025-01-17T07:22:59.233Z",
    "size": 6932,
    "path": "../public/img/lianjie.png"
  },
  "/img/liuyanguanli.png": {
    "type": "image/png",
    "etag": "\"1ae8-XhhUBJ5fzG8WC6pt/ajYAwk87Kk\"",
    "mtime": "2025-01-17T07:22:59.234Z",
    "size": 6888,
    "path": "../public/img/liuyanguanli.png"
  },
  "/img/login-bg.png": {
    "type": "image/png",
    "etag": "\"7289-xCmhRFm1XsoxsyXBmRwfTmE8VfY\"",
    "mtime": "2025-01-17T07:22:59.235Z",
    "size": 29321,
    "path": "../public/img/login-bg.png"
  },
  "/img/logo.png": {
    "type": "image/png",
    "etag": "\"8e12-2q6KSfTw32FAVjvmK9XllW1tVtM\"",
    "mtime": "2025-01-17T07:22:59.236Z",
    "size": 36370,
    "path": "../public/img/logo.png"
  },
  "/img/miniprogram.svg": {
    "type": "image/svg+xml",
    "etag": "\"641-JshFR9SEQwFxnjgIwpUORk8XNHU\"",
    "mtime": "2025-01-17T07:22:59.236Z",
    "size": 1601,
    "path": "../public/img/miniprogram.svg"
  },
  "/img/mulu.png": {
    "type": "image/png",
    "etag": "\"f82-OWmsNqcPWDkLARoVqk8/VDhA3cw\"",
    "mtime": "2025-01-17T07:22:59.236Z",
    "size": 3970,
    "path": "../public/img/mulu.png"
  },
  "/img/mulu1.png": {
    "type": "image/png",
    "etag": "\"119b-xle2Rhj9IDERPqXSseNon94/Jxg\"",
    "mtime": "2025-01-17T07:22:59.236Z",
    "size": 4507,
    "path": "../public/img/mulu1.png"
  },
  "/img/my-bg.png": {
    "type": "image/png",
    "etag": "\"20341-VaOcaU6deDyimdvvt/46kdOEMME\"",
    "mtime": "2025-01-17T07:22:59.239Z",
    "size": 131905,
    "path": "../public/img/my-bg.png"
  },
  "/img/my-wechat.png": {
    "type": "image/png",
    "etag": "\"41210a-2EakCnoggOxoiJ4MTlkhdLOZCc8\"",
    "mtime": "2025-01-17T07:22:59.268Z",
    "size": 4268298,
    "path": "../public/img/my-wechat.png"
  },
  "/img/note.png": {
    "type": "image/png",
    "etag": "\"60d-bJjkJ/Reawd11+ix9vNpDCP1buM\"",
    "mtime": "2025-01-17T07:22:59.238Z",
    "size": 1549,
    "path": "../public/img/note.png"
  },
  "/img/operator.png": {
    "type": "image/png",
    "etag": "\"6715-m+8vQ2T+rYHAlSCrIwBfqsQMaP8\"",
    "mtime": "2025-01-17T07:22:59.237Z",
    "size": 26389,
    "path": "../public/img/operator.png"
  },
  "/img/pinglun.png": {
    "type": "image/png",
    "etag": "\"1af1-sJOUlVVqc8d8AAPohbmd3JBpIDM\"",
    "mtime": "2025-01-17T07:22:59.236Z",
    "size": 6897,
    "path": "../public/img/pinglun.png"
  },
  "/img/qrcode.jpg": {
    "type": "image/jpeg",
    "etag": "\"6e8e-gnJeZi9eB8Mjs5egrw96tkzZNWM\"",
    "mtime": "2025-01-17T07:22:59.237Z",
    "size": 28302,
    "path": "../public/img/qrcode.jpg"
  },
  "/img/react.svg": {
    "type": "image/svg+xml",
    "etag": "\"27f-oSArVEmBkEW7K/NbEDVYmzqBDCg\"",
    "mtime": "2025-01-17T07:22:59.241Z",
    "size": 639,
    "path": "../public/img/react.svg"
  },
  "/img/seal-header.jpg": {
    "type": "image/jpeg",
    "etag": "\"268d1-c5ONeXN+qnRbVPr00Ou0q01iLl0\"",
    "mtime": "2025-01-17T07:22:59.243Z",
    "size": 157905,
    "path": "../public/img/seal-header.jpg"
  },
  "/img/seal.jpg": {
    "type": "image/jpeg",
    "etag": "\"462b5-yHeMldv4vMjwxTGEBnH0dwprUGo\"",
    "mtime": "2025-01-17T07:22:59.245Z",
    "size": 287413,
    "path": "../public/img/seal.jpg"
  },
  "/img/shouye.png": {
    "type": "image/png",
    "etag": "\"18fd-zSIaQ5PMMzCzQU0WnCVxOudvSWA\"",
    "mtime": "2025-01-17T07:22:59.241Z",
    "size": 6397,
    "path": "../public/img/shouye.png"
  },
  "/img/sousuoxiao.png": {
    "type": "image/png",
    "etag": "\"1d28-YtYQS2KJtgLUZkBJyt3NpTwJh7Q\"",
    "mtime": "2025-01-17T07:22:59.245Z",
    "size": 7464,
    "path": "../public/img/sousuoxiao.png"
  },
  "/img/telegram.png": {
    "type": "image/png",
    "etag": "\"1d40-F1jp+1SpU3L6WmdOoW6aH1mmI0E\"",
    "mtime": "2025-01-17T07:22:59.243Z",
    "size": 7488,
    "path": "../public/img/telegram.png"
  },
  "/img/top.png": {
    "type": "image/png",
    "etag": "\"6e3-Mc5Mcegetd5oTtd8UaP5CH/TNzs\"",
    "mtime": "2025-01-17T07:22:59.243Z",
    "size": 1763,
    "path": "../public/img/top.png"
  },
  "/img/twitter.png": {
    "type": "image/png",
    "etag": "\"b1f-FepY5ZQHuGqm31u3OOO9l6Nk480\"",
    "mtime": "2025-01-17T07:22:59.244Z",
    "size": 2847,
    "path": "../public/img/twitter.png"
  },
  "/img/vue-1.png": {
    "type": "image/png",
    "etag": "\"6646-lGT1BLtF0I8j+8u3dX55tO6eQTs\"",
    "mtime": "2025-01-17T07:22:59.245Z",
    "size": 26182,
    "path": "../public/img/vue-1.png"
  },
  "/img/vue.jpg": {
    "type": "image/jpeg",
    "etag": "\"79379-VZr6v4CGJCpzE4TrElWRMvOVEqg\"",
    "mtime": "2025-01-17T07:22:59.249Z",
    "size": 496505,
    "path": "../public/img/vue.jpg"
  },
  "/img/wechat-new.png": {
    "type": "image/png",
    "etag": "\"2862-I+JiOTV1wwzMq6bJGnITrwvKPjI\"",
    "mtime": "2025-01-17T07:22:59.247Z",
    "size": 10338,
    "path": "../public/img/wechat-new.png"
  },
  "/img/weixin.png": {
    "type": "image/png",
    "etag": "\"224e-Yv3nooCCBVln2TZof4Z4mfsmV+Q\"",
    "mtime": "2025-01-17T07:22:59.247Z",
    "size": 8782,
    "path": "../public/img/weixin.png"
  },
  "/img/wiappfangwenliang.png": {
    "type": "image/png",
    "etag": "\"17d9-J93J9Gm44vho8QjRWLu1j4TzLsY\"",
    "mtime": "2025-01-17T07:22:59.249Z",
    "size": 6105,
    "path": "../public/img/wiappfangwenliang.png"
  },
  "/img/xiangguanwenzhang.png": {
    "type": "image/png",
    "etag": "\"181f-TpfIAahgWqKjl5IBMwxnO+R071A\"",
    "mtime": "2025-01-17T07:22:59.249Z",
    "size": 6175,
    "path": "../public/img/xiangguanwenzhang.png"
  },
  "/api/_content/cache.1737098554324.json": {
    "type": "application/json",
    "etag": "\"2beacd-0hykxBqRcmNMs8hcy8V5mqobBro\"",
    "mtime": "2025-01-17T07:22:59.127Z",
    "size": 2878157,
    "path": "../public/api/_content/cache.1737098554324.json"
  },
  "/_nuxt/builds/latest.json": {
    "type": "application/json",
    "etag": "\"47-2AwMCi0CnkMMgShx9ieCK8OFAy0\"",
    "mtime": "2025-01-17T07:22:59.140Z",
    "size": 71,
    "path": "../public/_nuxt/builds/latest.json"
  },
  "/img/banner/20200609.jpg": {
    "type": "image/jpeg",
    "etag": "\"8944-SfGXoej/CWIhbjVNRxE9cG6IYVw\"",
    "mtime": "2025-01-17T07:22:59.203Z",
    "size": 35140,
    "path": "../public/img/banner/20200609.jpg"
  },
  "/img/banner/20211117.png": {
    "type": "image/png",
    "etag": "\"3858-osWLAh4oETWg/qXVf50CF8oc+ro\"",
    "mtime": "2025-01-17T07:22:59.251Z",
    "size": 14424,
    "path": "../public/img/banner/20211117.png"
  },
  "/img/chrome/001.jpeg": {
    "type": "image/jpeg",
    "etag": "\"4044-annd8lJaGzrSJt/k/QR6LOoPaQg\"",
    "mtime": "2025-01-17T07:22:59.203Z",
    "size": 16452,
    "path": "../public/img/chrome/001.jpeg"
  },
  "/img/chrome/002.jpeg": {
    "type": "image/jpeg",
    "etag": "\"c057-Gpi0iqHCUqNYzK9xfisPDS+PQGQ\"",
    "mtime": "2025-01-17T07:22:59.269Z",
    "size": 49239,
    "path": "../public/img/chrome/002.jpeg"
  },
  "/img/chrome/003.jpeg": {
    "type": "image/jpeg",
    "etag": "\"62c5-pIw8bqvZH4IZ8QeQNu0iLNVSplg\"",
    "mtime": "2025-01-17T07:22:59.253Z",
    "size": 25285,
    "path": "../public/img/chrome/003.jpeg"
  },
  "/img/chrome/004.jpg": {
    "type": "image/jpeg",
    "etag": "\"14821-BCNl8PfkAOYAntRO0JckI90o1Ww\"",
    "mtime": "2025-01-17T07:22:59.264Z",
    "size": 84001,
    "path": "../public/img/chrome/004.jpg"
  },
  "/img/chrome/005.jpeg": {
    "type": "image/jpeg",
    "etag": "\"e391-EpTGpYJS/s6NEmoHE1afPr4NPrw\"",
    "mtime": "2025-01-17T07:22:59.253Z",
    "size": 58257,
    "path": "../public/img/chrome/005.jpeg"
  },
  "/img/chrome/006.jpeg": {
    "type": "image/jpeg",
    "etag": "\"3fbf-U3n8Ut+RQnlLs9caFOf1br2+UVE\"",
    "mtime": "2025-01-17T07:22:59.265Z",
    "size": 16319,
    "path": "../public/img/chrome/006.jpeg"
  },
  "/img/chrome/007.jpeg": {
    "type": "image/jpeg",
    "etag": "\"aee7-mElSt9AdTR/Mvk771IounaYW4s4\"",
    "mtime": "2025-01-17T07:22:59.269Z",
    "size": 44775,
    "path": "../public/img/chrome/007.jpeg"
  },
  "/img/chrome/20240955.png": {
    "type": "image/png",
    "etag": "\"6742b-IuiquKFTg2wa/eN9Y0FMnJoMe4U\"",
    "mtime": "2025-01-17T07:22:59.265Z",
    "size": 422955,
    "path": "../public/img/chrome/20240955.png"
  },
  "/img/chrome/20240956.png": {
    "type": "image/png",
    "etag": "\"1bcbe-cqhQtZNvb1DDGj6GI63uajqPzUU\"",
    "mtime": "2025-01-17T07:22:59.264Z",
    "size": 113854,
    "path": "../public/img/chrome/20240956.png"
  },
  "/img/css/1.gif": {
    "type": "image/gif",
    "etag": "\"100d1-dfnVAwFbg9x5AYMLTxO8G4c+BE8\"",
    "mtime": "2025-01-17T07:22:59.204Z",
    "size": 65745,
    "path": "../public/img/css/1.gif"
  },
  "/img/css/2.gif": {
    "type": "image/gif",
    "etag": "\"fdec-gmtucq1duCyuDEn0PWOXdn+6qrM\"",
    "mtime": "2025-01-17T07:22:59.274Z",
    "size": 65004,
    "path": "../public/img/css/2.gif"
  },
  "/img/css/3.gif": {
    "type": "image/gif",
    "etag": "\"15841-O1FWKIGcPE6xArmFZprdfHGWVjE\"",
    "mtime": "2025-01-17T07:22:59.269Z",
    "size": 88129,
    "path": "../public/img/css/3.gif"
  },
  "/img/css/9ltj1qqohlcr4ca2klim.png": {
    "type": "image/png",
    "etag": "\"f75f-2uwdoLGmRlAbLHcG9WLKiAUdqUo\"",
    "mtime": "2025-01-17T07:22:59.269Z",
    "size": 63327,
    "path": "../public/img/css/9ltj1qqohlcr4ca2klim.png"
  },
  "/img/css/fbdv31m45yh5qix3670a.gif": {
    "type": "image/gif",
    "etag": "\"f3afa-bwmMiRM933PyGb3VI7290U0t4Ek\"",
    "mtime": "2025-01-17T07:22:59.275Z",
    "size": 998138,
    "path": "../public/img/css/fbdv31m45yh5qix3670a.gif"
  },
  "/img/css/qmae27thwy9lcs152ppw.gif": {
    "type": "image/gif",
    "etag": "\"d97b5-BR5VaeYvn8AoYqlO8kqM4DtJX3g\"",
    "mtime": "2025-01-17T07:22:59.274Z",
    "size": 890805,
    "path": "../public/img/css/qmae27thwy9lcs152ppw.gif"
  },
  "/img/css/rgdxyax526twt7780iz3.png": {
    "type": "image/png",
    "etag": "\"1433-VT2gl6Pyf9l60ufFzo/Q6u+8jvs\"",
    "mtime": "2025-01-17T07:22:59.270Z",
    "size": 5171,
    "path": "../public/img/css/rgdxyax526twt7780iz3.png"
  },
  "/img/css/u52bmxqtwmf8e5g2a96d.gif": {
    "type": "image/gif",
    "etag": "\"12d829-5okUOk+74UmEaoZHLvML2SQLLgw\"",
    "mtime": "2025-01-17T07:22:59.276Z",
    "size": 1234985,
    "path": "../public/img/css/u52bmxqtwmf8e5g2a96d.gif"
  },
  "/img/css/writing-mode.png": {
    "type": "image/png",
    "etag": "\"5ab1-w5nVOUFahdM94NSfNt7hwbDqICs\"",
    "mtime": "2025-01-17T07:22:59.271Z",
    "size": 23217,
    "path": "../public/img/css/writing-mode.png"
  },
  "/img/css/yiauq3udyw7wz3dpgsay.png": {
    "type": "image/png",
    "etag": "\"f6c4-iMdzGmtgNjNJv16YQnWP8u/0YM4\"",
    "mtime": "2025-01-17T07:22:59.272Z",
    "size": 63172,
    "path": "../public/img/css/yiauq3udyw7wz3dpgsay.png"
  },
  "/img/drag-drop/drag-dragstart.png": {
    "type": "image/png",
    "etag": "\"f08d-cNOT4tiTqBFKGSe+2cQl8wAv6xg\"",
    "mtime": "2025-01-17T07:22:59.278Z",
    "size": 61581,
    "path": "../public/img/drag-drop/drag-dragstart.png"
  },
  "/img/drag-drop/drap-event-order.png": {
    "type": "image/png",
    "etag": "\"6377-1UE9AqfbPl0bqOR6jLBcijrOukE\"",
    "mtime": "2025-01-17T07:22:59.203Z",
    "size": 25463,
    "path": "../public/img/drag-drop/drap-event-order.png"
  },
  "/img/img/1.png": {
    "type": "image/png",
    "etag": "\"53458-+K+RBSUOzSwwohlvb0zlO55i65Q\"",
    "mtime": "2025-01-17T07:22:59.279Z",
    "size": 341080,
    "path": "../public/img/img/1.png"
  },
  "/img/img/20200601.png": {
    "type": "image/png",
    "etag": "\"26e4-3BK7XyOLUesOD/zlJllPCQCs8cc\"",
    "mtime": "2025-01-17T07:22:59.277Z",
    "size": 9956,
    "path": "../public/img/img/20200601.png"
  },
  "/img/img/20201124032511.png": {
    "type": "image/png",
    "etag": "\"1efc-xN0CXAwfLPdCTAOJeSr9LpAfe3k\"",
    "mtime": "2025-01-17T07:22:59.203Z",
    "size": 7932,
    "path": "../public/img/img/20201124032511.png"
  },
  "/img/img/4fanhuidingbucheng.png": {
    "type": "image/png",
    "etag": "\"1649-Gel5rovjRYTcJelCUSmaS+kinac\"",
    "mtime": "2025-01-17T07:22:59.278Z",
    "size": 5705,
    "path": "../public/img/img/4fanhuidingbucheng.png"
  },
  "/img/img/GitHub.png": {
    "type": "image/png",
    "etag": "\"22f9-ZB7sWM5YLyIx5sleeGaHeVryWLg\"",
    "mtime": "2025-01-17T07:22:59.278Z",
    "size": 8953,
    "path": "../public/img/img/GitHub.png"
  },
  "/img/img/QQ.png": {
    "type": "image/png",
    "etag": "\"28a9-e2dNO+W2BdbJi7YYDZ1udqfmTZI\"",
    "mtime": "2025-01-17T07:22:59.278Z",
    "size": 10409,
    "path": "../public/img/img/QQ.png"
  },
  "/img/img/a-bijibenbiji.png": {
    "type": "image/png",
    "etag": "\"1204-AyDi3KzmiVHtlcv5/IEkzAk0d14\"",
    "mtime": "2025-01-17T07:22:59.279Z",
    "size": 4612,
    "path": "../public/img/img/a-bijibenbiji.png"
  },
  "/img/img/action-scope-header.jpg": {
    "type": "image/jpeg",
    "etag": "\"1743e-zIDEAiA8rKW04SF2qEB0HAg2oTw\"",
    "mtime": "2025-01-17T07:22:59.279Z",
    "size": 95294,
    "path": "../public/img/img/action-scope-header.jpg"
  },
  "/img/img/action-scope.jpg": {
    "type": "image/jpeg",
    "etag": "\"24b17-UpCiqUoQXQ9L5nyy0OikxjzOgFM\"",
    "mtime": "2025-01-17T07:22:59.280Z",
    "size": 150295,
    "path": "../public/img/img/action-scope.jpg"
  },
  "/img/img/article.png": {
    "type": "image/png",
    "etag": "\"683-JkOvFQVKoYE0UHzFEUGODWgMdss\"",
    "mtime": "2025-01-17T07:22:59.279Z",
    "size": 1667,
    "path": "../public/img/img/article.png"
  },
  "/img/img/avatar.jpg": {
    "type": "image/jpeg",
    "etag": "\"12fc3-S4+KBofoVp4Xppl5zwjawPeYvTc\"",
    "mtime": "2025-01-17T07:22:59.280Z",
    "size": 77763,
    "path": "../public/img/img/avatar.jpg"
  },
  "/img/img/clock.svg": {
    "type": "image/svg+xml",
    "etag": "\"1951-eAKd8GV/0etyWJtTUNqQPt0BzCo\"",
    "mtime": "2025-01-17T07:22:59.280Z",
    "size": 6481,
    "path": "../public/img/img/clock.svg"
  },
  "/img/img/code-header.jpg": {
    "type": "image/jpeg",
    "etag": "\"16532-7S0vKqnoMYcDhBfSrJuZ1ShJJx0\"",
    "mtime": "2025-01-17T07:22:59.280Z",
    "size": 91442,
    "path": "../public/img/img/code-header.jpg"
  },
  "/img/img/code.jpg": {
    "type": "image/jpeg",
    "etag": "\"30a1c-gTTLfbK81Nc/1X3NUTzVfZ87SM0\"",
    "mtime": "2025-01-17T07:22:59.281Z",
    "size": 199196,
    "path": "../public/img/img/code.jpg"
  },
  "/img/img/daojishi.png": {
    "type": "image/png",
    "etag": "\"1508-schVunm3TcHS92NyNjDj/ZpuX3s\"",
    "mtime": "2025-01-17T07:22:59.281Z",
    "size": 5384,
    "path": "../public/img/img/daojishi.png"
  },
  "/img/img/dashang.png": {
    "type": "image/png",
    "etag": "\"2c8c-vDimOs3cbzjByJPVY14vraAEjvU\"",
    "mtime": "2025-01-17T07:22:59.283Z",
    "size": 11404,
    "path": "../public/img/img/dashang.png"
  },
  "/img/img/dianzan.png": {
    "type": "image/png",
    "etag": "\"1391-ak9U9dSSozB5JkKh0qCN4Hi6N+8\"",
    "mtime": "2025-01-17T07:22:59.281Z",
    "size": 5009,
    "path": "../public/img/img/dianzan.png"
  },
  "/img/img/e08da34488b114bd4c665ba2fa520a31.svg": {
    "type": "image/svg+xml",
    "etag": "\"ca2-+88cPG1ECg+7e4cbjEoNvU6e5wU\"",
    "mtime": "2025-01-17T07:22:59.283Z",
    "size": 3234,
    "path": "../public/img/img/e08da34488b114bd4c665ba2fa520a31.svg"
  },
  "/img/img/fangwenliang.png": {
    "type": "image/png",
    "etag": "\"1346-SuTxNWoR05/I0e2XdLK198FWEWo\"",
    "mtime": "2025-01-17T07:22:59.281Z",
    "size": 4934,
    "path": "../public/img/img/fangwenliang.png"
  },
  "/img/img/fangwenliang1.png": {
    "type": "image/png",
    "etag": "\"15ff-I/CxfS4cExWclaCJFcsAoHogtLs\"",
    "mtime": "2025-01-17T07:22:59.283Z",
    "size": 5631,
    "path": "../public/img/img/fangwenliang1.png"
  },
  "/img/img/fenxiang.png": {
    "type": "image/png",
    "etag": "\"1afd-W2WYQn1JIcEBj8i53qVkBvWjN+o\"",
    "mtime": "2025-01-17T07:22:59.283Z",
    "size": 6909,
    "path": "../public/img/img/fenxiang.png"
  },
  "/img/img/forEach-banner.jpg": {
    "type": "image/jpeg",
    "etag": "\"1ea4c-ofgVmJP6fKGnl+Hpb5pipJsix10\"",
    "mtime": "2025-01-17T07:22:59.289Z",
    "size": 125516,
    "path": "../public/img/img/forEach-banner.jpg"
  },
  "/img/img/forEach.jpg": {
    "type": "image/jpeg",
    "etag": "\"2ee00-cCW2wztRwHzJwhVH28iq21IhTPI\"",
    "mtime": "2025-01-17T07:22:59.287Z",
    "size": 192000,
    "path": "../public/img/img/forEach.jpg"
  },
  "/img/img/forof-header.jpg": {
    "type": "image/jpeg",
    "etag": "\"1739c-okr3WlXHHcyJpoEk/pKCIEVUVUM\"",
    "mtime": "2025-01-17T07:22:59.287Z",
    "size": 95132,
    "path": "../public/img/img/forof-header.jpg"
  },
  "/img/img/forof.jpg": {
    "type": "image/jpeg",
    "etag": "\"2630e-/HsR8NkanDFjhAonAMH76e+Lo4M\"",
    "mtime": "2025-01-17T07:22:59.287Z",
    "size": 156430,
    "path": "../public/img/img/forof.jpg"
  },
  "/img/img/guanyu.png": {
    "type": "image/png",
    "etag": "\"1598-y+jWDmjzZ3ClJbK0lazBoeXS3ig\"",
    "mtime": "2025-01-17T07:22:59.284Z",
    "size": 5528,
    "path": "../public/img/img/guanyu.png"
  },
  "/img/img/guidang.png": {
    "type": "image/png",
    "etag": "\"12b3-XkzMGBqZebnZKmNbDmdlKtqb26M\"",
    "mtime": "2025-01-17T07:22:59.284Z",
    "size": 4787,
    "path": "../public/img/img/guidang.png"
  },
  "/img/img/icon1.png": {
    "type": "image/png",
    "etag": "\"1fa2-O+B+ofd4RB61IcJfKdwKUqUSrN0\"",
    "mtime": "2025-01-17T07:22:59.284Z",
    "size": 8098,
    "path": "../public/img/img/icon1.png"
  },
  "/img/img/interview.png": {
    "type": "image/png",
    "etag": "\"cd6-uZj2XUmGLnuSJwT0Kdx6v1ZRzTY\"",
    "mtime": "2025-01-17T07:22:59.288Z",
    "size": 3286,
    "path": "../public/img/img/interview.png"
  },
  "/img/img/javascript.png": {
    "type": "image/png",
    "etag": "\"5607-O4XizyHm1kB7hUvlMl44FO7inCo\"",
    "mtime": "2025-01-17T07:22:59.289Z",
    "size": 22023,
    "path": "../public/img/img/javascript.png"
  },
  "/img/img/jisuan.png": {
    "type": "image/png",
    "etag": "\"1fd9-2mxQrElVj1m4JTr1iNpN+r5Osdc\"",
    "mtime": "2025-01-17T07:22:59.288Z",
    "size": 8153,
    "path": "../public/img/img/jisuan.png"
  },
  "/img/img/js-module-header.jpg": {
    "type": "image/jpeg",
    "etag": "\"5485d-Xo0tuds8E3YjNCz6PuR6kfiA6Mk\"",
    "mtime": "2025-01-17T07:22:59.292Z",
    "size": 346205,
    "path": "../public/img/img/js-module-header.jpg"
  },
  "/img/img/js-module.jpg": {
    "type": "image/jpeg",
    "etag": "\"43ae7-EbUt7Hh8c8rFmqUH1+Q3Cq8QHA4\"",
    "mtime": "2025-01-17T07:22:59.289Z",
    "size": 277223,
    "path": "../public/img/img/js-module.jpg"
  },
  "/img/img/juejin.png": {
    "type": "image/png",
    "etag": "\"e7a-JSPSp1uQ+SC0OdJQkdeCczc1cR0\"",
    "mtime": "2025-01-17T07:22:59.289Z",
    "size": 3706,
    "path": "../public/img/img/juejin.png"
  },
  "/img/img/leetcode.webp": {
    "type": "image/webp",
    "etag": "\"480-B0rGxS7ySA+CT0QujIl/nlzpaEs\"",
    "mtime": "2025-01-17T07:22:59.291Z",
    "size": 1152,
    "path": "../public/img/img/leetcode.webp"
  },
  "/img/img/lianjie.png": {
    "type": "image/png",
    "etag": "\"1b14-q9ZSnXJ2HLLmlcYz4rSerOmjNtQ\"",
    "mtime": "2025-01-17T07:22:59.289Z",
    "size": 6932,
    "path": "../public/img/img/lianjie.png"
  },
  "/img/img/liuyanguanli.png": {
    "type": "image/png",
    "etag": "\"1ae8-XhhUBJ5fzG8WC6pt/ajYAwk87Kk\"",
    "mtime": "2025-01-17T07:22:59.290Z",
    "size": 6888,
    "path": "../public/img/img/liuyanguanli.png"
  },
  "/img/img/logo.png": {
    "type": "image/png",
    "etag": "\"f31-EDwOjLDAqWRvto5A3344yDpD81Y\"",
    "mtime": "2025-01-17T07:22:59.291Z",
    "size": 3889,
    "path": "../public/img/img/logo.png"
  },
  "/img/img/miniprogram.svg": {
    "type": "image/svg+xml",
    "etag": "\"641-JshFR9SEQwFxnjgIwpUORk8XNHU\"",
    "mtime": "2025-01-17T07:22:59.291Z",
    "size": 1601,
    "path": "../public/img/img/miniprogram.svg"
  },
  "/img/img/mulu.png": {
    "type": "image/png",
    "etag": "\"f82-OWmsNqcPWDkLARoVqk8/VDhA3cw\"",
    "mtime": "2025-01-17T07:22:59.291Z",
    "size": 3970,
    "path": "../public/img/img/mulu.png"
  },
  "/img/img/mulu1.png": {
    "type": "image/png",
    "etag": "\"119b-xle2Rhj9IDERPqXSseNon94/Jxg\"",
    "mtime": "2025-01-17T07:22:59.293Z",
    "size": 4507,
    "path": "../public/img/img/mulu1.png"
  },
  "/img/img/my-bg.png": {
    "type": "image/png",
    "etag": "\"20341-VaOcaU6deDyimdvvt/46kdOEMME\"",
    "mtime": "2025-01-17T07:22:59.292Z",
    "size": 131905,
    "path": "../public/img/img/my-bg.png"
  },
  "/img/img/my-wechat.png": {
    "type": "image/png",
    "etag": "\"41210a-2EakCnoggOxoiJ4MTlkhdLOZCc8\"",
    "mtime": "2025-01-17T07:22:59.304Z",
    "size": 4268298,
    "path": "../public/img/img/my-wechat.png"
  },
  "/img/img/note.png": {
    "type": "image/png",
    "etag": "\"60d-bJjkJ/Reawd11+ix9vNpDCP1buM\"",
    "mtime": "2025-01-17T07:22:59.293Z",
    "size": 1549,
    "path": "../public/img/img/note.png"
  },
  "/img/img/pinglun.png": {
    "type": "image/png",
    "etag": "\"1af1-sJOUlVVqc8d8AAPohbmd3JBpIDM\"",
    "mtime": "2025-01-17T07:22:59.292Z",
    "size": 6897,
    "path": "../public/img/img/pinglun.png"
  },
  "/img/img/qrcode.jpg": {
    "type": "image/jpeg",
    "etag": "\"6e8e-gnJeZi9eB8Mjs5egrw96tkzZNWM\"",
    "mtime": "2025-01-17T07:22:59.293Z",
    "size": 28302,
    "path": "../public/img/img/qrcode.jpg"
  },
  "/img/img/react.svg": {
    "type": "image/svg+xml",
    "etag": "\"27f-oSArVEmBkEW7K/NbEDVYmzqBDCg\"",
    "mtime": "2025-01-17T07:22:59.292Z",
    "size": 639,
    "path": "../public/img/img/react.svg"
  },
  "/img/img/seal-header.jpg": {
    "type": "image/jpeg",
    "etag": "\"268d1-c5ONeXN+qnRbVPr00Ou0q01iLl0\"",
    "mtime": "2025-01-17T07:22:59.296Z",
    "size": 157905,
    "path": "../public/img/img/seal-header.jpg"
  },
  "/img/img/seal.jpg": {
    "type": "image/jpeg",
    "etag": "\"462b5-yHeMldv4vMjwxTGEBnH0dwprUGo\"",
    "mtime": "2025-01-17T07:22:59.294Z",
    "size": 287413,
    "path": "../public/img/img/seal.jpg"
  },
  "/img/img/shouye.png": {
    "type": "image/png",
    "etag": "\"18fd-zSIaQ5PMMzCzQU0WnCVxOudvSWA\"",
    "mtime": "2025-01-17T07:22:59.294Z",
    "size": 6397,
    "path": "../public/img/img/shouye.png"
  },
  "/img/img/sousuoxiao.png": {
    "type": "image/png",
    "etag": "\"1d28-YtYQS2KJtgLUZkBJyt3NpTwJh7Q\"",
    "mtime": "2025-01-17T07:22:59.294Z",
    "size": 7464,
    "path": "../public/img/img/sousuoxiao.png"
  },
  "/img/img/telegram.png": {
    "type": "image/png",
    "etag": "\"1d40-F1jp+1SpU3L6WmdOoW6aH1mmI0E\"",
    "mtime": "2025-01-17T07:22:59.294Z",
    "size": 7488,
    "path": "../public/img/img/telegram.png"
  },
  "/img/img/top.png": {
    "type": "image/png",
    "etag": "\"6e3-Mc5Mcegetd5oTtd8UaP5CH/TNzs\"",
    "mtime": "2025-01-17T07:22:59.295Z",
    "size": 1763,
    "path": "../public/img/img/top.png"
  },
  "/img/img/twitter.png": {
    "type": "image/png",
    "etag": "\"b1f-FepY5ZQHuGqm31u3OOO9l6Nk480\"",
    "mtime": "2025-01-17T07:22:59.294Z",
    "size": 2847,
    "path": "../public/img/img/twitter.png"
  },
  "/img/img/vue-1.png": {
    "type": "image/png",
    "etag": "\"6646-lGT1BLtF0I8j+8u3dX55tO6eQTs\"",
    "mtime": "2025-01-17T07:22:59.297Z",
    "size": 26182,
    "path": "../public/img/img/vue-1.png"
  },
  "/img/img/vue.jpg": {
    "type": "image/jpeg",
    "etag": "\"79379-VZr6v4CGJCpzE4TrElWRMvOVEqg\"",
    "mtime": "2025-01-17T07:22:59.297Z",
    "size": 496505,
    "path": "../public/img/img/vue.jpg"
  },
  "/img/img/wechat-new.png": {
    "type": "image/png",
    "etag": "\"2862-I+JiOTV1wwzMq6bJGnITrwvKPjI\"",
    "mtime": "2025-01-17T07:22:59.296Z",
    "size": 10338,
    "path": "../public/img/img/wechat-new.png"
  },
  "/img/img/weixin.png": {
    "type": "image/png",
    "etag": "\"224e-Yv3nooCCBVln2TZof4Z4mfsmV+Q\"",
    "mtime": "2025-01-17T07:22:59.297Z",
    "size": 8782,
    "path": "../public/img/img/weixin.png"
  },
  "/img/img/wiappfangwenliang.png": {
    "type": "image/png",
    "etag": "\"17d9-J93J9Gm44vho8QjRWLu1j4TzLsY\"",
    "mtime": "2025-01-17T07:22:59.299Z",
    "size": 6105,
    "path": "../public/img/img/wiappfangwenliang.png"
  },
  "/img/img/xiangguanwenzhang.png": {
    "type": "image/png",
    "etag": "\"181f-TpfIAahgWqKjl5IBMwxnO+R071A\"",
    "mtime": "2025-01-17T07:22:59.297Z",
    "size": 6175,
    "path": "../public/img/img/xiangguanwenzhang.png"
  },
  "/img/d3/module.png": {
    "type": "image/png",
    "etag": "\"e054-d06tHVF1ydVnN7Td0Ebu0XQk9FI\"",
    "mtime": "2025-01-17T07:22:59.203Z",
    "size": 57428,
    "path": "../public/img/d3/module.png"
  },
  "/img/laboratory/base64.jpg": {
    "type": "image/jpeg",
    "etag": "\"1bd02-ergb7Gok8THq39zZ93L5h+tdOAw\"",
    "mtime": "2025-01-17T07:22:59.302Z",
    "size": 113922,
    "path": "../public/img/laboratory/base64.jpg"
  },
  "/img/laboratory/btc.jpg": {
    "type": "image/jpeg",
    "etag": "\"3e8f5e-ftJJv+VbPyTll48dL7MyFqotOcI\"",
    "mtime": "2025-01-17T07:22:59.317Z",
    "size": 4099934,
    "path": "../public/img/laboratory/btc.jpg"
  },
  "/img/laboratory/clock.jpg": {
    "type": "image/jpeg",
    "etag": "\"1eb0a-WfTIF5yWj4Sh8SqchfuljTKxMUs\"",
    "mtime": "2025-01-17T07:22:59.302Z",
    "size": 125706,
    "path": "../public/img/laboratory/clock.jpg"
  },
  "/img/laboratory/decode.jpg": {
    "type": "image/jpeg",
    "etag": "\"bb798-WGTYaEzgSdomFKmbghNhY9D1ChM\"",
    "mtime": "2025-01-17T07:22:59.209Z",
    "size": 767896,
    "path": "../public/img/laboratory/decode.jpg"
  },
  "/img/laboratory/img-base.jpg": {
    "type": "image/jpeg",
    "etag": "\"1e2e2-k/ok8QM06bbXXd5+aCffEaz1kl4\"",
    "mtime": "2025-01-17T07:22:59.302Z",
    "size": 123618,
    "path": "../public/img/laboratory/img-base.jpg"
  },
  "/img/laboratory/interest-rate.jpg": {
    "type": "image/jpeg",
    "etag": "\"35d21-ZIbAGWM0k/yEPUOa5RYB63zK0SU\"",
    "mtime": "2025-01-17T07:22:59.304Z",
    "size": 220449,
    "path": "../public/img/laboratory/interest-rate.jpg"
  },
  "/img/laboratory/json.jpg": {
    "type": "image/jpeg",
    "etag": "\"8d974-HCl6NbCGwsBSjpEj7OfFr9cls6c\"",
    "mtime": "2025-01-17T07:22:59.306Z",
    "size": 579956,
    "path": "../public/img/laboratory/json.jpg"
  },
  "/img/miniprogram/小程序演进.png": {
    "type": "image/png",
    "etag": "\"50544-h8AWqNUQ/8KQkvMSuGhZo2+a+To\"",
    "mtime": "2025-01-17T07:22:59.208Z",
    "size": 329028,
    "path": "../public/img/miniprogram/小程序演进.png"
  },
  "/img/markdown/markdown-01.png": {
    "type": "image/png",
    "etag": "\"be1-YYEMX0IHLNGimID2krFao7NalH8\"",
    "mtime": "2025-01-17T07:22:59.207Z",
    "size": 3041,
    "path": "../public/img/markdown/markdown-01.png"
  },
  "/img/markdown/markdown-02.png": {
    "type": "image/png",
    "etag": "\"9df-7umzdZqBXSWEnXv+wAIyGTQFQi8\"",
    "mtime": "2025-01-17T07:22:59.316Z",
    "size": 2527,
    "path": "../public/img/markdown/markdown-02.png"
  },
  "/img/markdown/markdown-03.png": {
    "type": "image/png",
    "etag": "\"1f76-28CcTAiPj6zb8Vd8MvJCj98SIf0\"",
    "mtime": "2025-01-17T07:22:59.311Z",
    "size": 8054,
    "path": "../public/img/markdown/markdown-03.png"
  },
  "/img/markdown/markdown-04.png": {
    "type": "image/png",
    "etag": "\"1b9d-IzFVTyMVAxc2TMgSk0BkDzpJEXI\"",
    "mtime": "2025-01-17T07:22:59.310Z",
    "size": 7069,
    "path": "../public/img/markdown/markdown-04.png"
  },
  "/img/markdown/markdown-05.png": {
    "type": "image/png",
    "etag": "\"24b1-8bHFu7YVYe+Nvk13pFzfZ2BxJh4\"",
    "mtime": "2025-01-17T07:22:59.311Z",
    "size": 9393,
    "path": "../public/img/markdown/markdown-05.png"
  },
  "/img/markdown/markdown-06.png": {
    "type": "image/png",
    "etag": "\"10d3-PUWMl90ApmutjST5C969l1ksvOs\"",
    "mtime": "2025-01-17T07:22:59.312Z",
    "size": 4307,
    "path": "../public/img/markdown/markdown-06.png"
  },
  "/img/markdown/markdown-07.png": {
    "type": "image/png",
    "etag": "\"1a16-J9Vw1EkVk4jOt3+oLDnwOJtxjfA\"",
    "mtime": "2025-01-17T07:22:59.313Z",
    "size": 6678,
    "path": "../public/img/markdown/markdown-07.png"
  },
  "/img/markdown/markdown-08.png": {
    "type": "image/png",
    "etag": "\"19c1-ZRyd7MVZVAUoLGDSRI2L9ROAv6w\"",
    "mtime": "2025-01-17T07:22:59.315Z",
    "size": 6593,
    "path": "../public/img/markdown/markdown-08.png"
  },
  "/img/markdown/markdown-09.png": {
    "type": "image/png",
    "etag": "\"12be-gwhxAHqB37iqJhLcNekvcY2iRYA\"",
    "mtime": "2025-01-17T07:22:59.315Z",
    "size": 4798,
    "path": "../public/img/markdown/markdown-09.png"
  },
  "/img/markdown/markdown-10.png": {
    "type": "image/png",
    "etag": "\"12da-bs7drieUmCPNQFg0J4pVn0GRevI\"",
    "mtime": "2025-01-17T07:22:59.315Z",
    "size": 4826,
    "path": "../public/img/markdown/markdown-10.png"
  },
  "/img/learn/JavaScript-01.png": {
    "type": "image/png",
    "etag": "\"11ef4-R/8BqNTQrdnP6WreSGWNqBzMNls\"",
    "mtime": "2025-01-17T07:22:59.204Z",
    "size": 73460,
    "path": "../public/img/learn/JavaScript-01.png"
  },
  "/img/learn/JavaScript-02.png": {
    "type": "image/png",
    "etag": "\"1de6d-kNqkacnV5frnTJgd5jjKY3IWbrU\"",
    "mtime": "2025-01-17T07:22:59.304Z",
    "size": 122477,
    "path": "../public/img/learn/JavaScript-02.png"
  },
  "/img/learn/build.jpg": {
    "type": "image/jpeg",
    "etag": "\"1150a-hEA8y+qduIid+EdLBWxhBlh67/s\"",
    "mtime": "2025-01-17T07:22:59.310Z",
    "size": 70922,
    "path": "../public/img/learn/build.jpg"
  },
  "/img/learn/css-01.png": {
    "type": "image/png",
    "etag": "\"f380-rer4VQC+sgUkXwPSmM1xL5KP5JM\"",
    "mtime": "2025-01-17T07:22:59.308Z",
    "size": 62336,
    "path": "../public/img/learn/css-01.png"
  },
  "/img/learn/menu.jpg": {
    "type": "image/jpeg",
    "etag": "\"158879-lkkL29L33lj4zMN0kHz/+bnVvEg\"",
    "mtime": "2025-01-17T07:22:59.314Z",
    "size": 1411193,
    "path": "../public/img/learn/menu.jpg"
  },
  "/img/learn/type-change.jpg": {
    "type": "image/jpeg",
    "etag": "\"31d75-cK55wWVvrr4PP+CZxOJtLr8Upuk\"",
    "mtime": "2025-01-17T07:22:59.309Z",
    "size": 204149,
    "path": "../public/img/learn/type-change.jpg"
  },
  "/img/module/模块化区别-01.png": {
    "type": "image/png",
    "etag": "\"c907-a+ASkoKFFBTViCODdrDw4O9inzw\"",
    "mtime": "2025-01-17T07:22:59.206Z",
    "size": 51463,
    "path": "../public/img/module/模块化区别-01.png"
  },
  "/img/module/模块化区别-语法.png": {
    "type": "image/png",
    "etag": "\"1be13-Cqci8iObtI+j4cr4AXJLFNBtwKg\"",
    "mtime": "2025-01-17T07:22:59.313Z",
    "size": 114195,
    "path": "../public/img/module/模块化区别-语法.png"
  },
  "/img/packages/bg.png": {
    "type": "image/png",
    "etag": "\"813-cf4Ncmv8IbItU6Yjzly+sH65F0g\"",
    "mtime": "2025-01-17T07:22:59.206Z",
    "size": 2067,
    "path": "../public/img/packages/bg.png"
  },
  "/img/packages/傅里叶变换.png": {
    "type": "image/png",
    "etag": "\"1a796-kEkHnUu/dmG5XM0p2vAe58pBfCQ\"",
    "mtime": "2025-01-17T07:22:59.316Z",
    "size": 108438,
    "path": "../public/img/packages/傅里叶变换.png"
  },
  "/img/python/python-02.png": {
    "type": "image/png",
    "etag": "\"4b2b-Mv5mIwS2OyXElPSmZylkGYuhM3M\"",
    "mtime": "2025-01-17T07:22:59.207Z",
    "size": 19243,
    "path": "../public/img/python/python-02.png"
  },
  "/img/python/python-03.png": {
    "type": "image/png",
    "etag": "\"4c82-yfRqpO1rfyB8fE9DAioFiGv7u4g\"",
    "mtime": "2025-01-17T07:22:59.316Z",
    "size": 19586,
    "path": "../public/img/python/python-03.png"
  },
  "/img/respbian/respbian-01.png": {
    "type": "image/png",
    "etag": "\"131ed-ALLYcDDECYpSBKisLm/D3oFOa3E\"",
    "mtime": "2025-01-17T07:22:59.317Z",
    "size": 78317,
    "path": "../public/img/respbian/respbian-01.png"
  },
  "/img/respbian/respbian-02.png": {
    "type": "image/png",
    "etag": "\"39cb3-6IYV6CDqjpOKir2I0VnCxNLRRdw\"",
    "mtime": "2025-01-17T07:22:59.208Z",
    "size": 236723,
    "path": "../public/img/respbian/respbian-02.png"
  },
  "/img/site/gitee-newrepository.png": {
    "type": "image/png",
    "etag": "\"11be9-YOHZ6y8ngiBcZgP16zmjy2VOO4k\"",
    "mtime": "2025-01-17T07:22:59.323Z",
    "size": 72681,
    "path": "../public/img/site/gitee-newrepository.png"
  },
  "/img/site/gitee-site-pages.png": {
    "type": "image/png",
    "etag": "\"12cba-0H0oI2hariSXhpDwbz9BXzONjjQ\"",
    "mtime": "2025-01-17T07:22:59.208Z",
    "size": 76986,
    "path": "../public/img/site/gitee-site-pages.png"
  },
  "/img/site/github-newrepository.png": {
    "type": "image/png",
    "etag": "\"c933-zDUDAsjHA+5ya7W1RvVtBZ/IS5Q\"",
    "mtime": "2025-01-17T07:22:59.317Z",
    "size": 51507,
    "path": "../public/img/site/github-newrepository.png"
  },
  "/img/site/github-site-pages.png": {
    "type": "image/png",
    "etag": "\"1675a-zmibzciGVfjH/dTjmPEMiwqXlSk\"",
    "mtime": "2025-01-17T07:22:59.318Z",
    "size": 91994,
    "path": "../public/img/site/github-site-pages.png"
  },
  "/img/site/hexo-default-pages.png": {
    "type": "image/png",
    "etag": "\"49c4d-xbTvV34GixGGdTkhIBbJEirnuxg\"",
    "mtime": "2025-01-17T07:22:59.320Z",
    "size": 302157,
    "path": "../public/img/site/hexo-default-pages.png"
  },
  "/img/vue2-template/install-vue-cmd-01png.png": {
    "type": "image/png",
    "etag": "\"21e2b-3lnQ6J3YpjMytkzawcI9za7BPdw\"",
    "mtime": "2025-01-17T07:22:59.209Z",
    "size": 138795,
    "path": "../public/img/vue2-template/install-vue-cmd-01png.png"
  },
  "/img/vue2-template/install-vue-cmd-02.png": {
    "type": "image/png",
    "etag": "\"94b4-G9G/THNIMu7NBI6NqrzAz0UHRE0\"",
    "mtime": "2025-01-17T07:22:59.323Z",
    "size": 38068,
    "path": "../public/img/vue2-template/install-vue-cmd-02.png"
  },
  "/img/vue2-template/install-vue-cmd-03.png": {
    "type": "image/png",
    "etag": "\"73bf9-aotWkGzAwEfC/1LKTsCujTWXbwo\"",
    "mtime": "2025-01-17T07:22:59.324Z",
    "size": 474105,
    "path": "../public/img/vue2-template/install-vue-cmd-03.png"
  },
  "/img/vue2-template/install-vue-ui-1.png": {
    "type": "image/png",
    "etag": "\"f575-vxn5Vv5hGz9v8XsGOZO/+CHa8y0\"",
    "mtime": "2025-01-17T07:22:59.324Z",
    "size": 62837,
    "path": "../public/img/vue2-template/install-vue-ui-1.png"
  },
  "/img/vue2-template/install-vue-ui-2.png": {
    "type": "image/png",
    "etag": "\"62c4-6Vv3/YHbednIDVdOzEC71hsTPGY\"",
    "mtime": "2025-01-17T07:22:59.320Z",
    "size": 25284,
    "path": "../public/img/vue2-template/install-vue-ui-2.png"
  },
  "/img/vue2-template/install-vue-ui.png": {
    "type": "image/png",
    "etag": "\"7611-0DFKmSVKKhs+vN8JPqHmgl2xpCM\"",
    "mtime": "2025-01-17T07:22:59.321Z",
    "size": 30225,
    "path": "../public/img/vue2-template/install-vue-ui.png"
  },
  "/img/web/1.png": {
    "type": "image/png",
    "etag": "\"2fd-OJUI+gCDtQTQTi7CxHxWD47QN3M\"",
    "mtime": "2025-01-17T07:22:59.209Z",
    "size": 765,
    "path": "../public/img/web/1.png"
  },
  "/img/web/advert.png": {
    "type": "image/png",
    "etag": "\"401c-mSdPxoCaDxk+1cAGnxJCfNG6SYs\"",
    "mtime": "2025-01-17T07:22:59.323Z",
    "size": 16412,
    "path": "../public/img/web/advert.png"
  },
  "/img/web/book.png": {
    "type": "image/png",
    "etag": "\"c85-cXFQwGcfRZCpV4SeBTLjuG2L/tA\"",
    "mtime": "2025-01-17T07:22:59.321Z",
    "size": 3205,
    "path": "../public/img/web/book.png"
  },
  "/img/web/booka.png": {
    "type": "image/png",
    "etag": "\"f18-c6HlmBiQvwfn2gypc97hQe3Z6JE\"",
    "mtime": "2025-01-17T07:22:59.325Z",
    "size": 3864,
    "path": "../public/img/web/booka.png"
  },
  "/img/web/bookb.png": {
    "type": "image/png",
    "etag": "\"d65-Ujhe1ja4WgJxBwXXI/WFywB6qZo\"",
    "mtime": "2025-01-17T07:22:59.321Z",
    "size": 3429,
    "path": "../public/img/web/bookb.png"
  },
  "/img/web/bookc.png": {
    "type": "image/png",
    "etag": "\"f31-EDwOjLDAqWRvto5A3344yDpD81Y\"",
    "mtime": "2025-01-17T07:22:59.321Z",
    "size": 3889,
    "path": "../public/img/web/bookc.png"
  },
  "/img/web/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"423e-iXkz8yCWv0IM5eP3QsFybm3L3KE\"",
    "mtime": "2025-01-17T07:22:59.325Z",
    "size": 16958,
    "path": "../public/img/web/favicon.ico"
  },
  "/img/web/favicon.png": {
    "type": "image/png",
    "etag": "\"ecb-F8fwhi1EiURW+JzEIWqf92abTgA\"",
    "mtime": "2025-01-17T07:22:59.321Z",
    "size": 3787,
    "path": "../public/img/web/favicon.png"
  },
  "/img/web/header.jpg": {
    "type": "image/jpeg",
    "etag": "\"5367-PB/Uo4HtLL2fLRCiQk1LbfxY+QU\"",
    "mtime": "2025-01-17T07:22:59.323Z",
    "size": 21351,
    "path": "../public/img/web/header.jpg"
  },
  "/img/web/logo-f.png": {
    "type": "image/png",
    "etag": "\"8611-fgaX7aiuRJpYcszC3/aYaOeHz58\"",
    "mtime": "2025-01-17T07:22:59.325Z",
    "size": 34321,
    "path": "../public/img/web/logo-f.png"
  },
  "/img/web/logo-l.png": {
    "type": "image/png",
    "etag": "\"419a-4pTNBMCacRB2RFA9X50EGxc/Kig\"",
    "mtime": "2025-01-17T07:22:59.324Z",
    "size": 16794,
    "path": "../public/img/web/logo-l.png"
  },
  "/img/web/logo.png": {
    "type": "image/png",
    "etag": "\"1f79-jNX+038oNBTvtufs3mfCf/zVXtY\"",
    "mtime": "2025-01-17T07:22:59.325Z",
    "size": 8057,
    "path": "../public/img/web/logo.png"
  },
  "/img/web/qq.jpg": {
    "type": "image/jpeg",
    "etag": "\"208de-Fal705lvUd7EPEZf2Q/Co0vSxXw\"",
    "mtime": "2025-01-17T07:22:59.325Z",
    "size": 133342,
    "path": "../public/img/web/qq.jpg"
  },
  "/img/web/wechat.jpg": {
    "type": "image/jpeg",
    "etag": "\"14b27-zrOioa6qZr7CeAGh8xR7TD9Cns8\"",
    "mtime": "2025-01-17T07:22:59.326Z",
    "size": 84775,
    "path": "../public/img/web/wechat.jpg"
  },
  "/img/img/css/1.gif": {
    "type": "image/gif",
    "etag": "\"100d1-dfnVAwFbg9x5AYMLTxO8G4c+BE8\"",
    "mtime": "2025-01-17T07:22:59.214Z",
    "size": 65745,
    "path": "../public/img/img/css/1.gif"
  },
  "/img/img/css/2.gif": {
    "type": "image/gif",
    "etag": "\"fdec-gmtucq1duCyuDEn0PWOXdn+6qrM\"",
    "mtime": "2025-01-17T07:22:59.331Z",
    "size": 65004,
    "path": "../public/img/img/css/2.gif"
  },
  "/img/img/css/3.gif": {
    "type": "image/gif",
    "etag": "\"15841-O1FWKIGcPE6xArmFZprdfHGWVjE\"",
    "mtime": "2025-01-17T07:22:59.326Z",
    "size": 88129,
    "path": "../public/img/img/css/3.gif"
  },
  "/img/img/css/9ltj1qqohlcr4ca2klim.png": {
    "type": "image/png",
    "etag": "\"f75f-2uwdoLGmRlAbLHcG9WLKiAUdqUo\"",
    "mtime": "2025-01-17T07:22:59.331Z",
    "size": 63327,
    "path": "../public/img/img/css/9ltj1qqohlcr4ca2klim.png"
  },
  "/img/img/css/fbdv31m45yh5qix3670a.gif": {
    "type": "image/gif",
    "etag": "\"f3afa-bwmMiRM933PyGb3VI7290U0t4Ek\"",
    "mtime": "2025-01-17T07:22:59.331Z",
    "size": 998138,
    "path": "../public/img/img/css/fbdv31m45yh5qix3670a.gif"
  },
  "/img/img/css/qmae27thwy9lcs152ppw.gif": {
    "type": "image/gif",
    "etag": "\"d97b5-BR5VaeYvn8AoYqlO8kqM4DtJX3g\"",
    "mtime": "2025-01-17T07:22:59.330Z",
    "size": 890805,
    "path": "../public/img/img/css/qmae27thwy9lcs152ppw.gif"
  },
  "/img/img/css/rgdxyax526twt7780iz3.png": {
    "type": "image/png",
    "etag": "\"1433-VT2gl6Pyf9l60ufFzo/Q6u+8jvs\"",
    "mtime": "2025-01-17T07:22:59.328Z",
    "size": 5171,
    "path": "../public/img/img/css/rgdxyax526twt7780iz3.png"
  },
  "/img/img/css/u52bmxqtwmf8e5g2a96d.gif": {
    "type": "image/gif",
    "etag": "\"12d829-5okUOk+74UmEaoZHLvML2SQLLgw\"",
    "mtime": "2025-01-17T07:22:59.333Z",
    "size": 1234985,
    "path": "../public/img/img/css/u52bmxqtwmf8e5g2a96d.gif"
  },
  "/img/img/css/writing-mode.png": {
    "type": "image/png",
    "etag": "\"5ab1-w5nVOUFahdM94NSfNt7hwbDqICs\"",
    "mtime": "2025-01-17T07:22:59.329Z",
    "size": 23217,
    "path": "../public/img/img/css/writing-mode.png"
  },
  "/img/img/css/yiauq3udyw7wz3dpgsay.png": {
    "type": "image/png",
    "etag": "\"f6c4-iMdzGmtgNjNJv16YQnWP8u/0YM4\"",
    "mtime": "2025-01-17T07:22:59.330Z",
    "size": 63172,
    "path": "../public/img/img/css/yiauq3udyw7wz3dpgsay.png"
  },
  "/_nuxt/builds/meta/a0b8f4d7-6b85-4814-a8c4-2e4ca3d0740d.json": {
    "type": "application/json",
    "etag": "\"8b-NT8/at0kRt+UC0cXhDe9KP4HPZc\"",
    "mtime": "2025-01-17T07:22:59.136Z",
    "size": 139,
    "path": "../public/_nuxt/builds/meta/a0b8f4d7-6b85-4814-a8c4-2e4ca3d0740d.json"
  },
  "/img/img/d3/module.png": {
    "type": "image/png",
    "etag": "\"e054-d06tHVF1ydVnN7Td0Ebu0XQk9FI\"",
    "mtime": "2025-01-17T07:22:59.214Z",
    "size": 57428,
    "path": "../public/img/img/d3/module.png"
  },
  "/img/img/drag-drop/drag-dragstart.png": {
    "type": "image/png",
    "etag": "\"f08d-cNOT4tiTqBFKGSe+2cQl8wAv6xg\"",
    "mtime": "2025-01-17T07:22:59.214Z",
    "size": 61581,
    "path": "../public/img/img/drag-drop/drag-dragstart.png"
  },
  "/img/img/drag-drop/drap-event-order.png": {
    "type": "image/png",
    "etag": "\"6377-1UE9AqfbPl0bqOR6jLBcijrOukE\"",
    "mtime": "2025-01-17T07:22:59.332Z",
    "size": 25463,
    "path": "../public/img/img/drag-drop/drap-event-order.png"
  },
  "/img/img/learn/JavaScript-01.png": {
    "type": "image/png",
    "etag": "\"11ef4-R/8BqNTQrdnP6WreSGWNqBzMNls\"",
    "mtime": "2025-01-17T07:22:59.215Z",
    "size": 73460,
    "path": "../public/img/img/learn/JavaScript-01.png"
  },
  "/img/img/learn/JavaScript-02.png": {
    "type": "image/png",
    "etag": "\"1de6d-kNqkacnV5frnTJgd5jjKY3IWbrU\"",
    "mtime": "2025-01-17T07:22:59.338Z",
    "size": 122477,
    "path": "../public/img/img/learn/JavaScript-02.png"
  },
  "/img/img/learn/build.jpg": {
    "type": "image/jpeg",
    "etag": "\"1150a-hEA8y+qduIid+EdLBWxhBlh67/s\"",
    "mtime": "2025-01-17T07:22:59.334Z",
    "size": 70922,
    "path": "../public/img/img/learn/build.jpg"
  },
  "/img/img/learn/css-01.png": {
    "type": "image/png",
    "etag": "\"f380-rer4VQC+sgUkXwPSmM1xL5KP5JM\"",
    "mtime": "2025-01-17T07:22:59.333Z",
    "size": 62336,
    "path": "../public/img/img/learn/css-01.png"
  },
  "/img/img/learn/menu.jpg": {
    "type": "image/jpeg",
    "etag": "\"158879-lkkL29L33lj4zMN0kHz/+bnVvEg\"",
    "mtime": "2025-01-17T07:22:59.338Z",
    "size": 1411193,
    "path": "../public/img/img/learn/menu.jpg"
  },
  "/img/img/learn/type-change.jpg": {
    "type": "image/jpeg",
    "etag": "\"31d75-cK55wWVvrr4PP+CZxOJtLr8Upuk\"",
    "mtime": "2025-01-17T07:22:59.333Z",
    "size": 204149,
    "path": "../public/img/img/learn/type-change.jpg"
  },
  "/img/img/markdown/markdown-01.png": {
    "type": "image/png",
    "etag": "\"be1-YYEMX0IHLNGimID2krFao7NalH8\"",
    "mtime": "2025-01-17T07:22:59.339Z",
    "size": 3041,
    "path": "../public/img/img/markdown/markdown-01.png"
  },
  "/img/img/markdown/markdown-02.png": {
    "type": "image/png",
    "etag": "\"9df-7umzdZqBXSWEnXv+wAIyGTQFQi8\"",
    "mtime": "2025-01-17T07:22:59.336Z",
    "size": 2527,
    "path": "../public/img/img/markdown/markdown-02.png"
  },
  "/img/img/markdown/markdown-03.png": {
    "type": "image/png",
    "etag": "\"1f76-28CcTAiPj6zb8Vd8MvJCj98SIf0\"",
    "mtime": "2025-01-17T07:22:59.215Z",
    "size": 8054,
    "path": "../public/img/img/markdown/markdown-03.png"
  },
  "/img/img/markdown/markdown-04.png": {
    "type": "image/png",
    "etag": "\"1b9d-IzFVTyMVAxc2TMgSk0BkDzpJEXI\"",
    "mtime": "2025-01-17T07:22:59.339Z",
    "size": 7069,
    "path": "../public/img/img/markdown/markdown-04.png"
  },
  "/img/img/markdown/markdown-05.png": {
    "type": "image/png",
    "etag": "\"24b1-8bHFu7YVYe+Nvk13pFzfZ2BxJh4\"",
    "mtime": "2025-01-17T07:22:59.336Z",
    "size": 9393,
    "path": "../public/img/img/markdown/markdown-05.png"
  },
  "/img/img/markdown/markdown-06.png": {
    "type": "image/png",
    "etag": "\"10d3-PUWMl90ApmutjST5C969l1ksvOs\"",
    "mtime": "2025-01-17T07:22:59.338Z",
    "size": 4307,
    "path": "../public/img/img/markdown/markdown-06.png"
  },
  "/img/img/markdown/markdown-07.png": {
    "type": "image/png",
    "etag": "\"1a16-J9Vw1EkVk4jOt3+oLDnwOJtxjfA\"",
    "mtime": "2025-01-17T07:22:59.337Z",
    "size": 6678,
    "path": "../public/img/img/markdown/markdown-07.png"
  },
  "/img/img/markdown/markdown-08.png": {
    "type": "image/png",
    "etag": "\"19c1-ZRyd7MVZVAUoLGDSRI2L9ROAv6w\"",
    "mtime": "2025-01-17T07:22:59.337Z",
    "size": 6593,
    "path": "../public/img/img/markdown/markdown-08.png"
  },
  "/img/img/markdown/markdown-09.png": {
    "type": "image/png",
    "etag": "\"12be-gwhxAHqB37iqJhLcNekvcY2iRYA\"",
    "mtime": "2025-01-17T07:22:59.338Z",
    "size": 4798,
    "path": "../public/img/img/markdown/markdown-09.png"
  },
  "/img/img/markdown/markdown-10.png": {
    "type": "image/png",
    "etag": "\"12da-bs7drieUmCPNQFg0J4pVn0GRevI\"",
    "mtime": "2025-01-17T07:22:59.338Z",
    "size": 4826,
    "path": "../public/img/img/markdown/markdown-10.png"
  },
  "/img/img/module/模块化区别-01.png": {
    "type": "image/png",
    "etag": "\"c907-a+ASkoKFFBTViCODdrDw4O9inzw\"",
    "mtime": "2025-01-17T07:22:59.215Z",
    "size": 51463,
    "path": "../public/img/img/module/模块化区别-01.png"
  },
  "/img/img/module/模块化区别-语法.png": {
    "type": "image/png",
    "etag": "\"1be13-Cqci8iObtI+j4cr4AXJLFNBtwKg\"",
    "mtime": "2025-01-17T07:22:59.342Z",
    "size": 114195,
    "path": "../public/img/img/module/模块化区别-语法.png"
  },
  "/img/img/packages/bg.png": {
    "type": "image/png",
    "etag": "\"813-cf4Ncmv8IbItU6Yjzly+sH65F0g\"",
    "mtime": "2025-01-17T07:22:59.339Z",
    "size": 2067,
    "path": "../public/img/img/packages/bg.png"
  },
  "/img/img/packages/傅里叶变换.png": {
    "type": "image/png",
    "etag": "\"1a796-kEkHnUu/dmG5XM0p2vAe58pBfCQ\"",
    "mtime": "2025-01-17T07:22:59.216Z",
    "size": 108438,
    "path": "../public/img/img/packages/傅里叶变换.png"
  },
  "/img/img/python/python-02.png": {
    "type": "image/png",
    "etag": "\"4b2b-Mv5mIwS2OyXElPSmZylkGYuhM3M\"",
    "mtime": "2025-01-17T07:22:59.215Z",
    "size": 19243,
    "path": "../public/img/img/python/python-02.png"
  },
  "/img/img/python/python-03.png": {
    "type": "image/png",
    "etag": "\"4c82-yfRqpO1rfyB8fE9DAioFiGv7u4g\"",
    "mtime": "2025-01-17T07:22:59.341Z",
    "size": 19586,
    "path": "../public/img/img/python/python-03.png"
  },
  "/img/img/site/gitee-newrepository.png": {
    "type": "image/png",
    "etag": "\"11be9-YOHZ6y8ngiBcZgP16zmjy2VOO4k\"",
    "mtime": "2025-01-17T07:22:59.342Z",
    "size": 72681,
    "path": "../public/img/img/site/gitee-newrepository.png"
  },
  "/img/img/site/gitee-site-pages.png": {
    "type": "image/png",
    "etag": "\"12cba-0H0oI2hariSXhpDwbz9BXzONjjQ\"",
    "mtime": "2025-01-17T07:22:59.217Z",
    "size": 76986,
    "path": "../public/img/img/site/gitee-site-pages.png"
  },
  "/img/img/site/github-newrepository.png": {
    "type": "image/png",
    "etag": "\"c933-zDUDAsjHA+5ya7W1RvVtBZ/IS5Q\"",
    "mtime": "2025-01-17T07:22:59.342Z",
    "size": 51507,
    "path": "../public/img/img/site/github-newrepository.png"
  },
  "/img/img/site/github-site-pages.png": {
    "type": "image/png",
    "etag": "\"1675a-zmibzciGVfjH/dTjmPEMiwqXlSk\"",
    "mtime": "2025-01-17T07:22:59.344Z",
    "size": 91994,
    "path": "../public/img/img/site/github-site-pages.png"
  },
  "/img/img/site/hexo-default-pages.png": {
    "type": "image/png",
    "etag": "\"49c4d-xbTvV34GixGGdTkhIBbJEirnuxg\"",
    "mtime": "2025-01-17T07:22:59.344Z",
    "size": 302157,
    "path": "../public/img/img/site/hexo-default-pages.png"
  },
  "/img/img/respbian/respbian-01.png": {
    "type": "image/png",
    "etag": "\"131ed-ALLYcDDECYpSBKisLm/D3oFOa3E\"",
    "mtime": "2025-01-17T07:22:59.216Z",
    "size": 78317,
    "path": "../public/img/img/respbian/respbian-01.png"
  },
  "/img/img/respbian/respbian-02.png": {
    "type": "image/png",
    "etag": "\"39cb3-6IYV6CDqjpOKir2I0VnCxNLRRdw\"",
    "mtime": "2025-01-17T07:22:59.342Z",
    "size": 236723,
    "path": "../public/img/img/respbian/respbian-02.png"
  },
  "/img/img/vue2-template/install-vue-cmd-01png.png": {
    "type": "image/png",
    "etag": "\"21e2b-3lnQ6J3YpjMytkzawcI9za7BPdw\"",
    "mtime": "2025-01-17T07:22:59.217Z",
    "size": 138795,
    "path": "../public/img/img/vue2-template/install-vue-cmd-01png.png"
  },
  "/img/img/vue2-template/install-vue-cmd-02.png": {
    "type": "image/png",
    "etag": "\"94b4-G9G/THNIMu7NBI6NqrzAz0UHRE0\"",
    "mtime": "2025-01-17T07:22:59.349Z",
    "size": 38068,
    "path": "../public/img/img/vue2-template/install-vue-cmd-02.png"
  },
  "/img/img/vue2-template/install-vue-cmd-03.png": {
    "type": "image/png",
    "etag": "\"73bf9-aotWkGzAwEfC/1LKTsCujTWXbwo\"",
    "mtime": "2025-01-17T07:22:59.351Z",
    "size": 474105,
    "path": "../public/img/img/vue2-template/install-vue-cmd-03.png"
  },
  "/img/img/vue2-template/install-vue-ui-1.png": {
    "type": "image/png",
    "etag": "\"f575-vxn5Vv5hGz9v8XsGOZO/+CHa8y0\"",
    "mtime": "2025-01-17T07:22:59.348Z",
    "size": 62837,
    "path": "../public/img/img/vue2-template/install-vue-ui-1.png"
  },
  "/img/img/vue2-template/install-vue-ui-2.png": {
    "type": "image/png",
    "etag": "\"62c4-6Vv3/YHbednIDVdOzEC71hsTPGY\"",
    "mtime": "2025-01-17T07:22:59.349Z",
    "size": 25284,
    "path": "../public/img/img/vue2-template/install-vue-ui-2.png"
  },
  "/img/img/vue2-template/install-vue-ui.png": {
    "type": "image/png",
    "etag": "\"7611-0DFKmSVKKhs+vN8JPqHmgl2xpCM\"",
    "mtime": "2025-01-17T07:22:59.349Z",
    "size": 30225,
    "path": "../public/img/img/vue2-template/install-vue-ui.png"
  },
  "/img/img/web/1.png": {
    "type": "image/png",
    "etag": "\"2fd-OJUI+gCDtQTQTi7CxHxWD47QN3M\"",
    "mtime": "2025-01-17T07:22:59.216Z",
    "size": 765,
    "path": "../public/img/img/web/1.png"
  },
  "/img/img/web/advert.png": {
    "type": "image/png",
    "etag": "\"401c-mSdPxoCaDxk+1cAGnxJCfNG6SYs\"",
    "mtime": "2025-01-17T07:22:59.346Z",
    "size": 16412,
    "path": "../public/img/img/web/advert.png"
  },
  "/img/img/web/book.png": {
    "type": "image/png",
    "etag": "\"c85-cXFQwGcfRZCpV4SeBTLjuG2L/tA\"",
    "mtime": "2025-01-17T07:22:59.344Z",
    "size": 3205,
    "path": "../public/img/img/web/book.png"
  },
  "/img/img/web/booka.png": {
    "type": "image/png",
    "etag": "\"f18-c6HlmBiQvwfn2gypc97hQe3Z6JE\"",
    "mtime": "2025-01-17T07:22:59.346Z",
    "size": 3864,
    "path": "../public/img/img/web/booka.png"
  },
  "/img/img/web/bookb.png": {
    "type": "image/png",
    "etag": "\"d65-Ujhe1ja4WgJxBwXXI/WFywB6qZo\"",
    "mtime": "2025-01-17T07:22:59.343Z",
    "size": 3429,
    "path": "../public/img/img/web/bookb.png"
  },
  "/img/img/web/bookc.png": {
    "type": "image/png",
    "etag": "\"f31-EDwOjLDAqWRvto5A3344yDpD81Y\"",
    "mtime": "2025-01-17T07:22:59.343Z",
    "size": 3889,
    "path": "../public/img/img/web/bookc.png"
  },
  "/img/img/web/favicon.ico": {
    "type": "image/vnd.microsoft.icon",
    "etag": "\"423e-iXkz8yCWv0IM5eP3QsFybm3L3KE\"",
    "mtime": "2025-01-17T07:22:59.344Z",
    "size": 16958,
    "path": "../public/img/img/web/favicon.ico"
  },
  "/img/img/web/favicon.png": {
    "type": "image/png",
    "etag": "\"ecb-F8fwhi1EiURW+JzEIWqf92abTgA\"",
    "mtime": "2025-01-17T07:22:59.344Z",
    "size": 3787,
    "path": "../public/img/img/web/favicon.png"
  },
  "/img/img/web/header.jpg": {
    "type": "image/jpeg",
    "etag": "\"5367-PB/Uo4HtLL2fLRCiQk1LbfxY+QU\"",
    "mtime": "2025-01-17T07:22:59.346Z",
    "size": 21351,
    "path": "../public/img/img/web/header.jpg"
  },
  "/img/img/web/logo-f.png": {
    "type": "image/png",
    "etag": "\"8611-fgaX7aiuRJpYcszC3/aYaOeHz58\"",
    "mtime": "2025-01-17T07:22:59.346Z",
    "size": 34321,
    "path": "../public/img/img/web/logo-f.png"
  },
  "/img/img/web/logo-l.png": {
    "type": "image/png",
    "etag": "\"419a-4pTNBMCacRB2RFA9X50EGxc/Kig\"",
    "mtime": "2025-01-17T07:22:59.346Z",
    "size": 16794,
    "path": "../public/img/img/web/logo-l.png"
  },
  "/img/img/web/logo.png": {
    "type": "image/png",
    "etag": "\"1f79-jNX+038oNBTvtufs3mfCf/zVXtY\"",
    "mtime": "2025-01-17T07:22:59.347Z",
    "size": 8057,
    "path": "../public/img/img/web/logo.png"
  },
  "/img/img/web/qq.jpg": {
    "type": "image/jpeg",
    "etag": "\"208de-Fal705lvUd7EPEZf2Q/Co0vSxXw\"",
    "mtime": "2025-01-17T07:22:59.348Z",
    "size": 133342,
    "path": "../public/img/img/web/qq.jpg"
  },
  "/img/img/web/wechat.jpg": {
    "type": "image/jpeg",
    "etag": "\"14b27-zrOioa6qZr7CeAGh8xR7TD9Cns8\"",
    "mtime": "2025-01-17T07:22:59.348Z",
    "size": 84775,
    "path": "../public/img/img/web/wechat.jpg"
  },
  "/img/img/d3/vue-d3/001-搭建项目.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"132-q2nIqb5HHmXdZtqsSx1Epmr1dno\"",
    "mtime": "2025-01-17T07:22:59.235Z",
    "size": 306,
    "path": "../public/img/img/d3/vue-d3/001-搭建项目.md"
  },
  "/img/img/d3/vue-d3/002-项目路由.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2025-01-17T07:22:59.350Z",
    "size": 0,
    "path": "../public/img/img/d3/vue-d3/002-项目路由.md"
  },
  "/img/d3/vue-d3/001-搭建项目.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"132-q2nIqb5HHmXdZtqsSx1Epmr1dno\"",
    "mtime": "2025-01-17T07:22:59.209Z",
    "size": 306,
    "path": "../public/img/d3/vue-d3/001-搭建项目.md"
  },
  "/img/d3/vue-d3/002-项目路由.md": {
    "type": "text/markdown; charset=utf-8",
    "etag": "\"0-2jmj7l5rSw0yVb/vlWAYkK/YBwk\"",
    "mtime": "2025-01-17T07:22:59.325Z",
    "size": 0,
    "path": "../public/img/d3/vue-d3/002-项目路由.md"
  }
};

const _DRIVE_LETTER_START_RE = /^[A-Za-z]:\//;
function normalizeWindowsPath(input = "") {
  if (!input) {
    return input;
  }
  return input.replace(/\\/g, "/").replace(_DRIVE_LETTER_START_RE, (r) => r.toUpperCase());
}
const _IS_ABSOLUTE_RE = /^[/\\](?![/\\])|^[/\\]{2}(?!\.)|^[A-Za-z]:[/\\]/;
const _DRIVE_LETTER_RE = /^[A-Za-z]:$/;
function cwd() {
  if (typeof process !== "undefined" && typeof process.cwd === "function") {
    return process.cwd().replace(/\\/g, "/");
  }
  return "/";
}
const resolve = function(...arguments_) {
  arguments_ = arguments_.map((argument) => normalizeWindowsPath(argument));
  let resolvedPath = "";
  let resolvedAbsolute = false;
  for (let index = arguments_.length - 1; index >= -1 && !resolvedAbsolute; index--) {
    const path = index >= 0 ? arguments_[index] : cwd();
    if (!path || path.length === 0) {
      continue;
    }
    resolvedPath = `${path}/${resolvedPath}`;
    resolvedAbsolute = isAbsolute(path);
  }
  resolvedPath = normalizeString(resolvedPath, !resolvedAbsolute);
  if (resolvedAbsolute && !isAbsolute(resolvedPath)) {
    return `/${resolvedPath}`;
  }
  return resolvedPath.length > 0 ? resolvedPath : ".";
};
function normalizeString(path, allowAboveRoot) {
  let res = "";
  let lastSegmentLength = 0;
  let lastSlash = -1;
  let dots = 0;
  let char = null;
  for (let index = 0; index <= path.length; ++index) {
    if (index < path.length) {
      char = path[index];
    } else if (char === "/") {
      break;
    } else {
      char = "/";
    }
    if (char === "/") {
      if (lastSlash === index - 1 || dots === 1) ; else if (dots === 2) {
        if (res.length < 2 || lastSegmentLength !== 2 || res[res.length - 1] !== "." || res[res.length - 2] !== ".") {
          if (res.length > 2) {
            const lastSlashIndex = res.lastIndexOf("/");
            if (lastSlashIndex === -1) {
              res = "";
              lastSegmentLength = 0;
            } else {
              res = res.slice(0, lastSlashIndex);
              lastSegmentLength = res.length - 1 - res.lastIndexOf("/");
            }
            lastSlash = index;
            dots = 0;
            continue;
          } else if (res.length > 0) {
            res = "";
            lastSegmentLength = 0;
            lastSlash = index;
            dots = 0;
            continue;
          }
        }
        if (allowAboveRoot) {
          res += res.length > 0 ? "/.." : "..";
          lastSegmentLength = 2;
        }
      } else {
        if (res.length > 0) {
          res += `/${path.slice(lastSlash + 1, index)}`;
        } else {
          res = path.slice(lastSlash + 1, index);
        }
        lastSegmentLength = index - lastSlash - 1;
      }
      lastSlash = index;
      dots = 0;
    } else if (char === "." && dots !== -1) {
      ++dots;
    } else {
      dots = -1;
    }
  }
  return res;
}
const isAbsolute = function(p) {
  return _IS_ABSOLUTE_RE.test(p);
};
const _EXTNAME_RE = /.(\.[^./]+)$/;
const extname = function(p) {
  const match = _EXTNAME_RE.exec(normalizeWindowsPath(p));
  return match && match[1] || "";
};
const dirname = function(p) {
  const segments = normalizeWindowsPath(p).replace(/\/$/, "").split("/").slice(0, -1);
  if (segments.length === 1 && _DRIVE_LETTER_RE.test(segments[0])) {
    segments[0] += "/";
  }
  return segments.join("/") || (isAbsolute(p) ? "/" : ".");
};

function readAsset (id) {
  const serverDir = dirname(fileURLToPath(globalThis._importMeta_.url));
  return promises.readFile(resolve(serverDir, assets$1[id].path))
}

const publicAssetBases = {"/_nuxt/builds/meta/":{"maxAge":31536000},"/_nuxt/builds/":{"maxAge":1},"/_nuxt/":{"maxAge":31536000}};

function isPublicAssetURL(id = '') {
  if (assets$1[id]) {
    return true
  }
  for (const base in publicAssetBases) {
    if (id.startsWith(base)) { return true }
  }
  return false
}

function getAsset (id) {
  return assets$1[id]
}

const METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
const EncodingMap = { gzip: ".gz", br: ".br" };
const _JRQJEt = eventHandler((event) => {
  if (event.method && !METHODS.has(event.method)) {
    return;
  }
  let id = decodePath(
    withLeadingSlash(withoutTrailingSlash(parseURL(event.path).pathname))
  );
  let asset;
  const encodingHeader = String(
    getRequestHeader(event, "accept-encoding") || ""
  );
  const encodings = [
    ...encodingHeader.split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(),
    ""
  ];
  if (encodings.length > 1) {
    appendResponseHeader(event, "Vary", "Accept-Encoding");
  }
  for (const encoding of encodings) {
    for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
      const _asset = getAsset(_id);
      if (_asset) {
        asset = _asset;
        id = _id;
        break;
      }
    }
  }
  if (!asset) {
    if (isPublicAssetURL(id)) {
      removeResponseHeader(event, "Cache-Control");
      throw createError$1({
        statusMessage: "Cannot find static asset " + id,
        statusCode: 404
      });
    }
    return;
  }
  const ifNotMatch = getRequestHeader(event, "if-none-match") === asset.etag;
  if (ifNotMatch) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  const ifModifiedSinceH = getRequestHeader(event, "if-modified-since");
  const mtimeDate = new Date(asset.mtime);
  if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
    setResponseStatus(event, 304, "Not Modified");
    return "";
  }
  if (asset.type && !getResponseHeader(event, "Content-Type")) {
    setResponseHeader(event, "Content-Type", asset.type);
  }
  if (asset.etag && !getResponseHeader(event, "ETag")) {
    setResponseHeader(event, "ETag", asset.etag);
  }
  if (asset.mtime && !getResponseHeader(event, "Last-Modified")) {
    setResponseHeader(event, "Last-Modified", mtimeDate.toUTCString());
  }
  if (asset.encoding && !getResponseHeader(event, "Content-Encoding")) {
    setResponseHeader(event, "Content-Encoding", asset.encoding);
  }
  if (asset.size > 0 && !getResponseHeader(event, "Content-Length")) {
    setResponseHeader(event, "Content-Length", asset.size);
  }
  return readAsset(id);
});

const _nEvOL6 = eventHandler(async (event) => {
  const { code, lang, theme: themeString, options: optionsStr } = getQuery(event);
  const theme = JSON.parse(themeString);
  const options = optionsStr ? JSON.parse(optionsStr) : {};
  const highlighter = await import('../build/mdc-highlighter.mjs').then((m) => m.default);
  return await highlighter(code, lang, theme, options);
});

function klona(x) {
	if (typeof x !== 'object') return x;

	var k, tmp, str=Object.prototype.toString.call(x);

	if (str === '[object Object]') {
		if (x.constructor !== Object && typeof x.constructor === 'function') {
			tmp = new x.constructor();
			for (k in x) {
				if (x.hasOwnProperty(k) && tmp[k] !== x[k]) {
					tmp[k] = klona(x[k]);
				}
			}
		} else {
			tmp = {}; // null
			for (k in x) {
				if (k === '__proto__') {
					Object.defineProperty(tmp, k, {
						value: klona(x[k]),
						configurable: true,
						enumerable: true,
						writable: true,
					});
				} else {
					tmp[k] = klona(x[k]);
				}
			}
		}
		return tmp;
	}

	if (str === '[object Array]') {
		k = x.length;
		for (tmp=Array(k); k--;) {
			tmp[k] = klona(x[k]);
		}
		return tmp;
	}

	if (str === '[object Set]') {
		tmp = new Set;
		x.forEach(function (val) {
			tmp.add(klona(val));
		});
		return tmp;
	}

	if (str === '[object Map]') {
		tmp = new Map;
		x.forEach(function (val, key) {
			tmp.set(klona(key), klona(val));
		});
		return tmp;
	}

	if (str === '[object Date]') {
		return new Date(+x);
	}

	if (str === '[object RegExp]') {
		tmp = new RegExp(x.source, x.flags);
		tmp.lastIndex = x.lastIndex;
		return tmp;
	}

	if (str === '[object DataView]') {
		return new x.constructor( klona(x.buffer) );
	}

	if (str === '[object ArrayBuffer]') {
		return x.slice(0);
	}

	// ArrayBuffer.isView(x)
	// ~> `new` bcuz `Buffer.slice` => ref
	if (str.slice(-6) === 'Array]') {
		return new x.constructor(x);
	}

	return x;
}

const defineAppConfig = (config) => config;

const appConfig0 = defineAppConfig({
  myInfo: {
    bgImg: "/img/my-bg.png",
    name: "\u524D\u7AEF\u5C0F\u4E66\u7AE5",
    desc: "\u5E73\u5E73\u65E0\u5947 \u5C0F\u82B1\u74F6",
    avatar: "/img/header.png",
    links: [
      {
        label: "github",
        img: "/img/GitHub.png",
        link: "https://github.com/wenjuGao"
      },
      {
        label: "twitter",
        img: "/img/twitter.png",
        link: "https://twitter.com/6QJM6pzFNe2TiEu"
      },
      {
        label: "\u6398\u91D1",
        img: "/img/juejin.png",
        link: "https://juejin.cn/user/2383396937933166"
      },
      {
        label: "telegram",
        img: "/img/telegram.png",
        link: "https://t.me/FrontEndDevep"
      }
    ]
  },
  headerMenu: [
    {
      label: "\u9996\u9875",
      link: "",
      class: "primary",
      icon: "group-hover:i-mdi-home-circle  i-mdi-home-circle-outline"
    },
    {
      label: "\u5F52\u6863",
      link: "archives",
      class: "primary",
      icon: "i-mdi-archive-star-outline group-hover:i-mdi-archive-star"
    },
    {
      label: "\u5B9E\u9A8C\u5BA4",
      link: "laboratory",
      class: "primary",
      icon: "i-mdi-toggle-switch-variant-off group-hover:i-mdi-toggle-switch-variant"
    },
    {
      label: "\u5173\u4E8E",
      link: "about",
      class: "primary",
      icon: "i-mdi-card-bulleted-settings-outline group-hover:i-mdi-heart-box-outline"
    }
  ],
  categoryMenu: [
    {
      label: "javascript",
      link: "javascript",
      value: ["javascript", "Javascript", "js", "JS"],
      class: "primary",
      img: "/img/javascript.png"
    },
    {
      label: "Vue",
      link: "vue",
      value: ["vue", "Vue", "vuejs", "VUE", "vue2", "vue3", "Vue3", "Vue3"],
      class: "secondary",
      img: "/img/vue.jpg"
    },
    {
      label: "React",
      link: "react",
      value: ["React", "react", "reactjs", "react native", "react Native", "react16", "react18", "preact"],
      class: "accent",
      img: "/img/react.svg"
    },
    // {
    // 	label: 'Svelte',
    // 	link: '/Svelte'
    // },
    {
      label: "\u5C0F\u7A0B\u5E8F",
      link: "miniprogram",
      value: ["\u5C0F\u7A0B\u5E8F", "\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F", "uniapp", "taro", "tarojs"],
      class: "neutral",
      img: "/img/miniprogram.svg"
    },
    {
      label: "\u7B97\u6CD5",
      link: "leetcode",
      value: ["leetcode", "\u7B97\u6CD5"],
      class: "info",
      img: "/img/leetcode.webp"
    },
    {
      label: "\u7B14\u8BB0",
      link: "note",
      value: ["note", "\u7B14\u8BB0", "\u7FFB\u8BD1", "\u6536\u85CF"],
      class: "warning",
      img: "/img/note.png"
    },
    {
      label: "\u9762\u8BD5",
      link: "interview",
      value: ["interview", "\u9762\u8BD5"],
      class: "error",
      img: "/img/interview.png"
    },
    {
      label: "\u5176\u4ED6",
      link: "other",
      value: ["other", "\u5176\u4ED6"],
      class: "success",
      img: "/img/article.png"
    }
  ],
  imgHold: "https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
});

const inlineAppConfig = {
  "nuxt": {}
};

const appConfig = defuFn(appConfig0, inlineAppConfig);

const NUMBER_CHAR_RE = /\d/;
const STR_SPLITTERS = ["-", "_", "/", "."];
function isUppercase(char = "") {
  if (NUMBER_CHAR_RE.test(char)) {
    return undefined;
  }
  return char !== char.toLowerCase();
}
function splitByCase(str, separators) {
  const splitters = STR_SPLITTERS;
  const parts = [];
  if (!str || typeof str !== "string") {
    return parts;
  }
  let buff = "";
  let previousUpper;
  let previousSplitter;
  for (const char of str) {
    const isSplitter = splitters.includes(char);
    if (isSplitter === true) {
      parts.push(buff);
      buff = "";
      previousUpper = undefined;
      continue;
    }
    const isUpper = isUppercase(char);
    if (previousSplitter === false) {
      if (previousUpper === false && isUpper === true) {
        parts.push(buff);
        buff = char;
        previousUpper = isUpper;
        continue;
      }
      if (previousUpper === true && isUpper === false && buff.length > 1) {
        const lastChar = buff.at(-1);
        parts.push(buff.slice(0, Math.max(0, buff.length - 1)));
        buff = lastChar + char;
        previousUpper = isUpper;
        continue;
      }
    }
    buff += char;
    previousUpper = isUpper;
    previousSplitter = isSplitter;
  }
  parts.push(buff);
  return parts;
}
function upperFirst(str) {
  return str ? str[0].toUpperCase() + str.slice(1) : "";
}
function lowerFirst(str) {
  return str ? str[0].toLowerCase() + str.slice(1) : "";
}
function pascalCase(str, opts) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => upperFirst(opts?.normalize ? p.toLowerCase() : p)).join("") : "";
}
function camelCase(str, opts) {
  return lowerFirst(pascalCase(str || "", opts));
}
function kebabCase(str, joiner) {
  return str ? (Array.isArray(str) ? str : splitByCase(str)).map((p) => p.toLowerCase()).join(joiner ?? "-") : "";
}
function snakeCase(str) {
  return kebabCase(str || "", "_");
}

function getEnv(key, opts) {
  const envKey = snakeCase(key).toUpperCase();
  return destr(
    process.env[opts.prefix + envKey] ?? process.env[opts.altPrefix + envKey]
  );
}
function _isObject(input) {
  return typeof input === "object" && !Array.isArray(input);
}
function applyEnv(obj, opts, parentKey = "") {
  for (const key in obj) {
    const subKey = parentKey ? `${parentKey}_${key}` : key;
    const envValue = getEnv(subKey, opts);
    if (_isObject(obj[key])) {
      if (_isObject(envValue)) {
        obj[key] = { ...obj[key], ...envValue };
        applyEnv(obj[key], opts, subKey);
      } else if (envValue === undefined) {
        applyEnv(obj[key], opts, subKey);
      } else {
        obj[key] = envValue ?? obj[key];
      }
    } else {
      obj[key] = envValue ?? obj[key];
    }
    if (opts.envExpansion && typeof obj[key] === "string") {
      obj[key] = _expandFromEnv(obj[key]);
    }
  }
  return obj;
}
const envExpandRx = /{{(.*?)}}/g;
function _expandFromEnv(value) {
  return value.replace(envExpandRx, (match, key) => {
    return process.env[key] || match;
  });
}

const _inlineRuntimeConfig = {
  "app": {
    "baseURL": "/",
    "buildId": "a0b8f4d7-6b85-4814-a8c4-2e4ca3d0740d",
    "buildAssetsDir": "/_nuxt/",
    "cdnURL": "",
    "title": "前端小书童",
    "logo": "/img/logo.png",
    "footLogo": "/img/qrcode.jpg",
    "description": "前端工程师的杂货铺"
  },
  "nitro": {
    "envPrefix": "NUXT_",
    "routeRules": {
      "/__nuxt_error": {
        "cache": false
      },
      "/**": {
        "isr": false
      },
      "/_nuxt/builds/meta/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      },
      "/_nuxt/builds/**": {
        "headers": {
          "cache-control": "public, max-age=1, immutable"
        }
      },
      "/_nuxt/**": {
        "headers": {
          "cache-control": "public, max-age=31536000, immutable"
        }
      }
    }
  },
  "public": {
    "apiBase": "/api",
    "mdc": {
      "components": {
        "prose": true,
        "map": {
          "p": "prose-p",
          "a": "prose-a",
          "blockquote": "prose-blockquote",
          "code-inline": "prose-code-inline",
          "code": "ProseCodeInline",
          "em": "prose-em",
          "h1": "prose-h1",
          "h2": "prose-h2",
          "h3": "prose-h3",
          "h4": "prose-h4",
          "h5": "prose-h5",
          "h6": "prose-h6",
          "hr": "prose-hr",
          "img": "prose-img",
          "ul": "prose-ul",
          "ol": "prose-ol",
          "li": "prose-li",
          "strong": "prose-strong",
          "table": "prose-table",
          "thead": "prose-thead",
          "tbody": "prose-tbody",
          "td": "prose-td",
          "th": "prose-th",
          "tr": "prose-tr"
        }
      },
      "headings": {
        "anchorLinks": {
          "h1": false,
          "h2": true,
          "h3": true,
          "h4": true,
          "h5": false,
          "h6": false
        }
      }
    },
    "content": {
      "locales": [],
      "defaultLocale": "",
      "integrity": 1737098554324,
      "experimental": {
        "stripQueryParameters": false,
        "advanceQuery": false,
        "clientDB": false
      },
      "respectPathCase": false,
      "api": {
        "baseURL": "/api/_content"
      },
      "navigation": {
        "fields": [
          "layout"
        ]
      },
      "tags": {
        "p": "prose-p",
        "a": "prose-a",
        "blockquote": "prose-blockquote",
        "code-inline": "prose-code-inline",
        "code": "ProseCodeInline",
        "em": "prose-em",
        "h1": "prose-h1",
        "h2": "prose-h2",
        "h3": "prose-h3",
        "h4": "prose-h4",
        "h5": "prose-h5",
        "h6": "prose-h6",
        "hr": "prose-hr",
        "img": "prose-img",
        "ul": "prose-ul",
        "ol": "prose-ol",
        "li": "prose-li",
        "strong": "prose-strong",
        "table": "prose-table",
        "thead": "prose-thead",
        "tbody": "prose-tbody",
        "td": "prose-td",
        "th": "prose-th",
        "tr": "prose-tr"
      },
      "highlight": {
        "theme": {
          "default": "vitesse-dark",
          "dark": "vitesse-dark",
          "sepia": "monokai"
        },
        "langs": [
          "json",
          "js",
          "ts",
          "html",
          "css",
          "vue",
          "shell",
          "mdc",
          "md",
          "yaml",
          "xml",
          "javascript",
          "docker",
          "py",
          "mermaid",
          "diff",
          "json",
          "js",
          "ts",
          "css",
          "shell",
          "html",
          "md",
          "yaml"
        ],
        "preload": [
          "diff",
          "json",
          "js",
          "ts",
          "css",
          "shell",
          "html",
          "md",
          "yaml"
        ],
        "highlighter": "shiki",
        "shikiEngine": "oniguruma"
      },
      "wsUrl": "",
      "documentDriven": {
        "page": true,
        "navigation": true,
        "surround": true,
        "globals": {},
        "layoutFallbacks": [
          "theme"
        ],
        "injectPage": true
      },
      "host": "",
      "trailingSlash": false,
      "search": "",
      "contentHead": true,
      "anchorLinks": {
        "depth": 4,
        "exclude": [
          1
        ]
      }
    }
  },
  "apiSecret": "123",
  "content": {
    "cacheVersion": 2,
    "cacheIntegrity": "NYAukwrEIx",
    "transformers": [],
    "base": "",
    "api": {
      "baseURL": "/api/_content"
    },
    "watch": {
      "ws": {
        "port": {
          "port": 4000,
          "portRange": [
            4000,
            4040
          ]
        },
        "hostname": "localhost",
        "showURL": false
      }
    },
    "sources": {},
    "ignores": [],
    "locales": [],
    "defaultLocale": "",
    "highlight": {
      "theme": {
        "default": "vitesse-dark",
        "dark": "vitesse-dark",
        "sepia": "monokai"
      },
      "langs": [
        "json",
        "js",
        "ts",
        "html",
        "css",
        "vue",
        "shell",
        "mdc",
        "md",
        "yaml",
        "xml",
        "javascript",
        "docker",
        "py",
        "mermaid",
        "diff",
        "json",
        "js",
        "ts",
        "css",
        "shell",
        "html",
        "md",
        "yaml"
      ],
      "preload": [
        "diff",
        "json",
        "js",
        "ts",
        "css",
        "shell",
        "html",
        "md",
        "yaml"
      ],
      "highlighter": "shiki",
      "shikiEngine": "oniguruma"
    },
    "markdown": {
      "tags": {
        "p": "prose-p",
        "a": "prose-a",
        "blockquote": "prose-blockquote",
        "code-inline": "prose-code-inline",
        "code": "ProseCodeInline",
        "em": "prose-em",
        "h1": "prose-h1",
        "h2": "prose-h2",
        "h3": "prose-h3",
        "h4": "prose-h4",
        "h5": "prose-h5",
        "h6": "prose-h6",
        "hr": "prose-hr",
        "img": "prose-img",
        "ul": "prose-ul",
        "ol": "prose-ol",
        "li": "prose-li",
        "strong": "prose-strong",
        "table": "prose-table",
        "thead": "prose-thead",
        "tbody": "prose-tbody",
        "td": "prose-td",
        "th": "prose-th",
        "tr": "prose-tr"
      },
      "anchorLinks": {
        "depth": 4,
        "exclude": [
          1
        ]
      },
      "remarkPlugins": {
        "remark-emoji": {
          "emoticon": true
        },
        "remark-gfm": true
      },
      "rehypePlugins": {}
    },
    "yaml": {},
    "csv": {
      "delimeter": ",",
      "json": true
    },
    "navigation": {
      "fields": [
        "layout"
      ]
    },
    "contentHead": true,
    "documentDriven": true,
    "respectPathCase": false,
    "experimental": {
      "clientDB": false,
      "cacheContents": true,
      "stripQueryParameters": false,
      "advanceQuery": false,
      "search": ""
    },
    "toc": {
      "depth": 2,
      "searchDepth": 2
    }
  }
};
const envOptions = {
  prefix: "NITRO_",
  altPrefix: _inlineRuntimeConfig.nitro.envPrefix ?? process.env.NITRO_ENV_PREFIX ?? "_",
  envExpansion: _inlineRuntimeConfig.nitro.envExpansion ?? process.env.NITRO_ENV_EXPANSION ?? false
};
const _sharedRuntimeConfig = _deepFreeze(
  applyEnv(klona(_inlineRuntimeConfig), envOptions)
);
function useRuntimeConfig(event) {
  if (!event) {
    return _sharedRuntimeConfig;
  }
  if (event.context.nitro.runtimeConfig) {
    return event.context.nitro.runtimeConfig;
  }
  const runtimeConfig = klona(_inlineRuntimeConfig);
  applyEnv(runtimeConfig, envOptions);
  event.context.nitro.runtimeConfig = runtimeConfig;
  return runtimeConfig;
}
_deepFreeze(klona(appConfig));
function _deepFreeze(object) {
  const propNames = Object.getOwnPropertyNames(object);
  for (const name of propNames) {
    const value = object[name];
    if (value && typeof value === "object") {
      _deepFreeze(value);
    }
  }
  return Object.freeze(object);
}
new Proxy(/* @__PURE__ */ Object.create(null), {
  get: (_, prop) => {
    console.warn(
      "Please use `useRuntimeConfig()` instead of accessing config directly."
    );
    const runtimeConfig = useRuntimeConfig();
    if (prop in runtimeConfig) {
      return runtimeConfig[prop];
    }
    return undefined;
  }
});

function wrapToPromise(value) {
  if (!value || typeof value.then !== "function") {
    return Promise.resolve(value);
  }
  return value;
}
function asyncCall(function_, ...arguments_) {
  try {
    return wrapToPromise(function_(...arguments_));
  } catch (error) {
    return Promise.reject(error);
  }
}
function isPrimitive(value) {
  const type = typeof value;
  return value === null || type !== "object" && type !== "function";
}
function isPureObject(value) {
  const proto = Object.getPrototypeOf(value);
  return !proto || proto.isPrototypeOf(Object);
}
function stringify(value) {
  if (isPrimitive(value)) {
    return String(value);
  }
  if (isPureObject(value) || Array.isArray(value)) {
    return JSON.stringify(value);
  }
  if (typeof value.toJSON === "function") {
    return stringify(value.toJSON());
  }
  throw new Error("[unstorage] Cannot stringify value!");
}
const BASE64_PREFIX = "base64:";
function serializeRaw(value) {
  if (typeof value === "string") {
    return value;
  }
  return BASE64_PREFIX + base64Encode(value);
}
function deserializeRaw(value) {
  if (typeof value !== "string") {
    return value;
  }
  if (!value.startsWith(BASE64_PREFIX)) {
    return value;
  }
  return base64Decode(value.slice(BASE64_PREFIX.length));
}
function base64Decode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input, "base64");
  }
  return Uint8Array.from(
    globalThis.atob(input),
    (c) => c.codePointAt(0)
  );
}
function base64Encode(input) {
  if (globalThis.Buffer) {
    return Buffer.from(input).toString("base64");
  }
  return globalThis.btoa(String.fromCodePoint(...input));
}

const storageKeyProperties = [
  "hasItem",
  "getItem",
  "getItemRaw",
  "setItem",
  "setItemRaw",
  "removeItem",
  "getMeta",
  "setMeta",
  "removeMeta",
  "getKeys",
  "clear",
  "mount",
  "unmount"
];
function prefixStorage(storage, base) {
  base = normalizeBaseKey(base);
  if (!base) {
    return storage;
  }
  const nsStorage = { ...storage };
  for (const property of storageKeyProperties) {
    nsStorage[property] = (key = "", ...args) => (
      // @ts-ignore
      storage[property](base + key, ...args)
    );
  }
  nsStorage.getKeys = (key = "", ...arguments_) => storage.getKeys(base + key, ...arguments_).then((keys) => keys.map((key2) => key2.slice(base.length)));
  return nsStorage;
}
function normalizeKey$2(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
}
function joinKeys(...keys) {
  return normalizeKey$2(keys.join(":"));
}
function normalizeBaseKey(base) {
  base = normalizeKey$2(base);
  return base ? base + ":" : "";
}

function defineDriver$1(factory) {
  return factory;
}

const DRIVER_NAME$3 = "memory";
const memory = defineDriver$1(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME$3,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

function createStorage(options = {}) {
  const context = {
    mounts: { "": options.driver || memory() },
    mountpoints: [""],
    watching: false,
    watchListeners: [],
    unwatch: {}
  };
  const getMount = (key) => {
    for (const base of context.mountpoints) {
      if (key.startsWith(base)) {
        return {
          base,
          relativeKey: key.slice(base.length),
          driver: context.mounts[base]
        };
      }
    }
    return {
      base: "",
      relativeKey: key,
      driver: context.mounts[""]
    };
  };
  const getMounts = (base, includeParent) => {
    return context.mountpoints.filter(
      (mountpoint) => mountpoint.startsWith(base) || includeParent && base.startsWith(mountpoint)
    ).map((mountpoint) => ({
      relativeBase: base.length > mountpoint.length ? base.slice(mountpoint.length) : undefined,
      mountpoint,
      driver: context.mounts[mountpoint]
    }));
  };
  const onChange = (event, key) => {
    if (!context.watching) {
      return;
    }
    key = normalizeKey$2(key);
    for (const listener of context.watchListeners) {
      listener(event, key);
    }
  };
  const startWatch = async () => {
    if (context.watching) {
      return;
    }
    context.watching = true;
    for (const mountpoint in context.mounts) {
      context.unwatch[mountpoint] = await watch(
        context.mounts[mountpoint],
        onChange,
        mountpoint
      );
    }
  };
  const stopWatch = async () => {
    if (!context.watching) {
      return;
    }
    for (const mountpoint in context.unwatch) {
      await context.unwatch[mountpoint]();
    }
    context.unwatch = {};
    context.watching = false;
  };
  const runBatch = (items, commonOptions, cb) => {
    const batches = /* @__PURE__ */ new Map();
    const getBatch = (mount) => {
      let batch = batches.get(mount.base);
      if (!batch) {
        batch = {
          driver: mount.driver,
          base: mount.base,
          items: []
        };
        batches.set(mount.base, batch);
      }
      return batch;
    };
    for (const item of items) {
      const isStringItem = typeof item === "string";
      const key = normalizeKey$2(isStringItem ? item : item.key);
      const value = isStringItem ? undefined : item.value;
      const options2 = isStringItem || !item.options ? commonOptions : { ...commonOptions, ...item.options };
      const mount = getMount(key);
      getBatch(mount).items.push({
        key,
        value,
        relativeKey: mount.relativeKey,
        options: options2
      });
    }
    return Promise.all([...batches.values()].map((batch) => cb(batch))).then(
      (r) => r.flat()
    );
  };
  const storage = {
    // Item
    hasItem(key, opts = {}) {
      key = normalizeKey$2(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.hasItem, relativeKey, opts);
    },
    getItem(key, opts = {}) {
      key = normalizeKey$2(key);
      const { relativeKey, driver } = getMount(key);
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => destr(value)
      );
    },
    getItems(items, commonOptions = {}) {
      return runBatch(items, commonOptions, (batch) => {
        if (batch.driver.getItems) {
          return asyncCall(
            batch.driver.getItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              options: item.options
            })),
            commonOptions
          ).then(
            (r) => r.map((item) => ({
              key: joinKeys(batch.base, item.key),
              value: destr(item.value)
            }))
          );
        }
        return Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.getItem,
              item.relativeKey,
              item.options
            ).then((value) => ({
              key: item.key,
              value: destr(value)
            }));
          })
        );
      });
    },
    getItemRaw(key, opts = {}) {
      key = normalizeKey$2(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.getItemRaw) {
        return asyncCall(driver.getItemRaw, relativeKey, opts);
      }
      return asyncCall(driver.getItem, relativeKey, opts).then(
        (value) => deserializeRaw(value)
      );
    },
    async setItem(key, value, opts = {}) {
      if (value === undefined) {
        return storage.removeItem(key);
      }
      key = normalizeKey$2(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.setItem) {
        return;
      }
      await asyncCall(driver.setItem, relativeKey, stringify(value), opts);
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async setItems(items, commonOptions) {
      await runBatch(items, commonOptions, async (batch) => {
        if (batch.driver.setItems) {
          return asyncCall(
            batch.driver.setItems,
            batch.items.map((item) => ({
              key: item.relativeKey,
              value: stringify(item.value),
              options: item.options
            })),
            commonOptions
          );
        }
        if (!batch.driver.setItem) {
          return;
        }
        await Promise.all(
          batch.items.map((item) => {
            return asyncCall(
              batch.driver.setItem,
              item.relativeKey,
              stringify(item.value),
              item.options
            );
          })
        );
      });
    },
    async setItemRaw(key, value, opts = {}) {
      if (value === undefined) {
        return storage.removeItem(key, opts);
      }
      key = normalizeKey$2(key);
      const { relativeKey, driver } = getMount(key);
      if (driver.setItemRaw) {
        await asyncCall(driver.setItemRaw, relativeKey, value, opts);
      } else if (driver.setItem) {
        await asyncCall(driver.setItem, relativeKey, serializeRaw(value), opts);
      } else {
        return;
      }
      if (!driver.watch) {
        onChange("update", key);
      }
    },
    async removeItem(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { removeMeta: opts };
      }
      key = normalizeKey$2(key);
      const { relativeKey, driver } = getMount(key);
      if (!driver.removeItem) {
        return;
      }
      await asyncCall(driver.removeItem, relativeKey, opts);
      if (opts.removeMeta || opts.removeMata) {
        await asyncCall(driver.removeItem, relativeKey + "$", opts);
      }
      if (!driver.watch) {
        onChange("remove", key);
      }
    },
    // Meta
    async getMeta(key, opts = {}) {
      if (typeof opts === "boolean") {
        opts = { nativeOnly: opts };
      }
      key = normalizeKey$2(key);
      const { relativeKey, driver } = getMount(key);
      const meta = /* @__PURE__ */ Object.create(null);
      if (driver.getMeta) {
        Object.assign(meta, await asyncCall(driver.getMeta, relativeKey, opts));
      }
      if (!opts.nativeOnly) {
        const value = await asyncCall(
          driver.getItem,
          relativeKey + "$",
          opts
        ).then((value_) => destr(value_));
        if (value && typeof value === "object") {
          if (typeof value.atime === "string") {
            value.atime = new Date(value.atime);
          }
          if (typeof value.mtime === "string") {
            value.mtime = new Date(value.mtime);
          }
          Object.assign(meta, value);
        }
      }
      return meta;
    },
    setMeta(key, value, opts = {}) {
      return this.setItem(key + "$", value, opts);
    },
    removeMeta(key, opts = {}) {
      return this.removeItem(key + "$", opts);
    },
    // Keys
    async getKeys(base, opts = {}) {
      base = normalizeBaseKey(base);
      const mounts = getMounts(base, true);
      let maskedMounts = [];
      const allKeys = [];
      for (const mount of mounts) {
        const rawKeys = await asyncCall(
          mount.driver.getKeys,
          mount.relativeBase,
          opts
        );
        for (const key of rawKeys) {
          const fullKey = mount.mountpoint + normalizeKey$2(key);
          if (!maskedMounts.some((p) => fullKey.startsWith(p))) {
            allKeys.push(fullKey);
          }
        }
        maskedMounts = [
          mount.mountpoint,
          ...maskedMounts.filter((p) => !p.startsWith(mount.mountpoint))
        ];
      }
      return base ? allKeys.filter(
        (key) => key.startsWith(base) && key[key.length - 1] !== "$"
      ) : allKeys.filter((key) => key[key.length - 1] !== "$");
    },
    // Utils
    async clear(base, opts = {}) {
      base = normalizeBaseKey(base);
      await Promise.all(
        getMounts(base, false).map(async (m) => {
          if (m.driver.clear) {
            return asyncCall(m.driver.clear, m.relativeBase, opts);
          }
          if (m.driver.removeItem) {
            const keys = await m.driver.getKeys(m.relativeBase || "", opts);
            return Promise.all(
              keys.map((key) => m.driver.removeItem(key, opts))
            );
          }
        })
      );
    },
    async dispose() {
      await Promise.all(
        Object.values(context.mounts).map((driver) => dispose(driver))
      );
    },
    async watch(callback) {
      await startWatch();
      context.watchListeners.push(callback);
      return async () => {
        context.watchListeners = context.watchListeners.filter(
          (listener) => listener !== callback
        );
        if (context.watchListeners.length === 0) {
          await stopWatch();
        }
      };
    },
    async unwatch() {
      context.watchListeners = [];
      await stopWatch();
    },
    // Mount
    mount(base, driver) {
      base = normalizeBaseKey(base);
      if (base && context.mounts[base]) {
        throw new Error(`already mounted at ${base}`);
      }
      if (base) {
        context.mountpoints.push(base);
        context.mountpoints.sort((a, b) => b.length - a.length);
      }
      context.mounts[base] = driver;
      if (context.watching) {
        Promise.resolve(watch(driver, onChange, base)).then((unwatcher) => {
          context.unwatch[base] = unwatcher;
        }).catch(console.error);
      }
      return storage;
    },
    async unmount(base, _dispose = true) {
      base = normalizeBaseKey(base);
      if (!base || !context.mounts[base]) {
        return;
      }
      if (context.watching && base in context.unwatch) {
        context.unwatch[base]?.();
        delete context.unwatch[base];
      }
      if (_dispose) {
        await dispose(context.mounts[base]);
      }
      context.mountpoints = context.mountpoints.filter((key) => key !== base);
      delete context.mounts[base];
    },
    getMount(key = "") {
      key = normalizeKey$2(key) + ":";
      const m = getMount(key);
      return {
        driver: m.driver,
        base: m.base
      };
    },
    getMounts(base = "", opts = {}) {
      base = normalizeKey$2(base);
      const mounts = getMounts(base, opts.parents);
      return mounts.map((m) => ({
        driver: m.driver,
        base: m.mountpoint
      }));
    },
    // Aliases
    keys: (base, opts = {}) => storage.getKeys(base, opts),
    get: (key, opts = {}) => storage.getItem(key, opts),
    set: (key, value, opts = {}) => storage.setItem(key, value, opts),
    has: (key, opts = {}) => storage.hasItem(key, opts),
    del: (key, opts = {}) => storage.removeItem(key, opts),
    remove: (key, opts = {}) => storage.removeItem(key, opts)
  };
  return storage;
}
function watch(driver, onChange, base) {
  return driver.watch ? driver.watch((event, key) => onChange(event, base + key)) : () => {
  };
}
async function dispose(driver) {
  if (typeof driver.dispose === "function") {
    await asyncCall(driver.dispose);
  }
}

const _assets = {
  ["nitro:bundled:cache:content:content-index.json"]: {
    import: () => import('../raw/content-index.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"114d-vpcUXzuRBSDLELP1RriSHFTEFrE\"","mtime":"2025-01-17T07:22:59.495Z"}
  },
  ["nitro:bundled:cache:content:content-navigation.json"]: {
    import: () => import('../raw/content-navigation.mjs').then(r => r.default || r),
    meta: {"type":"application/json","etag":"\"1880-6mCTvcuTB+/tBiFoAMUk2HaWQYI\"","mtime":"2025-01-17T07:22:59.494Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:doto:issue.md"]: {
    import: () => import('../raw/issue.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"69d-A44YmSNztXavWiAB/QFT4L+4hNs\"","mtime":"2025-01-17T07:22:59.503Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:doto:job.md"]: {
    import: () => import('../raw/job.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"169-p8peix8Tofna0V1y4kC0CHj+ltA\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:Hexo搭建博客.md"]: {
    import: () => import('../raw/Hexo搭建博客.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"b2cf-jYBPvBAeDaj3PkOBC43cMt+SE/w\"","mtime":"2025-01-17T07:22:59.498Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:Linux_install_MySQL.md"]: {
    import: () => import('../raw/Linux_install_MySQL.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"3a3f-zHSpGqdL9GqxzXslb/eyL1wP+lo\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:Linux_install_git.md"]: {
    import: () => import('../raw/Linux_install_git.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"1f03-BYMXF69IIRUPNxgKqJejRgJPrBE\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:bit.md"]: {
    import: () => import('../raw/bit.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"5e0b-6bCqjgE41AnP5O8d/6q8n+RzyPQ\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:break.md"]: {
    import: () => import('../raw/break.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"19df1-+kusQcL9aHdUHyC50bGr5upuDjk\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:browser.md"]: {
    import: () => import('../raw/browser.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"359f-LjjUYiMEUcQXX1pCBQPkYMAgq2A\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:charts.md"]: {
    import: () => import('../raw/charts.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"a7a-EELISTy8rZfgnna5PO2AW/7vLGY\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:chrome.extensions.01.md"]: {
    import: () => import('../raw/chrome.extensions.01.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"4092-Vc28Ab+fnzn6LwCkoacp7HOcTjU\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:chrome.extensions.02.md"]: {
    import: () => import('../raw/chrome.extensions.02.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"1319-KtRr80c6EAY4qlALBScadFiQc+Y\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:constructor.md"]: {
    import: () => import('../raw/constructor.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"1f63-uP/uEFlhfvy8E9tT5IfR4JoWQT8\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:content.md"]: {
    import: () => import('../raw/content.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"614e-95AfBdBO5dvbeRwNcfuwsh/2fo8\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:css-ellipsis.md"]: {
    import: () => import('../raw/css-ellipsis.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"6bf3-GH/noOGmEmKg91tZOYVQlvwWVVg\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:css-protype.md"]: {
    import: () => import('../raw/css-protype.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"74af-gS4VWtywvPYsJxrIhsNP0GDinDE\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:css-selector.md"]: {
    import: () => import('../raw/css-selector.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"6bd-pS/Jk9p/skb6Gmyz0ovg1bADv0s\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:data-type.md"]: {
    import: () => import('../raw/data-type.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"29e7-h1om89Qt2nRPGf0fGmlDROupws4\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:docker-cmd.md"]: {
    import: () => import('../raw/docker-cmd.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"5be8-Yk/hSDKy/dxpfkPFqZer1rorOlc\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:docker_install_mysql.md"]: {
    import: () => import('../raw/docker_install_mysql.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"9851-F156a3hd3685Sruf9dx5LFcygAk\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:docker_install_redis.md"]: {
    import: () => import('../raw/docker_install_redis.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"255f-m4X9qv5pI/64z/83eaNbAzfreic\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:echarts-view.md"]: {
    import: () => import('../raw/echarts-view.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"5c4-PZaCZFV89BMXIECam242B91I+Lo\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:fex.md"]: {
    import: () => import('../raw/fex.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"fbc8-ZR1bK5z0GJ6J7gkTBL7h4+acgNc\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:flutter-tool.md"]: {
    import: () => import('../raw/flutter-tool.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"1049b-X0+a57PV79v9dG3T0wSe+SYfTgI\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:forin-forof.md"]: {
    import: () => import('../raw/forin-forof.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"7294-fMheDBKTyP7PV4eYQnrf2jYZa8w\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:git-hooks.md"]: {
    import: () => import('../raw/git-hooks.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2da2-JaInnoqlfVBCnzh4h8CPYncjoSE\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:javascript-module.md"]: {
    import: () => import('../raw/javascript-module.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"4d0f-Zm4hzVm5Uz5l3QUo6tLnSt0sdyo\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:markdown基本语法.md"]: {
    import: () => import('../raw/markdown基本语法.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"7279-Ylydfx7l98P4rWohP3+rXMaagJ0\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:pyhon简介及解释器.md"]: {
    import: () => import('../raw/pyhon简介及解释器.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"5396-BwlJN4Sl58H3HwhlQDqLSLpe4oI\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:seal.md"]: {
    import: () => import('../raw/seal.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"35e2-tQZrnJ8mvWSQdnkzSZ48ae/EZ0c\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:single-spa.md"]: {
    import: () => import('../raw/single-spa.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"28099-AeBqKK/Qnv7zxxaMGAyAvWKMNlw\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:svg.md"]: {
    import: () => import('../raw/svg.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"49d37-LTYWWwm8amTlEIJ1/AEPNhEFraU\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:viewtime.md"]: {
    import: () => import('../raw/viewtime.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"35ea-S2A3h78VXKz/5wVxG+xT4fLcHJ0\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:vue@3-01.md"]: {
    import: () => import('../raw/vue_3-01.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2343b-JeV3YbBvX/5fVRrr2MAoWQeZ0tI\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:vue@3-02.md"]: {
    import: () => import('../raw/vue_3-02.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2e7-KmH0mYlD4EmRDmn9+ci3vgWl0uc\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:vue@3.md"]: {
    import: () => import('../raw/vue_3.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"126a3-lYsYaUHhA5AXrgdYP7z2RearvcQ\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:watch与watchEffect.md"]: {
    import: () => import('../raw/watch与watchEffect.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"59d4-8zhhp81cClX5SLTccqTfq7Vq3bs\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:webpack常见配置及插件.md"]: {
    import: () => import('../raw/webpack常见配置及插件.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"40bf-b7Vt2RY6t9hgCMKyvzBeA0VpiJw\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:前后端交互规范.md"]: {
    import: () => import('../raw/前后端交互规范.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"1120f-jtQhPA4sP8bQkCNqv/8CE9g9+5c\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:前端开发中不同终端区别.md"]: {
    import: () => import('../raw/前端开发中不同终端区别.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"653-PWsZzYKaeA2RSoSNx8JjuiHrmT4\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:小程序.md"]: {
    import: () => import('../raw/小程序.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"271ed-cFjDBpHhgolZ2XJ0gzebknsFXBg\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:常用正则.md"]: {
    import: () => import('../raw/常用正则.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"26ba-U/s+148W7B5/CrGYWeadmUWadC8\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:指令之tree.md"]: {
    import: () => import('../raw/指令之tree.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"34ee-sKb1oOFC3nPPnvlqEmT1hv7o4QY\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:数据类型.md"]: {
    import: () => import('../raw/数据类型.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"1a32-Enp6hBfhKdF+1FdJDEuCyl5cVgI\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:编译系统结构.md"]: {
    import: () => import('../raw/编译系统结构.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"3aa5-Ewfr9AXQff+mTGcee7vg2muV+zY\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:语法.md"]: {
    import: () => import('../raw/语法.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"24c1-caWfkxImjoXl9ttZlerONh5S1Qk\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:articles:语言及其文法.md"]: {
    import: () => import('../raw/语言及其文法.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"770-iChSnibKuyzdgIC+NTm0Esk29t0\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:leetcode:20240719.md"]: {
    import: () => import('../raw/20240719.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"a7ba-9x8nxsHs6SqOEII2v6YC2W47RFE\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:leetcode:data.md"]: {
    import: () => import('../raw/data.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"63f-anDPU5TcYR3UDBY76VFPHpYT7y8\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:leetcode:s-t.md"]: {
    import: () => import('../raw/s-t.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2660-bIqhhPIP5cMqosRH5pwurLvFWnE\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:time-line:2020-year.md"]: {
    import: () => import('../raw/2020-year.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"37ac-Jbi0jIXr7eeyWcl23BS2R3LpEm0\"","mtime":"2025-01-17T07:22:59.504Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:CORS.md"]: {
    import: () => import('../raw/CORS.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"5bd6-dSF/ufT20FSrpneRgmQzPo/9QIc\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:Callback.md"]: {
    import: () => import('../raw/Callback.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"c48-x6sOa1Jjo0kGU6Kl7CILLTLQZ8c\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:Closure.md"]: {
    import: () => import('../raw/Closure.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"3470-nRsDCjtApcaInAh/1oHXyq5w0N0\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:Copy.md"]: {
    import: () => import('../raw/Copy.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"6d1-Tt/vLhcBqlCDW5dybzWfj4tMVAc\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:Es6.md"]: {
    import: () => import('../raw/Es6.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"30e7-IgreH15+3FQLq9d5FPVToU2NtKU\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:Evolution.md"]: {
    import: () => import('../raw/Evolution.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"3446-a/k2j/6bYZrbssmLc6j5dyvpIHM\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:Module.md"]: {
    import: () => import('../raw/Module.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"b07d-A7pRegVYKZ5TxnFTAtpoiMRqsmE\"","mtime":"2025-01-17T07:22:59.507Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:Prototype.md"]: {
    import: () => import('../raw/Prototype.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"3ccb-0zp9cEqa55PKOm4v9ejV4hjfEiQ\"","mtime":"2025-01-17T07:22:59.507Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:Subscribe.md"]: {
    import: () => import('../raw/Subscribe.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"119e-nvg2pI4bv7f5poNmtXAL48TFwq8\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:This.md"]: {
    import: () => import('../raw/This.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"a638-MfR4wksSGLI/my9mlD8xSI143v4\"","mtime":"2025-01-17T07:22:59.507Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:TreeNode.md"]: {
    import: () => import('../raw/TreeNode.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"8023-8x324NYjBtcu5aYtceNU3Z9tPig\"","mtime":"2025-01-17T07:22:59.495Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:URL-browser.md"]: {
    import: () => import('../raw/URL-browser.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"7d5-SxmmZbcxkUdn9xXUvwsDvCSdiGo\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:aync.md"]: {
    import: () => import('../raw/aync.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"1852-WQWD10iIDo/AWPxFsxqHBrAj+g8\"","mtime":"2025-01-17T07:22:59.507Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:computed-watch.md"]: {
    import: () => import('../raw/computed-watch.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"aa1-Rele0S8UoBQcLBAyAjQWEuaotYg\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:cookies.md"]: {
    import: () => import('../raw/cookies.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"3bba-GmHC+B0ZhMXqPzEbRaqb+Dthffw\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:debounce-throttle.md"]: {
    import: () => import('../raw/debounce-throttle.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2a081-Bb8/BbXKqdv1izJwZOT5B5chzqM\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:dom-bindEvent.md"]: {
    import: () => import('../raw/dom-bindEvent.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"7f08-EgpUwokbz21OQdeaHLtaD5morsA\"","mtime":"2025-01-17T07:22:59.505Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:domNode.md"]: {
    import: () => import('../raw/domNode.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"e9f-PsJ0hNDh45STGmaf9Mj6LYUz6e8\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:halfPx.md"]: {
    import: () => import('../raw/halfPx.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"abab-3hut7oX8gmYGgald4hr0hID6nAo\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:http.md"]: {
    import: () => import('../raw/http.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"3e25-QfCuw5HQYlzqyUO7WjYiFVRYAYA\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:project.md"]: {
    import: () => import('../raw/project.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"bf1-L0Ahw2GpptKMEjhPYmq7JnSABAU\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:promise.md"]: {
    import: () => import('../raw/promise.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"2d875-uN4++UqYBScxVEqerMD5q7HjBb4\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:sort.md"]: {
    import: () => import('../raw/sort.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"27a9d-BYlFp2+m2ZmyK1oJZKW26QJE3GI\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:vue-data.md"]: {
    import: () => import('../raw/vue-data.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"8d0-x8mDm4qZgKB/jEkYuamCZv1aOxU\"","mtime":"2025-01-17T07:22:59.506Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:interviewer:vue-react.md"]: {
    import: () => import('../raw/vue-react.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"15a2-H+qVcZWHNB4+xRAuFVAhAMrimT0\"","mtime":"2025-01-17T07:22:59.499Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:leetcode:weekly-contest:weekly-219.md"]: {
    import: () => import('../raw/weekly-219.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"353df-15syImfYJKqbWgS81DvzjwovcXY\"","mtime":"2025-01-17T07:22:59.507Z"}
  },
  ["nitro:bundled:cache:content:parsed:content:leetcode:weekly-contest:weekly-269.md"]: {
    import: () => import('../raw/weekly-269.mjs').then(r => r.default || r),
    meta: {"type":"text/markdown; charset=utf-8","etag":"\"5f93-FDISnOUPl18Wr+So8BpB0rzyhlE\"","mtime":"2025-01-17T07:22:59.506Z"}
  }
};

const normalizeKey$1 = function normalizeKey(key) {
  if (!key) {
    return "";
  }
  return key.split("?")[0]?.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "") || "";
};

const assets = {
  getKeys() {
    return Promise.resolve(Object.keys(_assets))
  },
  hasItem (id) {
    id = normalizeKey$1(id);
    return Promise.resolve(id in _assets)
  },
  getItem (id) {
    id = normalizeKey$1(id);
    return Promise.resolve(_assets[id] ? _assets[id].import() : null)
  },
  getMeta (id) {
    id = normalizeKey$1(id);
    return Promise.resolve(_assets[id] ? _assets[id].meta : {})
  }
};

function defineDriver(factory) {
  return factory;
}
function normalizeKey(key, sep = ":") {
  if (!key) {
    return "";
  }
  return key.replace(/[:/\\]/g, sep).replace(/^[:/\\]|[:/\\]$/g, "");
}
function createError(driver, message, opts) {
  const err = new Error(`[unstorage] [${driver}] ${message}`, opts);
  if (Error.captureStackTrace) {
    Error.captureStackTrace(err, createError);
  }
  return err;
}
function createRequiredError(driver, name) {
  if (Array.isArray(name)) {
    return createError(
      driver,
      `Missing some of the required options ${name.map((n) => "`" + n + "`").join(", ")}`
    );
  }
  return createError(driver, `Missing required option \`${name}\`.`);
}

function ignoreNotfound(err) {
  return err.code === "ENOENT" || err.code === "EISDIR" ? null : err;
}
function ignoreExists(err) {
  return err.code === "EEXIST" ? null : err;
}
async function writeFile(path, data, encoding) {
  await ensuredir(dirname$1(path));
  return promises.writeFile(path, data, encoding);
}
function readFile(path, encoding) {
  return promises.readFile(path, encoding).catch(ignoreNotfound);
}
function unlink(path) {
  return promises.unlink(path).catch(ignoreNotfound);
}
function readdir(dir) {
  return promises.readdir(dir, { withFileTypes: true }).catch(ignoreNotfound).then((r) => r || []);
}
async function ensuredir(dir) {
  if (existsSync(dir)) {
    return;
  }
  await ensuredir(dirname$1(dir)).catch(ignoreExists);
  await promises.mkdir(dir).catch(ignoreExists);
}
async function readdirRecursive(dir, ignore) {
  if (ignore && ignore(dir)) {
    return [];
  }
  const entries = await readdir(dir);
  const files = [];
  await Promise.all(
    entries.map(async (entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        const dirFiles = await readdirRecursive(entryPath, ignore);
        files.push(...dirFiles.map((f) => entry.name + "/" + f));
      } else {
        if (!(ignore && ignore(entry.name))) {
          files.push(entry.name);
        }
      }
    })
  );
  return files;
}
async function rmRecursive(dir) {
  const entries = await readdir(dir);
  await Promise.all(
    entries.map((entry) => {
      const entryPath = resolve$1(dir, entry.name);
      if (entry.isDirectory()) {
        return rmRecursive(entryPath).then(() => promises.rmdir(entryPath));
      } else {
        return promises.unlink(entryPath);
      }
    })
  );
}

const PATH_TRAVERSE_RE = /\.\.:|\.\.$/;
const DRIVER_NAME$2 = "fs-lite";
const unstorage_47drivers_47fs_45lite = defineDriver((opts = {}) => {
  if (!opts.base) {
    throw createRequiredError(DRIVER_NAME$2, "base");
  }
  opts.base = resolve$1(opts.base);
  const r = (key) => {
    if (PATH_TRAVERSE_RE.test(key)) {
      throw createError(
        DRIVER_NAME$2,
        `Invalid key: ${JSON.stringify(key)}. It should not contain .. segments`
      );
    }
    const resolved = join(opts.base, key.replace(/:/g, "/"));
    return resolved;
  };
  return {
    name: DRIVER_NAME$2,
    options: opts,
    hasItem(key) {
      return existsSync(r(key));
    },
    getItem(key) {
      return readFile(r(key), "utf8");
    },
    getItemRaw(key) {
      return readFile(r(key));
    },
    async getMeta(key) {
      const { atime, mtime, size, birthtime, ctime } = await promises.stat(r(key)).catch(() => ({}));
      return { atime, mtime, size, birthtime, ctime };
    },
    setItem(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value, "utf8");
    },
    setItemRaw(key, value) {
      if (opts.readOnly) {
        return;
      }
      return writeFile(r(key), value);
    },
    removeItem(key) {
      if (opts.readOnly) {
        return;
      }
      return unlink(r(key));
    },
    getKeys() {
      return readdirRecursive(r("."), opts.ignore);
    },
    async clear() {
      if (opts.readOnly || opts.noClear) {
        return;
      }
      await rmRecursive(r("."));
    }
  };
});

const OVERLAY_REMOVED = "__OVERLAY_REMOVED__";
const DRIVER_NAME$1 = "overlay";
const overlay = defineDriver((options) => {
  return {
    name: DRIVER_NAME$1,
    options,
    async hasItem(key, opts) {
      for (const layer of options.layers) {
        if (await layer.hasItem(key, opts)) {
          if (layer === options.layers[0] && await options.layers[0]?.getItem(key) === OVERLAY_REMOVED) {
            return false;
          }
          return true;
        }
      }
      return false;
    },
    async getItem(key) {
      for (const layer of options.layers) {
        const value = await layer.getItem(key);
        if (value === OVERLAY_REMOVED) {
          return null;
        }
        if (value !== null) {
          return value;
        }
      }
      return null;
    },
    // TODO: Support native meta
    // async getMeta (key) {},
    async setItem(key, value, opts) {
      await options.layers[0]?.setItem?.(key, value, opts);
    },
    async removeItem(key, opts) {
      await options.layers[0]?.setItem?.(key, OVERLAY_REMOVED, opts);
    },
    async getKeys(base, opts) {
      const allKeys = await Promise.all(
        options.layers.map(async (layer) => {
          const keys = await layer.getKeys(base, opts);
          return keys.map((key) => normalizeKey(key));
        })
      );
      const uniqueKeys = [...new Set(allKeys.flat())];
      const existingKeys = await Promise.all(
        uniqueKeys.map(async (key) => {
          if (await options.layers[0]?.getItem(key) === OVERLAY_REMOVED) {
            return false;
          }
          return key;
        })
      );
      return existingKeys.filter(Boolean);
    },
    async dispose() {
      await Promise.all(
        options.layers.map(async (layer) => {
          if (layer.dispose) {
            await layer.dispose();
          }
        })
      );
    }
  };
});

const DRIVER_NAME = "memory";
const memoryDriver = defineDriver(() => {
  const data = /* @__PURE__ */ new Map();
  return {
    name: DRIVER_NAME,
    getInstance: () => data,
    hasItem(key) {
      return data.has(key);
    },
    getItem(key) {
      return data.get(key) ?? null;
    },
    getItemRaw(key) {
      return data.get(key) ?? null;
    },
    setItem(key, value) {
      data.set(key, value);
    },
    setItemRaw(key, value) {
      data.set(key, value);
    },
    removeItem(key) {
      data.delete(key);
    },
    getKeys() {
      return [...data.keys()];
    },
    clear() {
      data.clear();
    },
    dispose() {
      data.clear();
    }
  };
});

const storage = createStorage({});

storage.mount('/assets', assets);

storage.mount('data', unstorage_47drivers_47fs_45lite({"driver":"fsLite","base":"/Users/gaowenju/github/app-site/.data/kv"}));

const bundledStorage = ["/cache/content"];
for (const base of bundledStorage) {
  storage.mount(base, overlay({
    layers: [
      memoryDriver(),
      // TODO
      // prefixStorage(storage, base),
      prefixStorage(storage, 'assets:nitro:bundled:' + base)
    ]
  }));
}

function useStorage(base = "") {
  return base ? prefixStorage(storage, base) : storage;
}

function defaultCacheOptions() {
  return {
    name: "_",
    base: "/cache",
    swr: true,
    maxAge: 1
  };
}
function defineCachedFunction(fn, opts = {}) {
  opts = { ...defaultCacheOptions(), ...opts };
  const pending = {};
  const group = opts.group || "nitro/functions";
  const name = opts.name || fn.name || "_";
  const integrity = opts.integrity || hash([fn, opts]);
  const validate = opts.validate || ((entry) => entry.value !== undefined);
  async function get(key, resolver, shouldInvalidateCache, event) {
    const cacheKey = [opts.base, group, name, key + ".json"].filter(Boolean).join(":").replace(/:\/$/, ":index");
    let entry = await useStorage().getItem(cacheKey).catch((error) => {
      console.error(`[nitro] [cache] Cache read error.`, error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }) || {};
    if (typeof entry !== "object") {
      entry = {};
      const error = new Error("Malformed data read from cache.");
      console.error("[nitro] [cache]", error);
      useNitroApp().captureError(error, { event, tags: ["cache"] });
    }
    const ttl = (opts.maxAge ?? 0) * 1e3;
    if (ttl) {
      entry.expires = Date.now() + ttl;
    }
    const expired = shouldInvalidateCache || entry.integrity !== integrity || ttl && Date.now() - (entry.mtime || 0) > ttl || validate(entry) === false;
    const _resolve = async () => {
      const isPending = pending[key];
      if (!isPending) {
        if (entry.value !== undefined && (opts.staleMaxAge || 0) >= 0 && opts.swr === false) {
          entry.value = undefined;
          entry.integrity = undefined;
          entry.mtime = undefined;
          entry.expires = undefined;
        }
        pending[key] = Promise.resolve(resolver());
      }
      try {
        entry.value = await pending[key];
      } catch (error) {
        if (!isPending) {
          delete pending[key];
        }
        throw error;
      }
      if (!isPending) {
        entry.mtime = Date.now();
        entry.integrity = integrity;
        delete pending[key];
        if (validate(entry) !== false) {
          let setOpts;
          if (opts.maxAge && !opts.swr) {
            setOpts = { ttl: opts.maxAge };
          }
          const promise = useStorage().setItem(cacheKey, entry, setOpts).catch((error) => {
            console.error(`[nitro] [cache] Cache write error.`, error);
            useNitroApp().captureError(error, { event, tags: ["cache"] });
          });
          if (event?.waitUntil) {
            event.waitUntil(promise);
          }
        }
      }
    };
    const _resolvePromise = expired ? _resolve() : Promise.resolve();
    if (entry.value === undefined) {
      await _resolvePromise;
    } else if (expired && event && event.waitUntil) {
      event.waitUntil(_resolvePromise);
    }
    if (opts.swr && validate(entry) !== false) {
      _resolvePromise.catch((error) => {
        console.error(`[nitro] [cache] SWR handler error.`, error);
        useNitroApp().captureError(error, { event, tags: ["cache"] });
      });
      return entry;
    }
    return _resolvePromise.then(() => entry);
  }
  return async (...args) => {
    const shouldBypassCache = await opts.shouldBypassCache?.(...args);
    if (shouldBypassCache) {
      return fn(...args);
    }
    const key = await (opts.getKey || getKey)(...args);
    const shouldInvalidateCache = await opts.shouldInvalidateCache?.(...args);
    const entry = await get(
      key,
      () => fn(...args),
      shouldInvalidateCache,
      args[0] && isEvent(args[0]) ? args[0] : undefined
    );
    let value = entry.value;
    if (opts.transform) {
      value = await opts.transform(entry, ...args) || value;
    }
    return value;
  };
}
function cachedFunction(fn, opts = {}) {
  return defineCachedFunction(fn, opts);
}
function getKey(...args) {
  return args.length > 0 ? hash(args, {}) : "";
}
function escapeKey(key) {
  return String(key).replace(/\W/g, "");
}
function defineCachedEventHandler(handler, opts = defaultCacheOptions()) {
  const variableHeaderNames = (opts.varies || []).filter(Boolean).map((h) => h.toLowerCase()).sort();
  const _opts = {
    ...opts,
    getKey: async (event) => {
      const customKey = await opts.getKey?.(event);
      if (customKey) {
        return escapeKey(customKey);
      }
      const _path = event.node.req.originalUrl || event.node.req.url || event.path;
      let _pathname;
      try {
        _pathname = escapeKey(decodeURI(parseURL(_path).pathname)).slice(0, 16) || "index";
      } catch {
        _pathname = "-";
      }
      const _hashedPath = `${_pathname}.${hash(_path)}`;
      const _headers = variableHeaderNames.map((header) => [header, event.node.req.headers[header]]).map(([name, value]) => `${escapeKey(name)}.${hash(value)}`);
      return [_hashedPath, ..._headers].join(":");
    },
    validate: (entry) => {
      if (!entry.value) {
        return false;
      }
      if (entry.value.code >= 400) {
        return false;
      }
      if (entry.value.body === undefined) {
        return false;
      }
      if (entry.value.headers.etag === "undefined" || entry.value.headers["last-modified"] === "undefined") {
        return false;
      }
      return true;
    },
    group: opts.group || "nitro/handlers",
    integrity: opts.integrity || hash([handler, opts])
  };
  const _cachedHandler = cachedFunction(
    async (incomingEvent) => {
      const variableHeaders = {};
      for (const header of variableHeaderNames) {
        const value = incomingEvent.node.req.headers[header];
        if (value !== undefined) {
          variableHeaders[header] = value;
        }
      }
      const reqProxy = cloneWithProxy(incomingEvent.node.req, {
        headers: variableHeaders
      });
      const resHeaders = {};
      let _resSendBody;
      const resProxy = cloneWithProxy(incomingEvent.node.res, {
        statusCode: 200,
        writableEnded: false,
        writableFinished: false,
        headersSent: false,
        closed: false,
        getHeader(name) {
          return resHeaders[name];
        },
        setHeader(name, value) {
          resHeaders[name] = value;
          return this;
        },
        getHeaderNames() {
          return Object.keys(resHeaders);
        },
        hasHeader(name) {
          return name in resHeaders;
        },
        removeHeader(name) {
          delete resHeaders[name];
        },
        getHeaders() {
          return resHeaders;
        },
        end(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2();
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return this;
        },
        write(chunk, arg2, arg3) {
          if (typeof chunk === "string") {
            _resSendBody = chunk;
          }
          if (typeof arg2 === "function") {
            arg2(undefined);
          }
          if (typeof arg3 === "function") {
            arg3();
          }
          return true;
        },
        writeHead(statusCode, headers2) {
          this.statusCode = statusCode;
          if (headers2) {
            if (Array.isArray(headers2) || typeof headers2 === "string") {
              throw new TypeError("Raw headers  is not supported.");
            }
            for (const header in headers2) {
              const value = headers2[header];
              if (value !== undefined) {
                this.setHeader(
                  header,
                  value
                );
              }
            }
          }
          return this;
        }
      });
      const event = createEvent(reqProxy, resProxy);
      event.fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: useNitroApp().localFetch
      });
      event.$fetch = (url, fetchOptions) => fetchWithEvent(event, url, fetchOptions, {
        fetch: globalThis.$fetch
      });
      event.context = incomingEvent.context;
      event.context.cache = {
        options: _opts
      };
      const body = await handler(event) || _resSendBody;
      const headers = event.node.res.getHeaders();
      headers.etag = String(
        headers.Etag || headers.etag || `W/"${hash(body)}"`
      );
      headers["last-modified"] = String(
        headers["Last-Modified"] || headers["last-modified"] || (/* @__PURE__ */ new Date()).toUTCString()
      );
      const cacheControl = [];
      if (opts.swr) {
        if (opts.maxAge) {
          cacheControl.push(`s-maxage=${opts.maxAge}`);
        }
        if (opts.staleMaxAge) {
          cacheControl.push(`stale-while-revalidate=${opts.staleMaxAge}`);
        } else {
          cacheControl.push("stale-while-revalidate");
        }
      } else if (opts.maxAge) {
        cacheControl.push(`max-age=${opts.maxAge}`);
      }
      if (cacheControl.length > 0) {
        headers["cache-control"] = cacheControl.join(", ");
      }
      const cacheEntry = {
        code: event.node.res.statusCode,
        headers,
        body
      };
      return cacheEntry;
    },
    _opts
  );
  return defineEventHandler(async (event) => {
    if (opts.headersOnly) {
      if (handleCacheHeaders(event, { maxAge: opts.maxAge })) {
        return;
      }
      return handler(event);
    }
    const response = await _cachedHandler(
      event
    );
    if (event.node.res.headersSent || event.node.res.writableEnded) {
      return response.body;
    }
    if (handleCacheHeaders(event, {
      modifiedTime: new Date(response.headers["last-modified"]),
      etag: response.headers.etag,
      maxAge: opts.maxAge
    })) {
      return;
    }
    event.node.res.statusCode = response.code;
    for (const name in response.headers) {
      const value = response.headers[name];
      if (name === "set-cookie") {
        event.node.res.appendHeader(
          name,
          splitCookiesString(value)
        );
      } else {
        if (value !== undefined) {
          event.node.res.setHeader(name, value);
        }
      }
    }
    return response.body;
  });
}
function cloneWithProxy(obj, overrides) {
  return new Proxy(obj, {
    get(target, property, receiver) {
      if (property in overrides) {
        return overrides[property];
      }
      return Reflect.get(target, property, receiver);
    },
    set(target, property, value, receiver) {
      if (property in overrides) {
        overrides[property] = value;
        return true;
      }
      return Reflect.set(target, property, value, receiver);
    }
  });
}
const cachedEventHandler = defineCachedEventHandler;

function defineRenderHandler(render) {
  const runtimeConfig = useRuntimeConfig();
  return eventHandler(async (event) => {
    const nitroApp = useNitroApp();
    const ctx = { event, render, response: undefined };
    await nitroApp.hooks.callHook("render:before", ctx);
    if (!ctx.response) {
      if (event.path === `${runtimeConfig.app.baseURL}favicon.ico`) {
        setResponseHeader(event, "Content-Type", "image/x-icon");
        return send(
          event,
          "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
        );
      }
      ctx.response = await ctx.render(event);
      if (!ctx.response) {
        const _currentStatus = getResponseStatus(event);
        setResponseStatus(event, _currentStatus === 200 ? 500 : _currentStatus);
        return send(
          event,
          "No response returned from render handler: " + event.path
        );
      }
    }
    await nitroApp.hooks.callHook("render:response", ctx.response, ctx);
    if (ctx.response.headers) {
      setResponseHeaders(event, ctx.response.headers);
    }
    if (ctx.response.statusCode || ctx.response.statusMessage) {
      setResponseStatus(
        event,
        ctx.response.statusCode,
        ctx.response.statusMessage
      );
    }
    return ctx.response.body;
  });
}

const config = useRuntimeConfig();
const _routeRulesMatcher = toRouteMatcher(
  createRouter$1({ routes: config.nitro.routeRules })
);
function createRouteRulesHandler(ctx) {
  return eventHandler((event) => {
    const routeRules = getRouteRules(event);
    if (routeRules.headers) {
      setHeaders(event, routeRules.headers);
    }
    if (routeRules.redirect) {
      let target = routeRules.redirect.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.redirect._redirectStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return sendRedirect(event, target, routeRules.redirect.statusCode);
    }
    if (routeRules.proxy) {
      let target = routeRules.proxy.to;
      if (target.endsWith("/**")) {
        let targetPath = event.path;
        const strpBase = routeRules.proxy._proxyStripBase;
        if (strpBase) {
          targetPath = withoutBase(targetPath, strpBase);
        }
        target = joinURL(target.slice(0, -3), targetPath);
      } else if (event.path.includes("?")) {
        const query = getQuery$1(event.path);
        target = withQuery(target, query);
      }
      return proxyRequest(event, target, {
        fetch: ctx.localFetch,
        ...routeRules.proxy
      });
    }
  });
}
function getRouteRules(event) {
  event.context._nitro = event.context._nitro || {};
  if (!event.context._nitro.routeRules) {
    event.context._nitro.routeRules = getRouteRulesForPath(
      withoutBase(event.path.split("?")[0], useRuntimeConfig().app.baseURL)
    );
  }
  return event.context._nitro.routeRules;
}
function getRouteRulesForPath(path) {
  return defu({}, ..._routeRulesMatcher.matchAll(path).reverse());
}

function createContext(opts = {}) {
  let currentInstance;
  let isSingleton = false;
  const checkConflict = (instance) => {
    if (currentInstance && currentInstance !== instance) {
      throw new Error("Context conflict");
    }
  };
  let als;
  if (opts.asyncContext) {
    const _AsyncLocalStorage = opts.AsyncLocalStorage || globalThis.AsyncLocalStorage;
    if (_AsyncLocalStorage) {
      als = new _AsyncLocalStorage();
    } else {
      console.warn("[unctx] `AsyncLocalStorage` is not provided.");
    }
  }
  const _getCurrentInstance = () => {
    if (als) {
      const instance = als.getStore();
      if (instance !== undefined) {
        return instance;
      }
    }
    return currentInstance;
  };
  return {
    use: () => {
      const _instance = _getCurrentInstance();
      if (_instance === undefined) {
        throw new Error("Context is not available");
      }
      return _instance;
    },
    tryUse: () => {
      return _getCurrentInstance();
    },
    set: (instance, replace) => {
      if (!replace) {
        checkConflict(instance);
      }
      currentInstance = instance;
      isSingleton = true;
    },
    unset: () => {
      currentInstance = undefined;
      isSingleton = false;
    },
    call: (instance, callback) => {
      checkConflict(instance);
      currentInstance = instance;
      try {
        return als ? als.run(instance, callback) : callback();
      } finally {
        if (!isSingleton) {
          currentInstance = undefined;
        }
      }
    },
    async callAsync(instance, callback) {
      currentInstance = instance;
      const onRestore = () => {
        currentInstance = instance;
      };
      const onLeave = () => currentInstance === instance ? onRestore : undefined;
      asyncHandlers.add(onLeave);
      try {
        const r = als ? als.run(instance, callback) : callback();
        if (!isSingleton) {
          currentInstance = void 0;
        }
        return await r;
      } finally {
        asyncHandlers.delete(onLeave);
      }
    }
  };
}
function createNamespace(defaultOpts = {}) {
  const contexts = {};
  return {
    get(key, opts = {}) {
      if (!contexts[key]) {
        contexts[key] = createContext({ ...defaultOpts, ...opts });
      }
      return contexts[key];
    }
  };
}
const _globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof global !== "undefined" ? global : {};
const globalKey = "__unctx__";
const defaultNamespace = _globalThis[globalKey] || (_globalThis[globalKey] = createNamespace());
const getContext = (key, opts = {}) => defaultNamespace.get(key, opts);
const asyncHandlersKey = "__unctx_async_handlers__";
const asyncHandlers = _globalThis[asyncHandlersKey] || (_globalThis[asyncHandlersKey] = /* @__PURE__ */ new Set());

getContext("nitro-app", {
  asyncContext: false,
  AsyncLocalStorage: undefined
});

function baseURL() {
  return useRuntimeConfig().app.baseURL;
}
function buildAssetsDir() {
  return useRuntimeConfig().app.buildAssetsDir;
}
function buildAssetsURL(...path) {
  return joinRelativeURL(publicAssetsURL(), buildAssetsDir(), ...path);
}
function publicAssetsURL(...path) {
  const app = useRuntimeConfig().app;
  const publicBase = app.cdnURL || app.baseURL;
  return path.length ? joinRelativeURL(publicBase, ...path) : publicBase;
}

function isTag(vnode, tag) {
  if (vnode.type === tag) {
    return true;
  }
  if (typeof vnode.type === "object" && vnode.type.tag === tag) {
    return true;
  }
  if (vnode.tag === tag) {
    return true;
  }
  return false;
}
function isText(vnode) {
  return isTag(vnode, "text") || isTag(vnode, Symbol.for("v-txt"));
}
function nodeChildren(node) {
  if (Array.isArray(node.children) || typeof node.children === "string") {
    return node.children;
  }
  if (typeof node.children?.default === "function") {
    return node.children.default();
  }
  return [];
}
function nodeTextContent(node) {
  if (!node) {
    return "";
  }
  if (Array.isArray(node)) {
    return node.map(nodeTextContent).join("");
  }
  if (isText(node)) {
    return node.children || node.value || "";
  }
  const children = nodeChildren(node);
  if (Array.isArray(children)) {
    return children.map(nodeTextContent).filter(Boolean).join("");
  }
  return "";
}

const useProcessorPlugins = async (processor, plugins = {}) => {
  const toUse = Object.entries(plugins).filter((p) => p[1] !== false);
  for (const plugin of toUse) {
    const instance = plugin[1].instance || await import(
      /* @vite-ignore */
      plugin[0]
    ).then((m) => m.default || m);
    processor.use(instance, plugin[1].options);
  }
};

function emphasis(state, node) {
  const result = {
    type: "element",
    tagName: "em",
    properties: node.attributes || {},
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

function parseThematicBlock(lang) {
  if (!lang?.trim()) {
    return {
      language: undefined,
      highlights: undefined,
      filename: undefined,
      meta: undefined
    };
  }
  const languageMatches = lang.replace(/[{|[](.+)/, "").match(/^[^ \t]+(?=[ \t]|$)/);
  const highlightTokensMatches = lang.match(/\{([^}]*)\}/);
  const filenameMatches = lang.match(/\[((\\\]|[^\]])*)\]/);
  const meta = lang.replace(languageMatches?.[0] ?? "", "").replace(highlightTokensMatches?.[0] ?? "", "").replace(filenameMatches?.[0] ?? "", "").trim();
  return {
    language: languageMatches?.[0] || undefined,
    highlights: parseHighlightedLines(highlightTokensMatches?.[1] || undefined),
    // https://github.com/nuxt/content/pull/2169
    filename: filenameMatches?.[1].replace(/\\\]/g, "]") || undefined,
    meta
  };
}
function parseHighlightedLines(lines) {
  const lineArray = String(lines || "").split(",").filter(Boolean).flatMap((line) => {
    const [start, end] = line.trim().split("-").map((a) => Number(a.trim()));
    return Array.from({ length: (end || start) - start + 1 }).map((_, i) => start + i);
  });
  return lineArray.length ? lineArray : undefined;
}
const TAG_NAME_REGEXP = /^<\/?([\w-]+)(\s[^>]*?)?\/?>/;
function getTagName(value) {
  const result = String(value).match(TAG_NAME_REGEXP);
  return result && result[1];
}

const code = (state, node) => {
  const lang = (node.lang || "") + " " + (node.meta || "");
  const { language, highlights, filename, meta } = parseThematicBlock(lang);
  const value = node.value ? detab(node.value + "\n") : "";
  let result = {
    type: "element",
    tagName: "code",
    properties: { __ignoreMap: "" },
    children: [{ type: "text", value }]
  };
  if (meta) {
    result.data = {
      meta
    };
  }
  state.patch(node, result);
  result = state.applyData(node, result);
  const properties = {
    language,
    filename,
    highlights,
    meta,
    code: value
  };
  if (language) {
    properties.className = ["language-" + language];
  }
  result = { type: "element", tagName: "pre", properties, children: [result] };
  state.patch(node, result);
  return result;
};

function html(state, node) {
  const tagName = getTagName(node.value);
  if (tagName && /[A-Z]/.test(tagName)) {
    node.value = node.value.replace(tagName, kebabCase(tagName));
  }
  if (state.dangerous || state.options?.allowDangerousHtml) {
    const result = { type: "raw", value: node.value };
    state.patch(node, result);
    return state.applyData(node, result);
  }
  return undefined;
}

function link(state, node) {
  const properties = {
    ...node.attributes || {},
    href: normalizeUri(node.url)
  };
  if (node.title !== null && node.title !== undefined) {
    properties.title = node.title;
  }
  const result = {
    type: "element",
    tagName: "a",
    properties,
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

function list(state, node) {
  const properties = {};
  const results = state.all(node);
  let index = -1;
  if (typeof node.start === "number" && node.start !== 1) {
    properties.start = node.start;
  }
  while (++index < results.length) {
    const child = results[index];
    if (child.type === "element" && child.tagName === "li" && child.properties && Array.isArray(child.properties.className) && child.properties.className.includes("task-list-item")) {
      properties.className = ["contains-task-list"];
      break;
    }
  }
  if ((node.children || []).some((child) => typeof child.checked === "boolean")) {
    properties.className = ["contains-task-list"];
  }
  const result = {
    type: "element",
    tagName: node.ordered ? "ol" : "ul",
    properties,
    children: state.wrap(results, true)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

const htmlTags = [
  "a",
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "audio",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "br",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "head",
  "header",
  "hgroup",
  "hr",
  "html",
  "i",
  "iframe",
  "img",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  "link",
  "main",
  "map",
  "mark",
  "math",
  "menu",
  "menuitem",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "svg",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "video",
  "wbr"
];

function paragraph(state, node) {
  if (node.children && node.children[0] && node.children[0].type === "html") {
    const tagName = kebabCase(getTagName(node.children[0].value) || "div");
    if (!htmlTags.includes(tagName)) {
      return state.all(node);
    }
  }
  const result = {
    type: "element",
    tagName: "p",
    properties: {},
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

function image(state, node) {
  const properties = { ...node.attributes, src: normalizeUri(node.url) };
  if (node.alt !== null && node.alt !== undefined) {
    properties.alt = node.alt;
  }
  if (node.title !== null && node.title !== undefined) {
    properties.title = node.title;
  }
  const result = { type: "element", tagName: "img", properties, children: [] };
  state.patch(node, result);
  return state.applyData(node, result);
}

function strong(state, node) {
  const result = {
    type: "element",
    tagName: "strong",
    properties: node.attributes || {},
    children: state.all(node)
  };
  state.patch(node, result);
  return state.applyData(node, result);
}

function inlineCode(state, node) {
  const language = node.attributes?.language || node.attributes?.lang;
  const text = { type: "text", value: node.value.replace(/\r?\n|\r/g, " ") };
  state.patch(node, text);
  const result = {
    type: "element",
    tagName: "code",
    properties: node.attributes || {},
    children: [text]
  };
  const classes = (result.properties.class || "").split(" ");
  delete result.properties.class;
  if (language) {
    result.properties.language = language;
    delete result.properties.lang;
    classes.push("language-" + language);
  }
  result.properties.className = classes.join(" ");
  state.patch(node, result);
  return state.applyData(node, result);
}

function containerComponent(state, node) {
  const result = {
    type: "element",
    tagName: node.name,
    properties: {
      ...node.attributes,
      ...node.data?.hProperties
    },
    children: state.all(node)
  };
  state.patch(node, result);
  result.attributes = node.attributes;
  result.fmAttributes = node.fmAttributes;
  return result;
}

const handlers$1 = {
  emphasis,
  code,
  link,
  paragraph,
  html,
  list,
  image,
  strong,
  inlineCode,
  containerComponent
};

const defaults = {
  remark: {
    plugins: {
      "remark-mdc": {
        instance: remarkMDC
      },
      "remark-gfm": {
        instance: remarkGFM
      }
    }
  },
  rehype: {
    options: {
      handlers: handlers$1,
      allowDangerousHtml: true
    },
    plugins: {
      "rehype-external-links": {
        instance: rehypeExternalLinks
      },
      "rehype-sort-attribute-values": {
        instance: rehypeSortAttributeValues
      },
      "rehype-sort-attributes": {
        instance: rehypeSortAttributes
      },
      "rehype-raw": {
        instance: rehypeRaw,
        options: {
          passThrough: ["element"]
        }
      }
    }
  },
  highlight: false,
  toc: {
    searchDepth: 2,
    depth: 2
  }
};

function flattenNodeText(node) {
  if (node.type === "comment") {
    return "";
  }
  if (node.type === "text") {
    return node.value || "";
  } else {
    return (node.children || []).reduce((text, child) => {
      return text.concat(flattenNodeText(child));
    }, "");
  }
}
function flattenNode(node, maxDepth = 2, _depth = 0) {
  if (!Array.isArray(node.children) || _depth === maxDepth) {
    return [node];
  }
  return [
    node,
    ...node.children.reduce((acc, child) => acc.concat(flattenNode(child, maxDepth, _depth + 1)), [])
  ];
}

const TOC_TAGS = ["h2", "h3", "h4", "h5", "h6"];
const TOC_TAGS_DEPTH = TOC_TAGS.reduce((tags, tag) => {
  tags[tag] = Number(tag.charAt(tag.length - 1));
  return tags;
}, {});
const getHeaderDepth = (node) => TOC_TAGS_DEPTH[node.tag];
const getTocTags = (depth) => {
  if (depth < 1 || depth > 5) {
    console.log(`\`toc.depth\` is set to ${depth}. It should be a number between 1 and 5. `);
    depth = 1;
  }
  return TOC_TAGS.slice(0, depth);
};
function nestHeaders(headers) {
  if (headers.length <= 1) {
    return headers;
  }
  const toc = [];
  let parent;
  headers.forEach((header) => {
    if (!parent || header.depth <= parent.depth) {
      header.children = [];
      parent = header;
      toc.push(header);
    } else {
      parent.children.push(header);
    }
  });
  toc.forEach((header) => {
    if (header.children?.length) {
      header.children = nestHeaders(header.children);
    } else {
      delete header.children;
    }
  });
  return toc;
}
function generateFlatToc(body, options) {
  const { searchDepth, depth, title = "" } = options;
  const tags = getTocTags(depth);
  const headers = flattenNode(body, searchDepth).filter((node) => tags.includes(node.tag || ""));
  const links = headers.map((node) => ({
    id: node.props?.id,
    depth: getHeaderDepth(node),
    text: flattenNodeText(node)
  }));
  return {
    title,
    searchDepth,
    depth,
    links
  };
}
function generateToc(body, options) {
  const toc = generateFlatToc(body, options);
  toc.links = nestHeaders(toc.links);
  return toc;
}

const unsafeLinkPrefix = [
  "javascript:",
  "data:text/html",
  "vbscript:",
  "data:text/javascript",
  "data:text/vbscript",
  "data:text/css",
  "data:text/plain",
  "data:text/xml"
];
const validateProp = (attribute, value) => {
  if (attribute.startsWith("on")) {
    return false;
  }
  if (attribute === "href" || attribute === "src") {
    return !unsafeLinkPrefix.some((prefix) => value.toLowerCase().startsWith(prefix));
  }
  return true;
};
const validateProps = (type, props) => {
  if (!props) {
    return {};
  }
  props = Object.fromEntries(
    Object.entries(props).filter(([name, value]) => {
      const isValid = validateProp(name, value);
      if (!isValid) {
        console.warn(`[@nuxtjs/mdc] removing unsafe attribute: ${name}="${value}"`);
      }
      return isValid;
    })
  );
  if (type === "pre") {
    if (typeof props.highlights === "string") {
      props.highlights = props.highlights.split(" ").map((i) => Number.parseInt(i));
    }
  }
  return props;
};

function compileHast(options = {}) {
  const slugs = new Slugger();
  function compileToJSON(node, parent) {
    if (node.type === "root") {
      return {
        type: "root",
        children: node.children.map((child) => compileToJSON(child, node)).filter(Boolean)
      };
    }
    if (node.type === "element") {
      if (node.tagName === "p" && node.children.every((child) => child.type === "text" && /^\s*$/.test(child.value))) {
        return null;
      }
      if (node.tagName === "li") {
        let hasPreviousParagraph = false;
        node.children = node.children?.flatMap((child) => {
          if (child.type === "element" && child.tagName === "p") {
            if (hasPreviousParagraph) {
              child.children.unshift({
                type: "element",
                tagName: "br",
                properties: {},
                children: []
              });
            }
            hasPreviousParagraph = true;
            return child.children;
          }
          return child;
        });
      }
      if (node.tagName?.match(/^h\d$/)) {
        node.properties = node.properties || {};
        node.properties.id = String(node.properties?.id || slugs.slug(toString(node))).replace(/-+/g, "-").replace(/^-|-$/g, "").replace(/^(\d)/, "_$1");
      }
      if (node.tagName === "component-slot") {
        node.tagName = "template";
      }
      const children = (node.tagName === "template" && node.content?.children.length ? node.content.children : node.children).map((child) => compileToJSON(child, node)).filter(Boolean);
      return {
        type: "element",
        tag: node.tagName,
        props: validateProps(node.tagName, node.properties),
        children
      };
    }
    if (node.type === "text") {
      if (!/^\n+$/.test(node.value || "") || parent?.properties?.emptyLinePlaceholder) {
        return {
          type: "text",
          value: node.value
        };
      }
    }
    if (options.keepComments && node.type === "comment") {
      return {
        type: "comment",
        value: node.value
      };
    }
    return null;
  }
  this.Compiler = (tree) => {
    const body = compileToJSON(tree);
    let excerpt = undefined;
    const excerptIndex = tree.children.findIndex((node) => node.type === "comment" && node.value?.trim() === "more");
    if (excerptIndex !== -1) {
      excerpt = compileToJSON({
        type: "root",
        children: tree.children.slice(0, excerptIndex)
      });
      if (excerpt.children.find((node) => node.type === "element" && node.tag === "pre")) {
        const lastChild = body.children[body.children.length - 1];
        if (lastChild.type === "element" && lastChild.tag === "style") {
          excerpt.children.push(lastChild);
        }
      }
    }
    body.children = (body.children || []).filter((child) => child.type !== "text");
    return {
      body,
      excerpt
    };
  };
}

let moduleOptions;
let generatedMdcConfigs;
const createMarkdownParser = async (inlineOptions = {}) => {
  if (!moduleOptions) {
    moduleOptions = await import(
      '../build/mdc-imports.mjs'
      /* @vite-ignore */
    ).catch(() => ({}));
  }
  if (!generatedMdcConfigs) {
    generatedMdcConfigs = await import(
      '../build/mdc-configs.mjs'
      /* @vite-ignore */
    ).then((r) => r.getMdcConfigs()).catch(() => []);
  }
  const mdcConfigs = [
    ...generatedMdcConfigs || [],
    ...inlineOptions.configs || []
  ];
  if (inlineOptions.highlight != null && inlineOptions.highlight != false && inlineOptions.highlight.highlighter !== undefined && typeof inlineOptions.highlight.highlighter !== "function") {
    inlineOptions = {
      ...inlineOptions,
      highlight: {
        ...inlineOptions.highlight
      }
    };
    delete inlineOptions.highlight.highlighter;
  }
  const options = defu(inlineOptions, {
    remark: { plugins: moduleOptions?.remarkPlugins },
    rehype: { plugins: moduleOptions?.rehypePlugins },
    highlight: moduleOptions?.highlight
  }, defaults);
  if (options.rehype?.plugins?.highlight) {
    options.rehype.plugins.highlight.options = {
      ...options.rehype.plugins.highlight.options || {},
      ...options.highlight || {}
    };
  }
  let processor = unified();
  for (const config of mdcConfigs) {
    processor = await config.unified?.pre?.(processor) || processor;
  }
  processor.use(remarkParse);
  for (const config of mdcConfigs) {
    processor = await config.unified?.remark?.(processor) || processor;
  }
  await useProcessorPlugins(processor, options.remark?.plugins);
  processor.use(remark2rehype, options.rehype?.options);
  for (const config of mdcConfigs) {
    processor = await config.unified?.rehype?.(processor) || processor;
  }
  await useProcessorPlugins(processor, options.rehype?.plugins);
  processor.use(compileHast, options);
  for (const config of mdcConfigs) {
    processor = await config.unified?.post?.(processor) || processor;
  }
  return async function parse(md, { fileOptions } = {}) {
    const { content, data: frontmatter } = await parseFrontMatter(md);
    const processedFile = await processor.process({ ...fileOptions, value: content, data: frontmatter });
    const result = processedFile.result;
    const data = Object.assign(
      contentHeading(result.body),
      frontmatter,
      processedFile?.data || {}
    );
    let toc;
    if (data.toc !== false) {
      const tocOption = defu(data.toc || {}, options.toc);
      toc = generateToc(result.body, tocOption);
    }
    return {
      data,
      body: result.body,
      excerpt: result.excerpt,
      toc
    };
  };
};
const parseMarkdown = async (md, markdownParserOptions = {}, parseOptions = {}) => {
  const parser = await createMarkdownParser(markdownParserOptions);
  return parser(md, parseOptions);
};
function contentHeading(body) {
  let title = "";
  let description = "";
  const children = body.children.filter((node) => node.type === "element" && node.tag !== "hr");
  if (children.length && children[0].tag === "h1") {
    const node = children.shift();
    title = nodeTextContent(node);
  }
  if (children.length && children[0].tag === "p") {
    const node = children.shift();
    description = nodeTextContent(node);
  }
  return {
    title,
    description
  };
}

const baseUrl = process.env.NUXT_QINIU_BASE_URL;
const bucketManager = () => {
  const accessKey = process.env.NUXT_QINIU_ACCESS_KEY;
  const secretKey = process.env.NUXT_QINIU_SECRET_KEY;
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const config = new qiniu.conf.Config();
  config.zone = qiniu.zone.Zone_z0;
  return new qiniu.rs.BucketManager(mac, config);
};
const fileLink = (key) => {
  const accessKey = process.env.NUXT_QINIU_ACCESS_KEY || "";
  const secretKey = process.env.NUXT_QINIU_SECRET_KEY || "";
  qiniu.conf.ACCESS_KEY = accessKey;
  qiniu.conf.SECRET_KEY = secretKey;
  const policy = new qiniu.rs.GetPolicy();
  return policy.makeRequest(`${baseUrl}${key}`);
};

const _Ck92uz = defineEventHandler(async (event) => {
  const { getContentQuery } = await import('../_/query.mjs');
  const { serverQueryContent } = await import('../_/storage.mjs').then(function (n) { return n.s; });
  const query = getContentQuery(event);
  const { advanceQuery } = useRuntimeConfig().public.content.experimental;
  if (query.first) {
    let contentQuery = serverQueryContent(event, query);
    if (!advanceQuery) {
      contentQuery = contentQuery.withDirConfig();
    }
    const content = await contentQuery.findOne();
    const _result = advanceQuery ? content?.result : content;
    const missing = !_result && !content?.dirConfig?.navigation?.redirect && !content?._dir?.navigation?.redirect;
    if (missing) {
      throw createError$1({
        statusMessage: "Document not found!",
        statusCode: 404,
        data: {
          description: "Could not find document for the given query.",
          query
        }
      });
    }
    return content;
  }
  if (query.count) {
    return serverQueryContent(event, query).count();
  }
  return serverQueryContent(event, query).find();
});

const _EBu1zi = defineEventHandler(async (event) => {
  const { getContentIndex } = await import('../_/storage.mjs').then(function (n) { return n.c; });
  const { cacheStorage, serverQueryContent } = await import('../_/storage.mjs').then(function (n) { return n.s; });
  const { content } = useRuntimeConfig();
  const now = Date.now();
  const contents = await serverQueryContent(event).find();
  await getContentIndex(event);
  const navigation = await $fetch(`${content.api.baseURL}/navigation`);
  await cacheStorage().setItem("content-navigation.json", navigation);
  return {
    generatedAt: now,
    generateTime: Date.now() - now,
    contents: content.experimental.cacheContents ? contents : [],
    navigation
  };
});

const isPreview = (event) => {
  const previewToken = getQuery(event).previewToken || getCookie(event, "previewToken");
  return !!previewToken;
};
const getPreview = (event) => {
  const key = getQuery(event).previewToken || getCookie(event, "previewToken");
  return { key };
};

const _ebWwgE = defineEventHandler(async (event) => {
  const { getContentQuery } = await import('../_/query.mjs');
  const { cacheStorage, serverQueryContent } = await import('../_/storage.mjs').then(function (n) { return n.s; });
  const { createNav } = await import('../_/navigation.mjs');
  const query = getContentQuery(event);
  if (!isPreview(event) && Object.keys(query).length === 0) {
    const cache = await cacheStorage().getItem("content-navigation.json");
    if (cache) {
      return cache;
    }
  }
  const contents = await serverQueryContent(event, query).where({
    /**
     * Partial contents are not included in the navigation
     * A partial content is a content that has `_` prefix in its path
     */
    _partial: false,
    /**
     * Exclude any pages which have opted out of navigation via frontmatter.
     */
    navigation: {
      $ne: false
    }
  }).find();
  const _locale = (query?.where || []).find((w) => w._locale)?._locale;
  const dirConfigs = await serverQueryContent(event, _locale ? { where: [{ _locale }] } : undefined).where({ _path: /\/_dir$/i, _partial: true }).find();
  const configs = (dirConfigs?.result || dirConfigs).reduce((configs2, conf) => {
    if (conf.title?.toLowerCase() === "dir") {
      conf.title = undefined;
    }
    const key = conf._path.split("/").slice(0, -1).join("/") || "/";
    configs2[key] = {
      ...conf,
      // Extract meta from body. (non MD files)
      ...conf.body
    };
    return configs2;
  }, {});
  return createNav(contents?.result || contents, configs);
});

const _lazy_YEWlmO = () => import('../routes/api/banner.mjs');
const _lazy_pPOt8P = () => import('../routes/api/image.mjs');
const _lazy_IQ8Hnx = () => import('../routes/api/img.get.mjs');
const _lazy_gu3JcO = () => import('../routes/api/list.mjs');
const _lazy_mSbYau = () => import('../routes/api/qiniu-file.mjs');
const _lazy_s05Gq9 = () => import('../routes/api/qiniu-link.mjs');
const _lazy_HcJ6qI = () => import('../routes/api/qiniu-preview.mjs');
const _lazy_rZCK89 = () => import('../routes/renderer.mjs');

const handlers = [
  { route: '', handler: _JRQJEt, lazy: false, middleware: true, method: undefined },
  { route: '/api/banner', handler: _lazy_YEWlmO, lazy: true, middleware: false, method: undefined },
  { route: '/api/image', handler: _lazy_pPOt8P, lazy: true, middleware: false, method: undefined },
  { route: '/api/img', handler: _lazy_IQ8Hnx, lazy: true, middleware: false, method: "get" },
  { route: '/api/list', handler: _lazy_gu3JcO, lazy: true, middleware: false, method: undefined },
  { route: '/api/qiniu-file', handler: _lazy_mSbYau, lazy: true, middleware: false, method: undefined },
  { route: '/api/qiniu-link', handler: _lazy_s05Gq9, lazy: true, middleware: false, method: undefined },
  { route: '/api/qiniu-preview', handler: _lazy_HcJ6qI, lazy: true, middleware: false, method: undefined },
  { route: '/__nuxt_error', handler: _lazy_rZCK89, lazy: true, middleware: false, method: undefined },
  { route: '/api/_mdc/highlight', handler: _nEvOL6, lazy: false, middleware: false, method: undefined },
  { route: '/api/_content/query/:qid/**:params', handler: _Ck92uz, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/query/:qid', handler: _Ck92uz, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/query', handler: _Ck92uz, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/cache.1737098554324.json', handler: _EBu1zi, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation/:qid/**:params', handler: _ebWwgE, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation/:qid', handler: _ebWwgE, lazy: false, middleware: false, method: "get" },
  { route: '/api/_content/navigation', handler: _ebWwgE, lazy: false, middleware: false, method: "get" },
  { route: '/**', handler: _lazy_rZCK89, lazy: true, middleware: false, method: undefined }
];

function createNitroApp() {
  const config = useRuntimeConfig();
  const hooks = createHooks();
  const captureError = (error, context = {}) => {
    const promise = hooks.callHookParallel("error", error, context).catch((error_) => {
      console.error("Error while capturing another error", error_);
    });
    if (context.event && isEvent(context.event)) {
      const errors = context.event.context.nitro?.errors;
      if (errors) {
        errors.push({ error, context });
      }
      if (context.event.waitUntil) {
        context.event.waitUntil(promise);
      }
    }
  };
  const h3App = createApp({
    debug: destr(false),
    onError: (error, event) => {
      captureError(error, { event, tags: ["request"] });
      return errorHandler(error, event);
    },
    onRequest: async (event) => {
      await nitroApp$1.hooks.callHook("request", event).catch((error) => {
        captureError(error, { event, tags: ["request"] });
      });
    },
    onBeforeResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("beforeResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    },
    onAfterResponse: async (event, response) => {
      await nitroApp$1.hooks.callHook("afterResponse", event, response).catch((error) => {
        captureError(error, { event, tags: ["request", "response"] });
      });
    }
  });
  const router = createRouter({
    preemptive: true
  });
  const localCall = createCall(toNodeListener(h3App));
  const _localFetch = createFetch(localCall, globalThis.fetch);
  const localFetch = (input, init) => _localFetch(input, init).then(
    (response) => normalizeFetchResponse(response)
  );
  const $fetch = createFetch$1({
    fetch: localFetch,
    Headers: Headers$1,
    defaults: { baseURL: config.app.baseURL }
  });
  globalThis.$fetch = $fetch;
  h3App.use(createRouteRulesHandler({ localFetch }));
  h3App.use(
    eventHandler((event) => {
      event.context.nitro = event.context.nitro || { errors: [] };
      const envContext = event.node.req?.__unenv__;
      if (envContext) {
        Object.assign(event.context, envContext);
      }
      event.fetch = (req, init) => fetchWithEvent(event, req, init, { fetch: localFetch });
      event.$fetch = (req, init) => fetchWithEvent(event, req, init, {
        fetch: $fetch
      });
      event.waitUntil = (promise) => {
        if (!event.context.nitro._waitUntilPromises) {
          event.context.nitro._waitUntilPromises = [];
        }
        event.context.nitro._waitUntilPromises.push(promise);
        if (envContext?.waitUntil) {
          envContext.waitUntil(promise);
        }
      };
      event.captureError = (error, context) => {
        captureError(error, { event, ...context });
      };
    })
  );
  for (const h of handlers) {
    let handler = h.lazy ? lazyEventHandler(h.handler) : h.handler;
    if (h.middleware || !h.route) {
      const middlewareBase = (config.app.baseURL + (h.route || "/")).replace(
        /\/+/g,
        "/"
      );
      h3App.use(middlewareBase, handler);
    } else {
      const routeRules = getRouteRulesForPath(
        h.route.replace(/:\w+|\*\*/g, "_")
      );
      if (routeRules.cache) {
        handler = cachedEventHandler(handler, {
          group: "nitro/routes",
          ...routeRules.cache
        });
      }
      router.use(h.route, handler, h.method);
    }
  }
  h3App.use(config.app.baseURL, router.handler);
  const app = {
    hooks,
    h3App,
    router,
    localCall,
    localFetch,
    captureError
  };
  return app;
}
function runNitroPlugins(nitroApp2) {
  for (const plugin of plugins) {
    try {
      plugin(nitroApp2);
    } catch (error) {
      nitroApp2.captureError(error, { tags: ["plugin"] });
      throw error;
    }
  }
}
const nitroApp$1 = createNitroApp();
function useNitroApp() {
  return nitroApp$1;
}
runNitroPlugins(nitroApp$1);

const debug = (...args) => {
};
function GracefulShutdown(server, opts) {
  opts = opts || {};
  const options = Object.assign(
    {
      signals: "SIGINT SIGTERM",
      timeout: 3e4,
      development: false,
      forceExit: true,
      onShutdown: (signal) => Promise.resolve(signal),
      preShutdown: (signal) => Promise.resolve(signal)
    },
    opts
  );
  let isShuttingDown = false;
  const connections = {};
  let connectionCounter = 0;
  const secureConnections = {};
  let secureConnectionCounter = 0;
  let failed = false;
  let finalRun = false;
  function onceFactory() {
    let called = false;
    return (emitter, events, callback) => {
      function call() {
        if (!called) {
          called = true;
          return Reflect.apply(callback, this, arguments);
        }
      }
      for (const e of events) {
        emitter.on(e, call);
      }
    };
  }
  const signals = options.signals.split(" ").map((s) => s.trim()).filter((s) => s.length > 0);
  const once = onceFactory();
  once(process, signals, (signal) => {
    shutdown(signal).then(() => {
      if (options.forceExit) {
        process.exit(failed ? 1 : 0);
      }
    }).catch((error) => {
      process.exit(1);
    });
  });
  function isFunction(functionToCheck) {
    const getType = Object.prototype.toString.call(functionToCheck);
    return /^\[object\s([A-Za-z]+)?Function]$/.test(getType);
  }
  function destroy(socket, force = false) {
    if (socket._isIdle && isShuttingDown || force) {
      socket.destroy();
      if (socket.server instanceof http.Server) {
        delete connections[socket._connectionId];
      } else {
        delete secureConnections[socket._connectionId];
      }
    }
  }
  function destroyAllConnections(force = false) {
    for (const key of Object.keys(connections)) {
      const socket = connections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
    for (const key of Object.keys(secureConnections)) {
      const socket = secureConnections[key];
      const serverResponse = socket._httpMessage;
      if (serverResponse && !force) {
        if (!serverResponse.headersSent) {
          serverResponse.setHeader("connection", "close");
        }
      } else {
        destroy(socket);
      }
    }
  }
  server.on("request", (req, res) => {
    req.socket._isIdle = false;
    if (isShuttingDown && !res.headersSent) {
      res.setHeader("connection", "close");
    }
    res.on("finish", () => {
      req.socket._isIdle = true;
      destroy(req.socket);
    });
  });
  server.on("connection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = connectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      connections[id] = socket;
      socket.once("close", () => {
        delete connections[socket._connectionId];
      });
    }
  });
  server.on("secureConnection", (socket) => {
    if (isShuttingDown) {
      socket.destroy();
    } else {
      const id = secureConnectionCounter++;
      socket._isIdle = true;
      socket._connectionId = id;
      secureConnections[id] = socket;
      socket.once("close", () => {
        delete secureConnections[socket._connectionId];
      });
    }
  });
  process.on("close", () => {
  });
  function shutdown(sig) {
    function cleanupHttp() {
      destroyAllConnections();
      return new Promise((resolve, reject) => {
        server.close((err) => {
          if (err) {
            return reject(err);
          }
          return resolve(true);
        });
      });
    }
    if (options.development) {
      return process.exit(0);
    }
    function finalHandler() {
      if (!finalRun) {
        finalRun = true;
        if (options.finally && isFunction(options.finally)) {
          options.finally();
        }
      }
      return Promise.resolve();
    }
    function waitForReadyToShutDown(totalNumInterval) {
      if (totalNumInterval === 0) {
        debug(
          `Could not close connections in time (${options.timeout}ms), will forcefully shut down`
        );
        return Promise.resolve(true);
      }
      const allConnectionsClosed = Object.keys(connections).length === 0 && Object.keys(secureConnections).length === 0;
      if (allConnectionsClosed) {
        return Promise.resolve(false);
      }
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(waitForReadyToShutDown(totalNumInterval - 1));
        }, 250);
      });
    }
    if (isShuttingDown) {
      return Promise.resolve();
    }
    return options.preShutdown(sig).then(() => {
      isShuttingDown = true;
      cleanupHttp();
    }).then(() => {
      const pollIterations = options.timeout ? Math.round(options.timeout / 250) : 0;
      return waitForReadyToShutDown(pollIterations);
    }).then((force) => {
      if (force) {
        destroyAllConnections(force);
      }
      return options.onShutdown(sig);
    }).then(finalHandler).catch((error) => {
      const errString = typeof error === "string" ? error : JSON.stringify(error);
      failed = true;
      throw errString;
    });
  }
  function shutdownManual() {
    return shutdown("manual");
  }
  return shutdownManual;
}

function getGracefulShutdownConfig() {
  return {
    disabled: !!process.env.NITRO_SHUTDOWN_DISABLED,
    signals: (process.env.NITRO_SHUTDOWN_SIGNALS || "SIGTERM SIGINT").split(" ").map((s) => s.trim()),
    timeout: Number.parseInt(process.env.NITRO_SHUTDOWN_TIMEOUT || "", 10) || 3e4,
    forceExit: !process.env.NITRO_SHUTDOWN_NO_FORCE_EXIT
  };
}
function setupGracefulShutdown(listener, nitroApp) {
  const shutdownConfig = getGracefulShutdownConfig();
  if (shutdownConfig.disabled) {
    return;
  }
  GracefulShutdown(listener, {
    signals: shutdownConfig.signals.join(" "),
    timeout: shutdownConfig.timeout,
    forceExit: shutdownConfig.forceExit,
    onShutdown: async () => {
      await new Promise((resolve) => {
        const timeout = setTimeout(() => {
          console.warn("Graceful shutdown timeout, force exiting...");
          resolve();
        }, shutdownConfig.timeout);
        nitroApp.hooks.callHook("close").catch((error) => {
          console.error(error);
        }).finally(() => {
          clearTimeout(timeout);
          resolve();
        });
      });
    }
  });
}

const cert = process.env.NITRO_SSL_CERT;
const key = process.env.NITRO_SSL_KEY;
const nitroApp = useNitroApp();
const server = cert && key ? new Server({ key, cert }, toNodeListener(nitroApp.h3App)) : new Server$1(toNodeListener(nitroApp.h3App));
const port = destr(process.env.NITRO_PORT || process.env.PORT) || 3e3;
const host = process.env.NITRO_HOST || process.env.HOST;
const path = process.env.NITRO_UNIX_SOCKET;
const listener = server.listen(path ? { path } : { port, host }, (err) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  const protocol = cert && key ? "https" : "http";
  const addressInfo = listener.address();
  if (typeof addressInfo === "string") {
    console.log(`Listening on unix socket ${addressInfo}`);
    return;
  }
  const baseURL = (useRuntimeConfig().app.baseURL || "").replace(/\/$/, "");
  const url = `${protocol}://${addressInfo.family === "IPv6" ? `[${addressInfo.address}]` : addressInfo.address}:${addressInfo.port}${baseURL}`;
  console.log(`Listening on ${url}`);
});
trapUnhandledNodeErrors();
setupGracefulShutdown(listener, nitroApp);
const nodeServer = {};

export { $fetch$1 as $, withoutTrailingSlash as A, getPreview as B, hash as C, defu as D, pascalCase as E, baseURL as F, hasProtocol as G, isScriptProtocol as H, withQuery as I, getRequestHeaders as J, sanitizeStatusCode as K, withBase as L, getContext as M, createHooks as N, klona as O, parse as P, getRequestHeader as Q, isEqual as R, setCookie as S, getCookie as T, deleteCookie as U, toRouteMatcher as V, createRouter$1 as W, withTrailingSlash as X, kebabCase as Y, defuFn as Z, parseQuery as _, baseUrl as a, createStorage as a0, memoryDriver as a1, nodeServer as a2, bucketManager as b, createError$1 as c, defineEventHandler as d, defineRenderHandler as e, fileLink as f, getQuery as g, buildAssetsURL as h, getRouteRules as i, getResponseStatus as j, getResponseStatusText as k, useNitroApp as l, parseMarkdown as m, isRelative as n, destr as o, publicAssetsURL as p, extname as q, readBody as r, sendRedirect as s, camelCase as t, useRuntimeConfig as u, joinURL as v, isPreview as w, prefixStorage as x, useStorage as y, withLeadingSlash as z };
//# sourceMappingURL=nitro.mjs.map
