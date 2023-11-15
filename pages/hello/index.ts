import '../layout';

const app = document.createElement('app-layout');
app.title = 'Hello';
await app.init();

document.body.prepend(app);

app.main.textContent = await greycat.default.call('project::hello', ['world!']);
