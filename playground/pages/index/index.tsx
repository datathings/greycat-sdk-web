import '@greycat/web';
import '@greycat/web/css/greycat.css';
import '@/common';
import s from './index.module.css';

document.body.appendChild(
  <app-layout title="Index">
    <div className={s.body}>
      <sl-card>
        <div slot="header">Colors</div>
        <div className={s.paletteContainer}>
          {colorPalette('primary')}
          {colorPalette('success')}
          {colorPalette('warning')}
          {colorPalette('danger')}
          {colorPalette('neutral')}
        </div>
      </sl-card>
      {Array.from({ length: 6 }).map((_, i) => {
        const heading = document.createElement(`h${i + 1}`);
        heading.textContent = `Heading h${i + 1}`;
        return (
          <sl-card className={s.noPadding}>
            <div slot="header">
              Heading <code>&lt;h{i + 1}&gt;</code>
            </div>
            <div className={s.list}>{heading}</div>
          </sl-card>
        );
      })}
      <sl-card className={s.noPadding}>
        <div slot="header">
          Paragraph <code>&lt;p&gt;</code>
        </div>
        <p>
          This is a paragraph, that contains a <span>span</span>, an <em>emphasized</em> word. But
          also a <b>bold</b> one, and a <s>strikethrough</s>. All this <small>small</small> things
          just to:
          <blockquote>Validate each stylings.</blockquote>
        </p>
      </sl-card>
    </div>
  </app-layout>,
);

function colorPalette(name: string) {
  return (
    <div className={s.palette}>
      {[50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950].map((value) => (
        <div>
          <div className={s.colorName}>
            --sl-color-{name}-{value}
          </div>
          <div
            className={s.colorSquare}
            style={{ backgroundColor: `var(--sl-color-${name}-${value})` }}
          ></div>
        </div>
      ))}
    </div>
  );
}
