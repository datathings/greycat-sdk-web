import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

document.body.appendChild(
  appLayout('FnPtr',
    <gui-input-fnptr
      ongui-input={function () {
        const fn = this.value;
        if (fn) {
          gc.project.display_fn(fn);
        }
      }}
    />,
    <sl-divider />,
    <gui-input-object
      value={new gc.project.ObjWithFn(gc.core.function_.fromFqn('project::add'))}
      ongui-change={function () {
        const o = this.value as gc.project.ObjWithFn | undefined;
        if (o) {
          console.log(JSON.parse(JSON.stringify(o)));
          gc.project.display_fn_in_obj(o);
        }
      }}
    />,
  ),
);
