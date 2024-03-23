import {
  GuiChangeEvent,
  GuiInputElement,
  GuiInputEnum,
  GuiInputEvent,
  GuiInputNumber,
  registerCustomElement,
} from '@greycat/web';
import { project } from '@/common';

export class ProjectSensorForm extends GuiInputElement<project.Sensor> {
  private _id: GuiInputNumber;
  private _kind: GuiInputEnum;

  constructor() {
    super();

    this._id = document.createElement('gui-input-number');
    this._id.value = 0;
    this._id.addEventListener('gui-input', () =>
      this.dispatchEvent(new GuiInputEvent(this.value)),
    );
    this._id.addEventListener('gui-change', () =>
      this.dispatchEvent(new GuiChangeEvent(this.value)),
    );
    this._kind = document.createElement('gui-input-enum');
    this._kind.value = project.SensorKind.Temp();
    this._kind.addEventListener('gui-input', () =>
      this.dispatchEvent(new GuiInputEvent(this.value)),
    );
    this._kind.addEventListener('gui-change', () =>
      this.dispatchEvent(new GuiChangeEvent(this.value)),
    );
  }

  connectedCallback() {
    this.appendChild(this._id);
    this.appendChild(this._kind);
  }

  disconnectedCallback() {
    this.replaceChildren();
  }

  set value(sensor: project.Sensor) {
    this._id.value = Number(sensor.id);
    this._kind.value = sensor.kind;
  }

  get value() {
    return project.Sensor.create(this._id.value, this._kind.value as project.SensorKind);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'project-sensor-form': ProjectSensorForm;
  }

  namespace JSX {
    interface IntrinsicElements {
      'project-sensor-form': GreyCat.Element<ProjectSensorForm>;
    }
  }
}

registerCustomElement('project-sensor-form', ProjectSensorForm);
