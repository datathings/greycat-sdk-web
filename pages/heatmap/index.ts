import { core } from '@greycat/sdk';
import { mount } from '../common';

mount(async (app, greycat) => {
  const table = await greycat.call<core.Table>('project::heatmap');
  console.log({ table });

  const heatmap = document.createElement('gui-heatmap');
  heatmap.style.width = '1024px';
  heatmap.style.height = '768px';
  heatmap.style.margin = 'auto';
  app.appendChild(heatmap);

  heatmap.xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  heatmap.yLabels = ["Paris", "London", "New-York", "Beijing", "Perth", "Oslo"];
  heatmap.table = table;
});
