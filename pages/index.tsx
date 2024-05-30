import './layout';

const app = document.createElement('app-layout');
app.title = 'Index';
await app.init();
document.body.prepend(app);

app.main.replaceChildren(
  // prettier-ignore
  <aside style={{ width: 'fit-content' }}>
      <nav>
        <ul>
          <li><a href="./chart-bar-histogram/">Chart (bar histogram)</a></li>
          <li><a href="./chart-colored-area/">Chart (colored-area)</a></li>
          <li><a href="./chart-custom-boxplot/">Chart (custom boxplot)</a></li>
          <li><a href="./chart-custom/">Chart (custom)</a></li>
          <li><a href="./chart-scatter/">Chart (scatter)</a></li>
          <li><a href="./chart-time/">Chart (time)</a></li>
          <li><a href="./chart-bar/">Chart (bar)</a></li>
          <li><a href="./chart-in-mem/">Chart (in-mem)</a></li>
          <li><a href="./chart/">Chart</a></li>
          <li><a href="./csv-analysis/">Csv Analysis</a></li>
          <li><a href="./csv-column-input/">Csv Column Input</a></li>
          {/* <li><a href="./date-time/">Date / Time</a></li> */}
          <li><a href="./donut/">Donut</a></li>
          <li><a href="./dashboard/">Dashboard</a></li>
          <li><a href="./enum-select/">Enum (select)</a></li>
          <li><a href="./fieldset-group/">Fieldset Group</a></li>
          <li><a href="./fn-call/">Fn Call</a></li>
          <li><a href="./heatmap/">Heatmap</a></li>
          <li><a href="./hello/">Hello</a></li>
          <li><a href="./inputs/">Inputs</a></li>
          <li><a href="./object/">Object</a></li>
          <li><a href="./periodic-tasks/">Periodic Tasks</a></li>
          <li><a href="./searchable-select/">Searchable Select</a></li>
          <li><a href="./table/">Table</a></li>
          <li><a href="./tabs/">Tabs</a></li>
          <li><a href="./tasks/">Tasks</a></li>
          <li><a href="./tasks2/">Tasks2</a></li>
          <li><a href="./users/">Users</a></li>
        </ul>
      </nav>
    </aside>,
);
