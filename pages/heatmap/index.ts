import type { core } from '@greycat/sdk';
import '../layout';
import './index.css';

const app = document.createElement('app-layout');
app.title = 'Heatmap';
await app.init();

document.body.prepend(app);

const table = await greycat.default.call<core.Table>('project::heatmap');

const heatmap = document.createElement('gui-heatmap');
heatmap.style.width = '1024px';
heatmap.style.height = '768px';
app.main.appendChild(heatmap);

heatmap.xLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
heatmap.yLabels = ["Paris", "London", "New-York", "Beijing", "Perth", "Oslo"];
heatmap.table = table;
heatmap.colorScaleWidth = 50;
