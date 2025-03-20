import { GuiFactory, GuiObject, GuiObjectFieldValue, type sl } from '@greycat/web';
import '@/common';
import './index.css';

const greycat = await gc.sdk.init();

GuiFactory.global.mappings['core::Tuple<core::String,core::String>'] = GuiFactory.defineFromFn(
  (tuple: gc.core.Tuple<string, string>) => {
    return document.createTextNode(`(${JSON.stringify(tuple.x)}, ${JSON.stringify(tuple.y)})`);
  },
);
GuiFactory.global.mappings['project::ComplexObject::tuple'] = GuiFactory.defineFromFn(
  (tuple: gc.core.Tuple<string, string>) => {
    return document.createTextNode(`(${JSON.stringify(tuple.x)}, ${JSON.stringify(tuple.y)})`);
  },
);

const objectEl = (
  <gui-object
    props={{ globalFilter: true }}
    linkify={(v: unknown) => gc.sdk.isNode(v) || !gc.sdk.isScalar(v)}
    onclick={function (e) {
      e.stopPropagation();
      const path = e.composedPath();
      const leaf = path[0];
      if (leaf instanceof HTMLAnchorElement) {
        const data = [];
        for (const node of path) {
          if (node instanceof GuiObjectFieldValue) {
            data.push({ node, name: node.previousSibling?.textContent });
          }
        }
        console.log('clicked', data);
      }
    }}
  />
) as GuiObject;

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
      <sl-option value="project::get_person">project::get_person</sl-option>
      <sl-option value="project::mapTest">project::mapTest</sl-option>
      <sl-option value="project::now">project::now</sl-option>
      <sl-option value="project::obj1">project::obj1</sl-option>
      <sl-option value="project::obj2">project::obj2</sl-option>
      <sl-option value="project::objects_table">project::objects_table</sl-option>
      <sl-option value="project::persons">project::persons</sl-option>
      <sl-option value="project::tree">project::tree</sl-option>
      <sl-option value="project::real_example">project::real_example</sl-option>
    </sl-select>
    <sl-checkbox onsl-change={toggleObjectHeader}>Object with header</sl-checkbox>
    <sl-checkbox onsl-change={toggleObjectResolve}>Auto-resolve nodes</sl-checkbox>
    {objectEl}
  </app-layout>,
);
