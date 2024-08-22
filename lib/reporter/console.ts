import {browser} from '../browser';
import {logger, colors} from '../helpers';

const {LOG_LEVEL} = process.env;

export async function stepConsole(stepName: string, action: Function, ...args: any[]) {
  const _arguments = JSON.stringify(args.length === 1 ? args[0] : args);

  switch (LOG_LEVEL) {
    case 'INFO':
      if (stepName.includes('I ')) {
        logger.log(`=> ${stepName} with arguments: ${colors.white(_arguments)}`);
      } else if (stepName.includes('element')) {
        logger.log(`==> ${stepName} with arguments: ${colors.white(_arguments)}`);
      }
      break;
    case 'VERBOSE':
    case 'TECHNICAL':
      if (stepName.includes('I ')) {
        logger.log(`=> ${stepName} with arguments: ${colors.white(_arguments)}`);
      }  else if (stepName.includes('element')) {
        logger.log(`==> ${stepName} with arguments: ${colors.white(_arguments)}`);
      }
      break;

    default:
      break;
  }

  return action();
}

export async function attachFailedApplicationConditionConsole(stepName: string) {
  if (LOG_LEVEL === 'MUTE') return;

  const currentUrl = await browser.getCurrentUrl();
  const cookies = await browser.getLocalStorage();
  
  logger.warn(`[CURRENT_URL: ${currentUrl}]`);
  logger.warn(`[COOKIES: ${JSON.stringify(cookies)}]`);
}
