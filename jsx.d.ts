declare type Signal<T> = SignalReader<T> & SignalWriter<T>;
declare type SignalReader<T> = () => T;
declare type SignalWriter<T> = {
  set: (newValue: T) => void;
  update: (updater: (currValue: T) => T) => void;
};

declare namespace GreyCat {
  type ElementProperties = {
    className?: string | string[] | { [className: string]: boolean | SignalReader<boolean> };
    style?: Partial<CSSStyleDeclaration> | string;
  };

  type Element<T, EventMap = {}> = Partial<Omit<T, 'children' | 'style' | 'className'>> & ElementProperties & {
    [EVENT in keyof EventMap as `on${EVENT}`]?: (
      this: GlobalEventHandlers,
      ev: EventMap[EVENT],
      options?: boolean | AddEventListenerOptions,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ) => any;
  };
}

declare namespace JSX {
  type IntrinsicElement = IntrinsicElements[keyof IntrinsicElements];

  interface Element extends Node { }

  interface IntrinsicElements {
    // HTML
    a: GreyCat.Element<HTMLAnchorElement>;
    abbr: GreyCat.Element<HTMLElement>;
    address: GreyCat.Element<HTMLElement>;
    area: GreyCat.Element<HTMLAreaElement>;
    article: GreyCat.Element<HTMLElement>;
    aside: GreyCat.Element<HTMLElement>;
    audio: GreyCat.Element<HTMLAudioElement>;
    b: GreyCat.Element<HTMLElement>;
    base: GreyCat.Element<HTMLBaseElement>;
    bdi: GreyCat.Element<HTMLElement>;
    bdo: GreyCat.Element<HTMLElement>;
    big: GreyCat.Element<HTMLElement>;
    blockquote: GreyCat.Element<HTMLQuoteElement>;
    body: GreyCat.Element<HTMLBodyElement>;
    br: GreyCat.Element<HTMLBRElement>;
    button: GreyCat.Element<HTMLButtonElement>;
    canvas: GreyCat.Element<HTMLCanvasElement>;
    caption: GreyCat.Element<HTMLElement>;
    center: GreyCat.Element<HTMLElement>;
    cite: GreyCat.Element<HTMLElement>;
    code: GreyCat.Element<HTMLElement>;
    col: GreyCat.Element<HTMLTableColElement>;
    colgroup: GreyCat.Element<HTMLTableColElement>;
    data: GreyCat.Element<HTMLDataElement>;
    datalist: GreyCat.Element<HTMLDataListElement>;
    dd: GreyCat.Element<HTMLElement>;
    del: GreyCat.Element<HTMLModElement>;
    details: GreyCat.Element<HTMLDetailsElement>;
    dfn: GreyCat.Element<HTMLElement>;
    dialog: GreyCat.Element<HTMLDialogElement>;
    div: GreyCat.Element<HTMLDivElement>;
    dl: GreyCat.Element<HTMLDListElement>;
    dt: GreyCat.Element<HTMLElement>;
    em: GreyCat.Element<HTMLElement>;
    embed: GreyCat.Element<HTMLEmbedElement>;
    fieldset: GreyCat.Element<HTMLFieldSetElement>;
    figcaption: GreyCat.Element<HTMLElement>;
    figure: GreyCat.Element<HTMLElement>;
    footer: GreyCat.Element<HTMLElement>;
    form: GreyCat.Element<HTMLFormElement>;
    h1: GreyCat.Element<HTMLHeadingElement>;
    h2: GreyCat.Element<HTMLHeadingElement>;
    h3: GreyCat.Element<HTMLHeadingElement>;
    h4: GreyCat.Element<HTMLHeadingElement>;
    h5: GreyCat.Element<HTMLHeadingElement>;
    h6: GreyCat.Element<HTMLHeadingElement>;
    head: GreyCat.Element<HTMLHeadElement>;
    header: GreyCat.Element<HTMLElement>;
    hgroup: GreyCat.Element<HTMLElement>;
    hr: GreyCat.Element<HTMLHRElement>;
    html: GreyCat.Element<HTMLHtmlElement>;
    i: GreyCat.Element<HTMLElement>;
    iframe: GreyCat.Element<HTMLIFrameElement>;
    img: GreyCat.Element<HTMLImageElement>;
    input: GreyCat.Element<HTMLInputElement> & {
      '$:value'?: Signal<string>;
      '$:valueAsNumber'?: Signal<number>;
      '$:valueAsDate'?: Signal<Date>;
    };
    ins: GreyCat.Element<HTMLModElement>;
    kbd: GreyCat.Element<HTMLElement>;
    keygen: GreyCat.Element<HTMLElement>;
    label: GreyCat.Element<HTMLLabelElement>;
    legend: GreyCat.Element<HTMLLegendElement>;
    li: GreyCat.Element<HTMLLIElement>;
    link: GreyCat.Element<HTMLLinkElement>;
    main: GreyCat.Element<HTMLElement>;
    map: GreyCat.Element<HTMLMapElement>;
    mark: GreyCat.Element<HTMLElement>;
    menu: GreyCat.Element<HTMLElement>;
    menuitem: GreyCat.Element<HTMLElement>;
    meta: GreyCat.Element<HTMLMetaElement>;
    meter: GreyCat.Element<HTMLMeterElement>;
    nav: GreyCat.Element<HTMLElement>;
    noindex: GreyCat.Element<HTMLElement>;
    noscript: GreyCat.Element<HTMLElement>;
    object: GreyCat.Element<HTMLObjectElement>;
    ol: GreyCat.Element<HTMLOListElement>;
    optgroup: GreyCat.Element<HTMLOptGroupElement>;
    option: GreyCat.Element<HTMLOptionElement>;
    output: GreyCat.Element<HTMLOutputElement>;
    p: GreyCat.Element<HTMLParagraphElement>;
    param: GreyCat.Element<HTMLParamElement>;
    picture: GreyCat.Element<HTMLElement>;
    pre: GreyCat.Element<HTMLPreElement>;
    progress: GreyCat.Element<HTMLProgressElement>;
    q: GreyCat.Element<HTMLQuoteElement>;
    rp: GreyCat.Element<HTMLElement>;
    rt: GreyCat.Element<HTMLElement>;
    ruby: GreyCat.Element<HTMLElement>;
    s: GreyCat.Element<HTMLElement>;
    samp: GreyCat.Element<HTMLElement>;
    search: GreyCat.Element<HTMLElement>;
    slot: GreyCat.Element<HTMLSlotElement>;
    script: GreyCat.Element<HTMLScriptElement>;
    section: GreyCat.Element<HTMLElement>;
    select: GreyCat.Element<HTMLSelectElement>;
    small: GreyCat.Element<HTMLElement>;
    source: GreyCat.Element<HTMLSourceElement>;
    span: GreyCat.Element<HTMLSpanElement>;
    strong: GreyCat.Element<HTMLElement>;
    style: GreyCat.Element<HTMLStyleElement>;
    sub: GreyCat.Element<HTMLElement>;
    summary: GreyCat.Element<HTMLElement>;
    sup: GreyCat.Element<HTMLElement>;
    table: GreyCat.Element<HTMLTableElement>;
    template: GreyCat.Element<HTMLTemplateElement>;
    tbody: GreyCat.Element<HTMLTableSectionElement>;
    td: GreyCat.Element<HTMLTableCellElement>;
    textarea: GreyCat.Element<HTMLTextAreaElement>;
    tfoot: GreyCat.Element<HTMLTableSectionElement>;
    th: GreyCat.Element<HTMLTableCellElement>;
    thead: GreyCat.Element<HTMLTableSectionElement>;
    time: GreyCat.Element<HTMLTimeElement>;
    title: GreyCat.Element<HTMLTitleElement>;
    tr: GreyCat.Element<HTMLTableRowElement>;
    track: GreyCat.Element<HTMLTrackElement>;
    u: GreyCat.Element<HTMLElement>;
    ul: GreyCat.Element<HTMLUListElement>;
    var: GreyCat.Element<HTMLElement>;
    video: GreyCat.Element<HTMLVideoElement>;
    wbr: GreyCat.Element<HTMLElement>;
    webview: GreyCat.Element<HTMLElement>;

    // SVG
    svg: GreyCat.Element<SVGSVGElement>;

    animate: GreyCat.Element<SVGElement>; // TODO: It is SVGAnimateElement but is not in TypeScript's lib.dom.d.ts for now.
    animateMotion: GreyCat.Element<SVGElement>;
    animateTransform: GreyCat.Element<SVGElement>; // TODO: It is SVGAnimateTransformElement but is not in TypeScript's lib.dom.d.ts for now.
    circle: GreyCat.Element<SVGCircleElement>;
    clipPath: GreyCat.Element<SVGClipPathElement>;
    defs: GreyCat.Element<SVGDefsElement>;
    desc: GreyCat.Element<SVGDescElement>;
    ellipse: GreyCat.Element<SVGEllipseElement>;
    feBlend: GreyCat.Element<SVGFEBlendElement>;
    feColorMatrix: GreyCat.Element<SVGFEColorMatrixElement>;
    feComponentTransfer: GreyCat.Element<SVGFEComponentTransferElement>;
    feComposite: GreyCat.Element<SVGFECompositeElement>;
    feConvolveMatrix: GreyCat.Element<SVGFEConvolveMatrixElement>;
    feDiffuseLighting: GreyCat.Element<SVGFEDiffuseLightingElement>;
    feDisplacementMap: GreyCat.Element<SVGFEDisplacementMapElement>;
    feDistantLight: GreyCat.Element<SVGFEDistantLightElement>;
    feDropShadow: GreyCat.Element<SVGFEDropShadowElement>;
    feFlood: GreyCat.Element<SVGFEFloodElement>;
    feFuncA: GreyCat.Element<SVGFEFuncAElement>;
    feFuncB: GreyCat.Element<SVGFEFuncBElement>;
    feFuncG: GreyCat.Element<SVGFEFuncGElement>;
    feFuncR: GreyCat.Element<SVGFEFuncRElement>;
    feGaussianBlur: GreyCat.Element<SVGFEGaussianBlurElement>;
    feImage: GreyCat.Element<SVGFEImageElement>;
    feMerge: GreyCat.Element<SVGFEMergeElement>;
    feMergeNode: GreyCat.Element<SVGFEMergeNodeElement>;
    feMorphology: GreyCat.Element<SVGFEMorphologyElement>;
    feOffset: GreyCat.Element<SVGFEOffsetElement>;
    fePointLight: GreyCat.Element<SVGFEPointLightElement>;
    feSpecularLighting: GreyCat.Element<SVGFESpecularLightingElement>;
    feSpotLight: GreyCat.Element<SVGFESpotLightElement>;
    feTile: GreyCat.Element<SVGFETileElement>;
    feTurbulence: GreyCat.Element<SVGFETurbulenceElement>;
    filter: GreyCat.Element<SVGFilterElement>;
    foreignObject: GreyCat.Element<SVGForeignObjectElement>;
    g: GreyCat.Element<SVGGElement>;
    image: GreyCat.Element<SVGImageElement>;
    line: GreyCat.Element<SVGLineElement>;
    linearGradient: GreyCat.Element<SVGLinearGradientElement>;
    marker: GreyCat.Element<SVGMarkerElement>;
    mask: GreyCat.Element<SVGMaskElement>;
    metadata: GreyCat.Element<SVGMetadataElement>;
    mpath: GreyCat.Element<SVGElement>;
    path: GreyCat.Element<SVGPathElement>;
    pattern: GreyCat.Element<SVGPatternElement>;
    polygon: GreyCat.Element<SVGPolygonElement>;
    polyline: GreyCat.Element<SVGPolylineElement>;
    radialGradient: GreyCat.Element<SVGRadialGradientElement>;
    rect: GreyCat.Element<SVGRectElement>;
    stop: GreyCat.Element<SVGStopElement>;
    switch: GreyCat.Element<SVGSwitchElement>;
    symbol: GreyCat.Element<SVGSymbolElement>;
    text: GreyCat.Element<SVGTextElement>;
    textPath: GreyCat.Element<SVGTextPathElement>;
    tspan: GreyCat.Element<SVGTSpanElement>;
    use: GreyCat.Element<SVGUseElement>;
    view: GreyCat.Element<SVGViewElement>;
  }
}
