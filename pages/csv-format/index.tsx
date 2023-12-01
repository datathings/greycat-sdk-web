import '../layout';

const app = document.createElement('app-layout');
app.title = 'CsvFormat';
await app.init();

document.body.prepend(app);

const csvFormatEl = document.createElement('gui-csv-format');
app.main.replaceChildren(csvFormatEl);



// csvFormatEl.format = 
