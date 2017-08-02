/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
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
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var _sim_view = __webpack_require__(1);
	
	var _sim_view2 = _interopRequireDefault(_sim_view);
	
	var _simulation = __webpack_require__(2);
	
	var _simulation2 = _interopRequireDefault(_simulation);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	document.addEventListener("DOMContentLoaded", function () {
	  var canvas = document.getElementById('canvas');
	  var ctx = canvas.getContext('2d');
	  var dropButton = document.getElementById('drop-btn');
	  var hideButton = document.getElementById('hide-btn');
	  var resetButton = document.getElementById('reset-btn');
	  var tempBar = document.getElementById('range-bar');
	  var simView = new _sim_view2.default(new _simulation2.default(), ctx);
	  simView.start();
	  dropButton.addEventListener('click', function () {
	    return simView.addDrop();
	  });
	  hideButton.addEventListener('click', function () {
	    return simView.toggleWater();
	  });
	  resetButton.addEventListener('click', function () {
	    return location.reload();
	  });
	  tempBar.addEventListener('input', function (e) {
	    e.preventDefault();
	    var newTemp = parseInt(e.currentTarget.value);
	    simView.handleTempChange(newTemp);
	  });
	});

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var SimView = function () {
	  function SimView(simulation, ctx) {
	    _classCallCheck(this, SimView);
	
	    this.simulation = simulation;
	    this.ctx = ctx;
	  }
	
	  _createClass(SimView, [{
	    key: "start",
	    value: function start() {
	      var _this = this;
	
	      setInterval(function () {
	        return _this.movement();
	      }, Math.floor(1000 / 30));
	      setInterval(function () {
	        return _this.simulation.draw(_this.ctx);
	      }, Math.floor(1000 / 30));
	    }
	  }, {
	    key: "movement",
	    value: function movement() {
	      this.simulation.moveObjects();
	      this.simulation.checkCollisions();
	    }
	  }, {
	    key: "addDrop",
	    value: function addDrop() {
	      this.simulation.addDrop();
	    }
	  }, {
	    key: "toggleWater",
	    value: function toggleWater() {
	      this.simulation.toggleWater();
	    }
	  }, {
	    key: "handleTempChange",
	    value: function handleTempChange(newTemp) {
	      this.simulation.handleTempChange(newTemp);
	    }
	  }]);
	
	  return SimView;
	}();
	
	exports.default = SimView;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _water_mol = __webpack_require__(3);
	
	var _water_mol2 = _interopRequireDefault(_water_mol);
	
	var _color_drop = __webpack_require__(6);
	
	var _color_drop2 = _interopRequireDefault(_color_drop);
	
	var _color_drop_mol = __webpack_require__(7);
	
	var _color_drop_mol2 = _interopRequireDefault(_color_drop_mol);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Sim = function () {
	  function Sim() {
	    var DIM_X = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
	    var DIM_Y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
	    var NUM_MOLECULES = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 600;
	
	    _classCallCheck(this, Sim);
	
	    this.DIM_X = DIM_X;
	    this.DIM_Y = DIM_Y;
	    this.mols = [];
	
	    while (this.mols.length < NUM_MOLECULES) {
	      var newWaterMol = this.addWater();
	      for (var i = 0; i < this.mols.length - 1; i++) {
	        if (newWaterMol.isCollidedWith(this.mols[i])) {
	          this.mols.pop();
	        }
	      }
	    }
	  }
	
	  _createClass(Sim, [{
	    key: 'addWater',
	    value: function addWater() {
	      var waterMol = new _water_mol2.default();
	      this.mols.push(waterMol);
	      return waterMol;
	    }
	  }, {
	    key: 'toggleWater',
	    value: function toggleWater() {
	      this.mols.forEach(function (mol) {
	        if (mol.constructor.name == 'WaterMol') {
	          mol.color = mol.color == '#e7fafe' ? '#dae1e2' : '#e7fafe';
	        }
	      });
	    }
	  }, {
	    key: 'addDrop',
	    value: function addDrop() {
	      var numDrops = document.getElementById('drop-count').value;
	      if (numDrops > 500) {
	        numDrops = 500;
	      } else if (numDrops < 0) {
	        numDrops = 0;
	      }
	      for (var i = 0; i < numDrops; i++) {
	        var newDrop = new _color_drop_mol2.default();
	        this.mols.push(newDrop);
	      }
	      // newDrop.colorDrop.forEach(mol => this.mols.push(mol));
	    }
	
	    // Temp ~ K.E. KE = 1/2 * m * v^2
	    // v^2 = 2KE/m
	    // v = sqrt2KE/m
	
	  }, {
	    key: 'handleTempChange',
	    value: function handleTempChange(newTemp) {
	      var multiplier = 1 + (newTemp - 10) / 25;
	      var energyRatio = multiplier / this.mols[0].tempMultipler;
	      this.mols.forEach(function (mol) {
	        mol.vel[0] *= energyRatio;
	        mol.vel[1] *= energyRatio;
	        mol.tempMultipler = multiplier;
	      });
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.clearRect(0, 0, 1000, 1000);
	      this.mols.forEach(function (mol) {
	        return mol.draw(ctx);
	      });
	    }
	  }, {
	    key: 'moveObjects',
	    value: function moveObjects() {
	      this.mols.forEach(function (mol) {
	        return mol.move();
	      });
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {
	      for (var i = 0; i < this.mols.length - 1; i++) {
	        for (var j = i + 1; j < this.mols.length; j++) {
	          var mol1 = this.mols[i];
	          var mol2 = this.mols[j];
	          if (mol1.isCollidedWith(mol2)) {
	            mol1.separateObjects(mol2);
	            mol1.handleElasticCollision(mol2);
	
	            mol1.blendColors(mol2);
	          }
	        }
	      }
	    }
	  }]);
	
	  return Sim;
	}();
	
	exports.default = Sim;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _util = __webpack_require__(4);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _mol = __webpack_require__(5);
	
	var _mol2 = _interopRequireDefault(_mol);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var COLORS = function COLORS() {
	  return '#' + Math.floor(Math.random() * 16777215).toString(16);
	};
	
	var RADIUS = function RADIUS() {
	  return 3;
	};
	
	var VELOCITY = 0.5;
	
	var WaterMol = function (_Mol) {
	  _inherits(WaterMol, _Mol);
	
	  function WaterMol() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, WaterMol);
	
	    options.color = '#e7fafe';
	    options.radius = RADIUS();
	    options.pos = [Math.floor(Math.random() * 500), Math.floor(Math.random() * 500)];
	    options.vel = [(Math.random() - 0.5) * VELOCITY, (Math.random() - 0.5) * VELOCITY];
	    return _possibleConstructorReturn(this, (WaterMol.__proto__ || Object.getPrototypeOf(WaterMol)).call(this, options));
	  }
	
	  return WaterMol;
	}(_mol2.default);
	
	exports.default = WaterMol;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var Util = {
	  elasticCollision: function elasticCollision(r1, r2, v1, v2) {
	    var mass1 = r1 * r1 * Math.PI;
	    var mass2 = r2 * r2 * Math.PI;
	    return (v1 * (mass1 - mass2) + 2 * mass2 * v2) / (mass1 + mass2);
	  },
	  dist: function dist(x1, x2, y1, y2) {
	    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
	  }
	};
	
	exports.default = Util;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _util = __webpack_require__(4);
	
	var _util2 = _interopRequireDefault(_util);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Mol = function () {
	  function Mol(options) {
	    _classCallCheck(this, Mol);
	
	    this.pos = options.pos;
	    this.vel = options.vel;
	    this.radius = options.radius;
	    this.color = options.color;
	    this.tempMultipler = 1;
	  }
	
	  _createClass(Mol, [{
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.fillStyle = this.color;
	      ctx.beginPath();
	
	      ctx.arc(this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, false);
	      ctx.fill();
	    }
	  }, {
	    key: 'move',
	    value: function move() {
	      if (this.pos[0] < 5) {
	        this.pos[0] = 5;
	        this.vel[0] *= -1;
	      }
	      if (this.pos[0] > 495) {
	        this.pos[0] = 495;
	        this.vel[0] *= -1;
	      }
	      if (this.pos[1] < 0) {
	        this.pos[1] = 0;
	        this.vel[1] *= -1;
	      }
	      if (this.pos[1] > 495) {
	        this.pos[1] = 495;
	        this.vel[1] *= -1;
	      }
	      this.pos[0] += this.vel[0];
	      this.pos[1] += this.vel[1];
	      // this.pos[0] = (this.pos[0] + this.vel[0]) % 1000;
	      // this.pos[0] < 0 ? this.pos[0] += 1000 : this.pos[0] ;
	      // this.pos[1] = (this.pos[1] + this.vel[1]) % 1000;
	      // this.pos[1] < 0 ? this.pos[1] += 1000 : this.pos[1];
	    }
	  }, {
	    key: 'isCollidedWith',
	    value: function isCollidedWith(other) {
	      var x1 = this.pos[0];
	      var y1 = this.pos[1];
	      var x2 = other.pos[0];
	      var y2 = other.pos[1];
	      var dist = _util2.default.dist(x1, x2, y1, y2);
	      var r1 = this.radius;
	      var r2 = other.radius;
	      return dist <= r1 + r2 + .5;
	    }
	
	    // handleElasticCollision(other) {
	    //   let thisOldX = this.vel[0];
	    //   let thisOldY = this.vel[1];
	    //   let otherOldX = this.vel[0];
	    //   let otherOldY = this.vel[1];
	    //   this.vel[0] = Util.newVel(this.radius, other.radius, thisOldX, otherOldX);
	    //   this.vel[1] = Util.newVel(this.radius, other.radius, thisOldY, otherOldY);
	    //   other.vel[0] = Util.newVel(other.radius, this.radius, otherOldX, thisOldX);
	    //   other.vel[1] = Util.newVel(other.radius, this.radius, otherOldY, thisOldY);
	    // }
	
	  }, {
	    key: 'handleElasticCollision',
	    value: function handleElasticCollision(other) {
	      var dx = this.pos[0] - other.pos[0];
	      var dy = this.pos[1] - other.pos[1];
	      var col_angle = Math.atan2(dy, dx);
	      var magnitude_this = Math.sqrt(this.vel[0] * this.vel[0] + this.vel[1] * this.vel[1]);
	      var magnitude_other = Math.sqrt(other.vel[0] * other.vel[0] + other.vel[1] * other.vel[1]);
	      var dir_this = Math.atan2(this.vel[1], this.vel[0]);
	      var dir_other = Math.atan2(other.vel[1], other.vel[0]);
	      var new_xvel_this = magnitude_this * Math.cos(dir_this - col_angle);
	      var new_yvel_this = magnitude_this * Math.sin(dir_this - col_angle);
	      var new_xvel_other = magnitude_other * Math.cos(dir_other - col_angle);
	      var new_yvel_other = magnitude_other * Math.sin(dir_other - col_angle);
	      var final_xvel_this = _util2.default.elasticCollision(this.radius, other.radius, new_xvel_this, new_xvel_other);
	      var final_xvel_other = _util2.default.elasticCollision(other.radius, this.radius, new_xvel_other, new_xvel_this);
	      var final_yvel_this = new_yvel_this;
	      var final_yvel_other = new_yvel_other;
	
	      // let final_yvel_this = Util.elasticCollision(this.radius, other.radius, new_yvel_this, new_yvel_other);
	      // let final_yvel_other = Util.elasticCollision(other.radius, this.radius, new_yvel_other, new_yvel_this);
	      this.vel[0] = Math.cos(col_angle) * final_xvel_this + Math.cos(col_angle + Math.PI / 2) * final_yvel_this;
	      this.vel[1] = Math.sin(col_angle) * final_xvel_this + Math.sin(col_angle + Math.PI / 2) * final_yvel_this;
	      other.vel[0] = Math.cos(col_angle) * final_xvel_other + Math.cos(col_angle + Math.PI / 2) * final_yvel_other;
	      other.vel[1] = Math.sin(col_angle) * final_xvel_other + Math.sin(col_angle + Math.PI / 2) * final_yvel_other;
	      ;
	    }
	  }, {
	    key: 'separateObjects',
	    value: function separateObjects(other) {
	      var x1 = this.pos[0];
	      var y1 = this.pos[1];
	      var x2 = other.pos[0];
	      var y2 = other.pos[1];
	      var distBetween = _util2.default.dist(x1, x2, y1, y2);
	      var r1 = this.radius;
	      var r2 = other.radius;
	      var overlapDist = r1 + r2 - distBetween;
	      var dx = (x2 - x1) / overlapDist;
	      var dy = (y2 - y1) / overlapDist;
	      this.pos[0] -= overlapDist / 15 * dx;
	      this.pos[1] -= overlapDist / 15 * dy;
	      other.pos[0] += overlapDist / 15 * dx;
	      other.pos[1] += overlapDist / 15 * dy;
	    }
	
	    // https://coderwall.com/p/z8uxzw/javascript-color-blender taken from here
	
	  }, {
	    key: 'blendColors',
	    value: function blendColors(other) {
	      var color1 = this.color;
	      var color2 = other.color;
	      if (color1.length == 4) color1 = color1[1] + color1[1] + color1[2] + color1[2] + color1[3] + color1[3];else color1 = color1.substring(1);
	      if (color2.length == 4) color2 = color2[1] + color2[1] + color2[2] + color2[2] + color2[3] + color2[3];else color2 = color2.substring(1);
	      color1 = [parseInt(color1[0] + color1[1], 16), parseInt(color1[2] + color1[3], 16), parseInt(color1[4] + color1[5], 16)];
	      color2 = [parseInt(color2[0] + color2[1], 16), parseInt(color2[2] + color2[3], 16), parseInt(color2[4] + color2[5], 16)];
	      var color3 = [(1 - 0.5) * color1[0] + 0.5 * color2[0], (1 - 0.5) * color1[1] + 0.5 * color2[1], (1 - 0.5) * color1[2] + 0.5 * color2[2]];
	      color3 = '#' + this.int_to_hex(color3[0]) + this.int_to_hex(color3[1]) + this.int_to_hex(color3[2]);
	      this.color = color3;
	      other.color = color3;
	    }
	  }, {
	    key: 'int_to_hex',
	    value: function int_to_hex(num) {
	      var hex = Math.round(num).toString(16);
	      if (hex.length == 1) hex = '0' + hex;
	      return hex;
	    }
	  }]);
	
	  return Mol;
	}();
	
	exports.default = Mol;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _color_drop_mol = __webpack_require__(7);
	
	var _color_drop_mol2 = _interopRequireDefault(_color_drop_mol);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var ColorDrop = function () {
	  function ColorDrop() {
	    var X_POS = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 250;
	    var mols = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;
	
	    _classCallCheck(this, ColorDrop);
	
	    this.pos = X_POS, this.mols = mols;
	    this.colorDrop = this.createMols();
	  }
	
	  _createClass(ColorDrop, [{
	    key: 'createMols',
	    value: function createMols() {
	      var colorDrops = [];
	
	      var newMol = new _color_drop_mol2.default();
	      while (colorDrops.length < this.mols) {
	        colorDrops.push(newMol);
	        for (var i = 0; i < colorDrops.length - 1; i++) {
	          if (newMol.isCollidedWith(colorDrops[i])) {
	            colorDrops.pop;
	          }
	        }
	      }
	      return colorDrops;
	    }
	  }]);
	
	  return ColorDrop;
	}();
	
	exports.default = ColorDrop;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _util = __webpack_require__(4);
	
	var _util2 = _interopRequireDefault(_util);
	
	var _mol = __webpack_require__(5);
	
	var _mol2 = _interopRequireDefault(_mol);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var RADIUS = function RADIUS() {
	  return 2;
	};
	
	var VELOCITY = 2;
	
	var ColorDropMol = function (_Mol) {
	  _inherits(ColorDropMol, _Mol);
	
	  function ColorDropMol() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, ColorDropMol);
	
	    options.color = document.getElementById('color').value;
	    options.radius = RADIUS();
	    options.pos = [Math.floor(Math.random() * 6) + 247, 0];
	    options.vel = [0, -1 * VELOCITY];
	    return _possibleConstructorReturn(this, (ColorDropMol.__proto__ || Object.getPrototypeOf(ColorDropMol)).call(this, options));
	  }
	
	  return ColorDropMol;
	}(_mol2.default);
	
	exports.default = ColorDropMol;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map