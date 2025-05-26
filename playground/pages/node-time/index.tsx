import '@greycat/web';
import '~/common';
import { toast } from '@greycat/web';

const greycat = await gc.sdk.init();

const root = (await greycat.root()) as gc.project.Root;

const form = document.createElement('gui-input-fn');
form.value = new gc.core.nodeTime$sample$args(
  [root['project::serie_float']],
  null,
  null,
  100,
  gc.SamplingMode.adaptative,
  null,
  null,
);
form.addEventListener('gui-change', sample);
const table = document.createElement('gui-table');

async function sample() {
  try {
    table.value = await gc.nodeTime.sample.apply(null, form.args);
  } catch (err) {
    toast.error(err);
  }
}

sample();

document.body.appendChild(
  <app-layout title="nodeTime">
    <div className="list">
      <gui-card>
        <header slot="header">
          <span>Filters:</span>
          <sl-button variant="text" size="small" onclick={sample}>
            Sample
          </sl-button>
        </header>
        {form}
      </gui-card>
      <gui-card>
        <header slot="header">Result:</header>
        {table}
      </gui-card>
    </div>
  </app-layout>,
);
