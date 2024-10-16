import {
  GreyCat,
  GuiInput,
  GuiSearchableSelect,
  IndexedDbCache,
  SearchableOption,
  core,
  registerCustomElement,
} from '@greycat/web';
import './project-sensor-form';
import { project, projectlib } from '@/common';

const greycat = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
  libraries: [projectlib],
});

// One can override any form by providing a tagName that
// matches a WebComponent that inherits GuiInputElement:
// eg.
//
GuiInput.factory['project::Sensor'] = 'project-sensor-form';

// TODO:
//  - allow for removal of nullable attr (essentially resetting to 'null')
//  - Validation for Maps unique keys, and char input
//  - Validation if input not nullable, and value is null
//  - Fix styling, example Array input with duration type

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
        <gui-input label="This is a string" value="Hello world!" />
      </input-viewer>
      <input-viewer header="int | float">
        <gui-input value={42} />
      </input-viewer>
      <input-viewer header="bool">
        <gui-input value={false} />
      </input-viewer>
      <input-viewer header="core::time">
        <gui-input type="core::time" />
      </input-viewer>
      <input-viewer header="core::duration">
        <gui-input value={core.duration.from_mins(42)} />
      </input-viewer>
      {EnumViewer()}
      <input-viewer header="Enum (value)">
        <gui-input-enum label="This is a label" type={core.TimeZone._type} />
      </input-viewer>
      {ObjectViewer()}
      <input-viewer header="Object (instance)">
        <gui-input value={{ name: 'John', age: 42 }} />
      </input-viewer>
      <input-viewer header="Object (instance + manual override)">
        <gui-input-object value={{ name: 'John', age: 42 }}>
          <gui-input-string slot="name" />
          <gui-input-number slot="age" />
        </gui-input-object>
      </input-viewer>
      <input-viewer header="Custom Form">
        <gui-input value={project.Sensor.create(42, project.SensorKind.Pressure())} />
      </input-viewer>

      <input-viewer header="Recursive type">
        <gui-input type="project::Link" />
      </input-viewer>
      {FnViewer()}
      {Composition()}
    </div>
  </app-layout>,
);

type InputViewerAttrs = {
  /** readonly attribute */
  header: string;
};
export class InputViewer extends HTMLElement {
  connectedCallback() {
    this.style.display = 'contents';
    const header = this.getAttribute('header');

    const display = document.createElement('gui-value');
    const input = this.children[0] as GuiInput;
    display.value = input.value;
    input.addEventListener('gui-input', () => {
      console.log(`[gui-input][${header}]`, input.value);
      display.value = input.value;
    });
    input.addEventListener('gui-change', () => {
      console.log(`[gui-change][${header}]`, input.value);
      display.value = input.value;
    });

    const slCheckbox = document.createElement('sl-checkbox');
    slCheckbox.textContent = 'Nullable';
    slCheckbox.addEventListener('sl-change', (e) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      input.config = { nullable: (e.target as any).checked };
    });

    this.appendChild(
      <sl-card>
        <h6 slot="header" style={{ margin: '0', display: 'flex', justifyContent: 'space-between' }}>
          {header}
          {slCheckbox}
        </h6>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing)' }}>
          {input}
          {display}
        </div>
      </sl-card>,
    );
  }

  disconnectedCallback() {
    this.replaceChildren();
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'input-viewer': InputViewer;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'input-viewer': GreyCat.Element<InputViewer & InputViewerAttrs>;
      }
    }
  }
}

registerCustomElement('input-viewer', InputViewer);

function EnumViewer() {
  const options: SearchableOption[] = greycat.abi.types
    .filter((ty) => ty.is_enum)
    .map((ty) => {
      return {
        text: ty.name,
        value: ty.offset,
        selected: ty.name === 'project::SensorKind',
      };
    });

  const typeSelector = (
    <gui-searchable-select
      placeholder="Search an enum..."
      options={options}
      ongui-change={(ev) => {
        input.type = greycat.abi.types[ev.detail];
      }}
    />
  ) as GuiSearchableSelect;
  const display = document.createElement('gui-value');
  const input = document.createElement('gui-input-enum');
  input.type = greycat.abi.types[typeSelector.value];
  input.addEventListener('gui-update', () => {
    console.log(
      `[gui-update][gui-input-enum][${greycat.abi.types[typeSelector.value].name}]`,
      input.value,
    );
    display.value = input.value;
  });
  input.addEventListener('gui-change', () => {
    console.log(
      `[gui-change][gui-input-enum][${greycat.abi.types[typeSelector.value].name}]`,
      input.value,
    );
    display.value = input.value;
  });

  const slCheckbox = document.createElement('sl-checkbox');
  slCheckbox.textContent = 'Nullable';
  slCheckbox.addEventListener('sl-change', (e) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input.config = { nullable: (e.target as any).checked };
  });

  return (
    <sl-card>
      <div
        slot="header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h6 style={{ margin: '0' }}>Enum (type)</h6>
        <div style={{ display: 'flex', gap: 'var(--spacing)', alignItems: 'center' }}>
          {typeSelector}
          {slCheckbox}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing)' }}>
        {input}
        {display}
      </div>
    </sl-card>
  );
}

function ObjectViewer() {
  const options: SearchableOption[] = greycat.abi.types
    .filter((ty) => !ty.is_enum && !ty.is_native && !ty.is_abstract)
    .map((ty) => {
      return {
        text: ty.name,
        value: ty.offset,
        selected: ty.name === 'project::Sensor',
      };
    });
  const typeSelector = (
    <gui-searchable-select
      placeholder="Search a type..."
      options={options}
      ongui-change={(ev) => {
        input.type = greycat.abi.types[ev.detail];
      }}
    />
  ) as GuiSearchableSelect;
  const display = document.createElement('gui-value');
  const input = document.createElement('gui-input-object');
  input.type = greycat.abi.types[typeSelector.value];
  input.addEventListener('gui-update', () => {
    console.log(
      `[gui-update][gui-input-object][${greycat.abi.types[typeSelector.value].name}]`,
      input.value,
    );
    display.value = input.value;
  });
  input.addEventListener('gui-change', () => {
    console.log(
      `[gui-change][gui-input-object][${greycat.abi.types[typeSelector.value].name}]`,
      input.value,
    );
    display.value = input.value;
  });

  const slCheckbox = document.createElement('sl-checkbox');
  slCheckbox.textContent = 'Nullable';
  slCheckbox.addEventListener('sl-change', (e) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input.config = { nullable: (e.target as any).checked };
  });

  return (
    <sl-card>
      <div
        slot="header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h6 style={{ margin: '0' }}>Object (type):</h6>
        <div style={{ display: 'flex', gap: 'var(--spacing)', alignItems: 'center' }}>
          {typeSelector}
          {slCheckbox}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing)' }}>
        {input}
        {display}
      </div>
    </sl-card>
  );
}

function FnViewer() {
  const options: SearchableOption[] = greycat.abi.functions
    .filter((f) => f.params.length > 0)
    .map((fn) => {
      return {
        text: fn.fqn,
        value: fn,
        selected: fn.fqn === 'project::goodFnForTestingFnCallInput',
      };
    });
  const typeSelector = (
    <gui-searchable-select
      style={{ width: '300px' }}
      placeholder="Search a fn..."
      options={options}
      ongui-change={(ev) => {
        input.type = ev.detail;
      }}
    />
  ) as GuiSearchableSelect;
  const display = document.createElement('gui-value');
  const input = document.createElement('gui-input-fn');
  input.type = typeSelector.value;
  input.addEventListener('gui-update', () => {
    console.log(`[gui-update][gui-input-fn][${typeSelector.value.fqn}]`, input.value);
    display.value = input.value;
  });
  input.addEventListener('gui-change', () => {
    console.log(`[gui-change][gui-input-fn][${typeSelector.value.fqn}]`, input.value);
    display.value = input.value;
  });

  return (
    <sl-card>
      <div
        slot="header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h6 style={{ margin: '0' }}>Function</h6>
        {typeSelector}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing)' }}>
        {input}
        {display}
      </div>
    </sl-card>
  );
}

function Composition() {
  const display = document.createElement('gui-value');
  const input = document.createElement('gui-input-fn');
  input.type = 'project::goodFnForTestingFnCallInput';
  input.addEventListener('gui-update', () => {
    console.log(`[gui-update][gui-input-fn]`, input.value);
    display.value = input.value;
  });
  input.addEventListener('gui-change', () => {
    console.log(`[gui-change][gui-input-fn]`, input.value);
    display.value = input.value;
  });

  const slot = (
    <slot slot="name">
      <label htmlFor="">Custom input</label>
      <gui-searchable-select placeholder="Select" options={[{ text: 'one' }, { text: 'two' }]} />
    </slot>
  );

  input.append(slot);

  return (
    <sl-card>
      <div
        slot="header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h6 style={{ margin: '0' }}>Composition</h6>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing)' }}>
        {input}
        {display}
      </div>
    </sl-card>
  );
}
