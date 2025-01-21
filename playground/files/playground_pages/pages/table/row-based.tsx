import '@/common';
import '@greycat/web';

await gc.sdk.init();

const { actions } = await import('./actions');

document.body.appendChild(
  <app-layout title="Table (row-based)" mainStyle={{ display: 'flex', gap: 'var(--spacing)' }}>
    {actions}
    <gui-table
      value={{
        rows: [
          ['John', 42, 2],
          ['Michel', 42, 4],
          ['Max', 35, 0],
        ],
      }}
      headers={['Name', 'Age', 'Children']}
    />
  </app-layout>,
);
