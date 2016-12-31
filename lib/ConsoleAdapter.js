import { EMERGENCY, ALERT, CRITICAL, ERROR, WARNING, NOTICE, INFO, DEBUG } from './Logger'

/**
 * ConsoleAdapter
 */
export default class ConsoleAdapter {
    static _levelToMethodMapping = {
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
     * Public methods
     */

    log(type, message) {
        if (type in ConsoleAdapter._levelToMethodMapping) {
            console[ConsoleAdapter._levelToMethodMapping[type]](message);
        }
    }
}
