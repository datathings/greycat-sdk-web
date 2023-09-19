import { GreyCat } from '@greycat/sdk';
import { GuiInputDynamic } from '../../src/components/inputs/input-dynamic/input-dynamic';
import { GuiInputText } from '../../src/components/inputs/input-text/input-text';
import { GuiInputDuration } from '../../src/components/inputs/input-duration/input-duration';

// @greycat/ui
import '../../src/css/full.css';
import './index.css';
import '../../src/bundle';

// TODO: Deprecate these if-statements when the whole feature is launched
if (!customElements.get('gui-input-dynamic')) {
  customElements.define('gui-input-dynamic', GuiInputDynamic);
}
if (!customElements.get('gui-input-text')) {
  customElements.define('gui-input-text', GuiInputText);
}
if (!customElements.get('gui-input-duration')) {
  customElements.define('gui-input-duration', GuiInputDuration);
}

const greycat = (window.greycat.default = await GreyCat.init({
  url: new URL('http://localhost:8080'),
}));

const app = document.getElementById('app') as HTMLDivElement;

const textInput = document.createElement('input');
textInput.type = 'text';
textInput.placeholder = 'Enter greycat type';

const label = document.createElement('label');
const dynamicInputComponent = document.createElement('gui-input-dynamic') as GuiInputDynamic;
dynamicInputComponent.greycat = greycat;
const outputValue = document.createElement('div');
const result = document.createElement('div');

label.textContent = `Your dynamic input:`;
outputValue.textContent = `This converts to:`;

app.append(textInput, result);
result.append(label, dynamicInputComponent, outputValue);

textInput.addEventListener('input', () => {
  dynamicInputComponent.type = textInput.value;
});

dynamicInputComponent.addEventListener('input', (event: Event) => {
  const e = event as CustomEvent;
  label.textContent = `Your dynamic input for ${textInput.value}`;
  outputValue.textContent = `This converts to: ${e.detail}`;
});
