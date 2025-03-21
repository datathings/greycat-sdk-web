declare module '@shoelace-style/shoelace' {
import * as lit_html from 'lit-html';
import { LitElement } from 'lit';
import type { CSSResultGroup, HTMLTemplateResult, PropertyValueMap, ReactiveController, ReactiveControllerHost, TemplateResult } from 'lit';

type EventTypeRequiresDetail<T> = T extends keyof GlobalEventHandlersEventMap ? GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, unknown>> ? GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, never>> ? never : Partial<GlobalEventHandlersEventMap[T]['detail']> extends GlobalEventHandlersEventMap[T]['detail'] ? never : T : never : never;
type EventTypeDoesNotRequireDetail<T> = T extends keyof GlobalEventHandlersEventMap ? GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, unknown>> ? GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, never>> ? T : Partial<GlobalEventHandlersEventMap[T]['detail']> extends GlobalEventHandlersEventMap[T]['detail'] ? T : never : T : T;
type EventTypesWithRequiredDetail = {
    [EventType in keyof GlobalEventHandlersEventMap as EventTypeRequiresDetail<EventType>]: true;
};
type EventTypesWithoutRequiredDetail = {
    [EventType in keyof GlobalEventHandlersEventMap as EventTypeDoesNotRequireDetail<EventType>]: true;
};
type WithRequired<T, K extends keyof T> = T & {
    [P in K]-?: T[P];
};
type SlEventInit<T> = T extends keyof GlobalEventHandlersEventMap ? GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, unknown>> ? GlobalEventHandlersEventMap[T] extends CustomEvent<Record<PropertyKey, never>> ? CustomEventInit<GlobalEventHandlersEventMap[T]['detail']> : Partial<GlobalEventHandlersEventMap[T]['detail']> extends GlobalEventHandlersEventMap[T]['detail'] ? CustomEventInit<GlobalEventHandlersEventMap[T]['detail']> : WithRequired<CustomEventInit<GlobalEventHandlersEventMap[T]['detail']>, 'detail'> : CustomEventInit : CustomEventInit;
type GetCustomEventType<T> = T extends keyof GlobalEventHandlersEventMap ? GlobalEventHandlersEventMap[T] extends CustomEvent<unknown> ? GlobalEventHandlersEventMap[T] : CustomEvent<unknown> : CustomEvent<unknown>;
declare class ShoelaceElement extends LitElement {
    #private;
    dir: string;
    lang: string;
    /** Emits a custom event with more convenient defaults. */
    emit<T extends string & keyof EventTypesWithoutRequiredDetail>(name: EventTypeDoesNotRequireDetail<T>, options?: SlEventInit<T> | undefined): GetCustomEventType<T>;
    emit<T extends string & keyof EventTypesWithRequiredDetail>(name: EventTypeRequiresDetail<T>, options: SlEventInit<T>): GetCustomEventType<T>;
    static version: any;
    static define(name: string, elementConstructor?: typeof ShoelaceElement, options?: ElementDefinitionOptions): void;
    static dependencies: Record<string, typeof ShoelaceElement>;
    constructor();
    initialReflectedProperties: Map<string, unknown>;
    attributeChangedCallback(name: string, oldValue: string | null, newValue: string | null): void;
    protected willUpdate(changedProperties: Parameters<LitElement['willUpdate']>[0]): void;
}
interface ShoelaceFormControl extends ShoelaceElement {
    name: string;
    value: unknown;
    disabled?: boolean;
    defaultValue?: unknown;
    defaultChecked?: boolean;
    form?: string;
    pattern?: string;
    min?: number | string | Date;
    max?: number | string | Date;
    step?: number | 'any';
    required?: boolean;
    minlength?: number;
    maxlength?: number;
    readonly validity: ValidityState;
    readonly validationMessage: string;
    checkValidity: () => boolean;
    getForm: () => HTMLFormElement | null;
    reportValidity: () => boolean;
    setCustomValidity: (message: string) => void;
}





/**
 * @summary Icons are symbols that can be used to represent various options within an application.
 * @documentation https://shoelace.style/components/icon
 * @status stable
 * @since 2.0
 *
 * @event sl-load - Emitted when the icon has loaded. When using `spriteSheet: true` this will not emit.
 * @event sl-error - Emitted when the icon fails to load due to an error. When using `spriteSheet: true` this will not emit.
 *
 * @csspart svg - The internal SVG element.
 * @csspart use - The <use> element generated when using `spriteSheet: true`
 */
declare class SlIcon extends ShoelaceElement {
    static styles: CSSResultGroup;
    private initialRender;
    /** Given a URL, this function returns the resulting SVG element or an appropriate error symbol. */
    private resolveIcon;
    private svg;
    /** The name of the icon to draw. Available names depend on the icon library being used. */
    name?: string;
    /**
     * An external URL of an SVG file. Be sure you trust the content you are including, as it will be executed as code and
     * can result in XSS attacks.
     */
    src?: string;
    /**
     * An alternate description to use for assistive devices. If omitted, the icon will be considered presentational and
     * ignored by assistive devices.
     */
    label: string;
    /** The name of a registered custom icon library. */
    library: string;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    private getIconSource;
    handleLabelChange(): void;
    setIcon(): Promise<void>;
    render(): SVGElement | HTMLTemplateResult | null;
}



/**
 * @summary Icons buttons are simple, icon-only buttons that can be used for actions and in toolbars.
 * @documentation https://shoelace.style/components/icon-button
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 *
 * @event sl-blur - Emitted when the icon button loses focus.
 * @event sl-focus - Emitted when the icon button gains focus.
 *
 * @csspart base - The component's base wrapper.
 */
declare class SlIconButton extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon': typeof SlIcon;
    };
    button: HTMLButtonElement | HTMLLinkElement;
    private hasFocus;
    /** The name of the icon to draw. Available names depend on the icon library being used. */
    name?: string;
    /** The name of a registered custom icon library. */
    library?: string;
    /**
     * An external URL of an SVG file. Be sure you trust the content you are including, as it will be executed as code and
     * can result in XSS attacks.
     */
    src?: string;
    /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
    href?: string;
    /** Tells the browser where to open the link. Only used when `href` is set. */
    target?: '_blank' | '_parent' | '_self' | '_top';
    /** Tells the browser to download the linked file as this filename. Only used when `href` is set. */
    download?: string;
    /**
     * A description that gets read by assistive devices. For optimal accessibility, you should always include a label
     * that describes what the icon button does.
     */
    label: string;
    /** Disables the button. */
    disabled: boolean;
    private handleBlur;
    private handleFocus;
    private handleClick;
    /** Simulates a click on the icon button. */
    click(): void;
    /** Sets focus on the icon button. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the icon button. */
    blur(): void;
    render(): lit_html.TemplateResult;
}



/**
 * @summary Alerts are used to display important messages inline or as toast notifications.
 * @documentation https://shoelace.style/components/alert
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon-button
 *
 * @slot - The alert's main content.
 * @slot icon - An icon to show in the alert. Works best with `<sl-icon>`.
 *
 * @event sl-show - Emitted when the alert opens.
 * @event sl-after-show - Emitted after the alert opens and all animations are complete.
 * @event sl-hide - Emitted when the alert closes.
 * @event sl-after-hide - Emitted after the alert closes and all animations are complete.
 *
 * @csspart base - The component's base wrapper.
 * @csspart icon - The container that wraps the optional icon.
 * @csspart message - The container that wraps the alert's main content.
 * @csspart close-button - The close button, an `<sl-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 *
 * @animation alert.show - The animation to use when showing the alert.
 * @animation alert.hide - The animation to use when hiding the alert.
 */
declare class SlAlert extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon-button': typeof SlIconButton;
    };
    private autoHideTimeout;
    private remainingTimeInterval;
    private countdownAnimation?;
    private readonly hasSlotController;
    private readonly localize;
    private static currentToastStack;
    private static get toastStack();
    base: HTMLElement;
    countdownElement: HTMLElement;
    /**
     * Indicates whether or not the alert is open. You can toggle this attribute to show and hide the alert, or you can
     * use the `show()` and `hide()` methods and this attribute will reflect the alert's open state.
     */
    open: boolean;
    /** Enables a close button that allows the user to dismiss the alert. */
    closable: boolean;
    /** The alert's theme variant. */
    variant: 'primary' | 'success' | 'neutral' | 'warning' | 'danger';
    /**
     * The length of time, in milliseconds, the alert will show before closing itself. If the user interacts with
     * the alert before it closes (e.g. moves the mouse over it), the timer will restart. Defaults to `Infinity`, meaning
     * the alert will not close on its own.
     */
    duration: number;
    /**
     * Enables a countdown that indicates the remaining time the alert will be displayed.
     * Typically used to indicate the remaining time before a whole app refresh.
     */
    countdown?: 'rtl' | 'ltr';
    private remainingTime;
    firstUpdated(): void;
    private restartAutoHide;
    private pauseAutoHide;
    private resumeAutoHide;
    private handleCountdownChange;
    private handleCloseClick;
    handleOpenChange(): Promise<void>;
    handleDurationChange(): void;
    /** Shows the alert. */
    show(): Promise<void>;
    /** Hides the alert */
    hide(): Promise<void>;
    /**
     * Displays the alert as a toast notification. This will move the alert out of its position in the DOM and, when
     * dismissed, it will be removed from the DOM completely. By storing a reference to the alert, you can reuse it by
     * calling this method again. The returned promise will resolve after the alert is hidden.
     */
    toast(): Promise<void>;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-alert': SlAlert;
    }
};



/**
 * @summary A component for displaying animated GIFs and WEBPs that play and pause on interaction.
 * @documentation https://shoelace.style/components/animated-image
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 *
 * @event sl-load - Emitted when the image loads successfully.
 * @event sl-error - Emitted when the image fails to load.
 *
 * @slot play-icon - Optional play icon to use instead of the default. Works best with `<sl-icon>`.
 * @slot pause-icon - Optional pause icon to use instead of the default. Works best with `<sl-icon>`.
 *
 * @part control-box - The container that surrounds the pause/play icons and provides their background.
 *
 * @cssproperty --control-box-size - The size of the icon box.
 * @cssproperty --icon-size - The size of the play/pause icons.
 */
declare class SlAnimatedImage extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon': typeof SlIcon;
    };
    animatedImage: HTMLImageElement;
    frozenFrame: string;
    isLoaded: boolean;
    /** The path to the image to load. */
    src: string;
    /** A description of the image used by assistive devices. */
    alt: string;
    /** Plays the animation. When this attribute is remove, the animation will pause. */
    play: boolean;
    private handleClick;
    private handleLoad;
    private handleError;
    handlePlayChange(): void;
    handleSrcChange(): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-animated-image': SlAnimatedImage;
    }
};



/**
 * @summary Animate elements declaratively with nearly 100 baked-in presets, or roll your own with custom keyframes. Powered by the [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API).
 * @documentation https://shoelace.style/components/animation
 * @status stable
 * @since 2.0
 *
 * @event sl-cancel - Emitted when the animation is canceled.
 * @event sl-finish - Emitted when the animation finishes.
 * @event sl-start - Emitted when the animation starts or restarts.
 *
 * @slot - The element to animate. Avoid slotting in more than one element, as subsequent ones will be ignored. To
 *  animate multiple elements, either wrap them in a single container or use multiple `<sl-animation>` elements.
 */
declare class SlAnimation extends ShoelaceElement {
    static styles: CSSResultGroup;
    private animation?;
    private hasStarted;
    defaultSlot: Promise<HTMLSlotElement>;
    /** The name of the built-in animation to use. For custom animations, use the `keyframes` prop. */
    name: string;
    /**
     * Plays the animation. When omitted, the animation will be paused. This attribute will be automatically removed when
     * the animation finishes or gets canceled.
     */
    play: boolean;
    /** The number of milliseconds to delay the start of the animation. */
    delay: number;
    /**
     * Determines the direction of playback as well as the behavior when reaching the end of an iteration.
     * [Learn more](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction)
     */
    direction: PlaybackDirection;
    /** The number of milliseconds each iteration of the animation takes to complete. */
    duration: number;
    /**
     * The easing function to use for the animation. This can be a Shoelace easing function or a custom easing function
     * such as `cubic-bezier(0, 1, .76, 1.14)`.
     */
    easing: string;
    /** The number of milliseconds to delay after the active period of an animation sequence. */
    endDelay: number;
    /** Sets how the animation applies styles to its target before and after its execution. */
    fill: FillMode;
    /** The number of iterations to run before the animation completes. Defaults to `Infinity`, which loops. */
    iterations: number;
    /** The offset at which to start the animation, usually between 0 (start) and 1 (end). */
    iterationStart: number;
    /** The keyframes to use for the animation. If this is set, `name` will be ignored. */
    keyframes?: Keyframe[];
    /**
     * Sets the animation's playback rate. The default is `1`, which plays the animation at a normal speed. Setting this
     * to `2`, for example, will double the animation's speed. A negative value can be used to reverse the animation. This
     * value can be changed without causing the animation to restart.
     */
    playbackRate: number;
    /** Gets and sets the current animation time. */
    get currentTime(): CSSNumberish;
    set currentTime(time: number);
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleAnimationFinish;
    private handleAnimationCancel;
    private handleSlotChange;
    private createAnimation;
    private destroyAnimation;
    handleAnimationChange(): void;
    handlePlayChange(): boolean;
    handlePlaybackRateChange(): void;
    /** Clears all keyframe effects caused by this animation and aborts its playback. */
    cancel(): void;
    /** Sets the playback time to the end of the animation corresponding to the current playback direction. */
    finish(): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-animation': SlAnimation;
    }
};



/**
 * @summary Avatars are used to represent a person or object.
 * @documentation https://shoelace.style/components/avatar
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 *
 * @event sl-error - The image could not be loaded. This may because of an invalid URL, a temporary network condition, or some
 * unknown cause.
 *
 * @slot icon - The default icon to use when no image or initials are present. Works best with `<sl-icon>`.
 *
 * @csspart base - The component's base wrapper.
 * @csspart icon - The container that wraps the avatar's icon.
 * @csspart initials - The container that wraps the avatar's initials.
 * @csspart image - The avatar image. Only shown when the `image` attribute is set.
 *
 * @cssproperty --size - The size of the avatar.
 */
declare class SlAvatar extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon': typeof SlIcon;
    };
    private hasError;
    /** The image source to use for the avatar. */
    image: string;
    /** A label to use to describe the avatar to assistive devices. */
    label: string;
    /** Initials to use as a fallback when no image is available (1-2 characters max recommended). */
    initials: string;
    /** Indicates how the browser should load the image. */
    loading: 'eager' | 'lazy';
    /** The shape of the avatar. */
    shape: 'circle' | 'square' | 'rounded';
    handleImageChange(): void;
    private handleImageLoadError;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-avatar': SlAvatar;
    }
};



/**
 * @summary Badges are used to draw attention and display statuses or counts.
 * @documentation https://shoelace.style/components/badge
 * @status stable
 * @since 2.0
 *
 * @slot - The badge's content.
 *
 * @csspart base - The component's base wrapper.
 */
declare class SlBadge extends ShoelaceElement {
    static styles: CSSResultGroup;
    /** The badge's theme variant. */
    variant: 'primary' | 'success' | 'neutral' | 'warning' | 'danger';
    /** Draws a pill-style badge with rounded edges. */
    pill: boolean;
    /** Makes the badge pulsate to draw attention. */
    pulse: boolean;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-badge': SlBadge;
    }
};



/**
 * @summary Breadcrumbs provide a group of links so users can easily navigate a website's hierarchy.
 * @documentation https://shoelace.style/components/breadcrumb
 * @status stable
 * @since 2.0
 *
 * @slot - One or more breadcrumb items to display.
 * @slot separator - The separator to use between breadcrumb items. Works best with `<sl-icon>`.
 *
 * @dependency sl-icon
 *
 * @csspart base - The component's base wrapper.
 */
declare class SlBreadcrumb extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon': typeof SlIcon;
    };
    private readonly localize;
    private separatorDir;
    defaultSlot: HTMLSlotElement;
    separatorSlot: HTMLSlotElement;
    /**
     * The label to use for the breadcrumb control. This will not be shown on the screen, but it will be announced by
     * screen readers and other assistive devices to provide more context for users.
     */
    label: string;
    private getSeparator;
    private handleSlotChange;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-breadcrumb': SlBreadcrumb;
    }
};



/**
 * @summary Breadcrumb Items are used inside [breadcrumbs](/components/breadcrumb) to represent different links.
 * @documentation https://shoelace.style/components/breadcrumb-item
 * @status stable
 * @since 2.0
 *
 * @slot - The breadcrumb item's label.
 * @slot prefix - An optional prefix, usually an icon or icon button.
 * @slot suffix - An optional suffix, usually an icon or icon button.
 * @slot separator - The separator to use for the breadcrumb item. This will only change the separator for this item. If
 * you want to change it for all items in the group, set the separator on `<sl-breadcrumb>` instead.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The breadcrumb item's label.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart separator - The container that wraps the separator.
 */
declare class SlBreadcrumbItem extends ShoelaceElement {
    static styles: CSSResultGroup;
    private readonly hasSlotController;
    defaultSlot: HTMLSlotElement;
    private renderType;
    /**
     * Optional URL to direct the user to when the breadcrumb item is activated. When set, a link will be rendered
     * internally. When unset, a button will be rendered instead.
     */
    href?: string;
    /** Tells the browser where to open the link. Only used when `href` is set. */
    target?: '_blank' | '_parent' | '_self' | '_top';
    /** The `rel` attribute to use on the link. Only used when `href` is set. */
    rel: string;
    private setRenderType;
    hrefChanged(): void;
    handleSlotChange(): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-breadcrumb-item': SlBreadcrumbItem;
    }
};



/**
 * @summary Spinners are used to show the progress of an indeterminate operation.
 * @documentation https://shoelace.style/components/spinner
 * @status stable
 * @since 2.0
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --track-width - The width of the track.
 * @cssproperty --track-color - The color of the track.
 * @cssproperty --indicator-color - The color of the spinner's indicator.
 * @cssproperty --speed - The time it takes for the spinner to complete one animation cycle.
 */
declare class SlSpinner extends ShoelaceElement {
    static styles: CSSResultGroup;
    private readonly localize;
    render(): lit_html.TemplateResult<1>;
}




/**
 * @summary Buttons represent actions that are available to the user.
 * @documentation https://shoelace.style/components/button
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 * @dependency sl-spinner
 *
 * @event sl-blur - Emitted when the button loses focus.
 * @event sl-focus - Emitted when the button gains focus.
 * @event sl-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @slot - The button's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @csspart base - The component's base wrapper.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart label - The button's label.
 * @csspart suffix - The container that wraps the suffix.
 * @csspart caret - The button's caret icon, an `<sl-icon>` element.
 * @csspart spinner - The spinner that shows when the button is in the loading state.
 */
declare class SlButton extends ShoelaceElement implements ShoelaceFormControl {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon': typeof SlIcon;
        'sl-spinner': typeof SlSpinner;
    };
    private readonly formControlController;
    private readonly hasSlotController;
    private readonly localize;
    button: HTMLButtonElement | HTMLLinkElement;
    private hasFocus;
    invalid: boolean;
    title: string;
    /** The button's theme variant. */
    variant: 'default' | 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text';
    /** The button's size. */
    size: 'small' | 'medium' | 'large';
    /** Draws the button with a caret. Used to indicate that the button triggers a dropdown menu or similar behavior. */
    caret: boolean;
    /** Disables the button. */
    disabled: boolean;
    /** Draws the button in a loading state. */
    loading: boolean;
    /** Draws an outlined button. */
    outline: boolean;
    /** Draws a pill-style button with rounded edges. */
    pill: boolean;
    /**
     * Draws a circular icon button. When this attribute is present, the button expects a single `<sl-icon>` in the
     * default slot.
     */
    circle: boolean;
    /**
     * The type of button. Note that the default value is `button` instead of `submit`, which is opposite of how native
     * `<button>` elements behave. When the type is `submit`, the button will submit the surrounding form.
     */
    type: 'button' | 'submit' | 'reset';
    /**
     * The name of the button, submitted as a name/value pair with form data, but only when this button is the submitter.
     * This attribute is ignored when `href` is present.
     */
    name: string;
    /**
     * The value of the button, submitted as a pair with the button's name as part of the form data, but only when this
     * button is the submitter. This attribute is ignored when `href` is present.
     */
    value: string;
    /** When set, the underlying button will be rendered as an `<a>` with this `href` instead of a `<button>`. */
    href: string;
    /** Tells the browser where to open the link. Only used when `href` is present. */
    target: '_blank' | '_parent' | '_self' | '_top';
    /**
     * When using `href`, this attribute will map to the underlying link's `rel` attribute. Unlike regular links, the
     * default is `noreferrer noopener` to prevent security exploits. However, if you're using `target` to point to a
     * specific tab/window, this will prevent that from working correctly. You can remove or change the default value by
     * setting the attribute to an empty string or a value of your choice, respectively.
     */
    rel: string;
    /** Tells the browser to download the linked file as this filename. Only used when `href` is present. */
    download?: string;
    /**
     * The "form owner" to associate the button with. If omitted, the closest containing form will be used instead. The
     * value of this attribute must be an id of a form in the same document or shadow root as the button.
     */
    form: string;
    /** Used to override the form owner's `action` attribute. */
    formAction: string;
    /** Used to override the form owner's `enctype` attribute.  */
    formEnctype: 'application/x-www-form-urlencoded' | 'multipart/form-data' | 'text/plain';
    /** Used to override the form owner's `method` attribute.  */
    formMethod: 'post' | 'get';
    /** Used to override the form owner's `novalidate` attribute. */
    formNoValidate: boolean;
    /** Used to override the form owner's `target` attribute. */
    formTarget: '_self' | '_blank' | '_parent' | '_top' | string;
    /** Gets the validity state object */
    get validity(): ValidityState;
    /** Gets the validation message */
    get validationMessage(): string;
    firstUpdated(): void;
    private handleBlur;
    private handleFocus;
    private handleClick;
    private handleInvalid;
    private isButton;
    private isLink;
    handleDisabledChange(): void;
    /** Simulates a click on the button. */
    click(): void;
    /** Sets focus on the button. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the button. */
    blur(): void;
    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity(): boolean;
    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null;
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity(): boolean;
    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message: string): void;
    render(): lit_html.TemplateResult;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-button': SlButton;
    }
};



/**
 * @summary Button groups can be used to group related buttons into sections.
 * @documentation https://shoelace.style/components/button-group
 * @status stable
 * @since 2.0
 *
 * @slot - One or more `<sl-button>` elements to display in the button group.
 *
 * @csspart base - The component's base wrapper.
 */
declare class SlButtonGroup extends ShoelaceElement {
    static styles: CSSResultGroup;
    defaultSlot: HTMLSlotElement;
    disableRole: boolean;
    /**
     * A label to use for the button group. This won't be displayed on the screen, but it will be announced by assistive
     * devices when interacting with the control and is strongly recommended.
     */
    label: string;
    private handleFocus;
    private handleBlur;
    private handleMouseOver;
    private handleMouseOut;
    private handleSlotChange;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-button-group': SlButtonGroup;
    }
};



/**
 * @summary Cards can be used to group related subjects in a container.
 * @documentation https://shoelace.style/components/card
 * @status stable
 * @since 2.0
 *
 * @slot - The card's main content.
 * @slot header - An optional header for the card.
 * @slot footer - An optional footer for the card.
 * @slot image - An optional image to render at the start of the card.
 *
 * @csspart base - The component's base wrapper.
 * @csspart image - The container that wraps the card's image.
 * @csspart header - The container that wraps the card's header.
 * @csspart body - The container that wraps the card's main content.
 * @csspart footer - The container that wraps the card's footer.
 *
 * @cssproperty --border-color - The card's border color, including borders that occur inside the card.
 * @cssproperty --border-radius - The border radius for the card's edges.
 * @cssproperty --border-width - The width of the card's borders.
 * @cssproperty --padding - The padding to use for the card's sections.
 */
declare class SlCard extends ShoelaceElement {
    static styles: CSSResultGroup;
    private readonly hasSlotController;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-card': SlCard;
    }
};





/**
 * @summary Carousels display an arbitrary number of content slides along a horizontal or vertical axis.
 *
 * @since 2.2
 * @status experimental
 *
 * @dependency sl-icon
 *
 * @event {{ index: number, slide: SlCarouselItem }} sl-slide-change - Emitted when the active slide changes.
 *
 * @slot - The carousel's main content, one or more `<sl-carousel-item>` elements.
 * @slot next-icon - Optional next icon to use instead of the default. Works best with `<sl-icon>`.
 * @slot previous-icon - Optional previous icon to use instead of the default. Works best with `<sl-icon>`.
 *
 * @csspart base - The carousel's internal wrapper.
 * @csspart scroll-container - The scroll container that wraps the slides.
 * @csspart pagination - The pagination indicators wrapper.
 * @csspart pagination-item - The pagination indicator.
 * @csspart pagination-item--active - Applied when the item is active.
 * @csspart navigation - The navigation wrapper.
 * @csspart navigation-button - The navigation button.
 * @csspart navigation-button--previous - Applied to the previous button.
 * @csspart navigation-button--next - Applied to the next button.
 *
 * @cssproperty --slide-gap - The space between each slide.
 * @cssproperty [--aspect-ratio=16/9] - The aspect ratio of each slide.
 * @cssproperty --scroll-hint - The amount of padding to apply to the scroll area, allowing adjacent slides to become
 *  partially visible as a scroll hint.
 */
declare class SlCarousel extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon': typeof SlIcon;
    };
    /** When set, allows the user to navigate the carousel in the same direction indefinitely. */
    loop: boolean;
    /** When set, show the carousel's navigation. */
    navigation: boolean;
    /** When set, show the carousel's pagination indicators. */
    pagination: boolean;
    /** When set, the slides will scroll automatically when the user is not interacting with them.  */
    autoplay: boolean;
    /** Specifies the amount of time, in milliseconds, between each automatic scroll.  */
    autoplayInterval: number;
    /** Specifies how many slides should be shown at a given time.  */
    slidesPerPage: number;
    /**
     * Specifies the number of slides the carousel will advance when scrolling, useful when specifying a `slides-per-page`
     * greater than one. It can't be higher than `slides-per-page`.
     */
    slidesPerMove: number;
    /** Specifies the orientation in which the carousel will lay out.  */
    orientation: 'horizontal' | 'vertical';
    /** When set, it is possible to scroll through the slides by dragging them with the mouse. */
    mouseDragging: boolean;
    scrollContainer: HTMLElement;
    paginationContainer: HTMLElement;
    activeSlide: number;
    scrolling: boolean;
    dragging: boolean;
    private autoplayController;
    private dragStartPosition;
    private readonly localize;
    private mutationObserver;
    private pendingSlideChange;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected firstUpdated(): void;
    protected willUpdate(changedProperties: PropertyValueMap<SlCarousel> | Map<PropertyKey, unknown>): void;
    private getPageCount;
    private getCurrentPage;
    private canScrollNext;
    private canScrollPrev;
    /** @internal Gets all carousel items. */
    private getSlides;
    private handleClick;
    private handleKeyDown;
    private handleMouseDragStart;
    private handleMouseDrag;
    private handleMouseDragEnd;
    private handleScroll;
    /** @internal Synchronizes the slides with the IntersectionObserver API. */
    private synchronizeSlides;
    private handleScrollEnd;
    private isCarouselItem;
    private handleSlotChange;
    initializeSlides(): void;
    private createClones;
    handleSlideChange(): void;
    updateSlidesSnap(): void;
    handleAutoplayChange(): void;
    /**
     * Move the carousel backward by `slides-per-move` slides.
     *
     * @param behavior - The behavior used for scrolling.
     */
    previous(behavior?: ScrollBehavior): void;
    /**
     * Move the carousel forward by `slides-per-move` slides.
     *
     * @param behavior - The behavior used for scrolling.
     */
    next(behavior?: ScrollBehavior): void;
    /**
     * Scrolls the carousel to the slide specified by `index`.
     *
     * @param index - The slide index.
     * @param behavior - The behavior used for scrolling.
     */
    goToSlide(index: number, behavior?: ScrollBehavior): void;
    private scrollToSlide;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-carousel': SlCarousel;
    }
};



/**
 * @summary A carousel item represent a slide within a [carousel](/components/carousel).
 *
 * @since 2.0
 * @status experimental
 *
 * @slot - The carousel item's content..
 *
 * @cssproperty --aspect-ratio - The slide's aspect ratio. Inherited from the carousel by default.
 *
 */
declare class SlCarouselItem extends ShoelaceElement {
    static styles: CSSResultGroup;
    connectedCallback(): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-carousel-item': SlCarouselItem;
    }
};




/**
 * @summary Checkboxes allow the user to toggle an option on or off.
 * @documentation https://shoelace.style/components/checkbox
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 *
 * @slot - The checkbox's label.
 * @slot help-text - Text that describes how to use the checkbox. Alternatively, you can use the `help-text` attribute.
 *
 * @event sl-blur - Emitted when the checkbox loses focus.
 * @event sl-change - Emitted when the checked state changes.
 * @event sl-focus - Emitted when the checkbox gains focus.
 * @event sl-input - Emitted when the checkbox receives input.
 * @event sl-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The square container that wraps the checkbox's checked state.
 * @csspart control--checked - Matches the control part when the checkbox is checked.
 * @csspart control--indeterminate - Matches the control part when the checkbox is indeterminate.
 * @csspart checked-icon - The checked icon, an `<sl-icon>` element.
 * @csspart indeterminate-icon - The indeterminate icon, an `<sl-icon>` element.
 * @csspart label - The container that wraps the checkbox's label.
 * @csspart form-control-help-text - The help text's wrapper.
 */
declare class SlCheckbox extends ShoelaceElement implements ShoelaceFormControl {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon': typeof SlIcon;
    };
    private readonly formControlController;
    private readonly hasSlotController;
    input: HTMLInputElement;
    private hasFocus;
    title: string;
    /** The name of the checkbox, submitted as a name/value pair with form data. */
    name: string;
    /** The current value of the checkbox, submitted as a name/value pair with form data. */
    value: string;
    /** The checkbox's size. */
    size: 'small' | 'medium' | 'large';
    /** Disables the checkbox. */
    disabled: boolean;
    /** Draws the checkbox in a checked state. */
    checked: boolean;
    /**
     * Draws the checkbox in an indeterminate state. This is usually applied to checkboxes that represents a "select
     * all/none" behavior when associated checkboxes have a mix of checked and unchecked states.
     */
    indeterminate: boolean;
    /** The default value of the form control. Primarily used for resetting the form control. */
    defaultChecked: boolean;
    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    form: string;
    /** Makes the checkbox a required field. */
    required: boolean;
    /** The checkbox's help text. If you need to display HTML, use the `help-text` slot instead. */
    helpText: string;
    /** Gets the validity state object */
    get validity(): ValidityState;
    /** Gets the validation message */
    get validationMessage(): string;
    firstUpdated(): void;
    private handleClick;
    private handleBlur;
    private handleInput;
    private handleInvalid;
    private handleFocus;
    handleDisabledChange(): void;
    handleStateChange(): void;
    /** Simulates a click on the checkbox. */
    click(): void;
    /** Sets focus on the checkbox. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the checkbox. */
    blur(): void;
    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity(): boolean;
    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null;
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity(): boolean;
    /**
     * Sets a custom validation message. The value provided will be shown to the user when the form is submitted. To clear
     * the custom validation message, call this method with an empty string.
     */
    setCustomValidity(message: string): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-checkbox': SlCheckbox;
    }
};



interface VirtualElement {
    getBoundingClientRect: () => DOMRect;
    contextElement?: Element;
}
/**
 * @summary Popup is a utility that lets you declaratively anchor "popup" containers to another element.
 * @documentation https://shoelace.style/components/popup
 * @status stable
 * @since 2.0
 *
 * @event sl-reposition - Emitted when the popup is repositioned. This event can fire a lot, so avoid putting expensive
 *  operations in your listener or consider debouncing it.
 *
 * @slot - The popup's content.
 * @slot anchor - The element the popup will be anchored to. If the anchor lives outside of the popup, you can use the
 *  `anchor` attribute or property instead.
 *
 * @csspart arrow - The arrow's container. Avoid setting `top|bottom|left|right` properties, as these values are
 *  assigned dynamically as the popup moves. This is most useful for applying a background color to match the popup, and
 *  maybe a border or box shadow.
 * @csspart popup - The popup's container. Useful for setting a background color, box shadow, etc.
 * @csspart hover-bridge - The hover bridge element. Only available when the `hover-bridge` option is enabled.
 *
 * @cssproperty [--arrow-size=6px] - The size of the arrow. Note that an arrow won't be shown unless the `arrow`
 *  attribute is used.
 * @cssproperty [--arrow-color=var(--sl-color-neutral-0)] - The color of the arrow.
 * @cssproperty [--auto-size-available-width] - A read-only custom property that determines the amount of width the
 *  popup can be before overflowing. Useful for positioning child elements that need to overflow. This property is only
 *  available when using `auto-size`.
 * @cssproperty [--auto-size-available-height] - A read-only custom property that determines the amount of height the
 *  popup can be before overflowing. Useful for positioning child elements that need to overflow. This property is only
 *  available when using `auto-size`.
 */
declare class SlPopup extends ShoelaceElement {
    static styles: CSSResultGroup;
    private anchorEl;
    private cleanup;
    private readonly localize;
    /** A reference to the internal popup container. Useful for animating and styling the popup with JavaScript. */
    popup: HTMLElement;
    private arrowEl;
    /**
     * The element the popup will be anchored to. If the anchor lives outside of the popup, you can provide the anchor
     * element `id`, a DOM element reference, or a `VirtualElement`. If the anchor lives inside the popup, use the
     * `anchor` slot instead.
     */
    anchor: Element | string | VirtualElement;
    /**
     * Activates the positioning logic and shows the popup. When this attribute is removed, the positioning logic is torn
     * down and the popup will be hidden.
     */
    active: boolean;
    /**
     * The preferred placement of the popup. Note that the actual placement will vary as configured to keep the
     * panel inside of the viewport.
     */
    placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end';
    /**
     * Determines how the popup is positioned. The `absolute` strategy works well in most cases, but if overflow is
     * clipped, using a `fixed` position strategy can often workaround it.
     */
    strategy: 'absolute' | 'fixed';
    /** The distance in pixels from which to offset the panel away from its anchor. */
    distance: number;
    /** The distance in pixels from which to offset the panel along its anchor. */
    skidding: number;
    /**
     * Attaches an arrow to the popup. The arrow's size and color can be customized using the `--arrow-size` and
     * `--arrow-color` custom properties. For additional customizations, you can also target the arrow using
     * `::part(arrow)` in your stylesheet.
     */
    arrow: boolean;
    /**
     * The placement of the arrow. The default is `anchor`, which will align the arrow as close to the center of the
     * anchor as possible, considering available space and `arrow-padding`. A value of `start`, `end`, or `center` will
     * align the arrow to the start, end, or center of the popover instead.
     */
    arrowPlacement: 'start' | 'end' | 'center' | 'anchor';
    /**
     * The amount of padding between the arrow and the edges of the popup. If the popup has a border-radius, for example,
     * this will prevent it from overflowing the corners.
     */
    arrowPadding: number;
    /**
     * When set, placement of the popup will flip to the opposite site to keep it in view. You can use
     * `flipFallbackPlacements` to further configure how the fallback placement is determined.
     */
    flip: boolean;
    /**
     * If the preferred placement doesn't fit, popup will be tested in these fallback placements until one fits. Must be a
     * string of any number of placements separated by a space, e.g. "top bottom left". If no placement fits, the flip
     * fallback strategy will be used instead.
     * */
    flipFallbackPlacements: string;
    /**
     * When neither the preferred placement nor the fallback placements fit, this value will be used to determine whether
     * the popup should be positioned using the best available fit based on available space or as it was initially
     * preferred.
     */
    flipFallbackStrategy: 'best-fit' | 'initial';
    /**
     * The flip boundary describes clipping element(s) that overflow will be checked relative to when flipping. By
     * default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
     * change the boundary by passing a reference to one or more elements to this property.
     */
    flipBoundary: Element | Element[];
    /** The amount of padding, in pixels, to exceed before the flip behavior will occur. */
    flipPadding: number;
    /** Moves the popup along the axis to keep it in view when clipped. */
    shift: boolean;
    /**
     * The shift boundary describes clipping element(s) that overflow will be checked relative to when shifting. By
     * default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
     * change the boundary by passing a reference to one or more elements to this property.
     */
    shiftBoundary: Element | Element[];
    /** The amount of padding, in pixels, to exceed before the shift behavior will occur. */
    shiftPadding: number;
    /** When set, this will cause the popup to automatically resize itself to prevent it from overflowing. */
    autoSize: 'horizontal' | 'vertical' | 'both';
    /** Syncs the popup's width or height to that of the anchor element. */
    sync: 'width' | 'height' | 'both';
    /**
     * The auto-size boundary describes clipping element(s) that overflow will be checked relative to when resizing. By
     * default, the boundary includes overflow ancestors that will cause the element to be clipped. If needed, you can
     * change the boundary by passing a reference to one or more elements to this property.
     */
    autoSizeBoundary: Element | Element[];
    /** The amount of padding, in pixels, to exceed before the auto-size behavior will occur. */
    autoSizePadding: number;
    /**
     * When a gap exists between the anchor and the popup element, this option will add a "hover bridge" that fills the
     * gap using an invisible element. This makes listening for events such as `mouseenter` and `mouseleave` more sane
     * because the pointer never technically leaves the element. The hover bridge will only be drawn when the popover is
     * active.
     */
    hoverBridge: boolean;
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    updated(changedProps: Map<string, unknown>): Promise<void>;
    private handleAnchorChange;
    private start;
    private stop;
    /** Forces the popup to recalculate and reposition itself. */
    reposition(): void;
    private updateHoverBridge;
    render(): lit_html.TemplateResult<1>;
}



/**
 * @summary Menu items provide options for the user to pick from in a menu.
 * @documentation https://shoelace.style/components/menu-item
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 * @dependency sl-popup
 * @dependency sl-spinner
 *
 * @slot - The menu item's label.
 * @slot prefix - Used to prepend an icon or similar element to the menu item.
 * @slot suffix - Used to append an icon or similar element to the menu item.
 * @slot submenu - Used to denote a nested menu.
 *
 * @csspart base - The component's base wrapper.
 * @csspart checked-icon - The checked icon, which is only visible when the menu item is checked.
 * @csspart prefix - The prefix container.
 * @csspart label - The menu item label.
 * @csspart suffix - The suffix container.
 * @csspart spinner - The spinner that shows when the menu item is in the loading state.
 * @csspart spinner__base - The spinner's base part.
 * @csspart submenu-icon - The submenu icon, visible only when the menu item has a submenu (not yet implemented).
 *
 * @cssproperty [--submenu-offset=-2px] - The distance submenus shift to overlap the parent menu.
 */
declare class SlMenuItem extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon': typeof SlIcon;
        'sl-popup': typeof SlPopup;
        'sl-spinner': typeof SlSpinner;
    };
    private cachedTextLabel;
    private readonly localize;
    defaultSlot: HTMLSlotElement;
    menuItem: HTMLElement;
    /** The type of menu item to render. To use `checked`, this value must be set to `checkbox`. */
    type: 'normal' | 'checkbox';
    /** Draws the item in a checked state. */
    checked: boolean;
    /** A unique value to store in the menu item. This can be used as a way to identify menu items when selected. */
    value: string;
    /** Draws the menu item in a loading state. */
    loading: boolean;
    /** Draws the menu item in a disabled state, preventing selection. */
    disabled: boolean;
    private readonly hasSlotController;
    private submenuController;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleDefaultSlotChange;
    private handleHostClick;
    private handleMouseOver;
    handleCheckedChange(): void;
    handleDisabledChange(): void;
    handleTypeChange(): void;
    /** Returns a text label based on the contents of the menu item's default slot. */
    getTextLabel(): string;
    isSubmenu(): boolean;
    render(): lit_html.TemplateResult<1>;
}



/**
 * @summary Menus provide a list of options for the user to choose from.
 * @documentation https://shoelace.style/components/menu
 * @status stable
 * @since 2.0
 *
 * @slot - The menu's content, including menu items, menu labels, and dividers.
 *
 * @event {{ item: SlMenuItem }} sl-select - Emitted when a menu item is selected.
 */
declare class SlMenu extends ShoelaceElement {
    static styles: CSSResultGroup;
    defaultSlot: HTMLSlotElement;
    connectedCallback(): void;
    private handleClick;
    private handleKeyDown;
    private handleMouseDown;
    private handleSlotChange;
    private isMenuItem;
    /** @internal Gets all slotted menu items, ignoring dividers, headers, and other elements. */
    getAllItems(): SlMenuItem[];
    /**
     * @internal Gets the current menu item, which is the menu item that has `tabindex="0"` within the roving tab index.
     * The menu item may or may not have focus, but for keyboard interaction purposes it's considered the "active" item.
     */
    getCurrentItem(): SlMenuItem | undefined;
    /**
     * @internal Sets the current menu item to the specified element. This sets `tabindex="0"` on the target element and
     * `tabindex="-1"` to all other items. This method must be called prior to setting focus on a menu item.
     */
    setCurrentItem(item: SlMenuItem): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-menu': SlMenu;
    }
};




/**
 * @summary Dropdowns expose additional content that "drops down" in a panel.
 * @documentation https://shoelace.style/components/dropdown
 * @status stable
 * @since 2.0
 *
 * @dependency sl-popup
 *
 * @slot - The dropdown's main content.
 * @slot trigger - The dropdown's trigger, usually a `<sl-button>` element.
 *
 * @event sl-show - Emitted when the dropdown opens.
 * @event sl-after-show - Emitted after the dropdown opens and all animations are complete.
 * @event sl-hide - Emitted when the dropdown closes.
 * @event sl-after-hide - Emitted after the dropdown closes and all animations are complete.
 *
 * @csspart base - The component's base wrapper, an `<sl-popup>` element.
 * @csspart base__popup - The popup's exported `popup` part. Use this to target the tooltip's popup container.
 * @csspart trigger - The container that wraps the trigger.
 * @csspart panel - The panel that gets shown when the dropdown is open.
 *
 * @animation dropdown.show - The animation to use when showing the dropdown.
 * @animation dropdown.hide - The animation to use when hiding the dropdown.
 */
declare class SlDropdown extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-popup': typeof SlPopup;
    };
    popup: SlPopup;
    trigger: HTMLSlotElement;
    panel: HTMLSlotElement;
    private readonly localize;
    private closeWatcher;
    /**
     * Indicates whether or not the dropdown is open. You can toggle this attribute to show and hide the dropdown, or you
     * can use the `show()` and `hide()` methods and this attribute will reflect the dropdown's open state.
     */
    open: boolean;
    /**
     * The preferred placement of the dropdown panel. Note that the actual placement may vary as needed to keep the panel
     * inside of the viewport.
     */
    placement: 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'right' | 'right-start' | 'right-end' | 'left' | 'left-start' | 'left-end';
    /** Disables the dropdown so the panel will not open. */
    disabled: boolean;
    /**
     * By default, the dropdown is closed when an item is selected. This attribute will keep it open instead. Useful for
     * dropdowns that allow for multiple interactions.
     */
    stayOpenOnSelect: boolean;
    /**
     * The dropdown will close when the user interacts outside of this element (e.g. clicking). Useful for composing other
     * components that use a dropdown internally.
     */
    containingElement?: HTMLElement;
    /** The distance in pixels from which to offset the panel away from its trigger. */
    distance: number;
    /** The distance in pixels from which to offset the panel along its trigger. */
    skidding: number;
    /**
     * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
     * `overflow: auto|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all, scenarios.
     */
    hoist: boolean;
    /**
     * Syncs the popup width or height to that of the trigger element.
     */
    sync: 'width' | 'height' | 'both' | undefined;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    focusOnTrigger(): void;
    getMenu(): SlMenu | undefined;
    private handleKeyDown;
    private handleDocumentKeyDown;
    private handleDocumentMouseDown;
    private handlePanelSelect;
    handleTriggerClick(): void;
    handleTriggerKeyDown(event: KeyboardEvent): Promise<void>;
    handleTriggerKeyUp(event: KeyboardEvent): void;
    handleTriggerSlotChange(): void;
    updateAccessibleTrigger(): void;
    /** Shows the dropdown panel. */
    show(): Promise<void>;
    /** Hides the dropdown panel */
    hide(): Promise<void>;
    /**
     * Instructs the dropdown menu to reposition. Useful when the position or size of the trigger changes when the menu
     * is activated.
     */
    reposition(): void;
    addOpenListeners(): void;
    removeOpenListeners(): void;
    handleOpenChange(): Promise<void>;
    render(): lit_html.TemplateResult<1>;
}




/**
 * @summary Inputs collect data from the user.
 * @documentation https://shoelace.style/components/input
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 *
 * @slot label - The input's label. Alternatively, you can use the `label` attribute.
 * @slot prefix - Used to prepend a presentational icon or similar element to the input.
 * @slot suffix - Used to append a presentational icon or similar element to the input.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot show-password-icon - An icon to use in lieu of the default show password icon.
 * @slot hide-password-icon - An icon to use in lieu of the default hide password icon.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when an alteration to the control's value is committed by the user.
 * @event sl-clear - Emitted when the clear button is activated.
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-input - Emitted when the control receives input.
 * @event sl-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart input - The internal `<input>` control.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart clear-button - The clear button.
 * @csspart password-toggle-button - The password toggle button.
 * @csspart suffix - The container that wraps the suffix.
 */
declare class SlInput extends ShoelaceElement implements ShoelaceFormControl {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon': typeof SlIcon;
    };
    private readonly formControlController;
    private readonly hasSlotController;
    private readonly localize;
    input: HTMLInputElement;
    private hasFocus;
    title: string;
    private __numberInput;
    private __dateInput;
    /**
     * The type of input. Works the same as a native `<input>` element, but only a subset of types are supported. Defaults
     * to `text`.
     */
    type: 'date' | 'datetime-local' | 'email' | 'number' | 'password' | 'search' | 'tel' | 'text' | 'time' | 'url';
    /** The name of the input, submitted as a name/value pair with form data. */
    name: string;
    /** The current value of the input, submitted as a name/value pair with form data. */
    value: string;
    /** The default value of the form control. Primarily used for resetting the form control. */
    defaultValue: string;
    /** The input's size. */
    size: 'small' | 'medium' | 'large';
    /** Draws a filled input. */
    filled: boolean;
    /** Draws a pill-style input with rounded edges. */
    pill: boolean;
    /** The input's label. If you need to display HTML, use the `label` slot instead. */
    label: string;
    /** The input's help text. If you need to display HTML, use the `help-text` slot instead. */
    helpText: string;
    /** Adds a clear button when the input is not empty. */
    clearable: boolean;
    /** Disables the input. */
    disabled: boolean;
    /** Placeholder text to show as a hint when the input is empty. */
    placeholder: string;
    /** Makes the input readonly. */
    readonly: boolean;
    /** Adds a button to toggle the password's visibility. Only applies to password types. */
    passwordToggle: boolean;
    /** Determines whether or not the password is currently visible. Only applies to password input types. */
    passwordVisible: boolean;
    /** Hides the browser's built-in increment/decrement spin buttons for number inputs. */
    noSpinButtons: boolean;
    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    form: string;
    /** Makes the input a required field. */
    required: boolean;
    /** A regular expression pattern to validate input against. */
    pattern: string;
    /** The minimum length of input that will be considered valid. */
    minlength: number;
    /** The maximum length of input that will be considered valid. */
    maxlength: number;
    /** The input's minimum value. Only applies to date and number input types. */
    min: number | string;
    /** The input's maximum value. Only applies to date and number input types. */
    max: number | string;
    /**
     * Specifies the granularity that the value must adhere to, or the special value `any` which means no stepping is
     * implied, allowing any numeric value. Only applies to date and number input types.
     */
    step: number | 'any';
    /** Controls whether and how text input is automatically capitalized as it is entered by the user. */
    autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
    /** Indicates whether the browser's autocorrect feature is on or off. */
    autocorrect: 'off' | 'on';
    /**
     * Specifies what permission the browser has to provide assistance in filling out form field values. Refer to
     * [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values.
     */
    autocomplete: string;
    /** Indicates that the input should receive focus on page load. */
    autofocus: boolean;
    /** Used to customize the label or icon of the Enter key on virtual keyboards. */
    enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    /** Enables spell checking on the input. */
    spellcheck: boolean;
    /**
     * Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual
     * keyboard on supportive devices.
     */
    inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    /**
     * Gets or sets the current value as a `Date` object. Returns `null` if the value can't be converted. This will use the native `<input type="{{type}}">` implementation and may result in an error.
     */
    get valueAsDate(): Date | null;
    set valueAsDate(newValue: Date | null);
    /** Gets or sets the current value as a number. Returns `NaN` if the value can't be converted. */
    get valueAsNumber(): number;
    set valueAsNumber(newValue: number);
    /** Gets the validity state object */
    get validity(): ValidityState;
    /** Gets the validation message */
    get validationMessage(): string;
    firstUpdated(): void;
    private handleBlur;
    private handleChange;
    private handleClearClick;
    private handleFocus;
    private handleInput;
    private handleInvalid;
    private handleKeyDown;
    private handlePasswordToggle;
    handleDisabledChange(): void;
    handleStepChange(): void;
    handleValueChange(): Promise<void>;
    /** Sets focus on the input. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the input. */
    blur(): void;
    /** Selects all the text in the input. */
    select(): void;
    /** Sets the start and end positions of the text selection (0-based). */
    setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' | 'backward' | 'none'): void;
    /** Replaces a range of text with a new string. */
    setRangeText(replacement: string, start?: number, end?: number, selectMode?: 'select' | 'start' | 'end' | 'preserve'): void;
    /** Displays the browser picker for an input element (only works if the browser supports it for the input type). */
    showPicker(): void;
    /** Increments the value of a numeric input type by the value of the step attribute. */
    stepUp(): void;
    /** Decrements the value of a numeric input type by the value of the step attribute. */
    stepDown(): void;
    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity(): boolean;
    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null;
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity(): boolean;
    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message: string): void;
    render(): lit_html.TemplateResult<1>;
}



/**
 * @summary The visually hidden utility makes content accessible to assistive devices without displaying it on the screen.
 * @documentation https://shoelace.style/components/visually-hidden
 * @status stable
 * @since 2.0
 *
 * @slot - The content to be visually hidden.
 */
declare class SlVisuallyHidden extends ShoelaceElement {
    static styles: CSSResultGroup;
    render(): lit_html.TemplateResult<1>;
}




/**
 * @summary Color pickers allow the user to select a color.
 * @documentation https://shoelace.style/components/color-picker
 * @status stable
 * @since 2.0
 *
 * @dependency sl-button
 * @dependency sl-button-group
 * @dependency sl-dropdown
 * @dependency sl-input
 * @dependency sl-visually-hidden
 *
 * @slot label - The color picker's form label. Alternatively, you can use the `label` attribute.
 *
 * @event sl-blur - Emitted when the color picker loses focus.
 * @event sl-change - Emitted when the color picker's value changes.
 * @event sl-focus - Emitted when the color picker receives focus.
 * @event sl-input - Emitted when the color picker receives input.
 * @event sl-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart base - The component's base wrapper.
 * @csspart trigger - The color picker's dropdown trigger.
 * @csspart swatches - The container that holds the swatches.
 * @csspart swatch - Each individual swatch.
 * @csspart grid - The color grid.
 * @csspart grid-handle - The color grid's handle.
 * @csspart slider - Hue and opacity sliders.
 * @csspart slider-handle - Hue and opacity slider handles.
 * @csspart hue-slider - The hue slider.
 * @csspart hue-slider-handle - The hue slider's handle.
 * @csspart opacity-slider - The opacity slider.
 * @csspart opacity-slider-handle - The opacity slider's handle.
 * @csspart preview - The preview color.
 * @csspart input - The text input.
 * @csspart eye-dropper-button - The eye dropper button.
 * @csspart eye-dropper-button__base - The eye dropper button's exported `button` part.
 * @csspart eye-dropper-button__prefix - The eye dropper button's exported `prefix` part.
 * @csspart eye-dropper-button__label - The eye dropper button's exported `label` part.
 * @csspart eye-dropper-button__suffix - The eye dropper button's exported `suffix` part.
 * @csspart eye-dropper-button__caret - The eye dropper button's exported `caret` part.
 * @csspart format-button - The format button.
 * @csspart format-button__base - The format button's exported `button` part.
 * @csspart format-button__prefix - The format button's exported `prefix` part.
 * @csspart format-button__label - The format button's exported `label` part.
 * @csspart format-button__suffix - The format button's exported `suffix` part.
 * @csspart format-button__caret - The format button's exported `caret` part.
 *
 * @cssproperty --grid-width - The width of the color grid.
 * @cssproperty --grid-height - The height of the color grid.
 * @cssproperty --grid-handle-size - The size of the color grid's handle.
 * @cssproperty --slider-height - The height of the hue and alpha sliders.
 * @cssproperty --slider-handle-size - The diameter of the slider's handle.
 * @cssproperty --swatch-size - The size of each predefined color swatch.
 */
declare class SlColorPicker extends ShoelaceElement implements ShoelaceFormControl {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-button-group': typeof SlButtonGroup;
        'sl-button': typeof SlButton;
        'sl-dropdown': typeof SlDropdown;
        'sl-icon': typeof SlIcon;
        'sl-input': typeof SlInput;
        'sl-visually-hidden': typeof SlVisuallyHidden;
    };
    private readonly formControlController;
    private isSafeValue;
    private readonly localize;
    base: HTMLElement;
    input: SlInput;
    dropdown: SlDropdown;
    previewButton: HTMLButtonElement;
    trigger: HTMLButtonElement;
    private hasFocus;
    private isDraggingGridHandle;
    private isEmpty;
    private inputValue;
    private hue;
    private saturation;
    private brightness;
    private alpha;
    /**
     * The current value of the color picker. The value's format will vary based the `format` attribute. To get the value
     * in a specific format, use the `getFormattedValue()` method. The value is submitted as a name/value pair with form
     * data.
     */
    value: string;
    /** The default value of the form control. Primarily used for resetting the form control. */
    defaultValue: string;
    /**
     * The color picker's label. This will not be displayed, but it will be announced by assistive devices. If you need to
     * display HTML, you can use the `label` slot` instead.
     */
    label: string;
    /**
     * The format to use. If opacity is enabled, these will translate to HEXA, RGBA, HSLA, and HSVA respectively. The color
     * picker will accept user input in any format (including CSS color names) and convert it to the desired format.
     */
    format: 'hex' | 'rgb' | 'hsl' | 'hsv';
    /** Renders the color picker inline rather than in a dropdown. */
    inline: boolean;
    /** Determines the size of the color picker's trigger. This has no effect on inline color pickers. */
    size: 'small' | 'medium' | 'large';
    /** Removes the button that lets users toggle between format.   */
    noFormatToggle: boolean;
    /** The name of the form control, submitted as a name/value pair with form data. */
    name: string;
    /** Disables the color picker. */
    disabled: boolean;
    /**
     * Enable this option to prevent the panel from being clipped when the component is placed inside a container with
     * `overflow: auto|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all, scenarios.
     */
    hoist: boolean;
    /** Shows the opacity slider. Enabling this will cause the formatted value to be HEXA, RGBA, or HSLA. */
    opacity: boolean;
    /** By default, values are lowercase. With this attribute, values will be uppercase instead. */
    uppercase: boolean;
    /**
     * One or more predefined color swatches to display as presets in the color picker. Can include any format the color
     * picker can parse, including HEX(A), RGB(A), HSL(A), HSV(A), and CSS color names. Each color must be separated by a
     * semicolon (`;`). Alternatively, you can pass an array of color values to this property using JavaScript.
     */
    swatches: string | string[];
    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    form: string;
    /** Makes the color picker a required field. */
    required: boolean;
    /** Gets the validity state object */
    get validity(): ValidityState;
    /** Gets the validation message */
    get validationMessage(): string;
    constructor();
    firstUpdated(): void;
    private handleCopy;
    private handleFocusIn;
    private handleFocusOut;
    private handleFormatToggle;
    private handleAlphaDrag;
    private handleHueDrag;
    private handleGridDrag;
    private handleAlphaKeyDown;
    private handleHueKeyDown;
    private handleGridKeyDown;
    private handleInputChange;
    private handleInputInput;
    private handleInputKeyDown;
    private handleInputInvalid;
    private handleTouchMove;
    private parseColor;
    private setColor;
    private setLetterCase;
    private syncValues;
    private handleAfterHide;
    private handleEyeDropper;
    private selectSwatch;
    /** Generates a hex string from HSV values. Hue must be 0-360. All other arguments must be 0-100. */
    private getHexString;
    private stopNestedEventPropagation;
    handleFormatChange(): void;
    handleOpacityChange(): void;
    handleValueChange(oldValue: string | undefined, newValue: string): void;
    /** Sets focus on the color picker. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the color picker. */
    blur(): void;
    /** Returns the current value as a string in the specified format. */
    getFormattedValue(format?: 'hex' | 'hexa' | 'rgb' | 'rgba' | 'hsl' | 'hsla' | 'hsv' | 'hsva'): string;
    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity(): boolean;
    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null;
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity(): boolean;
    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message: string): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-color-picker': SlColorPicker;
    }
};



/**
 * @summary Tooltips display additional information based on a specific action.
 * @documentation https://shoelace.style/components/tooltip
 * @status stable
 * @since 2.0
 *
 * @dependency sl-popup
 *
 * @slot - The tooltip's target element. Avoid slotting in more than one element, as subsequent ones will be ignored.
 * @slot content - The content to render in the tooltip. Alternatively, you can use the `content` attribute.
 *
 * @event sl-show - Emitted when the tooltip begins to show.
 * @event sl-after-show - Emitted after the tooltip has shown and all animations are complete.
 * @event sl-hide - Emitted when the tooltip begins to hide.
 * @event sl-after-hide - Emitted after the tooltip has hidden and all animations are complete.
 *
 * @csspart base - The component's base wrapper, an `<sl-popup>` element.
 * @csspart base__popup - The popup's exported `popup` part. Use this to target the tooltip's popup container.
 * @csspart base__arrow - The popup's exported `arrow` part. Use this to target the tooltip's arrow.
 * @csspart body - The tooltip's body where its content is rendered.
 *
 * @cssproperty --max-width - The maximum width of the tooltip before its content will wrap.
 * @cssproperty --hide-delay - The amount of time to wait before hiding the tooltip when hovering.
 * @cssproperty --show-delay - The amount of time to wait before showing the tooltip when hovering.
 *
 * @animation tooltip.show - The animation to use when showing the tooltip.
 * @animation tooltip.hide - The animation to use when hiding the tooltip.
 */
declare class SlTooltip extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-popup': typeof SlPopup;
    };
    private hoverTimeout;
    private readonly localize;
    private closeWatcher;
    defaultSlot: HTMLSlotElement;
    body: HTMLElement;
    popup: SlPopup;
    /** The tooltip's content. If you need to display HTML, use the `content` slot instead. */
    content: string;
    /**
     * The preferred placement of the tooltip. Note that the actual placement may vary as needed to keep the tooltip
     * inside of the viewport.
     */
    placement: 'top' | 'top-start' | 'top-end' | 'right' | 'right-start' | 'right-end' | 'bottom' | 'bottom-start' | 'bottom-end' | 'left' | 'left-start' | 'left-end';
    /** Disables the tooltip so it won't show when triggered. */
    disabled: boolean;
    /** The distance in pixels from which to offset the tooltip away from its target. */
    distance: number;
    /** Indicates whether or not the tooltip is open. You can use this in lieu of the show/hide methods. */
    open: boolean;
    /** The distance in pixels from which to offset the tooltip along its target. */
    skidding: number;
    /**
     * Controls how the tooltip is activated. Possible options include `click`, `hover`, `focus`, and `manual`. Multiple
     * options can be passed by separating them with a space. When manual is used, the tooltip must be activated
     * programmatically.
     */
    trigger: string;
    /**
     * Enable this option to prevent the tooltip from being clipped when the component is placed inside a container with
     * `overflow: auto|hidden|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all,
     * scenarios.
     */
    hoist: boolean;
    constructor();
    disconnectedCallback(): void;
    firstUpdated(): void;
    private handleBlur;
    private handleClick;
    private handleFocus;
    private handleDocumentKeyDown;
    private handleMouseOver;
    private handleMouseOut;
    private hasTrigger;
    handleOpenChange(): Promise<void>;
    handleOptionsChange(): Promise<void>;
    handleDisabledChange(): void;
    /** Shows the tooltip. */
    show(): Promise<void>;
    /** Hides the tooltip */
    hide(): Promise<void>;
    render(): lit_html.TemplateResult<1>;
}



/**
 * @summary Copies text data to the clipboard when the user clicks the trigger.
 * @documentation https://shoelace.style/components/copy
 * @status experimental
 * @since 2.7
 *
 * @dependency sl-icon
 * @dependency sl-tooltip
 *
 * @event sl-copy - Emitted when the data has been copied.
 * @event sl-error - Emitted when the data could not be copied.
 *
 * @slot copy-icon - The icon to show in the default copy state. Works best with `<sl-icon>`.
 * @slot success-icon - The icon to show when the content is copied. Works best with `<sl-icon>`.
 * @slot error-icon - The icon to show when a copy error occurs. Works best with `<sl-icon>`.
 *
 * @csspart button - The internal `<button>` element.
 * @csspart copy-icon - The container that holds the copy icon.
 * @csspart success-icon - The container that holds the success icon.
 * @csspart error-icon - The container that holds the error icon.
 * @csspart tooltip__base - The tooltip's exported `base` part.
 * @csspart tooltip__base__popup - The tooltip's exported `popup` part.
 * @csspart tooltip__base__arrow - The tooltip's exported `arrow` part.
 * @csspart tooltip__body - The tooltip's exported `body` part.
 *
 * @cssproperty --success-color - The color to use for success feedback.
 * @cssproperty --error-color - The color to use for error feedback.
 *
 * @animation copy.in - The animation to use when feedback icons animate in.
 * @animation copy.out - The animation to use when feedback icons animate out.
 */
declare class SlCopyButton extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon': typeof SlIcon;
        'sl-tooltip': typeof SlTooltip;
    };
    private readonly localize;
    copyIcon: HTMLSlotElement;
    successIcon: HTMLSlotElement;
    errorIcon: HTMLSlotElement;
    tooltip: SlTooltip;
    isCopying: boolean;
    status: 'rest' | 'success' | 'error';
    /** The text value to copy. */
    value: string;
    /**
     * An id that references an element in the same document from which data will be copied. If both this and `value` are
     * present, this value will take precedence. By default, the target element's `textContent` will be copied. To copy an
     * attribute, append the attribute name wrapped in square brackets, e.g. `from="el[value]"`. To copy a property,
     * append a dot and the property name, e.g. `from="el.value"`.
     */
    from: string;
    /** Disables the copy button. */
    disabled: boolean;
    /** A custom label to show in the tooltip. */
    copyLabel: string;
    /** A custom label to show in the tooltip after copying. */
    successLabel: string;
    /** A custom label to show in the tooltip when a copy error occurs. */
    errorLabel: string;
    /** The length of time to show feedback before restoring the default trigger. */
    feedbackDuration: number;
    /** The preferred placement of the tooltip. */
    tooltipPlacement: 'top' | 'right' | 'bottom' | 'left';
    /**
     * Enable this option to prevent the tooltip from being clipped when the component is placed inside a container with
     * `overflow: auto|hidden|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all,
     * scenarios.
     */
    hoist: boolean;
    private handleCopy;
    private showStatus;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-copy-button': SlCopyButton;
    }
};



/**
 * @summary Details show a brief summary and expand to show additional content.
 * @documentation https://shoelace.style/components/details
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 *
 * @slot - The details' main content.
 * @slot summary - The details' summary. Alternatively, you can use the `summary` attribute.
 * @slot expand-icon - Optional expand icon to use instead of the default. Works best with `<sl-icon>`.
 * @slot collapse-icon - Optional collapse icon to use instead of the default. Works best with `<sl-icon>`.
 *
 * @event sl-show - Emitted when the details opens.
 * @event sl-after-show - Emitted after the details opens and all animations are complete.
 * @event sl-hide - Emitted when the details closes.
 * @event sl-after-hide - Emitted after the details closes and all animations are complete.
 *
 * @csspart base - The component's base wrapper.
 * @csspart header - The header that wraps both the summary and the expand/collapse icon.
 * @csspart summary - The container that wraps the summary.
 * @csspart summary-icon - The container that wraps the expand/collapse icons.
 * @csspart content - The details content.
 *
 * @animation details.show - The animation to use when showing details. You can use `height: auto` with this animation.
 * @animation details.hide - The animation to use when hiding details. You can use `height: auto` with this animation.
 */
declare class SlDetails extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon': typeof SlIcon;
    };
    private readonly localize;
    details: HTMLDetailsElement;
    header: HTMLElement;
    body: HTMLElement;
    expandIconSlot: HTMLSlotElement;
    detailsObserver: MutationObserver;
    /**
     * Indicates whether or not the details is open. You can toggle this attribute to show and hide the details, or you
     * can use the `show()` and `hide()` methods and this attribute will reflect the details' open state.
     */
    open: boolean;
    /** The summary to show in the header. If you need to display HTML, use the `summary` slot instead. */
    summary: string;
    /** Disables the details so it can't be toggled. */
    disabled: boolean;
    firstUpdated(): void;
    disconnectedCallback(): void;
    private handleSummaryClick;
    private handleSummaryKeyDown;
    handleOpenChange(): Promise<void>;
    /** Shows the details. */
    show(): Promise<void>;
    /** Hides the details */
    hide(): Promise<void>;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-details': SlDetails;
    }
};

declare class Modal {
    element: HTMLElement;
    isExternalActivated: boolean;
    tabDirection: 'forward' | 'backward';
    currentFocus: HTMLElement | null;
    previousFocus: HTMLElement | null;
    elementsWithTabbableControls: string[];
    constructor(element: HTMLElement);
    /** Activates focus trapping. */
    activate(): void;
    /** Deactivates focus trapping. */
    deactivate(): void;
    /** Determines if this modal element is currently active or not. */
    isActive(): boolean;
    /** Activates external modal behavior and temporarily disables focus trapping. */
    activateExternal(): void;
    /** Deactivates external modal behavior and re-enables focus trapping. */
    deactivateExternal(): void;
    private checkFocus;
    private handleFocusIn;
    private possiblyHasTabbableChildren;
    private handleKeyDown;
    private handleKeyUp;
}



/**
 * @summary Dialogs, sometimes called "modals", appear above the page and require the user's immediate attention.
 * @documentation https://shoelace.style/components/dialog
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon-button
 *
 * @slot - The dialog's main content.
 * @slot label - The dialog's label. Alternatively, you can use the `label` attribute.
 * @slot header-actions - Optional actions to add to the header. Works best with `<sl-icon-button>`.
 * @slot footer - The dialog's footer, usually one or more buttons representing various options.
 *
 * @event sl-show - Emitted when the dialog opens.
 * @event sl-after-show - Emitted after the dialog opens and all animations are complete.
 * @event sl-hide - Emitted when the dialog closes.
 * @event sl-after-hide - Emitted after the dialog closes and all animations are complete.
 * @event sl-initial-focus - Emitted when the dialog opens and is ready to receive focus. Calling
 *   `event.preventDefault()` will prevent focusing and allow you to set it on a different element, such as an input.
 * @event {{ source: 'close-button' | 'keyboard' | 'overlay' }} sl-request-close - Emitted when the user attempts to
 *   close the dialog by clicking the close button, clicking the overlay, or pressing escape. Calling
 *   `event.preventDefault()` will keep the dialog open. Avoid using this unless closing the dialog will result in
 *   destructive behavior such as data loss.
 *
 * @csspart base - The component's base wrapper.
 * @csspart overlay - The overlay that covers the screen behind the dialog.
 * @csspart panel - The dialog's panel (where the dialog and its content are rendered).
 * @csspart header - The dialog's header. This element wraps the title and header actions.
 * @csspart header-actions - Optional actions to add to the header. Works best with `<sl-icon-button>`.
 * @csspart title - The dialog's title.
 * @csspart close-button - The close button, an `<sl-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 * @csspart body - The dialog's body.
 * @csspart footer - The dialog's footer.
 *
 * @cssproperty --width - The preferred width of the dialog. Note that the dialog will shrink to accommodate smaller screens.
 * @cssproperty --header-spacing - The amount of padding to use for the header.
 * @cssproperty --body-spacing - The amount of padding to use for the body.
 * @cssproperty --footer-spacing - The amount of padding to use for the footer.
 *
 * @animation dialog.show - The animation to use when showing the dialog.
 * @animation dialog.hide - The animation to use when hiding the dialog.
 * @animation dialog.denyClose - The animation to use when a request to close the dialog is denied.
 * @animation dialog.overlay.show - The animation to use when showing the dialog's overlay.
 * @animation dialog.overlay.hide - The animation to use when hiding the dialog's overlay.
 *
 * @property modal - Exposes the internal modal utility that controls focus trapping. To temporarily disable focus
 *   trapping and allow third-party modals spawned from an active Shoelace modal, call `modal.activateExternal()` when
 *   the third-party modal opens. Upon closing, call `modal.deactivateExternal()` to restore Shoelace's focus trapping.
 */
declare class SlDialog extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon-button': typeof SlIconButton;
    };
    private readonly hasSlotController;
    private readonly localize;
    private originalTrigger;
    modal: Modal;
    private closeWatcher;
    dialog: HTMLElement;
    panel: HTMLElement;
    overlay: HTMLElement;
    /**
     * Indicates whether or not the dialog is open. You can toggle this attribute to show and hide the dialog, or you can
     * use the `show()` and `hide()` methods and this attribute will reflect the dialog's open state.
     */
    open: boolean;
    /**
     * The dialog's label as displayed in the header. You should always include a relevant label even when using
     * `no-header`, as it is required for proper accessibility. If you need to display HTML, use the `label` slot instead.
     */
    label: string;
    /**
     * Disables the header. This will also remove the default close button, so please ensure you provide an easy,
     * accessible way for users to dismiss the dialog.
     */
    noHeader: boolean;
    firstUpdated(): void;
    disconnectedCallback(): void;
    private requestClose;
    private addOpenListeners;
    private removeOpenListeners;
    private handleDocumentKeyDown;
    handleOpenChange(): Promise<void>;
    /** Shows the dialog. */
    show(): Promise<void>;
    /** Hides the dialog */
    hide(): Promise<void>;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-dialog': SlDialog;
    }
};



/**
 * @summary Dividers are used to visually separate or group elements.
 * @documentation https://shoelace.style/components/divider
 * @status stable
 * @since 2.0
 *
 * @cssproperty --color - The color of the divider.
 * @cssproperty --width - The width of the divider.
 * @cssproperty --spacing - The spacing of the divider.
 */
declare class SlDivider extends ShoelaceElement {
    static styles: CSSResultGroup;
    /** Draws the divider in a vertical orientation. */
    vertical: boolean;
    connectedCallback(): void;
    handleVerticalChange(): void;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-divider': SlDivider;
    }
};



/**
 * @summary Drawers slide in from a container to expose additional options and information.
 * @documentation https://shoelace.style/components/drawer
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon-button
 *
 * @slot - The drawer's main content.
 * @slot label - The drawer's label. Alternatively, you can use the `label` attribute.
 * @slot header-actions - Optional actions to add to the header. Works best with `<sl-icon-button>`.
 * @slot footer - The drawer's footer, usually one or more buttons representing various options.
 *
 * @event sl-show - Emitted when the drawer opens.
 * @event sl-after-show - Emitted after the drawer opens and all animations are complete.
 * @event sl-hide - Emitted when the drawer closes.
 * @event sl-after-hide - Emitted after the drawer closes and all animations are complete.
 * @event sl-initial-focus - Emitted when the drawer opens and is ready to receive focus. Calling
 *   `event.preventDefault()` will prevent focusing and allow you to set it on a different element, such as an input.
 * @event {{ source: 'close-button' | 'keyboard' | 'overlay' }} sl-request-close - Emitted when the user attempts to
 *   close the drawer by clicking the close button, clicking the overlay, or pressing escape. Calling
 *   `event.preventDefault()` will keep the drawer open. Avoid using this unless closing the drawer will result in
 *   destructive behavior such as data loss.
 *
 * @csspart base - The component's base wrapper.
 * @csspart overlay - The overlay that covers the screen behind the drawer.
 * @csspart panel - The drawer's panel (where the drawer and its content are rendered).
 * @csspart header - The drawer's header. This element wraps the title and header actions.
 * @csspart header-actions - Optional actions to add to the header. Works best with `<sl-icon-button>`.
 * @csspart title - The drawer's title.
 * @csspart close-button - The close button, an `<sl-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 * @csspart body - The drawer's body.
 * @csspart footer - The drawer's footer.
 *
 * @cssproperty --size - The preferred size of the drawer. This will be applied to the drawer's width or height
 *   depending on its `placement`. Note that the drawer will shrink to accommodate smaller screens.
 * @cssproperty --header-spacing - The amount of padding to use for the header.
 * @cssproperty --body-spacing - The amount of padding to use for the body.
 * @cssproperty --footer-spacing - The amount of padding to use for the footer.
 *
 * @animation drawer.showTop - The animation to use when showing a drawer with `top` placement.
 * @animation drawer.showEnd - The animation to use when showing a drawer with `end` placement.
 * @animation drawer.showBottom - The animation to use when showing a drawer with `bottom` placement.
 * @animation drawer.showStart - The animation to use when showing a drawer with `start` placement.
 * @animation drawer.hideTop - The animation to use when hiding a drawer with `top` placement.
 * @animation drawer.hideEnd - The animation to use when hiding a drawer with `end` placement.
 * @animation drawer.hideBottom - The animation to use when hiding a drawer with `bottom` placement.
 * @animation drawer.hideStart - The animation to use when hiding a drawer with `start` placement.
 * @animation drawer.denyClose - The animation to use when a request to close the drawer is denied.
 * @animation drawer.overlay.show - The animation to use when showing the drawer's overlay.
 * @animation drawer.overlay.hide - The animation to use when hiding the drawer's overlay.
 *
 * @property modal - Exposes the internal modal utility that controls focus trapping. To temporarily disable focus
 *   trapping and allow third-party modals spawned from an active Shoelace modal, call `modal.activateExternal()` when
 *   the third-party modal opens. Upon closing, call `modal.deactivateExternal()` to restore Shoelace's focus trapping.
 */
declare class SlDrawer extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon-button': typeof SlIconButton;
    };
    private readonly hasSlotController;
    private readonly localize;
    private originalTrigger;
    modal: Modal;
    private closeWatcher;
    drawer: HTMLElement;
    panel: HTMLElement;
    overlay: HTMLElement;
    /**
     * Indicates whether or not the drawer is open. You can toggle this attribute to show and hide the drawer, or you can
     * use the `show()` and `hide()` methods and this attribute will reflect the drawer's open state.
     */
    open: boolean;
    /**
     * The drawer's label as displayed in the header. You should always include a relevant label even when using
     * `no-header`, as it is required for proper accessibility. If you need to display HTML, use the `label` slot instead.
     */
    label: string;
    /** The direction from which the drawer will open. */
    placement: 'top' | 'end' | 'bottom' | 'start';
    /**
     * By default, the drawer slides out of its containing block (usually the viewport). To make the drawer slide out of
     * its parent element, set this attribute and add `position: relative` to the parent.
     */
    contained: boolean;
    /**
     * Removes the header. This will also remove the default close button, so please ensure you provide an easy,
     * accessible way for users to dismiss the drawer.
     */
    noHeader: boolean;
    firstUpdated(): void;
    disconnectedCallback(): void;
    private requestClose;
    private addOpenListeners;
    private removeOpenListeners;
    private handleDocumentKeyDown;
    handleOpenChange(): Promise<void>;
    handleNoModalChange(): void;
    /** Shows the drawer. */
    show(): Promise<void>;
    /** Hides the drawer */
    hide(): Promise<void>;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-drawer': SlDrawer;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-dropdown': SlDropdown;
    }
};

/**
 * @summary Formats a number as a human readable bytes value.
 * @documentation https://shoelace.style/components/format-bytes
 * @status stable
 * @since 2.0
 */
declare class SlFormatBytes extends ShoelaceElement {
    private readonly localize;
    /** The number to format in bytes. */
    value: number;
    /** The type of unit to display. */
    unit: 'byte' | 'bit';
    /** Determines how to display the result, e.g. "100 bytes", "100 b", or "100b". */
    display: 'long' | 'short' | 'narrow';
    render(): string;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-format-bytes': SlFormatBytes;
    }
};

/**
 * @summary Formats a date/time using the specified locale and options.
 * @documentation https://shoelace.style/components/format-date
 * @status stable
 * @since 2.0
 */
declare class SlFormatDate extends ShoelaceElement {
    private readonly localize;
    /**
     * The date/time to format. If not set, the current date and time will be used. When passing a string, it's strongly
     * recommended to use the ISO 8601 format to ensure timezones are handled correctly. To convert a date to this format
     * in JavaScript, use [`date.toISOString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).
     */
    date: Date | string;
    /** The format for displaying the weekday. */
    weekday: 'narrow' | 'short' | 'long';
    /** The format for displaying the era. */
    era: 'narrow' | 'short' | 'long';
    /** The format for displaying the year. */
    year: 'numeric' | '2-digit';
    /** The format for displaying the month. */
    month: 'numeric' | '2-digit' | 'narrow' | 'short' | 'long';
    /** The format for displaying the day. */
    day: 'numeric' | '2-digit';
    /** The format for displaying the hour. */
    hour: 'numeric' | '2-digit';
    /** The format for displaying the minute. */
    minute: 'numeric' | '2-digit';
    /** The format for displaying the second. */
    second: 'numeric' | '2-digit';
    /** The format for displaying the time. */
    timeZoneName: 'short' | 'long';
    /** The time zone to express the time in. */
    timeZone: string;
    /** The format for displaying the hour. */
    hourFormat: 'auto' | '12' | '24';
    render(): lit_html.TemplateResult<1> | undefined;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-format-date': SlFormatDate;
    }
};

/**
 * @summary Formats a number using the specified locale and options.
 * @documentation https://shoelace.style/components/format-number
 * @status stable
 * @since 2.0
 */
declare class SlFormatNumber extends ShoelaceElement {
    private readonly localize;
    /** The number to format. */
    value: number;
    /** The formatting style to use. */
    type: 'currency' | 'decimal' | 'percent';
    /** Turns off grouping separators. */
    noGrouping: boolean;
    /** The [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217) currency code to use when formatting. */
    currency: string;
    /** How to display the currency. */
    currencyDisplay: 'symbol' | 'narrowSymbol' | 'code' | 'name';
    /** The minimum number of integer digits to use. Possible values are 1-21. */
    minimumIntegerDigits: number;
    /** The minimum number of fraction digits to use. Possible values are 0-20. */
    minimumFractionDigits: number;
    /** The maximum number of fraction digits to use. Possible values are 0-0. */
    maximumFractionDigits: number;
    /** The minimum number of significant digits to use. Possible values are 1-21. */
    minimumSignificantDigits: number;
    /** The maximum number of significant digits to use,. Possible values are 1-21. */
    maximumSignificantDigits: number;
    render(): string;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-format-number': SlFormatNumber;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-icon': SlIcon;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-icon-button': SlIconButton;
    }
};



/**
 * @summary Compare visual differences between similar photos with a sliding panel.
 * @documentation https://shoelace.style/components/image-comparer
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 *
 * @slot before - The before image, an `<img>` or `<svg>` element.
 * @slot after - The after image, an `<img>` or `<svg>` element.
 * @slot handle - The icon used inside the handle.
 *
 * @event sl-change - Emitted when the position changes.
 *
 * @csspart base - The component's base wrapper.
 * @csspart before - The container that wraps the before image.
 * @csspart after - The container that wraps the after image.
 * @csspart divider - The divider that separates the images.
 * @csspart handle - The handle that the user drags to expose the after image.
 *
 * @cssproperty --divider-width - The width of the dividing line.
 * @cssproperty --handle-size - The size of the compare handle.
 */
declare class SlImageComparer extends ShoelaceElement {
    static styles: CSSResultGroup;
    static scopedElement: {
        'sl-icon': typeof SlIcon;
    };
    private readonly localize;
    base: HTMLElement;
    handle: HTMLElement;
    /** The position of the divider as a percentage. */
    position: number;
    private handleDrag;
    private handleKeyDown;
    handlePositionChange(): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-image-comparer': SlImageComparer;
    }
};



/**
 * @summary Includes give you the power to embed external HTML files into the page.
 * @documentation https://shoelace.style/components/include
 * @status stable
 * @since 2.0
 *
 * @event sl-load - Emitted when the included file is loaded.
 * @event {{ status: number }} sl-error - Emitted when the included file fails to load due to an error.
 */
declare class SlInclude extends ShoelaceElement {
    static styles: CSSResultGroup;
    /**
     * The location of the HTML file to include. Be sure you trust the content you are including as it will be executed as
     * code and can result in XSS attacks.
     */
    src: string;
    /** The fetch mode to use. */
    mode: 'cors' | 'no-cors' | 'same-origin';
    /**
     * Allows included scripts to be executed. Be sure you trust the content you are including as it will be executed as
     * code and can result in XSS attacks.
     */
    allowScripts: boolean;
    private executeScript;
    handleSrcChange(): Promise<void>;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-include': SlInclude;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-input': SlInput;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-menu-item': SlMenuItem;
    }
};



/**
 * @summary Menu labels are used to describe a group of menu items.
 * @documentation https://shoelace.style/components/menu-label
 * @status stable
 * @since 2.0
 *
 * @slot - The menu label's content.
 *
 * @csspart base - The component's base wrapper.
 */
declare class SlMenuLabel extends ShoelaceElement {
    static styles: CSSResultGroup;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-menu-label': SlMenuLabel;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-menu-label': SlMenuLabel;
    }
};



/**
 * @summary The Mutation Observer component offers a thin, declarative interface to the [`MutationObserver API`](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver).
 * @documentation https://shoelace.style/components/mutation-observer
 * @status stable
 * @since 2.0
 *
 * @event {{ mutationList: MutationRecord[] }} sl-mutation - Emitted when a mutation occurs.
 *
 * @slot - The content to watch for mutations.
 */
declare class SlMutationObserver extends ShoelaceElement {
    static styles: CSSResultGroup;
    private mutationObserver;
    /**
     * Watches for changes to attributes. To watch only specific attributes, separate them by a space, e.g.
     * `attr="class id title"`. To watch all attributes, use `*`.
     */
    attr: string;
    /** Indicates whether or not the attribute's previous value should be recorded when monitoring changes. */
    attrOldValue: boolean;
    /** Watches for changes to the character data contained within the node. */
    charData: boolean;
    /** Indicates whether or not the previous value of the node's text should be recorded. */
    charDataOldValue: boolean;
    /** Watches for the addition or removal of new child nodes. */
    childList: boolean;
    /** Disables the observer. */
    disabled: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleMutation;
    private startObserver;
    private stopObserver;
    handleDisabledChange(): void;
    handleChange(): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-mutation-observer': SlMutationObserver;
    }
};



/**
 * @summary Options define the selectable items within various form controls such as [select](/components/select).
 * @documentation https://shoelace.style/components/option
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 *
 * @slot - The option's label.
 * @slot prefix - Used to prepend an icon or similar element to the menu item.
 * @slot suffix - Used to append an icon or similar element to the menu item.
 *
 * @csspart checked-icon - The checked icon, an `<sl-icon>` element.
 * @csspart base - The component's base wrapper.
 * @csspart label - The option's label.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart suffix - The container that wraps the suffix.
 */
declare class SlOption extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon': typeof SlIcon;
    };
    private readonly localize;
    private isInitialized;
    defaultSlot: HTMLSlotElement;
    current: boolean;
    selected: boolean;
    hasHover: boolean;
    /**
     * The option's value. When selected, the containing form control will receive this value. The value must be unique
     * from other options in the same group. Values may not contain spaces, as spaces are used as delimiters when listing
     * multiple values.
     */
    value: string;
    /** Draws the option in a disabled state, preventing selection. */
    disabled: boolean;
    connectedCallback(): void;
    private handleDefaultSlotChange;
    private handleMouseEnter;
    private handleMouseLeave;
    handleDisabledChange(): void;
    handleSelectedChange(): void;
    handleValueChange(): void;
    /** Returns a plain text label based on the option's content. */
    getTextLabel(): string;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-option': SlOption;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-popup': SlPopup;
    }
};



/**
 * @summary Progress bars are used to show the status of an ongoing operation.
 * @documentation https://shoelace.style/components/progress-bar
 * @status stable
 * @since 2.0
 *
 * @slot - A label to show inside the progress indicator.
 *
 * @csspart base - The component's base wrapper.
 * @csspart indicator - The progress bar's indicator.
 * @csspart label - The progress bar's label.
 *
 * @cssproperty --height - The progress bar's height.
 * @cssproperty --track-color - The color of the track.
 * @cssproperty --indicator-color - The color of the indicator.
 * @cssproperty --label-color - The color of the label.
 */
declare class SlProgressBar extends ShoelaceElement {
    static styles: CSSResultGroup;
    private readonly localize;
    /** The current progress as a percentage, 0 to 100. */
    value: number;
    /** When true, percentage is ignored, the label is hidden, and the progress bar is drawn in an indeterminate state. */
    indeterminate: boolean;
    /** A custom label for assistive devices. */
    label: string;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-progress-bar': SlProgressBar;
    }
};



/**
 * @summary Progress rings are used to show the progress of a determinate operation in a circular fashion.
 * @documentation https://shoelace.style/components/progress-ring
 * @status stable
 * @since 2.0
 *
 * @slot - A label to show inside the ring.
 *
 * @csspart base - The component's base wrapper.
 * @csspart label - The progress ring label.
 *
 * @cssproperty --size - The diameter of the progress ring (cannot be a percentage).
 * @cssproperty --track-width - The width of the track.
 * @cssproperty --track-color - The color of the track.
 * @cssproperty --indicator-width - The width of the indicator. Defaults to the track width.
 * @cssproperty --indicator-color - The color of the indicator.
 * @cssproperty --indicator-transition-duration - The duration of the indicator's transition when the value changes.
 */
declare class SlProgressRing extends ShoelaceElement {
    static styles: CSSResultGroup;
    private readonly localize;
    indicator: SVGCircleElement;
    indicatorOffset: string;
    /** The current progress as a percentage, 0 to 100. */
    value: number;
    /** A custom label for assistive devices. */
    label: string;
    updated(changedProps: Map<string, unknown>): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-progress-ring': SlProgressRing;
    }
};



/**
 * @summary Generates a [QR code](https://www.qrcode.com/) and renders it using the [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API).
 * @documentation https://shoelace.style/components/qr-code
 * @status stable
 * @since 2.0
 *
 * @csspart base - The component's base wrapper.
 */
declare class SlQrCode extends ShoelaceElement {
    static styles: CSSResultGroup;
    canvas: HTMLElement;
    /** The QR code's value. */
    value: string;
    /** The label for assistive devices to announce. If unspecified, the value will be used instead. */
    label: string;
    /** The size of the QR code, in pixels. */
    size: number;
    /** The fill color. This can be any valid CSS color, but not a CSS custom property. */
    fill: string;
    /** The background color. This can be any valid CSS color or `transparent`. It cannot be a CSS custom property. */
    background: string;
    /** The edge radius of each module. Must be between 0 and 0.5. */
    radius: number;
    /** The level of error correction to use. [Learn more](https://www.qrcode.com/en/about/error_correction.html) */
    errorCorrection: 'L' | 'M' | 'Q' | 'H';
    firstUpdated(): void;
    generate(): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-qr-code': SlQrCode;
    }
};



/**
 * @summary Radios allow the user to select a single option from a group.
 * @documentation https://shoelace.style/components/radio
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 *
 * @slot - The radio's label.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-focus - Emitted when the control gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The circular container that wraps the radio's checked state.
 * @csspart control--checked - The radio control when the radio is checked.
 * @csspart checked-icon - The checked icon, an `<sl-icon>` element.
 * @csspart label - The container that wraps the radio's label.
 */
declare class SlRadio extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon': typeof SlIcon;
    };
    checked: boolean;
    protected hasFocus: boolean;
    /** The radio's value. When selected, the radio group will receive this value. */
    value: string;
    /**
     * The radio's size. When used inside a radio group, the size will be determined by the radio group's size so this
     * attribute can typically be omitted.
     */
    size: 'small' | 'medium' | 'large';
    /** Disables the radio. */
    disabled: boolean;
    constructor();
    connectedCallback(): void;
    private handleBlur;
    private handleClick;
    private handleFocus;
    private setInitialAttributes;
    handleCheckedChange(): void;
    handleDisabledChange(): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-radio': SlRadio;
    }
};



/**
 * @summary Radios buttons allow the user to select a single option from a group using a button-like control.
 * @documentation https://shoelace.style/components/radio-button
 * @status stable
 * @since 2.0
 *
 * @slot - The radio button's label.
 * @slot prefix - A presentational prefix icon or similar element.
 * @slot suffix - A presentational suffix icon or similar element.
 *
 * @event sl-blur - Emitted when the button loses focus.
 * @event sl-focus - Emitted when the button gains focus.
 *
 * @csspart base - The component's base wrapper.
 * @csspart button - The internal `<button>` element.
 * @csspart button--checked - The internal button element when the radio button is checked.
 * @csspart prefix - The container that wraps the prefix.
 * @csspart label - The container that wraps the radio button's label.
 * @csspart suffix - The container that wraps the suffix.
 */
declare class SlRadioButton extends ShoelaceElement {
    static styles: CSSResultGroup;
    private readonly hasSlotController;
    input: HTMLInputElement;
    hiddenInput: HTMLInputElement;
    protected hasFocus: boolean;
    /**
     * @internal The radio button's checked state. This is exposed as an "internal" attribute so we can reflect it, making
     * it easier to style in button groups.
     */
    checked: boolean;
    /** The radio's value. When selected, the radio group will receive this value. */
    value: string;
    /** Disables the radio button. */
    disabled: boolean;
    /**
     * The radio button's size. When used inside a radio group, the size will be determined by the radio group's size so
     * this attribute can typically be omitted.
     */
    size: 'small' | 'medium' | 'large';
    /** Draws a pill-style radio button with rounded edges. */
    pill: boolean;
    connectedCallback(): void;
    private handleBlur;
    private handleClick;
    private handleFocus;
    handleDisabledChange(): void;
    /** Sets focus on the radio button. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the radio button. */
    blur(): void;
    render(): lit_html.TemplateResult;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-radio-button': SlRadioButton;
    }
};






interface FormControlControllerOptions {
    /** A function that returns the form containing the form control. */
    form: (input: ShoelaceFormControl) => HTMLFormElement | null;
    /** A function that returns the form control's name, which will be submitted with the form data. */
    name: (input: ShoelaceFormControl) => string;
    /** A function that returns the form control's current value. */
    value: (input: ShoelaceFormControl) => unknown | unknown[];
    /** A function that returns the form control's default value. */
    defaultValue: (input: ShoelaceFormControl) => unknown | unknown[];
    /** A function that returns the form control's current disabled state. If disabled, the value won't be submitted. */
    disabled: (input: ShoelaceFormControl) => boolean;
    /**
     * A function that maps to the form control's reportValidity() function. When the control is invalid, this will
     * prevent submission and trigger the browser's constraint violation warning.
     */
    reportValidity: (input: ShoelaceFormControl) => boolean;
    /**
     * A function that maps to the form control's `checkValidity()` function. When the control is invalid, this will return false.
     *   this is helpful is you want to check validation without triggering the native browser constraint violation warning.
     */
    checkValidity: (input: ShoelaceFormControl) => boolean;
    /** A function that sets the form control's value */
    setValue: (input: ShoelaceFormControl, value: unknown) => void;
    /**
     * An array of event names to listen to. When all events in the list are emitted, the control will receive validity
     * states such as user-valid and user-invalid.user interacted validity states. */
    assumeInteractionOn: string[];
}
/** A reactive controller to allow form controls to participate in form submission, validation, etc. */
declare class FormControlController implements ReactiveController {
    host: ShoelaceFormControl & ReactiveControllerHost;
    form?: HTMLFormElement | null;
    options: FormControlControllerOptions;
    constructor(host: ReactiveControllerHost & ShoelaceFormControl, options?: Partial<FormControlControllerOptions>);
    hostConnected(): void;
    hostDisconnected(): void;
    hostUpdated(): void;
    private attachForm;
    private detachForm;
    private handleFormData;
    private handleFormSubmit;
    private handleFormReset;
    private handleInteraction;
    private checkFormValidity;
    private reportFormValidity;
    private setUserInteracted;
    private doAction;
    /** Returns the associated `<form>` element, if one exists. */
    getForm(): HTMLFormElement | null;
    /** Resets the form, restoring all the control to their default value */
    reset(submitter?: HTMLInputElement | SlButton): void;
    /** Submits the form, triggering validation and form data injection. */
    submit(submitter?: HTMLInputElement | SlButton): void;
    /**
     * Synchronously sets the form control's validity. Call this when you know the future validity but need to update
     * the host element immediately, i.e. before Lit updates the component in the next update.
     */
    setValidity(isValid: boolean): void;
    /**
     * Updates the form control's validity based on the current value of `host.validity.valid`. Call this when anything
     * that affects constraint validation changes so the component receives the correct validity states.
     */
    updateValidity(): void;
    /**
     * Dispatches a non-bubbling, cancelable custom event of type `sl-invalid`.
     * If the `sl-invalid` event will be cancelled then the original `invalid`
     * event (which may have been passed as argument) will also be cancelled.
     * If no original `invalid` event has been passed then the `sl-invalid`
     * event will be cancelled before being dispatched.
     */
    emitInvalidEvent(originalInvalidEvent?: Event): void;
}




/**
 * @summary Radio groups are used to group multiple [radios](/components/radio) or [radio buttons](/components/radio-button) so they function as a single form control.
 * @documentation https://shoelace.style/components/radio-group
 * @status stable
 * @since 2.0
 *
 * @dependency sl-button-group
 *
 * @slot - The default slot where `<sl-radio>` or `<sl-radio-button>` elements are placed.
 * @slot label - The radio group's label. Required for proper accessibility. Alternatively, you can use the `label`
 *  attribute.
 * @slot help-text - Text that describes how to use the radio group. Alternatively, you can use the `help-text` attribute.
 *
 * @event sl-change - Emitted when the radio group's selected value changes.
 * @event sl-input - Emitted when the radio group receives user input.
 * @event sl-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart button-group - The button group that wraps radio buttons.
 * @csspart button-group__base - The button group's `base` part.
 */
declare class SlRadioGroup extends ShoelaceElement implements ShoelaceFormControl {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-button-group': typeof SlButtonGroup;
    };
    protected readonly formControlController: FormControlController;
    private readonly hasSlotController;
    private customValidityMessage;
    private validationTimeout;
    defaultSlot: HTMLSlotElement;
    validationInput: HTMLInputElement;
    private hasButtonGroup;
    private errorMessage;
    defaultValue: string;
    /**
     * The radio group's label. Required for proper accessibility. If you need to display HTML, use the `label` slot
     * instead.
     */
    label: string;
    /** The radio groups's help text. If you need to display HTML, use the `help-text` slot instead. */
    helpText: string;
    /** The name of the radio group, submitted as a name/value pair with form data. */
    name: string;
    /** The current value of the radio group, submitted as a name/value pair with form data. */
    value: string;
    /** The radio group's size. This size will be applied to all child radios and radio buttons. */
    size: 'small' | 'medium' | 'large';
    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    form: string;
    /** Ensures a child radio is checked before allowing the containing form to submit. */
    required: boolean;
    /** Gets the validity state object */
    get validity(): ValidityState;
    /** Gets the validation message */
    get validationMessage(): string;
    connectedCallback(): void;
    firstUpdated(): void;
    private getAllRadios;
    private handleRadioClick;
    private handleKeyDown;
    private handleLabelClick;
    private handleInvalid;
    private syncRadioElements;
    private syncRadios;
    private updateCheckedRadio;
    handleSizeChange(): void;
    handleValueChange(): void;
    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity(): boolean;
    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null;
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity(): boolean;
    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message?: string): void;
    /** Sets focus on the radio-group. */
    focus(options?: FocusOptions): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-radio-group': SlRadioGroup;
    }
};




/**
 * @summary Ranges allow the user to select a single value within a given range using a slider.
 * @documentation https://shoelace.style/components/range
 * @status stable
 * @since 2.0
 *
 * @slot label - The range's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when an alteration to the control's value is committed by the user.
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-input - Emitted when the control receives input.
 * @event sl-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The range's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart input - The internal `<input>` element.
 * @csspart tooltip - The range's tooltip.
 *
 * @cssproperty --thumb-size - The size of the thumb.
 * @cssproperty --tooltip-offset - The vertical distance the tooltip is offset from the track.
 * @cssproperty --track-color-active - The color of the portion of the track that represents the current value.
 * @cssproperty --track-color-inactive - The of the portion of the track that represents the remaining value.
 * @cssproperty --track-height - The height of the track.
 * @cssproperty --track-active-offset - The point of origin of the active track.
 */
declare class SlRange extends ShoelaceElement implements ShoelaceFormControl {
    static styles: CSSResultGroup;
    private readonly formControlController;
    private readonly hasSlotController;
    private readonly localize;
    private resizeObserver;
    input: HTMLInputElement;
    output: HTMLOutputElement | null;
    private hasFocus;
    private hasTooltip;
    title: string;
    /** The name of the range, submitted as a name/value pair with form data. */
    name: string;
    /** The current value of the range, submitted as a name/value pair with form data. */
    value: number;
    /** The range's label. If you need to display HTML, use the `label` slot instead. */
    label: string;
    /** The range's help text. If you need to display HTML, use the help-text slot instead. */
    helpText: string;
    /** Disables the range. */
    disabled: boolean;
    /** The minimum acceptable value of the range. */
    min: number;
    /** The maximum acceptable value of the range. */
    max: number;
    /** The interval at which the range will increase and decrease. */
    step: number;
    /** The preferred placement of the range's tooltip. */
    tooltip: 'top' | 'bottom' | 'none';
    /**
     * A function used to format the tooltip's value. The range's value is passed as the first and only argument. The
     * function should return a string to display in the tooltip.
     */
    tooltipFormatter: (value: number) => string;
    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    form: string;
    /** The default value of the form control. Primarily used for resetting the form control. */
    defaultValue: number;
    /** Gets the validity state object */
    get validity(): ValidityState;
    /** Gets the validation message */
    get validationMessage(): string;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleChange;
    private handleInput;
    private handleBlur;
    private handleFocus;
    private handleThumbDragStart;
    private handleThumbDragEnd;
    private syncProgress;
    private syncTooltip;
    handleValueChange(): void;
    handleDisabledChange(): void;
    syncRange(): void;
    private handleInvalid;
    /** Sets focus on the range. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the range. */
    blur(): void;
    /** Increments the value of the range by the value of the step attribute. */
    stepUp(): void;
    /** Decrements the value of the range by the value of the step attribute. */
    stepDown(): void;
    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity(): boolean;
    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null;
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity(): boolean;
    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message: string): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-range': SlRange;
    }
};



/**
 * @summary Ratings give users a way to quickly view and provide feedback.
 * @documentation https://shoelace.style/components/rating
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 *
 * @event sl-change - Emitted when the rating's value changes.
 * @event {{ phase: 'start' | 'move' | 'end', value: number }} sl-hover - Emitted when the user hovers over a value. The
 *  `phase` property indicates when hovering starts, moves to a new value, or ends. The `value` property tells what the
 *  rating's value would be if the user were to commit to the hovered value.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --symbol-color - The inactive color for symbols.
 * @cssproperty --symbol-color-active - The active color for symbols.
 * @cssproperty --symbol-size - The size of symbols.
 * @cssproperty --symbol-spacing - The spacing to use around symbols.
 */
declare class SlRating extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon': typeof SlIcon;
    };
    private readonly localize;
    rating: HTMLElement;
    private hoverValue;
    private isHovering;
    /** A label that describes the rating to assistive devices. */
    label: string;
    /** The current rating. */
    value: number;
    /** The highest rating to show. */
    max: number;
    /**
     * The precision at which the rating will increase and decrease. For example, to allow half-star ratings, set this
     * attribute to `0.5`.
     */
    precision: number;
    /** Makes the rating readonly. */
    readonly: boolean;
    /** Disables the rating. */
    disabled: boolean;
    /**
     * A function that customizes the symbol to be rendered. The first and only argument is the rating's current value.
     * The function should return a string containing trusted HTML of the symbol to render at the specified value. Works
     * well with `<sl-icon>` elements.
     */
    getSymbol: (value: number) => string;
    private getValueFromMousePosition;
    private getValueFromTouchPosition;
    private getValueFromXCoordinate;
    private handleClick;
    private setValue;
    private handleKeyDown;
    private handleMouseEnter;
    private handleMouseMove;
    private handleMouseLeave;
    private handleTouchStart;
    private handleTouchMove;
    private handleTouchEnd;
    private roundToPrecision;
    handleHoverValueChange(): void;
    handleIsHoveringChange(): void;
    /** Sets focus on the rating. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the rating. */
    blur(): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-rating': SlRating;
    }
};

/**
 * @summary Outputs a localized time phrase relative to the current date and time.
 * @documentation https://shoelace.style/components/relative-time
 * @status stable
 * @since 2.0
 */
declare class SlRelativeTime extends ShoelaceElement {
    private readonly localize;
    private updateTimeout;
    private isoTime;
    private relativeTime;
    /**
     * The date from which to calculate time from. If not set, the current date and time will be used. When passing a
     * string, it's strongly recommended to use the ISO 8601 format to ensure timezones are handled correctly. To convert
     * a date to this format in JavaScript, use [`date.toISOString()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString).
     */
    date: Date | string;
    /** The formatting style to use. */
    format: 'long' | 'short' | 'narrow';
    /**
     * When `auto`, values such as "yesterday" and "tomorrow" will be shown when possible. When `always`, values such as
     * "1 day ago" and "in 1 day" will be shown.
     */
    numeric: 'always' | 'auto';
    /** Keep the displayed value up to date as time passes. */
    sync: boolean;
    disconnectedCallback(): void;
    render(): "" | lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-relative-time': SlRelativeTime;
    }
};



/**
 * @summary The Resize Observer component offers a thin, declarative interface to the [`ResizeObserver API`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver).
 * @documentation https://shoelace.style/components/resize-observer
 * @status stable
 * @since 2.0
 *
 * @slot - One or more elements to watch for resizing.
 *
 * @event {{ entries: ResizeObserverEntry[] }} sl-resize - Emitted when the element is resized.
 */
declare class SlResizeObserver extends ShoelaceElement {
    static styles: CSSResultGroup;
    private resizeObserver;
    private observedElements;
    /** Disables the observer. */
    disabled: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private handleSlotChange;
    private startObserver;
    private stopObserver;
    handleDisabledChange(): void;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-resize-observer': SlResizeObserver;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-resize-observer': SlResizeObserver;
    }
};



/**
 * @summary Tags are used as labels to organize things or to indicate a selection.
 * @documentation https://shoelace.style/components/tag
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon-button
 *
 * @slot - The tag's content.
 *
 * @event sl-remove - Emitted when the remove button is activated.
 *
 * @csspart base - The component's base wrapper.
 * @csspart content - The tag's content.
 * @csspart remove-button - The tag's remove button, an `<sl-icon-button>`.
 * @csspart remove-button__base - The remove button's exported `base` part.
 */
declare class SlTag extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon-button': typeof SlIconButton;
    };
    private readonly localize;
    /** The tag's theme variant. */
    variant: 'primary' | 'success' | 'neutral' | 'warning' | 'danger' | 'text';
    /** The tag's size. */
    size: 'small' | 'medium' | 'large';
    /** Draws a pill-style tag with rounded edges. */
    pill: boolean;
    /** Makes the tag removable and shows a remove button. */
    removable: boolean;
    private handleRemoveClick;
    render(): lit_html.TemplateResult<1>;
}







/**
 * @summary Selects allow you to choose items from a menu of predefined options.
 * @documentation https://shoelace.style/components/select
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon
 * @dependency sl-popup
 * @dependency sl-tag
 *
 * @slot - The listbox options. Must be `<sl-option>` elements. You can use `<sl-divider>` to group items visually.
 * @slot label - The input's label. Alternatively, you can use the `label` attribute.
 * @slot prefix - Used to prepend a presentational icon or similar element to the combobox.
 * @slot suffix - Used to append a presentational icon or similar element to the combobox.
 * @slot clear-icon - An icon to use in lieu of the default clear icon.
 * @slot expand-icon - The icon to show when the control is expanded and collapsed. Rotates on open and close.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event sl-change - Emitted when the control's value changes.
 * @event sl-clear - Emitted when the control's value is cleared.
 * @event sl-input - Emitted when the control receives input.
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-show - Emitted when the select's menu opens.
 * @event sl-after-show - Emitted after the select's menu opens and all animations are complete.
 * @event sl-hide - Emitted when the select's menu closes.
 * @event sl-after-hide - Emitted after the select's menu closes and all animations are complete.
 * @event sl-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The select's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart combobox - The container the wraps the prefix, suffix, combobox, clear icon, and expand button.
 * @csspart prefix - The container that wraps the prefix slot.
 * @csspart suffix - The container that wraps the suffix slot.
 * @csspart display-input - The element that displays the selected option's label, an `<input>` element.
 * @csspart listbox - The listbox container where options are slotted.
 * @csspart tags - The container that houses option tags when `multiselect` is used.
 * @csspart tag - The individual tags that represent each multiselect option.
 * @csspart tag__base - The tag's base part.
 * @csspart tag__content - The tag's content part.
 * @csspart tag__remove-button - The tag's remove button.
 * @csspart tag__remove-button__base - The tag's remove button base part.
 * @csspart clear-button - The clear button.
 * @csspart expand-icon - The container that wraps the expand icon.
 */
declare class SlSelect extends ShoelaceElement implements ShoelaceFormControl {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon': typeof SlIcon;
        'sl-popup': typeof SlPopup;
        'sl-tag': typeof SlTag;
    };
    private readonly formControlController;
    private readonly hasSlotController;
    private readonly localize;
    private typeToSelectString;
    private typeToSelectTimeout;
    private closeWatcher;
    popup: SlPopup;
    combobox: HTMLSlotElement;
    displayInput: HTMLInputElement;
    valueInput: HTMLInputElement;
    listbox: HTMLSlotElement;
    private hasFocus;
    displayLabel: string;
    currentOption: SlOption;
    selectedOptions: SlOption[];
    private valueHasChanged;
    /** The name of the select, submitted as a name/value pair with form data. */
    name: string;
    private _value;
    get value(): string | string[];
    /**
     * The current value of the select, submitted as a name/value pair with form data. When `multiple` is enabled, the
     * value attribute will be a space-delimited list of values based on the options selected, and the value property will
     * be an array. **For this reason, values must not contain spaces.**
     */
    set value(val: string | string[]);
    /** The default value of the form control. Primarily used for resetting the form control. */
    defaultValue: string | string[];
    /** The select's size. */
    size: 'small' | 'medium' | 'large';
    /** Placeholder text to show as a hint when the select is empty. */
    placeholder: string;
    /** Allows more than one option to be selected. */
    multiple: boolean;
    /**
     * The maximum number of selected options to show when `multiple` is true. After the maximum, "+n" will be shown to
     * indicate the number of additional items that are selected. Set to 0 to remove the limit.
     */
    maxOptionsVisible: number;
    /** Disables the select control. */
    disabled: boolean;
    /** Adds a clear button when the select is not empty. */
    clearable: boolean;
    /**
     * Indicates whether or not the select is open. You can toggle this attribute to show and hide the menu, or you can
     * use the `show()` and `hide()` methods and this attribute will reflect the select's open state.
     */
    open: boolean;
    /**
     * Enable this option to prevent the listbox from being clipped when the component is placed inside a container with
     * `overflow: auto|scroll`. Hoisting uses a fixed positioning strategy that works in many, but not all, scenarios.
     */
    hoist: boolean;
    /** Draws a filled select. */
    filled: boolean;
    /** Draws a pill-style select with rounded edges. */
    pill: boolean;
    /** The select's label. If you need to display HTML, use the `label` slot instead. */
    label: string;
    /**
     * The preferred placement of the select's menu. Note that the actual placement may vary as needed to keep the listbox
     * inside of the viewport.
     */
    placement: 'top' | 'bottom';
    /** The select's help text. If you need to display HTML, use the `help-text` slot instead. */
    helpText: string;
    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    form: string;
    /** The select's required attribute. */
    required: boolean;
    /**
     * A function that customizes the tags to be rendered when multiple=true. The first argument is the option, the second
     * is the current tag's index.  The function should return either a Lit TemplateResult or a string containing trusted HTML of the symbol to render at
     * the specified value.
     */
    getTag: (option: SlOption, index: number) => TemplateResult | string | HTMLElement;
    /** Gets the validity state object */
    get validity(): ValidityState;
    /** Gets the validation message */
    get validationMessage(): string;
    connectedCallback(): void;
    private addOpenListeners;
    private removeOpenListeners;
    private handleFocus;
    private handleBlur;
    private handleDocumentFocusIn;
    private handleDocumentKeyDown;
    private handleDocumentMouseDown;
    private handleLabelClick;
    private handleComboboxMouseDown;
    private handleComboboxKeyDown;
    private handleClearClick;
    private handleClearMouseDown;
    private handleOptionClick;
    handleDefaultSlotChange(): void;
    private handleTagRemove;
    private getAllOptions;
    private getFirstOption;
    private setCurrentOption;
    private setSelectedOptions;
    private toggleOptionSelection;
    private selectionChanged;
    protected get tags(): TemplateResult<1>[];
    private handleInvalid;
    handleDisabledChange(): void;
    attributeChangedCallback(name: string, oldVal: string | null, newVal: string | null): void;
    handleValueChange(): void;
    handleOpenChange(): Promise<void>;
    /** Shows the listbox. */
    show(): Promise<void>;
    /** Hides the listbox. */
    hide(): Promise<void>;
    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity(): boolean;
    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null;
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity(): boolean;
    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message: string): void;
    /** Sets focus on the control. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the control. */
    blur(): void;
    render(): TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-select': SlSelect;
    }
};



/**
 * @summary Skeletons are used to provide a visual representation of where content will eventually be drawn.
 * @documentation https://shoelace.style/components/skeleton
 * @status stable
 * @since 2.0
 *
 * @csspart base - The component's base wrapper.
 * @csspart indicator - The skeleton's indicator which is responsible for its color and animation.
 *
 * @cssproperty --border-radius - The skeleton's border radius.
 * @cssproperty --color - The color of the skeleton.
 * @cssproperty --sheen-color - The sheen color when the skeleton is in its loading state.
 */
declare class SlSkeleton extends ShoelaceElement {
    static styles: CSSResultGroup;
    /** Determines which effect the skeleton will use. */
    effect: 'pulse' | 'sheen' | 'none';
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-skeleton': SlSkeleton;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-spinner': SlSpinner;
    }
};



interface SnapFunctionParams {
    /** The position the divider has been dragged to, in pixels. */
    pos: number;
    /** The size of the split-panel across its primary axis, in pixels. */
    size: number;
    /** The snap-threshold passed to the split-panel, in pixels. May be infinity. */
    snapThreshold: number;
    /** Whether or not the user-agent is RTL. */
    isRtl: boolean;
    /** Whether or not the split panel is vertical. */
    vertical: boolean;
}
/** Used by sl-split-panel to convert an input position into a snapped position. */
type SnapFunction = (opt: SnapFunctionParams) => number | null;
/**
 * @summary Split panels display two adjacent panels, allowing the user to reposition them.
 * @documentation https://shoelace.style/components/split-panel
 * @status stable
 * @since 2.0
 *
 * @event sl-reposition - Emitted when the divider's position changes.
 *
 * @slot start - Content to place in the start panel.
 * @slot end - Content to place in the end panel.
 * @slot divider - The divider. Useful for slotting in a custom icon that renders as a handle.
 *
 * @csspart start - The start panel.
 * @csspart end - The end panel.
 * @csspart panel - Targets both the start and end panels.
 * @csspart divider - The divider that separates the start and end panels.
 *
 * @cssproperty [--divider-width=4px] - The width of the visible divider.
 * @cssproperty [--divider-hit-area=12px] - The invisible region around the divider where dragging can occur. This is
 *  usually wider than the divider to facilitate easier dragging.
 * @cssproperty [--min=0] - The minimum allowed size of the primary panel.
 * @cssproperty [--max=100%] - The maximum allowed size of the primary panel.
 */
declare class SlSplitPanel extends ShoelaceElement {
    static styles: CSSResultGroup;
    private cachedPositionInPixels;
    private isCollapsed;
    private readonly localize;
    private positionBeforeCollapsing;
    private resizeObserver;
    private size;
    divider: HTMLElement;
    /**
     * The current position of the divider from the primary panel's edge as a percentage 0-100. Defaults to 50% of the
     * container's initial size.
     */
    position: number;
    /** The current position of the divider from the primary panel's edge in pixels. */
    positionInPixels: number;
    /** Draws the split panel in a vertical orientation with the start and end panels stacked. */
    vertical: boolean;
    /** Disables resizing. Note that the position may still change as a result of resizing the host element. */
    disabled: boolean;
    /**
     * If no primary panel is designated, both panels will resize proportionally when the host element is resized. If a
     * primary panel is designated, it will maintain its size and the other panel will grow or shrink as needed when the
     * host element is resized.
     */
    primary?: 'start' | 'end';
    private snapValue;
    private snapFunction;
    /**
     * Converts a string containing either a series of fixed/repeated snap points (e.g. "repeat(20%)", "100px 200px 800px", or "10% 50% repeat(10px)") into a SnapFunction. `SnapFunction`s take in a `SnapFunctionOpts` and return the position that the split panel should snap to.
     *
     * @param snap - The snap string.
     * @returns a `SnapFunction` representing the snap string's logic.
     */
    private toSnapFunction;
    /**
     * Either one or more space-separated values at which the divider should snap, in pixels, percentages, or repeat expressions e.g. `'100px 50% 500px' or `repeat(50%) 10px`,
     * or a function which takes in a `SnapFunctionParams`, and returns a position to snap to, e.g. `({ pos }) => Math.round(pos / 8) * 8`.
     */
    set snap(snap: string | SnapFunction | null | undefined);
    get snap(): string | SnapFunction;
    /** How close the divider must be to a snap point until snapping occurs. */
    snapThreshold: number;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private detectSize;
    private percentageToPixels;
    private pixelsToPercentage;
    private handleDrag;
    private handleKeyDown;
    private handleResize;
    handlePositionChange(): void;
    handlePositionInPixelsChange(): void;
    handleVerticalChange(): void;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-split-panel': SlSplitPanel;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-split-panel': SlSplitPanel;
    }
};




/**
 * @summary Switches allow the user to toggle an option on or off.
 * @documentation https://shoelace.style/components/switch
 * @status stable
 * @since 2.0
 *
 * @slot - The switch's label.
 * @slot help-text - Text that describes how to use the switch. Alternatively, you can use the `help-text` attribute.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when the control's checked state changes.
 * @event sl-input - Emitted when the control receives input.
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart base - The component's base wrapper.
 * @csspart control - The control that houses the switch's thumb.
 * @csspart thumb - The switch's thumb.
 * @csspart label - The switch's label.
 * @csspart form-control-help-text - The help text's wrapper.
 *
 * @cssproperty --width - The width of the switch.
 * @cssproperty --height - The height of the switch.
 * @cssproperty --thumb-size - The size of the thumb.
 */
declare class SlSwitch extends ShoelaceElement implements ShoelaceFormControl {
    static styles: CSSResultGroup;
    private readonly formControlController;
    private readonly hasSlotController;
    input: HTMLInputElement;
    private hasFocus;
    title: string;
    /** The name of the switch, submitted as a name/value pair with form data. */
    name: string;
    /** The current value of the switch, submitted as a name/value pair with form data. */
    value: string;
    /** The switch's size. */
    size: 'small' | 'medium' | 'large';
    /** Disables the switch. */
    disabled: boolean;
    /** Draws the switch in a checked state. */
    checked: boolean;
    /** The default value of the form control. Primarily used for resetting the form control. */
    defaultChecked: boolean;
    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    form: string;
    /** Makes the switch a required field. */
    required: boolean;
    /** The switch's help text. If you need to display HTML, use the `help-text` slot instead. */
    helpText: string;
    /** Gets the validity state object */
    get validity(): ValidityState;
    /** Gets the validation message */
    get validationMessage(): string;
    firstUpdated(): void;
    private handleBlur;
    private handleInput;
    private handleInvalid;
    private handleClick;
    private handleFocus;
    private handleKeyDown;
    handleCheckedChange(): void;
    handleDisabledChange(): void;
    /** Simulates a click on the switch. */
    click(): void;
    /** Sets focus on the switch. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the switch. */
    blur(): void;
    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity(): boolean;
    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null;
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity(): boolean;
    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message: string): void;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-switch': SlSwitch;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-switch': SlSwitch;
    }
};



/**
 * @summary Tabs are used inside [tab groups](/components/tab-group) to represent and activate [tab panels](/components/tab-panel).
 * @documentation https://shoelace.style/components/tab
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon-button
 *
 * @slot - The tab's label.
 *
 * @event sl-close - Emitted when the tab is closable and the close button is activated.
 *
 * @csspart base - The component's base wrapper.
 * @csspart close-button - The close button, an `<sl-icon-button>`.
 * @csspart close-button__base - The close button's exported `base` part.
 */
declare class SlTab extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon-button': typeof SlIconButton;
    };
    private readonly localize;
    private readonly attrId;
    private readonly componentId;
    tab: HTMLElement;
    /** The name of the tab panel this tab is associated with. The panel must be located in the same tab group. */
    panel: string;
    /** Draws the tab in an active state. */
    active: boolean;
    /** Makes the tab closable and shows a close button. */
    closable: boolean;
    /** Disables the tab and prevents selection. */
    disabled: boolean;
    /**
     * @internal
     * Need to wrap in a `@property()` otherwise CustomElement throws a "The result must not have attributes" runtime error.
     */
    tabIndex: number;
    connectedCallback(): void;
    private handleCloseClick;
    handleActiveChange(): void;
    handleDisabledChange(): void;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-tab': SlTab;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-tab': SlTab;
    }
};



/**
 * @summary Tab groups organize content into a container that shows one section at a time.
 * @documentation https://shoelace.style/components/tab-group
 * @status stable
 * @since 2.0
 *
 * @dependency sl-icon-button
 *
 * @slot - Used for grouping tab panels in the tab group. Must be `<sl-tab-panel>` elements.
 * @slot nav - Used for grouping tabs in the tab group. Must be `<sl-tab>` elements.
 *
 * @event {{ name: String }} sl-tab-show - Emitted when a tab is shown.
 * @event {{ name: String }} sl-tab-hide - Emitted when a tab is hidden.
 *
 * @csspart base - The component's base wrapper.
 * @csspart nav - The tab group's navigation container where tabs are slotted in.
 * @csspart tabs - The container that wraps the tabs.
 * @csspart active-tab-indicator - The line that highlights the currently selected tab.
 * @csspart body - The tab group's body where tab panels are slotted in.
 * @csspart scroll-button - The previous/next scroll buttons that show when tabs are scrollable, an `<sl-icon-button>`.
 * @csspart scroll-button--start - The starting scroll button.
 * @csspart scroll-button--end - The ending scroll button.
 * @csspart scroll-button__base - The scroll button's exported `base` part.
 *
 * @cssproperty --indicator-color - The color of the active tab indicator.
 * @cssproperty --track-color - The color of the indicator's track (the line that separates tabs from panels).
 * @cssproperty --track-width - The width of the indicator's track (the line that separates tabs from panels).
 */
declare class SlTabGroup extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-icon-button': typeof SlIconButton;
        'sl-resize-observer': typeof SlResizeObserver;
    };
    private activeTab?;
    private mutationObserver;
    private resizeObserver;
    private tabs;
    private focusableTabs;
    private panels;
    private readonly localize;
    tabGroup: HTMLElement;
    body: HTMLSlotElement;
    nav: HTMLElement;
    indicator: HTMLElement;
    private hasScrollControls;
    private shouldHideScrollStartButton;
    private shouldHideScrollEndButton;
    /** The placement of the tabs. */
    placement: 'top' | 'bottom' | 'start' | 'end';
    /**
     * When set to auto, navigating tabs with the arrow keys will instantly show the corresponding tab panel. When set to
     * manual, the tab will receive focus but will not show until the user presses spacebar or enter.
     */
    activation: 'auto' | 'manual';
    /** Disables the scroll arrows that appear when tabs overflow. */
    noScrollControls: boolean;
    /** Prevent scroll buttons from being hidden when inactive. */
    fixedScrollControls: boolean;
    connectedCallback(): void;
    disconnectedCallback(): void;
    private getAllTabs;
    private getAllPanels;
    private getActiveTab;
    private handleClick;
    private handleKeyDown;
    private handleScrollToStart;
    private handleScrollToEnd;
    private setActiveTab;
    private setAriaLabels;
    private repositionIndicator;
    private syncTabsAndPanels;
    private findNextFocusableTab;
    /**
     * The reality of the browser means that we can't expect the scroll position to be exactly what we want it to be, so
     * we add one pixel of wiggle room to our calculations.
     */
    private scrollOffset;
    private updateScrollButtons;
    private isScrolledToEnd;
    private scrollFromStart;
    updateScrollControls(): void;
    syncIndicator(): void;
    /** Shows the specified tab panel. */
    show(panel: string): void;
    render(): lit_html.TemplateResult<1>;
}
declare global {
    interface HTMLElementTagNameMap {
        'sl-tab-group': SlTabGroup;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-tab-group': SlTabGroup;
    }
};



/**
 * @summary Tab panels are used inside [tab groups](/components/tab-group) to display tabbed content.
 * @documentation https://shoelace.style/components/tab-panel
 * @status stable
 * @since 2.0
 *
 * @slot - The tab panel's content.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty --padding - The tab panel's padding.
 */
declare class SlTabPanel extends ShoelaceElement {
    static styles: CSSResultGroup;
    private readonly attrId;
    private readonly componentId;
    /** The tab panel's name. */
    name: string;
    /** When true, the tab panel will be shown. */
    active: boolean;
    connectedCallback(): void;
    handleActiveChange(): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-tab-panel': SlTabPanel;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-tag': SlTag;
    }
};




/**
 * @summary Textareas collect data from the user and allow multiple lines of text.
 * @documentation https://shoelace.style/components/textarea
 * @status stable
 * @since 2.0
 *
 * @slot label - The textarea's label. Alternatively, you can use the `label` attribute.
 * @slot help-text - Text that describes how to use the input. Alternatively, you can use the `help-text` attribute.
 *
 * @event sl-blur - Emitted when the control loses focus.
 * @event sl-change - Emitted when an alteration to the control's value is committed by the user.
 * @event sl-focus - Emitted when the control gains focus.
 * @event sl-input - Emitted when the control receives input.
 * @event sl-invalid - Emitted when the form control has been checked for validity and its constraints aren't satisfied.
 *
 * @csspart form-control - The form control that wraps the label, input, and help text.
 * @csspart form-control-label - The label's wrapper.
 * @csspart form-control-input - The input's wrapper.
 * @csspart form-control-help-text - The help text's wrapper.
 * @csspart base - The component's base wrapper.
 * @csspart textarea - The internal `<textarea>` control.
 */
declare class SlTextarea extends ShoelaceElement implements ShoelaceFormControl {
    static styles: CSSResultGroup;
    private readonly formControlController;
    private readonly hasSlotController;
    private resizeObserver;
    input: HTMLTextAreaElement;
    sizeAdjuster: HTMLTextAreaElement;
    private hasFocus;
    title: string;
    /** The name of the textarea, submitted as a name/value pair with form data. */
    name: string;
    /** The current value of the textarea, submitted as a name/value pair with form data. */
    value: string;
    /** The textarea's size. */
    size: 'small' | 'medium' | 'large';
    /** Draws a filled textarea. */
    filled: boolean;
    /** The textarea's label. If you need to display HTML, use the `label` slot instead. */
    label: string;
    /** The textarea's help text. If you need to display HTML, use the `help-text` slot instead. */
    helpText: string;
    /** Placeholder text to show as a hint when the input is empty. */
    placeholder: string;
    /** The number of rows to display by default. */
    rows: number;
    /** Controls how the textarea can be resized. */
    resize: 'none' | 'vertical' | 'auto';
    /** Disables the textarea. */
    disabled: boolean;
    /** Makes the textarea readonly. */
    readonly: boolean;
    /**
     * By default, form controls are associated with the nearest containing `<form>` element. This attribute allows you
     * to place the form control outside of a form and associate it with the form that has this `id`. The form must be in
     * the same document or shadow root for this to work.
     */
    form: string;
    /** Makes the textarea a required field. */
    required: boolean;
    /** The minimum length of input that will be considered valid. */
    minlength: number;
    /** The maximum length of input that will be considered valid. */
    maxlength: number;
    /** Controls whether and how text input is automatically capitalized as it is entered by the user. */
    autocapitalize: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
    /** Indicates whether the browser's autocorrect feature is on or off. */
    autocorrect: string;
    /**
     * Specifies what permission the browser has to provide assistance in filling out form field values. Refer to
     * [this page on MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) for available values.
     */
    autocomplete: string;
    /** Indicates that the input should receive focus on page load. */
    autofocus: boolean;
    /** Used to customize the label or icon of the Enter key on virtual keyboards. */
    enterkeyhint: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
    /** Enables spell checking on the textarea. */
    spellcheck: boolean;
    /**
     * Tells the browser what type of data will be entered by the user, allowing it to display the appropriate virtual
     * keyboard on supportive devices.
     */
    inputmode: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
    /** The default value of the form control. Primarily used for resetting the form control. */
    defaultValue: string;
    /** Gets the validity state object */
    get validity(): ValidityState;
    /** Gets the validation message */
    get validationMessage(): string;
    connectedCallback(): void;
    firstUpdated(): void;
    disconnectedCallback(): void;
    private handleBlur;
    private handleChange;
    private handleFocus;
    private handleInput;
    private handleInvalid;
    private setTextareaHeight;
    handleDisabledChange(): void;
    handleRowsChange(): void;
    handleValueChange(): Promise<void>;
    /** Sets focus on the textarea. */
    focus(options?: FocusOptions): void;
    /** Removes focus from the textarea. */
    blur(): void;
    /** Selects all the text in the textarea. */
    select(): void;
    /** Gets or sets the textarea's scroll position. */
    scrollPosition(position?: {
        top?: number;
        left?: number;
    }): {
        top: number;
        left: number;
    } | undefined;
    /** Sets the start and end positions of the text selection (0-based). */
    setSelectionRange(selectionStart: number, selectionEnd: number, selectionDirection?: 'forward' | 'backward' | 'none'): void;
    /** Replaces a range of text with a new string. */
    setRangeText(replacement: string, start?: number, end?: number, selectMode?: 'select' | 'start' | 'end' | 'preserve'): void;
    /** Checks for validity but does not show a validation message. Returns `true` when valid and `false` when invalid. */
    checkValidity(): boolean;
    /** Gets the associated form, if one exists. */
    getForm(): HTMLFormElement | null;
    /** Checks for validity and shows the browser's validation message if the control is invalid. */
    reportValidity(): boolean;
    /** Sets a custom validation message. Pass an empty string to restore validity. */
    setCustomValidity(message: string): void;
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-textarea': SlTextarea;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-tooltip': SlTooltip;
    }
};





/**
 * @summary A tree item serves as a hierarchical node that lives inside a [tree](/components/tree).
 * @documentation https://shoelace.style/components/tree-item
 * @status stable
 * @since 2.0
 *
 * @dependency sl-checkbox
 * @dependency sl-icon
 * @dependency sl-spinner
 *
 * @event sl-expand - Emitted when the tree item expands.
 * @event sl-after-expand - Emitted after the tree item expands and all animations are complete.
 * @event sl-collapse - Emitted when the tree item collapses.
 * @event sl-after-collapse - Emitted after the tree item collapses and all animations are complete.
 * @event sl-lazy-change - Emitted when the tree item's lazy state changes.
 * @event sl-lazy-load - Emitted when a lazy item is selected. Use this event to asynchronously load data and append
 *  items to the tree before expanding. After appending new items, remove the `lazy` attribute to remove the loading
 *  state and update the tree.
 *
 * @slot - The default slot.
 * @slot expand-icon - The icon to show when the tree item is expanded.
 * @slot collapse-icon - The icon to show when the tree item is collapsed.
 *
 * @csspart base - The component's base wrapper.
 * @csspart item - The tree item's container. This element wraps everything except slotted tree item children.
 * @csspart item--disabled - Applied when the tree item is disabled.
 * @csspart item--expanded - Applied when the tree item is expanded.
 * @csspart item--indeterminate - Applied when the selection is indeterminate.
 * @csspart item--selected - Applied when the tree item is selected.
 * @csspart indentation - The tree item's indentation container.
 * @csspart expand-button - The container that wraps the tree item's expand button and spinner.
 * @csspart spinner - The spinner that shows when a lazy tree item is in the loading state.
 * @csspart spinner__base - The spinner's base part.
 * @csspart label - The tree item's label.
 * @csspart children - The container that wraps the tree item's nested children.
 * @csspart checkbox - The checkbox that shows when using multiselect.
 * @csspart checkbox__base - The checkbox's exported `base` part.
 * @csspart checkbox__control - The checkbox's exported `control` part.
 * @csspart checkbox__control--checked - The checkbox's exported `control--checked` part.
 * @csspart checkbox__control--indeterminate - The checkbox's exported `control--indeterminate` part.
 * @csspart checkbox__checked-icon - The checkbox's exported `checked-icon` part.
 * @csspart checkbox__indeterminate-icon - The checkbox's exported `indeterminate-icon` part.
 * @csspart checkbox__label - The checkbox's exported `label` part.
 */
declare class SlTreeItem extends ShoelaceElement {
    static styles: CSSResultGroup;
    static dependencies: {
        'sl-checkbox': typeof SlCheckbox;
        'sl-icon': typeof SlIcon;
        'sl-spinner': typeof SlSpinner;
    };
    static isTreeItem(node: Node): boolean;
    private readonly localize;
    indeterminate: boolean;
    isLeaf: boolean;
    loading: boolean;
    selectable: boolean;
    /** Expands the tree item. */
    expanded: boolean;
    /** Draws the tree item in a selected state. */
    selected: boolean;
    /** Disables the tree item. */
    disabled: boolean;
    /** Enables lazy loading behavior. */
    lazy: boolean;
    defaultSlot: HTMLSlotElement;
    childrenSlot: HTMLSlotElement;
    itemElement: HTMLDivElement;
    childrenContainer: HTMLDivElement;
    expandButtonSlot: HTMLSlotElement;
    connectedCallback(): void;
    firstUpdated(): void;
    private animateCollapse;
    private isNestedItem;
    private handleChildrenSlotChange;
    protected willUpdate(changedProperties: PropertyValueMap<SlTreeItem> | Map<PropertyKey, unknown>): void;
    private animateExpand;
    handleLoadingChange(): void;
    handleDisabledChange(): void;
    handleSelectedChange(): void;
    handleExpandedChange(): void;
    handleExpandAnimation(): void;
    handleLazyChange(): void;
    /** Gets all the nested tree items in this node. */
    getChildrenItems({ includeDisabled }?: {
        includeDisabled?: boolean;
    }): SlTreeItem[];
    render(): lit_html.TemplateResult<1>;
}



/**
 * @summary Trees allow you to display a hierarchical list of selectable [tree items](/components/tree-item). Items with children can be expanded and collapsed as desired by the user.
 * @documentation https://shoelace.style/components/tree
 * @status stable
 * @since 2.0
 *
 * @event {{ selection: SlTreeItem[] }} sl-selection-change - Emitted when a tree item is selected or deselected.
 *
 * @slot - The default slot.
 * @slot expand-icon - The icon to show when the tree item is expanded. Works best with `<sl-icon>`.
 * @slot collapse-icon - The icon to show when the tree item is collapsed. Works best with `<sl-icon>`.
 *
 * @csspart base - The component's base wrapper.
 *
 * @cssproperty [--indent-size=var(--sl-spacing-medium)] - The size of the indentation for nested items.
 * @cssproperty [--indent-guide-color=var(--sl-color-neutral-200)] - The color of the indentation line.
 * @cssproperty [--indent-guide-offset=0] - The amount of vertical spacing to leave between the top and bottom of the
 *  indentation line's starting position.
 * @cssproperty [--indent-guide-style=solid] - The style of the indentation line, e.g. solid, dotted, dashed.
 * @cssproperty [--indent-guide-width=0] - The width of the indentation line.
 */
declare class SlTree extends ShoelaceElement {
    static styles: CSSResultGroup;
    defaultSlot: HTMLSlotElement;
    expandedIconSlot: HTMLSlotElement;
    collapsedIconSlot: HTMLSlotElement;
    /**
     * The selection behavior of the tree. Single selection allows only one node to be selected at a time. Multiple
     * displays checkboxes and allows more than one node to be selected. Leaf allows only leaf nodes to be selected.
     */
    selection: 'single' | 'multiple' | 'leaf';
    private lastFocusedItem;
    private mutationObserver;
    private clickTarget;
    private readonly localize;
    constructor();
    connectedCallback(): Promise<void>;
    disconnectedCallback(): void;
    private getExpandButtonIcon;
    private initTreeItem;
    private handleTreeChanged;
    private selectItem;
    private getAllTreeItems;
    private focusItem;
    private handleKeyDown;
    private handleClick;
    handleMouseDown(event: MouseEvent): void;
    private handleFocusOut;
    private handleFocusIn;
    private handleSlotChange;
    handleSelectionChange(): Promise<void>;
    /** @internal Returns the list of tree items that are selected in the tree. */
    get selectedItems(): SlTreeItem[];
    /** @internal Gets focusable tree items in the tree. */
    getFocusableItems(): SlTreeItem[];
    render(): lit_html.TemplateResult<1>;
}

declare global {
    interface HTMLElementTagNameMap {
        'sl-tree': SlTree;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-tree-item': SlTreeItem;
    }
};

declare global {
    interface HTMLElementTagNameMap {
        'sl-visually-hidden': SlVisuallyHidden;
    }
};

declare module '@shoelace-style/animations' {
  export type Animation = Keyframe[];
  export const animations: Animation[];
  export const easings: { [key: string]: string };
  export const bounce: Animation;
  export const flash: Animation;
  export const headShake: Animation;
  export const heartBeat: Animation;
  export const jello: Animation;
  export const pulse: Animation;
  export const rubberBand: Animation;
  export const shake: Animation;
  export const shakeX: Animation;
  export const shakeY: Animation;
  export const swing: Animation;
  export const tada: Animation;
  export const wobble: Animation;
  export const backInDown: Animation;
  export const backInLeft: Animation;
  export const backInRight: Animation;
  export const backInUp: Animation;
  export const backOutDown: Animation;
  export const backOutLeft: Animation;
  export const backOutRight: Animation;
  export const backOutUp: Animation;
  export const bounceIn: Animation;
  export const bounceInDown: Animation;
  export const bounceInLeft: Animation;
  export const bounceInRight: Animation;
  export const bounceInUp: Animation;
  export const bounceOut: Animation;
  export const bounceOutDown: Animation;
  export const bounceOutLeft: Animation;
  export const bounceOutRight: Animation;
  export const bounceOutUp: Animation;
  export const fadeIn: Animation;
  export const fadeInBottomLeft: Animation;
  export const fadeInBottomRight: Animation;
  export const fadeInDown: Animation;
  export const fadeInDownBig: Animation;
  export const fadeInLeft: Animation;
  export const fadeInLeftBig: Animation;
  export const fadeInRight: Animation;
  export const fadeInRightBig: Animation;
  export const fadeInTopLeft: Animation;
  export const fadeInTopRight: Animation;
  export const fadeInUp: Animation;
  export const fadeInUpBig: Animation;
  export const fadeOut: Animation;
  export const fadeOutBottomLeft: Animation;
  export const fadeOutBottomRight: Animation;
  export const fadeOutDown: Animation;
  export const fadeOutDownBig: Animation;
  export const fadeOutLeft: Animation;
  export const fadeOutLeftBig: Animation;
  export const fadeOutRight: Animation;
  export const fadeOutRightBig: Animation;
  export const fadeOutTopLeft: Animation;
  export const fadeOutTopRight: Animation;
  export const fadeOutUp: Animation;
  export const fadeOutUpBig: Animation;
  export const flip: Animation;
  export const flipInX: Animation;
  export const flipInY: Animation;
  export const flipOutX: Animation;
  export const flipOutY: Animation;
  export const lightSpeedInLeft: Animation;
  export const lightSpeedInRight: Animation;
  export const lightSpeedOutLeft: Animation;
  export const lightSpeedOutRight: Animation;
  export const rotateIn: Animation;
  export const rotateInDownLeft: Animation;
  export const rotateInDownRight: Animation;
  export const rotateInUpLeft: Animation;
  export const rotateInUpRight: Animation;
  export const rotateOut: Animation;
  export const rotateOutDownLeft: Animation;
  export const rotateOutDownRight: Animation;
  export const rotateOutUpLeft: Animation;
  export const rotateOutUpRight: Animation;
  export const slideInDown: Animation;
  export const slideInLeft: Animation;
  export const slideInRight: Animation;
  export const slideInUp: Animation;
  export const slideOutDown: Animation;
  export const slideOutLeft: Animation;
  export const slideOutRight: Animation;
  export const slideOutUp: Animation;
  export const hinge: Animation;
  export const jackInTheBox: Animation;
  export const rollIn: Animation;
  export const rollOut: Animation;
  export const zoomIn: Animation;
  export const zoomInDown: Animation;
  export const zoomInLeft: Animation;
  export const zoomInRight: Animation;
  export const zoomInUp: Animation;
  export const zoomOut: Animation;
  export const zoomOutDown: Animation;
  export const zoomOutLeft: Animation;
  export const zoomOutRight: Animation;
  export const zoomOutUp: Animation;
};

/** Gets a list of all supported animation names. */
declare function getAnimationNames(): string[];
/** Gets a list of all supported easing function names. */
declare function getEasingNames(): string[];

/** Sets the library's base path to the specified directory. */
declare function setBasePath(path: string): void;
/**
 * Gets the library's base path.
 *
 * The base path is used to load assets such as icons and images, so it needs to be set for components to work properly.
 * By default, this script will look for a script ending in shoelace.js or shoelace-autoloader.js and set the base path
 * to the directory that contains that file. To override this behavior, you can add the data-shoelace attribute to any
 * script on the page (it probably makes the most sense to attach it to the Shoelace script, but it could also be on a
 * bundle). The value can be a local folder or it can point to a CORS-enabled endpoint such as a CDN.
 *
 *   <script src="bundle.js" data-shoelace="/custom/base/path"></script>
 *
 * Alternatively, you can set the base path manually using the exported setBasePath() function.
 *
 * @param subpath - An optional path to append to the base path.
 */
declare function getBasePath(subpath?: string): string;



type IconLibraryResolver = (name: string) => string;
type IconLibraryMutator = (svg: SVGElement) => void;
interface IconLibrary {
    name: string;
    resolver: IconLibraryResolver;
    mutator?: IconLibraryMutator;
    spriteSheet?: boolean;
}
/** Adds an icon library to the registry, or overrides an existing one. */
declare function registerIconLibrary(name: string, options: Omit<IconLibrary, 'name'>): void;
/** Removes an icon library from the registry. */
declare function unregisterIconLibrary(name: string): void;

/**
 * Serializes a form and returns a plain object. If a form control with the same name appears more than once, the
 * property will be converted to an array.
 */
declare function serialize(form: HTMLFormElement): Record<string, unknown>;
/**
 * Returns all form controls that are associated with the specified form. Includes both native and Shoelace form
 * controls. Use this function in lieu of the `HTMLFormElement.elements` property, which doesn't recognize Shoelace
 * form controls.
 */
declare function getFormControls(form: HTMLFormElement): Element[];

type SlAfterCollapseEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-after-collapse': SlAfterCollapseEvent;
    }
};

type SlAfterExpandEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-after-expand': SlAfterExpandEvent;
    }
};

type SlAfterHideEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-after-hide': SlAfterHideEvent;
    }
};

type SlAfterShowEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-after-show': SlAfterShowEvent;
    }
};

type SlBlurEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-blur': SlBlurEvent;
    }
};

type SlCancelEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-cancel': SlCancelEvent;
    }
};

type SlChangeEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-change': SlChangeEvent;
    }
};

type SlClearEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-clear': SlClearEvent;
    }
};

type SlCloseEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-close': SlCloseEvent;
    }
};

type SlCollapseEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-collapse': SlCollapseEvent;
    }
};

type SlCopyEvent = CustomEvent<{
    value: string;
}>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-copy': SlCopyEvent;
    }
};

type SlErrorEvent = CustomEvent<{
    status?: number;
}>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-error': SlErrorEvent;
    }
};

type SlExpandEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-expand': SlExpandEvent;
    }
};

type SlFinishEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-finish': SlFinishEvent;
    }
};

type SlFocusEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-focus': SlFocusEvent;
    }
};

type SlHideEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-hide': SlHideEvent;
    }
};

type SlHoverEvent = CustomEvent<{
    phase: 'start' | 'move' | 'end';
    value: number;
}>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-hover': SlHoverEvent;
    }
};

type SlInitialFocusEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-initial-focus': SlInitialFocusEvent;
    }
};

type SlInputEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-input': SlInputEvent;
    }
};

type SlInvalidEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-invalid': SlInvalidEvent;
    }
};

type SlLazyChangeEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-lazy-change': SlLazyChangeEvent;
    }
};

type SlLazyLoadEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-lazy-load': SlLazyLoadEvent;
    }
};

type SlLoadEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-load': SlLoadEvent;
    }
};

type SlMutationEvent = CustomEvent<{
    mutationList: MutationRecord[];
}>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-mutation': SlMutationEvent;
    }
};

type SlRemoveEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-remove': SlRemoveEvent;
    }
};

type SlRepositionEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-reposition': SlRepositionEvent;
    }
};

type SlRequestCloseEvent = CustomEvent<{
    source: 'close-button' | 'keyboard' | 'overlay';
}>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-request-close': SlRequestCloseEvent;
    }
};

type SlResizeEvent = CustomEvent<{
    entries: ResizeObserverEntry[];
}>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-resize': SlResizeEvent;
    }
};



type SlSelectEvent = CustomEvent<{
    item: SlMenuItem;
}>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-select': SlSelectEvent;
    }
};



type SlSelectionChangeEvent = CustomEvent<{
    selection: SlTreeItem[];
}>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-selection-change': SlSelectionChangeEvent;
    }
};

type SlShowEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-show': SlShowEvent;
    }
};



type SlSlideChangeEvent = CustomEvent<{
    index: number;
    slide: SlCarouselItem;
}>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-slide-change': SlSlideChangeEvent;
    }
};

type SlStartEvent = CustomEvent<Record<PropertyKey, never>>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-start': SlStartEvent;
    }
};

type SlTabHideEvent = CustomEvent<{
    name: string;
}>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-tab-hide': SlTabHideEvent;
    }
};

type SlTabShowEvent = CustomEvent<{
    name: string;
}>;
declare global {
    interface GlobalEventHandlersEventMap {
        'sl-tab-show': SlTabShowEvent;
    }
};





































export { SlAlert, SlAnimatedImage, SlAnimation, SlAvatar, SlBadge, SlBreadcrumb, SlBreadcrumbItem, SlButtonGroup, SlCard, SlCarousel, SlCheckbox, SlColorPicker, SlCopyButton, SlDetails, SlDialog, SlDivider, SlDrawer, SlDropdown, SlFormatBytes, SlFormatDate, SlFormatNumber, SlIconButton, SlImageComparer, SlInclude, SlInput, SlMenuLabel, SlMutationObserver, SlPopup, SlProgressBar, SlProgressRing, SlQrCode, SlRadio, SlRadioButton, SlRadioGroup, SlRange, SlRating, SlRelativeTime, SlResizeObserver, SlSelect, SlSkeleton, SlSpinner, SlSplitPanel, SlSwitch, SlTab, SlTabGroup, SlTabPanel, SlTag, SlTextarea, SlTooltip, SlTree, SlVisuallyHidden, getAnimationNames, getBasePath, getEasingNames, getFormControls, registerIconLibrary, serialize, setBasePath, unregisterIconLibrary };
export type { SlAfterCollapseEvent, SlAfterExpandEvent, SlAfterHideEvent, SlAfterShowEvent, SlBlurEvent, SlButton, SlCancelEvent, SlCarouselItem, SlChangeEvent, SlClearEvent, SlCloseEvent, SlCollapseEvent, SlCopyEvent, SlErrorEvent, SlExpandEvent, SlFinishEvent, SlFocusEvent, SlHideEvent, SlHoverEvent, SlIcon, SlInitialFocusEvent, SlInputEvent, SlInvalidEvent, SlLazyChangeEvent, SlLazyLoadEvent, SlLoadEvent, SlMenu, SlMenuItem, SlMutationEvent, SlOption, SlRemoveEvent, SlRepositionEvent, SlRequestCloseEvent, SlResizeEvent, SlSelectEvent, SlSelectionChangeEvent, SlShowEvent, SlSlideChangeEvent, SlStartEvent, SlTabHideEvent, SlTabShowEvent, SlTreeItem };
}
