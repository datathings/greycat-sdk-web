import * as sdk from '@greycat/sdk';

import { mount } from '../common';

mount(async (app) => {
  const csva = sdk.io.CsvAnalysis.createFrom({format: null, row_limit: null, enum_limit: null, date_check_limit: null, date_formats: null, statistics: null});
  const greycat = window.greycat.default = await sdk.GreyCat.init({ url: new URL('http://localhost:8080') });
  
  const updated_csva = await sdk.io.CsvAnalysis.analyze('test.csv', csva, greycat);
  console.log(updated_csva?.statistics);

  const csvAnalysis = document.createElement('gui-csv-analysis')!;

  csvAnalysis.analysis = updated_csva;

  console.log(csvAnalysis);

  app.appendChild(csvAnalysis);
});
