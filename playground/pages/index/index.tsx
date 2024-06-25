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
      <sl-card className={s.noPadding}>
        <div slot="header">Details</div>
        <sl-details summary="This is the summary">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus lacinia odio vitae
            vestibulum vestibulum. Cras venenatis euismod malesuada. Nullam ac erat ante. Proin
            euismod, nulla vel dictum volutpat, nisi lorem egestas odio, vitae scelerisque enim
            ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.
            Morbi non urna ut odio efficitur hendrerit. Quisque egestas ipsum vitae lacus lacinia,
            at consectetur enim vehicula.
          </p>
        </sl-details>
      </sl-card>
      <sl-card>
        <div slot="header">Buttons</div>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--spacing)',
          }}
        >
          <fieldset>
            <legend>Variant</legend>
            <div style={{ display: 'flex', gap: 'var(--spacing)' }}>
              <sl-button variant="default">Default</sl-button>
              <sl-button variant="primary">Primary</sl-button>
              <sl-button variant="success">Success</sl-button>
              <sl-button variant="neutral">Neutral</sl-button>
              <sl-button variant="warning">Warning</sl-button>
              <sl-button variant="danger">Danger</sl-button>
            </div>
          </fieldset>
          <fieldset>
            <legend>Outline</legend>
            <div style={{ display: 'flex', gap: 'var(--spacing)' }}>
              <sl-button variant="default" outline>
                Default
              </sl-button>
              <sl-button variant="primary" outline>
                Primary
              </sl-button>
              <sl-button variant="success" outline>
                Success
              </sl-button>
              <sl-button variant="neutral" outline>
                Neutral
              </sl-button>
              <sl-button variant="warning" outline>
                Warning
              </sl-button>
              <sl-button variant="danger" outline>
                Danger
              </sl-button>
            </div>
          </fieldset>
          <fieldset>
            <legend>Size</legend>
            <div style={{ display: 'flex', gap: 'var(--spacing)' }}>
              <sl-button size="small">Small</sl-button>
              <sl-button size="medium">Medium</sl-button>
              <sl-button size="large">Large</sl-button>
            </div>
          </fieldset>
          <fieldset>
            <legend>Pill</legend>
            <div style={{ display: 'flex', gap: 'var(--spacing)' }}>
              <sl-button size="small" pill>
                Small
              </sl-button>
              <sl-button size="medium" pill>
                Medium
              </sl-button>
              <sl-button size="large" pill>
                Large
              </sl-button>
            </div>
          </fieldset>
          <fieldset>
            <legend>Variant text</legend>
            <div style={{ display: 'flex', gap: 'var(--spacing)' }}>
              <sl-button variant="text" size="small">
                Text
              </sl-button>
              <sl-button variant="text" size="medium">
                Text
              </sl-button>
              <sl-button variant="text" size="large">
                Text
              </sl-button>
            </div>
          </fieldset>
        </div>
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
