export abstract class BaseAbstraction {
  protected _selector: string;
  protected _name: string;

  constructor(selector: string, name: string) {
    this._selector = selector;
    this._name = name;
  }

  get name() {
    return this._name;
  }

  get selector() {
    return this._selector
  }
}
