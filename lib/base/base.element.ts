import { $ } from "../wdio";
import { BaseAbstraction } from "./base.abstraction";

export class BaseElement extends BaseAbstraction {
  constructor(selector: string, name: string) {
    super(selector, name);
  }

  protected get currentElement() {
    return $(this.selector);
  }

  async sendKeys(value: string): Promise<void> {
    await this.currentElement.setValue(value);
  }

  async clickOn(data?: any): Promise<void> {
    await this.currentElement.click();
  }

  async getData(data?: any): Promise<any> {
    return this.currentElement.getText();
  }

  async isVisible(data: boolean): Promise<boolean> {
    let result: boolean;

    if (data === false) {
      await this.currentElement.waitForDisplayed({ reverse: true });
      result = data;
    } else {
      result = await this.currentElement.isDisplayed();
    }

    return result;
  }
}
