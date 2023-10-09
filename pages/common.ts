import { GreyCat } from '../src';
import '../src/css/greycat.css';
import './common.css';

const app = document.getElementById('app') as HTMLDivElement;

const toggle = document.getElementById('toggle-theme')!;
toggle.addEventListener('click', () => {
  const theme = document.documentElement.getAttribute('data-theme') ?? 'dark';
  document.documentElement.setAttribute('data-theme', theme === 'dark' ? 'light' : 'dark');
});

export async function mount(handler: (app: HTMLDivElement, greycat: GreyCat) => Promise<void> | void): Promise<void> {
  try {
    greycat.default = await GreyCat.init();
    const result = handler(app, greycat.default);
    if (result instanceof Promise) {
      await result;
    }
  } catch (err) {
    console.error(err);
    app.style.color = 'red';

    const error = document.createElement('pre');
    const code = document.createElement('code');
    code.textContent = err instanceof Error ? err.stack ?? err.message : `${err}`;
    app.appendChild(error);

    app.append(document.createTextNode('Is GreyCat started?'), error);
  }
}