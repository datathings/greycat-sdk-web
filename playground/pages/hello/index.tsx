import { GreyCat } from '@greycat/web';
import '@/common';

const greycat = await GreyCat.init();

const arrayOfTime = greycat.findType('core::Array<core::time>');
if (!arrayOfTime) {
  throw "missing Array<time>";
}

document.body.appendChild(
  <app-layout title="Hello">
    <gui-value value="Hello, world!" />

    <gui-input type={arrayOfTime.name} />

    <gui-input-fn type="project::doWhatever" />
  </app-layout>,
);

// kopr.io/map-v2/
