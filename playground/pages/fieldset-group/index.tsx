import '@/common';
import './index.css';

document.body.appendChild(
  <app-layout title="Fieldset Group">
    <div role="list" className="fieldset-group-container">
      <fieldset role="group">
        <label>Label</label>
        <input type="text" />
      </fieldset>

      <fieldset role="group">
        <input type="text" />
        <label>Label</label>
      </fieldset>

      <fieldset role="group">
        <label>Label</label>
        <select>
          <option>Select an item</option>
          <option>Lorem</option>
          <option>Ipsum</option>
          <option>Dolor</option>
        </select>
      </fieldset>

      <fieldset role="group">
        <select>
          <option>Select an item</option>
          <option>Lorem</option>
          <option>Ipsum</option>
          <option>Dolor</option>
        </select>
        <label>Label</label>
      </fieldset>

      <fieldset role="group">
        <div className="gui-input-bool">
          <input type="checkbox" />
        </div>
        <label>Label</label>
      </fieldset>

      <fieldset role="group">
        <label>Label</label>
        <div className="gui-input-bool">
          <input type="checkbox" />
        </div>
      </fieldset>

      <fieldset role="group">
        <label>Label</label>
        <input type="text" />
        <input type="button" value="Button" />
      </fieldset>

      <fieldset role="group">
        <label>Label</label>
        <select>
          <option>Select an item</option>
          <option>Lorem</option>
          <option>Ipsum</option>
          <option>Dolor</option>
        </select>
        <input type="button" value="Button" />
      </fieldset>

      <fieldset role="group">
        <input type="button" value="Button" />
        <input type="text" />
        <label>Label</label>
      </fieldset>

      <fieldset role="group">
        <input type="text" placeholder="Left input" />
        <gui-searchable-select />
      </fieldset>

      <fieldset role="group">
        <input type="text" placeholder="Left input" />
        <input type="text" placeholder="Right input" />
      </fieldset>

      <fieldset role="group">
        <gui-searchable-select />
        <input type="text" placeholder="Right input" />
      </fieldset>
    </div>
  </app-layout>,
);
