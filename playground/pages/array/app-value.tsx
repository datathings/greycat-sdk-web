import { GuiValue, GuiValueProps, stringify } from '@greycat/web';

function isLinkifiable(value: unknown): boolean {
  return gc.sdk.isNode(value) || !gc.sdk.isScalar(value);
}

class AppValue extends GuiValue {
  static override styles = GuiValue.styles;

  override setAttrs(attrs: Partial<GuiValueProps>): void {
    attrs.linkify = isLinkifiable;

    const value = attrs.value;
    if (attrs.text === undefined) {
      if (
        value instanceof gc.core.node ||
        value instanceof gc.core.nodeIndex ||
        value instanceof gc.core.nodeTime ||
        value instanceof gc.core.nodeList ||
        value instanceof gc.core.nodeGeo
      ) {
        attrs.text = value.toString();
      } else if (value instanceof Map) {
        attrs.text = `Map { size: ${value.size} }`;
      } else if (value instanceof gc.sdk.GCEnum) {
        attrs.text = stringify({ value });
      } else if (value instanceof gc.sdk.GCObject && !value.$type.is_native) {
        if (value.$type.attrs.length >= 5) {
          attrs.text = `${value.$type.name} { ${value.$type.attrs
            .slice(0, 4)
            .map((a) => a.name)
            .join(', ')}, ... }`;
        } else {
          attrs.text = `${value.$type.name} { ${value.$type.attrs.map((a) => a.name).join(', ')} }`;
        }
      } else if (Array.isArray(value)) {
        if (value.length >= 5) {
          attrs.text = `Array(size: ${value.length})`;
        }
      } else {
        attrs.text = '';
      }
    }
    super.setAttrs(attrs);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-value': AppValue;
  }

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        'app-value': GreyCat.Element<AppValue>;
      }
    }
  }
}

customElements.define('app-value', AppValue);
