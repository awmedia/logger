(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Logger"] = factory();
	else
		root["Logger"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "dist";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _Logger = __webpack_require__(1);
	
	var _Logger2 = _interopRequireDefault(_Logger);
	
	var _ConsoleAdapter = __webpack_require__(2);
	
	var _ConsoleAdapter2 = _interopRequireDefault(_ConsoleAdapter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var logger = new _Logger2.default({
	    level: _Logger.LEVEL_ALL,
	    appendLogId: true,
	    adapters: [new _ConsoleAdapter2.default()],
	    contextDecorator: function contextDecorator(context) {
	        context.someProperty = 'someValue';
	        return context;
	    }
	});
	
	logger.info('Test info event is triggered with event id: "{eventId}"', { eventId: 789 });
	logger.debug('Test debug event is triggered with event id: "{eventId}"', { eventId: 791 });
	logger.warning('Test warning event is triggered with event id: "{eventId}"', { eventId: 791 });
	logger.warn('Test warning, through warn alias, event is triggered with event id: "{eventId}"', { eventId: 791 });
	logger.error('Test error event is triggered with event id: "{eventId}"', { eventId: 790 });
	
	logger.info('Info log with custom contextDecorator property of: "someProperty" with value: "{someProperty}"');
	
	module.exports = logger;

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	
	// Define types
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _typeLevelMapping;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var EMERGENCY = exports.EMERGENCY = 'emergency';
	var ALERT = exports.ALERT = 'alert';
	var CRITICAL = exports.CRITICAL = 'critical';
	var ERROR = exports.ERROR = 'error';
	var WARNING = exports.WARNING = 'warning';
	var NOTICE = exports.NOTICE = 'notice';
	var INFO = exports.INFO = 'info';
	var DEBUG = exports.DEBUG = 'debug';
	
	// Define levels
	var LEVEL_NONE = exports.LEVEL_NONE = 0;
	var LEVEL_EMERGENCY = exports.LEVEL_EMERGENCY = 1;
	var LEVEL_ALERT = exports.LEVEL_ALERT = 2;
	var LEVEL_CRITICAL = exports.LEVEL_CRITICAL = 4;
	var LEVEL_ERROR = exports.LEVEL_ERROR = 8;
	var LEVEL_WARNING = exports.LEVEL_WARNING = 16;
	var LEVEL_NOTICE = exports.LEVEL_NOTICE = 32;
	var LEVEL_INFO = exports.LEVEL_INFO = 64;
	var LEVEL_DEBUG = exports.LEVEL_DEBUG = 128;
	var LEVEL_ALL = exports.LEVEL_ALL = 255;
	
	// Define mapping between types and levels
	var typeLevelMapping = (_typeLevelMapping = {}, _defineProperty(_typeLevelMapping, EMERGENCY, LEVEL_EMERGENCY), _defineProperty(_typeLevelMapping, ALERT, LEVEL_ALERT), _defineProperty(_typeLevelMapping, CRITICAL, LEVEL_CRITICAL), _defineProperty(_typeLevelMapping, ERROR, LEVEL_ERROR), _defineProperty(_typeLevelMapping, WARNING, LEVEL_WARNING), _defineProperty(_typeLevelMapping, NOTICE, LEVEL_NOTICE), _defineProperty(_typeLevelMapping, INFO, LEVEL_INFO), _defineProperty(_typeLevelMapping, DEBUG, LEVEL_DEBUG), _typeLevelMapping);
	
	/**
	 * Logger
	 * Specification: https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md
	 * @todo - implement flush
	 */
	
	var Logger = function () {
	    function Logger(config) {
	        _classCallCheck(this, Logger);
	
	        this._level = config.hasOwnProperty('level') ? config.level : LEVEL_ALL;
	        this._adapters = config.hasOwnProperty('adapters') && config.adapters.hasOwnProperty('length') ? config.adapters : [];
	        this._appendLogId = config.appendLogId === true;
	        this._contextDecorator = config.hasOwnProperty('contextDecorator') ? config.contextDecorator : null;
	        this._instanceContext = {};
	
	        // create alias (console.log)
	        this.warn = this.warning;
	    }
	
	    /**
	     * Public methods
	     */
	
	    /**
	     * addAdapter
	     * @param adapter
	     * @return {Logger}
	     */
	
	
	    _createClass(Logger, [{
	        key: 'addAdapter',
	        value: function addAdapter(adapter) {
	            this._adapters.push(adapter);
	            return this;
	        }
	
	        /**
	         * setInstanceContext
	         * @param context
	         */
	
	    }, {
	        key: 'setInstanceContext',
	        value: function setInstanceContext(context) {
	            for (var key in context) {
	                this._instanceContext[key] = context[key];
	            }
	        }
	
	        /**
	         * Public logging methods
	         */
	
	    }, {
	        key: 'emergency',
	        value: function emergency(message) {
	            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            return this.log(EMERGENCY, message, context);
	        }
	    }, {
	        key: 'alert',
	        value: function alert(message) {
	            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            return this.log(ALERT, message, context);
	        }
	    }, {
	        key: 'critical',
	        value: function critical(message) {
	            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            return this.log(CRITICAL, message, context);
	        }
	    }, {
	        key: 'error',
	        value: function error(message) {
	            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            return this.log(ERROR, message, context);
	        }
	    }, {
	        key: 'warning',
	        value: function warning(message) {
	            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            return this.log(WARNING, message, context);
	        }
	    }, {
	        key: 'notice',
	        value: function notice(message) {
	            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            return this.log(NOTICE, message, context);
	        }
	    }, {
	        key: 'info',
	        value: function info(message) {
	            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            return this.log(INFO, message, context);
	        }
	    }, {
	        key: 'debug',
	        value: function debug(message) {
	            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            return this.log(DEBUG, message, context);
	        }
	    }, {
	        key: 'log',
	        value: function log(type, message) {
	            var _this = this;
	
	            var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	            var typeLevel = this._getLevelByType(type),
	                id = this._genId();
	
	            if (this._adapters.length && (this._level & typeLevel) > 0) {
	                var _ret = function () {
	                    '';
	                    var preparedContext = _this._prepareAndDecorateContext(context, { _id: id }),
	                        log = _this._prepareAndGetLog(message, preparedContext);
	
	                    _this._adapters.forEach(function (adapter) {
	                        return adapter.log(type, log);
	                    });
	                    return {
	                        v: id
	                    };
	                }();
	
	                if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	            }
	
	            return null;
	        }
	
	        /**
	         * Protected methods
	         */
	
	    }, {
	        key: '_prepareAndDecorateContext',
	        value: function _prepareAndDecorateContext(originContext) {
	            var additionalContext = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            var context = Object.assign(this._instanceContext, originContext, additionalContext);
	
	            if (this._contextDecorator) {
	                context = this._contextDecorator(context);
	            }
	
	            return context;
	        }
	    }, {
	        key: '_prepareAndGetLog',
	        value: function _prepareAndGetLog(message) {
	            var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
	
	            var hasIdPlaceholder = message.indexOf('{_id}') !== -1;
	
	            var log = message.replace(/{([^{}]*)}/g, function (a, b) {
	                var r = context[b];
	                return typeof r === 'string' || typeof r === 'number' ? r : a;
	            });
	
	            if (!hasIdPlaceholder && this._appendLogId) {
	                log += ' (ref: ' + context._id + ')';
	            }
	
	            return log;
	        }
	    }, {
	        key: '_getLevelByType',
	        value: function _getLevelByType(type) {
	            return typeLevelMapping.hasOwnProperty(type) ? typeLevelMapping[type] : LEVEL_NONE;
	        }
	    }, {
	        key: '_genId',
	        value: function _genId() {
	            return Date.now();
	        }
	    }]);
	
	    return Logger;
	}();
	
	exports.default = Logger;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp, _class$_levelToMethod;
	
	var _Logger = __webpack_require__(1);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * ConsoleAdapter
	 */
	var ConsoleAdapter = (_temp = _class = function () {
	    function ConsoleAdapter() {
	        _classCallCheck(this, ConsoleAdapter);
	    }
	
	    _createClass(ConsoleAdapter, [{
	        key: 'log',
	
	
	        /**
	         * Public methods
	         */
	
	        value: function log(level, message) {
	            if (level in ConsoleAdapter._levelToMethodMapping) {
	                console[ConsoleAdapter._levelToMethodMapping[level]](message);
	            }
	        }
	    }]);
	
	    return ConsoleAdapter;
	}(), _class._levelToMethodMapping = (_class$_levelToMethod = {}, _defineProperty(_class$_levelToMethod, _Logger.EMERGENCY, 'error'), _defineProperty(_class$_levelToMethod, _Logger.ALERT, 'error'), _defineProperty(_class$_levelToMethod, _Logger.CRITICAL, 'error'), _defineProperty(_class$_levelToMethod, _Logger.ERROR, 'error'), _defineProperty(_class$_levelToMethod, _Logger.WARNING, 'warn'), _defineProperty(_class$_levelToMethod, _Logger.NOTICE, 'warn'), _defineProperty(_class$_levelToMethod, _Logger.INFO, 'info'), _defineProperty(_class$_levelToMethod, _Logger.DEBUG, 'log'), _class$_levelToMethod), _temp);
	exports.default = ConsoleAdapter;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=example.map