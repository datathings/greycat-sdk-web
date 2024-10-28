import { GreyCat, IndexedDbCache, core } from '@greycat/web';
import '@/common';

const greycat = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

const anonymousObj = await greycat.call('project::complex_object');
const obj1 = await greycat.call('project::obj1');
const obj2 = await greycat.call('project::obj2');

document.body.appendChild(
  <app-layout title="Object">
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        flexWrap: 'wrap',
        gap: 'var(--spacing)',
      }}
    >
      <gui-object value={anonymousObj} withHeader style={{ flex: '1' }} />
      <gui-object value={obj1} withHeader style={{ flex: '1' }} />
      <gui-object value={obj2} style={{ flex: '1' }} />
      <gui-object value={core.DurationUnit.hours()} withHeader style={{ flex: '1' }} />
    </div>
  </app-layout>,
);
