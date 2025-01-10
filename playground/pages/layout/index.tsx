import '@/common';
import './index.css';

import { GreyCat, runtime } from '@greycat/sdk/web';
import '@greycat/sdk/greycat.css';

await GreyCat.init();

function toggleTheme() {
  const is_dark = document.documentElement.classList.contains('sl-theme-dark');
  const is_light = document.documentElement.classList.contains('sl-theme-light');
  if ((!is_dark && !is_light) || is_dark) {
    document.documentElement.classList.remove('sl-theme-dark');
    document.documentElement.classList.add('sl-theme-light');
  } else {
    document.documentElement.classList.remove('sl-theme-light');
    document.documentElement.classList.add('sl-theme-dark');
  }
}

document.body.appendChild(
  <app-layout mainStyle={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing)' }}>
    <gui-layout menuWidth={150}>
      <gui-layout-header slot="header">
        <sl-button variant="text">@greycat/web</sl-button>
        <sl-button slot="menu" variant="text">
          Link 1
        </sl-button>
        <sl-button slot="menu" variant="text">
          Link 2
        </sl-button>
        <sl-button slot="menu" variant="text">
          Link 3
        </sl-button>
        <sl-icon-button name="gear" label="Action 1" slot="action" />
        <sl-button slot="action" variant="text">
          Action 2
        </sl-button>
        <sl-button slot="action" variant="text" onclick={toggleTheme}>
          Light / Dark
        </sl-button>
      </gui-layout-header>
      <gui-layout-menu slot="menu">
        <sl-button variant="text">
          <sl-icon slot="prefix" name="house-door" />
          Link 1
        </sl-button>
        <sl-button variant="text">
          <sl-icon slot="prefix" name="sliders" />
          Link 2
        </sl-button>
        <sl-button variant="text">
          <sl-icon slot="prefix" name="diagram-3" />
          Link 3
        </sl-button>
        <sl-divider />
        <sl-button variant="text">Link 4</sl-button>
        <sl-button variant="text">Link 5</sl-button>
      </gui-layout-menu>
      <div
        style={{
          padding: 'var(--spacing)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing)',
        }}
      >
        <gui-input-object value={await runtime.Runtime.info()} />
      </div>
    </gui-layout>
  </app-layout>,
);
