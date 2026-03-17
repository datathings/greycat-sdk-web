declare module 'dockview-core' {
  declare class TransferObject {}
  declare class PanelTransfer extends TransferObject {
    readonly viewId: string;
    readonly groupId: string;
    readonly panelId: string | null;
    constructor(viewId: string, groupId: string, panelId: string | null);
  }
  declare class PaneTransfer extends TransferObject {
    readonly viewId: string;
    readonly paneId: string;
    constructor(viewId: string, paneId: string);
  }
  declare function getPanelData(): PanelTransfer | undefined;
  declare function getPaneData(): PaneTransfer | undefined;

  interface IDisposable {
    dispose(): void;
  }
  interface IValueDisposable<T> {
    readonly value: T;
    readonly disposable: IDisposable;
  }
  declare namespace Disposable {
    const NONE: IDisposable;
    function from(func: () => void): IDisposable;
  }
  declare class CompositeDisposable {
    private _disposables;
    private _isDisposed;
    get isDisposed(): boolean;
    constructor(...args: IDisposable[]);
    addDisposables(...args: IDisposable[]): void;
    dispose(): void;
  }
  declare class MutableDisposable implements IDisposable {
    private _disposable;
    set value(disposable: IDisposable);
    dispose(): void;
  }

  interface EmitterOptions {
    readonly replay?: boolean;
  }
  interface Event<T> {
    (listener: (e: T) => any): IDisposable;
  }
  declare namespace Event {
    const any: <T>(...children: Event<T>[]) => Event<T>;
  }
  interface IDockviewEvent {
    readonly defaultPrevented: boolean;
    preventDefault(): void;
  }
  declare class DockviewEvent implements IDockviewEvent {
    private _defaultPrevented;
    get defaultPrevented(): boolean;
    preventDefault(): void;
  }
  interface IAcceptableEvent {
    readonly isAccepted: boolean;
    accept(): void;
  }
  declare class AcceptableEvent implements IAcceptableEvent {
    private _isAccepted;
    get isAccepted(): boolean;
    accept(): void;
  }
  declare class LeakageMonitor {
    readonly events: Map<Event<any>, Stacktrace>;
    get size(): number;
    add<T>(event: Event<T>, stacktrace: Stacktrace): void;
    delete<T>(event: Event<T>): void;
    clear(): void;
  }
  declare class Stacktrace {
    readonly value: string;
    static create(): Stacktrace;
    private constructor();
    print(): void;
  }
  declare class Emitter<T> implements IDisposable {
    private readonly options?;
    private _event?;
    private _last?;
    private _listeners;
    private _disposed;
    static ENABLE_TRACKING: boolean;
    static readonly MEMORY_LEAK_WATCHER: LeakageMonitor;
    static setLeakageMonitorEnabled(isEnabled: boolean): void;
    get value(): T | undefined;
    constructor(options?: EmitterOptions | undefined);
    get event(): Event<T>;
    fire(e: T): void;
    dispose(): void;
  }
  /**
   *
   * Event Emitter that fires events from a Microtask callback, only one event will fire per event-loop cycle.
   *
   * It's kind of like using an `asapScheduler` in RxJs with additional logic to only fire once per event-loop cycle.
   * This implementation exists to avoid external dependencies.
   *
   * @see https://developer.mozilla.org/en-US/docs/Web/API/queueMicrotask
   * @see https://rxjs.dev/api/index/const/asapScheduler
   */
  declare class AsapEvent implements IDisposable {
    private readonly _onFired;
    private _currentFireCount;
    private _queued;
    readonly onEvent: Event<void>;
    fire(): void;
    dispose(): void;
  }

  declare enum Orientation {
    HORIZONTAL = 'HORIZONTAL',
    VERTICAL = 'VERTICAL',
  }
  declare enum SashState {
    MAXIMUM = 0,
    MINIMUM = 1,
    DISABLED = 2,
    ENABLED = 3,
  }
  interface ISplitviewStyles {
    separatorBorder: string;
  }
  interface SplitViewOptions {
    orientation?: Orientation;
    descriptor?: ISplitViewDescriptor;
    proportionalLayout?: boolean;
    styles?: ISplitviewStyles;
    margin?: number;
  }
  declare enum LayoutPriority {
    Low = 'low', // view is offered space last
    High = 'high', // view is offered space first
    Normal = 'normal',
  }
  interface IBaseView extends IDisposable {
    minimumSize: number;
    maximumSize: number;
    snap?: boolean;
    priority?: LayoutPriority;
  }
  interface IView extends IBaseView {
    readonly element: HTMLElement | DocumentFragment;
    readonly onDidChange: Event<{
      size?: number;
      orthogonalSize?: number;
    }>;
    layout(size: number, orthogonalSize: number): void;
    setVisible(visible: boolean): void;
  }
  type DistributeSizing = {
    type: 'distribute';
  };
  type SplitSizing = {
    type: 'split';
    index: number;
  };
  type InvisibleSizing = {
    type: 'invisible';
    cachedVisibleSize: number;
  };
  type Sizing = DistributeSizing | SplitSizing | InvisibleSizing;
  declare namespace Sizing {
    const Distribute: DistributeSizing;
    function Split(index: number): SplitSizing;
    function Invisible(cachedVisibleSize: number): InvisibleSizing;
  }
  interface ISplitViewDescriptor {
    size: number;
    views: {
      visible?: boolean;
      size: number;
      view: IView;
    }[];
  }
  declare class Splitview {
    private readonly container;
    private readonly element;
    private readonly viewContainer;
    private readonly sashContainer;
    private readonly viewItems;
    private readonly sashes;
    private _orientation;
    private _size;
    private _orthogonalSize;
    private _contentSize;
    private _proportions;
    private readonly proportionalLayout;
    private _startSnappingEnabled;
    private _endSnappingEnabled;
    private _disabled;
    private _margin;
    private readonly _onDidSashEnd;
    readonly onDidSashEnd: Event<void>;
    private readonly _onDidAddView;
    readonly onDidAddView: Event<IView>;
    private readonly _onDidRemoveView;
    readonly onDidRemoveView: Event<IView>;
    get contentSize(): number;
    get size(): number;
    set size(value: number);
    get orthogonalSize(): number;
    set orthogonalSize(value: number);
    get length(): number;
    get proportions(): (number | undefined)[] | undefined;
    get orientation(): Orientation;
    set orientation(value: Orientation);
    get minimumSize(): number;
    get maximumSize(): number;
    get startSnappingEnabled(): boolean;
    set startSnappingEnabled(startSnappingEnabled: boolean);
    get endSnappingEnabled(): boolean;
    set endSnappingEnabled(endSnappingEnabled: boolean);
    get disabled(): boolean;
    set disabled(value: boolean);
    get margin(): number;
    set margin(value: number);
    constructor(container: HTMLElement, options: SplitViewOptions);
    style(styles?: ISplitviewStyles): void;
    isViewVisible(index: number): boolean;
    setViewVisible(index: number, visible: boolean): void;
    getViewSize(index: number): number;
    resizeView(index: number, size: number): void;
    getViews<T extends IView>(): T[];
    private onDidChange;
    addView(view: IView, size?: number | Sizing, index?: number, skipLayout?: boolean): void;
    distributeViewSizes(): void;
    removeView(index: number, sizing?: Sizing, skipLayout?: boolean): IView;
    getViewCachedVisibleSize(index: number): number | undefined;
    moveView(from: number, to: number): void;
    layout(size: number, orthogonalSize: number): void;
    private relayout;
    private distributeEmptySpace;
    private saveProportions;
    /**
     * Margin explain:
     *
     * For `n` views in a splitview there will be `n-1` margins `m`.
     *
     * To fit the margins each view must reduce in size by `(m * (n - 1)) / n`.
     *
     * For each view `i` the offet must be adjusted by `m * i/(n - 1)`.
     */
    private layoutViews;
    private findFirstSnapIndex;
    private updateSashEnablement;
    private updateSash;
    private resize;
    private createViewContainer;
    private createSashContainer;
    private createContainer;
    dispose(): void;
  }

  /**
   * A key-value object of anything that is a valid JavaScript Object.
   */
  interface Parameters {
    [key: string]: any;
  }
  interface PanelInitParameters {
    params: Parameters;
  }
  interface PanelUpdateEvent<T extends Parameters = Parameters> {
    params: Partial<T>;
  }
  interface IPanel extends IDisposable {
    readonly id: string;
    init(params: PanelInitParameters): void;
    layout(width: number, height: number): void;
    update(event: PanelUpdateEvent<Parameters>): void;
    toJSON(): object;
    focus(): void;
  }
  interface IFrameworkPart extends IDisposable {
    update(params: Parameters): void;
  }
  interface BaseComponentOptions<T extends object = Parameters> {
    id: string;
    component: string;
    params?: T;
    snap?: boolean;
    priority?: LayoutPriority;
    size?: number;
  }

  interface FocusEvent {
    readonly isFocused: boolean;
  }
  interface PanelDimensionChangeEvent {
    readonly width: number;
    readonly height: number;
  }
  interface VisibilityEvent {
    readonly isVisible: boolean;
  }
  interface ActiveEvent {
    readonly isActive: boolean;
  }
  interface PanelApi {
    readonly onDidDimensionsChange: Event<PanelDimensionChangeEvent>;
    readonly onDidFocusChange: Event<FocusEvent>;
    readonly onDidVisibilityChange: Event<VisibilityEvent>;
    readonly onDidActiveChange: Event<ActiveEvent>;
    readonly onDidParametersChange: Event<Parameters>;
    setActive(): void;
    setVisible(isVisible: boolean): void;
    updateParameters(parameters: Parameters): void;
    /**
     * The id of the component renderer
     */
    readonly component: string;
    /**
     * The id of the panel that would have been assigned when the panel was created
     */
    readonly id: string;
    /**
     * Whether the panel holds the current focus
     */
    readonly isFocused: boolean;
    /**
     * Whether the panel is the actively selected panel
     */
    readonly isActive: boolean;
    /**
     * Whether the panel is visible
     */
    readonly isVisible: boolean;
    /**
     * The panel width in pixels
     */
    readonly width: number;
    /**
     * The panel height in pixels
     */
    readonly height: number;
    readonly onWillFocus: Event<WillFocusEvent>;
    getParameters<T extends Parameters = Parameters>(): T;
  }
  declare class WillFocusEvent extends DockviewEvent {
    constructor();
  }
  /**
   * A core api implementation that should be used across all panel-like objects
   */
  declare class PanelApiImpl extends CompositeDisposable implements PanelApi {
    readonly id: string;
    readonly component: string;
    private _isFocused;
    private _isActive;
    private _isVisible;
    private _width;
    private _height;
    private _parameters;
    private readonly panelUpdatesDisposable;
    readonly _onDidDimensionChange: Emitter<PanelDimensionChangeEvent>;
    readonly onDidDimensionsChange: Event<PanelDimensionChangeEvent>;
    readonly _onDidChangeFocus: Emitter<FocusEvent>;
    readonly onDidFocusChange: Event<FocusEvent>;
    readonly _onWillFocus: Emitter<WillFocusEvent>;
    readonly onWillFocus: Event<WillFocusEvent>;
    readonly _onDidVisibilityChange: Emitter<VisibilityEvent>;
    readonly onDidVisibilityChange: Event<VisibilityEvent>;
    readonly _onWillVisibilityChange: Emitter<VisibilityEvent>;
    readonly onWillVisibilityChange: Event<VisibilityEvent>;
    readonly _onDidActiveChange: Emitter<ActiveEvent>;
    readonly onDidActiveChange: Event<ActiveEvent>;
    readonly _onActiveChange: Emitter<void>;
    readonly onActiveChange: Event<void>;
    readonly _onDidParametersChange: Emitter<Parameters>;
    readonly onDidParametersChange: Event<Parameters>;
    get isFocused(): boolean;
    get isActive(): boolean;
    get isVisible(): boolean;
    get width(): number;
    get height(): number;
    constructor(id: string, component: string);
    getParameters<T extends Parameters = Parameters>(): T;
    initialize(panel: IPanel): void;
    setVisible(isVisible: boolean): void;
    setActive(): void;
    updateParameters(parameters: Parameters): void;
  }

  interface BasePanelViewState {
    readonly id: string;
    readonly component: string;
    readonly params?: Parameters;
  }
  interface BasePanelViewExported<T extends PanelApi> {
    readonly id: string;
    readonly api: T;
    readonly width: number;
    readonly height: number;
    readonly params: Parameters | undefined;
    focus(): void;
    toJSON(): object;
    update(event: PanelUpdateEvent): void;
  }
  declare abstract class BasePanelView<T extends PanelApiImpl>
    extends CompositeDisposable
    implements IPanel, BasePanelViewExported<T>
  {
    readonly id: string;
    protected readonly component: string;
    readonly api: T;
    private _height;
    private _width;
    private readonly _element;
    protected part?: IFrameworkPart;
    protected _params?: PanelInitParameters;
    protected abstract getComponent(): IFrameworkPart;
    get element(): HTMLElement;
    get width(): number;
    get height(): number;
    get params(): Parameters | undefined;
    constructor(id: string, component: string, api: T);
    focus(): void;
    layout(width: number, height: number): void;
    init(parameters: PanelInitParameters): void;
    update(event: PanelUpdateEvent): void;
    toJSON(): BasePanelViewState;
    dispose(): void;
  }

  type FunctionOrValue<T> = (() => T) | T;
  type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;
  interface Box {
    left: number;
    top: number;
    height: number;
    width: number;
  }
  type TopLeft = {
    top: number;
    left: number;
  };
  type TopRight = {
    top: number;
    right: number;
  };
  type BottomLeft = {
    bottom: number;
    left: number;
  };
  type BottomRight = {
    bottom: number;
    right: number;
  };
  type AnchorPosition = TopLeft | TopRight | BottomLeft | BottomRight;
  type Size = {
    width: number;
    height: number;
  };
  type AnchoredBox = Size & AnchorPosition;

  interface PanelConstraintChangeEvent2 {
    readonly minimumSize?: FunctionOrValue<number>;
    readonly maximumSize?: FunctionOrValue<number>;
  }
  interface PanelConstraintChangeEvent {
    readonly minimumSize?: number;
    readonly maximumSize?: number;
  }
  interface PanelSizeEvent {
    readonly size: number;
  }
  interface SplitviewPanelApi extends PanelApi {
    readonly onDidConstraintsChange: Event<PanelConstraintChangeEvent>;
    setConstraints(value: PanelConstraintChangeEvent2): void;
    setSize(event: PanelSizeEvent): void;
  }
  declare class SplitviewPanelApiImpl extends PanelApiImpl implements SplitviewPanelApi, IDisposable {
    readonly _onDidConstraintsChangeInternal: Emitter<PanelConstraintChangeEvent2>;
    readonly onDidConstraintsChangeInternal: Event<PanelConstraintChangeEvent2>;
    readonly _onDidConstraintsChange: Emitter<PanelConstraintChangeEvent>;
    readonly onDidConstraintsChange: Event<PanelConstraintChangeEvent>;
    readonly _onDidSizeChange: Emitter<PanelSizeEvent>;
    readonly onDidSizeChange: Event<PanelSizeEvent>;
    constructor(id: string, component: string);
    setConstraints(value: PanelConstraintChangeEvent2): void;
    setSize(event: PanelSizeEvent): void;
  }

  interface ISplitviewPanel extends BasePanelViewExported<SplitviewPanelApiImpl> {
    readonly priority: LayoutPriority | undefined;
    readonly minimumSize: number;
    readonly maximumSize: number;
    readonly snap: boolean;
    readonly orientation: Orientation;
  }
  declare abstract class SplitviewPanel extends BasePanelView<SplitviewPanelApiImpl> implements ISplitviewPanel {
    private _evaluatedMinimumSize;
    private _evaluatedMaximumSize;
    private _minimumSize;
    private _maximumSize;
    private _priority?;
    private _snap;
    private _orientation?;
    private readonly _onDidChange;
    readonly onDidChange: Event<{
      size?: number;
      orthogonalSize?: number;
    }>;
    get priority(): LayoutPriority | undefined;
    set orientation(value: Orientation);
    get orientation(): Orientation;
    get minimumSize(): number;
    get maximumSize(): number;
    get snap(): boolean;
    constructor(id: string, componentName: string);
    setVisible(isVisible: boolean): void;
    setActive(isActive: boolean): void;
    layout(size: number, orthogonalSize: number): void;
    init(parameters: PanelViewInitParameters): void;
    toJSON(): {
      minimumSize: number | undefined;
      maximumSize: number | undefined;
      id: string;
      component: string;
      params?: Parameters | undefined;
    };
    private updateConstraints;
  }

  declare abstract class Resizable extends CompositeDisposable {
    private readonly _element;
    private _disableResizing;
    get element(): HTMLElement;
    get disableResizing(): boolean;
    set disableResizing(value: boolean);
    constructor(parentElement: HTMLElement, disableResizing?: boolean);
    abstract layout(width: number, height: number): void;
  }

  interface SerializedSplitviewPanelData {
    id: string;
    component: string;
    minimumSize?: number;
    maximumSize?: number;
    params?: {
      [index: string]: any;
    };
  }
  interface SerializedSplitviewPanel {
    snap?: boolean;
    priority?: LayoutPriority;
    data: SerializedSplitviewPanelData;
    size: number;
  }
  interface SerializedSplitview {
    orientation: Orientation;
    size: number;
    activeView?: string;
    views: SerializedSplitviewPanel[];
  }
  interface AddSplitviewComponentOptions<T extends Parameters = Parameters> extends BaseComponentOptions<T> {
    index?: number;
    minimumSize?: number;
    maximumSize?: number;
  }
  interface ISplitviewComponent extends IDisposable {
    readonly minimumSize: number;
    readonly maximumSize: number;
    readonly height: number;
    readonly width: number;
    readonly length: number;
    readonly orientation: Orientation;
    readonly onDidAddView: Event<IView>;
    readonly onDidRemoveView: Event<IView>;
    readonly onDidLayoutFromJSON: Event<void>;
    readonly panels: SplitviewPanel[];
    updateOptions(options: Partial<SplitViewOptions>): void;
    addPanel<T extends object = Parameters>(options: AddSplitviewComponentOptions<T>): ISplitviewPanel;
    layout(width: number, height: number): void;
    onDidLayoutChange: Event<void>;
    toJSON(): SerializedSplitview;
    fromJSON(serializedSplitview: SerializedSplitview): void;
    focus(): void;
    getPanel(id: string): ISplitviewPanel | undefined;
    removePanel(panel: ISplitviewPanel, sizing?: Sizing): void;
    setVisible(panel: ISplitviewPanel, visible: boolean): void;
    movePanel(from: number, to: number): void;
    clear(): void;
  }
  /**
   * A high-level implementation of splitview that works using 'panels'
   */
  declare class SplitviewComponent extends Resizable implements ISplitviewComponent {
    private readonly _splitviewChangeDisposable;
    private _splitview;
    private _activePanel;
    private readonly _panels;
    private _options;
    private readonly _onDidLayoutfromJSON;
    readonly onDidLayoutFromJSON: Event<void>;
    private readonly _onDidAddView;
    readonly onDidAddView: Event<IView>;
    private readonly _onDidRemoveView;
    readonly onDidRemoveView: Event<IView>;
    private readonly _onDidLayoutChange;
    readonly onDidLayoutChange: Event<void>;
    private readonly _classNames;
    get panels(): SplitviewPanel[];
    get options(): SplitviewComponentOptions;
    get length(): number;
    get orientation(): Orientation;
    get splitview(): Splitview;
    set splitview(value: Splitview);
    get minimumSize(): number;
    get maximumSize(): number;
    get height(): number;
    get width(): number;
    constructor(container: HTMLElement, options: SplitviewComponentOptions);
    updateOptions(options: Partial<SplitviewComponentOptions>): void;
    focus(): void;
    movePanel(from: number, to: number): void;
    setVisible(panel: SplitviewPanel, visible: boolean): void;
    setActive(panel: SplitviewPanel, skipFocus?: boolean): void;
    removePanel(panel: SplitviewPanel, sizing?: Sizing): void;
    getPanel(id: string): SplitviewPanel | undefined;
    addPanel<T extends object = Parameters>(options: AddSplitviewComponentOptions<T>): SplitviewPanel;
    layout(width: number, height: number): void;
    private doAddView;
    toJSON(): SerializedSplitview;
    fromJSON(serializedSplitview: SerializedSplitview): void;
    clear(): void;
    dispose(): void;
  }

  declare class LeafNode implements IView {
    readonly view: IGridView;
    readonly orientation: Orientation;
    private readonly _onDidChange;
    readonly onDidChange: Event<{
      size?: number;
      orthogonalSize?: number;
    }>;
    private _size;
    private _orthogonalSize;
    private readonly _disposable;
    private get minimumWidth();
    private get maximumWidth();
    private get minimumHeight();
    private get maximumHeight();
    get priority(): LayoutPriority | undefined;
    get snap(): boolean | undefined;
    get minimumSize(): number;
    get maximumSize(): number;
    get minimumOrthogonalSize(): number;
    get maximumOrthogonalSize(): number;
    get orthogonalSize(): number;
    get size(): number;
    get element(): HTMLElement;
    get width(): number;
    get height(): number;
    constructor(view: IGridView, orientation: Orientation, orthogonalSize: number, size?: number);
    setVisible(visible: boolean): void;
    layout(size: number, orthogonalSize: number): void;
    dispose(): void;
  }

  declare class BranchNode extends CompositeDisposable implements IView {
    readonly orientation: Orientation;
    readonly proportionalLayout: boolean;
    readonly styles: ISplitviewStyles | undefined;
    readonly element: HTMLElement;
    private readonly splitview;
    private _orthogonalSize;
    private _size;
    private _childrenDisposable;
    readonly children: Node[];
    private readonly _onDidChange;
    readonly onDidChange: Event<{
      size?: number;
      orthogonalSize?: number;
    }>;
    private readonly _onDidVisibilityChange;
    readonly onDidVisibilityChange: Event<{
      visible: boolean;
    }>;
    get width(): number;
    get height(): number;
    get minimumSize(): number;
    get maximumSize(): number;
    get minimumOrthogonalSize(): number;
    get maximumOrthogonalSize(): number;
    get orthogonalSize(): number;
    get size(): number;
    get minimumWidth(): number;
    get minimumHeight(): number;
    get maximumWidth(): number;
    get maximumHeight(): number;
    get priority(): LayoutPriority;
    get disabled(): boolean;
    set disabled(value: boolean);
    get margin(): number;
    set margin(value: number);
    constructor(
      orientation: Orientation,
      proportionalLayout: boolean,
      styles: ISplitviewStyles | undefined,
      size: number,
      orthogonalSize: number,
      disabled: boolean,
      margin: number | undefined,
      childDescriptors?: INodeDescriptor[],
    );
    setVisible(_visible: boolean): void;
    isChildVisible(index: number): boolean;
    setChildVisible(index: number, visible: boolean): void;
    moveChild(from: number, to: number): void;
    getChildSize(index: number): number;
    resizeChild(index: number, size: number): void;
    layout(size: number, orthogonalSize: number): void;
    addChild(node: Node, size: number | Sizing, index: number, skipLayout?: boolean): void;
    getChildCachedVisibleSize(index: number): number | undefined;
    removeChild(index: number, sizing?: Sizing): Node;
    private _addChild;
    private _removeChild;
    private setupChildrenEvents;
    dispose(): void;
  }

  type Node = BranchNode | LeafNode;

  interface IDragAndDropObserverCallbacks {
    onDragEnter: (e: DragEvent) => void;
    onDragLeave: (e: DragEvent) => void;
    onDrop: (e: DragEvent) => void;
    onDragEnd: (e: DragEvent) => void;
    onDragOver?: (e: DragEvent) => void;
  }
  declare class DragAndDropObserver extends CompositeDisposable {
    private readonly element;
    private readonly callbacks;
    private target;
    constructor(element: HTMLElement, callbacks: IDragAndDropObserverCallbacks);
    onDragEnter(e: DragEvent): void;
    onDragOver(e: DragEvent): void;
    onDragLeave(e: DragEvent): void;
    onDragEnd(e: DragEvent): void;
    onDrop(e: DragEvent): void;
    private registerListeners;
  }

  type Direction = 'left' | 'right' | 'above' | 'below' | 'within';
  declare function toTarget(direction: Direction): Position;
  interface MaximizedChanged<T extends IGridPanelView> {
    panel: T;
    isMaximized: boolean;
  }
  interface BaseGridOptions {
    readonly proportionalLayout: boolean;
    readonly orientation: Orientation;
    readonly styles?: ISplitviewStyles;
    readonly disableAutoResizing?: boolean;
    readonly locked?: boolean;
    readonly margin?: number;
    readonly className?: string;
  }
  interface IGridPanelView extends IGridView, IPanel {
    setActive(isActive: boolean): void;
    readonly isActive: boolean;
  }
  interface IBaseGrid<T extends IGridPanelView> extends IDisposable {
    readonly element: HTMLElement;
    readonly id: string;
    readonly width: number;
    readonly height: number;
    readonly minimumHeight: number;
    readonly maximumHeight: number;
    readonly minimumWidth: number;
    readonly maximumWidth: number;
    readonly activeGroup: T | undefined;
    readonly size: number;
    readonly groups: T[];
    readonly onDidMaximizedChange: Event<MaximizedChanged<T>>;
    readonly onDidLayoutChange: Event<void>;
    getPanel(id: string): T | undefined;
    toJSON(): object;
    fromJSON(data: any): void;
    clear(): void;
    layout(width: number, height: number, force?: boolean): void;
    setVisible(panel: T, visible: boolean): void;
    isVisible(panel: T): boolean;
    maximizeGroup(panel: T): void;
    isMaximizedGroup(panel: T): boolean;
    exitMaximizedGroup(): void;
    hasMaximizedGroup(): boolean;
  }
  declare abstract class BaseGrid<T extends IGridPanelView> extends Resizable implements IBaseGrid<T> {
    private readonly _id;
    protected readonly _groups: Map<string, IValueDisposable<T>>;
    protected readonly gridview: Gridview;
    protected _activeGroup: T | undefined;
    private readonly _onDidRemove;
    readonly onDidRemove: Event<T>;
    private readonly _onDidAdd;
    readonly onDidAdd: Event<T>;
    private readonly _onDidMaximizedChange;
    readonly onDidMaximizedChange: Event<MaximizedChanged<T>>;
    private readonly _onDidActiveChange;
    readonly onDidActiveChange: Event<T | undefined>;
    protected readonly _bufferOnDidLayoutChange: AsapEvent;
    readonly onDidLayoutChange: Event<void>;
    private readonly _onDidViewVisibilityChangeMicroTaskQueue;
    readonly onDidViewVisibilityChangeMicroTaskQueue: Event<void>;
    private readonly _classNames;
    get id(): string;
    get size(): number;
    get groups(): T[];
    get width(): number;
    get height(): number;
    get minimumHeight(): number;
    get maximumHeight(): number;
    get minimumWidth(): number;
    get maximumWidth(): number;
    get activeGroup(): T | undefined;
    get locked(): boolean;
    set locked(value: boolean);
    constructor(container: HTMLElement, options: BaseGridOptions);
    abstract toJSON(): object;
    abstract fromJSON(data: any): void;
    abstract clear(): void;
    setVisible(panel: T, visible: boolean): void;
    isVisible(panel: T): boolean;
    updateOptions(options: Partial<BaseGridOptions>): void;
    maximizeGroup(panel: T): void;
    isMaximizedGroup(panel: T): boolean;
    exitMaximizedGroup(): void;
    hasMaximizedGroup(): boolean;
    protected doAddGroup(group: T, location?: number[], size?: number): void;
    protected doRemoveGroup(
      group: T,
      options?: {
        skipActive?: boolean;
        skipDispose?: boolean;
      },
    ): T;
    getPanel(id: string): T | undefined;
    doSetGroupActive(group: T | undefined): void;
    removeGroup(group: T): void;
    moveToNext(options?: MovementOptions2): void;
    moveToPrevious(options?: MovementOptions2): void;
    layout(width: number, height: number, forceResize?: boolean): void;
    dispose(): void;
  }

  interface DroptargetEvent {
    readonly position: Position;
    readonly nativeEvent: DragEvent;
  }
  declare class WillShowOverlayEvent extends DockviewEvent implements DroptargetEvent {
    private readonly options;
    get nativeEvent(): DragEvent;
    get position(): Position;
    constructor(options: { nativeEvent: DragEvent; position: Position });
  }
  declare function directionToPosition(direction: Direction): Position;
  declare function positionToDirection(position: Position): Direction;
  type Position = 'top' | 'bottom' | 'left' | 'right' | 'center';
  type CanDisplayOverlay = (dragEvent: DragEvent, state: Position) => boolean;
  type MeasuredValue = {
    value: number;
    type: 'pixels' | 'percentage';
  };
  type DroptargetOverlayModel = {
    size?: MeasuredValue;
    activationSize?: MeasuredValue;
  };
  interface DroptargetOptions {
    canDisplayOverlay: CanDisplayOverlay;
    acceptedTargetZones: Position[];
    overlayModel?: DroptargetOverlayModel;
  }
  declare class Droptarget extends CompositeDisposable {
    private readonly element;
    private readonly options;
    private targetElement;
    private overlayElement;
    private _state;
    private _acceptedTargetZonesSet;
    private readonly _onDrop;
    readonly onDrop: Event<DroptargetEvent>;
    private readonly _onWillShowOverlay;
    readonly onWillShowOverlay: Event<WillShowOverlayEvent>;
    readonly dnd: DragAndDropObserver;
    private static USED_EVENT_ID;
    get state(): Position | undefined;
    constructor(element: HTMLElement, options: DroptargetOptions);
    setTargetZones(acceptedTargetZones: Position[]): void;
    setOverlayModel(model: DroptargetOverlayModel): void;
    dispose(): void;
    /**
     * Add a property to the event object for other potential listeners to check
     */
    private markAsUsed;
    /**
     * Check is the event has already been used by another instance of DropTarget
     */
    private isAlreadyUsed;
    private toggleClasses;
    private calculateQuadrant;
    private removeDropTarget;
  }

  declare function indexInParent(element: HTMLElement): number;
  /**
   * Find the grid location of a specific DOM element by traversing the parent
   * chain and finding each child index on the way.
   *
   * This will break as soon as DOM structures of the Splitview or Gridview change.
   */
  declare function getGridLocation(element: HTMLElement): number[];
  declare function getRelativeLocation(rootOrientation: Orientation, location: number[], direction: Position): number[];
  declare function getDirectionOrientation(direction: Position): Orientation;
  declare function getLocationOrientation(rootOrientation: Orientation, location: number[]): Orientation;
  interface IViewSize {
    width?: number;
    height?: number;
  }
  interface IGridView {
    readonly onDidChange: Event<IViewSize | undefined>;
    readonly element: HTMLElement;
    readonly minimumWidth: number;
    readonly maximumWidth: number;
    readonly minimumHeight: number;
    readonly maximumHeight: number;
    readonly isVisible: boolean;
    priority?: LayoutPriority;
    layout(width: number, height: number): void;
    toJSON(): object;
    fromJSON?(json: object): void;
    snap?: boolean;
    setVisible?(visible: boolean): void;
  }
  declare const orthogonal: (orientation: Orientation) => Orientation;
  interface GridLeafNode<T extends IGridView> {
    readonly view: T;
    readonly cachedVisibleSize: number | undefined;
    readonly box: {
      width: number;
      height: number;
    };
  }
  interface GridBranchNode<T extends IGridView> {
    readonly children: GridNode<T>[];
    readonly box: {
      width: number;
      height: number;
    };
  }
  type GridNode<T extends IGridView> = GridLeafNode<T> | GridBranchNode<T>;
  declare function isGridBranchNode<T extends IGridView>(node: GridNode<T>): node is GridBranchNode<T>;
  interface SerializedGridObject<T> {
    type: 'leaf' | 'branch';
    data: T | SerializedGridObject<T>[];
    size?: number;
    visible?: boolean;
  }
  interface ISerializedLeafNode<T = any> {
    type: 'leaf';
    data: T;
    size: number;
    visible?: boolean;
  }
  interface ISerializedBranchNode {
    type: 'branch';
    data: ISerializedNode[];
    size: number;
  }
  type ISerializedNode = ISerializedLeafNode | ISerializedBranchNode;
  interface INodeDescriptor {
    node: Node;
    visible?: boolean;
  }
  interface IViewDeserializer {
    fromJSON: (data: ISerializedLeafNode) => IGridView;
  }
  interface SerializedNodeDescriptor {
    location: number[];
  }
  interface SerializedGridview<T> {
    root: SerializedGridObject<T>;
    width: number;
    height: number;
    orientation: Orientation;
    maximizedNode?: SerializedNodeDescriptor;
  }
  interface MaximizedViewChanged {
    view: IGridView;
    isMaximized: boolean;
  }
  declare class Gridview implements IDisposable {
    readonly proportionalLayout: boolean;
    readonly styles: ISplitviewStyles | undefined;
    readonly element: HTMLElement;
    private _root;
    private _locked;
    private _margin;
    private _maximizedNode;
    private readonly disposable;
    private readonly _onDidChange;
    readonly onDidChange: Event<{
      size?: number;
      orthogonalSize?: number;
    }>;
    private readonly _onDidViewVisibilityChange;
    readonly onDidViewVisibilityChange: Event<void>;
    private readonly _onDidMaximizedNodeChange;
    readonly onDidMaximizedNodeChange: Event<MaximizedViewChanged>;
    get length(): number;
    get orientation(): Orientation;
    set orientation(orientation: Orientation);
    get width(): number;
    get height(): number;
    get minimumWidth(): number;
    get minimumHeight(): number;
    get maximumWidth(): number;
    get maximumHeight(): number;
    get locked(): boolean;
    set locked(value: boolean);
    get margin(): number;
    set margin(value: number);
    maximizedView(): IGridView | undefined;
    hasMaximizedView(): boolean;
    maximizeView(view: IGridView): void;
    exitMaximizedView(): void;
    serialize(): SerializedGridview<any>;
    dispose(): void;
    clear(): void;
    deserialize<T>(json: SerializedGridview<T>, deserializer: IViewDeserializer): void;
    private _deserialize;
    private _deserializeNode;
    private get root();
    private set root(value);
    /**
     * If the root is orientated as a VERTICAL node then nest the existing root within a new HORIZIONTAL root node
     * If the root is orientated as a HORIZONTAL node then nest the existing root within a new VERITCAL root node
     */
    insertOrthogonalSplitviewAtRoot(): void;
    next(location: number[]): LeafNode;
    previous(location: number[]): LeafNode;
    getView(): GridBranchNode<IGridView>;
    getView(location?: number[]): GridNode<IGridView>;
    private _getViews;
    private progmaticSelect;
    constructor(
      proportionalLayout: boolean,
      styles: ISplitviewStyles | undefined,
      orientation: Orientation,
      locked?: boolean,
      margin?: number,
    );
    isViewVisible(location: number[]): boolean;
    setViewVisible(location: number[], visible: boolean): void;
    moveView(parentLocation: number[], from: number, to: number): void;
    addView(view: IGridView, size: number | Sizing, location: number[]): void;
    remove(view: IGridView, sizing?: Sizing): IGridView;
    removeView(location: number[], sizing?: Sizing): IGridView;
    layout(width: number, height: number): void;
    private getNode;
  }

  interface GridConstraintChangeEvent {
    readonly minimumWidth?: number;
    readonly minimumHeight?: number;
    readonly maximumWidth?: number;
    readonly maximumHeight?: number;
  }
  interface GridConstraintChangeEvent2 {
    readonly minimumWidth?: FunctionOrValue<number>;
    readonly minimumHeight?: FunctionOrValue<number>;
    readonly maximumWidth?: FunctionOrValue<number>;
    readonly maximumHeight?: FunctionOrValue<number>;
  }
  interface SizeEvent {
    readonly width?: number;
    readonly height?: number;
  }
  interface GridviewPanelApi extends PanelApi {
    readonly onDidConstraintsChange: Event<GridConstraintChangeEvent>;
    setConstraints(value: GridConstraintChangeEvent2): void;
    setSize(event: SizeEvent): void;
  }
  declare class GridviewPanelApiImpl extends PanelApiImpl implements GridviewPanelApi {
    private readonly _onDidConstraintsChangeInternal;
    readonly onDidConstraintsChangeInternal: Event<GridConstraintChangeEvent2>;
    readonly _onDidConstraintsChange: Emitter<GridConstraintChangeEvent>;
    readonly onDidConstraintsChange: Event<GridConstraintChangeEvent>;
    private readonly _onDidSizeChange;
    readonly onDidSizeChange: Event<SizeEvent>;
    constructor(id: string, component: string, panel?: IPanel);
    setConstraints(value: GridConstraintChangeEvent): void;
    setSize(event: SizeEvent): void;
  }

  type DockviewPanelRenderer = 'onlyWhenVisible' | 'always';
  interface IRenderable {
    readonly element: HTMLElement;
    readonly dropTarget: Droptarget;
  }
  declare class OverlayRenderContainer extends CompositeDisposable {
    readonly element: HTMLElement;
    readonly accessor: DockviewComponent;
    private readonly map;
    private _disposed;
    constructor(element: HTMLElement, accessor: DockviewComponent);
    detatch(panel: IDockviewPanel): boolean;
    attach(options: { panel: IDockviewPanel; referenceContainer: IRenderable }): HTMLElement;
  }

  interface HeaderPartInitParameters {
    title: string;
  }
  interface GroupPanelPartInitParameters extends PanelInitParameters, HeaderPartInitParameters {
    api: DockviewPanelApi;
    containerApi: DockviewApi;
  }
  interface WatermarkRendererInitParameters {
    containerApi: DockviewApi;
    group?: IDockviewGroupPanel;
  }
  type RendererMethodOptionalList = 'dispose' | 'update' | 'layout' | 'toJSON' | 'focus';
  interface IWatermarkRenderer extends Optional<Omit<IPanel, 'id' | 'init'>, RendererMethodOptionalList> {
    readonly element: HTMLElement;
    init: (params: WatermarkRendererInitParameters) => void;
  }
  interface ITabRenderer extends Optional<Omit<IPanel, 'id'>, RendererMethodOptionalList> {
    readonly element: HTMLElement;
    init(parameters: GroupPanelPartInitParameters): void;
  }
  interface IContentRenderer extends Optional<Omit<IPanel, 'id'>, RendererMethodOptionalList> {
    readonly element: HTMLElement;
    init(parameters: GroupPanelPartInitParameters): void;
  }
  interface IGroupPanelInitParameters extends PanelInitParameters, HeaderPartInitParameters {}
  interface GroupviewPanelState {
    id: string;
    contentComponent?: string;
    tabComponent?: string;
    title?: string;
    renderer?: DockviewPanelRenderer;
    params?: {
      [key: string]: any;
    };
    minimumWidth?: number;
    minimumHeight?: number;
    maximumWidth?: number;
    maximumHeight?: number;
  }

  declare class Tab extends CompositeDisposable {
    readonly panel: IDockviewPanel;
    private readonly accessor;
    private readonly group;
    private readonly _element;
    private readonly dropTarget;
    private content;
    private readonly _onPointDown;
    readonly onPointerDown: Event<MouseEvent>;
    private readonly _onDropped;
    readonly onDrop: Event<DroptargetEvent>;
    private readonly _onDragStart;
    readonly onDragStart: Event<DragEvent>;
    readonly onWillShowOverlay: Event<WillShowOverlayEvent>;
    get element(): HTMLElement;
    constructor(panel: IDockviewPanel, accessor: DockviewComponent, group: DockviewGroupPanel);
    setActive(isActive: boolean): void;
    setContent(part: ITabRenderer): void;
    dispose(): void;
  }

  interface TabDragEvent {
    readonly nativeEvent: DragEvent;
    readonly panel: IDockviewPanel;
  }
  interface GroupDragEvent {
    readonly nativeEvent: DragEvent;
    readonly group: DockviewGroupPanel;
  }

  interface IPanelDeserializer {
    fromJSON(panelData: GroupviewPanelState, group: DockviewGroupPanel): IDockviewPanel;
  }
  declare class DefaultDockviewDeserialzier implements IPanelDeserializer {
    private readonly accessor;
    constructor(accessor: DockviewComponent);
    fromJSON(panelData: GroupviewPanelState, group: DockviewGroupPanel): IDockviewPanel;
  }

  interface GridviewOptions {
    disableAutoResizing?: boolean;
    proportionalLayout?: boolean;
    orientation: Orientation;
    className?: string;
    hideBorders?: boolean;
  }
  interface GridviewFrameworkOptions {
    createComponent: (options: CreateComponentOptions) => GridviewPanel;
  }
  type GridviewComponentOptions = GridviewOptions & GridviewFrameworkOptions;
  declare const PROPERTY_KEYS_GRIDVIEW: (keyof GridviewOptions)[];

  interface SerializedGridviewComponent {
    grid: SerializedGridview<GridPanelViewState>;
    activePanel?: string;
  }
  interface AddComponentOptions<T extends object = Parameters> extends BaseComponentOptions<T> {
    minimumWidth?: number;
    maximumWidth?: number;
    minimumHeight?: number;
    maximumHeight?: number;
    position?: {
      direction: Direction;
      referencePanel: string;
    };
    location?: number[];
  }
  interface IGridPanelComponentView extends IGridPanelView {
    init: (params: GridviewInitParameters) => void;
  }
  interface IGridviewComponent extends IBaseGrid<GridviewPanel> {
    readonly orientation: Orientation;
    readonly onDidLayoutFromJSON: Event<void>;
    updateOptions(options: Partial<GridviewComponentOptions>): void;
    addPanel<T extends object = Parameters>(options: AddComponentOptions<T>): IGridviewPanel;
    removePanel(panel: IGridviewPanel, sizing?: Sizing): void;
    focus(): void;
    fromJSON(serializedGridview: SerializedGridviewComponent): void;
    toJSON(): SerializedGridviewComponent;
    movePanel(
      panel: IGridviewPanel,
      options: {
        direction: Direction;
        reference: string;
        size?: number;
      },
    ): void;
    setVisible(panel: IGridviewPanel, visible: boolean): void;
    setActive(panel: IGridviewPanel): void;
    readonly onDidRemoveGroup: Event<GridviewPanel>;
    readonly onDidAddGroup: Event<GridviewPanel>;
    readonly onDidActiveGroupChange: Event<GridviewPanel | undefined>;
  }
  declare class GridviewComponent extends BaseGrid<GridviewPanel> implements IGridviewComponent {
    private _options;
    private _deserializer;
    private readonly _onDidLayoutfromJSON;
    readonly onDidLayoutFromJSON: Event<void>;
    private readonly _onDidRemoveGroup;
    readonly onDidRemoveGroup: Event<GridviewPanel>;
    protected readonly _onDidAddGroup: Emitter<GridviewPanel<GridviewPanelApiImpl>>;
    readonly onDidAddGroup: Event<GridviewPanel>;
    private readonly _onDidActiveGroupChange;
    readonly onDidActiveGroupChange: Event<GridviewPanel | undefined>;
    get orientation(): Orientation;
    set orientation(value: Orientation);
    get options(): GridviewComponentOptions;
    get deserializer(): IPanelDeserializer | undefined;
    set deserializer(value: IPanelDeserializer | undefined);
    constructor(container: HTMLElement, options: GridviewComponentOptions);
    updateOptions(options: Partial<GridviewComponentOptions>): void;
    removePanel(panel: GridviewPanel): void;
    /**
     * Serialize the current state of the layout
     *
     * @returns A JSON respresentation of the layout
     */
    toJSON(): SerializedGridviewComponent;
    setVisible(panel: GridviewPanel, visible: boolean): void;
    setActive(panel: GridviewPanel): void;
    focus(): void;
    fromJSON(serializedGridview: SerializedGridviewComponent): void;
    clear(): void;
    movePanel(
      panel: GridviewPanel,
      options: {
        direction: Direction;
        reference: string;
        size?: number;
      },
    ): void;
    addPanel<T extends object = Parameters>(options: AddComponentOptions<T>): IGridviewPanel;
    private registerPanel;
    moveGroup(referenceGroup: IGridPanelComponentView, groupId: string, target: Position): void;
    removeGroup(group: GridviewPanel): void;
    dispose(): void;
  }

  interface Contraints {
    minimumWidth?: number;
    maximumWidth?: number;
    minimumHeight?: number;
    maximumHeight?: number;
  }
  interface GridviewInitParameters extends PanelInitParameters {
    minimumWidth?: number;
    maximumWidth?: number;
    minimumHeight?: number;
    maximumHeight?: number;
    priority?: LayoutPriority;
    snap?: boolean;
    accessor: BaseGrid<IGridPanelView>;
    isVisible?: boolean;
  }
  interface IGridviewPanel<T extends GridviewPanelApi = GridviewPanelApi> extends BasePanelViewExported<T> {
    readonly minimumWidth: number;
    readonly maximumWidth: number;
    readonly minimumHeight: number;
    readonly maximumHeight: number;
    readonly priority: LayoutPriority | undefined;
    readonly snap: boolean;
  }
  declare abstract class GridviewPanel<T extends GridviewPanelApiImpl = GridviewPanelApiImpl>
    extends BasePanelView<T>
    implements IGridPanelComponentView, IGridviewPanel
  {
    private _evaluatedMinimumWidth;
    private _evaluatedMaximumWidth;
    private _evaluatedMinimumHeight;
    private _evaluatedMaximumHeight;
    private _minimumWidth;
    private _minimumHeight;
    private _maximumWidth;
    private _maximumHeight;
    private _priority?;
    private _snap;
    private readonly _onDidChange;
    readonly onDidChange: Event<IViewSize | undefined>;
    get priority(): LayoutPriority | undefined;
    get snap(): boolean;
    get minimumWidth(): number;
    get minimumHeight(): number;
    get maximumHeight(): number;
    get maximumWidth(): number;
    protected __minimumWidth(): number;
    protected __maximumWidth(): number;
    protected __minimumHeight(): number;
    protected __maximumHeight(): number;
    get isActive(): boolean;
    get isVisible(): boolean;
    constructor(
      id: string,
      component: string,
      options?: {
        minimumWidth?: number;
        maximumWidth?: number;
        minimumHeight?: number;
        maximumHeight?: number;
      },
      api?: T,
    );
    setVisible(isVisible: boolean): void;
    setActive(isActive: boolean): void;
    init(parameters: GridviewInitParameters): void;
    private updateConstraints;
    toJSON(): GridPanelViewState;
  }
  interface GridPanelViewState extends BasePanelViewState {
    minimumHeight?: number;
    maximumHeight?: number;
    minimumWidth?: number;
    maximumWidth?: number;
    snap?: boolean;
    priority?: LayoutPriority;
  }

  interface GroupMoveEvent {
    groupId: string;
    itemId?: string;
    target: Position;
    index?: number;
  }
  interface CoreGroupOptions {
    locked?: DockviewGroupPanelLocked;
    hideHeader?: boolean;
    skipSetActive?: boolean;
    constraints?: Partial<Contraints>;
    initialWidth?: number;
    initialHeight?: number;
  }
  interface GroupOptions extends CoreGroupOptions {
    readonly panels?: IDockviewPanel[];
    readonly activePanel?: IDockviewPanel;
    readonly id?: string;
  }
  interface GroupPanelViewState extends CoreGroupOptions {
    views: string[];
    activeView?: string;
    id: string;
  }
  interface DockviewGroupChangeEvent {
    readonly panel: IDockviewPanel;
  }
  declare class DockviewDidDropEvent extends DockviewEvent {
    private readonly options;
    get nativeEvent(): DragEvent;
    get position(): Position;
    get panel(): IDockviewPanel | undefined;
    get group(): DockviewGroupPanel | undefined;
    get api(): DockviewApi;
    constructor(options: {
      readonly nativeEvent: DragEvent;
      readonly position: Position;
      readonly panel?: IDockviewPanel;
      getData(): PanelTransfer | undefined;
      group?: DockviewGroupPanel;
      api: DockviewApi;
    });
    getData(): PanelTransfer | undefined;
  }
  declare class DockviewWillDropEvent extends DockviewDidDropEvent {
    private readonly _kind;
    get kind(): DockviewGroupDropLocation;
    constructor(options: {
      readonly nativeEvent: DragEvent;
      readonly position: Position;
      readonly panel?: IDockviewPanel;
      getData(): PanelTransfer | undefined;
      kind: DockviewGroupDropLocation;
      group?: DockviewGroupPanel;
      api: DockviewApi;
    });
  }
  interface IHeader {
    hidden: boolean;
  }
  type DockviewGroupPanelLocked = boolean | 'no-drop-target';
  type DockviewGroupDropLocation = 'tab' | 'header_space' | 'content' | 'edge';
  interface IDockviewGroupPanelModel extends IPanel {
    readonly isActive: boolean;
    readonly size: number;
    readonly panels: IDockviewPanel[];
    readonly activePanel: IDockviewPanel | undefined;
    readonly header: IHeader;
    readonly isContentFocused: boolean;
    readonly onDidDrop: Event<DockviewDidDropEvent>;
    readonly onWillDrop: Event<DockviewWillDropEvent>;
    readonly onDidAddPanel: Event<DockviewGroupChangeEvent>;
    readonly onDidRemovePanel: Event<DockviewGroupChangeEvent>;
    readonly onDidActivePanelChange: Event<DockviewGroupChangeEvent>;
    readonly onMove: Event<GroupMoveEvent>;
    locked: DockviewGroupPanelLocked;
    setActive(isActive: boolean): void;
    initialize(): void;
    isPanelActive: (panel: IDockviewPanel) => boolean;
    indexOf(panel: IDockviewPanel): number;
    openPanel(
      panel: IDockviewPanel,
      options?: {
        index?: number;
        skipFocus?: boolean;
        skipSetPanelActive?: boolean;
        skipSetGroupActive?: boolean;
      },
    ): void;
    closePanel(panel: IDockviewPanel): void;
    closeAllPanels(): void;
    containsPanel(panel: IDockviewPanel): boolean;
    removePanel: (panelOrId: IDockviewPanel | string) => IDockviewPanel;
    moveToNext(options?: { panel?: IDockviewPanel; suppressRoll?: boolean }): void;
    moveToPrevious(options?: { panel?: IDockviewPanel; suppressRoll?: boolean }): void;
    canDisplayOverlay(event: DragEvent, position: Position, target: DockviewGroupDropLocation): boolean;
  }
  type DockviewGroupLocation =
    | {
        type: 'grid';
      }
    | {
        type: 'floating';
      }
    | {
        type: 'popout';
        getWindow: () => Window;
        popoutUrl?: string;
      };
  declare class WillShowOverlayLocationEvent implements IDockviewEvent {
    private readonly event;
    private readonly options;
    get kind(): DockviewGroupDropLocation;
    get nativeEvent(): DragEvent;
    get position(): Position;
    get defaultPrevented(): boolean;
    get panel(): IDockviewPanel | undefined;
    get api(): DockviewApi;
    get group(): DockviewGroupPanel | undefined;
    preventDefault(): void;
    getData(): PanelTransfer | undefined;
    constructor(
      event: WillShowOverlayEvent,
      options: {
        kind: DockviewGroupDropLocation;
        panel: IDockviewPanel | undefined;
        api: DockviewApi;
        group: DockviewGroupPanel | undefined;
        getData: () => PanelTransfer | undefined;
      },
    );
  }
  declare class DockviewGroupPanelModel extends CompositeDisposable implements IDockviewGroupPanelModel {
    private readonly container;
    private readonly accessor;
    id: string;
    private readonly options;
    private readonly groupPanel;
    private readonly tabsContainer;
    private readonly contentContainer;
    private _activePanel;
    private watermark?;
    private _isGroupActive;
    private _locked;
    private _rightHeaderActions;
    private _leftHeaderActions;
    private _prefixHeaderActions;
    private _location;
    private mostRecentlyUsed;
    private _overwriteRenderContainer;
    private readonly _onDidChange;
    readonly onDidChange: Event<IViewSize | undefined>;
    private _width;
    private _height;
    private readonly _panels;
    private readonly _panelDisposables;
    private readonly _onMove;
    readonly onMove: Event<GroupMoveEvent>;
    private readonly _onDidDrop;
    readonly onDidDrop: Event<DockviewDidDropEvent>;
    private readonly _onWillDrop;
    readonly onWillDrop: Event<DockviewWillDropEvent>;
    private readonly _onWillShowOverlay;
    readonly onWillShowOverlay: Event<WillShowOverlayLocationEvent>;
    private readonly _onTabDragStart;
    readonly onTabDragStart: Event<TabDragEvent>;
    private readonly _onGroupDragStart;
    readonly onGroupDragStart: Event<GroupDragEvent>;
    private readonly _onDidAddPanel;
    readonly onDidAddPanel: Event<DockviewGroupChangeEvent>;
    private readonly _onDidPanelTitleChange;
    readonly onDidPanelTitleChange: Event<TitleEvent>;
    private readonly _onDidPanelParametersChange;
    readonly onDidPanelParametersChange: Event<Parameters>;
    private readonly _onDidRemovePanel;
    readonly onDidRemovePanel: Event<DockviewGroupChangeEvent>;
    private readonly _onDidActivePanelChange;
    readonly onDidActivePanelChange: Event<DockviewGroupChangeEvent>;
    private readonly _onUnhandledDragOverEvent;
    readonly onUnhandledDragOverEvent: Event<DockviewDndOverlayEvent>;
    private readonly _api;
    get element(): HTMLElement;
    get activePanel(): IDockviewPanel | undefined;
    get locked(): DockviewGroupPanelLocked;
    set locked(value: DockviewGroupPanelLocked);
    get isActive(): boolean;
    get panels(): IDockviewPanel[];
    get size(): number;
    get isEmpty(): boolean;
    get hasWatermark(): boolean;
    get header(): IHeader;
    get isContentFocused(): boolean;
    get location(): DockviewGroupLocation;
    set location(value: DockviewGroupLocation);
    constructor(
      container: HTMLElement,
      accessor: DockviewComponent,
      id: string,
      options: GroupOptions,
      groupPanel: DockviewGroupPanel,
    );
    focusContent(): void;
    set renderContainer(value: OverlayRenderContainer | null);
    get renderContainer(): OverlayRenderContainer;
    initialize(): void;
    rerender(panel: IDockviewPanel): void;
    indexOf(panel: IDockviewPanel): number;
    toJSON(): GroupPanelViewState;
    moveToNext(options?: { panel?: IDockviewPanel; suppressRoll?: boolean }): void;
    moveToPrevious(options?: { panel?: IDockviewPanel; suppressRoll?: boolean }): void;
    containsPanel(panel: IDockviewPanel): boolean;
    init(_params: PanelInitParameters): void;
    update(_params: PanelUpdateEvent): void;
    focus(): void;
    openPanel(
      panel: IDockviewPanel,
      options?: {
        index?: number;
        skipSetActive?: boolean;
        skipSetGroupActive?: boolean;
      },
    ): void;
    removePanel(
      groupItemOrId: IDockviewPanel | string,
      options?: {
        skipSetActive?: boolean;
        skipSetActiveGroup?: boolean;
      },
    ): IDockviewPanel;
    closeAllPanels(): void;
    closePanel(panel: IDockviewPanel): void;
    private doClose;
    isPanelActive(panel: IDockviewPanel): boolean;
    updateActions(element: HTMLElement | undefined): void;
    setActive(isGroupActive: boolean, force?: boolean): void;
    layout(width: number, height: number): void;
    private _removePanel;
    private doRemovePanel;
    private doAddPanel;
    private doSetActivePanel;
    private updateMru;
    private updateContainer;
    canDisplayOverlay(event: DragEvent, position: Position, target: DockviewGroupDropLocation): boolean;
    private handleDropEvent;
    dispose(): void;
  }

  interface DockviewGroupMoveParams {
    group?: DockviewGroupPanel;
    position?: Position;
    /**
     * The index to place the panel within a group, only applicable if the placement is within an existing group
     */
    index?: number;
  }
  interface DockviewGroupPanelApi extends GridviewPanelApi {
    readonly onDidLocationChange: Event<DockviewGroupPanelFloatingChangeEvent>;
    readonly onDidActivePanelChange: Event<DockviewGroupChangeEvent>;
    readonly location: DockviewGroupLocation;
    /**
     * If you require the Window object
     */
    getWindow(): Window;
    moveTo(options: DockviewGroupMoveParams): void;
    maximize(): void;
    isMaximized(): boolean;
    exitMaximized(): void;
    close(): void;
  }
  interface DockviewGroupPanelFloatingChangeEvent {
    readonly location: DockviewGroupLocation;
  }
  declare class DockviewGroupPanelApiImpl extends GridviewPanelApiImpl {
    private readonly accessor;
    private _group;
    readonly _onDidLocationChange: Emitter<DockviewGroupPanelFloatingChangeEvent>;
    readonly onDidLocationChange: Event<DockviewGroupPanelFloatingChangeEvent>;
    readonly _onDidActivePanelChange: Emitter<DockviewGroupChangeEvent>;
    readonly onDidActivePanelChange: Event<DockviewGroupChangeEvent>;
    get location(): DockviewGroupLocation;
    constructor(id: string, accessor: DockviewComponent);
    close(): void;
    getWindow(): Window;
    moveTo(options: DockviewGroupMoveParams): void;
    maximize(): void;
    isMaximized(): boolean;
    exitMaximized(): void;
    initialize(group: DockviewGroupPanel): void;
  }

  interface IDockviewGroupPanel extends IGridviewPanel<DockviewGroupPanelApi> {
    model: IDockviewGroupPanelModel;
    locked: DockviewGroupPanelLocked;
    readonly size: number;
    readonly panels: IDockviewPanel[];
    readonly activePanel: IDockviewPanel | undefined;
  }
  type IDockviewGroupPanelPublic = IDockviewGroupPanel;
  declare class DockviewGroupPanel extends GridviewPanel<DockviewGroupPanelApiImpl> implements IDockviewGroupPanel {
    private readonly _model;
    get minimumWidth(): number;
    get minimumHeight(): number;
    get maximumWidth(): number;
    get maximumHeight(): number;
    get panels(): IDockviewPanel[];
    get activePanel(): IDockviewPanel | undefined;
    get size(): number;
    get model(): DockviewGroupPanelModel;
    get locked(): DockviewGroupPanelLocked;
    set locked(value: DockviewGroupPanelLocked);
    get header(): IHeader;
    constructor(accessor: DockviewComponent, id: string, options: GroupOptions);
    focus(): void;
    initialize(): void;
    setActive(isActive: boolean): void;
    layout(width: number, height: number): void;
    getComponent(): IFrameworkPart;
    toJSON(): any;
  }

  interface TitleEvent {
    readonly title: string;
  }
  interface RendererChangedEvent {
    readonly renderer: DockviewPanelRenderer;
  }
  interface ActiveGroupEvent {
    readonly isActive: boolean;
  }
  interface GroupChangedEvent {}
  type DockviewPanelMoveParams = DockviewGroupMoveParams;
  interface DockviewPanelApi extends Omit<
    GridviewPanelApi,
    'setVisible' | 'onDidConstraintsChange' | 'setConstraints'
  > {
    /**
     * The id of the tab component renderer
     *
     * Undefined if no custom tab renderer is provided
     */
    readonly tabComponent: string | undefined;
    readonly group: DockviewGroupPanel;
    readonly isGroupActive: boolean;
    readonly renderer: DockviewPanelRenderer;
    readonly title: string | undefined;
    readonly onDidActiveGroupChange: Event<ActiveGroupEvent>;
    readonly onDidGroupChange: Event<GroupChangedEvent>;
    readonly onDidTitleChange: Event<TitleEvent>;
    readonly onDidRendererChange: Event<RendererChangedEvent>;
    readonly location: DockviewGroupLocation;
    readonly onDidLocationChange: Event<DockviewGroupPanelFloatingChangeEvent>;
    close(): void;
    setTitle(title: string): void;
    setRenderer(renderer: DockviewPanelRenderer): void;
    moveTo(options: DockviewPanelMoveParams): void;
    maximize(): void;
    isMaximized(): boolean;
    exitMaximized(): void;
    /**
     * If you require the Window object
     */
    getWindow(): Window;
  }
  declare class DockviewPanelApiImpl extends GridviewPanelApiImpl implements DockviewPanelApi {
    private readonly panel;
    private readonly accessor;
    private _group;
    private readonly _tabComponent;
    readonly _onDidTitleChange: Emitter<TitleEvent>;
    readonly onDidTitleChange: Event<TitleEvent>;
    private readonly _onDidActiveGroupChange;
    readonly onDidActiveGroupChange: Event<ActiveGroupEvent>;
    private readonly _onDidGroupChange;
    readonly onDidGroupChange: Event<GroupChangedEvent>;
    readonly _onDidRendererChange: Emitter<RendererChangedEvent>;
    readonly onDidRendererChange: Event<RendererChangedEvent>;
    private readonly _onDidLocationChange;
    readonly onDidLocationChange: Event<DockviewGroupPanelFloatingChangeEvent>;
    private readonly groupEventsDisposable;
    get location(): DockviewGroupLocation;
    get title(): string | undefined;
    get isGroupActive(): boolean;
    get renderer(): DockviewPanelRenderer;
    set group(value: DockviewGroupPanel);
    get group(): DockviewGroupPanel;
    get tabComponent(): string | undefined;
    constructor(
      panel: DockviewPanel,
      group: DockviewGroupPanel,
      accessor: DockviewComponent,
      component: string,
      tabComponent?: string,
    );
    getWindow(): Window;
    moveTo(options: DockviewPanelMoveParams): void;
    setTitle(title: string): void;
    setRenderer(renderer: DockviewPanelRenderer): void;
    close(): void;
    maximize(): void;
    isMaximized(): boolean;
    exitMaximized(): void;
    private setupGroupEventListeners;
  }

  interface IDockviewPanelModel extends IDisposable {
    readonly contentComponent: string;
    readonly tabComponent?: string;
    readonly content: IContentRenderer;
    readonly tab: ITabRenderer;
    update(event: PanelUpdateEvent): void;
    layout(width: number, height: number): void;
    init(params: GroupPanelPartInitParameters): void;
    updateParentGroup(group: DockviewGroupPanel, isPanelVisible: boolean): void;
  }

  interface IDockviewPanel extends IDisposable, IPanel {
    readonly view: IDockviewPanelModel;
    readonly group: DockviewGroupPanel;
    readonly api: DockviewPanelApi;
    readonly title: string | undefined;
    readonly params: Parameters | undefined;
    readonly minimumWidth?: number;
    readonly minimumHeight?: number;
    readonly maximumWidth?: number;
    readonly maximumHeight?: number;
    updateParentGroup(
      group: DockviewGroupPanel,
      options?: {
        skipSetActive?: boolean;
      },
    ): void;
    init(params: IGroupPanelInitParameters): void;
    toJSON(): GroupviewPanelState;
    setTitle(title: string): void;
    update(event: PanelUpdateEvent): void;
    runEvents(): void;
  }
  declare class DockviewPanel extends CompositeDisposable implements IDockviewPanel {
    readonly id: string;
    private readonly accessor;
    private readonly containerApi;
    readonly view: IDockviewPanelModel;
    readonly api: DockviewPanelApiImpl;
    private _group;
    private _params?;
    private _title;
    private _renderer;
    private readonly _minimumWidth;
    private readonly _minimumHeight;
    private readonly _maximumWidth;
    private readonly _maximumHeight;
    get params(): Parameters | undefined;
    get title(): string | undefined;
    get group(): DockviewGroupPanel;
    get renderer(): DockviewPanelRenderer;
    get minimumWidth(): number | undefined;
    get minimumHeight(): number | undefined;
    get maximumWidth(): number | undefined;
    get maximumHeight(): number | undefined;
    constructor(
      id: string,
      component: string,
      tabComponent: string | undefined,
      accessor: DockviewComponent,
      containerApi: DockviewApi,
      group: DockviewGroupPanel,
      view: IDockviewPanelModel,
      options: {
        renderer?: DockviewPanelRenderer;
      } & Partial<Contraints>,
    );
    init(params: IGroupPanelInitParameters): void;
    focus(): void;
    toJSON(): GroupviewPanelState;
    setTitle(title: string): void;
    setRenderer(renderer: DockviewPanelRenderer): void;
    update(event: PanelUpdateEvent): void;
    updateParentGroup(
      group: DockviewGroupPanel,
      options?: {
        skipSetActive?: boolean;
      },
    ): void;
    runEvents(): void;
    layout(width: number, height: number): void;
    dispose(): void;
  }

  declare class Overlay extends CompositeDisposable {
    private readonly options;
    private readonly _element;
    private readonly _onDidChange;
    readonly onDidChange: Event<void>;
    private readonly _onDidChangeEnd;
    readonly onDidChangeEnd: Event<void>;
    private static readonly MINIMUM_HEIGHT;
    private static readonly MINIMUM_WIDTH;
    private verticalAlignment;
    private horiziontalAlignment;
    private _isVisible;
    set minimumInViewportWidth(value: number | undefined);
    set minimumInViewportHeight(value: number | undefined);
    get element(): HTMLElement;
    get isVisible(): boolean;
    constructor(
      options: AnchoredBox & {
        container: HTMLElement;
        content: HTMLElement;
        minimumInViewportWidth?: number;
        minimumInViewportHeight?: number;
      },
    );
    setVisible(isVisible: boolean): void;
    bringToFront(): void;
    setBounds(bounds?: Partial<AnchoredBox>): void;
    toJSON(): AnchoredBox;
    setupDrag(
      dragTarget: HTMLElement,
      options?: {
        inDragMode: boolean;
      },
    ): void;
    private setupResize;
    private getMinimumWidth;
    private getMinimumHeight;
    dispose(): void;
  }

  interface IDockviewFloatingGroupPanel {
    readonly group: IDockviewGroupPanel;
    position(bounds: Partial<AnchoredBox>): void;
  }
  declare class DockviewFloatingGroupPanel extends CompositeDisposable implements IDockviewFloatingGroupPanel {
    readonly group: DockviewGroupPanel;
    readonly overlay: Overlay;
    constructor(group: DockviewGroupPanel, overlay: Overlay);
    position(bounds: Partial<AnchoredBox>): void;
  }

  interface DockviewPopoutGroupOptions {
    /**
     * The position of the popout group
     */
    position?: Box;
    /**
     * The same-origin path at which the popout window will be created
     *
     * Defaults to `/popout.html` if not provided
     */
    popoutUrl?: string;
    onDidOpen?: (event: { id: string; window: Window }) => void;
    onWillClose?: (event: { id: string; window: Window }) => void;
    overridePopoutGroup?: DockviewGroupPanel;
  }
  interface PanelReference {
    update: (event: {
      params: {
        [key: string]: any;
      };
    }) => void;
    remove: () => void;
  }
  interface SerializedFloatingGroup {
    data: GroupPanelViewState;
    position: AnchoredBox;
  }
  interface SerializedPopoutGroup {
    data: GroupPanelViewState;
    url?: string;
    gridReferenceGroup?: string;
    position: Box | null;
  }
  interface SerializedDockview {
    grid: {
      root: SerializedGridObject<GroupPanelViewState>;
      height: number;
      width: number;
      orientation: Orientation;
    };
    panels: Record<string, GroupviewPanelState>;
    activeGroup?: string;
    floatingGroups?: SerializedFloatingGroup[];
    popoutGroups?: SerializedPopoutGroup[];
  }
  interface MovePanelEvent {
    panel: IDockviewPanel;
    from: DockviewGroupPanel;
  }
  type MoveGroupOptions = {
    from: {
      group: DockviewGroupPanel;
    };
    to: {
      group: DockviewGroupPanel;
      position: Position;
    };
  };
  type MoveGroupOrPanelOptions = {
    from: {
      groupId: string;
      panelId?: string;
    };
    to: {
      group: DockviewGroupPanel;
      position: Position;
      index?: number;
    };
  };
  interface FloatingGroupOptions {
    x?: number;
    y?: number;
    height?: number;
    width?: number;
    position?: AnchorPosition;
  }
  interface FloatingGroupOptionsInternal extends FloatingGroupOptions {
    skipRemoveGroup?: boolean;
    inDragMode?: boolean;
    skipActiveGroup?: boolean;
  }
  interface DockviewMaximizedGroupChanged {
    group: DockviewGroupPanel;
    isMaximized: boolean;
  }
  interface IDockviewComponent extends IBaseGrid<DockviewGroupPanel> {
    readonly activePanel: IDockviewPanel | undefined;
    readonly totalPanels: number;
    readonly panels: IDockviewPanel[];
    readonly orientation: Orientation;
    readonly gap: number;
    readonly onDidDrop: Event<DockviewDidDropEvent>;
    readonly onWillDrop: Event<DockviewWillDropEvent>;
    readonly onWillShowOverlay: Event<WillShowOverlayLocationEvent>;
    readonly onDidRemovePanel: Event<IDockviewPanel>;
    readonly onDidAddPanel: Event<IDockviewPanel>;
    readonly onDidLayoutFromJSON: Event<void>;
    readonly onDidActivePanelChange: Event<IDockviewPanel | undefined>;
    readonly onWillDragPanel: Event<TabDragEvent>;
    readonly onWillDragGroup: Event<GroupDragEvent>;
    readonly onDidRemoveGroup: Event<DockviewGroupPanel>;
    readonly onDidAddGroup: Event<DockviewGroupPanel>;
    readonly onDidActiveGroupChange: Event<DockviewGroupPanel | undefined>;
    readonly onUnhandledDragOverEvent: Event<DockviewDndOverlayEvent>;
    readonly onDidMovePanel: Event<MovePanelEvent>;
    readonly onDidMaximizedGroupChange: Event<DockviewMaximizedGroupChanged>;
    readonly options: DockviewComponentOptions;
    updateOptions(options: DockviewOptions): void;
    moveGroupOrPanel(options: MoveGroupOrPanelOptions): void;
    moveGroup(options: MoveGroupOptions): void;
    doSetGroupActive: (group: DockviewGroupPanel, skipFocus?: boolean) => void;
    removeGroup: (group: DockviewGroupPanel) => void;
    addPanel<T extends object = Parameters>(options: AddPanelOptions<T>): IDockviewPanel;
    removePanel(panel: IDockviewPanel): void;
    getGroupPanel: (id: string) => IDockviewPanel | undefined;
    createWatermarkComponent(): IWatermarkRenderer;
    addGroup(options?: AddGroupOptions): DockviewGroupPanel;
    closeAllGroups(): void;
    moveToNext(options?: MovementOptions): void;
    moveToPrevious(options?: MovementOptions): void;
    setActivePanel(panel: IDockviewPanel): void;
    focus(): void;
    toJSON(): SerializedDockview;
    fromJSON(data: SerializedDockview): void;
    addFloatingGroup(item: IDockviewPanel | DockviewGroupPanel, options?: FloatingGroupOptions): void;
    addPopoutGroup(
      item: IDockviewPanel | DockviewGroupPanel,
      options?: {
        position?: Box;
        popoutUrl?: string;
        onDidOpen?: (event: { id: string; window: Window }) => void;
        onWillClose?: (event: { id: string; window: Window }) => void;
      },
    ): Promise<boolean>;
  }
  declare class DockviewComponent extends BaseGrid<DockviewGroupPanel> implements IDockviewComponent {
    private readonly nextGroupId;
    private readonly _deserializer;
    private readonly _api;
    private _options;
    private watermark;
    readonly overlayRenderContainer: OverlayRenderContainer;
    private readonly _onWillDragPanel;
    readonly onWillDragPanel: Event<TabDragEvent>;
    private readonly _onWillDragGroup;
    readonly onWillDragGroup: Event<GroupDragEvent>;
    private readonly _onDidDrop;
    readonly onDidDrop: Event<DockviewDidDropEvent>;
    private readonly _onWillDrop;
    readonly onWillDrop: Event<DockviewWillDropEvent>;
    private readonly _onWillShowOverlay;
    readonly onWillShowOverlay: Event<WillShowOverlayLocationEvent>;
    private readonly _onUnhandledDragOverEvent;
    readonly onUnhandledDragOverEvent: Event<DockviewDndOverlayEvent>;
    private readonly _onDidRemovePanel;
    readonly onDidRemovePanel: Event<IDockviewPanel>;
    private readonly _onDidAddPanel;
    readonly onDidAddPanel: Event<IDockviewPanel>;
    private readonly _onDidLayoutFromJSON;
    readonly onDidLayoutFromJSON: Event<void>;
    private readonly _onDidActivePanelChange;
    readonly onDidActivePanelChange: Event<IDockviewPanel | undefined>;
    private readonly _onDidMovePanel;
    readonly onDidMovePanel: Event<MovePanelEvent>;
    private readonly _onDidMaximizedGroupChange;
    readonly onDidMaximizedGroupChange: Event<DockviewMaximizedGroupChanged>;
    private readonly _floatingGroups;
    private readonly _popoutGroups;
    private readonly _rootDropTarget;
    private readonly _onDidRemoveGroup;
    readonly onDidRemoveGroup: Event<DockviewGroupPanel>;
    protected readonly _onDidAddGroup: Emitter<DockviewGroupPanel>;
    readonly onDidAddGroup: Event<DockviewGroupPanel>;
    private readonly _onDidActiveGroupChange;
    readonly onDidActiveGroupChange: Event<DockviewGroupPanel | undefined>;
    get orientation(): Orientation;
    get totalPanels(): number;
    get panels(): IDockviewPanel[];
    get options(): DockviewComponentOptions;
    get activePanel(): IDockviewPanel | undefined;
    get renderer(): DockviewPanelRenderer;
    get api(): DockviewApi;
    get gap(): number;
    get floatingGroups(): DockviewFloatingGroupPanel[];
    constructor(container: HTMLElement, options: DockviewComponentOptions);
    setVisible(panel: DockviewGroupPanel, visible: boolean): void;
    addPopoutGroup(
      itemToPopout: DockviewPanel | DockviewGroupPanel,
      options?: DockviewPopoutGroupOptions,
    ): Promise<boolean>;
    addFloatingGroup(item: DockviewPanel | DockviewGroupPanel, options?: FloatingGroupOptionsInternal): void;
    private orthogonalize;
    updateOptions(options: Partial<DockviewComponentOptions>): void;
    layout(width: number, height: number, forceResize?: boolean | undefined): void;
    focus(): void;
    getGroupPanel(id: string): IDockviewPanel | undefined;
    setActivePanel(panel: IDockviewPanel): void;
    moveToNext(options?: MovementOptions): void;
    moveToPrevious(options?: MovementOptions): void;
    /**
     * Serialize the current state of the layout
     *
     * @returns A JSON respresentation of the layout
     */
    toJSON(): SerializedDockview;
    fromJSON(data: SerializedDockview): void;
    clear(): void;
    closeAllGroups(): void;
    addPanel<T extends object = Parameters>(options: AddPanelOptions<T>): DockviewPanel;
    removePanel(
      panel: IDockviewPanel,
      options?: {
        removeEmptyGroup: boolean;
        skipDispose?: boolean;
        skipSetActiveGroup?: boolean;
      },
    ): void;
    createWatermarkComponent(): IWatermarkRenderer;
    private updateWatermark;
    addGroup(options?: AddGroupOptions): DockviewGroupPanel;
    private getLocationOrientation;
    removeGroup(
      group: DockviewGroupPanel,
      options?:
        | {
            skipActive?: boolean;
            skipDispose?: boolean;
            skipPopoutAssociated?: boolean;
            skipPopoutReturn?: boolean;
          }
        | undefined,
    ): void;
    protected doRemoveGroup(
      group: DockviewGroupPanel,
      options?:
        | {
            skipActive?: boolean;
            skipDispose?: boolean;
            skipPopoutAssociated?: boolean;
            skipPopoutReturn?: boolean;
          }
        | undefined,
    ): DockviewGroupPanel;
    private _moving;
    movingLock<T>(func: () => T): T;
    moveGroupOrPanel(options: MoveGroupOrPanelOptions): void;
    moveGroup(options: MoveGroupOptions): void;
    doSetGroupActive(group: DockviewGroupPanel | undefined): void;
    doSetGroupAndPanelActive(group: DockviewGroupPanel | undefined): void;
    private getNextGroupId;
    createGroup(options?: GroupOptions): DockviewGroupPanel;
    private createPanel;
    private createGroupAtLocation;
    private findGroup;
    private orientationAtLocation;
  }

  interface ExpansionEvent {
    readonly isExpanded: boolean;
  }
  interface PaneviewPanelApi extends SplitviewPanelApi {
    readonly isExpanded: boolean;
    readonly onDidExpansionChange: Event<ExpansionEvent>;
    readonly onMouseEnter: Event<MouseEvent>;
    readonly onMouseLeave: Event<MouseEvent>;
    setExpanded(isExpanded: boolean): void;
  }
  declare class PaneviewPanelApiImpl extends SplitviewPanelApiImpl implements PaneviewPanelApi {
    readonly _onDidExpansionChange: Emitter<ExpansionEvent>;
    readonly onDidExpansionChange: Event<ExpansionEvent>;
    readonly _onMouseEnter: Emitter<MouseEvent>;
    readonly onMouseEnter: Event<MouseEvent>;
    readonly _onMouseLeave: Emitter<MouseEvent>;
    readonly onMouseLeave: Event<MouseEvent>;
    private _pane;
    set pane(pane: PaneviewPanel);
    constructor(id: string, component: string);
    setExpanded(isExpanded: boolean): void;
    get isExpanded(): boolean;
  }

  interface PanePanelViewState extends BasePanelViewState {
    headerComponent?: string;
    title: string;
  }
  interface PanePanelInitParameter extends PanelInitParameters {
    minimumBodySize?: number;
    maximumBodySize?: number;
    isExpanded?: boolean;
    title: string;
    containerApi: PaneviewApi;
    accessor: PaneviewComponent;
  }
  interface PanePanelComponentInitParameter extends PanePanelInitParameter {
    api: PaneviewPanelApiImpl;
  }
  interface IPanePart extends IDisposable {
    readonly element: HTMLElement;
    update(params: PanelUpdateEvent): void;
    init(parameters: PanePanelComponentInitParameter): void;
  }
  interface IPaneview extends IView {
    onDidChangeExpansionState: Event<boolean>;
  }
  interface IPaneviewPanel extends BasePanelViewExported<PaneviewPanelApiImpl> {
    readonly minimumSize: number;
    readonly maximumSize: number;
    readonly minimumBodySize: number;
    readonly maximumBodySize: number;
    isExpanded(): boolean;
    setExpanded(isExpanded: boolean): void;
    headerVisible: boolean;
  }
  declare abstract class PaneviewPanel
    extends BasePanelView<PaneviewPanelApiImpl>
    implements IPaneview, IPaneviewPanel
  {
    private readonly headerComponent;
    private readonly _onDidChangeExpansionState;
    onDidChangeExpansionState: Event<boolean>;
    private readonly _onDidChange;
    readonly onDidChange: Event<{
      size?: number;
      orthogonalSize?: number;
    }>;
    private readonly headerSize;
    private _orthogonalSize;
    private _size;
    private _minimumBodySize;
    private _maximumBodySize;
    private _isExpanded;
    protected header?: HTMLElement;
    protected body?: HTMLElement;
    private bodyPart?;
    private headerPart?;
    private expandedSize;
    private animationTimer;
    private _orientation;
    private _headerVisible;
    set orientation(value: Orientation);
    get orientation(): Orientation;
    get minimumSize(): number;
    get maximumSize(): number;
    get size(): number;
    get orthogonalSize(): number;
    set orthogonalSize(size: number);
    get minimumBodySize(): number;
    set minimumBodySize(value: number);
    get maximumBodySize(): number;
    set maximumBodySize(value: number);
    get headerVisible(): boolean;
    set headerVisible(value: boolean);
    constructor(
      id: string,
      component: string,
      headerComponent: string | undefined,
      orientation: Orientation,
      isExpanded: boolean,
      isHeaderVisible: boolean,
    );
    setVisible(isVisible: boolean): void;
    setActive(isActive: boolean): void;
    isExpanded(): boolean;
    setExpanded(expanded: boolean): void;
    layout(size: number, orthogonalSize: number): void;
    init(parameters: PanePanelInitParameter): void;
    toJSON(): PanePanelViewState;
    private renderOnce;
    getComponent(): IFrameworkPart;
    protected abstract getBodyComponent(): IPanePart;
    protected abstract getHeaderComponent(): IPanePart;
  }

  interface PaneviewOptions {
    disableAutoResizing?: boolean;
    disableDnd?: boolean;
    className?: string;
  }
  interface PaneviewFrameworkOptions {
    createComponent: (options: CreateComponentOptions) => IPanePart;
    createHeaderComponent?: (options: CreateComponentOptions) => IPanePart | undefined;
  }
  type PaneviewComponentOptions = PaneviewOptions & PaneviewFrameworkOptions;
  declare const PROPERTY_KEYS_PANEVIEW: (keyof PaneviewOptions)[];
  interface PaneviewDndOverlayEvent extends IAcceptableEvent {
    nativeEvent: DragEvent;
    position: Position;
    panel: IPaneviewPanel;
    getData: () => PaneTransfer | undefined;
  }
  declare class PaneviewUnhandledDragOverEvent extends AcceptableEvent implements PaneviewDndOverlayEvent {
    readonly nativeEvent: DragEvent;
    readonly position: Position;
    readonly getData: () => PaneTransfer | undefined;
    readonly panel: IPaneviewPanel;
    constructor(
      nativeEvent: DragEvent,
      position: Position,
      getData: () => PaneTransfer | undefined,
      panel: IPaneviewPanel,
    );
  }

  interface PaneItem {
    pane: PaneviewPanel;
    disposable: IDisposable;
  }
  declare class Paneview extends CompositeDisposable implements IDisposable {
    private readonly element;
    private readonly splitview;
    private paneItems;
    private readonly _orientation;
    private animationTimer;
    private skipAnimation;
    private readonly _onDidChange;
    readonly onDidChange: Event<void>;
    get onDidAddView(): Event<PaneviewPanel>;
    get onDidRemoveView(): Event<PaneviewPanel>;
    get minimumSize(): number;
    get maximumSize(): number;
    get orientation(): Orientation;
    get size(): number;
    get orthogonalSize(): number;
    constructor(
      container: HTMLElement,
      options: {
        orientation: Orientation;
        descriptor?: ISplitViewDescriptor;
      },
    );
    setViewVisible(index: number, visible: boolean): void;
    addPane(pane: PaneviewPanel, size?: number | Sizing, index?: number, skipLayout?: boolean): void;
    getViewSize(index: number): number;
    getPanes(): PaneviewPanel[];
    removePane(
      index: number,
      options?: {
        skipDispose: boolean;
      },
    ): PaneItem;
    moveView(from: number, to: number): void;
    layout(size: number, orthogonalSize: number): void;
    private setupAnimation;
    dispose(): void;
  }

  interface PaneviewDidDropEvent extends DroptargetEvent {
    panel: IPaneviewPanel;
    getData: () => PaneTransfer | undefined;
    api: PaneviewApi;
  }
  declare abstract class DraggablePaneviewPanel extends PaneviewPanel {
    private readonly accessor;
    private handler;
    private target;
    private readonly _onDidDrop;
    readonly onDidDrop: Event<PaneviewDidDropEvent>;
    private readonly _onUnhandledDragOverEvent;
    readonly onUnhandledDragOverEvent: Event<PaneviewDndOverlayEvent>;
    constructor(
      accessor: IPaneviewComponent,
      id: string,
      component: string,
      headerComponent: string | undefined,
      orientation: Orientation,
      isExpanded: boolean,
      disableDnd: boolean,
    );
    private initDragFeatures;
    private onDrop;
  }

  interface SerializedPaneviewPanel {
    snap?: boolean;
    priority?: LayoutPriority;
    minimumSize?: number;
    maximumSize?: number;
    data: {
      id: string;
      component: string;
      title: string;
      headerComponent?: string;
      params?: {
        [index: string]: any;
      };
    };
    size: number;
    expanded?: boolean;
  }
  interface SerializedPaneview {
    size: number;
    views: SerializedPaneviewPanel[];
  }
  declare class PaneFramework extends DraggablePaneviewPanel {
    private readonly options;
    constructor(options: {
      id: string;
      component: string;
      headerComponent: string | undefined;
      body: IPanePart;
      header: IPanePart;
      orientation: Orientation;
      isExpanded: boolean;
      disableDnd: boolean;
      accessor: IPaneviewComponent;
    });
    getBodyComponent(): IPanePart;
    getHeaderComponent(): IPanePart;
  }
  interface AddPaneviewComponentOptions<T extends object = Parameters> {
    id: string;
    component: string;
    headerComponent?: string;
    params?: T;
    minimumBodySize?: number;
    maximumBodySize?: number;
    isExpanded?: boolean;
    title: string;
    index?: number;
    size?: number;
  }
  interface IPaneviewComponent extends IDisposable {
    readonly id: string;
    readonly width: number;
    readonly height: number;
    readonly minimumSize: number;
    readonly maximumSize: number;
    readonly panels: IPaneviewPanel[];
    readonly options: PaneviewComponentOptions;
    readonly onDidAddView: Event<PaneviewPanel>;
    readonly onDidRemoveView: Event<PaneviewPanel>;
    readonly onDidDrop: Event<PaneviewDidDropEvent>;
    readonly onDidLayoutChange: Event<void>;
    readonly onDidLayoutFromJSON: Event<void>;
    readonly onUnhandledDragOverEvent: Event<PaneviewDndOverlayEvent>;
    addPanel<T extends object = Parameters>(options: AddPaneviewComponentOptions<T>): IPaneviewPanel;
    layout(width: number, height: number): void;
    toJSON(): SerializedPaneview;
    fromJSON(serializedPaneview: SerializedPaneview): void;
    focus(): void;
    removePanel(panel: IPaneviewPanel): void;
    getPanel(id: string): IPaneviewPanel | undefined;
    movePanel(from: number, to: number): void;
    updateOptions(options: Partial<PaneviewComponentOptions>): void;
    setVisible(panel: IPaneviewPanel, visible: boolean): void;
    clear(): void;
  }
  declare class PaneviewComponent extends Resizable implements IPaneviewComponent {
    private readonly _id;
    private _options;
    private readonly _disposable;
    private readonly _viewDisposables;
    private _paneview;
    private readonly _onDidLayoutfromJSON;
    readonly onDidLayoutFromJSON: Event<void>;
    private readonly _onDidLayoutChange;
    readonly onDidLayoutChange: Event<void>;
    private readonly _onDidDrop;
    readonly onDidDrop: Event<PaneviewDidDropEvent>;
    private readonly _onDidAddView;
    readonly onDidAddView: Event<PaneviewPanel>;
    private readonly _onDidRemoveView;
    readonly onDidRemoveView: Event<PaneviewPanel>;
    private readonly _onUnhandledDragOverEvent;
    readonly onUnhandledDragOverEvent: Event<PaneviewDndOverlayEvent>;
    private readonly _classNames;
    get id(): string;
    get panels(): PaneviewPanel[];
    set paneview(value: Paneview);
    get paneview(): Paneview;
    get minimumSize(): number;
    get maximumSize(): number;
    get height(): number;
    get width(): number;
    get options(): PaneviewComponentOptions;
    constructor(container: HTMLElement, options: PaneviewComponentOptions);
    setVisible(panel: PaneviewPanel, visible: boolean): void;
    focus(): void;
    updateOptions(options: Partial<PaneviewComponentOptions>): void;
    addPanel<T extends object = Parameters>(options: AddPaneviewComponentOptions<T>): IPaneviewPanel;
    removePanel(panel: PaneviewPanel): void;
    movePanel(from: number, to: number): void;
    getPanel(id: string): PaneviewPanel | undefined;
    layout(width: number, height: number): void;
    toJSON(): SerializedPaneview;
    fromJSON(serializedPaneview: SerializedPaneview): void;
    clear(): void;
    private doAddPanel;
    private doRemovePanel;
    dispose(): void;
  }

  interface CommonApi<T = any> {
    readonly height: number;
    readonly width: number;
    readonly onDidLayoutChange: Event<void>;
    readonly onDidLayoutFromJSON: Event<void>;
    focus(): void;
    layout(width: number, height: number): void;
    fromJSON(data: T): void;
    toJSON(): T;
    clear(): void;
    dispose(): void;
  }
  declare class SplitviewApi implements CommonApi<SerializedSplitview> {
    private readonly component;
    /**
     * The minimum size  the component can reach where size is measured in the direction of orientation provided.
     */
    get minimumSize(): number;
    /**
     * The maximum size the component can reach where size is measured in the direction of orientation provided.
     */
    get maximumSize(): number;
    /**
     * Width of the component.
     */
    get width(): number;
    /**
     * Height of the component.
     */
    get height(): number;
    /**
     * The current number of panels.
     */
    get length(): number;
    /**
     * The current orientation of the component.
     */
    get orientation(): Orientation;
    /**
     * The list of current panels.
     */
    get panels(): ISplitviewPanel[];
    /**
     * Invoked after a layout is loaded through the `fromJSON` method.
     */
    get onDidLayoutFromJSON(): Event<void>;
    /**
     * Invoked whenever any aspect of the layout changes.
     * If listening to this event it may be worth debouncing ouputs.
     */
    get onDidLayoutChange(): Event<void>;
    /**
     * Invoked when a view is added.
     */
    get onDidAddView(): Event<IView>;
    /**
     * Invoked when a view is removed.
     */
    get onDidRemoveView(): Event<IView>;
    constructor(component: ISplitviewComponent);
    /**
     * Removes an existing panel and optionally provide a `Sizing` method
     * for the subsequent resize.
     */
    removePanel(panel: ISplitviewPanel, sizing?: Sizing): void;
    /**
     * Focus the component.
     */
    focus(): void;
    /**
     * Get the reference to a panel given it's `string` id.
     */
    getPanel(id: string): ISplitviewPanel | undefined;
    /**
     * Layout the panel with a width and height.
     */
    layout(width: number, height: number): void;
    /**
     * Add a new panel and return the created instance.
     */
    addPanel<T extends object = Parameters>(options: AddSplitviewComponentOptions<T>): ISplitviewPanel;
    /**
     * Move a panel given it's current and desired index.
     */
    movePanel(from: number, to: number): void;
    /**
     * Deserialize a layout to built a splitivew.
     */
    fromJSON(data: SerializedSplitview): void;
    /** Serialize a layout */
    toJSON(): SerializedSplitview;
    /**
     * Remove all panels and clear the component.
     */
    clear(): void;
    /**
     * Update configuratable options.
     */
    updateOptions(options: Partial<SplitviewComponentOptions>): void;
    /**
     * Release resources and teardown component. Do not call when using framework versions of dockview.
     */
    dispose(): void;
  }
  declare class PaneviewApi implements CommonApi<SerializedPaneview> {
    private readonly component;
    /**
     * The minimum size  the component can reach where size is measured in the direction of orientation provided.
     */
    get minimumSize(): number;
    /**
     * The maximum size the component can reach where size is measured in the direction of orientation provided.
     */
    get maximumSize(): number;
    /**
     * Width of the component.
     */
    get width(): number;
    /**
     * Height of the component.
     */
    get height(): number;
    /**
     * All panel objects.
     */
    get panels(): IPaneviewPanel[];
    /**
     * Invoked when any layout change occures, an aggregation of many events.
     */
    get onDidLayoutChange(): Event<void>;
    /**
     * Invoked after a layout is deserialzied using the `fromJSON` method.
     */
    get onDidLayoutFromJSON(): Event<void>;
    /**
     * Invoked when a panel is added. May be called multiple times when moving panels.
     */
    get onDidAddView(): Event<IPaneviewPanel>;
    /**
     * Invoked when a panel is removed. May be called multiple times when moving panels.
     */
    get onDidRemoveView(): Event<IPaneviewPanel>;
    /**
     * Invoked when a Drag'n'Drop event occurs that the component was unable to handle. Exposed for custom Drag'n'Drop functionality.
     */
    get onDidDrop(): Event<PaneviewDidDropEvent>;
    get onUnhandledDragOverEvent(): Event<PaneviewDndOverlayEvent>;
    constructor(component: IPaneviewComponent);
    /**
     * Remove a panel given the panel object.
     */
    removePanel(panel: IPaneviewPanel): void;
    /**
     * Get a panel object given a `string` id. May return `undefined`.
     */
    getPanel(id: string): IPaneviewPanel | undefined;
    /**
     * Move a panel given it's current and desired index.
     */
    movePanel(from: number, to: number): void;
    /**
     *  Focus the component. Will try to focus an active panel if one exists.
     */
    focus(): void;
    /**
     * Force resize the component to an exact width and height. Read about auto-resizing before using.
     */
    layout(width: number, height: number): void;
    /**
     * Add a panel and return the created object.
     */
    addPanel<T extends object = Parameters>(options: AddPaneviewComponentOptions<T>): IPaneviewPanel;
    /**
     * Create a component from a serialized object.
     */
    fromJSON(data: SerializedPaneview): void;
    /**
     * Create a serialized object of the current component.
     */
    toJSON(): SerializedPaneview;
    /**
     * Reset the component back to an empty and default state.
     */
    clear(): void;
    /**
     * Update configuratable options.
     */
    updateOptions(options: Partial<PaneviewComponentOptions>): void;
    /**
     * Release resources and teardown component. Do not call when using framework versions of dockview.
     */
    dispose(): void;
  }
  declare class GridviewApi implements CommonApi<SerializedGridviewComponent> {
    private readonly component;
    /**
     * Width of the component.
     */
    get width(): number;
    /**
     * Height of the component.
     */
    get height(): number;
    /**
     * Minimum height of the component.
     */
    get minimumHeight(): number;
    /**
     * Maximum height of the component.
     */
    get maximumHeight(): number;
    /**
     * Minimum width of the component.
     */
    get minimumWidth(): number;
    /**
     * Maximum width of the component.
     */
    get maximumWidth(): number;
    /**
     * Invoked when any layout change occures, an aggregation of many events.
     */
    get onDidLayoutChange(): Event<void>;
    /**
     * Invoked when a panel is added. May be called multiple times when moving panels.
     */
    get onDidAddPanel(): Event<IGridviewPanel>;
    /**
     * Invoked when a panel is removed. May be called multiple times when moving panels.
     */
    get onDidRemovePanel(): Event<IGridviewPanel>;
    /**
     * Invoked when the active panel changes. May be undefined if no panel is active.
     */
    get onDidActivePanelChange(): Event<IGridviewPanel | undefined>;
    /**
     * Invoked after a layout is deserialzied using the `fromJSON` method.
     */
    get onDidLayoutFromJSON(): Event<void>;
    /**
     * All panel objects.
     */
    get panels(): IGridviewPanel[];
    /**
     * Current orientation. Can be changed after initialization.
     */
    get orientation(): Orientation;
    set orientation(value: Orientation);
    constructor(component: IGridviewComponent);
    /**
     *  Focus the component. Will try to focus an active panel if one exists.
     */
    focus(): void;
    /**
     * Force resize the component to an exact width and height. Read about auto-resizing before using.
     */
    layout(width: number, height: number, force?: boolean): void;
    /**
     * Add a panel and return the created object.
     */
    addPanel<T extends object = Parameters>(options: AddComponentOptions<T>): IGridviewPanel;
    /**
     * Remove a panel given the panel object.
     */
    removePanel(panel: IGridviewPanel, sizing?: Sizing): void;
    /**
     * Move a panel in a particular direction relative to another panel.
     */
    movePanel(
      panel: IGridviewPanel,
      options: {
        direction: Direction;
        reference: string;
        size?: number;
      },
    ): void;
    /**
     * Get a panel object given a `string` id. May return `undefined`.
     */
    getPanel(id: string): IGridviewPanel | undefined;
    /**
     * Create a component from a serialized object.
     */
    fromJSON(data: SerializedGridviewComponent): void;
    /**
     * Create a serialized object of the current component.
     */
    toJSON(): SerializedGridviewComponent;
    /**
     * Reset the component back to an empty and default state.
     */
    clear(): void;
    updateOptions(options: Partial<GridviewComponentOptions>): void;
    /**
     * Release resources and teardown component. Do not call when using framework versions of dockview.
     */
    dispose(): void;
  }
  declare class DockviewApi implements CommonApi<SerializedDockview> {
    private readonly component;
    /**
     * The unique identifier for this instance. Used to manage scope of Drag'n'Drop events.
     */
    get id(): string;
    /**
     * Width of the component.
     */
    get width(): number;
    /**
     * Height of the component.
     */
    get height(): number;
    /**
     * Minimum height of the component.
     */
    get minimumHeight(): number;
    /**
     * Maximum height of the component.
     */
    get maximumHeight(): number;
    /**
     * Minimum width of the component.
     */
    get minimumWidth(): number;
    /**
     * Maximum width of the component.
     */
    get maximumWidth(): number;
    /**
     * Total number of groups.
     */
    get size(): number;
    /**
     * Total number of panels.
     */
    get totalPanels(): number;
    get gap(): number;
    /**
     * Invoked when the active group changes. May be undefined if no group is active.
     */
    get onDidActiveGroupChange(): Event<DockviewGroupPanel | undefined>;
    /**
     * Invoked when a group is added. May be called multiple times when moving groups.
     */
    get onDidAddGroup(): Event<DockviewGroupPanel>;
    /**
     * Invoked when a group is removed. May be called multiple times when moving groups.
     */
    get onDidRemoveGroup(): Event<DockviewGroupPanel>;
    /**
     * Invoked when the active panel changes. May be undefined if no panel is active.
     */
    get onDidActivePanelChange(): Event<IDockviewPanel | undefined>;
    /**
     * Invoked when a panel is added. May be called multiple times when moving panels.
     */
    get onDidAddPanel(): Event<IDockviewPanel>;
    /**
     * Invoked when a panel is removed. May be called multiple times when moving panels.
     */
    get onDidRemovePanel(): Event<IDockviewPanel>;
    get onDidMovePanel(): Event<MovePanelEvent>;
    /**
     * Invoked after a layout is deserialzied using the `fromJSON` method.
     */
    get onDidLayoutFromJSON(): Event<void>;
    /**
     * Invoked when any layout change occures, an aggregation of many events.
     */
    get onDidLayoutChange(): Event<void>;
    /**
     * Invoked when a Drag'n'Drop event occurs that the component was unable to handle. Exposed for custom Drag'n'Drop functionality.
     */
    get onDidDrop(): Event<DockviewDidDropEvent>;
    /**
     * Invoked when a Drag'n'Drop event occurs but before dockview handles it giving the user an opportunity to intecept and
     * prevent the event from occuring using the standard `preventDefault()` syntax.
     *
     * Preventing certain events may causes unexpected behaviours, use carefully.
     */
    get onWillDrop(): Event<DockviewWillDropEvent>;
    /**
     * Invoked before an overlay is shown indicating a drop target.
     *
     * Calling `event.preventDefault()` will prevent the overlay being shown and prevent
     * the any subsequent drop event.
     */
    get onWillShowOverlay(): Event<WillShowOverlayLocationEvent>;
    /**
     * Invoked before a group is dragged.
     *
     * Calling `event.nativeEvent.preventDefault()` will prevent the group drag starting.
     *
     */
    get onWillDragGroup(): Event<GroupDragEvent>;
    /**
     * Invoked before a panel is dragged.
     *
     * Calling `event.nativeEvent.preventDefault()` will prevent the panel drag starting.
     */
    get onWillDragPanel(): Event<TabDragEvent>;
    get onUnhandledDragOverEvent(): Event<DockviewDndOverlayEvent>;
    /**
     * All panel objects.
     */
    get panels(): IDockviewPanel[];
    /**
     * All group objects.
     */
    get groups(): DockviewGroupPanel[];
    /**
     *  Active panel object.
     */
    get activePanel(): IDockviewPanel | undefined;
    /**
     * Active group object.
     */
    get activeGroup(): DockviewGroupPanel | undefined;
    constructor(component: IDockviewComponent);
    /**
     *  Focus the component. Will try to focus an active panel if one exists.
     */
    focus(): void;
    /**
     * Get a panel object given a `string` id. May return `undefined`.
     */
    getPanel(id: string): IDockviewPanel | undefined;
    /**
     * Force resize the component to an exact width and height. Read about auto-resizing before using.
     */
    layout(width: number, height: number, force?: boolean): void;
    /**
     * Add a panel and return the created object.
     */
    addPanel<T extends object = Parameters>(options: AddPanelOptions<T>): IDockviewPanel;
    /**
     * Remove a panel given the panel object.
     */
    removePanel(panel: IDockviewPanel): void;
    /**
     * Add a group and return the created object.
     */
    addGroup(options?: AddGroupOptions): DockviewGroupPanel;
    /**
     * Close all groups and panels.
     */
    closeAllGroups(): void;
    /**
     * Remove a group and any panels within the group.
     */
    removeGroup(group: IDockviewGroupPanel): void;
    /**
     * Get a group object given a `string` id. May return undefined.
     */
    getGroup(id: string): DockviewGroupPanel | undefined;
    /**
     * Add a floating group
     */
    addFloatingGroup(item: IDockviewPanel | DockviewGroupPanel, options?: FloatingGroupOptions): void;
    /**
     * Create a component from a serialized object.
     */
    fromJSON(data: SerializedDockview): void;
    /**
     * Create a serialized object of the current component.
     */
    toJSON(): SerializedDockview;
    /**
     * Reset the component back to an empty and default state.
     */
    clear(): void;
    /**
     * Move the focus progmatically to the next panel or group.
     */
    moveToNext(options?: MovementOptions): void;
    /**
     * Move the focus progmatically to the previous panel or group.
     */
    moveToPrevious(options?: MovementOptions): void;
    maximizeGroup(panel: IDockviewPanel): void;
    hasMaximizedGroup(): boolean;
    exitMaximizedGroup(): void;
    get onDidMaximizedGroupChange(): Event<DockviewMaximizedGroupChanged>;
    /**
     * Add a popout group in a new Window
     */
    addPopoutGroup(
      item: IDockviewPanel | DockviewGroupPanel,
      options?: {
        position?: Box;
        popoutUrl?: string;
        onDidOpen?: (event: { id: string; window: Window }) => void;
        onWillClose?: (event: { id: string; window: Window }) => void;
      },
    ): Promise<boolean>;
    setGap(gap: number | undefined): void;
    updateOptions(options: Partial<DockviewComponentOptions>): void;
    /**
     * Release resources and teardown component. Do not call when using framework versions of dockview.
     */
    dispose(): void;
  }

  interface PanelParameters<T extends {} = Parameters> {
    params: T;
  }

  interface IGroupPanelBaseProps<
    T extends {
      [index: string]: any;
    } = any,
  > extends PanelParameters<T> {
    api: DockviewPanelApi;
    containerApi: DockviewApi;
  }
  type IDockviewPanelHeaderProps<
    T extends {
      [index: string]: any;
    } = any,
  > = IGroupPanelBaseProps<T>;
  type IDockviewPanelProps<
    T extends {
      [index: string]: any;
    } = any,
  > = IGroupPanelBaseProps<T>;
  interface IDockviewHeaderActionsProps {
    api: DockviewGroupPanelApi;
    containerApi: DockviewApi;
    panels: IDockviewPanel[];
    activePanel: IDockviewPanel | undefined;
    isGroupActive: boolean;
    group: DockviewGroupPanel;
  }
  interface IGroupHeaderProps {
    api: DockviewGroupPanelApi;
    containerApi: DockviewApi;
    group: IDockviewGroupPanel;
  }
  interface IWatermarkPanelProps {
    containerApi: DockviewApi;
    group?: IDockviewGroupPanel;
  }
  interface DockviewReadyEvent {
    api: DockviewApi;
  }

  interface IHeaderActionsRenderer extends IDisposable {
    readonly element: HTMLElement;
    init(params: IGroupHeaderProps): void;
  }
  interface TabContextMenuEvent {
    event: MouseEvent;
    api: DockviewApi;
    panel: IDockviewPanel;
  }
  interface ViewFactoryData {
    content: string;
    tab?: string;
  }
  interface DockviewOptions {
    /**
     * Disable the auto-resizing which is controlled through a `ResizeObserver`.
     * Call `.layout(width, height)` to manually resize the container.
     */
    disableAutoResizing?: boolean;
    hideBorders?: boolean;
    singleTabMode?: 'fullwidth' | 'default';
    disableFloatingGroups?: boolean;
    floatingGroupBounds?:
      | 'boundedWithinViewport'
      | {
          minimumHeightWithinViewport?: number;
          minimumWidthWithinViewport?: number;
        };
    popoutUrl?: string;
    defaultRenderer?: DockviewPanelRenderer;
    debug?: boolean;
    rootOverlayModel?: DroptargetOverlayModel;
    locked?: boolean;
    disableDnd?: boolean;
    className?: string;
    /**
     * Pixel gap between groups
     */
    gap?: number;
    /**
     * Define the behaviour of the dock when there are no panels to display. Defaults to `watermark`.
     */
    noPanelsOverlay?: 'emptyGroup' | 'watermark';
  }
  interface DockviewDndOverlayEvent extends IAcceptableEvent {
    nativeEvent: DragEvent;
    target: DockviewGroupDropLocation;
    position: Position;
    group?: DockviewGroupPanel;
    getData: () => PanelTransfer | undefined;
  }
  declare class DockviewUnhandledDragOverEvent extends AcceptableEvent implements DockviewDndOverlayEvent {
    readonly nativeEvent: DragEvent;
    readonly target: DockviewGroupDropLocation;
    readonly position: Position;
    readonly getData: () => PanelTransfer | undefined;
    readonly group?: DockviewGroupPanel | undefined;
    constructor(
      nativeEvent: DragEvent,
      target: DockviewGroupDropLocation,
      position: Position,
      getData: () => PanelTransfer | undefined,
      group?: DockviewGroupPanel | undefined,
    );
  }
  declare const PROPERTY_KEYS_DOCKVIEW: (keyof DockviewOptions)[];
  interface CreateComponentOptions {
    /**
     * The unqiue identifer of the component
     */
    id: string;
    /**
     * The component name, this should determine what is rendered.
     */
    name: string;
  }
  interface DockviewFrameworkOptions {
    defaultTabComponent?: string;
    createRightHeaderActionComponent?: (group: DockviewGroupPanel) => IHeaderActionsRenderer;
    createLeftHeaderActionComponent?: (group: DockviewGroupPanel) => IHeaderActionsRenderer;
    createPrefixHeaderActionComponent?: (group: DockviewGroupPanel) => IHeaderActionsRenderer;
    createTabComponent?: (options: CreateComponentOptions) => ITabRenderer | undefined;
    createComponent: (options: CreateComponentOptions) => IContentRenderer;
    createWatermarkComponent?: () => IWatermarkRenderer;
  }
  type DockviewComponentOptions = DockviewOptions & DockviewFrameworkOptions;
  interface PanelOptions<P extends object = Parameters> {
    component: string;
    tabComponent?: string;
    params?: P;
    id: string;
    title?: string;
  }
  type RelativePanel = {
    direction?: Direction;
    referencePanel: string | IDockviewPanel;
    /**
     * The index to place the panel within a group, only applicable if the placement is within an existing group
     */
    index?: number;
  };
  type RelativeGroup = {
    direction?: Direction;
    referenceGroup: string | DockviewGroupPanel;
    /**
     * The index to place the panel within a group, only applicable if the placement is within an existing group
     */
    index?: number;
  };
  type AbsolutePosition = {
    direction: Omit<Direction, 'within'>;
  };
  type AddPanelPositionOptions = RelativePanel | RelativeGroup | AbsolutePosition;
  declare function isPanelOptionsWithPanel(data: AddPanelPositionOptions): data is RelativePanel;
  declare function isPanelOptionsWithGroup(data: AddPanelPositionOptions): data is RelativeGroup;
  type AddPanelFloatingGroupUnion = {
    floating: Partial<FloatingGroupOptions> | true;
    position: never;
  };
  type AddPanelPositionUnion = {
    floating: false;
    position: AddPanelPositionOptions;
  };
  type AddPanelOptionsUnion = AddPanelFloatingGroupUnion | AddPanelPositionUnion;
  type AddPanelOptions<P extends object = Parameters> = {
    params?: P;
    /**
     * The unique id for the panel
     */
    id: string;
    /**
     * The title for the panel which can be accessed within both the tab and component.
     *
     * If using the default tab renderer this title will be displayed in the tab.
     */
    title?: string;
    /**
     * The id of the component renderer
     */
    component: string;
    /**
     * The id of the tab componnet renderer
     */
    tabComponent?: string;
    /**
     * The rendering mode of the panel.
     *
     * This dictates what happens to the HTML of the panel when it is hidden.
     */
    renderer?: DockviewPanelRenderer;
    /**
     * If true then add the panel without setting it as the active panel.
     *
     * Defaults to `false` which forces newly added panels to become active.
     */
    inactive?: boolean;
    initialWidth?: number;
    initialHeight?: number;
  } & Partial<AddPanelOptionsUnion> &
    Partial<Contraints>;
  type AddGroupOptionsWithPanel = {
    referencePanel: string | IDockviewPanel;
    direction?: Omit<Direction, 'within'>;
  };
  type AddGroupOptionsWithGroup = {
    referenceGroup: string | DockviewGroupPanel;
    direction?: Omit<Direction, 'within'>;
  };
  type AddGroupOptions = (AddGroupOptionsWithGroup | AddGroupOptionsWithPanel | AbsolutePosition) & GroupOptions;
  declare function isGroupOptionsWithPanel(data: AddGroupOptions): data is AddGroupOptionsWithPanel;
  declare function isGroupOptionsWithGroup(data: AddGroupOptions): data is AddGroupOptionsWithGroup;
  interface MovementOptions2 {
    group?: IGridView;
  }
  interface MovementOptions extends MovementOptions2 {
    includePanel?: boolean;
    group?: DockviewGroupPanel;
  }

  interface PanelViewInitParameters extends PanelInitParameters {
    minimumSize?: number;
    maximumSize?: number;
    snap?: boolean;
    priority?: LayoutPriority;
    accessor: SplitviewComponent;
  }
  interface SplitviewOptions extends SplitViewOptions {
    disableAutoResizing?: boolean;
    className?: string;
  }
  interface SplitviewFrameworkOptions {
    createComponent: (options: CreateComponentOptions) => SplitviewPanel;
  }
  type SplitviewComponentOptions = SplitviewOptions & SplitviewFrameworkOptions;
  declare const PROPERTY_KEYS_SPLITVIEW: (keyof SplitviewOptions)[];

  interface IContentContainer extends IDisposable {
    readonly dropTarget: Droptarget;
    onDidFocus: Event<void>;
    onDidBlur: Event<void>;
    element: HTMLElement;
    layout(width: number, height: number): void;
    openPanel: (panel: IDockviewPanel) => void;
    closePanel: () => void;
    show(): void;
    hide(): void;
    renderPanel(
      panel: IDockviewPanel,
      options: {
        asActive: boolean;
      },
    ): void;
  }
  declare class ContentContainer extends CompositeDisposable implements IContentContainer {
    private readonly accessor;
    private readonly group;
    private readonly _element;
    private panel;
    private readonly disposable;
    private readonly _onDidFocus;
    readonly onDidFocus: Event<void>;
    private readonly _onDidBlur;
    readonly onDidBlur: Event<void>;
    get element(): HTMLElement;
    readonly dropTarget: Droptarget;
    constructor(accessor: DockviewComponent, group: DockviewGroupPanelModel);
    show(): void;
    hide(): void;
    renderPanel(
      panel: IDockviewPanel,
      options?: {
        asActive: boolean;
      },
    ): void;
    openPanel(panel: IDockviewPanel): void;
    layout(_width: number, _height: number): void;
    closePanel(): void;
    dispose(): void;
  }

  declare class DefaultTab extends CompositeDisposable implements ITabRenderer {
    private readonly _element;
    private readonly _content;
    private readonly action;
    private _title;
    get element(): HTMLElement;
    constructor();
    init(params: GroupPanelPartInitParameters): void;
    private render;
  }

  declare function createDockview(element: HTMLElement, options: DockviewComponentOptions): DockviewApi;
  declare function createSplitview(element: HTMLElement, options: SplitviewComponentOptions): SplitviewApi;
  declare function createGridview(element: HTMLElement, options: GridviewComponentOptions): GridviewApi;
  declare function createPaneview(element: HTMLElement, options: PaneviewComponentOptions): PaneviewApi;

  export {
    BaseGrid,
    ContentContainer,
    DefaultDockviewDeserialzier,
    DefaultTab,
    DockviewApi,
    DockviewComponent,
    CompositeDisposable as DockviewCompositeDisposable,
    DockviewDidDropEvent,
    Disposable as DockviewDisposable,
    Emitter as DockviewEmitter,
    Event as DockviewEvent,
    DockviewGroupPanel,
    DockviewGroupPanelModel,
    MutableDisposable as DockviewMutableDisposable,
    DockviewPanel,
    DockviewUnhandledDragOverEvent,
    DockviewWillDropEvent,
    DraggablePaneviewPanel,
    Gridview,
    GridviewApi,
    GridviewComponent,
    GridviewPanel,
    LayoutPriority,
    Orientation,
    PROPERTY_KEYS_DOCKVIEW,
    PROPERTY_KEYS_GRIDVIEW,
    PROPERTY_KEYS_PANEVIEW,
    PROPERTY_KEYS_SPLITVIEW,
    PaneFramework,
    PaneTransfer,
    PanelTransfer,
    Paneview,
    PaneviewApi,
    PaneviewComponent,
    PaneviewPanel,
    PaneviewUnhandledDragOverEvent,
    SashState,
    Sizing,
    Splitview,
    SplitviewApi,
    SplitviewComponent,
    SplitviewPanel,
    Tab,
    WillShowOverlayLocationEvent,
    createDockview,
    createGridview,
    createPaneview,
    createSplitview,
    directionToPosition,
    getDirectionOrientation,
    getGridLocation,
    getLocationOrientation,
    getPaneData,
    getPanelData,
    getRelativeLocation,
    indexInParent,
    isGridBranchNode,
    isGroupOptionsWithGroup,
    isGroupOptionsWithPanel,
    isPanelOptionsWithGroup,
    isPanelOptionsWithPanel,
    orthogonal,
    positionToDirection,
    toTarget,
  };
  export type {
    ActiveEvent,
    AddComponentOptions,
    AddGroupOptions,
    AddPanelOptions,
    AddPanelPositionOptions,
    AddPaneviewComponentOptions,
    AddSplitviewComponentOptions,
    BaseComponentOptions,
    BaseGridOptions,
    CommonApi,
    Contraints,
    CreateComponentOptions,
    Direction,
    DistributeSizing,
    DockviewComponentOptions,
    DockviewDndOverlayEvent,
    DockviewFrameworkOptions,
    DockviewGroupChangeEvent,
    DockviewGroupDropLocation,
    DockviewGroupLocation,
    DockviewGroupMoveParams,
    DockviewGroupPanelApi,
    DockviewGroupPanelFloatingChangeEvent,
    DockviewGroupPanelLocked,
    IDisposable as DockviewIDisposable,
    DockviewMaximizedGroupChanged,
    DockviewOptions,
    DockviewPanelApi,
    DockviewPanelMoveParams,
    DockviewPanelRenderer,
    DockviewPopoutGroupOptions,
    DockviewReadyEvent,
    DroptargetOverlayModel,
    ExpansionEvent,
    FloatingGroupOptions,
    FloatingGroupOptionsInternal,
    FocusEvent,
    GridBranchNode,
    GridConstraintChangeEvent,
    GridLeafNode,
    GridNode,
    GridPanelViewState,
    GridviewComponentOptions,
    GridviewFrameworkOptions,
    GridviewInitParameters,
    GridviewOptions,
    GridviewPanelApi,
    GroupDragEvent,
    GroupOptions,
    GroupPanelPartInitParameters,
    GroupPanelViewState,
    GroupviewPanelState,
    HeaderPartInitParameters,
    IBaseGrid,
    IBaseView,
    IContentContainer,
    IContentRenderer,
    IDockviewComponent,
    IDockviewGroupPanel,
    IDockviewGroupPanelModel,
    IDockviewGroupPanelPublic,
    IDockviewHeaderActionsProps,
    IDockviewPanel,
    IDockviewPanelHeaderProps,
    IDockviewPanelProps,
    IFrameworkPart,
    IGridPanelComponentView,
    IGridPanelView,
    IGridView,
    IGridviewComponent,
    IGridviewPanel,
    IGroupHeaderProps,
    IGroupPanelBaseProps,
    IGroupPanelInitParameters,
    IHeader,
    IHeaderActionsRenderer,
    INodeDescriptor,
    IPanePart,
    IPanel,
    IPanelDeserializer,
    IPaneview,
    IPaneviewComponent,
    IPaneviewPanel,
    ISerializedBranchNode,
    ISerializedLeafNode,
    ISerializedNode,
    ISplitViewDescriptor,
    ISplitviewComponent,
    ISplitviewPanel,
    ISplitviewStyles,
    ITabRenderer,
    IView,
    IViewDeserializer,
    IViewSize,
    IWatermarkPanelProps,
    IWatermarkRenderer,
    InvisibleSizing,
    MaximizedChanged,
    MaximizedViewChanged,
    MeasuredValue,
    MovePanelEvent,
    MovementOptions,
    MovementOptions2,
    PanePanelComponentInitParameter,
    PanePanelInitParameter,
    PanePanelViewState,
    PanelApi,
    PanelConstraintChangeEvent,
    PanelDimensionChangeEvent,
    PanelInitParameters,
    PanelOptions,
    PanelReference,
    PanelSizeEvent,
    PanelUpdateEvent,
    PanelViewInitParameters,
    PaneviewComponentOptions,
    PaneviewDndOverlayEvent,
    PaneviewDidDropEvent as PaneviewDropEvent,
    PaneviewFrameworkOptions,
    PaneviewOptions,
    PaneviewPanelApi,
    Parameters,
    Position,
    RendererChangedEvent,
    SerializedDockview,
    SerializedFloatingGroup,
    SerializedGridObject,
    SerializedGridview,
    SerializedGridviewComponent,
    SerializedNodeDescriptor,
    SerializedPaneview,
    SerializedPaneviewPanel,
    SerializedPopoutGroup,
    SerializedSplitview,
    SerializedSplitviewPanel,
    SerializedSplitviewPanelData,
    SizeEvent,
    SplitSizing,
    SplitViewOptions,
    SplitviewComponentOptions,
    SplitviewFrameworkOptions,
    SplitviewOptions,
    SplitviewPanelApi,
    TabContextMenuEvent,
    TabDragEvent,
    TitleEvent,
    ViewFactoryData,
    VisibilityEvent,
    WatermarkRendererInitParameters,
  };
}
