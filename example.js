import Logger, { LEVEL_NONE, LEVEL_EMERGENCY, LEVEL_ALERT, LEVEL_CRITICAL, LEVEL_ERROR, LEVEL_WARNING, LEVEL_NOTICE, LEVEL_INFO, LEVEL_DEBUG, LEVEL_ALL } from './lib/Logger';
import ConsoleAdapter from './lib/ConsoleAdapter';
import HtmlListAdapter from './lib/HtmlListAdapter';

const logger = new Logger({
    level: LEVEL_ALL,
    appendLogId: true,
    adapters: [new ConsoleAdapter, new HtmlListAdapter({})],
    contextDecorator: (context) => {
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
