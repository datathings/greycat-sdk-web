import { core, GreyCat } from '@greycat/sdk';

abstract class BaseInput<TValue, HElement> {
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

  addEventListener(event: 'change', listener: (value: TValue) => void) {
    if (event === 'change') {
      this.changeListeners.push(listener);
    }
  }
}

export class TextInput extends BaseInput<string, HTMLInputElement> {
  private input: string = '';

  constructor(initValue: string) {
    super(initValue);
    this.inputElement.value = initValue;
  }

  protected createInputElement(): HTMLInputElement {
    const input = document.createElement('input');
    input.type = 'text';

    input.addEventListener('input', (event) => {
      const e = event.target as HTMLInputElement;
      this.input = e.value;
      this.updateValue();
      this.notifyChangeListeners();
    });
    return input;
  }

  protected updateValue() {
    this.value = this.input;
  }
}

export class IntInput extends BaseInput<number, HTMLInputElement> {
  private input: number = 0;

  constructor(initValue: number) {
    super(initValue);
    this.inputElement.value = initValue.toString();
  }

  protected override createInputElement(): HTMLInputElement {
    const element = document.createElement('input');
    element.type = 'number';

    element.addEventListener('input', (event) => {
      const e = event.target as HTMLInputElement;
      const v = parseInt(e.value);
      if (!isNaN(v)) {
        this.input = v;
      } else {
        throw new Error('Invalid integer while parsing');
      }
      this.updateValue();
      this.notifyChangeListeners();
    });
    return element;
  }

  protected updateValue() {
    this.value = this.input;
  }
}

export class FloatInput extends BaseInput<number, HTMLInputElement> {
  private input: number = 0;

  constructor(initValue: number) {
    super(initValue);
    this.inputElement.value = initValue.toString();
  }

  protected override createInputElement(): HTMLInputElement {
    const element = document.createElement('input');
    element.type = 'number';

    element.addEventListener('input', (event) => {
      const e = event.target as HTMLInputElement;
      const v = parseFloat(e.value);
      if (!isNaN(v)) {
        this.input = v;
      } else {
        throw new Error('Invalid float while parsing');
      }
      this.updateValue();
      this.notifyChangeListeners();
    });
    return element;
  }

  protected updateValue() {
    this.value = this.input;
  }
}

export class DurationInput extends BaseInput<core.duration, HTMLElement> {
  private number: number = 0;
  private unit: string = 'minutes';

  constructor(number: number, unit: string) {
    super(core.duration.create(0));
    this.number = number;
    this.unit = unit;
    this.updateValue();
  }

  protected updateValue() {
    switch (this.unit) {
      case 'microseconds':
        this.value = core.duration.create(this.number, this._greycat);
        break;
      case 'milliseconds':
        this.value = core.duration.from_ms(this.number, this._greycat);
        break;
      case 'seconds':
        this.value = core.duration.from_secs(this.number, this._greycat);
        break;
      case 'minutes':
        this.value = core.duration.from_mins(this.number, this._greycat);
        break;
      case 'hours':
        this.value = core.duration.from_hours(this.number, this._greycat);
        break;
      case 'days':
        this.value = core.duration.from_days(this.number, this._greycat);
        break;
      case 'weeks':
        this.value = core.duration.from_weeks(this.number, this._greycat);
        break;
      case 'months':
        this.value = core.duration.from_months(this.number, this._greycat);
        break;
      case 'years':
        this.value = core.duration.from_years(this.number, this._greycat);
        break;
      default:
        return;
    }
  }

  protected createInputElement(): HTMLElement {
    const containerDiv = document.createElement('div');

    const durationNumberInput = document.createElement('input');
    durationNumberInput.setAttribute('type', 'number');
    containerDiv.appendChild(durationNumberInput);

    const durationSelect = document.createElement('select');
    const durationUnits = ['seconds', 'minutes', 'hours'];
    durationUnits.forEach((unit) => {
      const option = document.createElement('option');
      option.value = unit;
      option.textContent = unit;
      durationSelect.appendChild(option);
    });
    containerDiv.appendChild(durationSelect);

    durationNumberInput.addEventListener('input', (event) => {
      const inputElement = event.target as HTMLInputElement;
      const num = parseInt(inputElement.value);
      this.number = num;
      this.updateValue();
      this.notifyChangeListeners();
    });

    durationSelect.addEventListener('change', (event) => {
      const inputElement = event.target as HTMLSelectElement;
      const unit = inputElement.value;
      this.unit = unit;
      this.updateValue();
      this.notifyChangeListeners();
    });

    return containerDiv;
  }
}
