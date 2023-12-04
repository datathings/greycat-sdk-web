import { io } from '@greycat/sdk';
import '../layout';
import { GuiCsvStatistics } from '../../src';

const app = document.createElement('app-layout');
app.title = 'Csv Analysis';
await app.init();

document.body.prepend(app);

class Analyzer {
  format: io.CsvFormat | null = null;

  async run(file_path: string): Promise<io.CsvStatistics | undefined | null> {
    const analysis = io.CsvAnalysis.createFrom({
      format: this.format,
      date_check_limit: null,
      date_formats: null,
      enum_limit: null,
      row_limit: null,
      statistics: null,
    });

    const result = await io.CsvAnalysis.explore_new(file_path, analysis);
    return result?.statistics;
  }
}

const analyzer = new Analyzer();

const stats = await analyzer.run('./csv-analysis/data/small.csv');
const csvStatistics = (<gui-csv-statistics statistics={stats} />) as GuiCsvStatistics;

app.main.appendChild(
  <div>
    <select
      onchange={async (ev) => {
        const select = ev.target as HTMLSelectElement;
        csvStatistics.statistics = await analyzer.run(select.value);
      }}
    >
      <option value="./csv-analysis/data/small.csv" selected>Small Dataset</option>
      <option value="./csv-analysis/data/large.csv">Large Dataset</option>
    </select>
    {csvStatistics}
  </div>,
);
