import { GreyCat, core } from '@greycat/sdk';

export class GuiInputDuration extends HTMLElement {
  private _greycat = window.greycat.default;
  private _number: number = 0;
  private _unit: string = 'minutes';
  private _value: core.duration = core.duration.create(this._number, this._greycat);

  set greycat(g: GreyCat) {
    this._greycat = g;
  }

  get value() {
    return this._value;
  }

  connectedCallback() {
    const durationNumberInput = document.createElement('input');
    durationNumberInput.setAttribute('type', 'number');
    this.appendChild(durationNumberInput);

    const durationSelect = document.createElement('select');
    const durationUnits = [
      'microseconds',
      'milliseconds',
      'seconds',
      'minutes',
      'hours',
      'days',
      'weeks',
      'months',
      'years',
    ];
    durationUnits.forEach((unit) => {
      const option = document.createElement('option');
      option.value = unit;
      option.textContent = unit;
      durationSelect.appendChild(option);
    });
    this.appendChild(durationSelect);

    durationNumberInput.addEventListener('input', (event) => {
      event.stopPropagation();
      const inputElement = event.target as HTMLInputElement;
      const num = parseInt(inputElement.value, 10);

      if (isFinite(num)) {
        this._number = num;
        this.updateValue();
        this.dispatchEvent(new CustomEvent('input', { detail: this._value }));
      } else {
        this._handleError(new Error('Invalid number input. Please enter valid number.'));
      }
    });

    durationSelect.addEventListener('change', (event) => {
      event.stopPropagation();
      const selectElement = event.target as HTMLSelectElement;
      const unit = selectElement.value;
      this._unit = unit;
      this.updateValue();
      this.dispatchEvent(new CustomEvent('input', { detail: this._value }));
    });
  }

  private _handleError(error: unknown) {
    // TODO: replace it with User friendly error notification
    console.error(error);
  }

  private updateValue() {
    // TODO: move this to sdk
    switch (this._unit) {
      case 'microseconds':
        this._value = core.duration.create(this._number, this._greycat);
        break;
      case 'milliseconds':
        this._value = core.duration.from_ms(this._number, this._greycat);
        break;
      case 'seconds':
        this._value = core.duration.from_secs(this._number, this._greycat);
        break;
      case 'minutes':
        this._value = core.duration.from_mins(this._number, this._greycat);
        break;
      case 'hours':
        this._value = core.duration.from_hours(this._number, this._greycat);
        break;
      case 'days':
        this._value = core.duration.from_days(this._number, this._greycat);
        break;
      case 'weeks':
        this._value = core.duration.from_weeks(this._number, this._greycat);
        break;
      case 'months':
        this._value = core.duration.from_months(this._number, this._greycat);
        break;
      case 'years':
        this._value = core.duration.from_years(this._number, this._greycat);
        break;
      default:
        return;
    }
  }
}

if (!customElements.get('gui-input-duration')) {
  customElements.define('gui-input-duration', GuiInputDuration);
}

declare global {
  interface Window {
    GuiInputDuration: typeof GuiInputDuration;
  }
  interface HTMLElementTagNameMap {
    'gui-input-duration': GuiInputDuration;
  }
}
