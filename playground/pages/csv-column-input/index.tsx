import './styles.css';
import { GreyCat, IndexedDbCache, io, core, $ } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const map = await $.default.call('project::mapTest');
console.log({ map });

let offset = 0;

document.body.appendChild(
  <app-layout title="CSV Column Input">
    <div>
      <div className="grid">
        <gui-csv-column-input
          value={io.CsvColumnString.createFrom({
            name: 'string',
            mandatory: false,
            offset: offset++,
            trim: null,
            try_number: null,
            try_json: null,
            values: null,
            encoder: null,
          })}
        />
        <div className="placeholder">
          {offset}...{(offset += 2) - 1}
        </div>
        <gui-csv-column-input
          value={io.CsvColumnInteger.createFrom({
            name: 'int',
            mandatory: true,
            offset: offset++,
          })}
        />
        <gui-csv-column-input
          value={io.CsvColumnFloat.createFrom({
            name: 'float',
            mandatory: true,
            offset: offset++,
          })}
        />
        <div className="placeholder">{offset++}</div>
        <gui-csv-column-input
          value={io.CsvColumnTime.createFrom({
            name: 'time',
            mandatory: true,
            offset: offset++,
            unit: core.DurationUnit.minutes(),
          })}
        />
        <gui-csv-column-input
          value={io.CsvColumnIgnored.createFrom({
            name: 'ignored',
            mandatory: true,
            offset: offset++,
          })}
        />
        <gui-csv-column-input
          value={io.CsvColumnDate.createFrom({
            name: 'date',
            mandatory: true,
            offset: offset++,
            as_time: null,
            format: null,
            tz: null,
          })}
        />
        <gui-csv-column-input
          value={io.CsvColumnDuration.createFrom({
            name: 'duration',
            mandatory: true,
            offset: offset++,
            unit: null,
          })}
        />
        <div className="placeholder">
          {offset}...{(offset += 4) - 1}
        </div>
        <gui-csv-column-input
          value={io.CsvColumnIgnored.createFrom({
            name: 'ignored',
            mandatory: true,
            offset: offset++,
          })}
        />
      </div>
    </div>
  </app-layout>,
);

document.body.querySelectorAll('gui-csv-column-input').forEach((el) => {
  el.onchange = () => {
    console.log('onchange', el, el.value);
  };
});
