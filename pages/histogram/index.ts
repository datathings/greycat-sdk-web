import { mount } from '../common';
import { core } from '@greycat/sdk';

mount(async (app, greycat) => {
  const histogramEl = document.createElement('gui-histogram-chart');
  /*
    Data Point Structure:

    Each column in the table.cols array should be an array with the following information:
      table.cols[0] = list of starting positions on x axis for each bar. Ex: [0,  10, 20, 30, 40, 50, 60, 70, 80, 90]
      table.cols[1] = list of ending positions on x axis for each bar.   Ex: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
      table.cols[2] = list of heights (y values) for each bar.           Ex: [20.0, 15.0, 30.0, 20.0, 10.0, 1.0, 1.0, 1.0, 1.0, 1.0] 
      table.cols[3] = z value (accumulative of y)                        Ex: [20.0, 35.0, 65.0, 85.0, 95.0, 96.0, 97.0, 98.0, 99.0, 100.0]

    Metadata (meta) of table:
      table.meta[i]
      meta should have properties like min and max for each relevant axis.

  */

  const table = await greycat.call<core.Table>('project::histogram_table');
  histogramEl.columns = [2, 3];
  histogramEl.table = table;
  
  console.log(table);
  console.log(table.meta);

  app.appendChild(histogramEl);
});
