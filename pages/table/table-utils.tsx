import '../layout';

const app = document.createElement('app-layout');
app.title = 'Table - Utils';
await app.init();

document.body.appendChild(app);
app.main.style.rowGap = 'var(--spacing)';
app.main.replaceChildren(
  <>
    <gui-table
      style={{ backgroundColor: 'var(--bg-1)' }}
      value={{
        rows: [
          ['John', 42, 2],
          ['Michel', 42, 4],
          ['Max', 35, 0],
        ],
        meta: ['Name', { header: 'Age' }, 'Children'],
      }}
    />

    <gui-table
      style={{ backgroundColor: 'var(--bg-1)' }}
      value={await greycat.default.call('project::persons')}
    />
  </>,
);
