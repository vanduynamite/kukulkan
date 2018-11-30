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

/***/ "./src/alien.js":
/*!**********************!*\
  !*** ./src/alien.js ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _difficulty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./difficulty */ \"./src/difficulty.js\");\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings */ \"./src/settings.js\");\n\n\n\n\nclass Alien {\n\n  constructor(difficulty) {\n    this.dir = Math.sign(Math.random() - 0.5);\n\n    this.left = (_settings__WEBPACK_IMPORTED_MODULE_2__[\"GAME_WIDTH\"] - _settings__WEBPACK_IMPORTED_MODULE_2__[\"ALIEN_WIDTH\"]) / 2 - this.dir * (_settings__WEBPACK_IMPORTED_MODULE_2__[\"GAME_WIDTH\"] + _settings__WEBPACK_IMPORTED_MODULE_2__[\"ALIEN_WIDTH\"]) / 2;\n    this.bottom = _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].baseY - _settings__WEBPACK_IMPORTED_MODULE_2__[\"ALIEN_HEIGHT\"];\n\n    this.health = Object(_difficulty__WEBPACK_IMPORTED_MODULE_1__[\"alienHealth\"])(difficulty);\n    this.speed = Object(_difficulty__WEBPACK_IMPORTED_MODULE_1__[\"alienSpeed\"])(difficulty) * this.dir;\n    this.color = alienColor(this.health);\n  }\n\n  collidedWithPlayer(player) {\n    const buffer = _settings__WEBPACK_IMPORTED_MODULE_2__[\"PLAYER_BUFFER\"];\n\n    if ((this.left < player.left + player.width - buffer) && this.dir == -1) {\n      return true;\n    }\n\n    if ((this.left + _settings__WEBPACK_IMPORTED_MODULE_2__[\"ALIEN_WIDTH\"] - buffer > player.left) && this.dir == 1) {\n      return true;\n    }\n\n    return false;\n  }\n\n  collidedWithBullet(bullet) {\n    const buffer = _settings__WEBPACK_IMPORTED_MODULE_2__[\"BULLET_BUFFER\"];\n\n    if (bullet.pos[0] > this.left - bullet.radius + buffer &&\n        bullet.pos[0] < this.left + _settings__WEBPACK_IMPORTED_MODULE_2__[\"ALIEN_WIDTH\"] + bullet.radius - buffer &&\n        bullet.pos[1] < this.bottom + _settings__WEBPACK_IMPORTED_MODULE_2__[\"ALIEN_HEIGHT\"] + bullet.radius - buffer &&\n        bullet.pos[1] > this.bottom - bullet.radius) {\n\n      this.health -= bullet.strength;\n      this.color = alienColor(this.health);\n      return true;\n    }\n\n    return false;\n  }\n\n\n  draw(ctx) {\n    ctx.beginPath();\n    ctx.rect(this.left, this.bottom, _settings__WEBPACK_IMPORTED_MODULE_2__[\"ALIEN_WIDTH\"], _settings__WEBPACK_IMPORTED_MODULE_2__[\"ALIEN_HEIGHT\"]);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n\n  step(timeStep) {\n    this.left += this.speed * timeStep;\n    let toe = this.left + _settings__WEBPACK_IMPORTED_MODULE_2__[\"ALIEN_WIDTH\"] * 0.5;\n    const base = _settings__WEBPACK_IMPORTED_MODULE_2__[\"GAME_WIDTH\"] / 2 - (_settings__WEBPACK_IMPORTED_MODULE_2__[\"GAME_WIDTH\"] / 2 - _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].baseX) * this.dir;\n    const dx = _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].pyramidDX * this.dir;\n\n\n    if ((toe > base + 0 * dx && toe <= base + 1 * dx) ||\n        (toe > base + 2 * dx && toe <= base + 3 * dx) ||\n        (toe > base + 4 * dx && toe <= base + 5 * dx)) {\n      this.bottom -= _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].pyramidDY / _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].pyramidDX * this.speed * timeStep;\n    }\n\n\n    if ((toe < base + 0 * dx && toe >= base + 1 * dx) ||\n        (toe < base + 2 * dx && toe >= base + 3 * dx) ||\n        (toe < base + 4 * dx && toe >= base + 5 * dx)) {\n      this.bottom += _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].pyramidDY / _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"].pyramidDX * this.speed * timeStep;\n    }\n\n\n    // TODO: implement a formulaic approach\n    // const slope = Game.slope;\n    //\n    // const foot = Math.max(toe - 84 * this.dir, 0);\n    // const onSlope = (Math.floor(foot / Game.pyramidDX) + 1) % 2;\n    // const stepNum = Math.floor((Math.floor(foot / Game.pyramidDX) + 1) / 2);\n    // const test = foot % Game.pyramidDX * slope * onSlope;\n    // // console.log(test + stepNum * Game.pyramidDY);\n    // this.bottom = Game.baseY - (test + stepNum * Game.pyramidDY) - ALIEN_HEIGHT;\n  }\n\n}\n\nconst alienColor = (health) => {\n  switch (true) {\n    case (health <= 1):\n      return '#ffeb3b';\n    case (health <= 2):\n      return '#ffc107';\n    case (health <= 3):\n      return '#ff5722';\n    default:\n      return '#ffffff';\n  }\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Alien);\n\n\n//# sourceURL=webpack:///./src/alien.js?");

/***/ }),

/***/ "./src/bullet.js":
/*!***********************!*\
  !*** ./src/bullet.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _difficulty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./difficulty */ \"./src/difficulty.js\");\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./settings */ \"./src/settings.js\");\n\n\n\nclass Bullet {\n\n  constructor(dir, timeCreated) {\n    this.dir = dir;\n    this.timeCreated = timeCreated;\n\n    this.pos = [(_settings__WEBPACK_IMPORTED_MODULE_1__[\"GAME_WIDTH\"] + _settings__WEBPACK_IMPORTED_MODULE_1__[\"PLAYER_WIDTH\"] * this.dir) / 2, _settings__WEBPACK_IMPORTED_MODULE_1__[\"BULLET_HEIGHT\"]];\n    this.moving = false;\n  }\n\n  updateParameters(newTime) {\n    const timePassed = Math.min(newTime - this.timeCreated, _settings__WEBPACK_IMPORTED_MODULE_1__[\"MAX_FORM_TIME\"]);\n    const bulletLevel = Math.floor(timePassed / _settings__WEBPACK_IMPORTED_MODULE_1__[\"FORM_INTERVAL\"]) + 1;\n\n    this.radius = bulletLevel * (_settings__WEBPACK_IMPORTED_MODULE_1__[\"MAX_SIZE\"] / _settings__WEBPACK_IMPORTED_MODULE_1__[\"NUM_SIZES\"]);\n    this.strength = Object(_difficulty__WEBPACK_IMPORTED_MODULE_0__[\"bulletStrength\"])(this.radius);\n    this.color = Object(_settings__WEBPACK_IMPORTED_MODULE_1__[\"bulletColor\"])(this.strength);\n    this.vel = [Object(_settings__WEBPACK_IMPORTED_MODULE_1__[\"bulletVelX\"])(this.dir, this.radius), 0];\n  }\n\n  draw(ctx) {\n    ctx.beginPath();\n    ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);\n    ctx.fillStyle = this.color;\n    ctx.fill();\n    ctx.closePath();\n  }\n\n  step(timeStep) {\n    if (this.moving) {\n      this.pos[0] += this.vel[0] * timeStep;\n      this.pos[1] += this.vel[1] * timeStep;\n      this.vel[1] += _settings__WEBPACK_IMPORTED_MODULE_1__[\"GRAVITY\"] * timeStep;\n    }\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Bullet);\n\n\n//# sourceURL=webpack:///./src/bullet.js?");

/***/ }),

/***/ "./src/difficulty.js":
/*!***************************!*\
  !*** ./src/difficulty.js ***!
  \***************************/
/*! exports provided: calculateDifficulty, alienHealth, alienSpeed, bulletStrength */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"calculateDifficulty\", function() { return calculateDifficulty; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"alienHealth\", function() { return alienHealth; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"alienSpeed\", function() { return alienSpeed; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bulletStrength\", function() { return bulletStrength; });\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ \"./src/settings.js\");\n\n\nconst calculateDifficulty = (game) => {\n  game.difficulty = Math.floor(game.score / _settings__WEBPACK_IMPORTED_MODULE_0__[\"KILLS_PER_LEVEL\"]);\n  game.addAlienInterval = calculateAlienInterval(game.difficulty);\n  console.log(`Score: ${game.score}, level: ${game.difficulty}`);\n};\n\nconst calculateAlienInterval = (difficulty) => {\n  const levels = _settings__WEBPACK_IMPORTED_MODULE_0__[\"ALIEN_INTERVAL_LEVELS\"];\n\n  switch (true) {\n    case (difficulty <= levels[0]):\n      return 3500;\n    case (difficulty <= levels[1]):\n      return 2700 - difficulty * 200;\n    case (difficulty <= levels[2]):\n      return 2300 - difficulty * 100;\n    case (difficulty <= levels[3]):\n      return 1800 - difficulty * 50;\n    case (difficulty <= levels[4]):\n      return 1350 - difficulty * 25;\n    default:\n      return 600;\n  }\n};\n\nconst alienHealth = (difficulty) => {\n  const levels = _settings__WEBPACK_IMPORTED_MODULE_0__[\"ALIEN_HEALTH_LEVELS\"];\n  const r = Math.random();\n\n  switch (true) {\n    case (difficulty <= levels[0]):\n      return 1;\n    case (difficulty <= levels[1]):\n      if (r > 0.75) return 2;\n      return 1;\n    case (difficulty <= levels[2]):\n      if (r > 0.5) return 2;\n      return 1;\n    case (difficulty <= levels[3]):\n      if (r > 0.75) return 3;\n      if (r > 0.5) return 2;\n      return 1;\n    default:\n      if (r > 0.75) return 3;\n      if (r > 0.25) return 2;\n      return 1;\n  }\n};\n\nconst alienSpeed = (difficulty) => {\n  const levels = _settings__WEBPACK_IMPORTED_MODULE_0__[\"ALIEN_SPEED_LEVELS\"];\n  const speeds = _settings__WEBPACK_IMPORTED_MODULE_0__[\"ALIEN_SPEEDS\"];\n  const r = Math.random();\n\n  switch (true) {\n    case (difficulty <= levels[0]):\n      return speeds[0];\n    case (difficulty <= levels[1]):\n      if (r > 0.75) return speeds[1];\n      return speeds[0];\n    case (difficulty <= levels[2]):\n      if (r > 0.5) return speeds[1];\n      return speeds[0];\n    case (difficulty <= levels[3]):\n      if (r > 0.75) return speeds[2];\n      if (r > 0.25) return speeds[1];\n      return speeds[0];\n    case (difficulty <= levels[4]):\n      if (r > 0.5) return speeds[2];\n      return speeds[1];\n    case (difficulty <= levels[5]):\n      if (r > 0.75) return speeds[3];\n      if (r > 0.25) return speeds[2];\n      return speeds[1];\n    default:\n      if (r > 0.5) return speeds[3];\n      return speeds[2];\n  }\n};\n\nconst bulletStrength = (radius) => {\n  const radii = _settings__WEBPACK_IMPORTED_MODULE_0__[\"BULLET_RADIUS_STRENGTH\"];\n  switch (true) {\n    case (radius <= radii[0]):\n      return 0.5;\n    case (radius <= radii[1]):\n      return 1;\n    default:\n      return 2;\n  }\n};\n\n\n//# sourceURL=webpack:///./src/difficulty.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ \"./src/player.js\");\n/* harmony import */ var _alien__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./alien */ \"./src/alien.js\");\n/* harmony import */ var _bullet__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bullet */ \"./src/bullet.js\");\n/* harmony import */ var _difficulty__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./difficulty */ \"./src/difficulty.js\");\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./settings */ \"./src/settings.js\");\n\n\n\n\n\n\nclass Game {\n\n  constructor() {\n    this.player = new _player__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n    this.gameTime = 0;\n    this.aliens = [];\n\n    this.score = _settings__WEBPACK_IMPORTED_MODULE_4__[\"START_SCORE\"];\n    this.gameover = false;\n    Object(_difficulty__WEBPACK_IMPORTED_MODULE_3__[\"calculateDifficulty\"])(this);\n    this.timeLastAlienAdded = -this.addAlienInterval;\n\n    this.bullets = [];\n    this.bulletForming = false;\n\n    this.leftDown = false;\n    this.rightDown = false;\n  }\n\n  keyDownHandler(e) {\n    if (e.keyCode === 39) this.rightDown = true;\n    if (e.keyCode === 37) this.leftDown = true;\n  }\n\n  keyUpHandler(e) {\n    if (e.keyCode === 39) this.rightDown = false;\n    if (e.keyCode === 37) this.leftDown = false;\n  }\n\n  allObjects() {\n    return [].concat(this.aliens, this.bullets, this.player);\n  }\n\n  addAliens() {\n    if (this.gameTime - this.timeLastAlienAdded > this.addAlienInterval) {\n      this.addAlien();\n    }\n  }\n\n  addAlien() {\n    this.timeLastAlienAdded = this.gameTime;\n    this.aliens.push(new _alien__WEBPACK_IMPORTED_MODULE_1__[\"default\"](this.difficulty));\n  }\n\n  processBullets() {\n    if (this.bulletForming) {\n      this.formBullet(this.bullets[this.bullets.length - 1]);\n    } else {\n      if (this.leftDown || this.rightDown) {\n        this.bulletForming = true;\n        this.createBullet();\n      }\n    }\n  }\n\n  createBullet() {\n    const dir = this.leftDown ? -1 : 1;\n    this.bullets.push(new _bullet__WEBPACK_IMPORTED_MODULE_2__[\"default\"](dir, this.gameTime));\n\n    if (this.bullets.length > _settings__WEBPACK_IMPORTED_MODULE_4__[\"MAX_BULLETS\"]) {\n      this.bullets = this.bullets.slice(1);\n    }\n  }\n\n  formBullet(bullet) {\n    if ((bullet.dir === -1 && !this.leftDown) ||\n        (bullet.dir === 1 && !this.rightDown)) {\n      bullet.moving = true;\n      this.bulletForming = false;\n    } else {\n      bullet.updateParameters(this.gameTime);\n    }\n  }\n\n  draw(ctx) {\n    ctx.clearRect(0, 0, _settings__WEBPACK_IMPORTED_MODULE_4__[\"GAME_WIDTH\"], _settings__WEBPACK_IMPORTED_MODULE_4__[\"GAME_HEIGHT\"]);\n    this.allObjects().forEach(obj => obj.draw(ctx));\n\n    const startY = Game.baseY;\n    const startX = Game.baseX;\n    const dy = Game.pyramidDY;\n    const dx = Game.pyramidDX;\n\n    ctx.beginPath();\n    ctx.moveTo(0, startY - 0 * dy);\n    ctx.lineTo(startX + 0 * dx, startY - 0 * dy);\n    ctx.lineTo(startX + 1 * dx, startY - 1 * dy);\n    ctx.lineTo(startX + 2 * dx, startY - 1 * dy);\n    ctx.lineTo(startX + 3 * dx, startY - 2 * dy);\n    ctx.lineTo(startX + 4 * dx, startY - 2 * dy);\n    ctx.lineTo(startX + 5 * dx, startY - 3 * dy);\n    ctx.lineTo(startX + 6 * dx, startY - 3 * dy);\n    ctx.lineTo(startX + 7 * dx, startY - 2 * dy);\n    ctx.lineTo(startX + 8 * dx, startY - 2 * dy);\n    ctx.lineTo(startX + 9 * dx, startY - 1 * dy);\n    ctx.lineTo(startX + 10 * dx, startY - 1 * dy);\n    ctx.lineTo(startX + 11 * dx, startY - 0 * dy);\n    ctx.lineTo(960, startY);\n    ctx.stroke();\n    ctx.closePath();\n  }\n\n  step(timeStep, gameTime) {\n    this.gameTime = gameTime;\n    this.addAliens();\n    this.processBullets();\n    this.allObjects().forEach(obj => obj.step(timeStep));\n    this.checkBulletCollisions();\n    this.checkPlayerCollisions();\n  }\n\n  checkBulletCollisions() {\n    const newBullets = [];\n\n    this.bullets.forEach(bullet => {\n\n      let collision = false;\n      let alienDead = false;\n      let i = 0;\n\n      while (i < this.aliens.length && !collision) {\n        const alien = this.aliens[i];\n\n        if (alien.collidedWithBullet(bullet)) {\n          collision = true;\n          alienDead = alien.health <= 0;\n        }\n\n        i++;\n      }\n\n      if (alienDead) {\n        this.score++;\n        Object(_difficulty__WEBPACK_IMPORTED_MODULE_3__[\"calculateDifficulty\"])(this);\n        this.aliens.splice(i - 1, 1);\n      }\n      if (!collision) newBullets.push(bullet);\n\n    });\n\n    this.bullets = newBullets;\n  }\n\n  checkPlayerCollisions() {\n    const newAliens = [];\n\n    this.aliens.forEach(alien => {\n      if (alien.collidedWithPlayer(this.player)) {\n        this.gameover = true;\n      } else {\n        newAliens.push(alien);\n      }\n    });\n\n    if (this.gameover) {\n      this.aliens = [];\n      this.score = 0;\n      Object(_difficulty__WEBPACK_IMPORTED_MODULE_3__[\"calculateDifficulty\"])(this);\n      this.gameover = false;\n    } else {\n      this.aliens = newAliens;\n    }\n\n  }\n\n}\n\nGame.baseY = 450;\nGame.baseX = 84;\nGame.pyramidDY = 80;\nGame.pyramidDX = 72;\nGame.slope = Game.pyramidDY / Game.pyramidDX;\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Game);\n\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_render.js":
/*!****************************!*\
  !*** ./src/game_render.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n\nclass GameRender {\n\n  constructor(game, ctx) {\n    this.game = game;\n    this.ctx = ctx;\n  }\n\n  startGame() {\n    document.addEventListener('keydown', this.game.keyDownHandler.bind(this.game), false);\n    document.addEventListener('keyup', this.game.keyUpHandler.bind(this.game), false);\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n  animate(time) {\n    const timeStep = time - this.prevTime || 0;\n    this.game.step(timeStep, time);\n    this.game.draw(this.ctx);\n    this.prevTime = time;\n\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (GameRender);\n\n\n//# sourceURL=webpack:///./src/game_render.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _game__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./game */ \"./src/game.js\");\n/* harmony import */ var _game_render__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./game_render */ \"./src/game_render.js\");\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./settings */ \"./src/settings.js\");\n\n\n\n\n\ndocument.addEventListener(\"DOMContentLoaded\", () => {\n  const canvas = document.getElementById('kukulkanvas');\n  const ctx = canvas.getContext('2d');\n  canvas.width = _settings__WEBPACK_IMPORTED_MODULE_2__[\"GAME_WIDTH\"];\n  canvas.height = _settings__WEBPACK_IMPORTED_MODULE_2__[\"GAME_HEIGHT\"];\n\n  const game = new _game__WEBPACK_IMPORTED_MODULE_0__[\"default\"](ctx);\n  new _game_render__WEBPACK_IMPORTED_MODULE_1__[\"default\"](game, ctx).startGame();\n});\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./settings */ \"./src/settings.js\");\n\n\nclass Player {\n\n  constructor() {\n    this.width = 40;\n    this.left = _settings__WEBPACK_IMPORTED_MODULE_0__[\"GAME_WIDTH\"] / 2 - this.width / 2;\n\n    this.maxHeight = 80;\n    this.baseY = 130;\n\n    this.height = this.maxHeight;\n    this.bottom = this.baseY;\n\n    this.angle = 0;\n  }\n\n  draw(ctx) {\n    ctx.beginPath();\n    ctx.rect(this.left, this.bottom, this.width, this.height);\n    ctx.fillStyle = \"#000000\";\n    ctx.fill();\n    ctx.closePath();\n  }\n\n  step(timeStep) {\n    this.height = this.maxHeight - 10 * Math.cos(this.angle);\n    this.bottom = this.baseY + 10 * Math.cos(this.angle);\n    this.angle += 0.01 * timeStep;\n  }\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (Player);\n\n\n//# sourceURL=webpack:///./src/player.js?");

/***/ }),

/***/ "./src/settings.js":
/*!*************************!*\
  !*** ./src/settings.js ***!
  \*************************/
/*! exports provided: START_SCORE, PLAYER_BUFFER, BULLET_BUFFER, KILLS_PER_LEVEL, ALIEN_INTERVAL_LEVELS, ALIEN_HEALTH_LEVELS, ALIEN_SPEED_LEVELS, ALIEN_SPEEDS, BULLET_RADIUS_STRENGTH, START_RADIUS, GRAVITY, MAX_BULLETS, MAX_SIZE, MAX_FORM_TIME, NUM_SIZES, FORM_INTERVAL, bulletVelX, bulletColor, GAME_WIDTH, GAME_HEIGHT, PLAYER_WIDTH, BULLET_HEIGHT, ALIEN_WIDTH, ALIEN_HEIGHT */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"START_SCORE\", function() { return START_SCORE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PLAYER_BUFFER\", function() { return PLAYER_BUFFER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BULLET_BUFFER\", function() { return BULLET_BUFFER; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"KILLS_PER_LEVEL\", function() { return KILLS_PER_LEVEL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ALIEN_INTERVAL_LEVELS\", function() { return ALIEN_INTERVAL_LEVELS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ALIEN_HEALTH_LEVELS\", function() { return ALIEN_HEALTH_LEVELS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ALIEN_SPEED_LEVELS\", function() { return ALIEN_SPEED_LEVELS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ALIEN_SPEEDS\", function() { return ALIEN_SPEEDS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BULLET_RADIUS_STRENGTH\", function() { return BULLET_RADIUS_STRENGTH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"START_RADIUS\", function() { return START_RADIUS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GRAVITY\", function() { return GRAVITY; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAX_BULLETS\", function() { return MAX_BULLETS; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAX_SIZE\", function() { return MAX_SIZE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"MAX_FORM_TIME\", function() { return MAX_FORM_TIME; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NUM_SIZES\", function() { return NUM_SIZES; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"FORM_INTERVAL\", function() { return FORM_INTERVAL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bulletVelX\", function() { return bulletVelX; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"bulletColor\", function() { return bulletColor; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GAME_WIDTH\", function() { return GAME_WIDTH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"GAME_HEIGHT\", function() { return GAME_HEIGHT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"PLAYER_WIDTH\", function() { return PLAYER_WIDTH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"BULLET_HEIGHT\", function() { return BULLET_HEIGHT; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ALIEN_WIDTH\", function() { return ALIEN_WIDTH; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ALIEN_HEIGHT\", function() { return ALIEN_HEIGHT; });\n\nconst START_SCORE = 100;\n\n\n// how much leeway the hitboxes have\nconst PLAYER_BUFFER = 10; // higher is easier\nconst BULLET_BUFFER = 5; // higher is harder. can go negative.\n\n\n// difficulty\n\nconst KILLS_PER_LEVEL = 5;\n\nconst ALIEN_INTERVAL_LEVELS = [\n  0, // 3500 rate\n  4, // 2700 - 200n rate\n  10, // 2500 - 100n rate\n  18, // 1800 - 50n rate (at level = 11, 1250 rate)\n  30, // 1350 - 25n rate\n      // 600 rate\n];\n\nconst ALIEN_HEALTH_LEVELS = [\n  2, // all weak\n  4, // 75% weak, 25% hearty\n  8, // 50% weak, 50% hearty\n  14, // 50% weak, 25% hearty, 25% strong\n      // 25% weak, 50% hearty, 25% strong\n];\n\nconst ALIEN_SPEED_LEVELS = [\n  0, // all slow\n  1, // 75% slow, 25% medium\n  6, // 50% slow, 50% medium\n  12, // 25% slow, 50% medium, 25% fast\n  15, // 50% medium, 50% fast\n  20, // 25% medium, 50% fast, 25% v. fast\n      // 50% fast, 50% v. fast\n];\n\n// 0.03 slow, 0.06 medium, 0.1 fast, 0.15 very fast\nconst ALIEN_SPEEDS = [\n  0.03,\n  0.06,\n  0.1,\n  0.15,\n];\n\nconst BULLET_RADIUS_STRENGTH = [\n  5, // less than this, strength 0.5\n  13, // less than this, strength 1\n      // strength 2\n];\n\n\n// bullet settings\nconst START_RADIUS = 4;\nconst GRAVITY = 0.0004;\nconst MAX_BULLETS = 4;\nconst MAX_SIZE = 20;\nconst MAX_FORM_TIME = 1000;\nconst NUM_SIZES = 10;\nconst FORM_INTERVAL = MAX_FORM_TIME / (NUM_SIZES - 1);\nconst bulletVelX = (direction, radius) => {\n  return direction * Math.pow(radius, 1.25) * 0.01;\n};\n\nconst bulletColor = (strength) => {\n  switch (strength) {\n    case 0.5:\n      return '#27349a';\n    case 1:\n      return '#b540e4';\n    case 2:\n      return '#eb2a67';\n  }\n};\n\n\n\n// Game dimensions\nconst GAME_WIDTH = 960;\nconst GAME_HEIGHT = 540;\nconst PLAYER_WIDTH = 40;\nconst BULLET_HEIGHT = 160;\nconst ALIEN_WIDTH = 40;\nconst ALIEN_HEIGHT = 60;\n\n\n//# sourceURL=webpack:///./src/settings.js?");

/***/ })

/******/ });