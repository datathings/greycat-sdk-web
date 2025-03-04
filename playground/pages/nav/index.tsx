import '@greycat/web';
import '@greycat/web/greycat.css';
import './styles.css';

await gc.sdk.init();

document.body.appendChild(
  <gui-layout>
    <h6 slot="header">Navigation example</h6>
    <gui-nav slot="navigation" />
    <div slot="main">Hello nav</div>
  </gui-layout>,
);
