import { css, getBooleanAttribute, GuiChangeEvent, GuiElement } from '../../exports.js';
import tabsStyle from './tabs.css?inline';
import tabStyle from './tab.css?inline';
import panelStyle from './panel.css?inline';

/**
 * Children of a `gui-tabs` should be either `gui-tab` or `gui-panel` (or subclasses of them).
 *
 * The first time this component is connected to the DOM it inspects its children to create the panels, and won't ever do it again.
 * What this means is that this component does not know how to react to dynamically adding/removing tabs/panels.
 */
export class GuiTabs extends GuiElement {
  static override styles = [css(tabsStyle)];

  private _tabsSlot: HTMLSlotElement;
  private _panelsSlot: HTMLSlotElement;
  private _tabs: GuiTab[] = [];
  private _initialized = false;
  readonly panels: Map<string, GuiPanel> = new Map();

  constructor() {
    super();

    this._tabsSlot = document.createElement('slot');
    this._tabsSlot.name = 'tab';

    this._panelsSlot = document.createElement('slot');
    this._panelsSlot.name = 'panel';

    this.shadowRoot.appendChild(
      <>
        <div className="tabs">{this._tabsSlot}</div>
        {this._panelsSlot}
      </>,
    );
  }

  connectedCallback() {
    if (this._initialized) {
      return;
    }
    this._initialize();
    this._initialized = true;
  }

  selectTab(name: string): void {
    for (let i = 0; i < this._tabs.length; i++) {
      const tab = this._tabs[i];
      if (tab.textContent === name) {
        this._internalSelect(tab);
      }
    }
  }

  private _initialize(): void {
    this._tabs = this._tabsSlot.assignedElements().filter((el): el is GuiTab => {
      if (el instanceof GuiTab) {
        return true;
      }
      console.warn(`Only 'gui-tab' elements can be used as tabs with 'gui-tabs'`);
      return false;
    });

    this._tabs.forEach((tab) => {
      const tabName = tab.textContent;
      if (!tabName) {
        return;
      }
      tab.addEventListener('keypress', (ev) => {
        if (ev.key === 'Enter' && !tab.active) {
          this._internalSelect(tab);
        }
      });
      tab.addEventListener('click', () => this._internalSelect(tab));
    });

    const activeTab = this._tabs.find((el) => el.active);

    {
      const panels = this._panelsSlot.assignedElements() as HTMLElement[];
      for (const panel of panels) {
        if (panel instanceof GuiPanel) {
          const tabName = panel.tab;
          this.panels.set(tabName, panel);
          panel.setAttribute('data-tab', tabName);
          panel.remove();
        } else {
          console.warn(`Only 'gui-panel' elements can be used as panels with 'gui-tabs'`);
        }
      }
    }
    if (activeTab && activeTab.textContent) {
      const activePanel = this.panels.get(activeTab.textContent);
      if (activePanel) {
        this.appendChild(activePanel);
      }
    } else if (this._tabs.length > 0) {
      const firstTab = this._tabs[0];
      if (firstTab.textContent) {
        const tabName = firstTab.textContent;
        for (const panel of this.panels.values()) {
          const tab = panel.tab;
          if (tab === tabName) {
            firstTab.active = true;
            this.appendChild(panel);
            break;
          }
        }
      }
    }
  }

  private _internalSelect(tab: GuiTab): void {
    this._tabs.forEach((el) => {
      el.active = false;
    });
    this.panels.forEach((panel) => panel.remove());

    tab.active = true;
    const tabName = tab.textContent;
    if (!tabName) {
      return;
    }
    const panel = this.panels.get(tabName);
    if (panel) {
      this.appendChild(panel);
      this.dispatchEvent(new GuiChangeEvent(tab));
    }
  }

  /**
   * Returns the currently selected tab if any
   */
  get tab(): GuiTab | undefined {
    return this._tabs.find((t) => t.active);
  }
}

export class GuiTab extends GuiElement {
  static override styles = [css(tabStyle)];
  private _active = false;

  constructor() {
    super();

    this.shadowRoot.appendChild(
      <div className="tab" part="base">
        <slot />
      </div>,
    );
  }

  get active() {
    return this._active;
  }

  set active(active: boolean) {
    this._active = active;
    this.update();
  }

  connectedCallback() {
    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0;
    }
    if (this.hasAttribute('active')) {
      this.active = getBooleanAttribute(this, 'active') || this.active;
    }
    this.update();
  }

  update(): void {
    if (!this.isConnected) {
      return;
    }
    if (this._active) {
      this.shadowRoot.children[0].classList.add('active');
    } else {
      this.shadowRoot.children[0].classList.remove('active');
    }
  }
}

export class GuiPanel extends GuiElement {
  static override styles = [css(panelStyle)];

  private _tab = '';

  constructor() {
    super();

    this.shadowRoot.appendChild(<slot />);
  }

  connectedCallback(): void {
    const tab = this.getAttribute('tab');
    if (tab !== null) {
      this.tab = tab;
    }
  }

  /**
   * The associated `gui-tab` name (it's `textContent`)
   */
  get tab() {
    return this._tab;
  }

  set tab(tab: string) {
    this._tab = tab;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-tabs': GuiTabs;
    'gui-tab': GuiTab;
    'gui-panel': GuiPanel;
  }

  interface GuiTabsEventMap {
    [GuiChangeEvent.NAME]: GuiChangeEvent<HTMLElement>;
  }

  interface HTMLElementEventMap extends GuiTabsEventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /**
         * Children of `gui-tabs` should be either `gui-tab` or `gui-panel` (or subclasses of them).
         */
        'gui-tabs': GreyCat.Element<GuiTabs, GuiTabsEventMap>;
        'gui-tab': GreyCat.Element<GuiTab>;
        'gui-panel': GreyCat.Element<GuiPanel>;
      }
    }
  }
}
