import { modal, type GuiCsvStatistics2, type GuiTable } from '@greycat/web';
import '~/common';

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

  const stats = (await task.await()) as gc.io.CsvStatistics;
  console.log(stats);
  return stats;
}

const defaultValue = 'pages/csv/analysis/data/small.csv';
const sample = (<gui-table globalFilter />) as GuiTable;
const stats = await runAnalysis(defaultValue);
console.log(stats);
const csvStatistics = (<gui-csv-statistics2 value={stats} />) as GuiCsvStatistics2;

const hiddenInput = (
  <input type="file" onchange={uploadFile} style={{ display: 'none' }} />
) as HTMLInputElement;

async function uploadFile() {
  if (hiddenInput.files === null) {
    return;
  }
  const file = hiddenInput.files[0];
  if (!file) {
    return;
  }
  console.log(file, file.name);
  await greycat.putFile(file.name, file);
  const select = document.querySelector('sl-select');
  if (!select) {
    return;
  }
  const filepath = `files/${file.name}`;
  select.appendChild(<sl-option value={filepath}>{filepath}</sl-option>);
  await select.updateComplete;
  select.value = filepath;
  await runAnalysis(filepath);
}

async function generateCode() {
  const stats = csvStatistics.value;
  if (!stats) {
    return;
  }
  const code = await gc.io.CsvStatistics.generate(stats);
  modal.info({
    title: 'Generated code',
    message: (
      <div className="list">
        <sl-copy-button value={code}>Copy code</sl-copy-button>
        <pre>
          <code>{code}</code>
        </pre>
      </div>
    ),
    width: '50%',
  });
}

document.body.appendChild(
  <app-layout
    title="Csv Analysis"
    mainStyle={{ display: 'grid', gridTemplateRows: 'auto 1fr', rowGap: 'var(--spacing)' }}
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        columnGap: 'var(--spacing)',
      }}
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
      <sl-button variant="primary" onclick={() => hiddenInput.click()} style={{ alignSelf: 'end' }}>
        Upload
      </sl-button>
    </div>
    <gui-tabs>
      <gui-tab slot="tab" active>
        CSV
      </gui-tab>
      <gui-tab slot="tab">Statistics</gui-tab>

      <gui-panel slot="panel" tab="CSV">
        {sample}
      </gui-panel>
      <gui-panel slot="panel" tab="Statistics">
        <div style={{ display: 'grid', gridTemplateRows: 'auto 1fr', rowGap: 'var(--spacing)' }}>
          <sl-button onclick={generateCode}>Generate Code</sl-button>
          {csvStatistics}
        </div>
      </gui-panel>
    </gui-tabs>
    {hiddenInput}
  </app-layout>,
);
