import { toast } from '@greycat/web';
import { appLayout } from '~/common';

const greycat = await gc.sdk.init({ debug: true });

document.body.appendChild(
  appLayout('Toast',
    <div className="row">
      <sl-button onclick={() => toast.notify({ message: 'Hello, from toast!' })}>Default</sl-button>
      <sl-button onclick={() => toast.warning({ message: 'This is a warning' })}>Warning</sl-button>
      <sl-button onclick={() => toast.error('This is an error')}>Error string</sl-button>
      <sl-button
        onclick={() => {
          try {
            // oxlint-disable-next-line no-unassigned-vars
            let x: number | undefined;
            // oxlint-disable-next-line no-unused-expressions, no-explicit-any
            (x as any)[42];
          } catch (err) {
            toast.error(err);
          }
        }}
      >
        Error js
      </sl-button>
      <sl-button
        onclick={async () => {
          try {
            await greycat.call('project::chart'); // missing argument, will trigger an error
          } catch (err) {
            toast.error(err);
          }
        }}
      >
        Error GreyCat
      </sl-button>
    </div>,
  ),
);
