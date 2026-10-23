import SlSelect from '@shoelace-style/shoelace/dist/components/select/select.js';
import { toast } from '../../toast.js';
import { SlSelectEventMap } from '../../shoelace.js';
import { GuiElement } from '../element.js';
import { GuiChangeEvent } from '../events.js';
import { listWorlds } from './utils.js';

/**
 * Picks the world the calls of a `GreyCat` instance run in: `main`, then every world the
 * caller may use. Choosing one sets `greycat.world` and dispatches a `gui-change` with its
 * name. Call `reload()` once worlds were created or removed.
 */
export class GuiWorldSelect extends SlSelect {
  static override styles = [SlSelect.styles as CSSStyleSheet, GuiElement.BASE_STYLE];

  /** The instance whose world this selects. Defaults to `gc.$.default`. */
  greycat: gc.sdk.GreyCat = gc.$.default;

  constructor() {
    super();

    this.placeholder = 'Select a world';
    this.addEventListener('sl-change', (ev) => {
      ev.stopPropagation();
      const world = this.value as string;
      this.greycat.world = world === 'main' ? undefined : world;
      this.dispatchEvent(new GuiChangeEvent(world));
    });
  }

  override connectedCallback(): void {
    super.connectedCallback();
    this.reload();
  }

  async reload(): Promise<void> {
    let worlds: gc.runtime.WorldInfo[];
    try {
      worlds = await listWorlds(this.greycat);
    } catch (err) {
      toast.error(err);
      return;
    }
    const options = document.createDocumentFragment();
    options.appendChild(<sl-option value="main">main</sl-option>);
    for (let i = 0; i < worlds.length; i++) {
      const world = worlds[i];
      options.appendChild(
        <sl-option value={world.name}>
          {world.name}
          <small slot="suffix">{world.mode.key}</small>
        </sl-option>,
      );
    }
    this.replaceChildren(options);
    this.value = this.greycat.world ?? 'main';
  }
}

declare global {
  interface HTMLElementTagNameMap {
    /** @see {@link GuiWorldSelect} */
    'gui-world-select': GuiWorldSelect;
  }

  interface GuiWorldSelectEventMap extends Omit<SlSelectEventMap, 'sl-change'> {
    [GuiChangeEvent.NAME]: GuiChangeEvent<string>;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** @see {@link GuiWorldSelect} */
        'gui-world-select': GreyCat.Element<GuiWorldSelect, GuiWorldSelectEventMap>;
      }
    }
  }
}
