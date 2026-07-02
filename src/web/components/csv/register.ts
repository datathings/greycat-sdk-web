import { registerCustomElement, registerFactoryMapping } from '../common.js';
import '../dialog/register.js';
import '../donut/register.js';
import '../gaussian/register.js';
import '../tabs/register.js';
import '../table/register.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import { GuiCsvStatistics, GuiCsvStatistics2 } from './csv-statistics/index.js';

registerCustomElement('gui-csv-statistics', GuiCsvStatistics);
registerCustomElement('gui-csv-statistics2', GuiCsvStatistics2);

registerFactoryMapping('io::CsvStatistics', 'gui-csv-statistics2');

export * from './csv-statistics/index.js';
