import '@greycat/web';
import '@/common';

await gc.sdk.init();

const select = document.createElement('gui-select');
select.value = 'Option 2';
select.options = ['Option 1', 'Option 2', 'Option 3'];
select.addEventListener('gui-change', (ev) => {
  console.log('change', ev.detail);
  display.value = ev.detail;
});

const display = document.createElement('gui-object');
display.value = select.value;

function changeOptions() {
  select.options = ['Option 4', 'Option 5'];
}

function clear() {
  select.options = [];
}

function toggleNullable() {
  select.nullable = !select.nullable;
}

document.body.appendChild(
  <app-layout title="Select">
    <div className="list">
      <gui-card>
        <header slot="header">
          Select
          <div className="row">
            <sl-button variant="text" onclick={changeOptions}>
              Change options
            </sl-button>
            <sl-button variant="text" onclick={clear}>
              Clear options
            </sl-button>
            <sl-checkbox onsl-change={toggleNullable}>Nullable</sl-checkbox>
          </div>
        </header>
        <div className="list">
          <div className="row">
            <span>Selected:</span>
            {display}
          </div>
          {select}
        </div>
      </gui-card>

      <gui-card>
        <header slot="header">Override gui-object with gui-select</header>
      </gui-card>
    </div>
  </app-layout>,
);
