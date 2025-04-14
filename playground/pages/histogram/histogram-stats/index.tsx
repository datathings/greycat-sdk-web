import '@greycat/web';
import { GuiHistogram } from '@greycat/web';
import '~/common';

await gc.sdk.init();

const stats = await gc.project.histogram_stats();
const histo = (<gui-histogram stats={stats ?? undefined}></gui-histogram>) as GuiHistogram;
document.body.appendChild(
  <app-layout title="Histogram Stats">
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
    </>
    {histo}
  </app-layout>,
);
