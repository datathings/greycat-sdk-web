import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

document.body.appendChild(
  appLayout('CSV Column Input',
    <gui-input-abstract type="io::CsvColumn" />,
  ),
);
