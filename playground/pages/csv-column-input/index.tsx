import './styles.css';
import { GreyCat, IndexedDbCache, io } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const columns = new Map<string, () => io.CsvColumn>([
  [io.CsvColumnBoolean._type, () => io.CsvColumnBoolean.create()],
  [io.CsvColumnDate._type, () => io.CsvColumnDate.create()],
  [io.CsvColumnDuration._type, () => io.CsvColumnDuration.create()],
  [io.CsvColumnFloat._type, () => io.CsvColumnFloat.create()],
  [io.CsvColumnIgnored._type, () => io.CsvColumnIgnored.create()],
  [io.CsvColumnInteger._type, () => io.CsvColumnInteger.create()],
  [io.CsvColumnString._type, () => io.CsvColumnString.create()],
  [io.CsvColumnTime._type, () => io.CsvColumnTime.create()],
]);

let columnEl = (<gui-csv-column-input />) as ChildNode;

document.body.appendChild(
  <app-layout title="CSV Column Input">
    <sl-select
      placeholder="Choose an io.CsvColumn"
      onsl-change={function () {
        const column_factory = columns.get(this.value as string);
        if (column_factory) {
          const newColumn = (<gui-input-object value={column_factory()} />) as ChildNode;
          columnEl.replaceWith(newColumn);
          columnEl = newColumn;
        }
      }}
    >
      {Array.from(columns.keys().map((name) => <sl-option value={name}>{name}</sl-option>))}
    </sl-select>
    <sl-divider />
    {columnEl}
  </app-layout>,
);

document.body.querySelectorAll('gui-csv-column-input').forEach((el) => {
  el.onchange = () => {
    console.log('onchange', el, el.value);
  };
});
