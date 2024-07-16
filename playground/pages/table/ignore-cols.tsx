import HighIcon from '@tabler/icons/temperature-sun.svg?raw';
import MediumIcon from '@tabler/icons/temperature.svg?raw';
import LowIcon from '@tabler/icons/temperature-snow.svg?raw';

import { GCEnum, GreyCat, GuiValueElement, IndexedDbCache, TableLike } from '@greycat/web';
import '@/common';
import { actions } from './actions';

greycat.default = await GreyCat.init({
  cache: new IndexedDbCache('sdk-web-playground'),
});

export class AppConfidence extends HTMLElement implements GuiValueElement<GCEnum> {
  private static HIGH: SVGSVGElement;
  private static MEDIUM: SVGSVGElement;
  private static LOW: SVGSVGElement;

  static {
    const parser = new DOMParser();
    this.HIGH = parser.parseFromString(HighIcon, 'image/svg+xml').children[0] as SVGSVGElement;
    this.MEDIUM = parser.parseFromString(MediumIcon, 'image/svg+xml').children[0] as SVGSVGElement;
    this.LOW = parser.parseFromString(LowIcon, 'image/svg+xml').children[0] as SVGSVGElement;
  }

  connectedCallback() {
    this.style.display = 'flex';
    this.style.alignItems = 'center';
    this.style.gap = 'var(--spacing)';
  }

  set color(color: string) {
    this.style.color = color;
  }

  set value(value: GCEnum) {
    switch (value.key) {
      case 'High':
        this.replaceChildren(
          <>
            {AppConfidence.HIGH.cloneNode(true)}
            <span> {value.key}</span>
          </>,
        );
        break;
      case 'Medium':
        this.replaceChildren(
          <>
            {AppConfidence.MEDIUM.cloneNode(true)}
            <span> {value.key}</span>
          </>,
        );
        break;
      case 'Low':
        this.replaceChildren(
          <>
            {AppConfidence.LOW.cloneNode(true)}
            <span> {value.key}</span>
          </>,
        );
        break;
      default:
        this.replaceChildren(document.createTextNode('??'));
        break;
    }
  }

  static icon(svg: string): SVGSVGElement {
    const d = new DOMParser().parseFromString(svg, 'image/svg+xml');
    const el = d.children[0] as SVGSVGElement;
    return el;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-confidence': AppConfidence;
  }

  namespace JSX {
    interface IntrinsicElements {
      'app-confidence': GreyCat.Element<AppConfidence>;
    }
  }
}

if (!customElements.get('app-confidence')) {
  customElements.define('app-confidence', AppConfidence);
}

document.body.appendChild(
  <app-layout title="Table (ignore columns)">
    {actions}
    <gui-table
      value={await greycat.default.call<TableLike>('project::chart', [100])}
      ignoreCols={[3, 4]}
      columnFactories={{
        5: 'app-confidence',
      }}
      rowHeight={30}
      style={{ backgroundColor: 'var(--bg-1)' }}
      ontable-click={(ev) => {
        console.log(ev.detail);
      }}
    />
  </app-layout>,
);
