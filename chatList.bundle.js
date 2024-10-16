/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _globals_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./globals.css */ \"./globals.css\");\n/* harmony import */ var _globals_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_globals_css__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.css */ \"./index.css\");\n/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _utils_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/constants */ \"./utils/constants.js\");\n\n\n\n// localStorage.clear()\nvar chatList = document.querySelector(\".chatlist\");\nvar newChatModal = document.querySelector(\".newchat\");\nvar openModalBtn = document.querySelector(\".new-msg\");\nvar closeModalBtn = document.querySelector(\".newchat__close-btn\");\nvar submitCreationBtn = document.querySelector(\".newchat__submit-btn\");\nvar nameInput = document.querySelector(\".newchat__name\");\nvar chatListArr = JSON.parse(localStorage.getItem(\"chatListArr\")) || [];\nif (!JSON.parse(localStorage.getItem(\"chatListArr\"))) localStorage.setItem(\"chatListArr\", JSON.stringify(chatListArr));\n\n// если создали новый чат, но ничего в нём не написали - при возвращении к списку чатов удалим его\nif (chatListArr.length > 0 && chatListArr.at(-1).messages.length === 0) {\n  chatListArr.pop();\n  localStorage.setItem(\"chatListArr\", JSON.stringify(chatListArr));\n}\nopenModalBtn.onclick = function () {\n  newChatModal.classList.add(\"newchat_active\");\n};\ncloseModalBtn.onclick = function (e) {\n  e.preventDefault();\n  newChatModal.classList.remove(\"newchat_active\");\n};\nsubmitCreationBtn.onclick = submitCreation;\nfunction submitCreation(e) {\n  e.preventDefault();\n  if (!nameInput.value.trim()) {\n    return;\n  }\n  createNewChat(nameInput.value);\n}\nfunction createNewChat(name) {\n  var id = generateUniqueId();\n  chatListArr.push({\n    id: id,\n    companionName: name,\n    quantityNew: 0,\n    isRead: false,\n    isMentioned: false,\n    messages: []\n  });\n  localStorage.setItem(\"chatListArr\", JSON.stringify(chatListArr));\n  window.location.href = \"./chat.html?chat_id=\".concat(id);\n}\nfunction generateUniqueId() {\n  var id;\n  var isUnique = false;\n  while (!isUnique) {\n    id = Math.floor(Math.random() * 10000);\n    isUnique = !chatListArr.some(function (chat) {\n      return chat.id === id;\n    });\n  }\n  return id;\n}\nfunction render() {\n  chatList.innerHTML = chatListArr.map(_utils_constants__WEBPACK_IMPORTED_MODULE_2__.elementTemplate).join(\"\");\n}\nrender();\n\n//# sourceURL=webpack:///./index.js?");

/***/ }),

/***/ "./utils/constants.js":
/*!****************************!*\
  !*** ./utils/constants.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   elementTemplate: () => (/* binding */ elementTemplate),\n/* harmony export */   months: () => (/* binding */ months)\n/* harmony export */ });\nvar months = [\"января\", \"февраля\", \"марта\", \"апреля\", \"мая\", \"июня\", \"июля\", \"августа\", \"сентября\", \"октября\", \"ноября\", \"декабря\"];\nvar chatStatus = function chatStatus(obj) {\n  return obj.messages.at(-1).author === obj.companionName ? obj.isRead ? \"\" : obj.quantityNew > 99 ? \"<div class=\\\"chatlist__quantity\\\">\".concat(obj.isMentioned ? \"<span style=\\\"font-size: 16px;\\\">@</span>\" : \"\", \"99</div>\") : \"<div class=\\\"chatlist__quantity\\\">\".concat(obj.isMentioned ? \"<span style=\\\"font-size: 16px\\\">@</span>\" : \"\").concat(obj.quantityNew, \"</div>\") : obj.isRead ? \"<span class=\\\"material-symbols-outlined\\\" style=\\\"font-size: 26px\\\">\\n                done_all\\n            </span>\" : \"<span class=\\\"material-symbols-outlined\\\" style=\\\"font-size: 26px\\\">\\n                check\\n            </span>\";\n};\nvar elementTemplate = function elementTemplate(obj) {\n  var creationDate = new Date(obj.messages.at(-1).createdAt);\n  var hours = String(creationDate.getHours()).padStart(2, \"0\");\n  var minutes = String(creationDate.getMinutes()).padStart(2, \"0\");\n  return \"<a class=\\\"chatlist__link\\\" href=\\\"./chat.html?chat_id=\".concat(obj.id, \"\\\">\\n        <div class=\\\"chatlist__element\\\">\\n            <div class=\\\"chatlist__avatar\\\">\\n                <span class=\\\"material-symbols-outlined\\\" style=\\\"font-size: 50px\\\">\\n                    account_circle\\n                </span>\\n            </div>\\n            <div class=\\\"chatlist__text-container\\\">\\n                <p class=\\\"chatlist__name\\\">\").concat(obj.companionName, \"</p>\\n                <p class=\\\"chatlist__last-msg\\\">\").concat(obj.messages.at(-1).message, \"</p>\\n            </div>\\n            <div class=\\\"chatlist__info\\\">\\n                <p class=\\\"chatlist__sent-at\\\">\").concat(hours, \":\").concat(minutes, \"</p>\\n                \").concat(chatStatus(obj), \"\\n            </div>\\n        </div>\\n    </a>\");\n};\n\n//# sourceURL=webpack:///./utils/constants.js?");

/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!./globals.css":
/*!************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!./globals.css ***!
  \************************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"../node_modules/css-loader/dist/runtime/api.js\");\nvar ___CSS_LOADER_AT_RULE_IMPORT_0___ = __webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js!./normalize.css */ \"../node_modules/css-loader/dist/cjs.js!./normalize.css\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\nexports.push([module.id, \"@import url(https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap);\"]);\nexports.i(___CSS_LOADER_AT_RULE_IMPORT_0___);\n// Module\nexports.push([module.id, \"html {\\n    box-sizing: border-box;\\n    height: 100%;\\n}\\n\\n*,\\n*::before,\\n*::after {\\n    box-sizing: inherit;\\n}\\n\\nbody {\\n    margin: 0;\\n    background-color: #211e27;\\n    color: #333;\\n    font-size: 15px;\\n    font-family: \\\"Roboto\\\", Helvetica, Arial, sans-serif;\\n    font-weight: 400;\\n    line-height: 20px;\\n    display: flex;\\n    width: 100vw;\\n    height: 100vh;\\n    justify-content: center;\\n    align-items: center;\\n    overflow-x: hidden;\\n    overflow-y: auto;\\n    height: 100%;\\n}\\n\\np {\\n    margin: 0;\\n}\\n\\n.container {\\n    display: flex;\\n    width: 100%;\\n    height: 100%;\\n    flex-direction: column;\\n    align-items: center;\\n    position: relative;\\n}\\n\\n.content {\\n    position: relative;\\n    margin-top: 80px;\\n    display: flex;\\n    flex-direction: column;\\n    width: 100%;\\n    max-width: 768px;\\n    min-height: calc(100vh - 80px);\\n}\\n\\n.material-symbols-outlined {\\n    color: #cfbff5;\\n    font-size: 32px;\\n}\\n\\n/* width */\\n::-webkit-scrollbar {\\n    width: 10px;\\n}\\n\\n/* Handle */\\n::-webkit-scrollbar-thumb {\\n    background: #cfbff5;\\n    border-radius: 10px;\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./globals.css?../node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!./index.css":
/*!**********************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!./index.css ***!
  \**********************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"../node_modules/css-loader/dist/runtime/api.js\");\nvar ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ \"../node_modules/css-loader/dist/runtime/getUrl.js\");\nvar ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__(/*! ./img/border-left.svg */ \"./img/border-left.svg\");\nvar ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__(/*! ./img/border-right.svg */ \"./img/border-right.svg\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);\nvar ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);\n// Module\nexports.push([module.id, \".header {\\n    position: fixed;\\n    top: 0;\\n    display: flex;\\n    align-items: center;\\n    justify-content: center;\\n    height: 80px;\\n    width: 100vw;\\n    padding: 15px;\\n    background-color: #211e27;\\n    z-index: 5;\\n}\\n\\n.header::before {\\n    content: \\\"\\\";\\n    position: absolute;\\n    bottom: -28px;\\n    left: 0;\\n    width: 28px;\\n    height: 28px;\\n    background-image: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \");\\n    background-repeat: no-repeat;\\n}\\n\\n.header::after {\\n    content: \\\"\\\";\\n    position: absolute;\\n    bottom: -28px;\\n    right: 0;\\n    width: 28px;\\n    height: 28px;\\n    background-image: url(\" + ___CSS_LOADER_URL_REPLACEMENT_1___ + \");\\n    background-repeat: no-repeat;\\n}\\n\\n.header__search {\\n    margin-left: auto;\\n}\\n\\n.header__search,\\n.header__menu {\\n    padding: 6px;\\n    border-radius: 100%;\\n    transition: all 0.2s ease;\\n}\\n\\n.header__search:hover,\\n.header__menu:hover {\\n    background: #1512195b;\\n    cursor: pointer;\\n}\\n\\n.header__title {\\n    margin-left: 40px;\\n    color: #cfbff5;\\n    font-size: 24px;\\n    font-weight: 400;\\n}\\n\\n.chatlist {\\n    position: relative;\\n    display: flex;\\n    flex-direction: column;\\n    gap: 8px;\\n    padding: 12px 12px 12px 12px;\\n    background-color: #151219;\\n    flex-grow: 1;\\n}\\n\\n.chatlist__element {\\n    display: flex;\\n    background-color: #4b4453b7;\\n    padding: 10px;\\n    border-radius: 28px;\\n    transition: all 0.2s ease;\\n}\\n\\n.chatlist__element:hover {\\n    background-color: #4b4453;\\n}\\n\\n.chatlist__avatar {\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    width: 60px;\\n    height: 60px;\\n    background-color: #151219;\\n    border-radius: 9999px;\\n}\\n\\n.chatlist__text-container {\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: center;\\n    margin-left: 10px;\\n    gap: 3px;\\n    max-width: calc(100% - 140px);\\n}\\n\\n.chatlist__name {\\n    font-size: 18px;\\n    color: #cfbff5;\\n    overflow: hidden;\\n    white-space: nowrap;\\n    text-overflow: ellipsis;\\n}\\n\\n.chatlist__last-msg {\\n    color: white;\\n    overflow: hidden;\\n    white-space: nowrap;\\n    text-overflow: ellipsis;\\n}\\n\\n.chatlist__info {\\n    margin-left: auto;\\n    display: flex;\\n    flex-direction: column;\\n    justify-content: center;\\n    align-items: end;\\n    min-width: 40px;\\n    gap: 5px;\\n}\\n\\n.chatlist__sent-at {\\n    color: white;\\n    font-size: 12px;\\n}\\n\\n.chatlist__link {\\n    text-decoration: none;\\n}\\n\\n.chatlist__quantity {\\n    color: black;\\n    background-color: #cfbff5;\\n    height: 25px;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    border-radius: 9999px;\\n    font-size: 12px;\\n    padding: 0 9px;\\n    gap: 2px;\\n}\\n\\n.new-msg {\\n    position: absolute;\\n    right: 20px;\\n    bottom: calc(-100vh + 100px);\\n    cursor: pointer;\\n    background-color: #cfbff5;\\n    border: none;\\n    outline: none;\\n    height: 60px;\\n    width: 60px;\\n    border-radius: 16px;\\n    box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.7);\\n    z-index: 5;\\n    transition: all 0.2s ease;\\n}\\n\\n.new-msg:hover {\\n    transform: scale(1.06);\\n}\\n\\n.new-msg__symbol {\\n    color: #151219;\\n}\\n\\n.newchat {\\n    position: fixed;\\n    height: 100vh;\\n    width: 100vw;\\n    display: flex;\\n    justify-content: center;\\n    align-items: center;\\n    background-color: rgba(0, 0, 0, 0.7);\\n    opacity: 0;\\n    z-index: -1;\\n    transition: all 0.2s ease-in;\\n}\\n\\n.newchat_active {\\n    opacity: 1;\\n    z-index: 9999;\\n}\\n\\n.newchat__form {\\n    position: relative;\\n    background-color: #4b4453;\\n    display: flex;\\n    flex-direction: column;\\n    border-radius: 28px;\\n    padding: 18px;\\n    gap: 20px;\\n}\\n\\n.newchat__title {\\n    color: #cfbff5;\\n    margin: 0;\\n}\\n\\n.newchat__name {\\n    outline: none;\\n    border: none;\\n    border-radius: 10px;\\n    padding: 0 8px;\\n    height: 30px;\\n    background-color: rgb(239, 235, 248);\\n}\\n\\n.newchat__name::placeholder {\\n    color: #4b445394;\\n}\\n\\n.newchat__submit-btn {\\n    height: 40px;\\n    background-color: #cfbff5;\\n    border-radius: 12px;\\n    border: none;\\n    cursor: pointer;\\n    color: #4b4453;\\n    font-weight: 500;\\n    font-size: 16px;\\n    transition: all 0.2s ease;\\n}\\n\\n.newchat__submit-btn:hover {\\n    transform: scale(1.02);\\n}\\n\\n.newchat__close-btn {\\n    position: absolute;\\n    top: -25px;\\n    right: -25px;\\n    padding: 0;\\n    background-color: transparent;\\n    border: none;\\n    cursor: pointer;\\n    transition: all 0.2s ease;\\n}\\n\\n.newchat__close-btn:hover {\\n    transform: scale(1.1);\\n}\\n\\n@media screen and (min-width: 768px) {\\n    .header {\\n        max-width: 768px;\\n        padding: 15px;\\n    }\\n}\\n\\n@media screen and (min-width: 1024px) {\\n    .new-msg {\\n        bottom: -61px;\\n        right: -80px;\\n    }\\n}\\n\\n@media screen and (min-width: 1280px) {\\n    .new-msg {\\n        width: 160px;\\n        height: 46px;\\n        bottom: -48px;\\n        right: -185px;\\n        display: flex;\\n        justify-content: center;\\n        align-items: center;\\n        gap: 12px;\\n        font-size: 16px;\\n        /* box-shadow: none; */\\n    }\\n\\n    .new-msg::after {\\n        content: \\\"Новый чат\\\";\\n    }\\n\\n    .new-msg__symbol {\\n        font-size: 26px;\\n    }\\n}\\n\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./index.css?../node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "../node_modules/css-loader/dist/cjs.js!./normalize.css":
/*!**************************************************************!*\
  !*** ../node_modules/css-loader/dist/cjs.js!./normalize.css ***!
  \**************************************************************/
/***/ ((module, exports, __webpack_require__) => {

eval("// Imports\nvar ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"../node_modules/css-loader/dist/runtime/api.js\");\nexports = ___CSS_LOADER_API_IMPORT___(false);\n// Module\nexports.push([module.id, \"/*! normalize.css v8.0.1 | MIT License | github.com/necolas/normalize.css */\\n\\n/* Document\\n   ========================================================================== */\\n\\n/**\\n * 1. Correct the line height in all browsers.\\n * 2. Prevent adjustments of font size after orientation changes in iOS.\\n */\\n\\n html {\\n    line-height: 1.15; /* 1 */\\n    -webkit-text-size-adjust: 100%; /* 2 */\\n  }\\n  \\n  /* Sections\\n     ========================================================================== */\\n  \\n  /**\\n   * Remove the margin in all browsers.\\n   */\\n  \\n  body {\\n    margin: 0;\\n  }\\n  \\n  /**\\n   * Render the `main` element consistently in IE.\\n   */\\n  \\n  main {\\n    display: block;\\n  }\\n  \\n  /**\\n   * Correct the font size and margin on `h1` elements within `section` and\\n   * `article` contexts in Chrome, Firefox, and Safari.\\n   */\\n  \\n  h1 {\\n    font-size: 2em;\\n    margin: 0.67em 0;\\n  }\\n  \\n  /* Grouping content\\n     ========================================================================== */\\n  \\n  /**\\n   * 1. Add the correct box sizing in Firefox.\\n   * 2. Show the overflow in Edge and IE.\\n   */\\n  \\n  hr {\\n    box-sizing: content-box; /* 1 */\\n    height: 0; /* 1 */\\n    overflow: visible; /* 2 */\\n  }\\n  \\n  /**\\n   * 1. Correct the inheritance and scaling of font size in all browsers.\\n   * 2. Correct the odd `em` font sizing in all browsers.\\n   */\\n  \\n  pre {\\n    font-family: monospace, monospace; /* 1 */\\n    font-size: 1em; /* 2 */\\n  }\\n  \\n  /* Text-level semantics\\n     ========================================================================== */\\n  \\n  /**\\n   * Remove the gray background on active links in IE 10.\\n   */\\n  \\n  a {\\n    background-color: transparent;\\n  }\\n  \\n  /**\\n   * 1. Remove the bottom border in Chrome 57-\\n   * 2. Add the correct text decoration in Chrome, Edge, IE, Opera, and Safari.\\n   */\\n  \\n  abbr[title] {\\n    border-bottom: none; /* 1 */\\n    text-decoration: underline; /* 2 */\\n    text-decoration: underline dotted; /* 2 */\\n  }\\n  \\n  /**\\n   * Add the correct font weight in Chrome, Edge, and Safari.\\n   */\\n  \\n  b,\\n  strong {\\n    font-weight: bolder;\\n  }\\n  \\n  /**\\n   * 1. Correct the inheritance and scaling of font size in all browsers.\\n   * 2. Correct the odd `em` font sizing in all browsers.\\n   */\\n  \\n  code,\\n  kbd,\\n  samp {\\n    font-family: monospace, monospace; /* 1 */\\n    font-size: 1em; /* 2 */\\n  }\\n  \\n  /**\\n   * Add the correct font size in all browsers.\\n   */\\n  \\n  small {\\n    font-size: 80%;\\n  }\\n  \\n  /**\\n   * Prevent `sub` and `sup` elements from affecting the line height in\\n   * all browsers.\\n   */\\n  \\n  sub,\\n  sup {\\n    font-size: 75%;\\n    line-height: 0;\\n    position: relative;\\n    vertical-align: baseline;\\n  }\\n  \\n  sub {\\n    bottom: -0.25em;\\n  }\\n  \\n  sup {\\n    top: -0.5em;\\n  }\\n  \\n  /* Embedded content\\n     ========================================================================== */\\n  \\n  /**\\n   * Remove the border on images inside links in IE 10.\\n   */\\n  \\n  img {\\n    border-style: none;\\n  }\\n  \\n  /* Forms\\n     ========================================================================== */\\n  \\n  /**\\n   * 1. Change the font styles in all browsers.\\n   * 2. Remove the margin in Firefox and Safari.\\n   */\\n  \\n  button,\\n  input,\\n  optgroup,\\n  select,\\n  textarea {\\n    font-family: inherit; /* 1 */\\n    font-size: 100%; /* 1 */\\n    line-height: 1.15; /* 1 */\\n    margin: 0; /* 2 */\\n  }\\n  \\n  /**\\n   * Show the overflow in IE.\\n   * 1. Show the overflow in Edge.\\n   */\\n  \\n  button,\\n  input { /* 1 */\\n    overflow: visible;\\n  }\\n  \\n  /**\\n   * Remove the inheritance of text transform in Edge, Firefox, and IE.\\n   * 1. Remove the inheritance of text transform in Firefox.\\n   */\\n  \\n  button,\\n  select { /* 1 */\\n    text-transform: none;\\n  }\\n  \\n  /**\\n   * Correct the inability to style clickable types in iOS and Safari.\\n   */\\n  \\n  button,\\n  [type=\\\"button\\\"],\\n  [type=\\\"reset\\\"],\\n  [type=\\\"submit\\\"] {\\n    -webkit-appearance: button;\\n  }\\n  \\n  /**\\n   * Remove the inner border and padding in Firefox.\\n   */\\n  \\n  button::-moz-focus-inner,\\n  [type=\\\"button\\\"]::-moz-focus-inner,\\n  [type=\\\"reset\\\"]::-moz-focus-inner,\\n  [type=\\\"submit\\\"]::-moz-focus-inner {\\n    border-style: none;\\n    padding: 0;\\n  }\\n  \\n  /**\\n   * Restore the focus styles unset by the previous rule.\\n   */\\n  \\n  button:-moz-focusring,\\n  [type=\\\"button\\\"]:-moz-focusring,\\n  [type=\\\"reset\\\"]:-moz-focusring,\\n  [type=\\\"submit\\\"]:-moz-focusring {\\n    outline: 1px dotted ButtonText;\\n  }\\n  \\n  /**\\n   * Correct the padding in Firefox.\\n   */\\n  \\n  fieldset {\\n    padding: 0.35em 0.75em 0.625em;\\n  }\\n  \\n  /**\\n   * 1. Correct the text wrapping in Edge and IE.\\n   * 2. Correct the color inheritance from `fieldset` elements in IE.\\n   * 3. Remove the padding so developers are not caught out when they zero out\\n   *    `fieldset` elements in all browsers.\\n   */\\n  \\n  legend {\\n    box-sizing: border-box; /* 1 */\\n    color: inherit; /* 2 */\\n    display: table; /* 1 */\\n    max-width: 100%; /* 1 */\\n    padding: 0; /* 3 */\\n    white-space: normal; /* 1 */\\n  }\\n  \\n  /**\\n   * Add the correct vertical alignment in Chrome, Firefox, and Opera.\\n   */\\n  \\n  progress {\\n    vertical-align: baseline;\\n  }\\n  \\n  /**\\n   * Remove the default vertical scrollbar in IE 10+.\\n   */\\n  \\n  textarea {\\n    overflow: auto;\\n  }\\n  \\n  /**\\n   * 1. Add the correct box sizing in IE 10.\\n   * 2. Remove the padding in IE 10.\\n   */\\n  \\n  [type=\\\"checkbox\\\"],\\n  [type=\\\"radio\\\"] {\\n    box-sizing: border-box; /* 1 */\\n    padding: 0; /* 2 */\\n  }\\n  \\n  /**\\n   * Correct the cursor style of increment and decrement buttons in Chrome.\\n   */\\n  \\n  [type=\\\"number\\\"]::-webkit-inner-spin-button,\\n  [type=\\\"number\\\"]::-webkit-outer-spin-button {\\n    height: auto;\\n  }\\n  \\n  /**\\n   * 1. Correct the odd appearance in Chrome and Safari.\\n   * 2. Correct the outline style in Safari.\\n   */\\n  \\n  [type=\\\"search\\\"] {\\n    -webkit-appearance: textfield; /* 1 */\\n    outline-offset: -2px; /* 2 */\\n  }\\n  \\n  /**\\n   * Remove the inner padding in Chrome and Safari on macOS.\\n   */\\n  \\n  [type=\\\"search\\\"]::-webkit-search-decoration {\\n    -webkit-appearance: none;\\n  }\\n  \\n  /**\\n   * 1. Correct the inability to style clickable types in iOS and Safari.\\n   * 2. Change font properties to `inherit` in Safari.\\n   */\\n  \\n  ::-webkit-file-upload-button {\\n    -webkit-appearance: button; /* 1 */\\n    font: inherit; /* 2 */\\n  }\\n  \\n  /* Interactive\\n     ========================================================================== */\\n  \\n  /*\\n   * Add the correct display in Edge, IE 10+, and Firefox.\\n   */\\n  \\n  details {\\n    display: block;\\n  }\\n  \\n  /*\\n   * Add the correct display in all browsers.\\n   */\\n  \\n  summary {\\n    display: list-item;\\n  }\\n  \\n  /* Misc\\n     ========================================================================== */\\n  \\n  /**\\n   * Add the correct display in IE 10+.\\n   */\\n  \\n  template {\\n    display: none;\\n  }\\n  \\n  /**\\n   * Add the correct display in IE 10.\\n   */\\n  \\n  [hidden] {\\n    display: none;\\n  }\", \"\"]);\n// Exports\nmodule.exports = exports;\n\n\n//# sourceURL=webpack:///./normalize.css?../node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/api.js":
/*!******************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/api.js ***!
  \******************************************************/
/***/ ((module) => {

"use strict";
eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\n// css base code, injected by the css-loader\n// eslint-disable-next-line func-names\nmodule.exports = function (useSourceMap) {\n  var list = []; // return the list of modules as css string\n\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = cssWithMappingToString(item, useSourceMap);\n\n      if (item[2]) {\n        return \"@media \".concat(item[2], \" {\").concat(content, \"}\");\n      }\n\n      return content;\n    }).join('');\n  }; // import a list of modules into the list\n  // eslint-disable-next-line func-names\n\n\n  list.i = function (modules, mediaQuery, dedupe) {\n    if (typeof modules === 'string') {\n      // eslint-disable-next-line no-param-reassign\n      modules = [[null, modules, '']];\n    }\n\n    var alreadyImportedModules = {};\n\n    if (dedupe) {\n      for (var i = 0; i < this.length; i++) {\n        // eslint-disable-next-line prefer-destructuring\n        var id = this[i][0];\n\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n\n    for (var _i = 0; _i < modules.length; _i++) {\n      var item = [].concat(modules[_i]);\n\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        // eslint-disable-next-line no-continue\n        continue;\n      }\n\n      if (mediaQuery) {\n        if (!item[2]) {\n          item[2] = mediaQuery;\n        } else {\n          item[2] = \"\".concat(mediaQuery, \" and \").concat(item[2]);\n        }\n      }\n\n      list.push(item);\n    }\n  };\n\n  return list;\n};\n\nfunction cssWithMappingToString(item, useSourceMap) {\n  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring\n\n  var cssMapping = item[3];\n\n  if (!cssMapping) {\n    return content;\n  }\n\n  if (useSourceMap && typeof btoa === 'function') {\n    var sourceMapping = toComment(cssMapping);\n    var sourceURLs = cssMapping.sources.map(function (source) {\n      return \"/*# sourceURL=\".concat(cssMapping.sourceRoot || '').concat(source, \" */\");\n    });\n    return [content].concat(sourceURLs).concat([sourceMapping]).join('\\n');\n  }\n\n  return [content].join('\\n');\n} // Adapted from convert-source-map (MIT)\n\n\nfunction toComment(sourceMap) {\n  // eslint-disable-next-line no-undef\n  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));\n  var data = \"sourceMappingURL=data:application/json;charset=utf-8;base64,\".concat(base64);\n  return \"/*# \".concat(data, \" */\");\n}\n\n//# sourceURL=webpack:///../node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "../node_modules/css-loader/dist/runtime/getUrl.js":
/*!*********************************************************!*\
  !*** ../node_modules/css-loader/dist/runtime/getUrl.js ***!
  \*********************************************************/
/***/ ((module) => {

"use strict";
eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    // eslint-disable-next-line no-param-reassign\n    options = {};\n  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign\n\n\n  url = url && url.__esModule ? url.default : url;\n\n  if (typeof url !== 'string') {\n    return url;\n  } // If url is already wrapped in quotes, remove them\n\n\n  if (/^['\"].*['\"]$/.test(url)) {\n    // eslint-disable-next-line no-param-reassign\n    url = url.slice(1, -1);\n  }\n\n  if (options.hash) {\n    // eslint-disable-next-line no-param-reassign\n    url += options.hash;\n  } // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n\n\n  if (/[\"'() \\t\\n]/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, '\\\\n'), \"\\\"\");\n  }\n\n  return url;\n};\n\n//# sourceURL=webpack:///../node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./globals.css":
/*!*********************!*\
  !*** ./globals.css ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var api = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./globals.css */ \"../node_modules/css-loader/dist/cjs.js!./globals.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.id, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./globals.css?");

/***/ }),

/***/ "./index.css":
/*!*******************!*\
  !*** ./index.css ***!
  \*******************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var api = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n            var content = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./index.css */ \"../node_modules/css-loader/dist/cjs.js!./index.css\");\n\n            content = content.__esModule ? content.default : content;\n\n            if (typeof content === 'string') {\n              content = [[module.id, content, '']];\n            }\n\nvar options = {};\n\noptions.insert = \"head\";\noptions.singleton = false;\n\nvar update = api(content, options);\n\n\n\nmodule.exports = content.locals || {};\n\n//# sourceURL=webpack:///./index.css?");

/***/ }),

/***/ "../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!*****************************************************************************!*\
  !*** ../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \*****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";
eval("\n\nvar isOldIE = function isOldIE() {\n  var memo;\n  return function memorize() {\n    if (typeof memo === 'undefined') {\n      // Test for IE <= 9 as proposed by Browserhacks\n      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805\n      // Tests for existence of standard globals is to allow style-loader\n      // to operate correctly into non-standard environments\n      // @see https://github.com/webpack-contrib/style-loader/issues/177\n      memo = Boolean(window && document && document.all && !window.atob);\n    }\n\n    return memo;\n  };\n}();\n\nvar getTarget = function getTarget() {\n  var memo = {};\n  return function memorize(target) {\n    if (typeof memo[target] === 'undefined') {\n      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself\n\n      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n        try {\n          // This will throw an exception if access to iframe is blocked\n          // due to cross-origin restrictions\n          styleTarget = styleTarget.contentDocument.head;\n        } catch (e) {\n          // istanbul ignore next\n          styleTarget = null;\n        }\n      }\n\n      memo[target] = styleTarget;\n    }\n\n    return memo[target];\n  };\n}();\n\nvar stylesInDom = [];\n\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n\n  for (var i = 0; i < stylesInDom.length; i++) {\n    if (stylesInDom[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n\n  return result;\n}\n\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var index = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3]\n    };\n\n    if (index !== -1) {\n      stylesInDom[index].references++;\n      stylesInDom[index].updater(obj);\n    } else {\n      stylesInDom.push({\n        identifier: identifier,\n        updater: addStyle(obj, options),\n        references: 1\n      });\n    }\n\n    identifiers.push(identifier);\n  }\n\n  return identifiers;\n}\n\nfunction insertStyleElement(options) {\n  var style = document.createElement('style');\n  var attributes = options.attributes || {};\n\n  if (typeof attributes.nonce === 'undefined') {\n    var nonce =  true ? __webpack_require__.nc : 0;\n\n    if (nonce) {\n      attributes.nonce = nonce;\n    }\n  }\n\n  Object.keys(attributes).forEach(function (key) {\n    style.setAttribute(key, attributes[key]);\n  });\n\n  if (typeof options.insert === 'function') {\n    options.insert(style);\n  } else {\n    var target = getTarget(options.insert || 'head');\n\n    if (!target) {\n      throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n    }\n\n    target.appendChild(style);\n  }\n\n  return style;\n}\n\nfunction removeStyleElement(style) {\n  // istanbul ignore if\n  if (style.parentNode === null) {\n    return false;\n  }\n\n  style.parentNode.removeChild(style);\n}\n/* istanbul ignore next  */\n\n\nvar replaceText = function replaceText() {\n  var textStore = [];\n  return function replace(index, replacement) {\n    textStore[index] = replacement;\n    return textStore.filter(Boolean).join('\\n');\n  };\n}();\n\nfunction applyToSingletonTag(style, index, remove, obj) {\n  var css = remove ? '' : obj.media ? \"@media \".concat(obj.media, \" {\").concat(obj.css, \"}\") : obj.css; // For old IE\n\n  /* istanbul ignore if  */\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = replaceText(index, css);\n  } else {\n    var cssNode = document.createTextNode(css);\n    var childNodes = style.childNodes;\n\n    if (childNodes[index]) {\n      style.removeChild(childNodes[index]);\n    }\n\n    if (childNodes.length) {\n      style.insertBefore(cssNode, childNodes[index]);\n    } else {\n      style.appendChild(cssNode);\n    }\n  }\n}\n\nfunction applyToTag(style, options, obj) {\n  var css = obj.css;\n  var media = obj.media;\n  var sourceMap = obj.sourceMap;\n\n  if (media) {\n    style.setAttribute('media', media);\n  } else {\n    style.removeAttribute('media');\n  }\n\n  if (sourceMap && typeof btoa !== 'undefined') {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  } // For old IE\n\n  /* istanbul ignore if  */\n\n\n  if (style.styleSheet) {\n    style.styleSheet.cssText = css;\n  } else {\n    while (style.firstChild) {\n      style.removeChild(style.firstChild);\n    }\n\n    style.appendChild(document.createTextNode(css));\n  }\n}\n\nvar singleton = null;\nvar singletonCounter = 0;\n\nfunction addStyle(obj, options) {\n  var style;\n  var update;\n  var remove;\n\n  if (options.singleton) {\n    var styleIndex = singletonCounter++;\n    style = singleton || (singleton = insertStyleElement(options));\n    update = applyToSingletonTag.bind(null, style, styleIndex, false);\n    remove = applyToSingletonTag.bind(null, style, styleIndex, true);\n  } else {\n    style = insertStyleElement(options);\n    update = applyToTag.bind(null, style, options);\n\n    remove = function remove() {\n      removeStyleElement(style);\n    };\n  }\n\n  update(obj);\n  return function updateStyle(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {\n        return;\n      }\n\n      update(obj = newObj);\n    } else {\n      remove();\n    }\n  };\n}\n\nmodule.exports = function (list, options) {\n  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>\n  // tags it will allow on a page\n\n  if (!options.singleton && typeof options.singleton !== 'boolean') {\n    options.singleton = isOldIE();\n  }\n\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n\n    if (Object.prototype.toString.call(newList) !== '[object Array]') {\n      return;\n    }\n\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDom[index].references--;\n    }\n\n    var newLastIdentifiers = modulesToDom(newList, options);\n\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n\n      var _index = getIndexByIdentifier(_identifier);\n\n      if (stylesInDom[_index].references === 0) {\n        stylesInDom[_index].updater();\n\n        stylesInDom.splice(_index, 1);\n      }\n    }\n\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack:///../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./img/border-left.svg":
/*!*****************************!*\
  !*** ./img/border-left.svg ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yOCAwQzEyLjUzNiAwIDAgMTIuNTM2IDAgMjhMMCAwTDI4IDBaIiBmaWxsPSIjMjExRTI3Ii8+Cjwvc3ZnPgo=\");\n\n//# sourceURL=webpack:///./img/border-left.svg?");

/***/ }),

/***/ "./img/border-right.svg":
/*!******************************!*\
  !*** ./img/border-right.svg ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (\"data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjgiIGhlaWdodD0iMjgiIHZpZXdCb3g9IjAgMCAyOCAyOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0yOCAyOEMyOCAxMi41MzYgMTUuNDY0IDAgMCAwSDI4VjI4WiIgZmlsbD0iIzIxMUUyNyIvPgo8L3N2Zz4K\");\n\n//# sourceURL=webpack:///./img/border-right.svg?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;