import {
  GreyCat,
  IndexedDbCache,
  type GuiCsvStatistics2,
  io,
  $,
  type GuiTable,
  sl,
} from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

async function runAnalysis(filepath: string) {
  const task = await $.default.spawn('io::CsvAnalysis::analyze', [
    filepath,
    io.CsvAnalysisConfig.createFrom({
      header_lines: 1,
      enumerable_limit: 10_000,
    }),
  ]);

  sample.value = await io.CsvFormat.sample(filepath, io.CsvFormat.create(1));
  return (await task.await()) as io.CsvStatistics;
}

const sample = (<gui-table globalFilter style={{ height: '650px' }} />) as GuiTable;
const stats = await runAnalysis('./pages/csv-analysis/data/small.csv');
const csvStatistics = (<gui-csv-statistics2 value={stats} />) as GuiCsvStatistics2;

document.body.appendChild(
  <app-layout
    title="Csv Analysis"
    mainStyle={{ display: 'grid', gridTemplateRows: 'auto 1fr', rowGap: 'var(--spacing)' }}
  >
    <sl-select
      label="Dataset"
      placeholder="Select a CSV file to analyze"
      onsl-change={async function (this: sl.SlSelect) {
        csvStatistics.value = await runAnalysis(this.value as string);
      }}
    >
      <sl-option value="./pages/csv-analysis/data/small.csv" selected>
        Small Dataset
      </sl-option>
      <sl-option value="./pages/csv-analysis/data/large.csv">Large Dataset</sl-option>
      <sl-option value="./pages/csv-analysis/data/people-100.csv">People 100</sl-option>
      <sl-option value="./pages/csv-analysis/data/people-10000.csv">People 10k</sl-option>
    </sl-select>
    <gui-tabs>
      <gui-tab>CSV</gui-tab>
      <gui-tab>Statistics</gui-tab>

      <gui-panel data-tab="CSV">{sample}</gui-panel>
      <gui-panel data-tab="Statistics">{csvStatistics}</gui-panel>
    </gui-tabs>
  </app-layout>,
);
