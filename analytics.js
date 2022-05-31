(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined")
      return require.apply(this, arguments);
    throw new Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/obj-case/index.js
  var require_obj_case = __commonJS({
    "node_modules/obj-case/index.js"(exports, module) {
      module.exports = multiple(find);
      module.exports.find = module.exports;
      module.exports.replace = function(obj, key, val, options) {
        multiple(replace).call(this, obj, key, val, options);
        return obj;
      };
      module.exports.del = function(obj, key, options) {
        multiple(del).call(this, obj, key, null, options);
        return obj;
      };
      function multiple(fn) {
        return function(obj, path, val, options) {
          var normalize = options && isFunction(options.normalizer) ? options.normalizer : defaultNormalize;
          path = normalize(path);
          var key;
          var finished = false;
          while (!finished)
            loop();
          function loop() {
            for (key in obj) {
              var normalizedKey = normalize(key);
              if (path.indexOf(normalizedKey) === 0) {
                var temp = path.substr(normalizedKey.length);
                if (temp.charAt(0) === "." || temp.length === 0) {
                  path = temp.substr(1);
                  var child = obj[key];
                  if (child == null) {
                    finished = true;
                    return;
                  }
                  if (!path.length) {
                    finished = true;
                    return;
                  }
                  obj = child;
                  return;
                }
              }
            }
            key = void 0;
            finished = true;
          }
          if (!key)
            return;
          if (obj == null)
            return obj;
          return fn(obj, key, val);
        };
      }
      function find(obj, key) {
        if (obj.hasOwnProperty(key))
          return obj[key];
      }
      function del(obj, key) {
        if (obj.hasOwnProperty(key))
          delete obj[key];
        return obj;
      }
      function replace(obj, key, val) {
        if (obj.hasOwnProperty(key))
          obj[key] = val;
        return obj;
      }
      function defaultNormalize(path) {
        return path.replace(/[^a-zA-Z0-9\.]+/g, "").toLowerCase();
      }
      function isFunction(val) {
        return typeof val === "function";
      }
    }
  });

  // node_modules/segmentio-facade/lib/address.js
  var require_address = __commonJS({
    "node_modules/segmentio-facade/lib/address.js"(exports, module) {
      "use strict";
      var get = require_obj_case();
      module.exports = function(proto) {
        proto.zip = trait("postalCode", "zip");
        proto.country = trait("country");
        proto.street = trait("street");
        proto.state = trait("state");
        proto.city = trait("city");
        proto.region = trait("region");
        function trait(a, b) {
          return function() {
            var traits = this.traits();
            var props = this.properties ? this.properties() : {};
            return get(traits, "address." + a) || get(traits, a) || (b ? get(traits, "address." + b) : null) || (b ? get(traits, b) : null) || get(props, "address." + a) || get(props, a) || (b ? get(props, "address." + b) : null) || (b ? get(props, b) : null);
          };
        }
      };
    }
  });

  // node_modules/inherits/inherits_browser.js
  var require_inherits_browser = __commonJS({
    "node_modules/inherits/inherits_browser.js"(exports, module) {
      if (typeof Object.create === "function") {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            ctor.prototype = Object.create(superCtor.prototype, {
              constructor: {
                value: ctor,
                enumerable: false,
                writable: true,
                configurable: true
              }
            });
          }
        };
      } else {
        module.exports = function inherits(ctor, superCtor) {
          if (superCtor) {
            ctor.super_ = superCtor;
            var TempCtor = function() {
            };
            TempCtor.prototype = superCtor.prototype;
            ctor.prototype = new TempCtor();
            ctor.prototype.constructor = ctor;
          }
        };
      }
    }
  });

  // node_modules/component-type/index.js
  var require_component_type = __commonJS({
    "node_modules/component-type/index.js"(exports, module) {
      var toString = Object.prototype.toString;
      module.exports = function(val) {
        switch (toString.call(val)) {
          case "[object Date]":
            return "date";
          case "[object RegExp]":
            return "regexp";
          case "[object Arguments]":
            return "arguments";
          case "[object Array]":
            return "array";
          case "[object Error]":
            return "error";
        }
        if (val === null)
          return "null";
        if (val === void 0)
          return "undefined";
        if (val !== val)
          return "nan";
        if (val && val.nodeType === 1)
          return "element";
        if (isBuffer(val))
          return "buffer";
        val = val.valueOf ? val.valueOf() : Object.prototype.valueOf.apply(val);
        return typeof val;
      };
      function isBuffer(obj) {
        return !!(obj != null && (obj._isBuffer || obj.constructor && typeof obj.constructor.isBuffer === "function" && obj.constructor.isBuffer(obj)));
      }
    }
  });

  // node_modules/@ndhoule/clone/index.js
  var require_clone = __commonJS({
    "node_modules/@ndhoule/clone/index.js"(exports, module) {
      "use strict";
      var type = require_component_type();
      var clone = function clone2(obj) {
        var t = type(obj);
        if (t === "object") {
          var copy = {};
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              copy[key] = clone2(obj[key]);
            }
          }
          return copy;
        }
        if (t === "array") {
          var copy = new Array(obj.length);
          for (var i = 0, l = obj.length; i < l; i++) {
            copy[i] = clone2(obj[i]);
          }
          return copy;
        }
        if (t === "regexp") {
          var flags = "";
          flags += obj.multiline ? "m" : "";
          flags += obj.global ? "g" : "";
          flags += obj.ignoreCase ? "i" : "";
          return new RegExp(obj.source, flags);
        }
        if (t === "date") {
          return new Date(obj.getTime());
        }
        return obj;
      };
      module.exports = clone;
    }
  });

  // node_modules/type-component/index.js
  var require_type_component = __commonJS({
    "node_modules/type-component/index.js"(exports, module) {
      var toString = Object.prototype.toString;
      module.exports = function(val) {
        switch (toString.call(val)) {
          case "[object Function]":
            return "function";
          case "[object Date]":
            return "date";
          case "[object RegExp]":
            return "regexp";
          case "[object Arguments]":
            return "arguments";
          case "[object Array]":
            return "array";
        }
        if (val === null)
          return "null";
        if (val === void 0)
          return "undefined";
        if (val === Object(val))
          return "object";
        return typeof val;
      };
    }
  });

  // node_modules/segmentio-facade/lib/utils.js
  var require_utils = __commonJS({
    "node_modules/segmentio-facade/lib/utils.js"(exports) {
      "use strict";
      exports.inherit = require_inherits_browser();
      exports.clone = require_clone();
      exports.type = require_type_component();
    }
  });

  // node_modules/segmentio-facade/lib/is-enabled.js
  var require_is_enabled = __commonJS({
    "node_modules/segmentio-facade/lib/is-enabled.js"(exports, module) {
      "use strict";
      var disabled = {
        Salesforce: true
      };
      module.exports = function(integration) {
        return !disabled[integration];
      };
    }
  });

  // node_modules/@segment/isodate/lib/index.js
  var require_lib = __commonJS({
    "node_modules/@segment/isodate/lib/index.js"(exports) {
      "use strict";
      var matcher = /^(\d{4})(?:-?(\d{2})(?:-?(\d{2}))?)?(?:([ T])(\d{2}):?(\d{2})(?::?(\d{2})(?:[,\.](\d{1,}))?)?(?:(Z)|([+\-])(\d{2})(?::?(\d{2}))?)?)?$/;
      exports.parse = function(iso) {
        var numericKeys = [1, 5, 6, 7, 11, 12];
        var arr = matcher.exec(iso);
        var offset = 0;
        if (!arr) {
          return new Date(iso);
        }
        for (var i = 0, val; val = numericKeys[i]; i++) {
          arr[val] = parseInt(arr[val], 10) || 0;
        }
        arr[2] = parseInt(arr[2], 10) || 1;
        arr[3] = parseInt(arr[3], 10) || 1;
        arr[2]--;
        arr[8] = arr[8] ? (arr[8] + "00").substring(0, 3) : 0;
        if (arr[4] === " ") {
          offset = new Date().getTimezoneOffset();
        } else if (arr[9] !== "Z" && arr[10]) {
          offset = arr[11] * 60 + arr[12];
          if (arr[10] === "+") {
            offset = 0 - offset;
          }
        }
        var millis = Date.UTC(arr[1], arr[2], arr[3], arr[5], arr[6] + offset, arr[7], arr[8]);
        return new Date(millis);
      };
      exports.is = function(string, strict) {
        if (typeof string !== "string") {
          return false;
        }
        if (strict && /^\d{4}-\d{2}-\d{2}/.test(string) === false) {
          return false;
        }
        return matcher.test(string);
      };
    }
  });

  // node_modules/new-date/lib/milliseconds.js
  var require_milliseconds = __commonJS({
    "node_modules/new-date/lib/milliseconds.js"(exports) {
      "use strict";
      var matcher = /\d{13}/;
      exports.is = function(string) {
        return matcher.test(string);
      };
      exports.parse = function(millis) {
        millis = parseInt(millis, 10);
        return new Date(millis);
      };
    }
  });

  // node_modules/new-date/lib/seconds.js
  var require_seconds = __commonJS({
    "node_modules/new-date/lib/seconds.js"(exports) {
      "use strict";
      var matcher = /\d{10}/;
      exports.is = function(string) {
        return matcher.test(string);
      };
      exports.parse = function(seconds) {
        var millis = parseInt(seconds, 10) * 1e3;
        return new Date(millis);
      };
    }
  });

  // node_modules/new-date/lib/index.js
  var require_lib2 = __commonJS({
    "node_modules/new-date/lib/index.js"(exports, module) {
      "use strict";
      var isodate = require_lib();
      var milliseconds = require_milliseconds();
      var seconds = require_seconds();
      var objProto = Object.prototype;
      var toStr = objProto.toString;
      function isDate(value) {
        return toStr.call(value) === "[object Date]";
      }
      function isNumber(value) {
        return toStr.call(value) === "[object Number]";
      }
      module.exports = function newDate(val) {
        if (isDate(val))
          return val;
        if (isNumber(val))
          return new Date(toMs(val));
        if (isodate.is(val)) {
          return isodate.parse(val);
        }
        if (milliseconds.is(val)) {
          return milliseconds.parse(val);
        }
        if (seconds.is(val)) {
          return seconds.parse(val);
        }
        return new Date(val);
      };
      function toMs(num) {
        if (num < 315576e5)
          return num * 1e3;
        return num;
      }
    }
  });

  // node_modules/@segment/isodate-traverse/lib/index.js
  var require_lib3 = __commonJS({
    "node_modules/@segment/isodate-traverse/lib/index.js"(exports, module) {
      "use strict";
      var isodate = require_lib();
      module.exports = traverse;
      function traverse(input, strict) {
        if (strict === void 0)
          strict = true;
        if (input && typeof input === "object") {
          return traverseObject(input, strict);
        } else if (Array.isArray(input)) {
          return traverseArray(input, strict);
        } else if (isodate.is(input, strict)) {
          return isodate.parse(input);
        }
        return input;
      }
      function traverseObject(obj, strict) {
        Object.keys(obj).forEach(function(key) {
          obj[key] = traverse(obj[key], strict);
        });
        return obj;
      }
      function traverseArray(arr, strict) {
        arr.forEach(function(value, index) {
          arr[index] = traverse(value, strict);
        });
        return arr;
      }
    }
  });

  // node_modules/segmentio-facade/lib/facade.js
  var require_facade = __commonJS({
    "node_modules/segmentio-facade/lib/facade.js"(exports, module) {
      "use strict";
      var address = require_address();
      var clone = require_utils().clone;
      var isEnabled = require_is_enabled();
      var newDate = require_lib2();
      var objCase = require_obj_case();
      var traverse = require_lib3();
      var type = require_utils().type;
      function Facade(obj, opts) {
        opts = opts || {};
        if (!("clone" in opts))
          opts.clone = true;
        if (opts.clone)
          obj = clone(obj);
        if (!("traverse" in opts))
          opts.traverse = true;
        if (!("timestamp" in obj))
          obj.timestamp = new Date();
        else
          obj.timestamp = newDate(obj.timestamp);
        if (opts.traverse)
          traverse(obj);
        this.opts = opts;
        this.obj = obj;
      }
      Facade.prototype.proxy = function(field) {
        var fields = field.split(".");
        field = fields.shift();
        var obj = this[field] || this.field(field);
        if (!obj)
          return obj;
        if (typeof obj === "function")
          obj = obj.call(this) || {};
        if (fields.length === 0)
          return this.opts.clone ? transform(obj) : obj;
        obj = objCase(obj, fields.join("."));
        return this.opts.clone ? transform(obj) : obj;
      };
      Facade.prototype.field = function(field) {
        var obj = this.obj[field];
        return this.opts.clone ? transform(obj) : obj;
      };
      Facade.proxy = function(field) {
        return function() {
          return this.proxy(field);
        };
      };
      Facade.field = function(field) {
        return function() {
          return this.field(field);
        };
      };
      Facade.multi = function(path) {
        return function() {
          var multi = this.proxy(path + "s");
          if (type(multi) === "array")
            return multi;
          var one = this.proxy(path);
          if (one)
            one = [this.opts.clone ? clone(one) : one];
          return one || [];
        };
      };
      Facade.one = function(path) {
        return function() {
          var one = this.proxy(path);
          if (one)
            return one;
          var multi = this.proxy(path + "s");
          if (type(multi) === "array")
            return multi[0];
        };
      };
      Facade.prototype.json = function() {
        var ret = this.opts.clone ? clone(this.obj) : this.obj;
        if (this.type)
          ret.type = this.type();
        return ret;
      };
      Facade.prototype.options = function(integration) {
        var obj = this.obj.options || this.obj.context || {};
        var options = this.opts.clone ? clone(obj) : obj;
        if (!integration)
          return options;
        if (!this.enabled(integration))
          return;
        var integrations2 = this.integrations();
        var value = integrations2[integration] || objCase(integrations2, integration);
        if (typeof value !== "object")
          value = objCase(this.options(), integration);
        return typeof value === "object" ? value : {};
      };
      Facade.prototype.context = Facade.prototype.options;
      Facade.prototype.enabled = function(integration) {
        var allEnabled = this.proxy("options.providers.all");
        if (typeof allEnabled !== "boolean")
          allEnabled = this.proxy("options.all");
        if (typeof allEnabled !== "boolean")
          allEnabled = this.proxy("integrations.all");
        if (typeof allEnabled !== "boolean")
          allEnabled = true;
        var enabled = allEnabled && isEnabled(integration);
        var options = this.integrations();
        if (options.providers && options.providers.hasOwnProperty(integration)) {
          enabled = options.providers[integration];
        }
        if (options.hasOwnProperty(integration)) {
          var settings = options[integration];
          if (typeof settings === "boolean") {
            enabled = settings;
          } else {
            enabled = true;
          }
        }
        return !!enabled;
      };
      Facade.prototype.integrations = function() {
        return this.obj.integrations || this.proxy("options.providers") || this.options();
      };
      Facade.prototype.active = function() {
        var active = this.proxy("options.active");
        if (active === null || active === void 0)
          active = true;
        return active;
      };
      Facade.prototype.anonymousId = function() {
        return this.field("anonymousId") || this.field("sessionId");
      };
      Facade.prototype.sessionId = Facade.prototype.anonymousId;
      Facade.prototype.groupId = Facade.proxy("options.groupId");
      Facade.prototype.traits = function(aliases) {
        var ret = this.proxy("options.traits") || {};
        var id = this.userId();
        aliases = aliases || {};
        if (id)
          ret.id = id;
        for (var alias in aliases) {
          var value = this[alias] == null ? this.proxy("options.traits." + alias) : this[alias]();
          if (value == null)
            continue;
          ret[aliases[alias]] = value;
          delete ret[alias];
        }
        return ret;
      };
      Facade.prototype.library = function() {
        var library = this.proxy("options.library");
        if (!library)
          return { name: "unknown", version: null };
        if (typeof library === "string")
          return { name: library, version: null };
        return library;
      };
      Facade.prototype.device = function() {
        var device = this.proxy("context.device");
        if (type(device) !== "object")
          device = {};
        var library = this.library().name;
        if (device.type)
          return device;
        if (library.indexOf("ios") > -1)
          device.type = "ios";
        if (library.indexOf("android") > -1)
          device.type = "android";
        return device;
      };
      Facade.prototype.userAgent = Facade.proxy("context.userAgent");
      Facade.prototype.timezone = Facade.proxy("context.timezone");
      Facade.prototype.timestamp = Facade.field("timestamp");
      Facade.prototype.channel = Facade.field("channel");
      Facade.prototype.ip = Facade.proxy("context.ip");
      Facade.prototype.userId = Facade.field("userId");
      address(Facade.prototype);
      function transform(obj) {
        return clone(obj);
      }
      module.exports = Facade;
    }
  });

  // node_modules/segmentio-facade/lib/alias.js
  var require_alias = __commonJS({
    "node_modules/segmentio-facade/lib/alias.js"(exports, module) {
      "use strict";
      var inherit = require_utils().inherit;
      var Facade = require_facade();
      function Alias(dictionary, opts) {
        Facade.call(this, dictionary, opts);
      }
      inherit(Alias, Facade);
      Alias.prototype.action = function() {
        return "alias";
      };
      Alias.prototype.type = Alias.prototype.action;
      Alias.prototype.previousId = function() {
        return this.field("previousId") || this.field("from");
      };
      Alias.prototype.from = Alias.prototype.previousId;
      Alias.prototype.userId = function() {
        return this.field("userId") || this.field("to");
      };
      Alias.prototype.to = Alias.prototype.userId;
      module.exports = Alias;
    }
  });

  // node_modules/is-email/index.js
  var require_is_email = __commonJS({
    "node_modules/is-email/index.js"(exports, module) {
      module.exports = function isEmail(string) {
        return /.+\@.+\..+/.test(string);
      };
    }
  });

  // node_modules/segmentio-facade/lib/group.js
  var require_group = __commonJS({
    "node_modules/segmentio-facade/lib/group.js"(exports, module) {
      "use strict";
      var inherit = require_utils().inherit;
      var isEmail = require_is_email();
      var newDate = require_lib2();
      var Facade = require_facade();
      function Group(dictionary, opts) {
        Facade.call(this, dictionary, opts);
      }
      inherit(Group, Facade);
      Group.prototype.action = function() {
        return "group";
      };
      Group.prototype.type = Group.prototype.action;
      Group.prototype.groupId = Facade.field("groupId");
      Group.prototype.created = function() {
        var created = this.proxy("traits.createdAt") || this.proxy("traits.created") || this.proxy("properties.createdAt") || this.proxy("properties.created");
        if (created)
          return newDate(created);
      };
      Group.prototype.email = function() {
        var email = this.proxy("traits.email");
        if (email)
          return email;
        var groupId = this.groupId();
        if (isEmail(groupId))
          return groupId;
      };
      Group.prototype.traits = function(aliases) {
        var ret = this.properties();
        var id = this.groupId();
        aliases = aliases || {};
        if (id)
          ret.id = id;
        for (var alias in aliases) {
          var value = this[alias] == null ? this.proxy("traits." + alias) : this[alias]();
          if (value == null)
            continue;
          ret[aliases[alias]] = value;
          delete ret[alias];
        }
        return ret;
      };
      Group.prototype.name = Facade.proxy("traits.name");
      Group.prototype.industry = Facade.proxy("traits.industry");
      Group.prototype.employees = Facade.proxy("traits.employees");
      Group.prototype.properties = function() {
        return this.field("traits") || this.field("properties") || {};
      };
      module.exports = Group;
    }
  });

  // node_modules/trim/index.js
  var require_trim = __commonJS({
    "node_modules/trim/index.js"(exports, module) {
      exports = module.exports = trim;
      function trim(str) {
        if (str.trim)
          return str.trim();
        return exports.right(exports.left(str));
      }
      exports.left = function(str) {
        if (str.trimLeft)
          return str.trimLeft();
        return str.replace(/^\s\s*/, "");
      };
      exports.right = function(str) {
        if (str.trimRight)
          return str.trimRight();
        var whitespace_pattern = /\s/, i = str.length;
        while (whitespace_pattern.test(str.charAt(--i)))
          ;
        return str.slice(0, i + 1);
      };
    }
  });

  // node_modules/segmentio-facade/lib/identify.js
  var require_identify = __commonJS({
    "node_modules/segmentio-facade/lib/identify.js"(exports, module) {
      "use strict";
      var Facade = require_facade();
      var get = require_obj_case();
      var inherit = require_utils().inherit;
      var isEmail = require_is_email();
      var newDate = require_lib2();
      var trim = require_trim();
      var type = require_utils().type;
      function Identify(dictionary, opts) {
        Facade.call(this, dictionary, opts);
      }
      inherit(Identify, Facade);
      Identify.prototype.action = function() {
        return "identify";
      };
      Identify.prototype.type = Identify.prototype.action;
      Identify.prototype.traits = function(aliases) {
        var ret = this.field("traits") || {};
        var id = this.userId();
        aliases = aliases || {};
        if (id)
          ret.id = id;
        for (var alias in aliases) {
          var value = this[alias] == null ? this.proxy("traits." + alias) : this[alias]();
          if (value == null)
            continue;
          ret[aliases[alias]] = value;
          if (alias !== aliases[alias])
            delete ret[alias];
        }
        return ret;
      };
      Identify.prototype.email = function() {
        var email = this.proxy("traits.email");
        if (email)
          return email;
        var userId = this.userId();
        if (isEmail(userId))
          return userId;
      };
      Identify.prototype.created = function() {
        var created = this.proxy("traits.created") || this.proxy("traits.createdAt");
        if (created)
          return newDate(created);
      };
      Identify.prototype.companyCreated = function() {
        var created = this.proxy("traits.company.created") || this.proxy("traits.company.createdAt");
        if (created) {
          return newDate(created);
        }
      };
      Identify.prototype.companyName = function() {
        return this.proxy("traits.company.name");
      };
      Identify.prototype.name = function() {
        var name2 = this.proxy("traits.name");
        if (typeof name2 === "string") {
          return trim(name2);
        }
        var firstName = this.firstName();
        var lastName = this.lastName();
        if (firstName && lastName) {
          return trim(firstName + " " + lastName);
        }
      };
      Identify.prototype.firstName = function() {
        var firstName = this.proxy("traits.firstName");
        if (typeof firstName === "string") {
          return trim(firstName);
        }
        var name2 = this.proxy("traits.name");
        if (typeof name2 === "string") {
          return trim(name2).split(" ")[0];
        }
      };
      Identify.prototype.lastName = function() {
        var lastName = this.proxy("traits.lastName");
        if (typeof lastName === "string") {
          return trim(lastName);
        }
        var name2 = this.proxy("traits.name");
        if (typeof name2 !== "string") {
          return;
        }
        var space = trim(name2).indexOf(" ");
        if (space === -1) {
          return;
        }
        return trim(name2.substr(space + 1));
      };
      Identify.prototype.uid = function() {
        return this.userId() || this.username() || this.email();
      };
      Identify.prototype.description = function() {
        return this.proxy("traits.description") || this.proxy("traits.background");
      };
      Identify.prototype.age = function() {
        var date = this.birthday();
        var age = get(this.traits(), "age");
        if (age != null)
          return age;
        if (type(date) !== "date")
          return;
        var now = new Date();
        return now.getFullYear() - date.getFullYear();
      };
      Identify.prototype.avatar = function() {
        var traits = this.traits();
        return get(traits, "avatar") || get(traits, "photoUrl") || get(traits, "avatarUrl");
      };
      Identify.prototype.position = function() {
        var traits = this.traits();
        return get(traits, "position") || get(traits, "jobTitle");
      };
      Identify.prototype.username = Facade.proxy("traits.username");
      Identify.prototype.website = Facade.one("traits.website");
      Identify.prototype.websites = Facade.multi("traits.website");
      Identify.prototype.phone = Facade.one("traits.phone");
      Identify.prototype.phones = Facade.multi("traits.phone");
      Identify.prototype.address = Facade.proxy("traits.address");
      Identify.prototype.gender = Facade.proxy("traits.gender");
      Identify.prototype.birthday = Facade.proxy("traits.birthday");
      module.exports = Identify;
    }
  });

  // node_modules/segmentio-facade/lib/track.js
  var require_track = __commonJS({
    "node_modules/segmentio-facade/lib/track.js"(exports, module) {
      "use strict";
      var inherit = require_utils().inherit;
      var type = require_utils().type;
      var Facade = require_facade();
      var Identify = require_identify();
      var isEmail = require_is_email();
      var get = require_obj_case();
      function Track(dictionary, opts) {
        Facade.call(this, dictionary, opts);
      }
      inherit(Track, Facade);
      Track.prototype.action = function() {
        return "track";
      };
      Track.prototype.type = Track.prototype.action;
      Track.prototype.event = Facade.field("event");
      Track.prototype.value = Facade.proxy("properties.value");
      Track.prototype.category = Facade.proxy("properties.category");
      Track.prototype.id = Facade.proxy("properties.id");
      Track.prototype.productId = function() {
        return this.proxy("properties.product_id") || this.proxy("properties.productId");
      };
      Track.prototype.promotionId = function() {
        return this.proxy("properties.promotion_id") || this.proxy("properties.promotionId");
      };
      Track.prototype.cartId = function() {
        return this.proxy("properties.cart_id") || this.proxy("properties.cartId");
      };
      Track.prototype.checkoutId = function() {
        return this.proxy("properties.checkout_id") || this.proxy("properties.checkoutId");
      };
      Track.prototype.paymentId = function() {
        return this.proxy("properties.payment_id") || this.proxy("properties.paymentId");
      };
      Track.prototype.couponId = function() {
        return this.proxy("properties.coupon_id") || this.proxy("properties.couponId");
      };
      Track.prototype.wishlistId = function() {
        return this.proxy("properties.wishlist_id") || this.proxy("properties.wishlistId");
      };
      Track.prototype.reviewId = function() {
        return this.proxy("properties.review_id") || this.proxy("properties.reviewId");
      };
      Track.prototype.orderId = function() {
        return this.proxy("properties.id") || this.proxy("properties.order_id") || this.proxy("properties.orderId");
      };
      Track.prototype.sku = Facade.proxy("properties.sku");
      Track.prototype.tax = Facade.proxy("properties.tax");
      Track.prototype.name = Facade.proxy("properties.name");
      Track.prototype.price = Facade.proxy("properties.price");
      Track.prototype.total = Facade.proxy("properties.total");
      Track.prototype.repeat = Facade.proxy("properties.repeat");
      Track.prototype.coupon = Facade.proxy("properties.coupon");
      Track.prototype.shipping = Facade.proxy("properties.shipping");
      Track.prototype.discount = Facade.proxy("properties.discount");
      Track.prototype.shippingMethod = function() {
        return this.proxy("properties.shipping_method") || this.proxy("properties.shippingMethod");
      };
      Track.prototype.paymentMethod = function() {
        return this.proxy("properties.payment_method") || this.proxy("properties.paymentMethod");
      };
      Track.prototype.description = Facade.proxy("properties.description");
      Track.prototype.plan = Facade.proxy("properties.plan");
      Track.prototype.subtotal = function() {
        var subtotal = get(this.properties(), "subtotal");
        var total = this.total() || this.revenue();
        if (subtotal)
          return subtotal;
        if (!total)
          return 0;
        if (this.total()) {
          var n = this.tax();
          if (n)
            total -= n;
          n = this.shipping();
          if (n)
            total -= n;
          n = this.discount();
          if (n)
            total += n;
        }
        return total;
      };
      Track.prototype.products = function() {
        var props = this.properties();
        var products = get(props, "products");
        return type(products) === "array" ? products : [];
      };
      Track.prototype.quantity = function() {
        var props = this.obj.properties || {};
        return props.quantity || 1;
      };
      Track.prototype.currency = function() {
        var props = this.obj.properties || {};
        return props.currency || "USD";
      };
      Track.prototype.referrer = function() {
        return this.proxy("context.referrer.url") || this.proxy("context.page.referrer") || this.proxy("properties.referrer");
      };
      Track.prototype.query = Facade.proxy("options.query");
      Track.prototype.properties = function(aliases) {
        var ret = this.field("properties") || {};
        aliases = aliases || {};
        for (var alias in aliases) {
          var value = this[alias] == null ? this.proxy("properties." + alias) : this[alias]();
          if (value == null)
            continue;
          ret[aliases[alias]] = value;
          delete ret[alias];
        }
        return ret;
      };
      Track.prototype.username = function() {
        return this.proxy("traits.username") || this.proxy("properties.username") || this.userId() || this.sessionId();
      };
      Track.prototype.email = function() {
        var email = this.proxy("traits.email") || this.proxy("properties.email") || this.proxy("options.traits.email");
        if (email)
          return email;
        var userId = this.userId();
        if (isEmail(userId))
          return userId;
      };
      Track.prototype.revenue = function() {
        var revenue = this.proxy("properties.revenue");
        var event = this.event();
        var orderCompletedRegExp = /^[ _]?completed[ _]?order[ _]?|^[ _]?order[ _]?completed[ _]?$/i;
        if (!revenue && event && event.match(orderCompletedRegExp)) {
          revenue = this.proxy("properties.total");
        }
        return currency(revenue);
      };
      Track.prototype.cents = function() {
        var revenue = this.revenue();
        return typeof revenue !== "number" ? this.value() || 0 : revenue * 100;
      };
      Track.prototype.identify = function() {
        var json = this.json();
        json.traits = this.traits();
        return new Identify(json, this.opts);
      };
      function currency(val) {
        if (!val)
          return;
        if (typeof val === "number") {
          return val;
        }
        if (typeof val !== "string") {
          return;
        }
        val = val.replace(/\$/g, "");
        val = parseFloat(val);
        if (!isNaN(val)) {
          return val;
        }
      }
      module.exports = Track;
    }
  });

  // node_modules/segmentio-facade/lib/page.js
  var require_page = __commonJS({
    "node_modules/segmentio-facade/lib/page.js"(exports, module) {
      "use strict";
      var inherit = require_utils().inherit;
      var Facade = require_facade();
      var Track = require_track();
      var isEmail = require_is_email();
      function Page(dictionary, opts) {
        Facade.call(this, dictionary, opts);
      }
      inherit(Page, Facade);
      Page.prototype.action = function() {
        return "page";
      };
      Page.prototype.type = Page.prototype.action;
      Page.prototype.category = Facade.field("category");
      Page.prototype.name = Facade.field("name");
      Page.prototype.title = Facade.proxy("properties.title");
      Page.prototype.path = Facade.proxy("properties.path");
      Page.prototype.url = Facade.proxy("properties.url");
      Page.prototype.referrer = function() {
        return this.proxy("context.referrer.url") || this.proxy("context.page.referrer") || this.proxy("properties.referrer");
      };
      Page.prototype.properties = function(aliases) {
        var props = this.field("properties") || {};
        var category = this.category();
        var name2 = this.name();
        aliases = aliases || {};
        if (category)
          props.category = category;
        if (name2)
          props.name = name2;
        for (var alias in aliases) {
          var value = this[alias] == null ? this.proxy("properties." + alias) : this[alias]();
          if (value == null)
            continue;
          props[aliases[alias]] = value;
          if (alias !== aliases[alias])
            delete props[alias];
        }
        return props;
      };
      Page.prototype.email = function() {
        var email = this.proxy("context.traits.email") || this.proxy("properties.email");
        if (email)
          return email;
        var userId = this.userId();
        if (isEmail(userId))
          return userId;
      };
      Page.prototype.fullName = function() {
        var category = this.category();
        var name2 = this.name();
        return name2 && category ? category + " " + name2 : name2;
      };
      Page.prototype.event = function(name2) {
        return name2 ? "Viewed " + name2 + " Page" : "Loaded a Page";
      };
      Page.prototype.track = function(name2) {
        var json = this.json();
        json.event = this.event(name2);
        json.timestamp = this.timestamp();
        json.properties = this.properties();
        return new Track(json, this.opts);
      };
      module.exports = Page;
    }
  });

  // node_modules/segmentio-facade/lib/screen.js
  var require_screen = __commonJS({
    "node_modules/segmentio-facade/lib/screen.js"(exports, module) {
      "use strict";
      var inherit = require_utils().inherit;
      var Page = require_page();
      var Track = require_track();
      function Screen(dictionary, opts) {
        Page.call(this, dictionary, opts);
      }
      inherit(Screen, Page);
      Screen.prototype.action = function() {
        return "screen";
      };
      Screen.prototype.type = Screen.prototype.action;
      Screen.prototype.event = function(name2) {
        return name2 ? "Viewed " + name2 + " Screen" : "Loaded a Screen";
      };
      Screen.prototype.track = function(name2) {
        var json = this.json();
        json.event = this.event(name2);
        json.timestamp = this.timestamp();
        json.properties = this.properties();
        return new Track(json, this.opts);
      };
      module.exports = Screen;
    }
  });

  // node_modules/segmentio-facade/lib/delete.js
  var require_delete = __commonJS({
    "node_modules/segmentio-facade/lib/delete.js"(exports, module) {
      "use strict";
      var inherit = require_utils().inherit;
      var Facade = require_facade();
      function Delete(dictionary, opts) {
        Facade.call(this, dictionary, opts);
      }
      inherit(Delete, Facade);
      Delete.prototype.type = function() {
        return "delete";
      };
      module.exports = Delete;
    }
  });

  // node_modules/segmentio-facade/lib/index.js
  var require_lib4 = __commonJS({
    "node_modules/segmentio-facade/lib/index.js"(exports, module) {
      "use strict";
      var Facade = require_facade();
      Facade.Alias = require_alias();
      Facade.Group = require_group();
      Facade.Identify = require_identify();
      Facade.Track = require_track();
      Facade.Page = require_page();
      Facade.Screen = require_screen();
      Facade.Delete = require_delete();
      module.exports = Facade;
    }
  });

  // node_modules/component-emitter/index.js
  var require_component_emitter = __commonJS({
    "node_modules/component-emitter/index.js"(exports, module) {
      if (typeof module !== "undefined") {
        module.exports = Emitter;
      }
      function Emitter(obj) {
        if (obj)
          return mixin(obj);
      }
      function mixin(obj) {
        for (var key in Emitter.prototype) {
          obj[key] = Emitter.prototype[key];
        }
        return obj;
      }
      Emitter.prototype.on = Emitter.prototype.addEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        (this._callbacks["$" + event] = this._callbacks["$" + event] || []).push(fn);
        return this;
      };
      Emitter.prototype.once = function(event, fn) {
        function on() {
          this.off(event, on);
          fn.apply(this, arguments);
        }
        on.fn = fn;
        this.on(event, on);
        return this;
      };
      Emitter.prototype.off = Emitter.prototype.removeListener = Emitter.prototype.removeAllListeners = Emitter.prototype.removeEventListener = function(event, fn) {
        this._callbacks = this._callbacks || {};
        if (arguments.length == 0) {
          this._callbacks = {};
          return this;
        }
        var callbacks = this._callbacks["$" + event];
        if (!callbacks)
          return this;
        if (arguments.length == 1) {
          delete this._callbacks["$" + event];
          return this;
        }
        var cb;
        for (var i = 0; i < callbacks.length; i++) {
          cb = callbacks[i];
          if (cb === fn || cb.fn === fn) {
            callbacks.splice(i, 1);
            break;
          }
        }
        if (callbacks.length === 0) {
          delete this._callbacks["$" + event];
        }
        return this;
      };
      Emitter.prototype.emit = function(event) {
        this._callbacks = this._callbacks || {};
        var args = new Array(arguments.length - 1), callbacks = this._callbacks["$" + event];
        for (var i = 1; i < arguments.length; i++) {
          args[i - 1] = arguments[i];
        }
        if (callbacks) {
          callbacks = callbacks.slice(0);
          for (var i = 0, len = callbacks.length; i < len; ++i) {
            callbacks[i].apply(this, args);
          }
        }
        return this;
      };
      Emitter.prototype.listeners = function(event) {
        this._callbacks = this._callbacks || {};
        return this._callbacks["$" + event] || [];
      };
      Emitter.prototype.hasListeners = function(event) {
        return !!this.listeners(event).length;
      };
    }
  });

  // node_modules/@segment/analytics.js-core/build/middleware.js
  var require_middleware = __commonJS({
    "node_modules/@segment/analytics.js-core/build/middleware.js"(exports, module) {
      "use strict";
      var Facade = require_lib4();
      module.exports.SourceMiddlewareChain = function SourceMiddlewareChain() {
        var apply = middlewareChain(this);
        this.applyMiddlewares = function(facade, integrations2, callback) {
          return apply(function(mw, payload, next) {
            mw({
              integrations: integrations2,
              next,
              payload
            });
          }, facade, callback);
        };
      };
      module.exports.IntegrationMiddlewareChain = function IntegrationMiddlewareChain() {
        var apply = middlewareChain(this);
        this.applyMiddlewares = function(facade, integration, callback) {
          return apply(function(mw, payload, next) {
            mw(payload, integration, next);
          }, facade, callback);
        };
      };
      module.exports.DestinationMiddlewareChain = function DestinationMiddlewareChain() {
        var apply = middlewareChain(this);
        this.applyMiddlewares = function(facade, integration, callback) {
          return apply(function(mw, payload, next) {
            mw({ payload, integration, next });
          }, facade, callback);
        };
      };
      function middlewareChain(dest) {
        var middlewares = [];
        dest.getMiddlewares = function() {
          return middlewares.slice();
        };
        dest.add = function(middleware) {
          if (typeof middleware !== "function")
            throw new Error("attempted to add non-function middleware");
          if (middlewares.indexOf(middleware) !== -1)
            throw new Error("middleware is already registered");
          middlewares.push(middleware);
        };
        return function applyMiddlewares(run, facade, callback) {
          if (typeof facade !== "object")
            throw new Error("applyMiddlewares requires a payload object");
          if (typeof callback !== "function")
            throw new Error("applyMiddlewares requires a function callback");
          var middlewaresToApply = middlewares.slice();
          middlewaresToApply.push(callback);
          executeChain(run, facade, middlewaresToApply, 0);
        };
      }
      function executeChain(run, payload, middlewares, index) {
        if (payload === null) {
          middlewares[middlewares.length - 1](null);
          return;
        }
        if (!(payload instanceof Facade)) {
          payload = new Facade(payload);
        }
        var mw = middlewares[index];
        if (mw) {
          if (middlewares[index + 1]) {
            run(mw, payload, function(result) {
              executeChain(run, result, middlewares, ++index);
            });
          } else {
            mw(payload);
          }
        }
      }
      module.exports.middlewareChain = middlewareChain;
    }
  });

  // node_modules/component-bind/index.js
  var require_component_bind = __commonJS({
    "node_modules/component-bind/index.js"(exports, module) {
      var slice = [].slice;
      module.exports = function(obj, fn) {
        if (typeof fn == "string")
          fn = obj[fn];
        if (typeof fn != "function")
          throw new Error("bind() requires a function");
        var args = slice.call(arguments, 2);
        return function() {
          return fn.apply(obj, args.concat(slice.call(arguments)));
        };
      };
    }
  });

  // node_modules/bind-all/lib/index.js
  var require_lib5 = __commonJS({
    "node_modules/bind-all/lib/index.js"(exports, module) {
      "use strict";
      var bind = require_component_bind();
      function bindAll(obj) {
        for (var key in obj) {
          var val = obj[key];
          if (typeof val === "function") {
            obj[key] = bind(obj, obj[key]);
          }
        }
        return obj;
      }
      module.exports = bindAll;
    }
  });

  // node_modules/@segment/analytics.js-core/build/utils/clone.js
  var require_clone2 = __commonJS({
    "node_modules/@segment/analytics.js-core/build/utils/clone.js"(exports, module) {
      "use strict";
      var type = require_component_type();
      var clone = function clone2(obj) {
        var t = type(obj);
        var copy;
        if (t === "object") {
          copy = {};
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              copy[key] = clone2(obj[key]);
            }
          }
          return copy;
        }
        if (t === "array") {
          copy = new Array(obj.length);
          for (var i = 0, l = obj.length; i < l; i++) {
            copy[i] = clone2(obj[i]);
          }
          return copy;
        }
        if (t === "regexp") {
          var flags = "";
          flags += obj.multiline ? "m" : "";
          flags += obj.global ? "g" : "";
          flags += obj.ignoreCase ? "i" : "";
          return new RegExp(obj.source, flags);
        }
        if (t === "date") {
          return new Date(obj.getTime());
        }
        return obj;
      };
      module.exports = clone;
    }
  });

  // node_modules/extend/index.js
  var require_extend = __commonJS({
    "node_modules/extend/index.js"(exports, module) {
      "use strict";
      var hasOwn = Object.prototype.hasOwnProperty;
      var toStr = Object.prototype.toString;
      var defineProperty = Object.defineProperty;
      var gOPD = Object.getOwnPropertyDescriptor;
      var isArray = function isArray2(arr) {
        if (typeof Array.isArray === "function") {
          return Array.isArray(arr);
        }
        return toStr.call(arr) === "[object Array]";
      };
      var isPlainObject = function isPlainObject2(obj) {
        if (!obj || toStr.call(obj) !== "[object Object]") {
          return false;
        }
        var hasOwnConstructor = hasOwn.call(obj, "constructor");
        var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, "isPrototypeOf");
        if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
          return false;
        }
        var key;
        for (key in obj) {
        }
        return typeof key === "undefined" || hasOwn.call(obj, key);
      };
      var setProperty = function setProperty2(target, options) {
        if (defineProperty && options.name === "__proto__") {
          defineProperty(target, options.name, {
            enumerable: true,
            configurable: true,
            value: options.newValue,
            writable: true
          });
        } else {
          target[options.name] = options.newValue;
        }
      };
      var getProperty = function getProperty2(obj, name2) {
        if (name2 === "__proto__") {
          if (!hasOwn.call(obj, name2)) {
            return void 0;
          } else if (gOPD) {
            return gOPD(obj, name2).value;
          }
        }
        return obj[name2];
      };
      module.exports = function extend() {
        var options, name2, src, copy, copyIsArray, clone;
        var target = arguments[0];
        var i = 1;
        var length = arguments.length;
        var deep = false;
        if (typeof target === "boolean") {
          deep = target;
          target = arguments[1] || {};
          i = 2;
        }
        if (target == null || typeof target !== "object" && typeof target !== "function") {
          target = {};
        }
        for (; i < length; ++i) {
          options = arguments[i];
          if (options != null) {
            for (name2 in options) {
              src = getProperty(target, name2);
              copy = getProperty(options, name2);
              if (target !== copy) {
                if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
                  if (copyIsArray) {
                    copyIsArray = false;
                    clone = src && isArray(src) ? src : [];
                  } else {
                    clone = src && isPlainObject(src) ? src : {};
                  }
                  setProperty(target, { name: name2, newValue: extend(deep, clone, copy) });
                } else if (typeof copy !== "undefined") {
                  setProperty(target, { name: name2, newValue: copy });
                }
              }
            }
          }
        }
        return target;
      };
    }
  });

  // node_modules/ms/index.js
  var require_ms = __commonJS({
    "node_modules/ms/index.js"(exports, module) {
      var s = 1e3;
      var m = s * 60;
      var h = m * 60;
      var d = h * 24;
      var y = d * 365.25;
      module.exports = function(val, options) {
        options = options || {};
        var type = typeof val;
        if (type === "string" && val.length > 0) {
          return parse(val);
        } else if (type === "number" && isNaN(val) === false) {
          return options.long ? fmtLong(val) : fmtShort(val);
        }
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(val));
      };
      function parse(str) {
        str = String(str);
        if (str.length > 100) {
          return;
        }
        var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(str);
        if (!match) {
          return;
        }
        var n = parseFloat(match[1]);
        var type = (match[2] || "ms").toLowerCase();
        switch (type) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return n * y;
          case "days":
          case "day":
          case "d":
            return n * d;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return n * h;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return n * m;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return n * s;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return n;
          default:
            return void 0;
        }
      }
      function fmtShort(ms) {
        if (ms >= d) {
          return Math.round(ms / d) + "d";
        }
        if (ms >= h) {
          return Math.round(ms / h) + "h";
        }
        if (ms >= m) {
          return Math.round(ms / m) + "m";
        }
        if (ms >= s) {
          return Math.round(ms / s) + "s";
        }
        return ms + "ms";
      }
      function fmtLong(ms) {
        return plural(ms, d, "day") || plural(ms, h, "hour") || plural(ms, m, "minute") || plural(ms, s, "second") || ms + " ms";
      }
      function plural(ms, n, name2) {
        if (ms < n) {
          return;
        }
        if (ms < n * 1.5) {
          return Math.floor(ms / n) + " " + name2;
        }
        return Math.ceil(ms / n) + " " + name2 + "s";
      }
    }
  });

  // node_modules/debug/src/debug.js
  var require_debug = __commonJS({
    "node_modules/debug/src/debug.js"(exports, module) {
      exports = module.exports = createDebug.debug = createDebug["default"] = createDebug;
      exports.coerce = coerce;
      exports.disable = disable;
      exports.enable = enable;
      exports.enabled = enabled;
      exports.humanize = require_ms();
      exports.names = [];
      exports.skips = [];
      exports.formatters = {};
      var prevTime;
      function selectColor(namespace) {
        var hash = 0, i;
        for (i in namespace) {
          hash = (hash << 5) - hash + namespace.charCodeAt(i);
          hash |= 0;
        }
        return exports.colors[Math.abs(hash) % exports.colors.length];
      }
      function createDebug(namespace) {
        function debug() {
          if (!debug.enabled)
            return;
          var self2 = debug;
          var curr = +new Date();
          var ms = curr - (prevTime || curr);
          self2.diff = ms;
          self2.prev = prevTime;
          self2.curr = curr;
          prevTime = curr;
          var args = new Array(arguments.length);
          for (var i = 0; i < args.length; i++) {
            args[i] = arguments[i];
          }
          args[0] = exports.coerce(args[0]);
          if (typeof args[0] !== "string") {
            args.unshift("%O");
          }
          var index = 0;
          args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
            if (match === "%%")
              return match;
            index++;
            var formatter = exports.formatters[format];
            if (typeof formatter === "function") {
              var val = args[index];
              match = formatter.call(self2, val);
              args.splice(index, 1);
              index--;
            }
            return match;
          });
          exports.formatArgs.call(self2, args);
          var logFn = debug.log || exports.log || console.log.bind(console);
          logFn.apply(self2, args);
        }
        debug.namespace = namespace;
        debug.enabled = exports.enabled(namespace);
        debug.useColors = exports.useColors();
        debug.color = selectColor(namespace);
        if (typeof exports.init === "function") {
          exports.init(debug);
        }
        return debug;
      }
      function enable(namespaces) {
        exports.save(namespaces);
        exports.names = [];
        exports.skips = [];
        var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
        var len = split.length;
        for (var i = 0; i < len; i++) {
          if (!split[i])
            continue;
          namespaces = split[i].replace(/\*/g, ".*?");
          if (namespaces[0] === "-") {
            exports.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
          } else {
            exports.names.push(new RegExp("^" + namespaces + "$"));
          }
        }
      }
      function disable() {
        exports.enable("");
      }
      function enabled(name2) {
        var i, len;
        for (i = 0, len = exports.skips.length; i < len; i++) {
          if (exports.skips[i].test(name2)) {
            return false;
          }
        }
        for (i = 0, len = exports.names.length; i < len; i++) {
          if (exports.names[i].test(name2)) {
            return true;
          }
        }
        return false;
      }
      function coerce(val) {
        if (val instanceof Error)
          return val.stack || val.message;
        return val;
      }
    }
  });

  // node_modules/debug/src/browser.js
  var require_browser = __commonJS({
    "node_modules/debug/src/browser.js"(exports, module) {
      exports = module.exports = require_debug();
      exports.log = log;
      exports.formatArgs = formatArgs;
      exports.save = save;
      exports.load = load;
      exports.useColors = useColors;
      exports.storage = typeof chrome != "undefined" && typeof chrome.storage != "undefined" ? chrome.storage.local : localstorage();
      exports.colors = [
        "lightseagreen",
        "forestgreen",
        "goldenrod",
        "dodgerblue",
        "darkorchid",
        "crimson"
      ];
      function useColors() {
        if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
          return true;
        }
        return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
      }
      exports.formatters.j = function(v) {
        try {
          return JSON.stringify(v);
        } catch (err) {
          return "[UnexpectedJSONParseError]: " + err.message;
        }
      };
      function formatArgs(args) {
        var useColors2 = this.useColors;
        args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports.humanize(this.diff);
        if (!useColors2)
          return;
        var c = "color: " + this.color;
        args.splice(1, 0, c, "color: inherit");
        var index = 0;
        var lastC = 0;
        args[0].replace(/%[a-zA-Z%]/g, function(match) {
          if (match === "%%")
            return;
          index++;
          if (match === "%c") {
            lastC = index;
          }
        });
        args.splice(lastC, 0, c);
      }
      function log() {
        return typeof console === "object" && console.log && Function.prototype.apply.call(console.log, console, arguments);
      }
      function save(namespaces) {
        try {
          if (namespaces == null) {
            exports.storage.removeItem("debug");
          } else {
            exports.storage.debug = namespaces;
          }
        } catch (e) {
        }
      }
      function load() {
        var r;
        try {
          r = exports.storage.debug;
        } catch (e) {
        }
        if (!r && typeof process !== "undefined" && "env" in process) {
          r = process.env.DEBUG;
        }
        return r;
      }
      exports.enable(load());
      function localstorage() {
        try {
          return window.localStorage;
        } catch (e) {
        }
      }
    }
  });

  // node_modules/@segment/cookie/lib/index.js
  var require_lib6 = __commonJS({
    "node_modules/@segment/cookie/lib/index.js"(exports, module) {
      "use strict";
      var debug = require_browser()("cookie");
      module.exports = function(name2, value, options) {
        switch (arguments.length) {
          case 3:
          case 2:
            return set(name2, value, options);
          case 1:
            return get(name2);
          default:
            return all();
        }
      };
      function set(name2, value, options) {
        options = options || {};
        var str = encode(name2) + "=" + encode(value);
        if (value == null)
          options.maxage = -1;
        if (options.maxage) {
          options.expires = new Date(+new Date() + options.maxage);
        }
        if (options.path)
          str += "; path=" + options.path;
        if (options.domain)
          str += "; domain=" + options.domain;
        if (options.expires)
          str += "; expires=" + options.expires.toUTCString();
        if (options.sameSite)
          str += "; SameSite=" + options.sameSite;
        if (options.secure)
          str += "; secure";
        document.cookie = str;
      }
      function all() {
        var str;
        try {
          str = document.cookie;
        } catch (err) {
          if (typeof console !== "undefined" && typeof console.error === "function") {
            console.error(err.stack || err);
          }
          return {};
        }
        return parse(str);
      }
      function get(name2) {
        return all()[name2];
      }
      function parse(str) {
        var obj = {};
        var pairs = str.split(/ *; */);
        var pair;
        if (pairs[0] == "")
          return obj;
        for (var i = 0; i < pairs.length; ++i) {
          pair = pairs[i].split("=");
          obj[decode(pair[0])] = decode(pair[1]);
        }
        return obj;
      }
      function encode(value) {
        try {
          return encodeURIComponent(value);
        } catch (e) {
          debug("error `encode(%o)` - %o", value, e);
        }
      }
      function decode(value) {
        try {
          return decodeURIComponent(value);
        } catch (e) {
          debug("error `decode(%o)` - %o", value, e);
        }
      }
    }
  });

  // node_modules/@ndhoule/drop/index.js
  var require_drop = __commonJS({
    "node_modules/@ndhoule/drop/index.js"(exports, module) {
      "use strict";
      var max = Math.max;
      var drop = function drop2(count, collection) {
        var length = collection ? collection.length : 0;
        if (!length) {
          return [];
        }
        var toDrop = max(Number(count) || 0, 0);
        var resultsLength = max(length - toDrop, 0);
        var results = new Array(resultsLength);
        for (var i = 0; i < resultsLength; i += 1) {
          results[i] = collection[i + toDrop];
        }
        return results;
      };
      module.exports = drop;
    }
  });

  // node_modules/@ndhoule/rest/index.js
  var require_rest = __commonJS({
    "node_modules/@ndhoule/rest/index.js"(exports, module) {
      "use strict";
      var max = Math.max;
      var rest = function rest2(collection) {
        if (collection == null || !collection.length) {
          return [];
        }
        var results = new Array(max(collection.length - 2, 0));
        for (var i = 1; i < collection.length; i += 1) {
          results[i - 1] = collection[i];
        }
        return results;
      };
      module.exports = rest;
    }
  });

  // node_modules/@ndhoule/defaults/index.js
  var require_defaults = __commonJS({
    "node_modules/@ndhoule/defaults/index.js"(exports, module) {
      "use strict";
      var drop = require_drop();
      var rest = require_rest();
      var has = Object.prototype.hasOwnProperty;
      var objToString = Object.prototype.toString;
      var isObject = function isObject2(value) {
        return Boolean(value) && typeof value === "object";
      };
      var isPlainObject = function isPlainObject2(value) {
        return Boolean(value) && objToString.call(value) === "[object Object]";
      };
      var shallowCombiner = function shallowCombiner2(target, source, value, key) {
        if (has.call(source, key) && target[key] === void 0) {
          target[key] = value;
        }
        return source;
      };
      var deepCombiner = function(target, source, value, key) {
        if (has.call(source, key)) {
          if (isPlainObject(target[key]) && isPlainObject(value)) {
            target[key] = defaultsDeep(target[key], value);
          } else if (target[key] === void 0) {
            target[key] = value;
          }
        }
        return source;
      };
      var defaultsWith = function(combiner, target) {
        if (!isObject(target)) {
          return target;
        }
        combiner = combiner || shallowCombiner;
        var sources = drop(2, arguments);
        for (var i = 0; i < sources.length; i += 1) {
          for (var key in sources[i]) {
            combiner(target, sources[i], sources[i][key], key);
          }
        }
        return target;
      };
      var defaultsDeep = function defaultsDeep2(target) {
        return defaultsWith.apply(null, [deepCombiner, target].concat(rest(arguments)));
      };
      var defaults = function(target) {
        return defaultsWith.apply(null, [null, target].concat(rest(arguments)));
      };
      module.exports = defaults;
      module.exports.deep = defaultsDeep;
    }
  });

  // node_modules/component-url/index.js
  var require_component_url = __commonJS({
    "node_modules/component-url/index.js"(exports) {
      exports.parse = function(url) {
        var a = document.createElement("a");
        a.href = url;
        return {
          href: a.href,
          host: a.host || location.host,
          port: a.port === "0" || a.port === "" ? port(a.protocol) : a.port,
          hash: a.hash,
          hostname: a.hostname || location.hostname,
          pathname: a.pathname.charAt(0) != "/" ? "/" + a.pathname : a.pathname,
          protocol: !a.protocol || a.protocol == ":" ? location.protocol : a.protocol,
          search: a.search,
          query: a.search.slice(1)
        };
      };
      exports.isAbsolute = function(url) {
        return url.indexOf("//") == 0 || !!~url.indexOf("://");
      };
      exports.isRelative = function(url) {
        return !exports.isAbsolute(url);
      };
      exports.isCrossDomain = function(url) {
        url = exports.parse(url);
        var location2 = exports.parse(window.location.href);
        return url.hostname !== location2.hostname || url.port !== location2.port || url.protocol !== location2.protocol;
      };
      function port(protocol) {
        switch (protocol) {
          case "http:":
            return 80;
          case "https:":
            return 443;
          default:
            return location.port;
        }
      }
    }
  });

  // node_modules/component-cookie/index.js
  var require_component_cookie = __commonJS({
    "node_modules/component-cookie/index.js"(exports, module) {
      var debug = require_browser()("cookie");
      module.exports = function(name2, value, options) {
        switch (arguments.length) {
          case 3:
          case 2:
            return set(name2, value, options);
          case 1:
            return get(name2);
          default:
            return all();
        }
      };
      function set(name2, value, options) {
        options = options || {};
        var str = encode(name2) + "=" + encode(value);
        if (value == null)
          options.maxage = -1;
        if (options.maxage) {
          options.expires = new Date(+new Date() + options.maxage);
        }
        if (options.path)
          str += "; path=" + options.path;
        if (options.domain)
          str += "; domain=" + options.domain;
        if (options.expires)
          str += "; expires=" + options.expires.toUTCString();
        if (options.secure)
          str += "; secure";
        document.cookie = str;
      }
      function all() {
        var str;
        try {
          str = document.cookie;
        } catch (err) {
          if (typeof console !== "undefined" && typeof console.error === "function") {
            console.error(err.stack || err);
          }
          return {};
        }
        return parse(str);
      }
      function get(name2) {
        return all()[name2];
      }
      function parse(str) {
        var obj = {};
        var pairs = str.split(/ *; */);
        var pair;
        if (pairs[0] == "")
          return obj;
        for (var i = 0; i < pairs.length; ++i) {
          pair = pairs[i].split("=");
          obj[decode(pair[0])] = decode(pair[1]);
        }
        return obj;
      }
      function encode(value) {
        try {
          return encodeURIComponent(value);
        } catch (e) {
          debug("error `encode(%o)` - %o", value, e);
        }
      }
      function decode(value) {
        try {
          return decodeURIComponent(value);
        } catch (e) {
          debug("error `decode(%o)` - %o", value, e);
        }
      }
    }
  });

  // node_modules/@segment/top-domain/lib/index.js
  var require_lib7 = __commonJS({
    "node_modules/@segment/top-domain/lib/index.js"(exports, module) {
      "use strict";
      var parse = require_component_url().parse;
      var cookie = require_component_cookie();
      function domain(url) {
        var cookie2 = exports.cookie;
        var levels = exports.levels(url);
        for (var i = 0; i < levels.length; ++i) {
          var cname = "__tld__";
          var domain2 = levels[i];
          var opts = { domain: "." + domain2 };
          cookie2(cname, 1, opts);
          if (cookie2(cname)) {
            cookie2(cname, null, opts);
            return domain2;
          }
        }
        return "";
      }
      domain.levels = function(url) {
        var host = parse(url).hostname;
        var parts = host.split(".");
        var last = parts[parts.length - 1];
        var levels = [];
        if (parts.length === 4 && last === parseInt(last, 10)) {
          return levels;
        }
        if (parts.length <= 1) {
          return levels;
        }
        for (var i = parts.length - 2; i >= 0; --i) {
          levels.push(parts.slice(i).join("."));
        }
        return levels;
      };
      domain.cookie = cookie;
      exports = module.exports = domain;
    }
  });

  // node_modules/@segment/analytics.js-core/build/cookie.js
  var require_cookie = __commonJS({
    "node_modules/@segment/analytics.js-core/build/cookie.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var bindAll = require_lib5();
      var clone = require_clone2();
      var cookie = require_lib6();
      var debug = require_browser()("analytics.js:cookie");
      var defaults = require_defaults();
      var topDomain = require_lib7();
      function Cookie(options) {
        this.options(options);
      }
      Cookie.prototype.options = function(options) {
        if (arguments.length === 0)
          return this._options;
        options = options || {};
        var domain = "." + topDomain(window.location.href);
        if (domain === ".")
          domain = null;
        this._options = defaults(options, {
          maxage: 31536e6,
          path: "/",
          domain,
          sameSite: "Lax"
        });
        this.set("ajs:test", true);
        if (!this.get("ajs:test")) {
          debug("fallback to domain=null");
          this._options.domain = null;
        }
        this.remove("ajs:test");
      };
      Cookie.prototype.set = function(key, value) {
        try {
          value = window.JSON.stringify(value);
          cookie(key, value === "null" ? null : value, clone(this._options));
          return true;
        } catch (e) {
          return false;
        }
      };
      Cookie.prototype.get = function(key) {
        try {
          var value = cookie(key);
          value = value ? window.JSON.parse(value) : null;
          return value;
        } catch (e) {
          return null;
        }
      };
      Cookie.prototype.remove = function(key) {
        try {
          cookie(key, null, clone(this._options));
          return true;
        } catch (e) {
          return false;
        }
      };
      module.exports = bindAll(new Cookie());
      module.exports.Cookie = Cookie;
    }
  });

  // node_modules/json3/lib/json3.js
  var require_json3 = __commonJS({
    "node_modules/json3/lib/json3.js"(exports, module) {
      (function() {
        var isLoader = typeof define === "function" && define.amd;
        var objectTypes = {
          "function": true,
          "object": true
        };
        var freeExports = objectTypes[typeof exports] && exports && !exports.nodeType && exports;
        var root = objectTypes[typeof window] && window || this, freeGlobal = freeExports && objectTypes[typeof module] && module && !module.nodeType && typeof window == "object" && window;
        if (freeGlobal && (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal)) {
          root = freeGlobal;
        }
        function runInContext(context, exports2) {
          context || (context = root.Object());
          exports2 || (exports2 = root.Object());
          var Number2 = context.Number || root.Number, String2 = context.String || root.String, Object2 = context.Object || root.Object, Date2 = context.Date || root.Date, SyntaxError = context.SyntaxError || root.SyntaxError, TypeError2 = context.TypeError || root.TypeError, Math2 = context.Math || root.Math, nativeJSON2 = context.JSON || root.JSON;
          if (typeof nativeJSON2 == "object" && nativeJSON2) {
            exports2.stringify = nativeJSON2.stringify;
            exports2.parse = nativeJSON2.parse;
          }
          var objectProto = Object2.prototype, getClass = objectProto.toString, isProperty = objectProto.hasOwnProperty, undefined2;
          function attempt(func, errorFunc) {
            try {
              func();
            } catch (exception) {
              if (errorFunc) {
                errorFunc();
              }
            }
          }
          var isExtended = new Date2(-3509827334573292);
          attempt(function() {
            isExtended = isExtended.getUTCFullYear() == -109252 && isExtended.getUTCMonth() === 0 && isExtended.getUTCDate() === 1 && isExtended.getUTCHours() == 10 && isExtended.getUTCMinutes() == 37 && isExtended.getUTCSeconds() == 6 && isExtended.getUTCMilliseconds() == 708;
          });
          function has(name2) {
            if (has[name2] != null) {
              return has[name2];
            }
            var isSupported;
            if (name2 == "bug-string-char-index") {
              isSupported = "a"[0] != "a";
            } else if (name2 == "json") {
              isSupported = has("json-stringify") && has("date-serialization") && has("json-parse");
            } else if (name2 == "date-serialization") {
              isSupported = has("json-stringify") && isExtended;
              if (isSupported) {
                var stringify = exports2.stringify;
                attempt(function() {
                  isSupported = stringify(new Date2(-864e13)) == '"-271821-04-20T00:00:00.000Z"' && stringify(new Date2(864e13)) == '"+275760-09-13T00:00:00.000Z"' && stringify(new Date2(-621987552e5)) == '"-000001-01-01T00:00:00.000Z"' && stringify(new Date2(-1)) == '"1969-12-31T23:59:59.999Z"';
                });
              }
            } else {
              var value, serialized = '{"a":[1,true,false,null,"\\u0000\\b\\n\\f\\r\\t"]}';
              if (name2 == "json-stringify") {
                var stringify = exports2.stringify, stringifySupported = typeof stringify == "function";
                if (stringifySupported) {
                  (value = function() {
                    return 1;
                  }).toJSON = value;
                  attempt(function() {
                    stringifySupported = stringify(0) === "0" && stringify(new Number2()) === "0" && stringify(new String2()) == '""' && stringify(getClass) === undefined2 && stringify(undefined2) === undefined2 && stringify() === undefined2 && stringify(value) === "1" && stringify([value]) == "[1]" && stringify([undefined2]) == "[null]" && stringify(null) == "null" && stringify([undefined2, getClass, null]) == "[null,null,null]" && stringify({ "a": [value, true, false, null, "\0\b\n\f\r	"] }) == serialized && stringify(null, value) === "1" && stringify([1, 2], null, 1) == "[\n 1,\n 2\n]";
                  }, function() {
                    stringifySupported = false;
                  });
                }
                isSupported = stringifySupported;
              }
              if (name2 == "json-parse") {
                var parse = exports2.parse, parseSupported;
                if (typeof parse == "function") {
                  attempt(function() {
                    if (parse("0") === 0 && !parse(false)) {
                      value = parse(serialized);
                      parseSupported = value["a"].length == 5 && value["a"][0] === 1;
                      if (parseSupported) {
                        attempt(function() {
                          parseSupported = !parse('"	"');
                        });
                        if (parseSupported) {
                          attempt(function() {
                            parseSupported = parse("01") !== 1;
                          });
                        }
                        if (parseSupported) {
                          attempt(function() {
                            parseSupported = parse("1.") !== 1;
                          });
                        }
                      }
                    }
                  }, function() {
                    parseSupported = false;
                  });
                }
                isSupported = parseSupported;
              }
            }
            return has[name2] = !!isSupported;
          }
          has["bug-string-char-index"] = has["date-serialization"] = has["json"] = has["json-stringify"] = has["json-parse"] = null;
          if (!has("json")) {
            var functionClass = "[object Function]", dateClass = "[object Date]", numberClass = "[object Number]", stringClass = "[object String]", arrayClass = "[object Array]", booleanClass = "[object Boolean]";
            var charIndexBuggy = has("bug-string-char-index");
            var forOwn = function(object, callback) {
              var size = 0, Properties, dontEnums, property;
              (Properties = function() {
                this.valueOf = 0;
              }).prototype.valueOf = 0;
              dontEnums = new Properties();
              for (property in dontEnums) {
                if (isProperty.call(dontEnums, property)) {
                  size++;
                }
              }
              Properties = dontEnums = null;
              if (!size) {
                dontEnums = ["valueOf", "toString", "toLocaleString", "propertyIsEnumerable", "isPrototypeOf", "hasOwnProperty", "constructor"];
                forOwn = function(object2, callback2) {
                  var isFunction = getClass.call(object2) == functionClass, property2, length;
                  var hasProperty = !isFunction && typeof object2.constructor != "function" && objectTypes[typeof object2.hasOwnProperty] && object2.hasOwnProperty || isProperty;
                  for (property2 in object2) {
                    if (!(isFunction && property2 == "prototype") && hasProperty.call(object2, property2)) {
                      callback2(property2);
                    }
                  }
                  for (length = dontEnums.length; property2 = dontEnums[--length]; ) {
                    if (hasProperty.call(object2, property2)) {
                      callback2(property2);
                    }
                  }
                };
              } else {
                forOwn = function(object2, callback2) {
                  var isFunction = getClass.call(object2) == functionClass, property2, isConstructor;
                  for (property2 in object2) {
                    if (!(isFunction && property2 == "prototype") && isProperty.call(object2, property2) && !(isConstructor = property2 === "constructor")) {
                      callback2(property2);
                    }
                  }
                  if (isConstructor || isProperty.call(object2, property2 = "constructor")) {
                    callback2(property2);
                  }
                };
              }
              return forOwn(object, callback);
            };
            if (!has("json-stringify") && !has("date-serialization")) {
              var Escapes = {
                92: "\\\\",
                34: '\\"',
                8: "\\b",
                12: "\\f",
                10: "\\n",
                13: "\\r",
                9: "\\t"
              };
              var leadingZeroes = "000000";
              var toPaddedString = function(width, value) {
                return (leadingZeroes + (value || 0)).slice(-width);
              };
              var serializeDate = function(value) {
                var getData, year, month, date, time, hours, minutes, seconds, milliseconds;
                if (!isExtended) {
                  var floor = Math2.floor;
                  var Months = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334];
                  var getDay = function(year2, month2) {
                    return Months[month2] + 365 * (year2 - 1970) + floor((year2 - 1969 + (month2 = +(month2 > 1))) / 4) - floor((year2 - 1901 + month2) / 100) + floor((year2 - 1601 + month2) / 400);
                  };
                  getData = function(value2) {
                    date = floor(value2 / 864e5);
                    for (year = floor(date / 365.2425) + 1970 - 1; getDay(year + 1, 0) <= date; year++)
                      ;
                    for (month = floor((date - getDay(year, 0)) / 30.42); getDay(year, month + 1) <= date; month++)
                      ;
                    date = 1 + date - getDay(year, month);
                    time = (value2 % 864e5 + 864e5) % 864e5;
                    hours = floor(time / 36e5) % 24;
                    minutes = floor(time / 6e4) % 60;
                    seconds = floor(time / 1e3) % 60;
                    milliseconds = time % 1e3;
                  };
                } else {
                  getData = function(value2) {
                    year = value2.getUTCFullYear();
                    month = value2.getUTCMonth();
                    date = value2.getUTCDate();
                    hours = value2.getUTCHours();
                    minutes = value2.getUTCMinutes();
                    seconds = value2.getUTCSeconds();
                    milliseconds = value2.getUTCMilliseconds();
                  };
                }
                serializeDate = function(value2) {
                  if (value2 > -1 / 0 && value2 < 1 / 0) {
                    getData(value2);
                    value2 = (year <= 0 || year >= 1e4 ? (year < 0 ? "-" : "+") + toPaddedString(6, year < 0 ? -year : year) : toPaddedString(4, year)) + "-" + toPaddedString(2, month + 1) + "-" + toPaddedString(2, date) + "T" + toPaddedString(2, hours) + ":" + toPaddedString(2, minutes) + ":" + toPaddedString(2, seconds) + "." + toPaddedString(3, milliseconds) + "Z";
                    year = month = date = hours = minutes = seconds = milliseconds = null;
                  } else {
                    value2 = null;
                  }
                  return value2;
                };
                return serializeDate(value);
              };
              if (has("json-stringify") && !has("date-serialization")) {
                let dateToJSON2 = function(key) {
                  return serializeDate(this);
                };
                var dateToJSON = dateToJSON2;
                var nativeStringify = exports2.stringify;
                exports2.stringify = function(source, filter, width) {
                  var nativeToJSON = Date2.prototype.toJSON;
                  Date2.prototype.toJSON = dateToJSON2;
                  var result = nativeStringify(source, filter, width);
                  Date2.prototype.toJSON = nativeToJSON;
                  return result;
                };
              } else {
                var unicodePrefix = "\\u00";
                var escapeChar = function(character) {
                  var charCode = character.charCodeAt(0), escaped = Escapes[charCode];
                  if (escaped) {
                    return escaped;
                  }
                  return unicodePrefix + toPaddedString(2, charCode.toString(16));
                };
                var reEscape = /[\x00-\x1f\x22\x5c]/g;
                var quote = function(value) {
                  reEscape.lastIndex = 0;
                  return '"' + (reEscape.test(value) ? value.replace(reEscape, escapeChar) : value) + '"';
                };
                var serialize = function(property, object, callback, properties, whitespace, indentation, stack) {
                  var value, type, className, results, element, index, length, prefix, result;
                  attempt(function() {
                    value = object[property];
                  });
                  if (typeof value == "object" && value) {
                    if (value.getUTCFullYear && getClass.call(value) == dateClass && value.toJSON === Date2.prototype.toJSON) {
                      value = serializeDate(value);
                    } else if (typeof value.toJSON == "function") {
                      value = value.toJSON(property);
                    }
                  }
                  if (callback) {
                    value = callback.call(object, property, value);
                  }
                  if (value == undefined2) {
                    return value === undefined2 ? value : "null";
                  }
                  type = typeof value;
                  if (type == "object") {
                    className = getClass.call(value);
                  }
                  switch (className || type) {
                    case "boolean":
                    case booleanClass:
                      return "" + value;
                    case "number":
                    case numberClass:
                      return value > -1 / 0 && value < 1 / 0 ? "" + value : "null";
                    case "string":
                    case stringClass:
                      return quote("" + value);
                  }
                  if (typeof value == "object") {
                    for (length = stack.length; length--; ) {
                      if (stack[length] === value) {
                        throw TypeError2();
                      }
                    }
                    stack.push(value);
                    results = [];
                    prefix = indentation;
                    indentation += whitespace;
                    if (className == arrayClass) {
                      for (index = 0, length = value.length; index < length; index++) {
                        element = serialize(index, value, callback, properties, whitespace, indentation, stack);
                        results.push(element === undefined2 ? "null" : element);
                      }
                      result = results.length ? whitespace ? "[\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "]" : "[" + results.join(",") + "]" : "[]";
                    } else {
                      forOwn(properties || value, function(property2) {
                        var element2 = serialize(property2, value, callback, properties, whitespace, indentation, stack);
                        if (element2 !== undefined2) {
                          results.push(quote(property2) + ":" + (whitespace ? " " : "") + element2);
                        }
                      });
                      result = results.length ? whitespace ? "{\n" + indentation + results.join(",\n" + indentation) + "\n" + prefix + "}" : "{" + results.join(",") + "}" : "{}";
                    }
                    stack.pop();
                    return result;
                  }
                };
                exports2.stringify = function(source, filter, width) {
                  var whitespace, callback, properties, className;
                  if (objectTypes[typeof filter] && filter) {
                    className = getClass.call(filter);
                    if (className == functionClass) {
                      callback = filter;
                    } else if (className == arrayClass) {
                      properties = {};
                      for (var index = 0, length = filter.length, value; index < length; ) {
                        value = filter[index++];
                        className = getClass.call(value);
                        if (className == "[object String]" || className == "[object Number]") {
                          properties[value] = 1;
                        }
                      }
                    }
                  }
                  if (width) {
                    className = getClass.call(width);
                    if (className == numberClass) {
                      if ((width -= width % 1) > 0) {
                        if (width > 10) {
                          width = 10;
                        }
                        for (whitespace = ""; whitespace.length < width; ) {
                          whitespace += " ";
                        }
                      }
                    } else if (className == stringClass) {
                      whitespace = width.length <= 10 ? width : width.slice(0, 10);
                    }
                  }
                  return serialize("", (value = {}, value[""] = source, value), callback, properties, whitespace, "", []);
                };
              }
            }
            if (!has("json-parse")) {
              var fromCharCode = String2.fromCharCode;
              var Unescapes = {
                92: "\\",
                34: '"',
                47: "/",
                98: "\b",
                116: "	",
                110: "\n",
                102: "\f",
                114: "\r"
              };
              var Index, Source;
              var abort = function() {
                Index = Source = null;
                throw SyntaxError();
              };
              var lex = function() {
                var source = Source, length = source.length, value, begin, position, isSigned, charCode;
                while (Index < length) {
                  charCode = source.charCodeAt(Index);
                  switch (charCode) {
                    case 9:
                    case 10:
                    case 13:
                    case 32:
                      Index++;
                      break;
                    case 123:
                    case 125:
                    case 91:
                    case 93:
                    case 58:
                    case 44:
                      value = charIndexBuggy ? source.charAt(Index) : source[Index];
                      Index++;
                      return value;
                    case 34:
                      for (value = "@", Index++; Index < length; ) {
                        charCode = source.charCodeAt(Index);
                        if (charCode < 32) {
                          abort();
                        } else if (charCode == 92) {
                          charCode = source.charCodeAt(++Index);
                          switch (charCode) {
                            case 92:
                            case 34:
                            case 47:
                            case 98:
                            case 116:
                            case 110:
                            case 102:
                            case 114:
                              value += Unescapes[charCode];
                              Index++;
                              break;
                            case 117:
                              begin = ++Index;
                              for (position = Index + 4; Index < position; Index++) {
                                charCode = source.charCodeAt(Index);
                                if (!(charCode >= 48 && charCode <= 57 || charCode >= 97 && charCode <= 102 || charCode >= 65 && charCode <= 70)) {
                                  abort();
                                }
                              }
                              value += fromCharCode("0x" + source.slice(begin, Index));
                              break;
                            default:
                              abort();
                          }
                        } else {
                          if (charCode == 34) {
                            break;
                          }
                          charCode = source.charCodeAt(Index);
                          begin = Index;
                          while (charCode >= 32 && charCode != 92 && charCode != 34) {
                            charCode = source.charCodeAt(++Index);
                          }
                          value += source.slice(begin, Index);
                        }
                      }
                      if (source.charCodeAt(Index) == 34) {
                        Index++;
                        return value;
                      }
                      abort();
                    default:
                      begin = Index;
                      if (charCode == 45) {
                        isSigned = true;
                        charCode = source.charCodeAt(++Index);
                      }
                      if (charCode >= 48 && charCode <= 57) {
                        if (charCode == 48 && (charCode = source.charCodeAt(Index + 1), charCode >= 48 && charCode <= 57)) {
                          abort();
                        }
                        isSigned = false;
                        for (; Index < length && (charCode = source.charCodeAt(Index), charCode >= 48 && charCode <= 57); Index++)
                          ;
                        if (source.charCodeAt(Index) == 46) {
                          position = ++Index;
                          for (; position < length; position++) {
                            charCode = source.charCodeAt(position);
                            if (charCode < 48 || charCode > 57) {
                              break;
                            }
                          }
                          if (position == Index) {
                            abort();
                          }
                          Index = position;
                        }
                        charCode = source.charCodeAt(Index);
                        if (charCode == 101 || charCode == 69) {
                          charCode = source.charCodeAt(++Index);
                          if (charCode == 43 || charCode == 45) {
                            Index++;
                          }
                          for (position = Index; position < length; position++) {
                            charCode = source.charCodeAt(position);
                            if (charCode < 48 || charCode > 57) {
                              break;
                            }
                          }
                          if (position == Index) {
                            abort();
                          }
                          Index = position;
                        }
                        return +source.slice(begin, Index);
                      }
                      if (isSigned) {
                        abort();
                      }
                      var temp = source.slice(Index, Index + 4);
                      if (temp == "true") {
                        Index += 4;
                        return true;
                      } else if (temp == "fals" && source.charCodeAt(Index + 4) == 101) {
                        Index += 5;
                        return false;
                      } else if (temp == "null") {
                        Index += 4;
                        return null;
                      }
                      abort();
                  }
                }
                return "$";
              };
              var get = function(value) {
                var results, hasMembers;
                if (value == "$") {
                  abort();
                }
                if (typeof value == "string") {
                  if ((charIndexBuggy ? value.charAt(0) : value[0]) == "@") {
                    return value.slice(1);
                  }
                  if (value == "[") {
                    results = [];
                    for (; ; ) {
                      value = lex();
                      if (value == "]") {
                        break;
                      }
                      if (hasMembers) {
                        if (value == ",") {
                          value = lex();
                          if (value == "]") {
                            abort();
                          }
                        } else {
                          abort();
                        }
                      } else {
                        hasMembers = true;
                      }
                      if (value == ",") {
                        abort();
                      }
                      results.push(get(value));
                    }
                    return results;
                  } else if (value == "{") {
                    results = {};
                    for (; ; ) {
                      value = lex();
                      if (value == "}") {
                        break;
                      }
                      if (hasMembers) {
                        if (value == ",") {
                          value = lex();
                          if (value == "}") {
                            abort();
                          }
                        } else {
                          abort();
                        }
                      } else {
                        hasMembers = true;
                      }
                      if (value == "," || typeof value != "string" || (charIndexBuggy ? value.charAt(0) : value[0]) != "@" || lex() != ":") {
                        abort();
                      }
                      results[value.slice(1)] = get(lex());
                    }
                    return results;
                  }
                  abort();
                }
                return value;
              };
              var update = function(source, property, callback) {
                var element = walk(source, property, callback);
                if (element === undefined2) {
                  delete source[property];
                } else {
                  source[property] = element;
                }
              };
              var walk = function(source, property, callback) {
                var value = source[property], length;
                if (typeof value == "object" && value) {
                  if (getClass.call(value) == arrayClass) {
                    for (length = value.length; length--; ) {
                      update(getClass, forOwn, value, length, callback);
                    }
                  } else {
                    forOwn(value, function(property2) {
                      update(value, property2, callback);
                    });
                  }
                }
                return callback.call(source, property, value);
              };
              exports2.parse = function(source, callback) {
                var result, value;
                Index = 0;
                Source = "" + source;
                result = get(lex());
                if (lex() != "$") {
                  abort();
                }
                Index = Source = null;
                return callback && getClass.call(callback) == functionClass ? walk((value = {}, value[""] = result, value), "", callback) : result;
              };
            }
          }
          exports2.runInContext = runInContext;
          return exports2;
        }
        if (freeExports && !isLoader) {
          runInContext(root, freeExports);
        } else {
          var nativeJSON = root.JSON, previousJSON = root.JSON3, isRestored = false;
          var JSON3 = runInContext(root, root.JSON3 = {
            "noConflict": function() {
              if (!isRestored) {
                isRestored = true;
                root.JSON = nativeJSON;
                root.JSON3 = previousJSON;
                nativeJSON = previousJSON = null;
              }
              return JSON3;
            }
          });
          root.JSON = {
            "parse": JSON3.parse,
            "stringify": JSON3.stringify
          };
        }
        if (isLoader) {
          define(function() {
            return JSON3;
          });
        }
      }).call(exports);
    }
  });

  // node_modules/utf8-encode/index.js
  var require_utf8_encode = __commonJS({
    "node_modules/utf8-encode/index.js"(exports, module) {
      module.exports = encode;
      function encode(string) {
        string = string.replace(/\r\n/g, "\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
          var c = string.charCodeAt(n);
          if (c < 128) {
            utftext += String.fromCharCode(c);
          } else if (c > 127 && c < 2048) {
            utftext += String.fromCharCode(c >> 6 | 192);
            utftext += String.fromCharCode(c & 63 | 128);
          } else {
            utftext += String.fromCharCode(c >> 12 | 224);
            utftext += String.fromCharCode(c >> 6 & 63 | 128);
            utftext += String.fromCharCode(c & 63 | 128);
          }
        }
        return utftext;
      }
    }
  });

  // node_modules/@segment/base64-encode/index.js
  var require_base64_encode = __commonJS({
    "node_modules/@segment/base64-encode/index.js"(exports, module) {
      var utf8Encode = require_utf8_encode();
      var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      module.exports = encode;
      function encode(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = utf8Encode(input);
        while (i < input.length) {
          chr1 = input.charCodeAt(i++);
          chr2 = input.charCodeAt(i++);
          chr3 = input.charCodeAt(i++);
          enc1 = chr1 >> 2;
          enc2 = (chr1 & 3) << 4 | chr2 >> 4;
          enc3 = (chr2 & 15) << 2 | chr3 >> 6;
          enc4 = chr3 & 63;
          if (isNaN(chr2)) {
            enc3 = enc4 = 64;
          } else if (isNaN(chr3)) {
            enc4 = 64;
          }
          output = output + keyStr.charAt(enc1) + keyStr.charAt(enc2) + keyStr.charAt(enc3) + keyStr.charAt(enc4);
        }
        return output;
      }
    }
  });

  // node_modules/has-cors/index.js
  var require_has_cors = __commonJS({
    "node_modules/has-cors/index.js"(exports, module) {
      try {
        module.exports = typeof XMLHttpRequest !== "undefined" && "withCredentials" in new XMLHttpRequest();
      } catch (err) {
        module.exports = false;
      }
    }
  });

  // node_modules/jsonp/index.js
  var require_jsonp = __commonJS({
    "node_modules/jsonp/index.js"(exports, module) {
      var debug = require_browser()("jsonp");
      module.exports = jsonp;
      var count = 0;
      function noop() {
      }
      function jsonp(url, opts, fn) {
        if (typeof opts == "function") {
          fn = opts;
          opts = {};
        }
        if (!opts)
          opts = {};
        var prefix = opts.prefix || "__jp";
        var id = opts.name || prefix + count++;
        var param = opts.param || "callback";
        var timeout = opts.timeout != null ? opts.timeout : 6e4;
        var enc = encodeURIComponent;
        var target = document.getElementsByTagName("script")[0] || document.head;
        var script;
        var timer;
        if (timeout) {
          timer = setTimeout(function() {
            cleanup();
            if (fn)
              fn(new Error("Timeout"));
          }, timeout);
        }
        function cleanup() {
          if (script.parentNode)
            script.parentNode.removeChild(script);
          window[id] = noop;
          if (timer)
            clearTimeout(timer);
        }
        function cancel() {
          if (window[id]) {
            cleanup();
          }
        }
        window[id] = function(data) {
          debug("jsonp got", data);
          cleanup();
          if (fn)
            fn(null, data);
        };
        url += (~url.indexOf("?") ? "&" : "?") + param + "=" + enc(id);
        url = url.replace("?&", "?");
        debug('jsonp req "%s"', url);
        script = document.createElement("script");
        script.src = url;
        target.parentNode.insertBefore(script, target);
        return cancel;
      }
    }
  });

  // node_modules/@segment/send-json/lib/index.js
  var require_lib8 = __commonJS({
    "node_modules/@segment/send-json/lib/index.js"(exports, module) {
      "use strict";
      var JSON2 = require_json3();
      var base64encode = require_base64_encode();
      var cors = require_has_cors();
      var jsonp = require_jsonp();
      exports = module.exports = cors ? json : base64;
      exports.callback = "callback";
      exports.prefix = "data";
      exports.json = json;
      exports.base64 = base64;
      exports.type = cors ? "xhr" : "jsonp";
      function json(url, obj, headers, fn) {
        if (arguments.length === 3)
          fn = headers, headers = {};
        var req = new XMLHttpRequest();
        req.onerror = fn;
        req.onreadystatechange = done;
        req.open("POST", url, true);
        for (var k in headers) {
          req.setRequestHeader(k, headers[k]);
        }
        req.send(JSON2.stringify(obj));
        function done() {
          if (req.readyState === 4) {
            return fn(null, req);
          }
        }
      }
      function base64(url, obj, _, fn) {
        if (arguments.length === 3)
          fn = _;
        var prefix = exports.prefix;
        var data = encode(obj);
        url += "?" + prefix + "=" + data;
        jsonp(url, { param: exports.callback }, function(err, obj2) {
          if (err)
            return fn(err);
          fn(null, {
            url,
            body: obj2
          });
        });
      }
      function encode(obj) {
        var str = "";
        str = JSON2.stringify(obj);
        str = base64encode(str);
        str = str.replace(/\+/g, "-").replace(/\//g, "_");
        return encodeURIComponent(str);
      }
    }
  });

  // node_modules/@segment/analytics.js-core/build/metrics.js
  var require_metrics = __commonJS({
    "node_modules/@segment/analytics.js-core/build/metrics.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var bindAll = require_lib5();
      var send = require_lib8();
      var debug = require_browser()("analytics.js:metrics");
      function Metrics(options) {
        this.options(options);
      }
      Metrics.prototype.options = function(options) {
        options = options || {};
        this.host = options.host || "api.segment.io/v1";
        this.sampleRate = options.sampleRate || 0;
        this.flushTimer = options.flushTimer || 30 * 1e3;
        this.maxQueueSize = options.maxQueueSize || 20;
        this.queue = [];
        if (this.sampleRate > 0) {
          var self2 = this;
          setInterval(function() {
            self2._flush();
          }, this.flushTimer);
        }
      };
      Metrics.prototype.increment = function(metric, tags) {
        if (Math.random() > this.sampleRate) {
          return;
        }
        if (this.queue.length >= this.maxQueueSize) {
          return;
        }
        this.queue.push({ type: "Counter", metric, value: 1, tags });
        if (metric.indexOf("error") > 0) {
          this._flush();
        }
      };
      Metrics.prototype._flush = function() {
        var self2 = this;
        if (self2.queue.length <= 0) {
          return;
        }
        var payload = { series: this.queue };
        var headers = { "Content-Type": "text/plain" };
        self2.queue = [];
        if (send.type !== "xhr")
          return;
        send("https://" + this.host + "/m", payload, headers, function(err, res) {
          debug("sent %O, received %O", payload, [err, res]);
        });
      };
      module.exports = bindAll(new Metrics());
      module.exports.Metrics = Metrics;
    }
  });

  // node_modules/@ndhoule/keys/index.js
  var require_keys = __commonJS({
    "node_modules/@ndhoule/keys/index.js"(exports, module) {
      "use strict";
      var hop = Object.prototype.hasOwnProperty;
      var strCharAt = String.prototype.charAt;
      var toStr = Object.prototype.toString;
      var charAt = function(str, index) {
        return strCharAt.call(str, index);
      };
      var has = function has2(context, prop) {
        return hop.call(context, prop);
      };
      var isString = function isString2(val) {
        return toStr.call(val) === "[object String]";
      };
      var isArrayLike = function isArrayLike2(val) {
        return val != null && (typeof val !== "function" && typeof val.length === "number");
      };
      var indexKeys = function indexKeys2(target, pred) {
        pred = pred || has;
        var results = [];
        for (var i = 0, len = target.length; i < len; i += 1) {
          if (pred(target, i)) {
            results.push(String(i));
          }
        }
        return results;
      };
      var objectKeys = function objectKeys2(target, pred) {
        pred = pred || has;
        var results = [];
        for (var key in target) {
          if (pred(target, key)) {
            results.push(String(key));
          }
        }
        return results;
      };
      var keys = function keys2(source) {
        if (source == null) {
          return [];
        }
        if (isString(source)) {
          return indexKeys(source, charAt);
        }
        if (isArrayLike(source)) {
          return indexKeys(source, has);
        }
        return objectKeys(source);
      };
      module.exports = keys;
    }
  });

  // node_modules/@segment/analytics.js-core/build/utils/each.js
  var require_each = __commonJS({
    "node_modules/@segment/analytics.js-core/build/utils/each.js"(exports, module) {
      "use strict";
      var keys = require_keys();
      var objToString = Object.prototype.toString;
      var isNumber = function isNumber2(val) {
        var type = typeof val;
        return type === "number" || type === "object" && objToString.call(val) === "[object Number]";
      };
      var isArray = typeof Array.isArray === "function" ? Array.isArray : function isArray2(val) {
        return objToString.call(val) === "[object Array]";
      };
      var isArrayLike = function isArrayLike2(val) {
        return val != null && (isArray(val) || val !== "function" && isNumber(val.length));
      };
      var arrayEach = function arrayEach2(iterator, array) {
        for (var i = 0; i < array.length; i += 1) {
          if (iterator(array[i], i, array) === false) {
            break;
          }
        }
      };
      var baseEach = function baseEach2(iterator, object) {
        var ks = keys(object);
        for (var i = 0; i < ks.length; i += 1) {
          if (iterator(object[ks[i]], ks[i], object) === false) {
            break;
          }
        }
      };
      var each = function each2(iterator, collection) {
        return (isArrayLike(collection) ? arrayEach : baseEach).call(this, iterator, collection);
      };
      module.exports = each;
    }
  });

  // node_modules/@ndhoule/extend/index.js
  var require_extend2 = __commonJS({
    "node_modules/@ndhoule/extend/index.js"(exports, module) {
      "use strict";
      var has = Object.prototype.hasOwnProperty;
      var extend = function extend2(dest) {
        var sources = Array.prototype.slice.call(arguments, 1);
        for (var i = 0; i < sources.length; i += 1) {
          for (var key in sources[i]) {
            if (has.call(sources[i], key)) {
              dest[key] = sources[i][key];
            }
          }
        }
        return dest;
      };
      module.exports = extend;
    }
  });

  // node_modules/@segment/analytics.js-core/build/memory.js
  var require_memory = __commonJS({
    "node_modules/@segment/analytics.js-core/build/memory.js"(exports, module) {
      "use strict";
      var bindAll = require_lib5();
      var clone = require_clone2();
      var has = Object.prototype.hasOwnProperty;
      module.exports = bindAll(new Memory());
      function Memory() {
        this.store = {};
      }
      Memory.prototype.set = function(key, value) {
        this.store[key] = clone(value);
        return true;
      };
      Memory.prototype.get = function(key) {
        if (!has.call(this.store, key))
          return;
        return clone(this.store[key]);
      };
      Memory.prototype.remove = function(key) {
        delete this.store[key];
        return true;
      };
    }
  });

  // node_modules/@segment/store/src/store.js
  var require_store = __commonJS({
    "node_modules/@segment/store/src/store.js"(exports, module) {
      "use strict";
      var JSON2 = require_json3();
      module.exports = function() {
        var store = {}, win = typeof window != "undefined" ? window : window, doc = win.document, localStorageName = "localStorage", scriptTag = "script", storage;
        store.disabled = false;
        store.version = "1.3.20";
        store.set = function(key, value) {
        };
        store.get = function(key, defaultVal) {
        };
        store.has = function(key) {
          return store.get(key) !== void 0;
        };
        store.remove = function(key) {
        };
        store.clear = function() {
        };
        store.transact = function(key, defaultVal, transactionFn) {
          if (transactionFn == null) {
            transactionFn = defaultVal;
            defaultVal = null;
          }
          if (defaultVal == null) {
            defaultVal = {};
          }
          var val = store.get(key, defaultVal);
          transactionFn(val);
          store.set(key, val);
        };
        store.getAll = function() {
          var ret = {};
          store.forEach(function(key, val) {
            ret[key] = val;
          });
          return ret;
        };
        store.forEach = function() {
        };
        store.serialize = function(value) {
          return JSON2.stringify(value);
        };
        store.deserialize = function(value) {
          if (typeof value != "string") {
            return void 0;
          }
          try {
            return JSON2.parse(value);
          } catch (e) {
            return value || void 0;
          }
        };
        function isLocalStorageNameSupported() {
          try {
            return localStorageName in win && win[localStorageName];
          } catch (err) {
            return false;
          }
        }
        if (isLocalStorageNameSupported()) {
          storage = win[localStorageName];
          store.set = function(key, val) {
            if (val === void 0) {
              return store.remove(key);
            }
            storage.setItem(key, store.serialize(val));
            return val;
          };
          store.get = function(key, defaultVal) {
            var val = store.deserialize(storage.getItem(key));
            return val === void 0 ? defaultVal : val;
          };
          store.remove = function(key) {
            storage.removeItem(key);
          };
          store.clear = function() {
            storage.clear();
          };
          store.forEach = function(callback) {
            for (var i = 0; i < storage.length; i++) {
              var key = storage.key(i);
              callback(key, store.get(key));
            }
          };
        } else if (doc && doc.documentElement.addBehavior) {
          var storageOwner, storageContainer;
          try {
            storageContainer = new ActiveXObject("htmlfile");
            storageContainer.open();
            storageContainer.write("<" + scriptTag + ">document.w=window</" + scriptTag + '><iframe src="/favicon.ico"></iframe>');
            storageContainer.close();
            storageOwner = storageContainer.w.frames[0].document;
            storage = storageOwner.createElement("div");
          } catch (e) {
            storage = doc.createElement("div");
            storageOwner = doc.body;
          }
          var withIEStorage = function(storeFunction) {
            return function() {
              var args = Array.prototype.slice.call(arguments, 0);
              args.unshift(storage);
              storageOwner.appendChild(storage);
              storage.addBehavior("#default#userData");
              storage.load(localStorageName);
              var result = storeFunction.apply(store, args);
              storageOwner.removeChild(storage);
              return result;
            };
          };
          var forbiddenCharsRegex = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
          var ieKeyFix = function(key) {
            return key.replace(/^d/, "___$&").replace(forbiddenCharsRegex, "___");
          };
          store.set = withIEStorage(function(storage2, key, val) {
            key = ieKeyFix(key);
            if (val === void 0) {
              return store.remove(key);
            }
            storage2.setAttribute(key, store.serialize(val));
            storage2.save(localStorageName);
            return val;
          });
          store.get = withIEStorage(function(storage2, key, defaultVal) {
            key = ieKeyFix(key);
            var val = store.deserialize(storage2.getAttribute(key));
            return val === void 0 ? defaultVal : val;
          });
          store.remove = withIEStorage(function(storage2, key) {
            key = ieKeyFix(key);
            storage2.removeAttribute(key);
            storage2.save(localStorageName);
          });
          store.clear = withIEStorage(function(storage2) {
            var attributes = storage2.XMLDocument.documentElement.attributes;
            storage2.load(localStorageName);
            for (var i = attributes.length - 1; i >= 0; i--) {
              storage2.removeAttribute(attributes[i].name);
            }
            storage2.save(localStorageName);
          });
          store.forEach = withIEStorage(function(storage2, callback) {
            var attributes = storage2.XMLDocument.documentElement.attributes;
            for (var i = 0, attr; attr = attributes[i]; ++i) {
              callback(attr.name, store.deserialize(storage2.getAttribute(attr.name)));
            }
          });
        }
        try {
          var testKey = "__storejs__";
          store.set(testKey, testKey);
          if (store.get(testKey) != testKey) {
            store.disabled = true;
          }
          store.remove(testKey);
        } catch (e) {
          store.disabled = true;
        }
        store.enabled = !store.disabled;
        return store;
      }();
    }
  });

  // node_modules/@segment/analytics.js-core/build/store.js
  var require_store2 = __commonJS({
    "node_modules/@segment/analytics.js-core/build/store.js"(exports, module) {
      "use strict";
      var bindAll = require_lib5();
      var defaults = require_defaults();
      var store = require_store();
      function Store(options) {
        this.options(options);
      }
      Store.prototype.options = function(options) {
        if (arguments.length === 0)
          return this._options;
        options = options || {};
        defaults(options, { enabled: true });
        this.enabled = options.enabled && store.enabled;
        this._options = options;
      };
      Store.prototype.set = function(key, value) {
        if (!this.enabled)
          return false;
        return store.set(key, value);
      };
      Store.prototype.get = function(key) {
        if (!this.enabled)
          return null;
        return store.get(key);
      };
      Store.prototype.remove = function(key) {
        if (!this.enabled)
          return false;
        return store.remove(key);
      };
      module.exports = bindAll(new Store());
      module.exports.Store = Store;
    }
  });

  // node_modules/@segment/analytics.js-core/build/entity.js
  var require_entity = __commonJS({
    "node_modules/@segment/analytics.js-core/build/entity.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var clone = require_clone2();
      var cookie = require_cookie();
      var debug = require_browser()("analytics:entity");
      var defaults = require_defaults();
      var extend = require_extend2();
      var memory = require_memory();
      var store = require_store2();
      var isodateTraverse = require_lib3();
      module.exports = Entity;
      function Entity(options) {
        this.options(options);
        this.initialize();
      }
      Entity.prototype.initialize = function() {
        cookie.set("ajs:cookies", true);
        if (cookie.get("ajs:cookies")) {
          cookie.remove("ajs:cookies");
          this._storage = cookie;
          return;
        }
        if (store.enabled) {
          this._storage = store;
          return;
        }
        debug("warning using memory store both cookies and localStorage are disabled");
        this._storage = memory;
      };
      Entity.prototype.storage = function() {
        return this._storage;
      };
      Entity.prototype.options = function(options) {
        if (arguments.length === 0)
          return this._options;
        this._options = defaults(options || {}, this.defaults || {});
      };
      Entity.prototype.id = function(id) {
        switch (arguments.length) {
          case 0:
            return this._getId();
          case 1:
            return this._setId(id);
          default:
        }
      };
      Entity.prototype._getId = function() {
        if (!this._options.persist) {
          return this._id === void 0 ? null : this._id;
        }
        var cookieId = this._getIdFromCookie();
        if (cookieId) {
          return cookieId;
        }
        var lsId = this._getIdFromLocalStorage();
        if (lsId) {
          this._setIdInCookies(lsId);
          return lsId;
        }
        return null;
      };
      Entity.prototype._getIdFromCookie = function() {
        return this.storage().get(this._options.cookie.key);
      };
      Entity.prototype._getIdFromLocalStorage = function() {
        if (!this._options.localStorageFallbackDisabled) {
          return store.get(this._options.cookie.key);
        }
        return null;
      };
      Entity.prototype._setId = function(id) {
        if (this._options.persist) {
          this._setIdInCookies(id);
          this._setIdInLocalStorage(id);
        } else {
          this._id = id;
        }
      };
      Entity.prototype._setIdInCookies = function(id) {
        this.storage().set(this._options.cookie.key, id);
      };
      Entity.prototype._setIdInLocalStorage = function(id) {
        if (!this._options.localStorageFallbackDisabled) {
          store.set(this._options.cookie.key, id);
        }
      };
      Entity.prototype.properties = Entity.prototype.traits = function(traits) {
        switch (arguments.length) {
          case 0:
            return this._getTraits();
          case 1:
            return this._setTraits(traits);
          default:
        }
      };
      Entity.prototype._getTraits = function() {
        var ret = this._options.persist ? store.get(this._options.localStorage.key) : this._traits;
        return ret ? isodateTraverse(clone(ret)) : {};
      };
      Entity.prototype._setTraits = function(traits) {
        traits = traits || {};
        if (this._options.persist) {
          store.set(this._options.localStorage.key, traits);
        } else {
          this._traits = traits;
        }
      };
      Entity.prototype.identify = function(id, traits) {
        traits = traits || {};
        var current = this.id();
        if (current === null || current === id)
          traits = extend(this.traits(), traits);
        if (id)
          this.id(id);
        this.debug("identify %o, %o", id, traits);
        this.traits(traits);
        this.save();
      };
      Entity.prototype.save = function() {
        if (!this._options.persist)
          return false;
        this._setId(this.id());
        this._setTraits(this.traits());
        return true;
      };
      Entity.prototype.logout = function() {
        this.id(null);
        this.traits({});
        this.storage().remove(this._options.cookie.key);
        store.remove(this._options.cookie.key);
        store.remove(this._options.localStorage.key);
      };
      Entity.prototype.reset = function() {
        this.logout();
        this.options({});
      };
      Entity.prototype.load = function() {
        this.id(this.id());
        this.traits(this.traits());
      };
    }
  });

  // node_modules/@segment/analytics.js-core/build/group.js
  var require_group2 = __commonJS({
    "node_modules/@segment/analytics.js-core/build/group.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Entity = require_entity();
      var bindAll = require_lib5();
      var debug = require_browser()("analytics:group");
      var inherit = require_inherits_browser();
      Group.defaults = {
        persist: true,
        cookie: {
          key: "ajs_group_id"
        },
        localStorage: {
          key: "ajs_group_properties"
        }
      };
      function Group(options) {
        this.defaults = Group.defaults;
        this.debug = debug;
        Entity.call(this, options);
      }
      inherit(Group, Entity);
      module.exports = bindAll(new Group());
      module.exports.Group = Group;
    }
  });

  // node_modules/is/index.js
  var require_is = __commonJS({
    "node_modules/is/index.js"(exports, module) {
      "use strict";
      var objProto = Object.prototype;
      var owns = objProto.hasOwnProperty;
      var toStr = objProto.toString;
      var symbolValueOf;
      if (typeof Symbol === "function") {
        symbolValueOf = Symbol.prototype.valueOf;
      }
      var bigIntValueOf;
      if (typeof BigInt === "function") {
        bigIntValueOf = BigInt.prototype.valueOf;
      }
      var isActualNaN = function(value) {
        return value !== value;
      };
      var NON_HOST_TYPES = {
        "boolean": 1,
        number: 1,
        string: 1,
        undefined: 1
      };
      var base64Regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{4}|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)$/;
      var hexRegex = /^[A-Fa-f0-9]+$/;
      var is = {};
      is.a = is.type = function(value, type) {
        return typeof value === type;
      };
      is.defined = function(value) {
        return typeof value !== "undefined";
      };
      is.empty = function(value) {
        var type = toStr.call(value);
        var key;
        if (type === "[object Array]" || type === "[object Arguments]" || type === "[object String]") {
          return value.length === 0;
        }
        if (type === "[object Object]") {
          for (key in value) {
            if (owns.call(value, key)) {
              return false;
            }
          }
          return true;
        }
        return !value;
      };
      is.equal = function equal(value, other) {
        if (value === other) {
          return true;
        }
        var type = toStr.call(value);
        var key;
        if (type !== toStr.call(other)) {
          return false;
        }
        if (type === "[object Object]") {
          for (key in value) {
            if (!is.equal(value[key], other[key]) || !(key in other)) {
              return false;
            }
          }
          for (key in other) {
            if (!is.equal(value[key], other[key]) || !(key in value)) {
              return false;
            }
          }
          return true;
        }
        if (type === "[object Array]") {
          key = value.length;
          if (key !== other.length) {
            return false;
          }
          while (key--) {
            if (!is.equal(value[key], other[key])) {
              return false;
            }
          }
          return true;
        }
        if (type === "[object Function]") {
          return value.prototype === other.prototype;
        }
        if (type === "[object Date]") {
          return value.getTime() === other.getTime();
        }
        return false;
      };
      is.hosted = function(value, host) {
        var type = typeof host[value];
        return type === "object" ? !!host[value] : !NON_HOST_TYPES[type];
      };
      is.instance = is["instanceof"] = function(value, constructor) {
        return value instanceof constructor;
      };
      is.nil = is["null"] = function(value) {
        return value === null;
      };
      is.undef = is.undefined = function(value) {
        return typeof value === "undefined";
      };
      is.args = is.arguments = function(value) {
        var isStandardArguments = toStr.call(value) === "[object Arguments]";
        var isOldArguments = !is.array(value) && is.arraylike(value) && is.object(value) && is.fn(value.callee);
        return isStandardArguments || isOldArguments;
      };
      is.array = Array.isArray || function(value) {
        return toStr.call(value) === "[object Array]";
      };
      is.args.empty = function(value) {
        return is.args(value) && value.length === 0;
      };
      is.array.empty = function(value) {
        return is.array(value) && value.length === 0;
      };
      is.arraylike = function(value) {
        return !!value && !is.bool(value) && owns.call(value, "length") && isFinite(value.length) && is.number(value.length) && value.length >= 0;
      };
      is.bool = is["boolean"] = function(value) {
        return toStr.call(value) === "[object Boolean]";
      };
      is["false"] = function(value) {
        return is.bool(value) && Boolean(Number(value)) === false;
      };
      is["true"] = function(value) {
        return is.bool(value) && Boolean(Number(value)) === true;
      };
      is.date = function(value) {
        return toStr.call(value) === "[object Date]";
      };
      is.date.valid = function(value) {
        return is.date(value) && !isNaN(Number(value));
      };
      is.element = function(value) {
        return value !== void 0 && typeof HTMLElement !== "undefined" && value instanceof HTMLElement && value.nodeType === 1;
      };
      is.error = function(value) {
        return toStr.call(value) === "[object Error]";
      };
      is.fn = is["function"] = function(value) {
        var isAlert = typeof window !== "undefined" && value === window.alert;
        if (isAlert) {
          return true;
        }
        var str = toStr.call(value);
        return str === "[object Function]" || str === "[object GeneratorFunction]" || str === "[object AsyncFunction]";
      };
      is.number = function(value) {
        return toStr.call(value) === "[object Number]";
      };
      is.infinite = function(value) {
        return value === Infinity || value === -Infinity;
      };
      is.decimal = function(value) {
        return is.number(value) && !isActualNaN(value) && !is.infinite(value) && value % 1 !== 0;
      };
      is.divisibleBy = function(value, n) {
        var isDividendInfinite = is.infinite(value);
        var isDivisorInfinite = is.infinite(n);
        var isNonZeroNumber = is.number(value) && !isActualNaN(value) && is.number(n) && !isActualNaN(n) && n !== 0;
        return isDividendInfinite || isDivisorInfinite || isNonZeroNumber && value % n === 0;
      };
      is.integer = is["int"] = function(value) {
        return is.number(value) && !isActualNaN(value) && value % 1 === 0;
      };
      is.maximum = function(value, others) {
        if (isActualNaN(value)) {
          throw new TypeError("NaN is not a valid value");
        } else if (!is.arraylike(others)) {
          throw new TypeError("second argument must be array-like");
        }
        var len = others.length;
        while (--len >= 0) {
          if (value < others[len]) {
            return false;
          }
        }
        return true;
      };
      is.minimum = function(value, others) {
        if (isActualNaN(value)) {
          throw new TypeError("NaN is not a valid value");
        } else if (!is.arraylike(others)) {
          throw new TypeError("second argument must be array-like");
        }
        var len = others.length;
        while (--len >= 0) {
          if (value > others[len]) {
            return false;
          }
        }
        return true;
      };
      is.nan = function(value) {
        return !is.number(value) || value !== value;
      };
      is.even = function(value) {
        return is.infinite(value) || is.number(value) && value === value && value % 2 === 0;
      };
      is.odd = function(value) {
        return is.infinite(value) || is.number(value) && value === value && value % 2 !== 0;
      };
      is.ge = function(value, other) {
        if (isActualNaN(value) || isActualNaN(other)) {
          throw new TypeError("NaN is not a valid value");
        }
        return !is.infinite(value) && !is.infinite(other) && value >= other;
      };
      is.gt = function(value, other) {
        if (isActualNaN(value) || isActualNaN(other)) {
          throw new TypeError("NaN is not a valid value");
        }
        return !is.infinite(value) && !is.infinite(other) && value > other;
      };
      is.le = function(value, other) {
        if (isActualNaN(value) || isActualNaN(other)) {
          throw new TypeError("NaN is not a valid value");
        }
        return !is.infinite(value) && !is.infinite(other) && value <= other;
      };
      is.lt = function(value, other) {
        if (isActualNaN(value) || isActualNaN(other)) {
          throw new TypeError("NaN is not a valid value");
        }
        return !is.infinite(value) && !is.infinite(other) && value < other;
      };
      is.within = function(value, start, finish) {
        if (isActualNaN(value) || isActualNaN(start) || isActualNaN(finish)) {
          throw new TypeError("NaN is not a valid value");
        } else if (!is.number(value) || !is.number(start) || !is.number(finish)) {
          throw new TypeError("all arguments must be numbers");
        }
        var isAnyInfinite = is.infinite(value) || is.infinite(start) || is.infinite(finish);
        return isAnyInfinite || value >= start && value <= finish;
      };
      is.object = function(value) {
        return toStr.call(value) === "[object Object]";
      };
      is.primitive = function isPrimitive(value) {
        if (!value) {
          return true;
        }
        if (typeof value === "object" || is.object(value) || is.fn(value) || is.array(value)) {
          return false;
        }
        return true;
      };
      is.hash = function(value) {
        return is.object(value) && value.constructor === Object && !value.nodeType && !value.setInterval;
      };
      is.regexp = function(value) {
        return toStr.call(value) === "[object RegExp]";
      };
      is.string = function(value) {
        return toStr.call(value) === "[object String]";
      };
      is.base64 = function(value) {
        return is.string(value) && (!value.length || base64Regex.test(value));
      };
      is.hex = function(value) {
        return is.string(value) && (!value.length || hexRegex.test(value));
      };
      is.symbol = function(value) {
        return typeof Symbol === "function" && toStr.call(value) === "[object Symbol]" && typeof symbolValueOf.call(value) === "symbol";
      };
      is.bigint = function(value) {
        return typeof BigInt === "function" && toStr.call(value) === "[object BigInt]" && typeof bigIntValueOf.call(value) === "bigint";
      };
      module.exports = is;
    }
  });

  // node_modules/@segment/is-meta/lib/index.js
  var require_lib9 = __commonJS({
    "node_modules/@segment/is-meta/lib/index.js"(exports, module) {
      "use strict";
      function isMeta(e) {
        if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) {
          return true;
        }
        var which = e.which;
        var button = e.button;
        if (!which && button !== void 0) {
          return !button & 1 && !button & 2 && button & 4;
        } else if (which === 2) {
          return true;
        }
        return false;
      }
      module.exports = isMeta;
    }
  });

  // node_modules/next-tick/index.js
  var require_next_tick = __commonJS({
    "node_modules/next-tick/index.js"(exports, module) {
      "use strict";
      var callable;
      var byObserver;
      callable = function(fn) {
        if (typeof fn !== "function")
          throw new TypeError(fn + " is not a function");
        return fn;
      };
      byObserver = function(Observer) {
        var node = document.createTextNode(""), queue, i = 0;
        new Observer(function() {
          var data;
          if (!queue)
            return;
          data = queue;
          queue = null;
          if (typeof data === "function") {
            data();
            return;
          }
          data.forEach(function(fn) {
            fn();
          });
        }).observe(node, { characterData: true });
        return function(fn) {
          callable(fn);
          if (queue) {
            if (typeof queue === "function")
              queue = [queue, fn];
            else
              queue.push(fn);
            return;
          }
          queue = fn;
          node.data = i = ++i % 2;
        };
      };
      module.exports = function() {
        if (typeof process !== "undefined" && process && typeof process.nextTick === "function") {
          return process.nextTick;
        }
        if (typeof document === "object" && document) {
          if (typeof MutationObserver === "function") {
            return byObserver(MutationObserver);
          }
          if (typeof WebKitMutationObserver === "function") {
            return byObserver(WebKitMutationObserver);
          }
        }
        if (typeof setImmediate === "function") {
          return function(cb) {
            setImmediate(callable(cb));
          };
        }
        if (typeof setTimeout === "function") {
          return function(cb) {
            setTimeout(callable(cb), 0);
          };
        }
        return null;
      }();
    }
  });

  // node_modules/@ndhoule/each/index.js
  var require_each2 = __commonJS({
    "node_modules/@ndhoule/each/index.js"(exports, module) {
      "use strict";
      var keys = require_keys();
      var objToString = Object.prototype.toString;
      var isNumber = function isNumber2(val) {
        var type = typeof val;
        return type === "number" || type === "object" && objToString.call(val) === "[object Number]";
      };
      var isArray = typeof Array.isArray === "function" ? Array.isArray : function isArray2(val) {
        return objToString.call(val) === "[object Array]";
      };
      var isArrayLike = function isArrayLike2(val) {
        return val != null && (isArray(val) || val !== "function" && isNumber(val.length));
      };
      var arrayEach = function arrayEach2(iterator, array) {
        for (var i = 0; i < array.length; i += 1) {
          if (iterator(array[i], i, array) === false) {
            break;
          }
        }
      };
      var baseEach = function baseEach2(iterator, object) {
        var ks = keys(object);
        for (var i = 0; i < ks.length; i += 1) {
          if (iterator(object[ks[i]], ks[i], object) === false) {
            break;
          }
        }
      };
      var each = function each2(iterator, collection) {
        return (isArrayLike(collection) ? arrayEach : baseEach).call(this, iterator, collection);
      };
      module.exports = each;
    }
  });

  // node_modules/@ndhoule/includes/index.js
  var require_includes = __commonJS({
    "node_modules/@ndhoule/includes/index.js"(exports, module) {
      "use strict";
      var each = require_each2();
      var strIndexOf = String.prototype.indexOf;
      var sameValueZero = function sameValueZero2(value1, value2) {
        if (value1 === value2) {
          return value1 !== 0 || 1 / value1 === 1 / value2;
        }
        return value1 !== value1 && value2 !== value2;
      };
      var includes = function includes2(searchElement, collection) {
        var found = false;
        if (typeof collection === "string") {
          return strIndexOf.call(collection, searchElement) !== -1;
        }
        each(function(value) {
          if (sameValueZero(value, searchElement)) {
            found = true;
            return false;
          }
        }, collection);
        return found;
      };
      module.exports = includes;
    }
  });

  // node_modules/@segment/analytics.js-core/build/utils/map.js
  var require_map = __commonJS({
    "node_modules/@segment/analytics.js-core/build/utils/map.js"(exports, module) {
      "use strict";
      var each = require_each();
      var map = function map2(iterator, collection) {
        if (typeof iterator !== "function") {
          throw new TypeError("Expected a function but received a " + typeof iterator);
        }
        var result = [];
        each(function(val, i, collection2) {
          result.push(iterator(val, i, collection2));
        }, collection);
        return result;
      };
      module.exports = map;
    }
  });

  // node_modules/uuid/lib/rng-browser.js
  var require_rng_browser = __commonJS({
    "node_modules/uuid/lib/rng-browser.js"(exports, module) {
      var getRandomValues = typeof crypto != "undefined" && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != "undefined" && typeof window.msCrypto.getRandomValues == "function" && msCrypto.getRandomValues.bind(msCrypto);
      if (getRandomValues) {
        rnds8 = new Uint8Array(16);
        module.exports = function whatwgRNG() {
          getRandomValues(rnds8);
          return rnds8;
        };
      } else {
        rnds = new Array(16);
        module.exports = function mathRNG() {
          for (var i = 0, r; i < 16; i++) {
            if ((i & 3) === 0)
              r = Math.random() * 4294967296;
            rnds[i] = r >>> ((i & 3) << 3) & 255;
          }
          return rnds;
        };
      }
      var rnds8;
      var rnds;
    }
  });

  // node_modules/uuid/lib/bytesToUuid.js
  var require_bytesToUuid = __commonJS({
    "node_modules/uuid/lib/bytesToUuid.js"(exports, module) {
      var byteToHex = [];
      for (i = 0; i < 256; ++i) {
        byteToHex[i] = (i + 256).toString(16).substr(1);
      }
      var i;
      function bytesToUuid(buf, offset) {
        var i2 = offset || 0;
        var bth = byteToHex;
        return [
          bth[buf[i2++]],
          bth[buf[i2++]],
          bth[buf[i2++]],
          bth[buf[i2++]],
          "-",
          bth[buf[i2++]],
          bth[buf[i2++]],
          "-",
          bth[buf[i2++]],
          bth[buf[i2++]],
          "-",
          bth[buf[i2++]],
          bth[buf[i2++]],
          "-",
          bth[buf[i2++]],
          bth[buf[i2++]],
          bth[buf[i2++]],
          bth[buf[i2++]],
          bth[buf[i2++]],
          bth[buf[i2++]]
        ].join("");
      }
      module.exports = bytesToUuid;
    }
  });

  // node_modules/uuid/v4.js
  var require_v4 = __commonJS({
    "node_modules/uuid/v4.js"(exports, module) {
      var rng = require_rng_browser();
      var bytesToUuid = require_bytesToUuid();
      function v4(options, buf, offset) {
        var i = buf && offset || 0;
        if (typeof options == "string") {
          buf = options === "binary" ? new Array(16) : null;
          options = null;
        }
        options = options || {};
        var rnds = options.random || (options.rng || rng)();
        rnds[6] = rnds[6] & 15 | 64;
        rnds[8] = rnds[8] & 63 | 128;
        if (buf) {
          for (var ii = 0; ii < 16; ++ii) {
            buf[i + ii] = rnds[ii];
          }
        }
        return buf || bytesToUuid(rnds);
      }
      module.exports = v4;
    }
  });

  // node_modules/spark-md5/spark-md5.js
  var require_spark_md5 = __commonJS({
    "node_modules/spark-md5/spark-md5.js"(exports, module) {
      (function(factory) {
        if (typeof exports === "object") {
          module.exports = factory();
        } else if (typeof define === "function" && define.amd) {
          define(factory);
        } else {
          var glob;
          try {
            glob = window;
          } catch (e) {
            glob = self;
          }
          glob.SparkMD5 = factory();
        }
      })(function(undefined2) {
        "use strict";
        var add32 = function(a, b) {
          return a + b & 4294967295;
        }, hex_chr = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b", "c", "d", "e", "f"];
        function cmn(q, a, b, x, s, t) {
          a = add32(add32(a, q), add32(x, t));
          return add32(a << s | a >>> 32 - s, b);
        }
        function ff(a, b, c, d, x, s, t) {
          return cmn(b & c | ~b & d, a, b, x, s, t);
        }
        function gg(a, b, c, d, x, s, t) {
          return cmn(b & d | c & ~d, a, b, x, s, t);
        }
        function hh(a, b, c, d, x, s, t) {
          return cmn(b ^ c ^ d, a, b, x, s, t);
        }
        function ii(a, b, c, d, x, s, t) {
          return cmn(c ^ (b | ~d), a, b, x, s, t);
        }
        function md5cycle(x, k) {
          var a = x[0], b = x[1], c = x[2], d = x[3];
          a = ff(a, b, c, d, k[0], 7, -680876936);
          d = ff(d, a, b, c, k[1], 12, -389564586);
          c = ff(c, d, a, b, k[2], 17, 606105819);
          b = ff(b, c, d, a, k[3], 22, -1044525330);
          a = ff(a, b, c, d, k[4], 7, -176418897);
          d = ff(d, a, b, c, k[5], 12, 1200080426);
          c = ff(c, d, a, b, k[6], 17, -1473231341);
          b = ff(b, c, d, a, k[7], 22, -45705983);
          a = ff(a, b, c, d, k[8], 7, 1770035416);
          d = ff(d, a, b, c, k[9], 12, -1958414417);
          c = ff(c, d, a, b, k[10], 17, -42063);
          b = ff(b, c, d, a, k[11], 22, -1990404162);
          a = ff(a, b, c, d, k[12], 7, 1804603682);
          d = ff(d, a, b, c, k[13], 12, -40341101);
          c = ff(c, d, a, b, k[14], 17, -1502002290);
          b = ff(b, c, d, a, k[15], 22, 1236535329);
          a = gg(a, b, c, d, k[1], 5, -165796510);
          d = gg(d, a, b, c, k[6], 9, -1069501632);
          c = gg(c, d, a, b, k[11], 14, 643717713);
          b = gg(b, c, d, a, k[0], 20, -373897302);
          a = gg(a, b, c, d, k[5], 5, -701558691);
          d = gg(d, a, b, c, k[10], 9, 38016083);
          c = gg(c, d, a, b, k[15], 14, -660478335);
          b = gg(b, c, d, a, k[4], 20, -405537848);
          a = gg(a, b, c, d, k[9], 5, 568446438);
          d = gg(d, a, b, c, k[14], 9, -1019803690);
          c = gg(c, d, a, b, k[3], 14, -187363961);
          b = gg(b, c, d, a, k[8], 20, 1163531501);
          a = gg(a, b, c, d, k[13], 5, -1444681467);
          d = gg(d, a, b, c, k[2], 9, -51403784);
          c = gg(c, d, a, b, k[7], 14, 1735328473);
          b = gg(b, c, d, a, k[12], 20, -1926607734);
          a = hh(a, b, c, d, k[5], 4, -378558);
          d = hh(d, a, b, c, k[8], 11, -2022574463);
          c = hh(c, d, a, b, k[11], 16, 1839030562);
          b = hh(b, c, d, a, k[14], 23, -35309556);
          a = hh(a, b, c, d, k[1], 4, -1530992060);
          d = hh(d, a, b, c, k[4], 11, 1272893353);
          c = hh(c, d, a, b, k[7], 16, -155497632);
          b = hh(b, c, d, a, k[10], 23, -1094730640);
          a = hh(a, b, c, d, k[13], 4, 681279174);
          d = hh(d, a, b, c, k[0], 11, -358537222);
          c = hh(c, d, a, b, k[3], 16, -722521979);
          b = hh(b, c, d, a, k[6], 23, 76029189);
          a = hh(a, b, c, d, k[9], 4, -640364487);
          d = hh(d, a, b, c, k[12], 11, -421815835);
          c = hh(c, d, a, b, k[15], 16, 530742520);
          b = hh(b, c, d, a, k[2], 23, -995338651);
          a = ii(a, b, c, d, k[0], 6, -198630844);
          d = ii(d, a, b, c, k[7], 10, 1126891415);
          c = ii(c, d, a, b, k[14], 15, -1416354905);
          b = ii(b, c, d, a, k[5], 21, -57434055);
          a = ii(a, b, c, d, k[12], 6, 1700485571);
          d = ii(d, a, b, c, k[3], 10, -1894986606);
          c = ii(c, d, a, b, k[10], 15, -1051523);
          b = ii(b, c, d, a, k[1], 21, -2054922799);
          a = ii(a, b, c, d, k[8], 6, 1873313359);
          d = ii(d, a, b, c, k[15], 10, -30611744);
          c = ii(c, d, a, b, k[6], 15, -1560198380);
          b = ii(b, c, d, a, k[13], 21, 1309151649);
          a = ii(a, b, c, d, k[4], 6, -145523070);
          d = ii(d, a, b, c, k[11], 10, -1120210379);
          c = ii(c, d, a, b, k[2], 15, 718787259);
          b = ii(b, c, d, a, k[9], 21, -343485551);
          x[0] = add32(a, x[0]);
          x[1] = add32(b, x[1]);
          x[2] = add32(c, x[2]);
          x[3] = add32(d, x[3]);
        }
        function md5blk(s) {
          var md5blks = [], i;
          for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
          }
          return md5blks;
        }
        function md5blk_array(a) {
          var md5blks = [], i;
          for (i = 0; i < 64; i += 4) {
            md5blks[i >> 2] = a[i] + (a[i + 1] << 8) + (a[i + 2] << 16) + (a[i + 3] << 24);
          }
          return md5blks;
        }
        function md51(s) {
          var n = s.length, state = [1732584193, -271733879, -1732584194, 271733878], i, length, tail, tmp, lo, hi;
          for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk(s.substring(i - 64, i)));
          }
          s = s.substring(i - 64);
          length = s.length;
          tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= s.charCodeAt(i) << (i % 4 << 3);
          }
          tail[i >> 2] |= 128 << (i % 4 << 3);
          if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
              tail[i] = 0;
            }
          }
          tmp = n * 8;
          tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
          lo = parseInt(tmp[2], 16);
          hi = parseInt(tmp[1], 16) || 0;
          tail[14] = lo;
          tail[15] = hi;
          md5cycle(state, tail);
          return state;
        }
        function md51_array(a) {
          var n = a.length, state = [1732584193, -271733879, -1732584194, 271733878], i, length, tail, tmp, lo, hi;
          for (i = 64; i <= n; i += 64) {
            md5cycle(state, md5blk_array(a.subarray(i - 64, i)));
          }
          a = i - 64 < n ? a.subarray(i - 64) : new Uint8Array(0);
          length = a.length;
          tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= a[i] << (i % 4 << 3);
          }
          tail[i >> 2] |= 128 << (i % 4 << 3);
          if (i > 55) {
            md5cycle(state, tail);
            for (i = 0; i < 16; i += 1) {
              tail[i] = 0;
            }
          }
          tmp = n * 8;
          tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
          lo = parseInt(tmp[2], 16);
          hi = parseInt(tmp[1], 16) || 0;
          tail[14] = lo;
          tail[15] = hi;
          md5cycle(state, tail);
          return state;
        }
        function rhex(n) {
          var s = "", j;
          for (j = 0; j < 4; j += 1) {
            s += hex_chr[n >> j * 8 + 4 & 15] + hex_chr[n >> j * 8 & 15];
          }
          return s;
        }
        function hex(x) {
          var i;
          for (i = 0; i < x.length; i += 1) {
            x[i] = rhex(x[i]);
          }
          return x.join("");
        }
        if (hex(md51("hello")) !== "5d41402abc4b2a76b9719d911017c592") {
          add32 = function(x, y) {
            var lsw = (x & 65535) + (y & 65535), msw = (x >> 16) + (y >> 16) + (lsw >> 16);
            return msw << 16 | lsw & 65535;
          };
        }
        if (typeof ArrayBuffer !== "undefined" && !ArrayBuffer.prototype.slice) {
          (function() {
            function clamp(val, length) {
              val = val | 0 || 0;
              if (val < 0) {
                return Math.max(val + length, 0);
              }
              return Math.min(val, length);
            }
            ArrayBuffer.prototype.slice = function(from, to) {
              var length = this.byteLength, begin = clamp(from, length), end = length, num, target, targetArray, sourceArray;
              if (to !== undefined2) {
                end = clamp(to, length);
              }
              if (begin > end) {
                return new ArrayBuffer(0);
              }
              num = end - begin;
              target = new ArrayBuffer(num);
              targetArray = new Uint8Array(target);
              sourceArray = new Uint8Array(this, begin, num);
              targetArray.set(sourceArray);
              return target;
            };
          })();
        }
        function toUtf8(str) {
          if (/[\u0080-\uFFFF]/.test(str)) {
            str = unescape(encodeURIComponent(str));
          }
          return str;
        }
        function utf8Str2ArrayBuffer(str, returnUInt8Array) {
          var length = str.length, buff = new ArrayBuffer(length), arr = new Uint8Array(buff), i;
          for (i = 0; i < length; i += 1) {
            arr[i] = str.charCodeAt(i);
          }
          return returnUInt8Array ? arr : buff;
        }
        function arrayBuffer2Utf8Str(buff) {
          return String.fromCharCode.apply(null, new Uint8Array(buff));
        }
        function concatenateArrayBuffers(first, second, returnUInt8Array) {
          var result = new Uint8Array(first.byteLength + second.byteLength);
          result.set(new Uint8Array(first));
          result.set(new Uint8Array(second), first.byteLength);
          return returnUInt8Array ? result : result.buffer;
        }
        function hexToBinaryString(hex2) {
          var bytes = [], length = hex2.length, x;
          for (x = 0; x < length - 1; x += 2) {
            bytes.push(parseInt(hex2.substr(x, 2), 16));
          }
          return String.fromCharCode.apply(String, bytes);
        }
        function SparkMD5() {
          this.reset();
        }
        SparkMD5.prototype.append = function(str) {
          this.appendBinary(toUtf8(str));
          return this;
        };
        SparkMD5.prototype.appendBinary = function(contents) {
          this._buff += contents;
          this._length += contents.length;
          var length = this._buff.length, i;
          for (i = 64; i <= length; i += 64) {
            md5cycle(this._hash, md5blk(this._buff.substring(i - 64, i)));
          }
          this._buff = this._buff.substring(i - 64);
          return this;
        };
        SparkMD5.prototype.end = function(raw) {
          var buff = this._buff, length = buff.length, i, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], ret;
          for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff.charCodeAt(i) << (i % 4 << 3);
          }
          this._finish(tail, length);
          ret = hex(this._hash);
          if (raw) {
            ret = hexToBinaryString(ret);
          }
          this.reset();
          return ret;
        };
        SparkMD5.prototype.reset = function() {
          this._buff = "";
          this._length = 0;
          this._hash = [1732584193, -271733879, -1732584194, 271733878];
          return this;
        };
        SparkMD5.prototype.getState = function() {
          return {
            buff: this._buff,
            length: this._length,
            hash: this._hash
          };
        };
        SparkMD5.prototype.setState = function(state) {
          this._buff = state.buff;
          this._length = state.length;
          this._hash = state.hash;
          return this;
        };
        SparkMD5.prototype.destroy = function() {
          delete this._hash;
          delete this._buff;
          delete this._length;
        };
        SparkMD5.prototype._finish = function(tail, length) {
          var i = length, tmp, lo, hi;
          tail[i >> 2] |= 128 << (i % 4 << 3);
          if (i > 55) {
            md5cycle(this._hash, tail);
            for (i = 0; i < 16; i += 1) {
              tail[i] = 0;
            }
          }
          tmp = this._length * 8;
          tmp = tmp.toString(16).match(/(.*?)(.{0,8})$/);
          lo = parseInt(tmp[2], 16);
          hi = parseInt(tmp[1], 16) || 0;
          tail[14] = lo;
          tail[15] = hi;
          md5cycle(this._hash, tail);
        };
        SparkMD5.hash = function(str, raw) {
          return SparkMD5.hashBinary(toUtf8(str), raw);
        };
        SparkMD5.hashBinary = function(content, raw) {
          var hash = md51(content), ret = hex(hash);
          return raw ? hexToBinaryString(ret) : ret;
        };
        SparkMD5.ArrayBuffer = function() {
          this.reset();
        };
        SparkMD5.ArrayBuffer.prototype.append = function(arr) {
          var buff = concatenateArrayBuffers(this._buff.buffer, arr, true), length = buff.length, i;
          this._length += arr.byteLength;
          for (i = 64; i <= length; i += 64) {
            md5cycle(this._hash, md5blk_array(buff.subarray(i - 64, i)));
          }
          this._buff = i - 64 < length ? new Uint8Array(buff.buffer.slice(i - 64)) : new Uint8Array(0);
          return this;
        };
        SparkMD5.ArrayBuffer.prototype.end = function(raw) {
          var buff = this._buff, length = buff.length, tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], i, ret;
          for (i = 0; i < length; i += 1) {
            tail[i >> 2] |= buff[i] << (i % 4 << 3);
          }
          this._finish(tail, length);
          ret = hex(this._hash);
          if (raw) {
            ret = hexToBinaryString(ret);
          }
          this.reset();
          return ret;
        };
        SparkMD5.ArrayBuffer.prototype.reset = function() {
          this._buff = new Uint8Array(0);
          this._length = 0;
          this._hash = [1732584193, -271733879, -1732584194, 271733878];
          return this;
        };
        SparkMD5.ArrayBuffer.prototype.getState = function() {
          var state = SparkMD5.prototype.getState.call(this);
          state.buff = arrayBuffer2Utf8Str(state.buff);
          return state;
        };
        SparkMD5.ArrayBuffer.prototype.setState = function(state) {
          state.buff = utf8Str2ArrayBuffer(state.buff, true);
          return SparkMD5.prototype.setState.call(this, state);
        };
        SparkMD5.ArrayBuffer.prototype.destroy = SparkMD5.prototype.destroy;
        SparkMD5.ArrayBuffer.prototype._finish = SparkMD5.prototype._finish;
        SparkMD5.ArrayBuffer.hash = function(arr, raw) {
          var hash = md51_array(new Uint8Array(arr)), ret = hex(hash);
          return raw ? hexToBinaryString(ret) : ret;
        };
        return SparkMD5;
      });
    }
  });

  // node_modules/@segment/analytics.js-core/build/normalize.js
  var require_normalize = __commonJS({
    "node_modules/@segment/analytics.js-core/build/normalize.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var debug = require_browser()("analytics.js:normalize");
      var defaults = require_defaults();
      var each = require_each();
      var includes = require_includes();
      var map = require_map();
      var type = require_component_type();
      var uuid = require_v4();
      var md5 = require_spark_md5().hash;
      var has = Object.prototype.hasOwnProperty;
      module.exports = normalize;
      var toplevel = ["integrations", "anonymousId", "timestamp", "context"];
      function normalize(msg, list) {
        var lower = map(function(s) {
          return s.toLowerCase();
        }, list);
        var opts = msg.options || {};
        var integrations2 = opts.integrations || {};
        var providers = opts.providers || {};
        var context = opts.context || {};
        var ret = {};
        debug("<-", msg);
        each(function(value, key) {
          if (!integration(key))
            return;
          if (!has.call(integrations2, key))
            integrations2[key] = value;
          delete opts[key];
        }, opts);
        delete opts.providers;
        each(function(value, key) {
          if (!integration(key))
            return;
          if (type(integrations2[key]) === "object")
            return;
          if (has.call(integrations2, key) && typeof providers[key] === "boolean")
            return;
          integrations2[key] = value;
        }, providers);
        each(function(_value, key) {
          if (includes(key, toplevel)) {
            ret[key] = opts[key];
          } else {
            context[key] = opts[key];
          }
        }, opts);
        msg.messageId = "ajs-" + md5(window.JSON.stringify(msg) + uuid());
        delete msg.options;
        ret.integrations = integrations2;
        ret.context = context;
        ret = defaults(ret, msg);
        debug("->", ret);
        return ret;
        function integration(name2) {
          return !!(includes(name2, list) || name2.toLowerCase() === "all" || includes(name2.toLowerCase(), lower));
        }
      }
    }
  });

  // node_modules/component-event/index.js
  var require_component_event = __commonJS({
    "node_modules/component-event/index.js"(exports) {
      var bind = window.addEventListener ? "addEventListener" : "attachEvent";
      var unbind = window.removeEventListener ? "removeEventListener" : "detachEvent";
      var prefix = bind !== "addEventListener" ? "on" : "";
      exports.bind = function(el, type, fn, capture) {
        el[bind](prefix + type, fn, capture || false);
        return fn;
      };
      exports.unbind = function(el, type, fn, capture) {
        el[unbind](prefix + type, fn, capture || false);
        return fn;
      };
    }
  });

  // node_modules/@segment/canonical/lib/index.js
  var require_lib10 = __commonJS({
    "node_modules/@segment/canonical/lib/index.js"(exports, module) {
      "use strict";
      function canonical() {
        var tags = document.getElementsByTagName("link");
        for (var i = 0, tag; tag = tags[i]; i++) {
          if (tag.getAttribute("rel") === "canonical") {
            return tag.getAttribute("href");
          }
        }
      }
      module.exports = canonical;
    }
  });

  // node_modules/@segment/analytics.js-core/build/pageDefaults.js
  var require_pageDefaults = __commonJS({
    "node_modules/@segment/analytics.js-core/build/pageDefaults.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var canonical = require_lib10();
      var includes = require_includes();
      var url = require_component_url();
      function pageDefaults() {
        return {
          path: canonicalPath(),
          referrer: document.referrer,
          search: location.search,
          title: document.title,
          url: canonicalUrl(location.search)
        };
      }
      function canonicalPath() {
        var canon = canonical();
        if (!canon)
          return window.location.pathname;
        var parsed = url.parse(canon);
        return parsed.pathname;
      }
      function canonicalUrl(search) {
        var canon = canonical();
        if (canon)
          return includes("?", canon) ? canon : canon + search;
        var url2 = window.location.href;
        var i = url2.indexOf("#");
        return i === -1 ? url2 : url2.slice(0, i);
      }
      module.exports = pageDefaults;
    }
  });

  // node_modules/@ndhoule/pick/index.js
  var require_pick = __commonJS({
    "node_modules/@ndhoule/pick/index.js"(exports, module) {
      "use strict";
      var objToString = Object.prototype.toString;
      var existy = function(val) {
        return val != null;
      };
      var isArray = function(val) {
        return objToString.call(val) === "[object Array]";
      };
      var isString = function(val) {
        return typeof val === "string" || objToString.call(val) === "[object String]";
      };
      var isObject = function(val) {
        return val != null && typeof val === "object";
      };
      var pick = function pick2(props, object) {
        if (!existy(object) || !isObject(object)) {
          return {};
        }
        if (isString(props)) {
          props = [props];
        }
        if (!isArray(props)) {
          props = [];
        }
        var result = {};
        for (var i = 0; i < props.length; i += 1) {
          if (isString(props[i]) && props[i] in object) {
            result[props[i]] = object[props[i]];
          }
        }
        return result;
      };
      module.exports = pick;
    }
  });

  // node_modules/@segment/prevent-default/lib/index.js
  var require_lib11 = __commonJS({
    "node_modules/@segment/prevent-default/lib/index.js"(exports, module) {
      "use strict";
      function preventDefault(e) {
        e = e || window.event;
        return e.preventDefault ? e.preventDefault() : e.returnValue = false;
      }
      module.exports = preventDefault;
    }
  });

  // node_modules/uuid/v1.js
  var require_v1 = __commonJS({
    "node_modules/uuid/v1.js"(exports, module) {
      var rng = require_rng_browser();
      var bytesToUuid = require_bytesToUuid();
      var _nodeId;
      var _clockseq;
      var _lastMSecs = 0;
      var _lastNSecs = 0;
      function v1(options, buf, offset) {
        var i = buf && offset || 0;
        var b = buf || [];
        options = options || {};
        var node = options.node || _nodeId;
        var clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
        if (node == null || clockseq == null) {
          var seedBytes = rng();
          if (node == null) {
            node = _nodeId = [
              seedBytes[0] | 1,
              seedBytes[1],
              seedBytes[2],
              seedBytes[3],
              seedBytes[4],
              seedBytes[5]
            ];
          }
          if (clockseq == null) {
            clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
          }
        }
        var msecs = options.msecs !== void 0 ? options.msecs : new Date().getTime();
        var nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
        var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
        if (dt < 0 && options.clockseq === void 0) {
          clockseq = clockseq + 1 & 16383;
        }
        if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) {
          nsecs = 0;
        }
        if (nsecs >= 1e4) {
          throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        }
        _lastMSecs = msecs;
        _lastNSecs = nsecs;
        _clockseq = clockseq;
        msecs += 122192928e5;
        var tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
        b[i++] = tl >>> 24 & 255;
        b[i++] = tl >>> 16 & 255;
        b[i++] = tl >>> 8 & 255;
        b[i++] = tl & 255;
        var tmh = msecs / 4294967296 * 1e4 & 268435455;
        b[i++] = tmh >>> 8 & 255;
        b[i++] = tmh & 255;
        b[i++] = tmh >>> 24 & 15 | 16;
        b[i++] = tmh >>> 16 & 255;
        b[i++] = clockseq >>> 8 | 128;
        b[i++] = clockseq & 255;
        for (var n = 0; n < 6; ++n) {
          b[i + n] = node[n];
        }
        return buf ? buf : bytesToUuid(b);
      }
      module.exports = v1;
    }
  });

  // node_modules/uuid/index.js
  var require_uuid = __commonJS({
    "node_modules/uuid/index.js"(exports, module) {
      var v1 = require_v1();
      var v4 = require_v4();
      var uuid = v4;
      uuid.v1 = v1;
      uuid.v4 = v4;
      module.exports = uuid;
    }
  });

  // node_modules/@segment/analytics.js-core/build/user.js
  var require_user = __commonJS({
    "node_modules/@segment/analytics.js-core/build/user.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Entity = require_entity();
      var bindAll = require_lib5();
      var cookie = require_cookie();
      var debug = require_browser()("analytics:user");
      var inherit = require_inherits_browser();
      var rawCookie = require_lib6();
      var uuid = require_uuid();
      var localStorage = require_store2();
      User.defaults = {
        persist: true,
        cookie: {
          key: "ajs_user_id",
          oldKey: "ajs_user"
        },
        localStorage: {
          key: "ajs_user_traits"
        }
      };
      function User(options) {
        this.defaults = User.defaults;
        this.debug = debug;
        Entity.call(this, options);
      }
      inherit(User, Entity);
      User.prototype.id = function(id) {
        var prev = this._getId();
        var ret = Entity.prototype.id.apply(this, arguments);
        if (prev == null)
          return ret;
        if (prev != id && id)
          this.anonymousId(null);
        return ret;
      };
      User.prototype.anonymousId = function(anonymousId) {
        var store = this.storage();
        if (arguments.length) {
          store.set("ajs_anonymous_id", anonymousId);
          this._setAnonymousIdInLocalStorage(anonymousId);
          return this;
        }
        anonymousId = store.get("ajs_anonymous_id");
        if (anonymousId) {
          this._setAnonymousIdInLocalStorage(anonymousId);
          store.set("ajs_anonymous_id", anonymousId);
          return anonymousId;
        }
        if (!this._options.localStorageFallbackDisabled) {
          anonymousId = localStorage.get("ajs_anonymous_id");
          if (anonymousId) {
            store.set("ajs_anonymous_id", anonymousId);
            return anonymousId;
          }
        }
        anonymousId = rawCookie("_sio");
        if (anonymousId) {
          anonymousId = anonymousId.split("----")[0];
          store.set("ajs_anonymous_id", anonymousId);
          this._setAnonymousIdInLocalStorage(anonymousId);
          store.remove("_sio");
          return anonymousId;
        }
        anonymousId = uuid.v4();
        store.set("ajs_anonymous_id", anonymousId);
        this._setAnonymousIdInLocalStorage(anonymousId);
        return store.get("ajs_anonymous_id");
      };
      User.prototype._setAnonymousIdInLocalStorage = function(id) {
        if (!this._options.localStorageFallbackDisabled) {
          localStorage.set("ajs_anonymous_id", id);
        }
      };
      User.prototype.logout = function() {
        Entity.prototype.logout.call(this);
        this.anonymousId(null);
      };
      User.prototype.load = function() {
        if (this._loadOldCookie())
          return;
        Entity.prototype.load.call(this);
      };
      User.prototype._loadOldCookie = function() {
        var user = cookie.get(this._options.cookie.oldKey);
        if (!user)
          return false;
        this.id(user.id);
        this.traits(user.traits);
        cookie.remove(this._options.cookie.oldKey);
        return true;
      };
      module.exports = bindAll(new User());
      module.exports.User = User;
    }
  });

  // node_modules/@segment/analytics.js-core/build/analytics.js
  var require_analytics = __commonJS({
    "node_modules/@segment/analytics.js-core/build/analytics.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var _analytics = window.analytics;
      var Alias = require_lib4().Alias;
      var Emitter = require_component_emitter();
      var Facade = require_lib4();
      var Group = require_lib4().Group;
      var Identify = require_lib4().Identify;
      var SourceMiddlewareChain = require_middleware().SourceMiddlewareChain;
      var IntegrationMiddlewareChain = require_middleware().IntegrationMiddlewareChain;
      var DestinationMiddlewareChain = require_middleware().DestinationMiddlewareChain;
      var Page = require_lib4().Page;
      var Track = require_lib4().Track;
      var bindAll = require_lib5();
      var clone = require_clone2();
      var extend = require_extend();
      var cookie = require_cookie();
      var metrics = require_metrics();
      var debug = require_browser();
      var defaults = require_defaults();
      var each = require_each();
      var group = require_group2();
      var is = require_is();
      var isMeta = require_lib9();
      var keys = require_keys();
      var memory = require_memory();
      var nextTick = require_next_tick();
      var normalize = require_normalize();
      var on = require_component_event().bind;
      var pageDefaults = require_pageDefaults();
      var pick = require_pick();
      var prevent = require_lib11();
      var url = require_component_url();
      var store = require_store2();
      var user = require_user();
      var type = require_component_type();
      function Analytics() {
        this._options({});
        this.Integrations = {};
        this._sourceMiddlewares = new SourceMiddlewareChain();
        this._integrationMiddlewares = new IntegrationMiddlewareChain();
        this._destinationMiddlewares = {};
        this._integrations = {};
        this._readied = false;
        this._timeout = 300;
        this._user = user;
        this.log = debug("analytics.js");
        bindAll(this);
        var self2 = this;
        this.on("initialize", function(settings, options) {
          if (options.initialPageview)
            self2.page();
          self2._parseQuery(window.location.search);
        });
      }
      Emitter(Analytics.prototype);
      Analytics.prototype.use = function(plugin) {
        plugin(this);
        return this;
      };
      Analytics.prototype.addIntegration = function(Integration) {
        var name2 = Integration.prototype.name;
        if (!name2)
          throw new TypeError("attempted to add an invalid integration");
        this.Integrations[name2] = Integration;
        return this;
      };
      Analytics.prototype.addSourceMiddleware = function(middleware) {
        this._sourceMiddlewares.add(middleware);
        return this;
      };
      Analytics.prototype.addIntegrationMiddleware = function(middleware) {
        this._integrationMiddlewares.add(middleware);
        return this;
      };
      Analytics.prototype.addDestinationMiddleware = function(integrationName, middlewares) {
        var self2 = this;
        middlewares.forEach(function(middleware) {
          if (!self2._destinationMiddlewares[integrationName]) {
            self2._destinationMiddlewares[integrationName] = new DestinationMiddlewareChain();
          }
          self2._destinationMiddlewares[integrationName].add(middleware);
        });
        return self2;
      };
      Analytics.prototype.init = Analytics.prototype.initialize = function(settings, options) {
        settings = settings || {};
        options = options || {};
        this._options(options);
        this._readied = false;
        var self2 = this;
        each(function(_opts, name2) {
          var Integration = self2.Integrations[name2];
          if (!Integration)
            delete settings[name2];
        }, settings);
        each(function(opts, name2) {
          if (options.integrations) {
            if (options.integrations[name2] === false || options.integrations.All === false && !options.integrations[name2]) {
              return;
            }
          }
          var Integration = self2.Integrations[name2];
          var clonedOpts = {};
          extend(true, clonedOpts, opts);
          var integration = new Integration(clonedOpts);
          self2.log("initialize %o - %o", name2, opts);
          self2.add(integration);
        }, settings);
        var integrations2 = this._integrations;
        user.load();
        group.load();
        var readyCallCount = 0;
        var integrationCount = keys(integrations2).length;
        var ready = function() {
          readyCallCount++;
          if (readyCallCount >= integrationCount) {
            self2._readied = true;
            self2.emit("ready");
          }
        };
        if (integrationCount <= 0) {
          ready();
        }
        this.failedInitializations = [];
        var initialPageSkipped = false;
        each(function(integration) {
          if (options.initialPageview && integration.options.initialPageview === false) {
            var page = integration.page;
            integration.page = function() {
              if (initialPageSkipped) {
                return page.apply(this, arguments);
              }
              initialPageSkipped = true;
              return;
            };
          }
          integration.analytics = self2;
          integration.once("ready", ready);
          try {
            metrics.increment("analytics_js.integration.invoke", {
              method: "initialize",
              integration_name: integration.name
            });
            integration.initialize();
          } catch (e) {
            var integrationName = integration.name;
            metrics.increment("analytics_js.integration.invoke.error", {
              method: "initialize",
              integration_name: integration.name
            });
            self2.failedInitializations.push(integrationName);
            self2.log("Error initializing %s integration: %o", integrationName, e);
            integration.ready();
          }
        }, integrations2);
        this.initialized = true;
        this.emit("initialize", settings, options);
        return this;
      };
      Analytics.prototype.setAnonymousId = function(id) {
        this.user().anonymousId(id);
        return this;
      };
      Analytics.prototype.add = function(integration) {
        this._integrations[integration.name] = integration;
        return this;
      };
      Analytics.prototype.identify = function(id, traits, options, fn) {
        if (is.fn(options))
          fn = options, options = null;
        if (is.fn(traits))
          fn = traits, options = null, traits = null;
        if (is.object(id))
          options = traits, traits = id, id = user.id();
        user.identify(id, traits);
        var msg = this.normalize({
          options,
          traits: user.traits(),
          userId: user.id()
        });
        if (this.options.integrations) {
          defaults(msg.integrations, this.options.integrations);
        }
        this._invoke("identify", new Identify(msg));
        this.emit("identify", id, traits, options);
        this._callback(fn);
        return this;
      };
      Analytics.prototype.user = function() {
        return user;
      };
      Analytics.prototype.group = function(id, traits, options, fn) {
        if (!arguments.length)
          return group;
        if (is.fn(options))
          fn = options, options = null;
        if (is.fn(traits))
          fn = traits, options = null, traits = null;
        if (is.object(id))
          options = traits, traits = id, id = group.id();
        group.identify(id, traits);
        var msg = this.normalize({
          options,
          traits: group.traits(),
          groupId: group.id()
        });
        if (this.options.integrations) {
          defaults(msg.integrations, this.options.integrations);
        }
        this._invoke("group", new Group(msg));
        this.emit("group", id, traits, options);
        this._callback(fn);
        return this;
      };
      Analytics.prototype.track = function(event, properties, options, fn) {
        if (is.fn(options))
          fn = options, options = null;
        if (is.fn(properties))
          fn = properties, options = null, properties = null;
        var plan = this.options.plan || {};
        var events = plan.track || {};
        var planIntegrationOptions = {};
        var msg = this.normalize({
          properties,
          options,
          event
        });
        plan = events[event];
        if (plan) {
          this.log("plan %o - %o", event, plan);
          if (plan.enabled === false) {
            planIntegrationOptions = { All: false, "Segment.io": true };
          } else {
            planIntegrationOptions = plan.integrations || {};
          }
        } else {
          var defaultPlan = events.__default || { enabled: true };
          if (!defaultPlan.enabled) {
            planIntegrationOptions = { All: false, "Segment.io": true };
          }
        }
        defaults(msg.integrations, this._mergeInitializeAndPlanIntegrations(planIntegrationOptions));
        this._invoke("track", new Track(msg));
        this.emit("track", event, properties, options);
        this._callback(fn);
        return this;
      };
      Analytics.prototype.trackClick = Analytics.prototype.trackLink = function(links, event, properties) {
        if (!links)
          return this;
        if (type(links) === "element")
          links = [links];
        var self2 = this;
        each(function(el) {
          if (type(el) !== "element") {
            throw new TypeError("Must pass HTMLElement to `analytics.trackLink`.");
          }
          on(el, "click", function(e) {
            var ev = is.fn(event) ? event(el) : event;
            var props = is.fn(properties) ? properties(el) : properties;
            var href = el.getAttribute("href") || el.getAttributeNS("http://www.w3.org/1999/xlink", "href") || el.getAttribute("xlink:href");
            self2.track(ev, props);
            if (href && el.target !== "_blank" && !isMeta(e)) {
              prevent(e);
              self2._callback(function() {
                window.location.href = href;
              });
            }
          });
        }, links);
        return this;
      };
      Analytics.prototype.trackSubmit = Analytics.prototype.trackForm = function(forms, event, properties) {
        if (!forms)
          return this;
        if (type(forms) === "element")
          forms = [forms];
        var self2 = this;
        each(function(el) {
          if (type(el) !== "element")
            throw new TypeError("Must pass HTMLElement to `analytics.trackForm`.");
          function handler(e) {
            prevent(e);
            var ev = is.fn(event) ? event(el) : event;
            var props = is.fn(properties) ? properties(el) : properties;
            self2.track(ev, props);
            self2._callback(function() {
              el.submit();
            });
          }
          var $ = window.jQuery || window.Zepto;
          if ($) {
            $(el).submit(handler);
          } else {
            on(el, "submit", handler);
          }
        }, forms);
        return this;
      };
      Analytics.prototype.page = function(category, name2, properties, options, fn) {
        if (is.fn(options))
          fn = options, options = null;
        if (is.fn(properties))
          fn = properties, options = properties = null;
        if (is.fn(name2))
          fn = name2, options = properties = name2 = null;
        if (type(category) === "object")
          options = name2, properties = category, name2 = category = null;
        if (type(name2) === "object")
          options = properties, properties = name2, name2 = null;
        if (type(category) === "string" && type(name2) !== "string")
          name2 = category, category = null;
        properties = clone(properties) || {};
        if (name2)
          properties.name = name2;
        if (category)
          properties.category = category;
        var defs = pageDefaults();
        defaults(properties, defs);
        var overrides = pick(keys(defs), properties);
        if (!is.empty(overrides)) {
          options = options || {};
          options.context = options.context || {};
          options.context.page = overrides;
        }
        var msg = this.normalize({
          properties,
          category,
          options,
          name: name2
        });
        if (this.options.integrations) {
          defaults(msg.integrations, this.options.integrations);
        }
        this._invoke("page", new Page(msg));
        this.emit("page", category, name2, properties, options);
        this._callback(fn);
        return this;
      };
      Analytics.prototype.pageview = function(url2) {
        var properties = {};
        if (url2)
          properties.path = url2;
        this.page(properties);
        return this;
      };
      Analytics.prototype.alias = function(to, from, options, fn) {
        if (is.fn(options))
          fn = options, options = null;
        if (is.fn(from))
          fn = from, options = null, from = null;
        if (is.object(from))
          options = from, from = null;
        var msg = this.normalize({
          options,
          previousId: from,
          userId: to
        });
        if (this.options.integrations) {
          defaults(msg.integrations, this.options.integrations);
        }
        this._invoke("alias", new Alias(msg));
        this.emit("alias", to, from, options);
        this._callback(fn);
        return this;
      };
      Analytics.prototype.ready = function(fn) {
        if (is.fn(fn)) {
          if (this._readied) {
            nextTick(fn);
          } else {
            this.once("ready", fn);
          }
        }
        return this;
      };
      Analytics.prototype.timeout = function(timeout) {
        this._timeout = timeout;
      };
      Analytics.prototype.debug = function(str) {
        if (!arguments.length || str) {
          debug.enable("analytics:" + (str || "*"));
        } else {
          debug.disable();
        }
      };
      Analytics.prototype._options = function(options) {
        options = options || {};
        this.options = options;
        cookie.options(options.cookie);
        metrics.options(options.metrics);
        store.options(options.localStorage);
        user.options(options.user);
        group.options(options.group);
        return this;
      };
      Analytics.prototype._callback = function(fn) {
        if (is.fn(fn)) {
          this._timeout ? setTimeout(fn, this._timeout) : nextTick(fn);
        }
        return this;
      };
      Analytics.prototype._invoke = function(method, facade) {
        var self2 = this;
        try {
          this._sourceMiddlewares.applyMiddlewares(extend(true, new Facade({}), facade), this._integrations, function(result) {
            if (result === null) {
              self2.log('Payload with method "%s" was null and dropped by source a middleware.', method);
              return;
            }
            if (!(result instanceof Facade)) {
              result = new Facade(result);
            }
            self2.emit("invoke", result);
            metrics.increment("analytics_js.invoke", {
              method
            });
            applyIntegrationMiddlewares(result);
          });
        } catch (e) {
          metrics.increment("analytics_js.invoke.error", {
            method
          });
          self2.log("Error invoking .%s method of %s integration: %o", method, name, e);
        }
        return this;
        function applyIntegrationMiddlewares(facade2) {
          var failedInitializations = self2.failedInitializations || [];
          each(function(integration, name2) {
            var facadeCopy = extend(true, new Facade({}), facade2);
            if (!facadeCopy.enabled(name2))
              return;
            if (failedInitializations.indexOf(name2) >= 0) {
              self2.log("Skipping invocation of .%s method of %s integration. Integration failed to initialize properly.", method, name2);
            } else {
              try {
                self2._integrationMiddlewares.applyMiddlewares(facadeCopy, integration.name, function(result) {
                  if (result === null) {
                    self2.log('Payload to integration "%s" was null and dropped by a middleware.', name2);
                    return;
                  }
                  if (!(result instanceof Facade)) {
                    result = new Facade(result);
                  }
                  if (self2._destinationMiddlewares[integration.name]) {
                    self2._destinationMiddlewares[integration.name].applyMiddlewares(facadeCopy, integration.name, function(result2) {
                      if (result2 === null) {
                        self2.log('Payload to destination "%s" was null and dropped by a middleware.', name2);
                        return;
                      }
                      if (!(result2 instanceof Facade)) {
                        result2 = new Facade(result2);
                      }
                      metrics.increment("analytics_js.integration.invoke", {
                        method,
                        integration_name: integration.name
                      });
                      integration.invoke.call(integration, method, result2);
                    });
                  } else {
                    metrics.increment("analytics_js.integration.invoke", {
                      method,
                      integration_name: integration.name
                    });
                    integration.invoke.call(integration, method, result);
                  }
                });
              } catch (e) {
                metrics.increment("analytics_js.integration.invoke.error", {
                  method,
                  integration_name: integration.name
                });
                self2.log("Error invoking .%s method of %s integration: %o", method, name2, e);
              }
            }
          }, self2._integrations);
        }
      };
      Analytics.prototype.push = function(args) {
        var method = args.shift();
        if (!this[method])
          return;
        this[method].apply(this, args);
      };
      Analytics.prototype.reset = function() {
        this.user().logout();
        this.group().logout();
      };
      Analytics.prototype._parseQuery = function(query) {
        var parsed = url.parse(query);
        var q = parsed.query.split("&").reduce(function(acc, str) {
          var _a = str.split("="), k = _a[0], v = _a[1];
          acc[k] = decodeURI(v).replace("+", " ");
          return acc;
        }, {});
        var traits = pickPrefix("ajs_trait_", q);
        var props = pickPrefix("ajs_prop_", q);
        if (q.ajs_uid)
          this.identify(q.ajs_uid, traits);
        if (q.ajs_event)
          this.track(q.ajs_event, props);
        if (q.ajs_aid)
          user.anonymousId(q.ajs_aid);
        return this;
        function pickPrefix(prefix, object) {
          var length = prefix.length;
          var sub;
          return Object.keys(object).reduce(function(acc, key) {
            if (key.substr(0, length) === prefix) {
              sub = key.substr(length);
              acc[sub] = object[key];
            }
            return acc;
          }, {});
        }
      };
      Analytics.prototype.normalize = function(msg) {
        msg = normalize(msg, keys(this._integrations));
        if (msg.anonymousId)
          user.anonymousId(msg.anonymousId);
        msg.anonymousId = user.anonymousId();
        msg.context.page = defaults(msg.context.page || {}, pageDefaults());
        return msg;
      };
      Analytics.prototype._mergeInitializeAndPlanIntegrations = function(planIntegrations) {
        if (!this.options.integrations) {
          return planIntegrations;
        }
        var integrations2 = extend({}, this.options.integrations);
        var integrationName;
        if (planIntegrations.All === false) {
          integrations2 = { All: false };
        }
        for (integrationName in planIntegrations) {
          if (planIntegrations.hasOwnProperty(integrationName)) {
            if (this.options.integrations[integrationName] !== false) {
              integrations2[integrationName] = planIntegrations[integrationName];
            }
          }
        }
        return integrations2;
      };
      Analytics.prototype.noConflict = function() {
        window.analytics = _analytics;
        return this;
      };
      module.exports = Analytics;
      module.exports.cookie = cookie;
      module.exports.memory = memory;
      module.exports.store = store;
      module.exports.metrics = metrics;
    }
  });

  // node_modules/@segment/analytics.js-core/package.json
  var require_package = __commonJS({
    "node_modules/@segment/analytics.js-core/package.json"(exports, module) {
      module.exports = {
        name: "@segment/analytics.js-core",
        author: "Segment <friends@segment.com>",
        version: "4.1.11",
        description: "The hassle-free way to integrate analytics into any web application.",
        types: "lib/index.d.ts",
        keywords: [
          "analytics",
          "analytics.js",
          "segment",
          "segment.io"
        ],
        main: "build/index.js",
        scripts: {
          test: "make test",
          lint: 'eslint "./{lib,test}/**/*.js"',
          format: 'prettier-eslint --write --list-different "./{lib,test,test-e2e}/**/*.{ts,js,json,md}"',
          precommit: "lint-staged",
          np: "np --no-publish",
          cz: "git-cz",
          "check-js": `if [[ $(git status  -s | egrep '^(A|R)' | egrep 'jsx?"?$' | wc -l | awk '{print $1}')  > 0 ]] ; then exit 125; else echo \u{1F389} ; fi; echo`
        },
        repository: {
          type: "git",
          url: "https://github.com/segmentio/analytics.js-core"
        },
        license: "SEE LICENSE IN LICENSE",
        bugs: {
          url: "https://github.com/segmentio/analytics.js-core/issues"
        },
        homepage: "https://github.com/segmentio/analytics.js-core#readme",
        dependencies: {
          "@ndhoule/defaults": "^2.0.1",
          "@ndhoule/extend": "^2.0.0",
          "@ndhoule/includes": "^2.0.1",
          "@ndhoule/keys": "^2.0.0",
          "@ndhoule/pick": "^2.0.0",
          "@segment/canonical": "^1.0.0",
          "@segment/cookie": "^1.1.5",
          "@segment/is-meta": "^1.0.0",
          "@segment/isodate": "^1.0.2",
          "@segment/isodate-traverse": "^1.0.1",
          "@segment/prevent-default": "^1.0.0",
          "@segment/send-json": "^3.0.0",
          "@segment/store": "^1.3.20",
          "@segment/top-domain": "^3.0.1",
          "bind-all": "^1.0.0",
          "component-emitter": "^1.2.1",
          "component-event": "^0.1.4",
          "component-type": "^1.2.1",
          "component-url": "^0.2.1",
          debug: "^2.6.9",
          extend: "3.0.2",
          inherits: "^2.0.1",
          install: "^0.7.3",
          is: "^3.1.0",
          "new-date": "^1.0.0",
          "next-tick": "^0.2.2",
          "package-json-versionify": "^1.0.4",
          "segmentio-facade": "^3.2.7",
          "spark-md5": "^2.0.2",
          uuid: "^3.4.0"
        },
        devDependencies: {
          "@codeceptjs/mock-request": "^0.3.0",
          "@segment/analytics.js-integration": "^3.2.2",
          "@segment/eslint-config": "^4.0.0",
          "@types/express": "^4.17.6",
          "@types/lodash": "^4.14.161",
          "@types/mocha": "^7.0.2",
          "@types/node": "^14.0.6",
          "@types/node-fetch": "^2.5.7",
          assert: "1.5.0",
          browserify: "16.5.2",
          "browserify-istanbul": "^3.0.1",
          buffer: "^4.9.2",
          codeceptjs: "^2.6.5",
          codecov: "^3.7.2",
          "compat-trigger-event": "^1.0.0",
          "component-each": "^0.2.6",
          "cz-conventional-changelog": "^2.1.0",
          eslint: "^7.8.1",
          "eslint-config-prettier": "^2.9.0",
          "eslint-plugin-mocha": "^5.0.0",
          "eslint-plugin-react": "^7.9.1",
          "eslint-plugin-require-path-exists": "^1.1.8",
          express: "^4.17.1",
          husky: "^0.14.3",
          jquery: "^3.5.0",
          karma: "5.1.1",
          "karma-browserify": "^7.0.0",
          "karma-chrome-launcher": "^3.1.0",
          "karma-coverage": "^2.0.3",
          "karma-junit-reporter": "^2.0.1",
          "karma-mocha": "2.0.1",
          "karma-sauce-launcher": "^1.2.0",
          "karma-spec-reporter": "0.0.32",
          "karma-summary-reporter": "^1.8.0",
          "karma-typescript": "^5.1.0",
          "lint-staged": "^10.2.13",
          lodash: "^4.17.20",
          mocha: "^4.1.0",
          np: "^6.5.0",
          "prettier-eslint-cli": "5.0.0",
          proclaim: "^3.5.1",
          puppeteer: "^5.3.0",
          sinon: "^1.7.3",
          snyk: "^1.393.0",
          "ts-node": "^8.10.2",
          typescript: "^4.2.4",
          "wait-on": "^5.0.1",
          watchify: "^3.11.1"
        },
        "lint-staged": {
          "*.{js,jsx}": [
            "yarn check-js"
          ],
          "*.{js,json,md}": [
            "prettier-eslint --write",
            "git add"
          ]
        },
        browserify: {
          transform: [
            "package-json-versionify"
          ]
        },
        resolutions: {
          buffer: "^4.9.2",
          assert: "1.5.0",
          browserify: "16.5.2",
          lodash: "4.17.20",
          "node-fetch": "2.6.1",
          elliptic: "^6.5.4",
          "component-cookie/debug": "2.6.9"
        }
      };
    }
  });

  // node_modules/@segment/analytics.js-core/build/index.js
  var require_build = __commonJS({
    "node_modules/@segment/analytics.js-core/build/index.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      var Analytics = require_analytics();
      var analytics2 = new Analytics();
      analytics2.require = __require;
      analytics2.VERSION = require_package().version;
      module.exports = analytics2;
    }
  });

  // node_modules/component-clone/index.js
  var require_component_clone = __commonJS({
    "node_modules/component-clone/index.js"(exports, module) {
      var type;
      try {
        type = require_component_type();
      } catch (_) {
        type = require_component_type();
      }
      module.exports = clone;
      function clone(obj) {
        switch (type(obj)) {
          case "object":
            var copy = {};
            for (var key in obj) {
              if (Object.prototype.hasOwnProperty.call(obj, key)) {
                copy[key] = clone(obj[key]);
              }
            }
            return copy;
          case "array":
            var copy = new Array(obj.length);
            for (var i = 0, l = obj.length; i < l; i++) {
              copy[i] = clone(obj[i]);
            }
            return copy;
          case "regexp":
            var flags = "";
            flags += obj.multiline ? "m" : "";
            flags += obj.global ? "g" : "";
            flags += obj.ignoreCase ? "i" : "";
            return new RegExp(obj.source, flags);
          case "date":
            return new Date(obj.getTime());
          default:
            return obj;
        }
      }
    }
  });

  // node_modules/@segment/alias/index.js
  var require_alias2 = __commonJS({
    "node_modules/@segment/alias/index.js"(exports, module) {
      var type = require_component_type();
      var clone = require_component_clone();
      module.exports = alias;
      function alias(obj, method) {
        switch (type(method)) {
          case "object":
            return aliasByDictionary(clone(obj), method);
          case "function":
            return aliasByFunction(clone(obj), method);
        }
      }
      function aliasByDictionary(obj, aliases) {
        for (var key in aliases) {
          if (obj[key] === void 0)
            continue;
          obj[aliases[key]] = obj[key];
          delete obj[key];
        }
        return obj;
      }
      function aliasByFunction(obj, convert) {
        var output = {};
        for (var key in obj)
          output[convert(key)] = obj[key];
        return output;
      }
    }
  });

  // node_modules/@segment/convert-dates/lib/index.js
  var require_lib12 = __commonJS({
    "node_modules/@segment/convert-dates/lib/index.js"(exports, module) {
      "use strict";
      var clone = require_clone();
      var each = require_each2();
      var type = require_component_type();
      function convertDates(obj, convert) {
        obj = clone(obj);
        each(function(val, key) {
          if (type(val) === "date") {
            obj[key] = convert(val);
          }
          if (type(val) === "object" || type(val) === "array") {
            obj[key] = convertDates(val, convert);
          }
        }, obj);
        return obj;
      }
      module.exports = convertDates;
    }
  });

  // node_modules/slug-component/index.js
  var require_slug_component = __commonJS({
    "node_modules/slug-component/index.js"(exports, module) {
      module.exports = function(str, options) {
        options || (options = {});
        return str.toLowerCase().replace(options.replace || /[^a-z0-9]/g, " ").replace(/^ +| +$/g, "").replace(/ +/g, options.separator || "-");
      };
    }
  });

  // node_modules/@ndhoule/arity/index.js
  var require_arity = __commonJS({
    "node_modules/@ndhoule/arity/index.js"(exports, module) {
      "use strict";
      var objToString = Object.prototype.toString;
      var isFunction = function(val) {
        return typeof val === "function";
      };
      var isNumber = function(val) {
        var type = typeof val;
        return type === "number" || type === "object" && objToString.call(val) === "[object Number]";
      };
      var createParams = function createParams2(n) {
        var args = [];
        for (var i = 1; i <= n; i += 1) {
          args.push("arg" + i);
        }
        return args;
      };
      var createArityWrapper = function createArityWrapper2(n) {
        var paramNames = createParams(n).join(", ");
        var wrapperBody = "".concat("  return function(", paramNames, ") {\n", "    return func.apply(this, arguments);\n", "  };");
        return new Function("func", wrapperBody);
      };
      var arityWrapperCache = [
        function(fn) {
          return function() {
            return fn.apply(this, arguments);
          };
        },
        function(fn) {
          return function(arg1) {
            return fn.apply(this, arguments);
          };
        },
        function(fn) {
          return function(arg1, arg2) {
            return fn.apply(this, arguments);
          };
        },
        function(fn) {
          return function(arg1, arg2, arg3) {
            return fn.apply(this, arguments);
          };
        },
        function(fn) {
          return function(arg1, arg2, arg3, arg4) {
            return fn.apply(this, arguments);
          };
        },
        function(fn) {
          return function(arg1, arg2, arg3, arg4, arg5) {
            return fn.apply(this, arguments);
          };
        }
      ];
      var arity = function arity2(n, func) {
        if (!isFunction(func)) {
          throw new TypeError("Expected a function but got " + typeof func);
        }
        n = Math.max(isNumber(n) ? n : 0, 0);
        if (!arityWrapperCache[n]) {
          arityWrapperCache[n] = createArityWrapper(n);
        }
        return arityWrapperCache[n](func);
      };
      module.exports = arity;
    }
  });

  // node_modules/@ndhoule/after/index.js
  var require_after = __commonJS({
    "node_modules/@ndhoule/after/index.js"(exports, module) {
      "use strict";
      var arity = require_arity();
      var objToString = Object.prototype.toString;
      var isFunction = function(val) {
        return typeof val === "function";
      };
      var isNumber = function(val) {
        var type = typeof val;
        return type === "number" || type === "object" && objToString.call(val) === "[object Number]";
      };
      var after = function after2(n, fn) {
        if (!isNumber(n)) {
          throw new TypeError("Expected a number but received " + typeof n);
        }
        if (!isFunction(fn)) {
          throw new TypeError("Expected a function but received " + typeof fn);
        }
        var callCount = 0;
        return arity(fn.length, function() {
          callCount += 1;
          if (callCount < n) {
            return;
          }
          return fn.apply(this, arguments);
        });
      };
      module.exports = after;
    }
  });

  // node_modules/analytics-events/index.js
  var require_analytics_events = __commonJS({
    "node_modules/analytics-events/index.js"(exports, module) {
      module.exports = {
        promotionViewed: /^[ _]?promotion[ _]?viewed?[ _]?$/i,
        viewedPromotion: /^[ _]?viewed[ _]?promotion?[ _]?$/i,
        promotionClicked: /^[ _]?promotion[ _]?clicked?[ _]?$/i,
        clickedPromotion: /^[ _]?clicked[ _]?promotion?[ _]?$/i,
        productsSearched: /^[ _]?products[ _]?searched[ _]?$/i,
        productListViewed: /^[ _]?product[ _]?list[ _]?viewed[ _]?$/i,
        productListFiltered: /^[ _]?product[ _]?list[ _]?filtered[ _]?$/i,
        viewedProductCategory: /^[ _]?viewed[ _]?product[ _]?category[ _]?$/i,
        viewedProductDetails: /^[ _]?viewed[ _]?product[ _]?details?[ _]?$/i,
        productClicked: /^[ _]?product[ _]?clicked[ _]?$/i,
        clickedProduct: /^[ _]?clicked[ _]?product[ _]?$/i,
        productViewed: /^[ _]?product[ _]?viewed[ _]?$/i,
        viewedProduct: /^[ _]?viewed[ _]?product[ _]?$/i,
        productAdded: /^[ _]?product[ _]?added[ _]?$/i,
        addedProduct: /^[ _]?added[ _]?product[ _]?$/i,
        productRemoved: /^[ _]?product[ _]?removed[ _]?$/i,
        removedProduct: /^[ _]?removed[ _]?product[ _]?$/i,
        cartViewed: /^[ _]?cart[ _]?viewed[ _]?$/i,
        orderStarted: /^[ _]?order[ _]?started[ _]?$/i,
        startedOrder: /^[ _]?started[ _]?order[ _]?$/i,
        orderUpdated: /^[ _]?order[ _]?updated[ _]?$/i,
        updatedOrder: /^[ _]?updated[ _]?order[ _]?$/i,
        orderCompleted: /^[ _]?order[ _]?completed[ _]?$/i,
        completedOrder: /^[ _]?completed[ _]?order[ _]?$/i,
        orderRefunded: /^[ _]?order[ _]?refunded[ _]?$/i,
        refundedOrder: /^[ _]?refunded[ _]?order[ _]?$/i,
        orderCancelled: /^[ _]?order[ _]?cancelled[ _]?$/i,
        paymentInfoAdded: /^[ _]?payment[ _]?info[ _]?added[ _]?$/i,
        checkoutStarted: /^[ _]?checkout[ _]?started[ _]?$/i,
        checkoutStepViewed: /^[ _]?checkout[ _]?step[ _]?viewed[ _]?$/i,
        viewedCheckoutStep: /^[ _]?viewed[ _]?checkout[ _]?step[ _]?$/i,
        checkoutStepCompleted: /^[ _]?checkout[ _]?step[ _]?completed[ _]?$/i,
        completedCheckoutStep: /^[ _]?completed[ _]?checkout[ _]?step[ _]?$/i,
        couponEntered: /^[ _]?coupon[ _]?entered[ _]?$/i,
        couponApplied: /^[ _]?coupon[ _]?applied[ _]?$/i,
        couponDenied: /^[ _]?coupon[ _]?denied[ _]?$/i,
        couponRemoved: /^[ _]?coupon[ _]?removed[ _]?$/i,
        productAddedToWishlist: /^[ _]?product[ _]?added[ _]?to[ _]?wishlist[ _]?$/i,
        wishlistProductRemoved: /^[ _]?wishlist[ _]?product[ _]?removed[ _]?$/i,
        wishlistProductAddedToCart: /^[ _]?wishlist[ _]?product[ _]?added[ _]?to[ _]?cart[ _]?$/i,
        productShared: /^[ _]?product[ _]?shared[ _]?$/i,
        cartShared: /^[ _]?cart[ _]?shared[ _]?$/i,
        productRemoved: /^[ _]?product[ _]?removed[ _]?$/i,
        applicationInstalled: /^[ _]?application[ _]?installed[ _]?$/i,
        applicationUpdated: /^[ _]?application[ _]?updated[ _]?$/i,
        applicationOpened: /^[ _]?application[ _]?opened[ _]?$/i,
        applicationBackgrounded: /^[ _]?application[ _]?backgrounded[ _]?$/i,
        applicationUninstalled: /^[ _]?application[ _]?uninstalled[ _]?$/i,
        installAttributed: /^[ _]?install[ _]?attributed[ _]?$/i,
        deepLinkOpened: /^[ _]?deep[ _]?link[ _]?opened[ _]?$/i,
        pushNotificationReceived: /^[ _]?push[ _]?notification[ _]?received[ _]?$/i,
        pushNotificationTapped: /^[ _]?push[ _]?notification[ _]?received[ _]?$/i,
        pushNotificationBounced: /^[ _]?push[ _]?notification[ _]?bounced[ _]?$/i
      };
    }
  });

  // node_modules/@ndhoule/every/index.js
  var require_every = __commonJS({
    "node_modules/@ndhoule/every/index.js"(exports, module) {
      "use strict";
      var each = require_each2();
      var every = function every2(predicate, collection) {
        if (typeof predicate !== "function") {
          throw new TypeError("`predicate` must be a function but was a " + typeof predicate);
        }
        var result = true;
        each(function(val, key, collection2) {
          result = !!predicate(val, key, collection2);
          if (!result) {
            return false;
          }
        }, collection);
        return result;
      };
      module.exports = every;
    }
  });

  // node_modules/@segment/fmt/lib/index.js
  var require_lib13 = __commonJS({
    "node_modules/@segment/fmt/lib/index.js"(exports, module) {
      "use strict";
      var toString = window.JSON && typeof JSON.stringify === "function" ? JSON.stringify : String;
      function fmt(str) {
        var args = Array.prototype.slice.call(arguments, 1);
        var j = 0;
        return str.replace(/%([a-z])/gi, function(match, f) {
          return fmt[f] ? fmt[f](args[j++]) : match + f;
        });
      }
      fmt.o = toString;
      fmt.s = String;
      fmt.d = parseInt;
      module.exports = fmt;
    }
  });

  // node_modules/@ndhoule/foldl/index.js
  var require_foldl = __commonJS({
    "node_modules/@ndhoule/foldl/index.js"(exports, module) {
      "use strict";
      var each = require_each2();
      var foldl = function foldl2(iterator, accumulator, collection) {
        if (typeof iterator !== "function") {
          throw new TypeError("Expected a function but received a " + typeof iterator);
        }
        each(function(val, i, collection2) {
          accumulator = iterator(accumulator, val, i, collection2);
        }, collection);
        return accumulator;
      };
      module.exports = foldl;
    }
  });

  // node_modules/script-onload/index.js
  var require_script_onload = __commonJS({
    "node_modules/script-onload/index.js"(exports, module) {
      module.exports = function(el, fn) {
        return el.addEventListener ? add(el, fn) : attach(el, fn);
      };
      function add(el, fn) {
        el.addEventListener("load", function(_, e) {
          fn(null, e);
        }, false);
        el.addEventListener("error", function(e) {
          var err = new Error('script error "' + el.src + '"');
          err.event = e;
          fn(err);
        }, false);
      }
      function attach(el, fn) {
        el.attachEvent("onreadystatechange", function(e) {
          if (!/complete|loaded/.test(el.readyState))
            return;
          fn(null, e);
        });
        el.attachEvent("onerror", function(e) {
          var err = new Error('failed to load the script "' + el.src + '"');
          err.event = e || window.event;
          fn(err);
        });
      }
    }
  });

  // node_modules/load-iframe/index.js
  var require_load_iframe = __commonJS({
    "node_modules/load-iframe/index.js"(exports, module) {
      var is = require_is();
      var onload = require_script_onload();
      var tick = require_next_tick();
      module.exports = function loadIframe(options, fn) {
        if (!options)
          throw new Error("Cant load nothing...");
        if (is.string(options))
          options = { src: options };
        var https = document.location.protocol === "https:" || document.location.protocol === "chrome-extension:";
        if (options.src && options.src.indexOf("//") === 0) {
          options.src = https ? "https:" + options.src : "http:" + options.src;
        }
        if (https && options.https)
          options.src = options.https;
        else if (!https && options.http)
          options.src = options.http;
        var iframe = document.createElement("iframe");
        iframe.src = options.src;
        iframe.width = options.width || 1;
        iframe.height = options.height || 1;
        iframe.style.display = "none";
        if (is.fn(fn)) {
          onload(iframe, fn);
        }
        tick(function() {
          var firstScript = document.getElementsByTagName("script")[0];
          firstScript.parentNode.insertBefore(iframe, firstScript);
        });
        return iframe;
      };
    }
  });

  // node_modules/@segment/load-script/index.js
  var require_load_script = __commonJS({
    "node_modules/@segment/load-script/index.js"(exports, module) {
      "use strict";
      var onload = require_script_onload();
      var tick = require_next_tick();
      var type = require_component_type();
      function loadScript(options, cb) {
        if (!options) {
          throw new Error("Can't load nothing...");
        }
        if (type(options) === "string") {
          options = { src: options };
        }
        var https = document.location.protocol === "https:" || document.location.protocol === "chrome-extension:";
        if (options.src && options.src.indexOf("//") === 0) {
          options.src = (https ? "https:" : "http:") + options.src;
        }
        if (https && options.https) {
          options.src = options.https;
        } else if (!https && options.http) {
          options.src = options.http;
        }
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = options.src;
        if (type(cb) === "function") {
          onload(script, cb);
        }
        tick(function() {
          var firstScript = document.getElementsByTagName("script")[0];
          firstScript.parentNode.insertBefore(script, firstScript);
        });
        return script;
      }
      module.exports = loadScript;
    }
  });

  // node_modules/to-no-case/index.js
  var require_to_no_case = __commonJS({
    "node_modules/to-no-case/index.js"(exports, module) {
      module.exports = toNoCase;
      var hasSpace = /\s/;
      var hasSeparator = /[\W_]/;
      function toNoCase(string) {
        if (hasSpace.test(string))
          return string.toLowerCase();
        if (hasSeparator.test(string))
          return (unseparate(string) || string).toLowerCase();
        return uncamelize(string).toLowerCase();
      }
      var separatorSplitter = /[\W_]+(.|$)/g;
      function unseparate(string) {
        return string.replace(separatorSplitter, function(m, next) {
          return next ? " " + next : "";
        });
      }
      var camelSplitter = /(.)([A-Z]+)/g;
      function uncamelize(string) {
        return string.replace(camelSplitter, function(m, previous, uppers) {
          return previous + " " + uppers.toLowerCase().split("").join(" ");
        });
      }
    }
  });

  // node_modules/@segment/analytics.js-integration/lib/protos.js
  var require_protos = __commonJS({
    "node_modules/@segment/analytics.js-integration/lib/protos.js"(exports) {
      "use strict";
      var Emitter = require_component_emitter();
      var after = require_after();
      var each = require_each2();
      var events = require_analytics_events();
      var every = require_every();
      var fmt = require_lib13();
      var foldl = require_foldl();
      var is = require_is();
      var loadIframe = require_load_iframe();
      var loadScript = require_load_script();
      var nextTick = require_next_tick();
      var normalize = require_to_no_case();
      var has = Object.prototype.hasOwnProperty;
      var noop = function noop2() {
      };
      var onerror = window.onerror;
      var onload = null;
      Emitter(exports);
      exports.initialize = function() {
        var ready = this.ready;
        nextTick(ready);
      };
      exports.loaded = function() {
        return false;
      };
      exports.page = function(page) {
      };
      exports.track = function(track) {
      };
      exports.map = function(options, key) {
        var normalizedComparator = normalize(key);
        var mappingType = getMappingType(options);
        if (mappingType === "unknown") {
          return [];
        }
        return foldl(function(matchingValues, val, key2) {
          var compare;
          var result;
          if (mappingType === "map") {
            compare = key2;
            result = val;
          }
          if (mappingType === "array") {
            compare = val;
            result = val;
          }
          if (mappingType === "mixed") {
            compare = val.key;
            result = val.value;
          }
          if (normalize(compare) === normalizedComparator) {
            matchingValues.push(result);
          }
          return matchingValues;
        }, [], options);
      };
      exports.invoke = function(method) {
        if (!this[method])
          return;
        var args = Array.prototype.slice.call(arguments, 1);
        if (!this._ready)
          return this.queue(method, args);
        this.debug("%s with %o", method, args);
        return this[method].apply(this, args);
      };
      exports.queue = function(method, args) {
        if (method === "page" && this._assumesPageview && !this._initialized) {
          return this.page.apply(this, args);
        }
        this._queue.push({ method, args });
      };
      exports.flush = function() {
        this._ready = true;
        var self2 = this;
        each(function(call) {
          self2[call.method].apply(self2, call.args);
        }, this._queue);
        this._queue.length = 0;
      };
      exports.reset = function() {
        for (var i = 0; i < this.globals.length; i++) {
          window[this.globals[i]] = void 0;
        }
        window.onerror = onerror;
        window.onload = onload;
      };
      exports.load = function(name2, locals, callback) {
        if (typeof name2 === "function") {
          callback = name2;
          locals = null;
          name2 = null;
        }
        if (name2 && typeof name2 === "object") {
          callback = locals;
          locals = name2;
          name2 = null;
        }
        if (typeof locals === "function") {
          callback = locals;
          locals = null;
        }
        name2 = name2 || "library";
        locals = locals || {};
        locals = this.locals(locals);
        var template = this.templates[name2];
        if (!template)
          throw new Error(fmt('template "%s" not defined.', name2));
        var attrs = render(template, locals);
        callback = callback || noop;
        var self2 = this;
        var el;
        switch (template.type) {
          case "img":
            attrs.width = 1;
            attrs.height = 1;
            el = loadImage(attrs, callback);
            break;
          case "script":
            el = loadScript(attrs, function(err) {
              if (!err)
                return callback();
              self2.debug('error loading "%s" error="%s"', self2.name, err);
            });
            delete attrs.src;
            each(function(val, key) {
              el.setAttribute(key, val);
            }, attrs);
            break;
          case "iframe":
            el = loadIframe(attrs, callback);
            break;
          default:
        }
        return el;
      };
      exports.locals = function(locals) {
        locals = locals || {};
        var cache = Math.floor(new Date().getTime() / 36e5);
        if (!locals.hasOwnProperty("cache"))
          locals.cache = cache;
        each(function(val, key) {
          if (!locals.hasOwnProperty(key))
            locals[key] = val;
        }, this.options);
        return locals;
      };
      exports.ready = function() {
        this.emit("ready");
      };
      exports._wrapInitialize = function() {
        var initialize = this.initialize;
        this.initialize = function() {
          this.debug("initialize");
          this._initialized = true;
          var ret = initialize.apply(this, arguments);
          this.emit("initialize");
          return ret;
        };
        if (this._assumesPageview)
          this.initialize = after(2, this.initialize);
      };
      exports._wrapPage = function() {
        var page = this.page;
        this.page = function() {
          if (this._assumesPageview && !this._initialized) {
            return this.initialize.apply(this, arguments);
          }
          return page.apply(this, arguments);
        };
      };
      exports._wrapTrack = function() {
        var t = this.track;
        this.track = function(track) {
          var event = track.event();
          var called;
          var ret;
          for (var method in events) {
            if (has.call(events, method)) {
              var regexp = events[method];
              if (!this[method])
                continue;
              if (!regexp.test(event))
                continue;
              ret = this[method].apply(this, arguments);
              called = true;
              break;
            }
          }
          if (!called)
            ret = t.apply(this, arguments);
          return ret;
        };
      };
      function getMappingType(mapping) {
        if (is.array(mapping)) {
          return every(isMixed, mapping) ? "mixed" : "array";
        }
        if (is.object(mapping))
          return "map";
        return "unknown";
      }
      function isMixed(item) {
        if (!is.object(item))
          return false;
        if (!is.string(item.key))
          return false;
        if (!has.call(item, "value"))
          return false;
        return true;
      }
      function loadImage(attrs, fn) {
        fn = fn || function() {
        };
        var img = new Image();
        img.onerror = error(fn, "failed to load pixel", img);
        img.onload = function() {
          fn();
        };
        img.src = attrs.src;
        img.width = 1;
        img.height = 1;
        return img;
      }
      function error(fn, message, img) {
        return function(e) {
          e = e || window.event;
          var err = new Error(message);
          err.event = e;
          err.source = img;
          fn(err);
        };
      }
      function render(template, locals) {
        return foldl(function(attrs, val, key) {
          attrs[key] = val.replace(/\{\{\ *(\w+)\ *\}\}/g, function(_, $1) {
            return locals[$1];
          });
          return attrs;
        }, {}, template.attrs);
      }
    }
  });

  // node_modules/domify/index.js
  var require_domify = __commonJS({
    "node_modules/domify/index.js"(exports, module) {
      module.exports = parse;
      var innerHTMLBug = false;
      var bugTestDiv;
      if (typeof document !== "undefined") {
        bugTestDiv = document.createElement("div");
        bugTestDiv.innerHTML = '  <link/><table></table><a href="/a">a</a><input type="checkbox"/>';
        innerHTMLBug = !bugTestDiv.getElementsByTagName("link").length;
        bugTestDiv = void 0;
      }
      var map = {
        legend: [1, "<fieldset>", "</fieldset>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        _default: innerHTMLBug ? [1, "X<div>", "</div>"] : [0, "", ""]
      };
      map.td = map.th = [3, "<table><tbody><tr>", "</tr></tbody></table>"];
      map.option = map.optgroup = [1, '<select multiple="multiple">', "</select>"];
      map.thead = map.tbody = map.colgroup = map.caption = map.tfoot = [1, "<table>", "</table>"];
      map.polyline = map.ellipse = map.polygon = map.circle = map.text = map.line = map.path = map.rect = map.g = [1, '<svg xmlns="http://www.w3.org/2000/svg" version="1.1">', "</svg>"];
      function parse(html, doc) {
        if (typeof html != "string")
          throw new TypeError("String expected");
        if (!doc)
          doc = document;
        var m = /<([\w:]+)/.exec(html);
        if (!m)
          return doc.createTextNode(html);
        html = html.replace(/^\s+|\s+$/g, "");
        var tag = m[1];
        if (tag == "body") {
          var el = doc.createElement("html");
          el.innerHTML = html;
          return el.removeChild(el.lastChild);
        }
        var wrap = Object.prototype.hasOwnProperty.call(map, tag) ? map[tag] : map._default;
        var depth = wrap[0];
        var prefix = wrap[1];
        var suffix = wrap[2];
        var el = doc.createElement("div");
        el.innerHTML = prefix + html + suffix;
        while (depth--)
          el = el.lastChild;
        if (el.firstChild == el.lastChild) {
          return el.removeChild(el.firstChild);
        }
        var fragment = doc.createDocumentFragment();
        while (el.firstChild) {
          fragment.appendChild(el.removeChild(el.firstChild));
        }
        return fragment;
      }
    }
  });

  // node_modules/@segment/analytics.js-integration/lib/statics.js
  var require_statics = __commonJS({
    "node_modules/@segment/analytics.js-integration/lib/statics.js"(exports) {
      "use strict";
      var Emitter = require_component_emitter();
      var domify = require_domify();
      var each = require_each2();
      var includes = require_includes();
      Emitter(exports);
      exports.option = function(key, value) {
        this.prototype.defaults[key] = value;
        return this;
      };
      exports.mapping = function(name2) {
        this.option(name2, []);
        this.prototype[name2] = function(key) {
          return this.map(this.options[name2], key);
        };
        return this;
      };
      exports.global = function(key) {
        this.prototype.globals.push(key);
        return this;
      };
      exports.assumesPageview = function() {
        this.prototype._assumesPageview = true;
        return this;
      };
      exports.readyOnLoad = function() {
        this.prototype._readyOnLoad = true;
        return this;
      };
      exports.readyOnInitialize = function() {
        this.prototype._readyOnInitialize = true;
        return this;
      };
      exports.tag = function(name2, tag) {
        if (tag == null) {
          tag = name2;
          name2 = "library";
        }
        this.prototype.templates[name2] = objectify(tag);
        return this;
      };
      function objectify(str) {
        str = str.replace(' src="', ' data-src="');
        var el = domify(str);
        var attrs = {};
        each(function(attr) {
          var name2 = attr.name === "data-src" ? "src" : attr.name;
          if (!includes(attr.name + "=", str))
            return;
          attrs[name2] = attr.value;
        }, el.attributes);
        return {
          type: el.tagName.toLowerCase(),
          attrs
        };
      }
    }
  });

  // node_modules/@segment/analytics.js-integration/lib/index.js
  var require_lib14 = __commonJS({
    "node_modules/@segment/analytics.js-integration/lib/index.js"(exports, module) {
      "use strict";
      var bind = require_component_bind();
      var clone = require_clone();
      var debug = require_browser();
      var defaults = require_defaults();
      var extend = require_extend2();
      var slug = require_slug_component();
      var protos = require_protos();
      var statics = require_statics();
      function createIntegration(name2) {
        function Integration(options) {
          if (options && options.addIntegration) {
            return options.addIntegration(Integration);
          }
          this.debug = debug("analytics:integration:" + slug(name2));
          this.options = defaults(clone(options) || {}, this.defaults);
          this._queue = [];
          this.once("ready", bind(this, this.flush));
          Integration.emit("construct", this);
          this.ready = bind(this, this.ready);
          this._wrapInitialize();
          this._wrapPage();
          this._wrapTrack();
        }
        Integration.prototype.defaults = {};
        Integration.prototype.globals = [];
        Integration.prototype.templates = {};
        Integration.prototype.name = name2;
        extend(Integration, statics);
        extend(Integration.prototype, protos);
        return Integration;
      }
      module.exports = createIntegration;
    }
  });

  // node_modules/@segment/analytics.js-integration-customerio/lib/index.js
  var require_lib15 = __commonJS({
    "node_modules/@segment/analytics.js-integration-customerio/lib/index.js"(exports, module) {
      "use strict";
      var Identify = require_lib4().Identify;
      var alias = require_alias2();
      var convertDates = require_lib12();
      var integration = require_lib14();
      var MAX_YEAR_SUPPORTED_AS_UNIX = 1970;
      var Customerio = module.exports = integration("Customer.io").global("_cio").option("siteId", "").option("datacenter", "").tag("eu-tag", '<script id="cio-tracker" src="https://assets.customer.io/assets/track-eu.js" data-site-id="{{ siteId }}">').tag("global-tag", '<script id="cio-tracker" src="https://assets.customer.io/assets/track.js" data-site-id="{{ siteId }}">');
      Customerio.prototype.initialize = function() {
        window._cio = window._cio || [];
        (function() {
          var a, b, c;
          a = function(f) {
            return function() {
              window._cio.push([f].concat(Array.prototype.slice.call(arguments, 0)));
            };
          };
          b = ["identify", "track"];
          for (c = 0; c < b.length; c++) {
            window._cio[b[c]] = a(b[c]);
          }
        })();
        if (this.options.datacenter === "eu" && this.templates["eu-tag"]) {
          this.load("eu-tag", this.ready);
        } else {
          this.load("global-tag", this.ready);
        }
      };
      Customerio.prototype.loaded = function() {
        return !!(window._cio && window._cio.push !== Array.prototype.push);
      };
      Customerio.prototype.page = function(page) {
        var name2 = page.name() || page.url();
        window._cio.page(name2, page.properties());
      };
      Customerio.prototype.identify = function(identify) {
        if (!identify.userId())
          return this.debug("user id required");
        var traits = identify.traits({ createdAt: "created" });
        traits = alias(traits, { created: "created_at" });
        traits = convertDates(traits, convertDate);
        window._cio.identify(traits);
      };
      Customerio.prototype.group = function(group) {
        var traits = group.traits();
        var user = this.analytics.user();
        traits = alias(traits, function(trait) {
          return "Group " + trait;
        });
        this.identify(new Identify({
          userId: user.id(),
          traits
        }));
      };
      Customerio.prototype.track = function(track) {
        var properties = track.properties();
        properties = convertDates(properties, convertDate);
        window._cio.track(track.event(), properties);
      };
      function convertDate(date) {
        if (date.getFullYear() < MAX_YEAR_SUPPORTED_AS_UNIX) {
          return date.toISOString();
        }
        return Math.floor(date.getTime() / 1e3);
      }
    }
  });

  // node_modules/@segment/to-iso-string/lib/index.js
  var require_lib16 = __commonJS({
    "node_modules/@segment/to-iso-string/lib/index.js"(exports, module) {
      "use strict";
      function pad(number) {
        var n = number.toString();
        return n.length === 1 ? "0" + n : n;
      }
      function toISOString(date) {
        return date.getUTCFullYear() + "-" + pad(date.getUTCMonth() + 1) + "-" + pad(date.getUTCDate()) + "T" + pad(date.getUTCHours()) + ":" + pad(date.getUTCMinutes()) + ":" + pad(date.getUTCSeconds()) + "." + String((date.getUTCMilliseconds() / 1e3).toFixed(3)).slice(2, 5) + "Z";
      }
      module.exports = toISOString;
    }
  });

  // node_modules/component-indexof/index.js
  var require_component_indexof = __commonJS({
    "node_modules/component-indexof/index.js"(exports, module) {
      module.exports = function(arr, obj) {
        if (arr.indexOf)
          return arr.indexOf(obj);
        for (var i = 0; i < arr.length; ++i) {
          if (arr[i] === obj)
            return i;
        }
        return -1;
      };
    }
  });

  // node_modules/@segment/analytics.js-integration-mixpanel/lib/index.js
  var require_lib17 = __commonJS({
    "node_modules/@segment/analytics.js-integration-mixpanel/lib/index.js"(exports, module) {
      "use strict";
      var alias = require_alias2();
      var dates = require_lib12();
      var del = require_obj_case().del;
      var includes = require_includes();
      var integration = require_lib14();
      var iso = require_lib16();
      var pick = require_pick();
      var is = require_is();
      var indexOf = require_component_indexof();
      var Mixpanel = module.exports = integration("Mixpanel").global("mixpanel").option("eventIncrements", []).option("propIncrements", []).option("peopleProperties", []).option("superProperties", []).option("cookieName", "").option("crossSubdomainCookie", false).option("secureCookie", false).option("persistence", "cookie").option("nameTag", true).option("pageview", false).option("people", false).option("token", "").option("setAllTraitsByDefault", true).option("consolidatedPageCalls", true).option("trackAllPages", false).option("trackNamedPages", false).option("trackCategorizedPages", false).option("groupIdentifierTraits", []).option("sourceName", "").option("enableEuropeanUnionEndpoint", false).tag('<script src="//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js">');
      var optionsAliases = {
        cookieName: "cookie_name",
        crossSubdomainCookie: "cross_subdomain_cookie",
        secureCookie: "secure_cookie"
      };
      Mixpanel.prototype.initialize = function() {
        (function(e, a) {
          if (!a.__SV) {
            var b = window;
            try {
              var c, l, i, j = b.location, g = j.hash;
              c = function(a2, b2) {
                return (l = a2.match(RegExp(b2 + "=([^&]*)"))) ? l[1] : null;
              };
              g && c(g, "state") && (i = JSON.parse(decodeURIComponent(c(g, "state"))), i.action === "mpeditor" && (b.sessionStorage.setItem("_mpcehash", g), history.replaceState(i.desiredHash || "", e.title, j.pathname + j.search)));
            } catch (m) {
            }
            var k, h;
            window.mixpanel = a;
            a._i = [];
            a.init = function(b2, c2, f) {
              function e2(b3, a2) {
                var c3 = a2.split(".");
                c3.length == 2 && (b3 = b3[c3[0]], a2 = c3[1]);
                b3[a2] = function() {
                  b3.push([a2].concat(Array.prototype.slice.call(arguments, 0)));
                };
              }
              var d = a;
              typeof f !== "undefined" ? d = a[f] = [] : f = "mixpanel";
              d.people = d.people || [];
              d.toString = function(b3) {
                var a2 = "mixpanel";
                f !== "mixpanel" && (a2 += "." + f);
                b3 || (a2 += " (stub)");
                return a2;
              };
              d.people.toString = function() {
                return d.toString(1) + ".people (stub)";
              };
              k = "disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
              for (h = 0; h < k.length; h++)
                e2(d, k[h]);
              a._i.push([b2, c2, f]);
            };
            a.__SV = 1.2;
          }
        })(document, window.mixpanel || []);
        this.options.eventIncrements = lowercase(this.options.eventIncrements);
        this.options.propIncrements = lowercase(this.options.propIncrements);
        var options = alias(this.options, optionsAliases);
        if (this.options.enableEuropeanUnionEndpoint) {
          options.api_host = "https://api-eu.mixpanel.com";
        }
        options.loaded = function(mixpanel) {
          mixpanel.register({ mp_lib: "Segment: web" });
        };
        window.mixpanel.init(options.token, options);
        this.load(this.ready);
      };
      Mixpanel.prototype.loaded = function() {
        return !!(window.mixpanel && window.mixpanel.config);
      };
      Mixpanel.prototype.page = function(page) {
        var category = page.category();
        var name2 = page.name();
        var opts = this.options;
        if (opts.consolidatedPageCalls) {
          this.track(page.track());
          return;
        }
        if (opts.trackAllPages) {
          this.track(page.track());
          return;
        }
        if (opts.trackCategorizedPages && category) {
          if (name2) {
            this.track(page.track(page.fullName()));
            return;
          }
          this.track(page.track(category));
          return;
        }
        if (name2 && opts.trackNamedPages) {
          this.track(page.track(name2));
        }
      };
      var traitAliases = {
        created: "$created",
        email: "$email",
        firstName: "$first_name",
        lastName: "$last_name",
        lastSeen: "$last_seen",
        name: "$name",
        username: "$username",
        phone: "$phone"
      };
      Mixpanel.prototype.identify = function(identify) {
        var username = identify.username();
        var email = identify.email();
        var id = identify.userId();
        var setAllTraitsByDefault = this.options.setAllTraitsByDefault;
        var people = this.options.people;
        var peopleProperties = extendTraits(this.options.peopleProperties);
        var superProperties = this.options.superProperties;
        if (id)
          window.mixpanel.identify(id);
        var nametag = email || username || id;
        if (nametag)
          window.mixpanel.name_tag(nametag);
        var traits = identify.traits(traitAliases);
        if (traits.$created)
          del(traits, "createdAt");
        traits = dates(traits, iso);
        var traitsToUnion = {};
        var traitsToSet = {};
        for (var key in traits) {
          if (!traits.hasOwnProperty(key))
            continue;
          var trait = traits[key];
          if (Array.isArray(trait) && trait.length > 0) {
            traitsToUnion[key] = trait;
            var existingTrait = window.mixpanel.get_property(key);
            if (existingTrait && Array.isArray(existingTrait)) {
              traits[key] = unionArrays(existingTrait, trait);
            }
          } else {
            traitsToSet[key] = trait;
          }
        }
        if (setAllTraitsByDefault) {
          window.mixpanel.register(traits);
          if (people) {
            window.mixpanel.people.set(traitsToSet);
            window.mixpanel.people.union(traitsToUnion);
          }
        } else {
          var mappedSuperProps = mapTraits(superProperties);
          var superProps = pick(mappedSuperProps || [], traits);
          if (!is.empty(superProps))
            window.mixpanel.register(superProps);
          if (people) {
            var mappedPeopleProps = mapTraits(peopleProperties);
            var peoplePropsToSet = pick(mappedPeopleProps || [], traitsToSet);
            var peoplePropsToUnion = pick(mappedPeopleProps || [], traitsToUnion);
            if (!is.empty(peoplePropsToSet))
              window.mixpanel.people.set(peoplePropsToSet);
            if (!is.empty(peoplePropsToUnion))
              window.mixpanel.people.union(peoplePropsToUnion);
          }
        }
      };
      Mixpanel.prototype.track = function(track) {
        var eventIncrements = this.options.eventIncrements || this.options.increments;
        var propIncrements = this.options.propIncrements;
        var eventLowercase = track.event().toLowerCase();
        var people = this.options.people;
        var props = track.properties();
        var revenue = track.revenue();
        var superProps = pick(this.options.superProperties, props);
        var sourceName = this.options.sourceName;
        if (sourceName)
          props.segment_source_name = sourceName;
        delete props.distinct_id;
        delete props.ip;
        delete props.mp_name_tag;
        delete props.mp_note;
        delete props.token;
        props = dates(props, iso);
        invertObjectArrays(props);
        if (people) {
          if (includes(eventLowercase, eventIncrements)) {
            window.mixpanel.people.increment(track.event());
            window.mixpanel.people.set("Last " + track.event(), new Date());
          }
          for (var key in props) {
            if (!Object.prototype.hasOwnProperty.call(props, key)) {
              continue;
            }
            var prop = props[key];
            if (includes(key.toLowerCase(), propIncrements)) {
              window.mixpanel.people.increment(key, prop);
            }
          }
          if (revenue) {
            window.mixpanel.people.track_charge(revenue);
          }
        }
        var query;
        if (props.link_query) {
          query = props.link_query;
          delete props.link_query;
          window.mixpanel.track_links(query, track.event(), props);
        } else if (props.form_query) {
          query = props.form_query;
          delete props.form_query;
          window.mixpanel.track_forms(query, track.event(), props);
        } else {
          window.mixpanel.track(track.event(), props);
        }
        if (!is.empty(superProps)) {
          window.mixpanel.register(superProps);
        }
      };
      Mixpanel.prototype.alias = function(alias2) {
        var mp = window.mixpanel;
        var to = alias2.to();
        if (mp.get_distinct_id && mp.get_distinct_id() === to)
          return;
        if (mp.get_property && mp.get_property("$people_distinct_id") === to)
          return;
        mp.alias(to, alias2.from());
      };
      Mixpanel.prototype.group = function(group) {
        var groupIdentifierTraits = this.options.groupIdentifierTraits;
        var groupId = group.groupId();
        var userId = this.analytics.user().id();
        var traits = group.properties();
        if (!groupId || !userId || !groupIdentifierTraits.length) {
          return;
        }
        if (traits && Object.keys(traits).length) {
          for (var ind = 0; ind < groupIdentifierTraits.length; ind++) {
            window.mixpanel.get_group(groupIdentifierTraits[ind], groupId).set_once(traits);
          }
        }
        for (var i = 0; i < groupIdentifierTraits.length; i++) {
          window.mixpanel.set_group(groupIdentifierTraits[i], [groupId]);
        }
      };
      function lowercase(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < arr.length; ++i) {
          ret[i] = String(arr[i]).toLowerCase();
        }
        return ret;
      }
      function mapTraits(arr) {
        var ret = new Array(arr.length);
        for (var i = 0; i < arr.length; ++i) {
          if (traitAliases.hasOwnProperty(arr[i])) {
            ret.push(traitAliases[arr[i]]);
          } else {
            ret.push(arr[i]);
          }
        }
        return ret;
      }
      function extendTraits(arr) {
        var keys = [];
        for (var key in traitAliases) {
          if (traitAliases.hasOwnProperty(key)) {
            keys.push(key);
          }
        }
        for (var i = 0; i < keys.length; ++i) {
          if (indexOf(arr, keys[i]) < 0) {
            arr.push(keys[i]);
          }
        }
        return arr;
      }
      function invertObjectArrays(props) {
        var properties = props;
        for (var propName in properties) {
          var propValue = properties[propName];
          if (!properties.hasOwnProperty(propName) || !Array.isArray(propValue)) {
            continue;
          }
          var invertedArrays = invertObjectArray(propName, propValue);
          if (Object.keys(invertedArrays).length !== 0) {
            mergeArraysIntoObj(properties, invertedArrays);
            delete properties[propName];
          }
        }
      }
      function invertObjectArray(propName, arr) {
        var invertedArrays = {};
        for (var i = 0; i < arr.length; i++) {
          var elem = arr[i];
          if (typeof elem !== "object") {
            return {};
          }
          for (var key in elem) {
            if (!elem.hasOwnProperty(key)) {
              continue;
            }
            var attrKey = propName + "_" + key + "s";
            if (attrKey in invertedArrays) {
              invertedArrays[attrKey].push(elem[key]);
            } else {
              invertedArrays[attrKey] = [elem[key]];
            }
          }
        }
        return invertedArrays;
      }
      function mergeArraysIntoObj(destination, source) {
        var d = destination;
        for (var arrayName in source) {
          if (source.hasOwnProperty(arrayName)) {
            var arr = source[arrayName];
            d[arrayName] = arrayName in d ? d[arrayName].concat(arr) : arr;
          }
        }
      }
      function unionArrays(x, y) {
        var obj = {};
        var i;
        for (i = 0; i < x.length; i++) {
          obj[x[i]] = x[i];
        }
        for (i = 0; i < y.length; i++) {
          obj[y[i]] = y[i];
        }
        return Object.keys(obj);
      }
    }
  });

  // node_modules/@ndhoule/values/index.js
  var require_values = __commonJS({
    "node_modules/@ndhoule/values/index.js"(exports, module) {
      "use strict";
      var keys = require_keys();
      var values = function values2(source) {
        var ks = keys(source);
        var results = new Array(ks.length);
        for (var i = 0; i < ks.length; i += 1) {
          results[i] = source[ks[i]];
        }
        return results;
      };
      module.exports = values;
    }
  });

  // node_modules/@ndhoule/map/index.js
  var require_map2 = __commonJS({
    "node_modules/@ndhoule/map/index.js"(exports, module) {
      "use strict";
      var each = require_each2();
      var map = function map2(iterator, collection) {
        if (typeof iterator !== "function") {
          throw new TypeError("Expected a function but received a " + typeof iterator);
        }
        var result = [];
        each(function(val, i, collection2) {
          result.push(iterator(val, i, collection2));
        }, collection);
        return result;
      };
      module.exports = map;
    }
  });

  // node_modules/@segment/analytics.js-integration-optimizely/node_modules/analytics-events/lib/index.js
  var require_lib18 = __commonJS({
    "node_modules/@segment/analytics.js-integration-optimizely/node_modules/analytics-events/lib/index.js"(exports, module) {
      "use strict";
      var map = require_map2();
      var foldl = require_foldl();
      var eventMap = {
        videoPlaybackStarted: [{
          object: "video playback",
          action: "started"
        }],
        videoPlaybackPaused: [{
          object: "video playback",
          action: "paused"
        }],
        videoPlaybackInterrupted: [{
          object: "video playback",
          action: "interrupted"
        }],
        videoPlaybackResumed: [{
          object: "video playback",
          action: "resumed"
        }],
        videoPlaybackCompleted: [{
          object: "video playback",
          action: "completed"
        }],
        videoPlaybackExited: [{
          object: "video playback",
          action: "exited"
        }],
        videoPlaybackBufferStarted: [{
          object: "video playback buffer",
          action: "started"
        }],
        videoPlaybackBufferCompleted: [{
          object: "video playback buffer",
          action: "completed"
        }],
        videoPlaybackSeekStarted: [{
          object: "video playback seek",
          action: "started"
        }],
        videoPlaybackSeekCompleted: [{
          object: "video playback seek",
          action: "completed"
        }],
        videoContentStarted: [{
          object: "video content",
          action: "started"
        }],
        videoContentPlaying: [{
          object: "video content",
          action: "playing"
        }],
        videoContentCompleted: [{
          object: "video content",
          action: "completed"
        }],
        videoAdStarted: [{
          object: "video ad",
          action: "started"
        }],
        videoAdPlaying: [{
          object: "video ad",
          action: "playing"
        }],
        videoAdCompleted: [{
          object: "video ad",
          action: "completed"
        }],
        videoAdClicked: [{
          object: "video ad",
          action: "clicked"
        }],
        videoAdSkipped: [{
          object: "video ad",
          action: "skipped"
        }],
        promotionViewed: [{
          object: "promotion",
          action: "viewed"
        }],
        promotionClicked: [{
          object: "promotion",
          action: "clicked"
        }],
        productsSearched: [{
          object: "products",
          action: "searched"
        }],
        productListViewed: [{
          object: "product list",
          action: "viewed"
        }, {
          object: "product category",
          action: "viewed"
        }],
        productListFiltered: [{
          object: "product list",
          action: "filtered"
        }],
        productClicked: [{
          object: "product",
          action: "clicked"
        }],
        productViewed: [{
          object: "product",
          action: "viewed"
        }],
        productAdded: [{
          object: "product",
          action: "added"
        }],
        productRemoved: [{
          object: "product",
          action: "removed"
        }],
        cartViewed: [{
          object: "cart",
          action: "viewed"
        }],
        orderUpdated: [{
          object: "order",
          action: "updated"
        }],
        orderCompleted: [{
          object: "order",
          action: "completed"
        }],
        orderRefunded: [{
          object: "order",
          action: "refunded"
        }],
        orderCancelled: [{
          object: "order",
          action: "cancelled"
        }],
        paymentInfoEntered: [{
          object: "payment info",
          action: "entered"
        }],
        checkoutStarted: [{
          object: "checkout",
          action: "started"
        }],
        checkoutStepViewed: [{
          object: "checkout step",
          action: "viewed"
        }],
        checkoutStepCompleted: [{
          object: "checkout step",
          action: "completed"
        }],
        couponEntered: [{
          object: "coupon",
          action: "entered"
        }],
        couponApplied: [{
          object: "coupon",
          action: "applied"
        }],
        couponDenied: [{
          object: "coupon",
          action: "denied"
        }],
        couponRemoved: [{
          object: "coupon",
          action: "removed"
        }],
        productAddedToWishlist: [{
          object: "product",
          action: "added to wishlist"
        }],
        productRemovedFromWishlist: [{
          object: "product",
          action: "removed from wishlist"
        }],
        productAddedFromWishlistToCart: [{
          object: "product",
          action: "added to cart from wishlist"
        }, {
          object: "product",
          action: "added from wishlist to cart"
        }],
        wishlistProductAddedToCart: [{
          object: "wishlist product",
          action: "added to cart"
        }],
        productShared: [{
          object: "product",
          action: "shared"
        }],
        cartShared: [{
          object: "cart",
          action: "shared"
        }],
        productReviewed: [{
          object: "product",
          action: "reviewed"
        }],
        applicationInstalled: [{
          object: "application",
          action: "installed"
        }],
        applicationUpdated: [{
          object: "application",
          action: "updated"
        }],
        applicationOpened: [{
          object: "application",
          action: "opened"
        }],
        applicationBackgrounded: [{
          object: "application",
          action: "backgrounded"
        }],
        applicationUninstalled: [{
          object: "application",
          action: "uninstalled"
        }],
        applicationCrashed: [{
          object: "application",
          action: "crashed"
        }],
        installAttributed: [{
          object: "install",
          action: "attributed"
        }],
        deepLinkOpened: [{
          object: "deep link",
          action: "opened"
        }],
        deepLinkClicked: [{
          object: "deep link",
          action: "clicked"
        }],
        pushNotificationReceived: [{
          object: "push notification",
          action: "received"
        }],
        pushNotificationTapped: [{
          object: "push notification",
          action: "tapped"
        }],
        pushNotificationBounced: [{
          object: "push notification",
          action: "bounced"
        }],
        emailBounced: [{
          object: "email",
          action: "bounced"
        }],
        emailDelivered: [{
          object: "email",
          action: "delivered"
        }],
        emailLinkClicked: [{
          object: "email link",
          action: "clicked"
        }],
        emailMarkedAsSpam: [{
          object: "email",
          action: "marked as spam"
        }],
        emailOpened: [{
          object: "email",
          action: "opened"
        }],
        unsubscribed: [{
          object: "",
          action: "unsubscribed"
        }],
        liveChatConversationEnded: [{
          object: "live chat conversation",
          action: "ended"
        }],
        liveChatConversationStarted: [{
          object: "live chat conversation",
          action: "started"
        }],
        liveChatMessageReceived: [{
          object: "live chat message",
          action: "received"
        }],
        liveChatMessageSent: [{
          object: "live chat message",
          action: "sent"
        }]
      };
      module.exports = foldl(function transform(ret, pairs, method) {
        var values = map(function(pair) {
          return map(function(permutation) {
            var flattened = [].concat.apply([], map(function(words) {
              return words.split(" ");
            }, permutation));
            return "^[ _]?" + flattened.join("[ _]?") + "[ _]?";
          }, [
            [pair.action, pair.object],
            [pair.object, pair.action]
          ]).join("|");
        }, pairs);
        var conjoined = values.join("|") + "$";
        ret[method] = new RegExp(conjoined, "i");
        return ret;
      }, {}, eventMap);
    }
  });

  // node_modules/@segment/analytics.js-integration-optimizely/node_modules/@segment/analytics.js-integration/node_modules/next-tick/index.js
  var require_next_tick2 = __commonJS({
    "node_modules/@segment/analytics.js-integration-optimizely/node_modules/@segment/analytics.js-integration/node_modules/next-tick/index.js"(exports, module) {
      "use strict";
      var callable;
      var byObserver;
      callable = function(fn) {
        if (typeof fn !== "function")
          throw new TypeError(fn + " is not a function");
        return fn;
      };
      byObserver = function(Observer) {
        var node = document.createTextNode(""), queue, i = 0;
        new Observer(function() {
          var data;
          if (!queue)
            return;
          data = queue;
          queue = null;
          if (typeof data === "function") {
            data();
            return;
          }
          data.forEach(function(fn) {
            fn();
          });
        }).observe(node, { characterData: true });
        return function(fn) {
          callable(fn);
          if (queue) {
            if (typeof queue === "function")
              queue = [queue, fn];
            else
              queue.push(fn);
            return;
          }
          queue = fn;
          node.data = i = ++i % 2;
        };
      };
      module.exports = function() {
        if (typeof process !== "undefined" && process && typeof process.nextTick === "function") {
          return process.nextTick;
        }
        if (typeof document === "object" && document) {
          if (typeof MutationObserver === "function") {
            return byObserver(MutationObserver);
          }
          if (typeof WebKitMutationObserver === "function") {
            return byObserver(WebKitMutationObserver);
          }
        }
        if (typeof setImmediate === "function") {
          return function(cb) {
            setImmediate(callable(cb));
          };
        }
        if (typeof setTimeout === "function") {
          return function(cb) {
            setTimeout(callable(cb), 0);
          };
        }
        return null;
      }();
    }
  });

  // node_modules/@segment/analytics.js-integration-optimizely/node_modules/@segment/analytics.js-integration/lib/protos.js
  var require_protos2 = __commonJS({
    "node_modules/@segment/analytics.js-integration-optimizely/node_modules/@segment/analytics.js-integration/lib/protos.js"(exports) {
      "use strict";
      var Emitter = require_component_emitter();
      var each = require_each2();
      var events = require_lib18();
      var every = require_every();
      var fmt = require_lib13();
      var foldl = require_foldl();
      var is = require_is();
      var loadIframe = require_load_iframe();
      var loadScript = require_load_script();
      var nextTick = require_next_tick2();
      var normalize = require_to_no_case();
      var has = Object.prototype.hasOwnProperty;
      var noop = function noop2() {
      };
      var onerror = window.onerror;
      var onload = null;
      Emitter(exports);
      exports.initialize = function() {
        var ready = this.ready;
        nextTick(ready);
      };
      exports.loaded = function() {
        return false;
      };
      exports.page = function(page) {
      };
      exports.track = function(track) {
      };
      exports.map = function(options, key) {
        var normalizedComparator = normalize(key);
        var mappingType = getMappingType(options);
        if (mappingType === "unknown") {
          return [];
        }
        return foldl(function(matchingValues, val, key2) {
          var compare;
          var result;
          if (mappingType === "map") {
            compare = key2;
            result = val;
          }
          if (mappingType === "array") {
            compare = val;
            result = val;
          }
          if (mappingType === "mixed") {
            compare = val.key;
            result = val.value;
          }
          if (normalize(compare) === normalizedComparator) {
            matchingValues.push(result);
          }
          return matchingValues;
        }, [], options);
      };
      exports.invoke = function(method) {
        if (!this[method])
          return;
        var args = Array.prototype.slice.call(arguments, 1);
        if (!this._ready)
          return this.queue(method, args);
        this.debug("%s with %o", method, args);
        return this[method].apply(this, args);
      };
      exports.queue = function(method, args) {
        this._queue.push({ method, args });
      };
      exports.flush = function() {
        this._ready = true;
        var self2 = this;
        each(function(call) {
          self2[call.method].apply(self2, call.args);
        }, this._queue);
        this._queue.length = 0;
      };
      exports.reset = function() {
        for (var i = 0; i < this.globals.length; i++) {
          window[this.globals[i]] = void 0;
        }
        window.onerror = onerror;
        window.onload = onload;
      };
      exports.load = function(name2, locals, callback) {
        if (typeof name2 === "function") {
          callback = name2;
          locals = null;
          name2 = null;
        }
        if (name2 && typeof name2 === "object") {
          callback = locals;
          locals = name2;
          name2 = null;
        }
        if (typeof locals === "function") {
          callback = locals;
          locals = null;
        }
        name2 = name2 || "library";
        locals = locals || {};
        locals = this.locals(locals);
        var template = this.templates[name2];
        if (!template)
          throw new Error(fmt('template "%s" not defined.', name2));
        var attrs = render(template, locals);
        callback = callback || noop;
        var self2 = this;
        var el;
        switch (template.type) {
          case "img":
            attrs.width = 1;
            attrs.height = 1;
            el = loadImage(attrs, callback);
            break;
          case "script":
            el = loadScript(attrs, function(err) {
              if (!err)
                return callback();
              self2.debug('error loading "%s" error="%s"', self2.name, err);
            });
            delete attrs.src;
            each(function(val, key) {
              el.setAttribute(key, val);
            }, attrs);
            break;
          case "iframe":
            el = loadIframe(attrs, callback);
            break;
          default:
        }
        return el;
      };
      exports.locals = function(locals) {
        locals = locals || {};
        var cache = Math.floor(new Date().getTime() / 36e5);
        if (!locals.hasOwnProperty("cache"))
          locals.cache = cache;
        each(function(val, key) {
          if (!locals.hasOwnProperty(key))
            locals[key] = val;
        }, this.options);
        return locals;
      };
      exports.ready = function() {
        this.emit("ready");
      };
      exports._wrapInitialize = function() {
        var initialize = this.initialize;
        this.initialize = function() {
          this.debug("initialize");
          this._initialized = true;
          var ret = initialize.apply(this, arguments);
          this.emit("initialize");
          return ret;
        };
      };
      exports._wrapPage = function() {
        var page = this.page;
        var initialPageSkipped = false;
        this.page = function() {
          if (this._assumesPageview && !initialPageSkipped) {
            initialPageSkipped = true;
            return;
          }
          return page.apply(this, arguments);
        };
      };
      exports._wrapTrack = function() {
        var t = this.track;
        this.track = function(track) {
          var event = track.event();
          var called;
          var ret;
          for (var method in events) {
            if (has.call(events, method)) {
              var regexp = events[method];
              if (!this[method])
                continue;
              if (!regexp.test(event))
                continue;
              ret = this[method].apply(this, arguments);
              called = true;
              break;
            }
          }
          if (!called)
            ret = t.apply(this, arguments);
          return ret;
        };
      };
      function getMappingType(mapping) {
        if (is.array(mapping)) {
          return every(isMixed, mapping) ? "mixed" : "array";
        }
        if (is.object(mapping))
          return "map";
        return "unknown";
      }
      function isMixed(item) {
        if (!is.object(item))
          return false;
        if (!is.string(item.key))
          return false;
        if (!has.call(item, "value"))
          return false;
        return true;
      }
      function loadImage(attrs, fn) {
        fn = fn || function() {
        };
        var img = new Image();
        img.onerror = error(fn, "failed to load pixel", img);
        img.onload = function() {
          fn();
        };
        img.src = attrs.src;
        img.width = 1;
        img.height = 1;
        return img;
      }
      function error(fn, message, img) {
        return function(e) {
          e = e || window.event;
          var err = new Error(message);
          err.event = e;
          err.source = img;
          fn(err);
        };
      }
      function render(template, locals) {
        return foldl(function(attrs, val, key) {
          attrs[key] = val.replace(/\{\{\ *(\w+)\ *\}\}/g, function(_, $1) {
            return locals[$1];
          });
          return attrs;
        }, {}, template.attrs);
      }
    }
  });

  // node_modules/@segment/analytics.js-integration-optimizely/node_modules/@segment/analytics.js-integration/lib/statics.js
  var require_statics2 = __commonJS({
    "node_modules/@segment/analytics.js-integration-optimizely/node_modules/@segment/analytics.js-integration/lib/statics.js"(exports) {
      "use strict";
      var Emitter = require_component_emitter();
      var domify = require_domify();
      var each = require_each2();
      var includes = require_includes();
      Emitter(exports);
      exports.option = function(key, value) {
        this.prototype.defaults[key] = value;
        return this;
      };
      exports.mapping = function(name2) {
        this.option(name2, []);
        this.prototype[name2] = function(key) {
          return this.map(this.options[name2], key);
        };
        return this;
      };
      exports.global = function(key) {
        this.prototype.globals.push(key);
        return this;
      };
      exports.assumesPageview = function() {
        this.prototype._assumesPageview = true;
        return this;
      };
      exports.readyOnLoad = function() {
        this.prototype._readyOnLoad = true;
        return this;
      };
      exports.readyOnInitialize = function() {
        this.prototype._readyOnInitialize = true;
        return this;
      };
      exports.tag = function(name2, tag) {
        if (tag == null) {
          tag = name2;
          name2 = "library";
        }
        this.prototype.templates[name2] = objectify(tag);
        return this;
      };
      function objectify(str) {
        str = str.replace(' src="', ' data-src="');
        var el = domify(str);
        var attrs = {};
        each(function(attr) {
          var name2 = attr.name === "data-src" ? "src" : attr.name;
          if (!includes(attr.name + "=", str))
            return;
          attrs[name2] = attr.value;
        }, el.attributes);
        return {
          type: el.tagName.toLowerCase(),
          attrs
        };
      }
    }
  });

  // node_modules/@segment/analytics.js-integration-optimizely/node_modules/@segment/analytics.js-integration/lib/index.js
  var require_lib19 = __commonJS({
    "node_modules/@segment/analytics.js-integration-optimizely/node_modules/@segment/analytics.js-integration/lib/index.js"(exports, module) {
      "use strict";
      var bind = require_component_bind();
      var debug = require_browser();
      var defaults = require_defaults();
      var extend = require_extend();
      var slug = require_slug_component();
      var protos = require_protos2();
      var statics = require_statics2();
      function createIntegration(name2) {
        function Integration(options) {
          if (options && options.addIntegration) {
            return options.addIntegration(Integration);
          }
          this.debug = debug("analytics:integration:" + slug(name2));
          var clonedOpts = {};
          extend(true, clonedOpts, options);
          this.options = defaults(clonedOpts || {}, this.defaults);
          this._queue = [];
          this.once("ready", bind(this, this.flush));
          Integration.emit("construct", this);
          this.ready = bind(this, this.ready);
          this._wrapInitialize();
          this._wrapPage();
          this._wrapTrack();
        }
        Integration.prototype.defaults = {};
        Integration.prototype.globals = [];
        Integration.prototype.templates = {};
        Integration.prototype.name = name2;
        extend(Integration, statics);
        extend(Integration.prototype, protos);
        return Integration;
      }
      module.exports = createIntegration;
    }
  });

  // node_modules/global-queue/index.js
  var require_global_queue = __commonJS({
    "node_modules/global-queue/index.js"(exports, module) {
      var debug = require_browser();
      module.exports = generate;
      function generate(name2, options) {
        var log = debug("global-queue:" + name2);
        options = options || {};
        return function(args) {
          args = [].slice.call(arguments);
          window[name2] || (window[name2] = []);
          log("%o", args);
          options.wrap === false ? window[name2].push.apply(window[name2], args) : window[name2].push(args);
        };
      }
    }
  });

  // node_modules/@segment/analytics.js-integration-optimizely/node_modules/next-tick/index.js
  var require_next_tick3 = __commonJS({
    "node_modules/@segment/analytics.js-integration-optimizely/node_modules/next-tick/index.js"(exports, module) {
      "use strict";
      var ensureCallable = function(fn) {
        if (typeof fn !== "function")
          throw new TypeError(fn + " is not a function");
        return fn;
      };
      var byObserver = function(Observer) {
        var node = document.createTextNode(""), queue, currentQueue, i = 0;
        new Observer(function() {
          var callback;
          if (!queue) {
            if (!currentQueue)
              return;
            queue = currentQueue;
          } else if (currentQueue) {
            queue = currentQueue.concat(queue);
          }
          currentQueue = queue;
          queue = null;
          if (typeof currentQueue === "function") {
            callback = currentQueue;
            currentQueue = null;
            callback();
            return;
          }
          node.data = i = ++i % 2;
          while (currentQueue) {
            callback = currentQueue.shift();
            if (!currentQueue.length)
              currentQueue = null;
            callback();
          }
        }).observe(node, { characterData: true });
        return function(fn) {
          ensureCallable(fn);
          if (queue) {
            if (typeof queue === "function")
              queue = [queue, fn];
            else
              queue.push(fn);
            return;
          }
          queue = fn;
          node.data = i = ++i % 2;
        };
      };
      module.exports = function() {
        if (typeof process === "object" && process && typeof process.nextTick === "function") {
          return process.nextTick;
        }
        if (typeof queueMicrotask === "function") {
          return function(cb) {
            queueMicrotask(ensureCallable(cb));
          };
        }
        if (typeof document === "object" && document) {
          if (typeof MutationObserver === "function")
            return byObserver(MutationObserver);
          if (typeof WebKitMutationObserver === "function")
            return byObserver(WebKitMutationObserver);
        }
        if (typeof setImmediate === "function") {
          return function(cb) {
            setImmediate(ensureCallable(cb));
          };
        }
        if (typeof setTimeout === "function" || typeof setTimeout === "object") {
          return function(cb) {
            setTimeout(ensureCallable(cb), 0);
          };
        }
        return null;
      }();
    }
  });

  // node_modules/@segment/analytics.js-integration-optimizely/lib/index.js
  var require_lib20 = __commonJS({
    "node_modules/@segment/analytics.js-integration-optimizely/lib/index.js"(exports, module) {
      "use strict";
      var keys = require_keys();
      var values = require_values();
      var foldl = require_foldl();
      var each = require_each2();
      var integration = require_lib19();
      var push = require_global_queue()("optimizely", { wrap: false });
      var tick = require_next_tick3();
      var Optimizely = module.exports = integration("Optimizely").option("trackCategorizedPages", true).option("trackNamedPages", true).option("variations", false).option("listen", true).option("nonInteraction", false).option("sendRevenueOnlyForOrderCompleted", true).option("customExperimentProperties", {}).option("customCampaignProperties", {});
      var optimizelyContext = {
        name: "optimizely",
        version: "2.0.0"
      };
      Optimizely.prototype.initialize = function() {
        var self2 = this;
        push({
          type: "integration",
          OAuthClientId: "5360906403"
        });
        tick(function() {
          Optimizely.initOptimizelyIntegration({
            referrerOverride: self2.setEffectiveReferrer.bind(self2),
            sendExperimentData: self2.sendClassicDataToSegment.bind(self2),
            sendCampaignData: self2.sendNewDataToSegment.bind(self2)
          });
        });
        this.ready();
      };
      Optimizely.prototype.track = function(track) {
        var opts = this.options;
        var eventProperties = track.properties();
        if (eventProperties.revenue && opts.sendRevenueOnlyForOrderCompleted) {
          if (track.event() === "Order Completed") {
            eventProperties.revenue = Math.round(eventProperties.revenue * 100);
          } else if (track.event() !== "Order Completed") {
            delete eventProperties.revenue;
          }
        } else if (opts.sendRevenueOnlyForOrderCompleted === false && eventProperties.revenue) {
          eventProperties.revenue = Math.round(eventProperties.revenue * 100);
        }
        var eventName = track.event().replace(/:/g, "_");
        var payload = {
          type: "event",
          eventName,
          tags: eventProperties
        };
        push(payload);
        var optimizelyClientInstance = window.optimizelyClientInstance;
        if (optimizelyClientInstance && optimizelyClientInstance.track) {
          var optimizelyOptions = track.options("Optimizely");
          var userId = optimizelyOptions.userId || track.userId() || this.analytics.user().id();
          var attributes = optimizelyOptions.attributes || track.traits() || this.analytics.user().traits();
          if (userId) {
            optimizelyClientInstance.track(eventName, userId, attributes, payload.tags);
          }
        }
      };
      Optimizely.prototype.page = function(page) {
        var category = page.category();
        var name2 = page.fullName();
        var opts = this.options;
        if (category && opts.trackCategorizedPages) {
          this.track(page.track(category));
        }
        if (name2 && opts.trackNamedPages) {
          this.track(page.track(name2));
        }
      };
      Optimizely.prototype.sendClassicDataToSegment = function(experimentState) {
        var experiment = experimentState.experiment;
        var variations = experimentState.variations;
        var sections = experimentState.sections;
        var context = { integration: optimizelyContext };
        var variationsMap = foldl(function(results, variation) {
          var res = results;
          res[variation.id] = variation.name;
          return res;
        }, {}, variations);
        var variationIds = keys(variationsMap).sort();
        var variationNames = values(variationsMap).sort();
        if (this.options.listen) {
          var props = {
            experimentId: experiment.id,
            experimentName: experiment.name,
            variationId: variationIds.join(),
            variationName: variationNames.join(", ")
          };
          if (experiment.referrer) {
            props.referrer = experiment.referrer;
            context.page = { referrer: experiment.referrer };
          }
          if (sections) {
            var activeSections = {};
            var variationIdsToSectionsMap = foldl(function(results, section, sectionId) {
              var res = results;
              each(function(variationId) {
                res[variationId] = { id: sectionId, name: section.name };
              }, section.variation_ids);
              return res;
            }, {}, sections);
            for (var j = 0; j < variationIds.length; j++) {
              var activeVariation = variationIds[j];
              var activeSection = variationIdsToSectionsMap[activeVariation];
              if (activeSection)
                activeSections[activeSection.id] = activeSection.name;
            }
            props.sectionId = keys(activeSections).sort().join();
            props.sectionName = values(activeSections).sort().join(", ");
          }
          if (this.options.nonInteraction)
            props.nonInteraction = 1;
          var customExperimentProperties = this.options.customExperimentProperties;
          var customPropsKeys = Object.keys(customExperimentProperties);
          var data = window.optimizely && window.optimizely.data;
          if (data && customPropsKeys.length) {
            for (var index = 0; index < customPropsKeys.length; index++) {
              var segmentProp = customPropsKeys[index];
              var optimizelyProp = customExperimentProperties[segmentProp];
              if (typeof data[optimizelyProp] !== "undefined") {
                props[segmentProp] = data[optimizelyProp];
              }
            }
          }
          this.analytics.track("Experiment Viewed", props, context);
        }
        if (this.options.variations) {
          var traits = {};
          traits["Experiment: " + experiment.name] = variationNames.join(", ");
          this.analytics.identify(traits);
        }
      };
      Optimizely.prototype.sendNewDataToSegment = function(campaignState) {
        var experiment = campaignState.experiment;
        var variation = campaignState.variation;
        var context = { integration: optimizelyContext };
        var audiencesMap = foldl(function(results, audience) {
          var res = results;
          res[audience.id] = audience.name;
          return res;
        }, {}, campaignState.audiences);
        var audienceIds = keys(audiencesMap).sort().join();
        var audienceNames = values(audiencesMap).sort().join(", ");
        if (this.options.listen) {
          var props = {
            campaignName: campaignState.campaignName,
            campaignId: campaignState.id,
            experimentId: experiment.id,
            experimentName: experiment.name,
            variationName: variation.name,
            variationId: variation.id,
            audienceId: audienceIds,
            audienceName: audienceNames,
            isInCampaignHoldback: campaignState.isInCampaignHoldback
          };
          if (experiment.referrer) {
            props.referrer = experiment.referrer;
            context.page = { referrer: experiment.referrer };
          }
          if (this.options.nonInteraction)
            props.nonInteraction = 1;
          var customCampaignProperties = this.options.customCampaignProperties;
          var customPropsKeys = Object.keys(customCampaignProperties);
          var data = window.optimizely && window.optimizely.newMockData;
          if (data && customPropsKeys.length) {
            for (var index = 0; index < customPropsKeys.length; index++) {
              var segmentProp = customPropsKeys[index];
              var optimizelyProp = customCampaignProperties[segmentProp];
              if (typeof data[optimizelyProp] !== "undefined") {
                props[segmentProp] = data[optimizelyProp];
              }
            }
          }
          this.analytics.track("Experiment Viewed", props, context);
        }
        if (this.options.variations) {
          var traits = {};
          traits["Experiment: " + experiment.name] = variation.name;
          this.analytics.identify(traits);
        }
      };
      Optimizely.prototype.setEffectiveReferrer = function(referrer) {
        if (referrer) {
          window.optimizelyEffectiveReferrer = referrer;
          return referrer;
        }
      };
      Optimizely.initOptimizelyIntegration = function(handlers) {
        var initClassicOptimizelyIntegration = function(referrerOverride, sendExperimentData) {
          var data = window.optimizely && window.optimizely.data;
          var state = data && data.state;
          if (state) {
            var activeExperiments = state.activeExperiments;
            if (state.redirectExperiment) {
              var redirectExperimentId = state.redirectExperiment.experimentId;
              var index = -1;
              for (var i = 0; i < state.activeExperiments.length; i++) {
                if (state.activeExperiments[i] === redirectExperimentId) {
                  index = i;
                  break;
                }
              }
              if (index === -1) {
                activeExperiments.push(redirectExperimentId);
              }
              referrerOverride(state.redirectExperiment.referrer);
            }
            for (var k = 0; k < activeExperiments.length; k++) {
              var currentExperimentId = activeExperiments[k];
              var activeExperimentState = {
                experiment: {
                  id: currentExperimentId,
                  name: data.experiments[currentExperimentId].name
                },
                variations: [],
                sections: data.sections
              };
              if (state.redirectExperiment && currentExperimentId === state.redirectExperiment.experimentId && state.redirectExperiment.referrer) {
                activeExperimentState.experiment.referrer = state.redirectExperiment.referrer;
              }
              var variationIds = state.variationIdsMap[activeExperimentState.experiment.id];
              for (var j = 0; j < variationIds.length; j++) {
                var id = variationIds[j];
                var name2 = data.variations[id].name;
                activeExperimentState.variations.push({
                  id,
                  name: name2
                });
              }
              sendExperimentData(activeExperimentState);
            }
          }
        };
        var initNewOptimizelyIntegration = function(referrerOverride, sendCampaignData) {
          var newActiveCampaign = function(id, referrer) {
            var state = window.optimizely.get && window.optimizely.get("state");
            if (state) {
              var activeCampaigns = state.getCampaignStates({
                isActive: true
              });
              var campaignState = activeCampaigns[id];
              if (referrer)
                campaignState.experiment.referrer = referrer;
              sendCampaignData(campaignState);
            }
          };
          var checkReferrer = function() {
            var state = window.optimizely.get && window.optimizely.get("state");
            if (state) {
              var referrer = state.getRedirectInfo() && state.getRedirectInfo().referrer;
              if (referrer) {
                referrerOverride(referrer);
                return referrer;
              }
            }
          };
          var registerFutureActiveCampaigns = function() {
            window.optimizely = window.optimizely || [];
            window.optimizely.push({
              type: "addListener",
              filter: {
                type: "lifecycle",
                name: "campaignDecided"
              },
              handler: function(event) {
                var id = event.data.campaign.id;
                newActiveCampaign(id);
              }
            });
          };
          var registerCurrentlyActiveCampaigns = function() {
            window.optimizely = window.optimizely || [];
            var state = window.optimizely.get && window.optimizely.get("state");
            if (state) {
              var referrer = checkReferrer();
              var activeCampaigns = state.getCampaignStates({
                isActive: true
              });
              for (var id in activeCampaigns) {
                if ({}.hasOwnProperty.call(activeCampaigns, id)) {
                  if (referrer) {
                    newActiveCampaign(id, referrer);
                  } else {
                    newActiveCampaign(id);
                  }
                }
              }
            } else {
              window.optimizely.push({
                type: "addListener",
                filter: {
                  type: "lifecycle",
                  name: "initialized"
                },
                handler: function() {
                  checkReferrer();
                }
              });
            }
          };
          registerCurrentlyActiveCampaigns();
          registerFutureActiveCampaigns();
        };
        initClassicOptimizelyIntegration(handlers.referrerOverride, handlers.sendExperimentData);
        initNewOptimizelyIntegration(handlers.referrerOverride, handlers.sendCampaignData);
      };
    }
  });

  // node_modules/@segment/analytics.js-integration-google-analytics-4/node_modules/analytics-events/lib/index.js
  var require_lib21 = __commonJS({
    "node_modules/@segment/analytics.js-integration-google-analytics-4/node_modules/analytics-events/lib/index.js"(exports, module) {
      "use strict";
      var map = require_map2();
      var foldl = require_foldl();
      var eventMap = {
        videoPlaybackStarted: [{
          object: "video playback",
          action: "started"
        }],
        videoPlaybackPaused: [{
          object: "video playback",
          action: "paused"
        }],
        videoPlaybackInterrupted: [{
          object: "video playback",
          action: "interrupted"
        }],
        videoPlaybackResumed: [{
          object: "video playback",
          action: "resumed"
        }],
        videoPlaybackCompleted: [{
          object: "video playback",
          action: "completed"
        }],
        videoPlaybackExited: [{
          object: "video playback",
          action: "exited"
        }],
        videoPlaybackBufferStarted: [{
          object: "video playback buffer",
          action: "started"
        }],
        videoPlaybackBufferCompleted: [{
          object: "video playback buffer",
          action: "completed"
        }],
        videoPlaybackSeekStarted: [{
          object: "video playback seek",
          action: "started"
        }],
        videoPlaybackSeekCompleted: [{
          object: "video playback seek",
          action: "completed"
        }],
        videoContentStarted: [{
          object: "video content",
          action: "started"
        }],
        videoContentPlaying: [{
          object: "video content",
          action: "playing"
        }],
        videoContentCompleted: [{
          object: "video content",
          action: "completed"
        }],
        videoAdStarted: [{
          object: "video ad",
          action: "started"
        }],
        videoAdPlaying: [{
          object: "video ad",
          action: "playing"
        }],
        videoAdCompleted: [{
          object: "video ad",
          action: "completed"
        }],
        videoAdClicked: [{
          object: "video ad",
          action: "clicked"
        }],
        videoAdSkipped: [{
          object: "video ad",
          action: "skipped"
        }],
        promotionViewed: [{
          object: "promotion",
          action: "viewed"
        }],
        promotionClicked: [{
          object: "promotion",
          action: "clicked"
        }],
        productsSearched: [{
          object: "products",
          action: "searched"
        }],
        productListViewed: [{
          object: "product list",
          action: "viewed"
        }, {
          object: "product category",
          action: "viewed"
        }],
        productListFiltered: [{
          object: "product list",
          action: "filtered"
        }],
        productClicked: [{
          object: "product",
          action: "clicked"
        }],
        productViewed: [{
          object: "product",
          action: "viewed"
        }],
        productAdded: [{
          object: "product",
          action: "added"
        }],
        productRemoved: [{
          object: "product",
          action: "removed"
        }],
        cartViewed: [{
          object: "cart",
          action: "viewed"
        }],
        orderUpdated: [{
          object: "order",
          action: "updated"
        }],
        orderCompleted: [{
          object: "order",
          action: "completed"
        }],
        orderRefunded: [{
          object: "order",
          action: "refunded"
        }],
        orderCancelled: [{
          object: "order",
          action: "cancelled"
        }],
        paymentInfoEntered: [{
          object: "payment info",
          action: "entered"
        }],
        checkoutStarted: [{
          object: "checkout",
          action: "started"
        }],
        checkoutStepViewed: [{
          object: "checkout step",
          action: "viewed"
        }],
        checkoutStepCompleted: [{
          object: "checkout step",
          action: "completed"
        }],
        couponEntered: [{
          object: "coupon",
          action: "entered"
        }],
        couponApplied: [{
          object: "coupon",
          action: "applied"
        }],
        couponDenied: [{
          object: "coupon",
          action: "denied"
        }],
        couponRemoved: [{
          object: "coupon",
          action: "removed"
        }],
        productAddedToWishlist: [{
          object: "product",
          action: "added to wishlist"
        }],
        productRemovedFromWishlist: [{
          object: "product",
          action: "removed from wishlist"
        }],
        productAddedFromWishlistToCart: [{
          object: "product",
          action: "added to cart from wishlist"
        }, {
          object: "product",
          action: "added from wishlist to cart"
        }],
        wishlistProductAddedToCart: [{
          object: "wishlist product",
          action: "added to cart"
        }],
        productShared: [{
          object: "product",
          action: "shared"
        }],
        cartShared: [{
          object: "cart",
          action: "shared"
        }],
        productReviewed: [{
          object: "product",
          action: "reviewed"
        }],
        applicationInstalled: [{
          object: "application",
          action: "installed"
        }],
        applicationUpdated: [{
          object: "application",
          action: "updated"
        }],
        applicationOpened: [{
          object: "application",
          action: "opened"
        }],
        applicationBackgrounded: [{
          object: "application",
          action: "backgrounded"
        }],
        applicationUninstalled: [{
          object: "application",
          action: "uninstalled"
        }],
        applicationCrashed: [{
          object: "application",
          action: "crashed"
        }],
        installAttributed: [{
          object: "install",
          action: "attributed"
        }],
        deepLinkOpened: [{
          object: "deep link",
          action: "opened"
        }],
        deepLinkClicked: [{
          object: "deep link",
          action: "clicked"
        }],
        pushNotificationReceived: [{
          object: "push notification",
          action: "received"
        }],
        pushNotificationTapped: [{
          object: "push notification",
          action: "tapped"
        }],
        pushNotificationBounced: [{
          object: "push notification",
          action: "bounced"
        }],
        emailBounced: [{
          object: "email",
          action: "bounced"
        }],
        emailDelivered: [{
          object: "email",
          action: "delivered"
        }],
        emailLinkClicked: [{
          object: "email link",
          action: "clicked"
        }],
        emailMarkedAsSpam: [{
          object: "email",
          action: "marked as spam"
        }],
        emailOpened: [{
          object: "email",
          action: "opened"
        }],
        unsubscribed: [{
          object: "",
          action: "unsubscribed"
        }],
        liveChatConversationEnded: [{
          object: "live chat conversation",
          action: "ended"
        }],
        liveChatConversationStarted: [{
          object: "live chat conversation",
          action: "started"
        }],
        liveChatMessageReceived: [{
          object: "live chat message",
          action: "received"
        }],
        liveChatMessageSent: [{
          object: "live chat message",
          action: "sent"
        }]
      };
      module.exports = foldl(function transform(ret, pairs, method) {
        var values = map(function(pair) {
          return map(function(permutation) {
            var flattened = [].concat.apply([], map(function(words) {
              return words.split(" ");
            }, permutation));
            return "^[ _]?" + flattened.join("[ _]?") + "[ _]?";
          }, [
            [pair.action, pair.object],
            [pair.object, pair.action]
          ]).join("|");
        }, pairs);
        var conjoined = values.join("|") + "$";
        ret[method] = new RegExp(conjoined, "i");
        return ret;
      }, {}, eventMap);
    }
  });

  // node_modules/@segment/analytics.js-integration-google-analytics-4/node_modules/@segment/analytics.js-integration/lib/protos.js
  var require_protos3 = __commonJS({
    "node_modules/@segment/analytics.js-integration-google-analytics-4/node_modules/@segment/analytics.js-integration/lib/protos.js"(exports) {
      "use strict";
      var Emitter = require_component_emitter();
      var each = require_each2();
      var events = require_lib21();
      var every = require_every();
      var fmt = require_lib13();
      var foldl = require_foldl();
      var is = require_is();
      var loadIframe = require_load_iframe();
      var loadScript = require_load_script();
      var nextTick = require_next_tick();
      var normalize = require_to_no_case();
      var has = Object.prototype.hasOwnProperty;
      var noop = function noop2() {
      };
      var onerror = window.onerror;
      var onload = null;
      Emitter(exports);
      exports.initialize = function() {
        var ready = this.ready;
        nextTick(ready);
      };
      exports.loaded = function() {
        return false;
      };
      exports.page = function(page) {
      };
      exports.track = function(track) {
      };
      exports.map = function(options, key) {
        var normalizedComparator = normalize(key);
        var mappingType = getMappingType(options);
        if (mappingType === "unknown") {
          return [];
        }
        return foldl(function(matchingValues, val, key2) {
          var compare;
          var result;
          if (mappingType === "map") {
            compare = key2;
            result = val;
          }
          if (mappingType === "array") {
            compare = val;
            result = val;
          }
          if (mappingType === "mixed") {
            compare = val.key;
            result = val.value;
          }
          if (normalize(compare) === normalizedComparator) {
            matchingValues.push(result);
          }
          return matchingValues;
        }, [], options);
      };
      exports.invoke = function(method) {
        if (!this[method])
          return;
        var args = Array.prototype.slice.call(arguments, 1);
        if (!this._ready)
          return this.queue(method, args);
        this.debug("%s with %o", method, args);
        return this[method].apply(this, args);
      };
      exports.queue = function(method, args) {
        this._queue.push({ method, args });
      };
      exports.flush = function() {
        this._ready = true;
        var self2 = this;
        each(function(call) {
          self2[call.method].apply(self2, call.args);
        }, this._queue);
        this._queue.length = 0;
      };
      exports.reset = function() {
        for (var i = 0; i < this.globals.length; i++) {
          window[this.globals[i]] = void 0;
        }
        window.onerror = onerror;
        window.onload = onload;
      };
      exports.load = function(name2, locals, callback) {
        if (typeof name2 === "function") {
          callback = name2;
          locals = null;
          name2 = null;
        }
        if (name2 && typeof name2 === "object") {
          callback = locals;
          locals = name2;
          name2 = null;
        }
        if (typeof locals === "function") {
          callback = locals;
          locals = null;
        }
        name2 = name2 || "library";
        locals = locals || {};
        locals = this.locals(locals);
        var template = this.templates[name2];
        if (!template)
          throw new Error(fmt('template "%s" not defined.', name2));
        var attrs = render(template, locals);
        callback = callback || noop;
        var self2 = this;
        var el;
        switch (template.type) {
          case "img":
            attrs.width = 1;
            attrs.height = 1;
            el = loadImage(attrs, callback);
            break;
          case "script":
            el = loadScript(attrs, function(err) {
              if (!err)
                return callback();
              self2.debug('error loading "%s" error="%s"', self2.name, err);
            });
            delete attrs.src;
            each(function(val, key) {
              el.setAttribute(key, val);
            }, attrs);
            break;
          case "iframe":
            el = loadIframe(attrs, callback);
            break;
          default:
        }
        return el;
      };
      exports.locals = function(locals) {
        locals = locals || {};
        var cache = Math.floor(new Date().getTime() / 36e5);
        if (!locals.hasOwnProperty("cache"))
          locals.cache = cache;
        each(function(val, key) {
          if (!locals.hasOwnProperty(key))
            locals[key] = val;
        }, this.options);
        return locals;
      };
      exports.ready = function() {
        this.emit("ready");
      };
      exports._wrapInitialize = function() {
        var initialize = this.initialize;
        this.initialize = function() {
          this.debug("initialize");
          this._initialized = true;
          var ret = initialize.apply(this, arguments);
          this.emit("initialize");
          return ret;
        };
      };
      exports._wrapPage = function() {
        var page = this.page;
        var initialPageSkipped = false;
        this.page = function() {
          if (this._assumesPageview && !initialPageSkipped) {
            initialPageSkipped = true;
            return;
          }
          return page.apply(this, arguments);
        };
      };
      exports._wrapTrack = function() {
        var t = this.track;
        this.track = function(track) {
          var event = track.event();
          var called;
          var ret;
          for (var method in events) {
            if (has.call(events, method)) {
              var regexp = events[method];
              if (!this[method])
                continue;
              if (!regexp.test(event))
                continue;
              ret = this[method].apply(this, arguments);
              called = true;
              break;
            }
          }
          if (!called)
            ret = t.apply(this, arguments);
          return ret;
        };
      };
      function getMappingType(mapping) {
        if (is.array(mapping)) {
          return every(isMixed, mapping) ? "mixed" : "array";
        }
        if (is.object(mapping))
          return "map";
        return "unknown";
      }
      function isMixed(item) {
        if (!is.object(item))
          return false;
        if (!is.string(item.key))
          return false;
        if (!has.call(item, "value"))
          return false;
        return true;
      }
      function loadImage(attrs, fn) {
        fn = fn || function() {
        };
        var img = new Image();
        img.onerror = error(fn, "failed to load pixel", img);
        img.onload = function() {
          fn();
        };
        img.src = attrs.src;
        img.width = 1;
        img.height = 1;
        return img;
      }
      function error(fn, message, img) {
        return function(e) {
          e = e || window.event;
          var err = new Error(message);
          err.event = e;
          err.source = img;
          fn(err);
        };
      }
      function render(template, locals) {
        return foldl(function(attrs, val, key) {
          attrs[key] = val.replace(/\{\{\ *(\w+)\ *\}\}/g, function(_, $1) {
            return locals[$1];
          });
          return attrs;
        }, {}, template.attrs);
      }
    }
  });

  // node_modules/@segment/analytics.js-integration-google-analytics-4/node_modules/@segment/analytics.js-integration/lib/statics.js
  var require_statics3 = __commonJS({
    "node_modules/@segment/analytics.js-integration-google-analytics-4/node_modules/@segment/analytics.js-integration/lib/statics.js"(exports) {
      "use strict";
      var Emitter = require_component_emitter();
      var domify = require_domify();
      var each = require_each2();
      var includes = require_includes();
      Emitter(exports);
      exports.option = function(key, value) {
        this.prototype.defaults[key] = value;
        return this;
      };
      exports.mapping = function(name2) {
        this.option(name2, []);
        this.prototype[name2] = function(key) {
          return this.map(this.options[name2], key);
        };
        return this;
      };
      exports.global = function(key) {
        this.prototype.globals.push(key);
        return this;
      };
      exports.assumesPageview = function() {
        this.prototype._assumesPageview = true;
        return this;
      };
      exports.readyOnLoad = function() {
        this.prototype._readyOnLoad = true;
        return this;
      };
      exports.readyOnInitialize = function() {
        this.prototype._readyOnInitialize = true;
        return this;
      };
      exports.tag = function(name2, tag) {
        if (tag == null) {
          tag = name2;
          name2 = "library";
        }
        this.prototype.templates[name2] = objectify(tag);
        return this;
      };
      function objectify(str) {
        str = str.replace(' src="', ' data-src="');
        var el = domify(str);
        var attrs = {};
        each(function(attr) {
          var name2 = attr.name === "data-src" ? "src" : attr.name;
          if (!includes(attr.name + "=", str))
            return;
          attrs[name2] = attr.value;
        }, el.attributes);
        return {
          type: el.tagName.toLowerCase(),
          attrs
        };
      }
    }
  });

  // node_modules/@segment/analytics.js-integration-google-analytics-4/node_modules/@segment/analytics.js-integration/lib/index.js
  var require_lib22 = __commonJS({
    "node_modules/@segment/analytics.js-integration-google-analytics-4/node_modules/@segment/analytics.js-integration/lib/index.js"(exports, module) {
      "use strict";
      var bind = require_component_bind();
      var debug = require_browser();
      var defaults = require_defaults();
      var extend = require_extend();
      var slug = require_slug_component();
      var protos = require_protos3();
      var statics = require_statics3();
      function createIntegration(name2) {
        function Integration(options) {
          if (options && options.addIntegration) {
            return options.addIntegration(Integration);
          }
          this.debug = debug("analytics:integration:" + slug(name2));
          var clonedOpts = {};
          extend(true, clonedOpts, options);
          this.options = defaults(clonedOpts || {}, this.defaults);
          this._queue = [];
          this.once("ready", bind(this, this.flush));
          Integration.emit("construct", this);
          this.ready = bind(this, this.ready);
          this._wrapInitialize();
          this._wrapPage();
          this._wrapTrack();
        }
        Integration.prototype.defaults = {};
        Integration.prototype.globals = [];
        Integration.prototype.templates = {};
        Integration.prototype.name = name2;
        extend(Integration, statics);
        extend(Integration.prototype, protos);
        return Integration;
      }
      module.exports = createIntegration;
    }
  });

  // node_modules/reject/index.js
  var require_reject = __commonJS({
    "node_modules/reject/index.js"(exports, module) {
      var type = require_type_component();
      module.exports = reject;
      function reject(obj, fn) {
        fn = fn || compact;
        return type(obj) == "array" ? reject.array(obj, fn) : reject.object(obj, fn);
      }
      reject.array = function(arr, fn) {
        var ret = [];
        for (var i = 0; i < arr.length; ++i) {
          if (!fn(arr[i], i))
            ret[ret.length] = arr[i];
        }
        return ret;
      };
      reject.object = function(obj, fn) {
        var ret = {};
        for (var k in obj) {
          if (obj.hasOwnProperty(k) && !fn(obj[k], k)) {
            ret[k] = obj[k];
          }
        }
        return ret;
      };
      reject.types = reject.type = function(obj, types) {
        if (!Array.isArray(types))
          types = [types];
        return reject(obj, function(value) {
          return types.indexOf(type(value)) != -1;
        });
      };
      function compact(value) {
        return value == null;
      }
    }
  });

  // node_modules/@segment/analytics.js-integration-google-analytics-4/lib/index.js
  var require_lib23 = __commonJS({
    "node_modules/@segment/analytics.js-integration-google-analytics-4/lib/index.js"(exports, module) {
      "use strict";
      var integration = require_lib22();
      var reject = require_reject();
      var GA4 = module.exports = integration("Google Analytics 4").global("gtag").global("ga4DataLayer").option("measurementIds", []).option("cookieDomainName", "auto").option("cookiePrefix", "_ga").option("cookieExpiration", 63072e3).option("cookieUpdate", true).option("cookieFlags", "").option("sendAutomaticPageViewEvent", false).option("allowAllAdvertisingFeatures", false).option("allowAdvertisingPersonalization", false).option("disableGoogleAnalytics", false).option("googleReportingIdentity", "device").option("userProperties", {}).option("customEventsAndParameters", []).tag('<script src="//www.googletagmanager.com/gtag/js?id={{ measurementId }}&l=ga4DataLayer">');
      GA4.prototype.initialize = function() {
        window.ga4DataLayer = window.ga4DataLayer || [];
        window.gtag = function() {
          window.ga4DataLayer.push(arguments);
        };
        window.gtag("js", new Date());
        var opts = this.options;
        var measurementIds = opts.measurementIds;
        if (!measurementIds.length || opts.disableGoogleAnalytics) {
          return;
        }
        var config = {
          send_page_view: opts.sendAutomaticPageViewEvent,
          cookie_update: opts.cookieUpdate,
          cookie_domain: opts.cookieDomainName,
          cookie_prefix: opts.cookiePrefix,
          cookie_expires: opts.cookieExpiration
        };
        var sets = [
          [{ cookie_flags: opts.cookieFlags }],
          ["allow_google_signals", opts.allowAllAdvertisingFeatures],
          ["allow_ad_personalization_signals", opts.allowAdvertisingPersonalization]
        ];
        var self2 = this;
        this.load({ measurementId: measurementIds[0] }, function() {
          for (var i = 0; i < measurementIds.length; i++) {
            window.gtag("config", measurementIds[i], config);
          }
          for (var i = 0; i < sets.length; i++) {
            var args = sets[i].slice(0);
            args.unshift("set");
            window.gtag.apply(null, args);
          }
          self2.ready();
        });
      };
      GA4.prototype.loaded = function() {
        return !!(window.ga4DataLayer && Array.prototype.push !== window.ga4DataLayer.push);
      };
      GA4.prototype.identify = function(identify) {
        var opts = this.options;
        var userPropertyMappings = opts.userProperties;
        var userProperties = {};
        for (var eventField in userPropertyMappings) {
          if (!userPropertyMappings.hasOwnProperty(eventField)) {
            continue;
          }
          var userProp = userPropertyMappings[eventField];
          var value = identify.proxy(eventField);
          userProperties[userProp] = value;
        }
        var userId = identify.userId();
        var validReportingIdentity = opts.googleReportingIdentity === "userIdSignalsAndDevice" || opts.googleReportingIdentity === "userIdAndDevice";
        if (userId && validReportingIdentity) {
          userProperties.user_id = userId;
        }
        if (Object.keys(userProperties).length) {
          window.gtag("set", "user_properties", userProperties);
        }
      };
      GA4.prototype.group = function(group) {
        window.gtag("event", "join_group", {
          group_id: group.groupId()
        });
      };
      GA4.prototype.page = function(page) {
        if (this.options.sendAutomaticPageViewEvent) {
          return;
        }
        var props = page.properties();
        var name2 = page.fullName();
        var pageLocation = props.url;
        var pageReferrer = page.referrer();
        var pageTitle = name2 || props.title;
        window.gtag("event", "page_view", {
          page_location: pageLocation,
          page_referrer: pageReferrer,
          page_title: pageTitle
        });
      };
      GA4.prototype.track = function(track) {
        var mappings = this.options.customEventsAndParameters;
        for (var i = 0; i < mappings.length; i++) {
          var mapping = mappings[i];
          if (typeof mapping !== "object") {
            continue;
          }
          var segmentEvent = mapping.segmentEvent;
          var googleEvent = mapping.googleEvent;
          if (!segmentEvent || !googleEvent || segmentEvent !== track.event()) {
            continue;
          }
          var parameterMappings = mapping.parameters || [];
          var parameters = {};
          if (!(parameterMappings instanceof Array)) {
            continue;
          }
          for (var j = 0; j < parameterMappings.length; j++) {
            var map = parameterMappings[j] || {};
            if (typeof map !== "object" || !map.key || !map.value) {
              continue;
            }
            var param = map.value;
            var value = track.proxy(map.key);
            parameters[param] = value;
          }
          window.gtag("event", googleEvent, parameters);
        }
      };
    }
  });

  // node_modules/component-querystring/node_modules/trim/index.js
  var require_trim2 = __commonJS({
    "node_modules/component-querystring/node_modules/trim/index.js"(exports, module) {
      exports = module.exports = trim;
      function trim(str) {
        return str.replace(/^\s*|\s*$/g, "");
      }
      exports.left = function(str) {
        return str.replace(/^\s*/, "");
      };
      exports.right = function(str) {
        return str.replace(/\s*$/, "");
      };
    }
  });

  // node_modules/component-querystring/node_modules/component-type/index.js
  var require_component_type2 = __commonJS({
    "node_modules/component-querystring/node_modules/component-type/index.js"(exports, module) {
      var toString = Object.prototype.toString;
      module.exports = function(val) {
        switch (toString.call(val)) {
          case "[object Date]":
            return "date";
          case "[object RegExp]":
            return "regexp";
          case "[object Arguments]":
            return "arguments";
          case "[object Array]":
            return "array";
          case "[object Error]":
            return "error";
        }
        if (val === null)
          return "null";
        if (val === void 0)
          return "undefined";
        if (val !== val)
          return "nan";
        if (val && val.nodeType === 1)
          return "element";
        val = val.valueOf ? val.valueOf() : Object.prototype.valueOf.apply(val);
        return typeof val;
      };
    }
  });

  // node_modules/component-querystring/index.js
  var require_component_querystring = __commonJS({
    "node_modules/component-querystring/index.js"(exports) {
      var encode = encodeURIComponent;
      var decode = decodeURIComponent;
      var trim = require_trim2();
      var type = require_component_type2();
      var pattern = /(\w+)\[(\d+)\]/;
      exports.parse = function(str) {
        if (typeof str != "string")
          return {};
        str = trim(str);
        if (str == "")
          return {};
        if (str.charAt(0) == "?")
          str = str.slice(1);
        var obj = {};
        var pairs = str.split("&");
        for (var i = 0; i < pairs.length; i++) {
          var parts = pairs[i].split("=");
          var key = decode(parts[0]);
          var m;
          if (m = pattern.exec(key)) {
            obj[m[1]] = obj[m[1]] || [];
            obj[m[1]][m[2]] = decode(parts[1]);
            continue;
          }
          obj[parts[0]] = parts[1] == null ? "" : decode(parts[1]);
        }
        return obj;
      };
      exports.stringify = function(obj) {
        if (!obj)
          return "";
        var pairs = [];
        for (var key in obj) {
          var value = obj[key];
          if (type(value) == "array") {
            for (var i = 0; i < value.length; ++i) {
              pairs.push(encode(key + "[" + i + "]") + "=" + encode(value[i]));
            }
            continue;
          }
          pairs.push(encode(key) + "=" + encode(obj[key]));
        }
        return pairs.join("&");
      };
    }
  });

  // node_modules/use-https/index.js
  var require_use_https = __commonJS({
    "node_modules/use-https/index.js"(exports, module) {
      module.exports = function(url) {
        switch (arguments.length) {
          case 0:
            return check();
          case 1:
            return transform(url);
        }
      };
      function transform(url) {
        return check() ? "https:" + url : "http:" + url;
      }
      function check() {
        return location.protocol == "https:" || location.protocol == "chrome-extension:";
      }
    }
  });

  // node_modules/@segment/analytics.js-integration-pardot/lib/index.js
  var require_lib24 = __commonJS({
    "node_modules/@segment/analytics.js-integration-pardot/lib/index.js"(exports, module) {
      "use strict";
      var cookie = require_component_cookie();
      var each = require_each2();
      var integration = require_lib14();
      var load = require_load_script();
      var querystring = require_component_querystring();
      var useHttps = require_use_https();
      var has = Object.prototype.hasOwnProperty;
      var Pardot = module.exports = integration("Pardot").assumesPageview().global("pi").global("piAId").global("piCId").global("piTracker").option("projectId", "").option("piAId", "").option("piCId", "").tag("http", '<script src="http://cdn.pardot.com/pd.js">').tag("https", '<script src="https://pi.pardot.com/pd.js">');
      Pardot.prototype.initialize = function() {
        window.piAId = this.options.piAId;
        window.piCId = this.options.piCId;
        var name2 = useHttps() ? "https" : "http";
        this.load(name2, this.ready);
      };
      Pardot.prototype.loaded = function() {
        return !!window.piTracker;
      };
      Pardot.prototype.identify = function(identify) {
        var traits = identify.traits();
        var email = identify.email();
        if (email)
          traits.email = email;
        if (doNotTrack())
          return;
        if (!traits.email)
          return;
        var variables = this.getRequestVariables();
        variables.pi_email = traits.email;
        load("//pi.pardot.com/analytics?" + querystring.stringify(variables));
      };
      Pardot.prototype.getRequestVariables = function() {
        var variables = {
          account_id: window.piAId,
          campaign_id: window.piCId,
          pi_opt_in: cookie("pi_opt_in" + (this.options.piAId - 1e3)),
          ver: 3,
          visitor_id: cookie("visitor_id" + (this.options.piAId - 1e3))
        };
        var queryParams = query();
        var queryKeys = ["pi_email"];
        each(function(key) {
          if (key in queryParams)
            variables[key] = queryParams[key];
        }, queryKeys);
        if (window.piIncludeInActivities !== void 0) {
          variables.pi_include_in_activies = window.piIncludeInActivities;
        }
        if (window.piProfileId !== void 0) {
          variables.pi_profile_id = window.piProfileId;
        }
        if (window.pi && window.pi.tracker) {
          for (var property in variables) {
            if (has.call(variables, property)) {
              var val = window.pi.tracker[property];
              if (val)
                variables[property] = val;
            }
          }
        }
        return variables;
      };
      function doNotTrack() {
        var p = window.pi;
        if (!p)
          return false;
        if (!p.tracker)
          return false;
        if (String(p.tracker.pi_opt_in) === "false")
          return false;
        if (!p.tracker.title)
          return false;
        if (!p.tracker.notify_pi)
          return false;
        return true;
      }
      function query() {
        return querystring.parse(location.search.slice(1));
      }
    }
  });

  // lib/index.js
  var import_analytics = __toESM(require_build());
  var integrations = [
    require_lib15(),
    require_lib17(),
    require_lib20(),
    require_lib23(),
    require_lib24()
  ];
  integrations.forEach(import_analytics.default.use.bind(import_analytics.default));
  window.analytics = import_analytics.default;
})();
/*! JSON v3.3.2 | https://bestiejs.github.io/json3 | Copyright 2012-2015, Kit Cambridge, Benjamin Tan | http://kit.mit-license.org */
/**!
 * is
 * the definitive JavaScript type testing library
 *
 * @copyright 2013-2014 Enrico Marino / Jordan Harband
 * @license MIT
 */
