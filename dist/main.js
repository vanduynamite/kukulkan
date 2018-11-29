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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player.js */ \"./src/player.js\");\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById('kukulkanvas');\n  const context = canvas.getContext('2d');\n  canvas.width = 960;\n  canvas.height = 640;\n\n  // new GameView(game, ctx).start();\n\n  const player = new _player_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"](context);\n\n  setInterval(player.draw, 10);\n\n});\n\n// const draw = (context, maxHeight=50, angle=0, base=220) => () => {\n//   console.log('refreshing');\n//\n//   const height = maxHeight - 10*Math.cos(angle);\n//   y = base + 10*Math.cos(angle);\n//   angle += 0.1;\n//\n//   context.clearRect(0, 0, 960, 640);\n//\n//   context.beginPath();\n//\n//   context.rect(480, y, 30, height);\n//   context.fillStyle = \"#FFFFFF\";\n//   context.fill();\n//\n//   context.closePath();\n//\n// };\n\n\n\n\n\n\n// context.arc(480, 320, 320, start_angle, end_angle, false);\n// context.fillStyle = \"#FFFFFF\";\n// context.fill();\n\n// context.rect(center_x, center_y, width, height);\n// context.arc(center_x, center_y, radius, start_angle, end_angle, reverse?)\n\n// draw just a line\n// context.strokeStyle = \"rgba(255, 0, 255, 50)\";\n// context.stroke();\n\n// as opposed to stroke for outlines...\n// context.fillStyle = \"#FFFFFF\";\n// context.fill();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass Player {\n\n  constructor(context) {\n    this.context = context;\n    this.maxHeight = 50;\n    this.angle = 0;\n    this.baseY = 220;\n    this.draw = this.draw.bind(this);\n  }\n\n  draw() {\n    const height = this.maxHeight - 10*Math.cos(this.angle);\n    const y = this.baseY + 10 * Math.cos(this.angle);\n    this.angle += 0.1;\n\n    this.context.clearRect(0, 0, 960, 640);\n\n    this.context.beginPath();\n\n    this.context.rect(480, y, 30, height);\n    this.context.fillStyle = \"#FFFFFF\";\n    this.context.fill();\n\n    this.context.closePath();\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\n\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ })

/******/ });