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
	
	  var simulation = new _sim_view2.default(new _simulation2.default(), ctx);
	  simulation.start();
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var Sim = function () {
	  function Sim() {
	    var DIM_X = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
	    var DIM_Y = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1000;
	    var NUM_MOLECULES = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 50;
	
	    _classCallCheck(this, Sim);
	
	    this.DIM_X = DIM_X;
	    this.DIM_Y = DIM_Y;
	    this.waterMols = [];
	
	    while (this.waterMols.length < NUM_MOLECULES) {
	      var newMol = this.addWater();
	      for (var i = 0; i < this.waterMols.length - 1; i++) {
	        if (newMol.isCollidedWith(this.waterMols[i])) {
	          this.waterMols.pop();
	        }
	      }
	    }
	  }
	
	  _createClass(Sim, [{
	    key: 'addWater',
	    value: function addWater() {
	      var waterMol = new _water_mol2.default();
	      this.waterMols.push(waterMol);
	      return waterMol;
	    }
	  }, {
	    key: 'draw',
	    value: function draw(ctx) {
	      ctx.clearRect(0, 0, 1000, 1000);
	      this.waterMols.forEach(function (mol) {
	        return mol.draw(ctx);
	      });
	    }
	  }, {
	    key: 'moveObjects',
	    value: function moveObjects() {
	      this.waterMols.forEach(function (mol) {
	        return mol.move();
	      });
	    }
	  }, {
	    key: 'checkCollisions',
	    value: function checkCollisions() {
	      for (var i = 0; i < this.waterMols.length - 1; i++) {
	        for (var j = i + 1; j < this.waterMols.length; j++) {
	          var mol1 = this.waterMols[i];
	          var mol2 = this.waterMols[j];
	          if (mol1.isCollidedWith(mol2)) {
	            mol1.separateObjects(mol2);
	            mol1.handleElasticCollision(mol2);
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
	  return 15;
	};
	
	var VELOCITY = 8;
	
	var WaterMol = function (_Mol) {
	  _inherits(WaterMol, _Mol);
	
	  function WaterMol() {
	    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
	
	    _classCallCheck(this, WaterMol);
	
	    options.color = '#D3D3D3';
	    options.radius = RADIUS();
	    options.pos = [Math.floor(Math.random() * 1000), Math.floor(Math.random() * 1000)];
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
	  newVel: function newVel(r1, r2, v1, v2) {
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
	      console.log(window.innerHeight);
	      if (this.pos[0] < 0) {
	        this.pos[0] = 0;
	        this.vel[0] *= -1;
	      }
	      if (this.pos[0] > window.innerWidth - 20) {
	        this.pos[0] = window.innerWidth - 20;
	        this.vel[0] *= -1;
	      }
	      if (this.pos[1] < 0) {
	        this.pos[1] = 0;
	        this.vel[1] *= -1;
	      }
	      if (this.pos[1] > window.innerHeight - 20) {
	        this.pos[1] = window.innerHeight - 20;
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
	      return dist <= r1 + r2 + 2;
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
	      var final_xvel_this = _util2.default.newVel(this.radius, other.radius, new_xvel_this, new_xvel_other);
	      var final_xvel_other = _util2.default.newVel(other.radius, this.radius, new_xvel_other, new_xvel_this);
	      var final_yvel_this = new_yvel_this;
	      var final_yvel_other = new_yvel_this;
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
	  }]);
	
	  return Mol;
	}();
	
	exports.default = Mol;

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map