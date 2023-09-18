import { GreyCat } from '@greycat/sdk';

export default abstract class BaseInput<TValue, HElement> {
  private changeListeners: ((value: TValue) => void)[] = [];
  protected _greycat = window.greycat.default;
  public inputElement: HElement = this.createInputElement();
  public value: TValue;

  protected abstract createInputElement(): HElement;
  protected abstract updateValue(): void;

  constructor(initialValue: TValue) {
    this.value = initialValue;
  }

  set greycat(g: GreyCat) {
    this._greycat = g;
  }

  protected notifyChangeListeners() {
    for (const listener of this.changeListeners) {
      listener(this.value);
    }
  }

  addEventListener(event: 'input', listener: (value: TValue) => void) {
    if (event === 'input') {
      this.changeListeners.push(listener);
    }
  }
}
