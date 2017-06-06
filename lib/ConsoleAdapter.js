import { EMERGENCY, ALERT, CRITICAL, ERROR, WARNING, NOTICE, INFO, DEBUG } from './Logger'

const levelToMethodMapping = {
    [EMERGENCY]: 'error',
    [ALERT]: 'error',
    [CRITICAL]: 'error',
    [ERROR]: 'error',
    [WARNING]: 'warn',
    [NOTICE]: 'warn',
    [INFO]: 'info',
    [DEBUG]: 'log'
};

/**
 * ConsoleAdapter
 */
export default class ConsoleAdapter {
    constructor() {
        this._isConsoleAvailable = !!window.console;
    }

    /**
     * Public methods
     */

    log(type, message) {
        if (this._isConsoleAvailable && type in levelToMethodMapping) {
            window.console[levelToMethodMapping[type]](message);
        }
    }
}
