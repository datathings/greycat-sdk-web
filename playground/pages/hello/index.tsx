import '@greycat/web';
import { appLayout } from '~/common';

await gc.sdk.init({ debug: true });

const t = gc.core.time.fromDate(new Date());
const grid: Partial<CSSStyleDeclaration> = {
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  columnGap: '20px',
};

document.body.appendChild(
  appLayout('Hello',
    <div style={grid}>
      <span>ISO8601</span>
      <gui-value value={t} />
      <span>microseconds</span>
      <gui-value value={t.value} />
      <span>milliseconds</span>
      <gui-value value={t.epochMs} />
      <span>input</span>
      <gui-input-time value={t} />
    </div>,
  ),
);

(async function main() {
  try {
    const task = await gc.project.controlled_task.spawn(gc.core.duration.from_secs(10));
    const res = await task.result({
      pollEvery: 500,
      onprogress: (p) => console.log(`task ${task.task_id} progress`, p),
    });
    console.log('result', res);
  } catch (err) {
    console.log('ERROR:', gc.sdk.prettyError(err, 'oops'));
  }
})();
