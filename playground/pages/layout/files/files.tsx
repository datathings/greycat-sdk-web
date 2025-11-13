import {
  GuiFiles,
  querySelectorAllWithShadow,
  setGlobalDateTimeFormatTimezone,
  sl,
  svg,
  toggleTheme,
} from '@greycat/web';
import '@greycat/web/greycat.css';
import './styles.css';
import LogoIcon from './logo.svg?raw';

await gc.sdk.init({ debug: true });

const files = (
  <gui-files
    slot="main"
    className="main"
    ongui-click={(ev) => {
      if (ev.detail.path === '..') {
        bc.lastChild?.remove();
      } else if (ev.detail.path.endsWith('/')) {
        const depth = ev.detail.path.split('/').length - 1;
        const name = filename(ev.detail.path);
        bc.appendChild(
          <sl-breadcrumb-item
            onclick={() => {
              files.change_dir(ev.detail.path);
              while (bc.childElementCount !== depth + 2) {
                bc.lastChild?.remove();
              }
            }}
          >
            {name}
          </sl-breadcrumb-item>,
        );
      }
    }}
  />
) as GuiFiles;

const bc = (
  <sl-breadcrumb>
    <span slot="separator">/</span>
    <sl-breadcrumb-item
      onclick={() => {
        files.change_dir('/');
        while (bc.childElementCount !== 2) {
          bc.lastChild?.remove();
        }
      }}
    >
      /files
    </sl-breadcrumb-item>
  </sl-breadcrumb>
) as sl.SlBreadcrumb;

function filename(filepath: string): string {
  if (filepath.endsWith('/')) {
    filepath = filepath.slice(0, -1);
  }
  const lastSlash = filepath.lastIndexOf('/');
  if (lastSlash === -1) {
    return filepath;
  }
  return filepath.slice(lastSlash + 1);
}

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
          const values = querySelectorAllWithShadow('gui-value');
          for (const value of values) {
            value.update();
          }
        }}
      />
      <sl-button variant="text" onclick={toggleTheme}>
        Light / Dark
      </sl-button>
    </div>

    <div slot="main-header">{bc}</div>
    {files}

    <div slot="footer" className="footer">
      <div style="text-align: center; font-size: 0.9em; color: var(--muted-color);">
        <p>
          &copy; 2025{' '}
          <a href="https://datathings.com" target="_blank">
            DataThings
          </a>
          . All rights reserved.&nbsp;Powered by{' '}
          <a href="https://greycat.io" target="_blank">
            GreyCat
          </a>
          .
        </p>
        <p>
          <a href="https://www.linkedin.com/company/datathings" target="_blank">
            LinkedIn
          </a>
          &nbsp;|&nbsp;
          <a href="https://hub.datathings.com/" target="_blank">
            GitLab
          </a>
        </p>
      </div>
    </div>
  </gui-layout>,
);
