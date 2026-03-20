import '@greycat/web';
import { GuiFactory } from '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const customValueTag = GuiFactory.defineFromFn((v) => (
  <div>
    <em>Custom:</em>
    <div>{v}</div>
  </div>
));

document.body.appendChild(
  appLayout('Context',
    <div className="gui-list">
      <gui-value value="Should use the default global factory" />
      <gui-factory valueTag={customValueTag}>
        <gui-object value={{ hello: 'Should be using the custom factory' }} />
      </gui-factory>
    </div>,
  ),
);
