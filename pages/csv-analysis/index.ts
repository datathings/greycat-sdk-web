import { io } from '@greycat/sdk';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Csv Analysis';
await app.init();

document.body.prepend(app);

const csvAnalysisEl = document.createElement('gui-csv-analysis')!;
app.main.appendChild(csvAnalysisEl);

const csva = await io.CsvAnalysis.explore_new('test.csv', null);
csvAnalysisEl.analysis = csva;

console.log(csvAnalysisEl);
