/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./index.css?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.css */ \"./index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_0__);\nfunction _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _iterableToArray(r) { if (\"undefined\" != typeof Symbol && null != r[Symbol.iterator] || null != r[\"@@iterator\"]) return Array.from(r); }\nfunction _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\n\nvar form = document.querySelector(\"form\");\nvar input = document.querySelector(\".form__input\");\nvar messages = document.querySelector(\".messages\");\nvar testBtn = document.querySelector(\".test-button\");\nvar months = [\"января\", \"февраля\", \"марта\", \"апреля\", \"мая\", \"июня\", \"июля\", \"августа\", \"сентября\", \"октября\", \"ноября\", \"декабря\"];\nvar MESSAGE_LIST_KEY = \"messageArr\";\nvar USER = \"Alex\";\nvar messagesToRender = [];\nvar newMessages = [];\nvar messageTemplate = function messageTemplate(obj) {\n  var creationDate = new Date(obj.createdAt);\n  var day = String(creationDate.getDate()).padStart(2, \"0\");\n  var month = months[creationDate.getMonth()];\n  var year = creationDate.getFullYear();\n  var hours = String(creationDate.getHours()).padStart(2, \"0\");\n  var minutes = String(creationDate.getMinutes()).padStart(2, \"0\");\n  var seconds = String(creationDate.getSeconds()).padStart(2, \"0\");\n  return \"\\n    <div class=\\\"message \".concat(obj.author === USER ? \"\" : \"message_incoming\", \"\\\">\\n        <p class=\\\"message__text\\\">\").concat(obj.message, \"</p>\\n        <div class=\\\"message__info tooltip\\\">\\n        <span class=\\\"tooltiptext\\\">\").concat(day, \" \").concat(month, \" \").concat(year, \"\\u0433., \").concat(hours, \":\").concat(minutes, \":\").concat(seconds, \"</span>\\n            <p class=\\\"message__time\\\">\").concat(hours + \":\" + minutes, \"</p>\\n            <span class=\\\"material-symbols-outlined message__arrows \").concat(obj.author === USER ? \"\" : \"message__arrows_incoming\", \"\\\"> done_all </span>\\n        </div>\\n    </div>\\n    \");\n};\nif (localStorage.messageArr) {\n  messagesToRender = JSON.parse(localStorage.getItem(MESSAGE_LIST_KEY));\n}\nform.addEventListener(\"submit\", handleSubmit);\ntestBtn.onclick = function () {\n  return sendTestMessage();\n};\nfunction sendTestMessage() {\n  var date = new Date();\n  newMessages.push({\n    message: \"Тестовое сообщение\",\n    createdAt: date,\n    author: \"Bob\"\n  });\n}\nfunction handleSubmit(event) {\n  event.preventDefault();\n  sendMessage();\n}\nfunction sendMessage() {\n  if (input.value) {\n    var date = new Date();\n    messagesToRender.push({\n      message: input.value,\n      createdAt: date,\n      author: USER\n    });\n    localStorage.setItem(MESSAGE_LIST_KEY, JSON.stringify(messagesToRender));\n    input.value = \"\";\n    render();\n    messages.scrollTo({\n      top: 0\n    });\n  }\n}\nsetInterval(function () {\n  if (newMessages.length > 0) {\n    var _messagesToRender;\n    (_messagesToRender = messagesToRender).push.apply(_messagesToRender, _toConsumableArray(newMessages));\n    newMessages = [];\n    var sortedMessages = messagesToRender.sort(function (a, b) {\n      return new Date(a.createdAt) - new Date(b.createdAt);\n    });\n    localStorage.setItem(MESSAGE_LIST_KEY, JSON.stringify(sortedMessages));\n    render();\n  }\n}, 500);\nfunction render() {\n  document.querySelector(\".messages\").innerHTML = messagesToRender.map(messageTemplate).reverse().join(\"\");\n}\nrender();\n// localStorage.clear();\n\n//# sourceURL=webpack:///./index.js?");

/***/ })

/******/ });