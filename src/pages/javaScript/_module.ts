export const COMMON_JS = `\`\`\`js
 (function (modules) {
    // webpackBootstrap
     // 模块缓存
     var installedModules = {};
     // 辅助函数，实现require
     function __webpack_require__(moduleId) {
       // 判断模块是否在缓存中
       if (installedModules[moduleId]) {
         return installedModules[moduleId].exports;
      }
       // 创建新模块，并添加到缓存中
       var module = (installedModules[moduleId] = {
         i: moduleId,
         l: false,
         exports: {},
      });
      
       // 执行模块函数
       modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      );
      
       // 标记模块已加载
       module.l = true;
       // 返回module.exports，其中包含了导出的对象
       return module.exports;
    }
     // 暴露modules对象  (__webpack_modules__)
     __webpack_require__.m = modules;
    
     // 暴露installedModules模块缓存对象
     __webpack_require__.c = installedModules;
    
     // 定义函数，支持exports的导出
     __webpack_require__.d = function (exports, name, getter) {
       if (!__webpack_require__.o(exports, name)) {
         Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter,
        });
      }
    };
    
     // 在exports上定义__esModule属性
     __webpack_require__.r = function (exports) {
       if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
         Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
      }
       Object.defineProperty(exports, "__esModule", { value: true });
    };
    
     // 创建虚拟命名空间
     // mode & 1: value is a module id, require it
     // mode & 2: merge all properties of value into the ns
     // mode & 4: return value when already ns object
     // mode & 8|1: behave like require
     __webpack_require__.t = function (value, mode) {
       if (mode & 1) value = __webpack_require__(value);
       if (mode & 8) return value;
       if (
        mode & 4 &&
        typeof value === "object" &&
        value &&
        value.__esModule
      )
        return value;
       var ns = Object.create(null);
       __webpack_require__.r(ns);
       Object.defineProperty(ns, "default", {
        enumerable: true,
        value: value,
      });
       if (mode & 2 && typeof value != "string")
        for (var key in value)
          __webpack_require__.d(
            ns,
            key,
            function (key) {
              return value[key];
            }.bind(null, key)
          );
       return ns;
    };
    
     // 同时支持export default 和 export
     __webpack_require__.n = function (module) {
       var getter =
        module && module.__esModule
          ?  function getDefault() {
              return module["default"];
            }
          :  function getModuleExports() {
              return module;
            };
       __webpack_require__.d(getter, "a", getter);
       return getter;
    };
    
     // 调用hasOwnProperty检查对象是否存在该属性
     __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
     // __webpack_public_path__
     __webpack_require__.p = "";
    
     // 加载入口模块，返回exports
     return __webpack_require__((__webpack_require__.s = "./app.js"));
  })({
    "./app.js": function (module, exports, __webpack_require__) {
      var m = __webpack_require__("./module1.js");
      console.log(m);
    }, 
    "./module1.js": function (module, exports) {
      var m = 1;
      module.exports = m;
    },
  });
  //# sourceMappingURL=bundle.js.map
\`\`\``;

export const COMMON_JS_EXAMPLE = `\`\`\`js
// 导出
// 直接挂在exports上
exports.uppercase = str => str.toUpperCase();
// 挂在module.exports上
module.exports.a = 1;
// 重写module.exports
modules.exports = { a: 1 };

// 导入
const xxx = require('xxx-xxx');
\`\`\``;

export const CJS_APP = `\`\`\`js
// module1.js
const m = 1;
module.exports = m;

// app.js
const m = require("./module1.js");
console.log(m);
\`\`\``;

export const WEBPACK_CONFIG_JS = `\`\`\`js
const path = require("path");

module.exports = {
  entry: "./app.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    hashFunction: "sha256",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: "babel-loader",
        options: {
          cacheDirectory: true,
        },
      },
    ],
  },
  devServer: {
    open: true,
  },
  devtool: "source-map",
};

\`\`\``;

export const ES_APP = `\`\`\`js
// app.js
import m, { a } from "./module2";
console.log(m, a);

// module2.js
export const a = 1;
export default obj = {
  b: 2,
};
\`\`\``

export const ES_MODULE = `\`\`\`js
(function (modules) {
    // webpackBootstrap
    // The module cache
    var installedModules = {};
  
    // The require function
    function __webpack_require__(moduleId) {
      // Check if module is in cache
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      // Create a new module (and put it into the cache)
      var module = (installedModules[moduleId] = {
        i: moduleId,
        l: false,
        exports: {},
      });
  
      // Execute the module function
      modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__
      );
  
      // Flag the module as loaded
      module.l = true;
  
      // Return the exports of the module
      return module.exports;
    }
  
    // expose the modules object (__webpack_modules__)
    __webpack_require__.m = modules;
  
    // expose the module cache
    __webpack_require__.c = installedModules;
  
    // define getter function for harmony exports
    __webpack_require__.d = function (exports, name, getter) {
      if (!__webpack_require__.o(exports, name)) {
        Object.defineProperty(exports, name, {
          enumerable: true,
          get: getter,
        });
      }
    };
  
    // define __esModule on exports
    __webpack_require__.r = function (exports) {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
      }
      Object.defineProperty(exports, "__esModule", { value: true });
    };
  
    // create a fake namespace object
    // mode & 1: value is a module id, require it
    // mode & 2: merge all properties of value into the ns
    // mode & 4: return value when already ns object
    // mode & 8|1: behave like require
    __webpack_require__.t = function (value, mode) {
      if (mode & 1) value = __webpack_require__(value);
      if (mode & 8) return value;
      if (mode & 4 && typeof value === "object" && value && value.__esModule)
        return value;
      var ns = Object.create(null);
      __webpack_require__.r(ns);
      Object.defineProperty(ns, "default", {
        enumerable: true,
        value: value,
      });
      if (mode & 2 && typeof value != "string")
        for (var key in value)
          __webpack_require__.d(
            ns,
            key,
            function (key) {
              return value[key];
            }.bind(null, key)
          );
      return ns;
    };
  
    // getDefaultExport function for compatibility with non-harmony modules
    __webpack_require__.n = function (module) {
      var getter =
        module && module.__esModule
          ? function getDefault() {
              return module["default"];
            }
          : function getModuleExports() {
              return module;
            };
      __webpack_require__.d(getter, "a", getter);
      return getter;
    };
  
    // Object.prototype.hasOwnProperty.call
    __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
  
    // __webpack_public_path__
    __webpack_require__.p = "";
  
    // Load entry module and return exports
    return __webpack_require__((__webpack_require__.s = "./app.js"));
  })({
    "./app.js": function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      var _module2__WEBPACK_IMPORTED_MODULE_0__ =
        __webpack_require__("./module2.js");
      console.log(
        _module2__WEBPACK_IMPORTED_MODULE_0__["default"],
        _module2__WEBPACK_IMPORTED_MODULE_0__["a"]
      );
    },
    "./module2.js": function (module, __webpack_exports__, __webpack_require__) {
      "use strict";
      __webpack_require__.r(__webpack_exports__);
      __webpack_require__.d(__webpack_exports__, "a", function () {
        return a;
      });
      var a = 1;
      __webpack_exports__["default"] = obj = {
        b: 2,
      };
    },
  });
  //# sourceMappingURL=bundle.js.map
\`\`\``;
