import { stepAllure, attachFailedApplicationConditionAllure } from './allure';
import { stepConsole, attachFailedApplicationConditionConsole } from './console';
import { prettifyCamelCase } from '../helpers';

const { REPORTER } = process.env;

export function step(stepName: string, action: Function, ...restArgs: any[]) {

  if (REPORTER === 'allure') {
    return stepAllure(stepName, action, ...restArgs);
  }

  return stepConsole(stepName, action, ...restArgs);
};

export function attachFailedApplicationCondition(title: string) {
  if (REPORTER === 'allure') {
    return attachFailedApplicationConditionAllure(`ATTACHMENTS_OF_FAILED_${title}`);
  }

  return attachFailedApplicationConditionConsole(title);
};

export function logging(messageFn: Function) {
  return function (target: any) {

    const descriptors = Object.getOwnPropertyDescriptors(target.prototype);

    for (const key in descriptors) {
      if (descriptors.hasOwnProperty(key)) {
        if (key === 'constructor' || key.includes('private') || !descriptors[key].value) {
          continue;
        } else {
          const methodDescriptor = descriptors[key];
          const originalMethod = methodDescriptor.value;

          async function decorated(this: any, ...args: any[]) {
            let methodName = key;
            const constructorName = this.constructor.name;

            switch (true) {
              case constructorName.includes('Action'):
                methodName = REPORTER === 'allure'
                  ? `I ${prettifyCamelCase(methodName)}: ${args[0] ? args[0] : ''}`
                  : `I ${prettifyCamelCase(methodName)}`
                break;

              case constructorName.includes('Page'):
              case constructorName.includes('Element'):
                methodName = REPORTER === 'allure'
                  ? `${messageFn(this.name)} ${prettifyCamelCase(methodName)} with arguments: ${args[0] ? args[0] : ''}`
                  : `${messageFn(this.name)} ${prettifyCamelCase(methodName)}`
                break;

              default:
                break;
            }

            return step(methodName, originalMethod.bind(this, ...args), ...args);
          }

          Object.defineProperty(decorated, 'name', { value: key });
          methodDescriptor!.value = decorated;

          Object.defineProperty(target.prototype, key, methodDescriptor);
        }
      }
    }
  }
};
