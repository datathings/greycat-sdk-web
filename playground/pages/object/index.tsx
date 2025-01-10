import { GreyCat, runtime, type sl } from '@greycat/sdk/web';
import '@/common';

const greycat = await GreyCat.init();

const objectEl = document.createElement('gui-object');
objectEl.props.globalFilter = true;

async function changeObject(this: sl.SlSelect) {
  objectEl.value = await greycat.call(this.value as string);
}

function toggleObjectHeader() {
  objectEl.header = !objectEl.header;
}

function toggleObjectResolve() {
  objectEl.resolve = !objectEl.resolve;
}

document.body.appendChild(
  <app-layout
    title="Object"
    mainStyle={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing)' }}
  >
    <sl-select label="Select an object" placeholder="Select an object" onsl-change={changeObject}>
      <sl-option value="project::chart_time">project::chart_time</sl-option>
      <sl-option value="project::complex_object">project::complex_object</sl-option>
      <sl-option value="project::get_person">project::get_person</sl-option>
      <sl-option value="project::mapTest">project::mapTest</sl-option>
      <sl-option value="project::now">project::now</sl-option>
      <sl-option value="project::obj1">project::obj1</sl-option>
      <sl-option value="project::obj2">project::obj2</sl-option>
      <sl-option value="project::objects_table">project::objects_table</sl-option>
      <sl-option value="project::persons">project::persons</sl-option>
      <sl-option value="project::tree">project::tree</sl-option>
    </sl-select>
    <sl-checkbox onsl-change={toggleObjectHeader}>Object with header</sl-checkbox>
    <sl-checkbox onsl-change={toggleObjectResolve}>Auto-resolve nodes</sl-checkbox>
    {objectEl}
    <sl-divider />
    <gui-object header value={await runtime.Runtime.info()} />
    <gui-object value={['One', 'Two', 'Three']} />
  </app-layout>,
);
