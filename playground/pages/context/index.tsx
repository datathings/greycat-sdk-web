import '@greycat/web';
import { GuiFactory } from '@greycat/web';
import '~/common';

await gc.sdk.init();

const customValueTag = GuiFactory.defineFromFn((v) => (
  <div>
    <em>Custom:</em>
    <div>{v}</div>
  </div>
));

document.body.appendChild(
  <app-layout title="Context">
    <div className="gui-list">
      <gui-value value="Should use the default global factory" />
      <gui-factory valueTag={customValueTag}>
        <gui-object value={{ hello: 'Should be using the custom factory' }} />
      </gui-factory>
    </div>
  </app-layout>,
);
