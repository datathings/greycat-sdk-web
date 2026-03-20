import '@greycat/web';
import { appLayout } from '~/common';
import './app-value';
import { GuiFactory } from '@greycat/web';

await gc.sdk.init({ debug: true });

GuiFactory.global.valueTag = 'app-value';

const value = await gc.project.array_of_nodes();

document.body.appendChild(
  appLayout('Array',
    <gui-object value={value} />,
  ),
);
