import { modal, type GuiCsvStatistics2, type GuiTable } from '@greycat/web';
import '@/common';

const greycat = await gc.sdk.init({ pollTasks: 1000 });

async function runAnalysis(filepath: string) {
  const task = await greycat.spawn('io::CsvAnalysis::analyze', [
    [new gc.io.File(filepath)],
    gc.io.CsvAnalysisConfig.createFrom({
      header_lines: 1,
      enumerable_limit: 1_000,
    }),
  ]);

  const reader = new gc.io.CsvReader(filepath, undefined, new gc.io.CsvFormat(1));
  sample.value = await gc.io.CsvReader.sample(reader);
  return (await task.await()) as gc.io.CsvStatistics;
}

const defaultValue = 'pages/csv/analysis/data/small.csv';
const sample = (<gui-table globalFilter />) as GuiTable;
const stats = await runAnalysis(defaultValue);
console.log(stats);
const csvStatistics = (<gui-csv-statistics2 value={stats} />) as GuiCsvStatistics2;

document.body.appendChild(
  <app-layout
    title="Csv Analysis"
    mainStyle={{ display: 'grid', gridTemplateRows: 'auto 1fr', rowGap: 'var(--spacing)' }}
  >
    <sl-select
      label="Dataset"
      placeholder="Select a CSV file to analyze"
      value={defaultValue}
      onsl-change={async function (this) {
        if (this.value === '__DOWNLOAD_FROM_URL__') {
          const url = await modal.input({
            title: 'Specify the URL to a .csv file',
            confirm: 'Download',
          });
          if (url) {
            const res = await fetch(url);
            const data = await res.blob();
            const filename = url.slice(url.lastIndexOf('/') + 1);
            await greycat.putFile(filename, new File([data], filename));
            csvStatistics.value = await runAnalysis(filename);
          }
        } else {
          csvStatistics.value = await runAnalysis(this.value as string);
        }
      }}
    >
      <sl-option value="__DOWNLOAD_FROM_URL__">Download from URL</sl-option>
      <sl-option value="pages/csv/analysis/data/small.csv" selected>
        Small Dataset
      </sl-option>
      <sl-option value="pages/csv/analysis/data/large.csv">Large Dataset</sl-option>
      <sl-option value="pages/csv/analysis/data/people-100.csv">People 100</sl-option>
      <sl-option value="pages/csv/analysis/data/people-10000.csv">People 10k</sl-option>
    </sl-select>
    <gui-tabs>
      <gui-tab slot="tab" active>
        CSV
      </gui-tab>
      <gui-tab slot="tab">Statistics</gui-tab>

      <gui-panel slot="panel" tab="CSV">
        {sample}
      </gui-panel>
      <gui-panel slot="panel" tab="Statistics">
        {csvStatistics}
      </gui-panel>
    </gui-tabs>
  </app-layout>,
);
