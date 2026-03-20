import '@greycat/web';
import { appLayout } from '~/common';

const greycat = await gc.sdk.init({ debug: true });

const simple_index = (await greycat.root())['project::simple_index'] as gc.core.nodeIndex;

const sampling_form = document.createElement('gui-input-fn');
sampling_form.inline = true;
sampling_form.value = new gc.core.nodeIndex$sample$args([simple_index], null, 2000, gc.core.SamplingMode.dense);
sampling_form.addEventListener('gui-change', fetch_and_update_table);

const table = document.createElement('gui-table');
table.globalFilter = true;

async function fetch_and_update_table(): Promise<void> {
  table.value = await gc.core.nodeIndex.sample.apply(null, sampling_form.args);
}

document.body.appendChild(
  appLayout('Sampling',
    <div className="list">
      {sampling_form}
      {table}
    </div>,
  ),
);

fetch_and_update_table();
