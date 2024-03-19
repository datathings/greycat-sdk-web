import '@greycat/web';
import '@greycat/web/css/greycat.css';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@/common';
import s from './index.module.css';

document.body.appendChild(
  <app-layout title="Index">
    <div className={s.body}>
      <sl-card>
        <div slot="header">Colors</div>
        <div className={s.paletteContainer}>
          {generateColorPalette('primary')}
          {generateColorPalette('success')}
          {generateColorPalette('warning')}
          {generateColorPalette('danger')}
          {generateColorPalette('neutral')}
        </div>
      </sl-card>
      <sl-card>
        <div slot="header">Typography</div>
        <div className={s.list}>
          <h1>Header h1</h1>
          <h2>Header h2</h2>
          <h3>Header h3</h3>
          <h4>Header h4</h4>
          <h5>Header h5</h5>
          <h6>Header h6</h6>
          <p>Paragraph</p>
          <span>Span</span>
          <em>Emphasized</em>
          <b>Bold</b>
          <s>Strikthrough</s>
        </div>
      </sl-card>
    </div>
  </app-layout>,
);

function generateColorPalette(name: string) {
  return (
    <div className={s.palette}>
      <div>--sl-color-{name}-50</div>
      <div style={{ backgroundColor: `var(--sl-color-${name}-50)` }}></div>
      <div>--sl-color-{name}-100</div>
      <div style={{ backgroundColor: `var(--sl-color-${name}-100)` }}></div>
      <div>--sl-color-{name}-200</div>
      <div style={{ backgroundColor: `var(--sl-color-${name}-200)` }}></div>
      <div>--sl-color-{name}-300</div>
      <div style={{ backgroundColor: `var(--sl-color-${name}-300)` }}></div>
      <div>--sl-color-{name}-400</div>
      <div style={{ backgroundColor: `var(--sl-color-${name}-400)` }}></div>
      <div>--sl-color-{name}-500</div>
      <div style={{ backgroundColor: `var(--sl-color-${name}-500)` }}></div>
      <div>--sl-color-{name}-600</div>
      <div style={{ backgroundColor: `var(--sl-color-${name}-600)` }}></div>
      <div>--sl-color-{name}-700</div>
      <div style={{ backgroundColor: `var(--sl-color-${name}-700)` }}></div>
      <div>--sl-color-{name}-800</div>
      <div style={{ backgroundColor: `var(--sl-color-${name}-800)` }}></div>
      <div>--sl-color-{name}-900</div>
      <div style={{ backgroundColor: `var(--sl-color-${name}-900)` }}></div>
      <div>--sl-color-{name}-950</div>
      <div style={{ backgroundColor: `var(--sl-color-${name}-950)` }}></div>
    </div>
  );
}
