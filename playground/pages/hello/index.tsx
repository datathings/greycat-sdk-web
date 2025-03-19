import '@greycat/web';
import '@/common';

await gc.sdk.init();

const t = gc.core.time.fromDate(new Date());
const grid: Partial<CSSStyleDeclaration> = {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  columnGap: '20px',
};

document.body.appendChild(
  <app-layout title="Hello">
    <div style={grid}>
      <span>ISO8601</span>
      <gui-value value={t} />
      <span>microseconds</span>
      <gui-value value={t.value} />
      <span>milliseconds</span>
      <gui-value value={t.epochMs} />
      <span>input</span>
      <gui-input-time value={t} />
    </div>
  </app-layout>,
);
