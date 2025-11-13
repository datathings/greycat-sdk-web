import '@greycat/web';
import '~/common';
import './app-value';
import { GuiFactory } from '@greycat/web';

await gc.sdk.init({ debug: true });

GuiFactory.global.valueTag = 'app-value';

const value = await gc.project.array_of_nodes();

document.body.appendChild(
  <app-layout title="Array">
    <gui-object value={value} />
  </app-layout>,
);
