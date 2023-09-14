import { GreyCat } from '@greycat/sdk';
import { GuiDynamicInput } from '../../src/components/dynamic-input/dynamic-input.js';

// @greycat/ui
import '../../src/css/full.css';
import './index.css';
import '../../src/bundle';

// Temporary resolution, because the feature is not launched yet
if (!customElements.get('gui-dynamic-input')) {
  customElements.define('gui-dynamic-input', GuiDynamicInput);
}

const greycat = (window.greycat.default = await GreyCat.init({
  url: new URL('http://localhost:8080'),
}));

const app = document.getElementById('app') as HTMLDivElement;

const textInput = document.createElement('input');
textInput.type = 'text';
textInput.placeholder = 'Enter greycat type';

const label = document.createElement('label');
const dynamicInputComponent = document.createElement('gui-dynamic-input');
dynamicInputComponent.greycat = greycat;
const outputValue = document.createElement('div');
const result = document.createElement('div');

app.append(textInput, result);
result.append(label, dynamicInputComponent, outputValue);

textInput.addEventListener('input', () => {
  dynamicInputComponent.type = textInput.value;
  dynamicInputComponent.addEventListener('change', () => {
    if (dynamicInputComponent.value !== null) {
      label.textContent = `Your dynamic input for ${textInput.value}`;
      outputValue.textContent = `This converts to: ${dynamicInputComponent.value}`;
    }
  });
});
