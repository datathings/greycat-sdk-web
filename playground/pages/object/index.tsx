import { GreyCat, IndexedDbCache, core, type ObjectProps, isNode, $ } from '@greycat/web';
import '@/common';

await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});


const sharedProps: Omit<ObjectProps, 'value'> = {
  linkify: isNode,
  onClick: (...args) => {
    console.log(args);
  },
};

const anonymousObj = await $.default.call('project::complex_object');
const obj1 = await $.default.call('project::obj1');
const obj2 = await $.default.call('project::obj2');

document.body.appendChild(
  <app-layout title="Object">
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--spacing)',
      }}
    >
      <gui-object value={anonymousObj} withHeader {...sharedProps} />
      <gui-object value={obj1} withHeader {...sharedProps} />
      <gui-object value={obj2} {...sharedProps} />
      <gui-object value={core.DurationUnit.hours()} withHeader {...sharedProps} />
    </div>
  </app-layout>,
);
