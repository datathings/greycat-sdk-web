import '@greycat/web/sdk';
import { displayValue } from './_utils.js';

const greycat = await gc.sdk.init();

{
  const m = new Map();
  m.set(0, 0);
  m.set(1, 0.5);
  m.set(2, 1);
  const res = await greycat.call('project::monomorphic_map', [42, m]);
  displayValue(res);
}

{
  const res = await greycat.call('project::monomorphic_arr', [[0, 0.5, 1]]);
  displayValue(res);
}

{
  const res = await greycat.call('project::monomorphic_arr_obj', [
    [new gc.project.Circle(3.14), new gc.project.Rect(10)],
  ]);
  displayValue(res);
}

{
  const res = await greycat.call('project::arr_any', [[42, true, 'hello', gc.core.CalendarUnit.month]]);
  displayValue(res);
}
