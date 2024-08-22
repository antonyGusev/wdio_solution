import {ContentType, Status} from 'allure-js-commons';
import allure from '@wdio/allure-reporter';

import {browser} from '../browser';

const addScreenshot = async (stepName: string) => {
  const screenshotName = stepName.replaceAll(':', '').replaceAll(' ', '-').toLowerCase();
  const screenshot = await browser.screenshot(screenshotName);
  allure.addAttachment('SCREENSHOT', screenshot, ContentType.PNG);
}

export async function stepAllure(stepName: string, action: Function, ...args: any[]) {
  allure.startStep(stepName);
  try {
    if (args.length) {
      const toLog = args.length === 1 ? args[0] : args;
      allure.addAttachment(`${stepName}`, JSON.stringify(toLog, null, '\t'), ContentType.JSON);
    }

    const result = await action();

    await addScreenshot(stepName);

    if (result) {
      allure.addAttachment(`${stepName} execution result`, JSON.stringify(result, null, '\t'), ContentType.JSON);
    }

    allure.endStep(Status.PASSED);
    return result;
  } catch (error) {

    allure.endStep(Status.FAILED);
    throw new Error((error as Error).message);
  }
}

export function attachFailedApplicationConditionAllure(stepName: string) {
  return allure.step(stepName, async () => {
    await addScreenshot(stepName);
  });
}
