import { EMERGENCY, ALERT, CRITICAL, ERROR, WARNING, NOTICE, INFO, DEBUG } from './Logger'

/**
 * ConsoleAdapter
 */
export default class ConsoleAdapter {
    static levelToMethodMapping = {
        [EMERGENCY]: 'error',
        [ALERT]: 'error',
        [CRITICAL]: 'error',
        [ERROR]: 'error',
        [WARNING]: 'warn',
        [NOTICE]: 'warn',
        [INFO]: 'info',
        [DEBUG]: 'log'
    };

    constructor() {
        this.isConsoleAvailable = !!window.console;
    }

    /**
     * Public methods
     */

    log(type, message) {
        if (this.isConsoleAvailable && type in ConsoleAdapter.levelToMethodMapping) {
            window.console[ConsoleAdapter.levelToMethodMapping[type]](message);
        }
    }
}
