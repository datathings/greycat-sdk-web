import '@greycat/web';
import { GuiHistogram } from '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const stats = await gc.project.histogram_stats();
const histo = (<gui-histogram value={stats ?? undefined}></gui-histogram>) as GuiHistogram;
document.body.appendChild(
  appLayout(
    'Histogram Stats',
    <>
      <fieldset slot="action" role="group">
        <label htmlFor="">Percentiles</label>
        <input
          type="checkbox"
          checked={histo.percentiles}
          oninput={() => {
            histo.percentiles = !histo.percentiles;
          }}
        />
      </fieldset>
    </>,
    histo,
  ),
);
