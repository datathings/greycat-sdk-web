import { GreyCat, core } from '@greycat/sdk';

// @greycat/ui
import '../../../src';

const greycat = await GreyCat.init({ url: new URL('http://localhost:8080') });

const app = document.getElementById('app') as HTMLDivElement;

const tableEl = document.createElement('gui-table');
tableEl.style.height = '500px';
app.appendChild(tableEl);

const table = await greycat.call<core.Table>('project::table');
console.log({ table });
tableEl.table = table;

