import { GreyCat, IndexedDbCache, modal } from '@greycat/web';
import '@/common';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

document.body.appendChild(
  <app-layout title="Modal">
    <div className="row">
      <sl-button
        onclick={() => {
          modal.info({ message: 'This is an info modal' });
        }}
      >
        Open info modal
      </sl-button>
      <sl-button
        onclick={async () => {
          const res = await modal.confirm({
            message: 'Do you agree?',
            confirm: 'Got it',
            cancel: 'Nope',
          });
          window.alert(`Result: ${res}`);
        }}
      >
        Open confirm modal
      </sl-button>
      <sl-button
        onclick={async () => {
          const res = await modal.input({
            title: 'Type your name',
            confirm: 'Save',
            inputProps: {
              value: 'Hello world',
              placeholder: 'eg. john',
              helpText: 'This is going to be your pseudonym throughout the application',
            },
          });
          window.alert(`Result: ${res}`);
        }}
      >
        Open input modal
      </sl-button>
      <sl-button
        onclick={async () => {
          const res = await modal.select({
            title: 'Select a size',
            options: ['small', 'medium', 'large'],
            selectProps: { value: 'medium' },
          });
          window.alert(`Result: ${res}`);
        }}
      >
        Open select modal
      </sl-button>
    </div>
  </app-layout>,
);
