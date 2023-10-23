import '../layout';

const app = document.createElement('app-layout');
app.title = 'Periodic Tasks';

await app.init();

document.body.prepend(app);
app.main.replaceChildren(<>Work in progress...</>)
