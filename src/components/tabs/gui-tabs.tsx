export class GuiTabs extends HTMLElement {
  readonly tabs: Map<string, GuiTab> = new Map();
  readonly panels: Map<string, GuiPanel> = new Map();

  connectedCallback() {
    const activeTabName = this.querySelector('gui-tab.activeTab')?.textContent;
    if (!activeTabName) {
      console.warn('Set class="activeTab" to at least one <gui-tab />');
    }
    const tabs = this.querySelectorAll('gui-tab');
    tabs.forEach((tab) => {
      const tabName = tab.textContent;
      if (!tabName) {
        return;
      }
      this.tabs.set(tabName, tab);

      tab.addEventListener('keypress', (ev) => {
        if (
          tab === document.activeElement &&
          ev.key === 'Enter' &&
          !tab.classList.contains('activeTab')
        ) {
          this._internalSelect(tab);
        }
      });
      tab.addEventListener('click', () => this._internalSelect(tab));
    });

    this.querySelectorAll('gui-panel').forEach((panel) => {
      const tabName = panel.getAttribute('data-tab');
      if (!tabName) {
        return;
      }
      this.panels.set(tabName, panel);
      panel.remove();
    });

    this.replaceChildren(<div className="tabs">{tabs}</div>);

    if (activeTabName) {
      const activePanel = this.panels.get(activeTabName);
      if (activePanel) {
        this.appendChild(activePanel);
      }
    }
  }

  disconnectedCallback() {
    this.panels.clear();
    this.replaceChildren();
  }

  selectTab(name: string): void {
    const tabs = this.querySelectorAll('gui-tab');
    for (let i = 0; i < tabs.length; i++) {
      const tab = tabs[i];
      if (tab.textContent === name) {
        this._internalSelect(tab);
      }
    }
  }

  private _internalSelect(tab: GuiTab): void {
    this.tabs.forEach((tab) => tab.classList.remove('activeTab'));
    this.panels.forEach((panel) => panel.remove());

    tab.classList.add('activeTab');
    const tabName = tab.textContent;
    if (!tabName) {
      return;
    }
    const panel = this.panels.get(tabName);
    if (panel) {
      this.appendChild(panel);
      this.dispatchEvent(new GuiTabChangeEvent({ detail: tab }));
    }
  }
}

export class GuiTab extends HTMLElement {
  connectedCallback() {
    if (!this.hasAttribute('tabindex')) {
      this.tabIndex = 0;
    }
  }
}

export class GuiPanel extends HTMLElement {
  /**
   * Returns the associated tab name
   */
  get tab() {
    return this.getAttribute('data-tab');
  }
}

const GUI_TAB_CHANGE_EVENT = 'gui-tab-change';
const ONGUI_TAB_CHANGE_EVENT = `on${GUI_TAB_CHANGE_EVENT}`;

export class GuiTabChangeEvent extends CustomEvent<GuiTab> {
  constructor(eventInitDict: CustomEventInit<GuiTab>) {
    super(GUI_TAB_CHANGE_EVENT, eventInitDict);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-tabs': GuiTabs;
    'gui-tab': GuiTab;
    'gui-panel': GuiPanel;
  }

  interface HTMLElementEventMap {
    [GUI_TAB_CHANGE_EVENT]: GuiTabChangeEvent;
  }

  namespace JSX {
    interface IntrinsicElements {
      'gui-tabs': GreyCat.Element<
        GuiTabs & { [ONGUI_TAB_CHANGE_EVENT]: (ev: GuiTabChangeEvent) => void }
      >;
      'gui-tab': GreyCat.Element<GuiTab>;
      'gui-panel': GreyCat.Element<GuiPanel>;
    }
  }
}

if (!customElements.get('gui-tabs')) {
  customElements.define('gui-tabs', GuiTabs);
}
if (!customElements.get('gui-tab')) {
  customElements.define('gui-tab', GuiTab);
}
if (!customElements.get('gui-panel')) {
  customElements.define('gui-panel', GuiPanel);
}
