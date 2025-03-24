import { toast } from '@greycat/web';
import '~/common';

const greycat = await gc.sdk.init();

document.body.appendChild(
  <app-layout title="Toast">
    <div className="row">
      <sl-button onclick={() => toast.notify({ message: 'Hello, from toast!' })}>Default</sl-button>
      <sl-button onclick={() => toast.warning({ message: 'This is a warning' })}>Warning</sl-button>
      <sl-button onclick={() => toast.error('This is an error')}>Error string</sl-button>
      <sl-button
        onclick={() => {
          try {
            let x;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    </div>
  </app-layout>,
);
