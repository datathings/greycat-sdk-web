import {
  ArrayInput,
  GreyCat,
  GuiInput,
  GuiInputElement,
  GuiSearchableSelect,
  IndexedDbCache,
  MapInput,
  SearchableOption,
  core,
  registerCustomElement,
} from '@greycat/web';
import './project-sensor-form';
import { project, projectlib } from '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
  libraries: [projectlib],
});

// One can override any form by providing a tagName that
// matches a WebComponent that inherits GuiInputElement:
// eg.
//
GuiInput.factory['project::Sensor'] = 'project-sensor-form';

// TODO:
//  - Map
//  - Array
//  - core::duration
//  - core::Date
//  - allow for removal of nullable attr (essentially resetting to 'null')

document.body.appendChild(
  <app-layout title="Inputs">
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing)',
      }}
    >
      <input-viewer header="String">
        <gui-input value="Hello world!" />
      </input-viewer>
      <input-viewer header="int | float">
        <gui-input value={42} />
      </input-viewer>
      <input-viewer header="bool?">
        <gui-input value={false} config={{ nullable: true }} />
      </input-viewer>
      <input-viewer header="core::time">
        <gui-input type="core::time" />
      </input-viewer>
      {EnumViewer()}
      <input-viewer header="Enum (value)">
        <gui-input type={core.TimeZone._type} />
      </input-viewer>
      {ObjectViewer()}
      <input-viewer header="Object (instance)">
        <gui-input value={project.Sensor.create(42, project.SensorKind.Pressure())} />
      </input-viewer>
      <input-viewer header="Recursive type">
        <gui-input type="project::Link" />
      </input-viewer>
      {FnViewer()}
      {new MapInput('wjhatever', () => {}).element}
      {new ArrayInput('wjhatever', () => {}).element}
      {/* TODO Map */}
      {/* TODO Array */}
      {/* TODO core::duration */}
      {/* TODO core::Date */}
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
    if (!(this.children[0] instanceof GuiInputElement)) {
      this.appendChild(<b>Child node must be a GuiInputElement</b>);
      return;
    }
    const header = this.getAttribute('header');

    const display = document.createElement('gui-value');
    const input = this.children[0];
    display.value = input.value;
    input.addEventListener('gui-update', () => {
      console.log(`[gui-update][${header}]`, input.value);
      display.value = input.value;
    });
    input.addEventListener('gui-change', () => {
      console.log(`[gui-change][${header}]`, input.value);
      display.value = input.value;
    });

    this.appendChild(
      <sl-card>
        <h6 slot="header" style={{ margin: '0' }}>
          {header}
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

  namespace JSX {
    interface IntrinsicElements {
      'input-viewer': GreyCat.Element<InputViewer & InputViewerAttrs>;
    }
  }
}

registerCustomElement('input-viewer', InputViewer);

function EnumViewer() {
  const options: SearchableOption[] = greycat.default.abi.types
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
        input.type = greycat.default.abi.types[ev.detail];
      }}
    />
  ) as GuiSearchableSelect;
  const display = document.createElement('gui-value');
  const input = document.createElement('gui-input-enum');
  input.type = greycat.default.abi.types[typeSelector.value];
  input.addEventListener('gui-update', () => {
    console.log(
      `[gui-update][gui-input-enum][${greycat.default.abi.types[typeSelector.value].name}]`,
      input.value,
    );
    display.value = input.value;
  });
  input.addEventListener('gui-change', () => {
    console.log(
      `[gui-change][gui-input-enum][${greycat.default.abi.types[typeSelector.value].name}]`,
      input.value,
    );
    display.value = input.value;
  });

  return (
    <sl-card>
      <div
        slot="header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h6 style={{ margin: '0' }}>Enum (type):</h6>
        {typeSelector}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing)' }}>
        {input}
        {display}
      </div>
    </sl-card>
  );
}

function ObjectViewer() {
  const options: SearchableOption[] = greycat.default.abi.types
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
        input.type = greycat.default.abi.types[ev.detail];
      }}
    />
  ) as GuiSearchableSelect;
  const display = document.createElement('gui-value');
  const input = document.createElement('gui-input-object');
  input.type = greycat.default.abi.types[typeSelector.value];
  input.addEventListener('gui-update', () => {
    console.log(
      `[gui-update][gui-input-object][${greycat.default.abi.types[typeSelector.value].name}]`,
      input.value,
    );
    display.value = input.value;
  });
  input.addEventListener('gui-change', () => {
    console.log(
      `[gui-change][gui-input-object][${greycat.default.abi.types[typeSelector.value].name}]`,
      input.value,
    );
    display.value = input.value;
  });

  return (
    <sl-card>
      <div
        slot="header"
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        <h6 style={{ margin: '0' }}>Object (type):</h6>
        {typeSelector}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing)' }}>
        {input}
        {display}
      </div>
    </sl-card>
  );
}

function FnViewer() {
  const options: SearchableOption[] = greycat.default.abi.functions
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
