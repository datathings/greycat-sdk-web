import { registerCustomElement, registerFactoryMapping } from '../common.js';
import '../search-input/register.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import { GuiTable, GuiTableBody, GuiTableBodyCell, GuiTableBodyRow, GuiTableHead, GuiTableHeadCell, GuiTableMapping, GuiTableMappings } from './index.js';

registerCustomElement('gui-thead-cell', GuiTableHeadCell);
registerCustomElement('gui-tbody-cell', GuiTableBodyCell);
registerCustomElement('gui-tbody-row', GuiTableBodyRow);
registerCustomElement('gui-thead', GuiTableHead);
registerCustomElement('gui-tbody', GuiTableBody);
registerCustomElement('gui-table', GuiTable);
registerCustomElement('gui-table-mapping', GuiTableMapping);
registerCustomElement('gui-table-mappings', GuiTableMappings);

registerFactoryMapping('core::Table', 'gui-table');
registerFactoryMapping('core::Map', 'gui-table');
registerFactoryMapping('core::Array', 'gui-table');

export * from './index.js';
