// import { mount } from '../common';
// import { core } from '@greycat/sdk';

// mount(async (app, greycat) => {
//   /*
//     Data Point Structure:

//     Each column in the table.cols array should be an array with the following information:
//       table.cols[0] = list of starting positions on x axis for each bar. Ex: [0,  10, 20, 30, 40, 50, 60, 70, 80, 90]
//       table.cols[1] = list of ending positions on x axis for each bar.   Ex: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
//       table.cols[2] = list of heights (y values) for each bar.           Ex: [20.0, 15.0, 30.0, 20.0, 10.0, 1.0, 1.0, 1.0, 1.0, 1.0] 
//       table.cols[3] = z value (accumulative of y)                        Ex: [20.0, 35.0, 65.0, 85.0, 95.0, 96.0, 97.0, 98.0, 99.0, 100.0]

//     Metadata (meta) of table:
//       table.meta[i]
//       meta should have properties like min and max for each relevant axis.
//   */

//   const histogramEl = document.createElement('gui-histogram-chart');
//   const table = await greycat.call<core.Table>('project::histogram_table');
//   histogramEl.columns = [2, 3];
//   histogramEl.table = table;
  
//   app.appendChild(histogramEl);
// });


import { core } from '../../src';
import '../layout';

const app = document.createElement('app-layout');
app.title = 'Histogram';
await app.init();

document.body.prepend(app);

const histogramEl = document.createElement('gui-histogram-chart');
const table = await await greycat.default.call<core.Table>('project::histogram_table');
histogramEl.columns = [2, 3];
histogramEl.table = table;

console.log(`HEY THERE LOOK: ${table}`);

// const users: runtime.User[] = [];
// const groups: runtime.UserGroup[] = [];
// const entities = await runtime.User.all();
// for (const entity of entities) {
//   if (entity instanceof runtime.User) {
//     users.push(entity);
//   } else if (entity instanceof runtime.UserGroup) {
//     groups.push(entity);
//   }
// }
// const roles = await runtime.UserRole.all();
// const permissions = await runtime.SecurityPolicy.permissions();

app.main.appendChild(
  <article>
    <header>Histogram</header>
    <gui-histogram-chart columns={[2, 3]} table={table} />
  </article>
);