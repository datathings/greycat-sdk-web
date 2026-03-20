import '@greycat/web';
import { appLayout } from '~/common';
import './index.css';

await gc.sdk.init({ debug: true });

document.body.appendChild(
  appLayout('Layout',
    <gui-layout>
      <div slot="header">header</div>

      <div slot="navigation-header">navigation-header</div>
      <div slot="navigation">navigation</div>
      <div slot="navigation-footer">navigation-footer</div>

      <div slot="main-header">main-header</div>
      <div slot="main">main</div>
      <div slot="main-footer">main-footer</div>

      <div slot="aside">aside</div>

      <div slot="footer">footer</div>
    </gui-layout>,
  ),
);
