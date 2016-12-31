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
	
	var _HtmlListAdapter = __webpack_require__(3);
	
	var _HtmlListAdapter2 = _interopRequireDefault(_HtmlListAdapter);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var logger = new _Logger2.default({
	    level: _Logger.LEVEL_ALL,
	    appendLogId: true,
	    adapters: [new _ConsoleAdapter2.default(), new _HtmlListAdapter2.default({})],
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
	 * @param   config.level            Level to log (LEVEL_EMERGENCY, LEVEL_WARNING, LEVEL_DEBUG, etc)
	 * @param   config.adapters         Array with adapters (functions or objects with a log method)
	 * @param   config.appendLogId      True to automatically append the log id to the log (" (ref: 000000000000)")
	 * @param   config.contextDecorator Function that decorates the context object, before every log call, and that returns the decorated result
	 */
	
	var Logger = function () {
	    function Logger() {
	        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : config,
	            _ref$level = _ref.level,
	            level = _ref$level === undefined ? LEVEL_ALL : _ref$level,
	            _ref$adapters = _ref.adapters,
	            adapters = _ref$adapters === undefined ? [] : _ref$adapters,
	            _ref$appendLogId = _ref.appendLogId,
	            appendLogId = _ref$appendLogId === undefined ? false : _ref$appendLogId,
	            contextDecorator = _ref.contextDecorator;
	
	        _classCallCheck(this, Logger);
	
	        this._level = level;
	        this._adapters = adapters;
	        this._appendLogId = appendLogId;
	        this._contextDecorator = contextDecorator;
	        this._instanceContext = {};
	
	        // create alias
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
	
	        /**
	         * Log
	         * @param   string  Log type (error, warning, info, etc (check consts))
	         * @param   string  Log message, optional with placeholders to replace with context data
	         * @param   object  context data that will be used replace with placeholders in message
	         */
	
	    }, {
	        key: 'log',
	        value: function log(type, message) {
	            var _this = this;
	
	            var context = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
	
	            var typeLevel = this._getLevelByType(type),
	                id = this._genId();
	
	            if (this._adapters.length && (this._level & typeLevel) > 0) {
	                var _ret = function () {
	                    var preparedContext = _this._prepareAndDecorateContext(context, { _id: id }),
	                        log = _this._prepareAndGetLog(message, preparedContext);
	
	                    _this._adapters.forEach(function (adapter) {
	                        return typeof adapter == 'function' ? adapter(type, log) : adapter.log(type, log);
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
	            return Date.now() + Math.floor(Math.random() * 9999 + 1);
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
	
	        value: function log(type, message) {
	            if (type in ConsoleAdapter._levelToMethodMapping) {
	                console[ConsoleAdapter._levelToMethodMapping[type]](message);
	            }
	        }
	    }]);
	
	    return ConsoleAdapter;
	}(), _class._levelToMethodMapping = (_class$_levelToMethod = {}, _defineProperty(_class$_levelToMethod, _Logger.EMERGENCY, 'error'), _defineProperty(_class$_levelToMethod, _Logger.ALERT, 'error'), _defineProperty(_class$_levelToMethod, _Logger.CRITICAL, 'error'), _defineProperty(_class$_levelToMethod, _Logger.ERROR, 'error'), _defineProperty(_class$_levelToMethod, _Logger.WARNING, 'warn'), _defineProperty(_class$_levelToMethod, _Logger.NOTICE, 'warn'), _defineProperty(_class$_levelToMethod, _Logger.INFO, 'info'), _defineProperty(_class$_levelToMethod, _Logger.DEBUG, 'log'), _class$_levelToMethod), _temp);
	exports.default = ConsoleAdapter;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _class, _temp, _class$_typeToColorMa;
	
	var _Logger = __webpack_require__(1);
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * HtmlListAdapter
	 */
	var HtmlListAdapter = (_temp = _class = function () {
	    function HtmlListAdapter() {
	        var _this = this;
	
	        var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : config,
	            targetElement = _ref.targetElement,
	            _ref$listType = _ref.listType,
	            listType = _ref$listType === undefined ? 'ul' : _ref$listType,
	            _ref$listClassName = _ref.listClassName,
	            listClassName = _ref$listClassName === undefined ? '' : _ref$listClassName,
	            _ref$listItemClassNam = _ref.listItemClassName,
	            listItemClassName = _ref$listItemClassNam === undefined ? '' : _ref$listItemClassNam,
	            _ref$isColorModeEnabl = _ref.isColorModeEnabled,
	            isColorModeEnabled = _ref$isColorModeEnabl === undefined ? true : _ref$isColorModeEnabl;
	
	        _classCallCheck(this, HtmlListAdapter);
	
	        this._targetElement = targetElement;
	        this._listType = listType;
	        this._listClassName = listClassName;
	        this._listItemClassName = listItemClassName;
	        this._isColorModeEnabled = isColorModeEnabled;
	
	        this._isListInitialized = false;
	        this._listElement = null;
	
	        this._isReady = new Promise(function (resolve) {
	            _this._isReadyResolver = resolve;
	        });
	
	        document.addEventListener('DOMContentLoaded', this._isReadyResolver);
	        window.addEventListener('load', this._isReadyResolver);
	
	        if (document.readyState === 'complete') {
	            this._isReadyResolver();
	        }
	    }
	
	    /**
	     * Public methods
	     */
	
	    _createClass(HtmlListAdapter, [{
	        key: 'log',
	        value: function log(type, _log) {
	            var _this2 = this;
	
	            this._isReady.then(function () {
	                if (!_this2._isListInitialized) {
	                    _this2._initList();
	                }
	
	                _this2._listElement.appendChild(_this2._createAndGetNewListItem(type, _log));
	            });
	        }
	
	        /**
	         * Protected methods
	         */
	
	    }, {
	        key: '_initList',
	        value: function _initList() {
	            if (!this._isListInitialized) {
	                if (!this._targetFrame) {
	                    this._targetElement = document.body;
	                }
	
	                this._listElement = document.createElement(this._listType);
	                this._listElement.className = this._listClassName;
	                this._targetElement.appendChild(this._listElement);
	
	                this._isListInitialized = true;
	            }
	        }
	    }, {
	        key: '_createAndGetNewListItem',
	        value: function _createAndGetNewListItem(type, log) {
	            var item = document.createElement('li');
	            item.textContent = log;
	            item.className = this._listItemClassName + ('' + type.toLowerCase());
	            if (this._isColorModeEnabled) {
	                item.style.color = HtmlListAdapter._typeToColorMapping[type];
	            }
	            return item;
	        }
	    }]);
	
	    return HtmlListAdapter;
	}(), _class._typeToColorMapping = (_class$_typeToColorMa = {}, _defineProperty(_class$_typeToColorMa, _Logger.EMERGENCY, '#F40404'), _defineProperty(_class$_typeToColorMa, _Logger.ALERT, '#F42C04'), _defineProperty(_class$_typeToColorMa, _Logger.CRITICAL, '#F42C04'), _defineProperty(_class$_typeToColorMa, _Logger.ERROR, '#F42C04'), _defineProperty(_class$_typeToColorMa, _Logger.WARNING, '#F46804'), _defineProperty(_class$_typeToColorMa, _Logger.NOTICE, '#F4A404'), _defineProperty(_class$_typeToColorMa, _Logger.INFO, '#0440F4'), _defineProperty(_class$_typeToColorMa, _Logger.DEBUG, '#212121'), _class$_typeToColorMa), _temp);
	exports.default = HtmlListAdapter;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=example.map