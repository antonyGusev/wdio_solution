import {myMoment, MomentFormats} from './moment.helper';

const {LOG_LEVEL} = process.env

const resetColor = '\u001b[0m';

const wrapInGreen = (txt: string): string => `\u001b[32m${txt}${resetColor}\u001b[0m`;

const wrapInRed = (txt: string): string => `\u001b[31m${txt}${resetColor}\u001b[0m`;

const wrapInCyan = (txt: string): string => `\u001b[36m${txt}${resetColor}\u001b[0m`;

const wrapInYellow = (txt: string): string => `\u001b[33m${txt}${resetColor}\u001b[0m`;

const wrapInMagenta = (txt: string): string => `\x1b[35m${txt}${resetColor}\u001b[0m`;

const wrapInWhite = (txt: string): string => `\u001b[37m${txt}${resetColor}`;

const wrapBackgroundInRed = (txt: string): string => `\u001b[41m${txt}${resetColor}\u001b[0m`;

const colors = {
  red: (text: string) => wrapInRed(text),
  magenta: (text: string) => wrapInMagenta(text),
  green: (text: string) => wrapInGreen(text),
  yellow: (text: string) => wrapInYellow(text),
  white: (text: string) => wrapInWhite(text),
  cyan: (text: string) => wrapInCyan(text),
  redBackground: (text: string) => wrapBackgroundInRed(text),
};

const logger = {
  // 'ERROR' | 'WARN' | 'INFO' | 'VERBOSE' | 'TECHNICAL';
  logLevel: LOG_LEVEL || 'ERROR',

  log (...args: any[]) {
    if (this.logLevel === 'VERBOSE' || this.logLevel === 'INFO' || this.logLevel === 'TECHNICAL') {
      console.log(colors.green(`[${myMoment.now(MomentFormats.day_num_time_with_miliseconds)}] [INFO]: ${args}`));
    }
  },
  verbose (...args: any[]) {
    if (this.logLevel === 'VERBOSE' || this.logLevel === 'TECHNICAL') {
      console.log(colors.yellow(`[${myMoment.now(MomentFormats.day_num_time_with_miliseconds)}] [VERBOSE]: ${args}`));
    }
  },
  warn (...args: any[]) {
    if (this.logLevel === 'VERBOSE' || this.logLevel === 'INFO' || this.logLevel === 'WARN') {
      console.warn(colors.magenta(`[${myMoment.now(MomentFormats.day_num_time_with_miliseconds)}] [WARNING]: ${args}`));
    }
  },
  error (...args: any[]) {
    if (this.logLevel === 'VERBOSE' || this.logLevel === 'INFO' || this.logLevel === 'WARN' || this.logLevel === 'ERROR') {
      console.error(colors.red(`[${myMoment.now(MomentFormats.day_num_time_with_miliseconds)}] [ERROR]: ${args}`))
    }
  },
  technical (...args: any[]) {
    if (this.logLevel === 'TECHNICAL') {
      console.log(colors.cyan(`[${myMoment.now(MomentFormats.day_num_time_with_miliseconds)}] [DEBUG]: ${args}`));
    }
  },

  setLogLevel(level: 'ERROR' | 'WARN' | 'INFO' | 'VERBOSE' | 'MUTE' | 'TECHNICAL') {
    this.logLevel = level;
  },
};

export {logger, colors};
