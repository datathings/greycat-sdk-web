import { GreyCat } from '@greycat/sdk';

// @greycat/ui
import '../../../src';

const greycat = await GreyCat.init({ url: new URL('http://localhost:8080') });

const task = await greycat.call('project::whatever');
console.log(task);
