import {
  isEqual,
  isNull,
  isObject,
  isPrimitive,
  isString,
  waitForCondition,
} from "../helpers";
import { TIMEOUTS } from "../constants";
import { BaseAbstraction } from "./base.abstraction";
import { $ } from "../wdio";
import { BaseElement } from "./base.element";

export class BasePage extends BaseAbstraction {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  protected initChild(child: typeof BaseElement, selector: string, name: string) {
    return new child(selector, name);
  }

  async sendKeys(data: Record<string, any>): Promise<void> {
    for (const [key, value] of Object.entries(data)) {
      await (this as Record<string, any>)[key].sendKeys(value);
    }
  }

  async clickOn(data: any) {
    for (const [key, value] of Object.entries(data)) {
      await (this as Record<string, any>)[key].clickOn(value);
    }
  }

  async getData(data: any) {
    const values = { ...data };

    for (const [key, value] of Object.entries(data)) {
      values[key] = await (this as Record<string, any>)[key].getData(value);
    }

    return values;
  }

  async isVisible(data: any) {
    if (isNull(data)) {
      return $(this.selector).isDisplayed();
    }

    const values = { ...data };

    for (const [key, value] of Object.entries(data)) {
      values[key] = await (this as Record<string, any>)[key].isVisible(value);
    }

    return values;
  }

  async waitForPageState(data: Record<string, any>) {
    function checkThatStringsInData(dataObj: Record<string, any>) {
      for (const key of Object.keys(dataObj)) {
        if (isObject(dataObj[key])) {
          const result = checkThatStringsInData(dataObj[key]);
          if (result) {
            return true;
          }
        } else if (isPrimitive(dataObj[key]) && isString(dataObj[key])) {
          return true;
        }
      }
      return false;
    }

    const conditionToCall = checkThatStringsInData(data)
      ? "getData"
      : "isVisible";

    await waitForCondition(
      async () => {
        const thisCallResult = await this[conditionToCall]({ ...data });

        return isEqual(thisCallResult, data);
      },
      {
        timeout: TIMEOUTS._60_SECONDS,
        interval: TIMEOUTS._1_SECOND,
        message: `${this.name} should have condition: ${JSON.stringify(data)}`,
      }
    );
  }
}
