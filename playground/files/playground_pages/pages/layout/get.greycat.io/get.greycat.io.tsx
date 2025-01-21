import { setGlobalDateTimeFormatTimezone, svg, toggleTheme } from '@greycat/web';
import '@greycat/web/greycat.css';
import './styles.css';
import LogoIcon from './logo.svg?raw';

await gc.sdk.init();

document.body.appendChild(
  <gui-layout>
    <a slot="header" className="logo" href="/pages/layout/complex.html">
      {svg(LogoIcon)}
    </a>
    <div slot="header" className="row">
      <gui-input-enum
        type="core::TimeZone"
        ongui-change={function () {
          if (this.value) {
            setGlobalDateTimeFormatTimezone(this.value as gc.core.TimeZone);
          } else {
            setGlobalDateTimeFormatTimezone(gc.core.TimeZone.UTC);
          }
        }}
      />
      <sl-button variant="text" onclick={toggleTheme}>
        Light / Dark
      </sl-button>
    </div>

    <div slot="main-header">Coucou</div>
    <gui-files slot="main" className="main" />

    <div slot="footer">
      <div style="text-align: center; font-size: 0.9em; color: var(--muted-color);">
        <p>&copy; 2025 DataThings. All rights reserved.&nbsp;Powered by GreyCat.</p>
        <p>
          <a href="#">LinkedIn</a>&nbsp;|&nbsp;<a href="#">Twitter</a>&nbsp;|&nbsp;
          <a href="#">GitLab</a>
        </p>
      </div>
    </div>
  </gui-layout>,
);
