import * as consts from './consts'

const levelToMethodMapping = {
    [consts.EMERGENCY]: 'error',
    [consts.ALERT]: 'error',
    [consts.CRITICAL]: 'error',
    [consts.ERROR]: 'error',
    [consts.WARNING]: 'warn',
    [consts.NOTICE]: 'warn',
    [consts.INFO]: 'info',
    [consts.DEBUG]: 'log'
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
