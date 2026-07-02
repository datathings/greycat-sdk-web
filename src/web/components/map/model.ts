import { GuiElement } from '../element.js';

export abstract class GuiMapElement extends GuiElement {
  onLoad(_map: maplibregl.Map): void {
    /*noop*/
  }
}
