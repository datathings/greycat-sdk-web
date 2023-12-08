import '../layout';
import { io } from '@greycat/sdk';

const app = document.createElement('app-layout');
app.title = 'CSV Column Input';
await app.init();

document.body.prepend(app);

const col0 = io.CsvColumnString.createFrom({
  name: 'first_col',
  mandatory: false,
  offset: 0,
  trim: null,
  try_number: null,
  try_json: null,
  values: null,
  encoder: null,
});

const col1 = io.CsvColumnDate.createFrom({
  name: 'second_col',
  mandatory: true,
  offset: 1,
  as_time: null,
  format: null,
  tz: null,
});

app.main.appendChild(
  <div className="grid">
    <gui-csv-column-input
      value={col0}
      oninput={function () {
        console.log('oninput', this.value);
      }}
    />
    <gui-csv-column-input
      value={col1}
      oninput={function () {
        console.log('oninput', this.value);
      }}
    />
  </div>,
);
