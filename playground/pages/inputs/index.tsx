import {
  GuiElement,
  GuiInputElement,
  GuiInputFactory,
  GuiObject,
  css,
  registerCustomElement,
  sl,
} from '@greycat/web';
import '@/common';
import './project-sensor-form';
import IndexStyle from './index.css?inline';

await gc.sdk.init();

// One can override any form by providing a tagName that
// matches a WebComponent that inherits GuiInputElement:
// eg.
//
GuiInputFactory.global.set('project::Sensor', 'project-sensor-form');

export class InputViewer extends GuiElement {
  static override styles = [css(IndexStyle)];

  private _header: HTMLElement;
  private _value: GuiObject;
  private _slot: HTMLSlotElement;

  constructor() {
    super();

    this._header = (<header slot="header" />) as HTMLElement;
    this._value = document.createElement('gui-object');
    this._slot = document.createElement('slot');

    this.shadowRoot.appendChild(
      <gui-card>
        {this._header}
        <div className="grid">
          {this._slot}
          <slot name="value">{this._value}</slot>
        </div>
      </gui-card>,
    );
  }

  set header(header: string) {
    this._header.textContent = header;
  }

  connectedCallback() {
    const input = this._slot.assignedElements()[0];
    if (input instanceof GuiInputElement) {
      this._value.value = input.value;
      input.addEventListener('gui-change', () => {
        this._value.value = input.value;
      });
    } else if (input instanceof sl.SlInput) {
      this._value.value = input.value;
      input.addEventListener('sl-change', () => {
        this._value.value = input.value;
      });
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'input-viewer': InputViewer;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'input-viewer': GreyCat.Element<InputViewer>;
      }
    }
  }
}

registerCustomElement('input-viewer', InputViewer);

document.body.appendChild(
  <app-layout title="Inputs">
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing)',
      }}
    >
      <input-viewer header="Disabled input">
        <sl-input placeholder="This input is disabled" disabled />
      </input-viewer>

      <input-viewer header="core::geo">
        <gui-input-geo />
      </input-viewer>

      <input-viewer header="core::node">
        <gui-input-node />
      </input-viewer>

      <input-viewer header="Any">
        <gui-input-any />
      </input-viewer>

      <input-viewer header="Array">
        <gui-input-array />
      </input-viewer>

      <input-viewer header="Map">
        <gui-input-map />
      </input-viewer>
      <input-viewer header="String">
        <gui-input-string label="This is a string" value="Hello world!" />
      </input-viewer>
      <input-viewer header="int | float">
        <gui-input-number value={42} />
      </input-viewer>
      <input-viewer header="bool">
        <gui-input value={false} />
      </input-viewer>
      <input-viewer header="core::time">
        <gui-input value={gc.core.time.now()} />
      </input-viewer>
      <input-viewer header="core::duration">
        <gui-input value={gc.core.duration.from_mins(42)} />
      </input-viewer>
      <input-viewer header="Enum">
        <gui-input-enum value={gc.core.TimeZone.Europe_Paris} />
      </input-viewer>
      <input-viewer header="Object">
        <gui-input-object value={new gc.project.Person('John', 42, true)}>
          <gui-input-string slot="name" />
          <gui-input-number slot="age" />
        </gui-input-object>
      </input-viewer>
      <input-viewer header="Custom Form">
        <gui-input value={new gc.project.Sensor(42, gc.project.SensorKind.Pressure)} />
      </input-viewer>

      <input-viewer header="Recursive type">
        <gui-input-object value={new gc.project.Link('', null)} />
      </input-viewer>
    </div>
  </app-layout>,
);
