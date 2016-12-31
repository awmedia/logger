'use strict';

// Define types
export const EMERGENCY = 'emergency';
export const ALERT = 'alert';
export const CRITICAL = 'critical';
export const ERROR = 'error';
export const WARNING = 'warning';
export const NOTICE = 'notice';
export const INFO = 'info';
export const DEBUG = 'debug';

// Define levels
export const LEVEL_NONE = 0;
export const LEVEL_EMERGENCY = 1;
export const LEVEL_ALERT = 2;
export const LEVEL_CRITICAL = 4;
export const LEVEL_ERROR = 8;
export const LEVEL_WARNING = 16;
export const LEVEL_NOTICE = 32;
export const LEVEL_INFO = 64;
export const LEVEL_DEBUG = 128;
export const LEVEL_ALL = 255;

// Define mapping between types and levels
const typeLevelMapping = {
    [EMERGENCY]: LEVEL_EMERGENCY,
    [ALERT]: LEVEL_ALERT,
    [CRITICAL]: LEVEL_CRITICAL,
    [ERROR]: LEVEL_ERROR,
    [WARNING]: LEVEL_WARNING,
    [NOTICE]: LEVEL_NOTICE,
    [INFO]: LEVEL_INFO,
    [DEBUG]: LEVEL_DEBUG
};

/**
 * Logger
 * Specification: https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-3-logger-interface.md
 * @todo - implement flush
 * @param   config.level            Level to log (LEVEL_EMERGENCY, LEVEL_WARNING, LEVEL_DEBUG, etc)
 * @param   config.adapters         Array with adapters (functions or objects with a log method)
 * @param   config.appendLogId      True to automatically append the log id to the log (" (ref: 000000000000)")
 * @param   config.contextDecorator Function that decorates the context object, before every log call, and that returns the decorated result
 */
class Logger {
    constructor({ level = LEVEL_ALL, adapters = [], appendLogId = false, contextDecorator} = config) {
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
    addAdapter(adapter) {
        this._adapters.push(adapter);
        return this;
    }

    /**
     * setInstanceContext
     * @param context
     */
    setInstanceContext(context) {
        for (var key in context) {
            this._instanceContext[key] = context[key];
        }
    }

    /**
     * Public logging methods
     */

    emergency(message, context = {}) {
        return this.log(EMERGENCY, message, context);
    }

    alert(message, context = {}) {
        return this.log(ALERT, message, context);
    }

    critical(message, context = {}) {
        return this.log(CRITICAL, message, context);
    }

    error(message, context = {}) {
        return this.log(ERROR, message, context);
    }

    warning(message, context = {}) {
        return this.log(WARNING, message, context);
    }

    notice(message, context = {}) {
        return this.log(NOTICE, message, context);
    }

    info(message, context = {}) {
        return this.log(INFO, message, context);
    }

    debug(message, context = {}) {
        return this.log(DEBUG, message, context);
    }

    /**
     * Log
     * @param   string  Log type (error, warning, info, etc (check consts))
     * @param   string  Log message, optional with placeholders to replace with context data
     * @param   object  context data that will be used replace with placeholders in message
     */
    log(type, message, context = {}) {
        const typeLevel = this._getLevelByType(type),
            id = this._genId();

        if (this._adapters.length && (this._level & typeLevel) > 0) {
            const preparedContext = this._prepareAndDecorateContext(context, { _id: id }),
                  log = this._prepareAndGetLog(message, preparedContext);

            this._adapters.forEach(adapter => typeof adapter == 'function' ? adapter(type, log) : adapter.log(type, log));
            return id;
        }

        return null;
    }

    /**
     * Protected methods
     */

    _prepareAndDecorateContext(originContext, additionalContext = {}) {
        let context = Object.assign(this._instanceContext, originContext, additionalContext);

        if (this._contextDecorator) {
            context = this._contextDecorator(context);
        }

        return context;
    }

    _prepareAndGetLog(message, context = {}) {
        const hasIdPlaceholder = message.indexOf('{_id}') !== -1;

        let log = message.replace(/{([^{}]*)}/g, function (a, b) {
                const r = context[b];
                return typeof r === 'string' || typeof r === 'number' ? r : a;
            }
        );

        if (!hasIdPlaceholder && this._appendLogId) {
            log += ' (ref: ' + context._id + ')';
        }

        return log;
    }

    _getLevelByType(type) {
        return typeLevelMapping.hasOwnProperty(type) ? typeLevelMapping[type] : LEVEL_NONE;
    }

    _genId() {
        return Date.now() + Math.floor((Math.random() * 9999) + 1);
    }
}

export default Logger
