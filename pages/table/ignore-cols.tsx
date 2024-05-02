import '../layout';

const app = document.createElement('app-layout');
app.title = 'Table - Ignore columns';
await app.init();

document.body.prepend(app);

app.main.appendChild(
  <gui-table
    value={await greycat.default.call('project::chart', [100])}
    ignoreCols={[1, 3, 5]}
    style={{ backgroundColor: 'var(--bg-1)' }}
    ontable-click={(ev) => {
      console.log(ev.detail);
    }}
  />,
);
