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
      tab.addEventListener('click', () => {
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
        }
      });
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
}

export class GuiTab extends HTMLElement {}
export class GuiPanel extends HTMLElement {}

declare global {
  interface HTMLElementTagNameMap {
    'gui-tabs': GuiTabs;
    'gui-tab': GuiTab;
    'gui-panel': GuiPanel;
  }

  namespace JSX {
    interface IntrinsicElements {
      'gui-tabs': GreyCat.Element<GuiTabs>;
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
