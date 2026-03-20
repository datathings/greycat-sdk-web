import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const data = await gc.project.table_with_urls();

const URL_REGEX = /^(https?:\/\/)?([\w.-]+)\.([a-z]{2,})(:[0-9]{1,5})?(\/[^\s]*)?$/i;

document.body.appendChild(
  appLayout('Table (url)',
    <gui-table
      value={data}
      useDefaultColumns
      columns={[
        {
          index: gc.project.UrlEntry.$fields.value,
          cell: {
            tag: 'gui-value',
            props: {
              linkify: (value: string) => URL_REGEX.test(value),
            },
          },
        },
      ]}
    />,
  ),
);
