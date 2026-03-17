import * as sl from '@shoelace-style/shoelace';

import '@shoelace-style/shoelace/dist/components/alert/alert.js';
import '@shoelace-style/shoelace/dist/components/animated-image/animated-image.js';
import '@shoelace-style/shoelace/dist/components/animation/animation.js';
import '@shoelace-style/shoelace/dist/components/avatar/avatar.js';
import '@shoelace-style/shoelace/dist/components/badge/badge.js';
import '@shoelace-style/shoelace/dist/components/breadcrumb-item/breadcrumb-item.js';
import '@shoelace-style/shoelace/dist/components/breadcrumb/breadcrumb.js';
import '@shoelace-style/shoelace/dist/components/button-group/button-group.js';
import '@shoelace-style/shoelace/dist/components/button/button.js';
import '@shoelace-style/shoelace/dist/components/card/card.js';
import '@shoelace-style/shoelace/dist/components/carousel-item/carousel-item.js';
import '@shoelace-style/shoelace/dist/components/carousel/carousel.js';
import '@shoelace-style/shoelace/dist/components/checkbox/checkbox.js';
import '@shoelace-style/shoelace/dist/components/color-picker/color-picker.js';
import '@shoelace-style/shoelace/dist/components/copy-button/copy-button.js';
import '@shoelace-style/shoelace/dist/components/details/details.js';
import '@shoelace-style/shoelace/dist/components/dialog/dialog.js';
import '@shoelace-style/shoelace/dist/components/divider/divider.js';
import '@shoelace-style/shoelace/dist/components/drawer/drawer.js';
import '@shoelace-style/shoelace/dist/components/dropdown/dropdown.js';
import '@shoelace-style/shoelace/dist/components/format-bytes/format-bytes.js';
import '@shoelace-style/shoelace/dist/components/format-date/format-date.js';
import '@shoelace-style/shoelace/dist/components/format-number/format-number.js';
import '@shoelace-style/shoelace/dist/components/icon-button/icon-button.js';
import '@shoelace-style/shoelace/dist/components/icon/icon.js';
import '@shoelace-style/shoelace/dist/components/image-comparer/image-comparer.js';
import '@shoelace-style/shoelace/dist/components/include/include.js';
import '@shoelace-style/shoelace/dist/components/input/input.js';
import '@shoelace-style/shoelace/dist/components/menu-item/menu-item.js';
import '@shoelace-style/shoelace/dist/components/menu-label/menu-label.js';
import '@shoelace-style/shoelace/dist/components/menu/menu.js';
import '@shoelace-style/shoelace/dist/components/mutation-observer/mutation-observer.js';
import '@shoelace-style/shoelace/dist/components/option/option.js';
import '@shoelace-style/shoelace/dist/components/popup/popup.js';
import '@shoelace-style/shoelace/dist/components/progress-bar/progress-bar.js';
import '@shoelace-style/shoelace/dist/components/progress-ring/progress-ring.js';
import '@shoelace-style/shoelace/dist/components/qr-code/qr-code.js';
import '@shoelace-style/shoelace/dist/components/radio-button/radio-button.js';
import '@shoelace-style/shoelace/dist/components/radio-group/radio-group.js';
import '@shoelace-style/shoelace/dist/components/radio/radio.js';
import '@shoelace-style/shoelace/dist/components/range/range.js';
import '@shoelace-style/shoelace/dist/components/rating/rating.js';
import '@shoelace-style/shoelace/dist/components/relative-time/relative-time.js';
import '@shoelace-style/shoelace/dist/components/resize-observer/resize-observer.js';
import '@shoelace-style/shoelace/dist/components/select/select.js';
import '@shoelace-style/shoelace/dist/components/skeleton/skeleton.js';
import '@shoelace-style/shoelace/dist/components/spinner/spinner.js';
import '@shoelace-style/shoelace/dist/components/split-panel/split-panel.js';
import '@shoelace-style/shoelace/dist/components/switch/switch.js';
import '@shoelace-style/shoelace/dist/components/tab-group/tab-group.js';
import '@shoelace-style/shoelace/dist/components/tab-panel/tab-panel.js';
import '@shoelace-style/shoelace/dist/components/tab/tab.js';
import '@shoelace-style/shoelace/dist/components/tag/tag.js';
import '@shoelace-style/shoelace/dist/components/textarea/textarea.js';
import '@shoelace-style/shoelace/dist/components/tooltip/tooltip.js';
import '@shoelace-style/shoelace/dist/components/tree-item/tree-item.js';
import '@shoelace-style/shoelace/dist/components/tree/tree.js';
import '@shoelace-style/shoelace/dist/components/visually-hidden/visually-hidden.js';

type SlAfterCollapse = { 'sl-after-collapse': sl.SlAfterCollapseEvent };
type SlAfterExpand = { 'sl-after-expand': sl.SlAfterExpandEvent };
type SlAfterHide = { 'sl-after-hide': sl.SlAfterHideEvent };
type SlAfterShow = { 'sl-after-show': sl.SlAfterShowEvent };
type SlBlur = { 'sl-blur': sl.SlBlurEvent };
type SlCancel = { 'sl-cancel': sl.SlCancelEvent };
type SlChange = { 'sl-change': sl.SlChangeEvent };
type SlClear = { 'sl-clear': sl.SlClearEvent };
type SlClose = { 'sl-close': sl.SlCloseEvent };
type SlCollapse = { 'sl-collapse': sl.SlCollapseEvent };
type SlCopy = { 'sl-copy': sl.SlCopyEvent };
type SlError = { 'sl-error': sl.SlErrorEvent };
type SlExpand = { 'sl-expand': sl.SlExpandEvent };
type SlFinish = { 'sl-finish': sl.SlFinishEvent };
type SlFocus = { 'sl-focus': sl.SlFocusEvent };
type SlHide = { 'sl-hide': sl.SlHideEvent };
type SlHover = { 'sl-hover': sl.SlHoverEvent };
type SlInitialFocus = { 'sl-initial-focus': sl.SlInitialFocusEvent };
type SlInput = { 'sl-input': sl.SlInputEvent };
type SlInvalid = { 'sl-invalid': sl.SlInvalidEvent };
type SlLazyChange = { 'sl-lazy-change': sl.SlLazyChangeEvent };
type SlLazyLoad = { 'sl-lazy-load': sl.SlLazyLoadEvent };
type SlLoad = { 'sl-load': sl.SlLoadEvent };
type SlMutation = { 'sl-mutation': sl.SlMutationEvent };
type SlRemove = { 'sl-remove': sl.SlRemoveEvent };
type SlReposition = { 'sl-reposition': sl.SlRepositionEvent };
type SlRequestClose = { 'sl-request-close': sl.SlRequestCloseEvent };
type SlResize = { 'sl-resize': sl.SlResizeEvent };
type SlSelect = { 'sl-select': sl.SlSelectEvent };
type SlSelectionChange = { 'sl-selection-change': sl.SlSelectionChangeEvent };
type SlShow = { 'sl-show': sl.SlShowEvent };
type SlSlideChange = { 'sl-slide-change': sl.SlSlideChangeEvent };
type SlStart = { 'sl-start': sl.SlStartEvent };
type SlTabHide = { 'sl-tab-hide': sl.SlTabHideEvent };
type SlTabShow = { 'sl-tab-show': sl.SlTabShowEvent };

export type SlAlertEventMap = SlShow & SlAfterShow & SlHide & SlAfterHide;
export type SlAnimatedImageEventMap = SlLoad & SlError;
export type SlAnimationEventMap = SlCancel & SlFinish & SlStart;
export type SlAvatarEventMap = SlError;
export type SlButtonEventMap = SlBlur & SlFocus & SlInvalid;
export type SlCarouselEventMap = SlSlideChange;
export type SlCheckboxEventMap = SlBlur & SlChange & SlFocus & SlInput & SlInvalid;
export type SlColorPickerEventMap = SlBlur & SlChange & SlFocus & SlInput & SlInvalid;
export type SlCopyButtonEventMap = SlCopy & SlError;
export type SlDetailsEventMap = SlShow & SlAfterShow & SlHide & SlAfterHide;
export type SlDialogEventMap = SlShow & SlAfterShow & SlHide & SlAfterHide & SlInitialFocus & SlRequestClose;
export type SlDrawerEventMap = SlShow & SlAfterShow & SlHide & SlAfterHide & SlInitialFocus & SlRequestClose;
export type SlDropdownEventMap = SlShow & SlAfterShow & SlHide & SlAfterHide;
export type SlIconEventMap = SlLoad & SlError;
export type SlIconButtonEventMap = SlBlur & SlFocus;
export type SlImageComparerEventMap = SlChange;
export type SlIncludeEventMap = SlLoad & SlError;
export type SlInputEventMap = SlBlur & SlChange & SlClear & SlFocus & SlInput & SlInvalid;
export type SlMenuEventMap = SlSelect;
export type SlMutationObserverEventMap = SlMutation;
export type SlPopupEventMap = SlReposition;
export type SlRadioEventMap = SlBlur & SlFocus;
export type SlRadioButtonEventMap = SlBlur & SlFocus;
export type SlRadioGroupEventMap = SlChange & SlInput & SlInvalid;
export type SlRangeEventMap = SlBlur & SlChange & SlFocus & SlInput & SlInvalid;
export type SlRatingEventMap = SlChange & SlHover;
export type SlResizeObserverEventMap = SlResize;
export type SlSelectEventMap = SlChange &
  SlClear &
  SlInput &
  SlFocus &
  SlBlur &
  SlShow &
  SlAfterShow &
  SlHide &
  SlAfterHide &
  SlInvalid;
export type SlSplitPanelEventMap = SlReposition;
export type SlSwitchEventMap = SlBlur & SlChange & SlInput & SlFocus & SlInvalid;
export type SlTabEventMap = SlClose;
export type SlTabGroupEventMap = SlTabShow & SlTabHide;
export type SlTagEventMap = SlRemove;
export type SlTextareaEventMap = SlBlur & SlChange & SlFocus & SlInput & SlInvalid;
export type SlTooltipEventMap = SlShow & SlAfterShow & SlHide & SlAfterHide;
export type SlTreeItemEventMap = SlExpand & SlAfterExpand & SlCollapse & SlAfterCollapse & SlLazyChange & SlLazyLoad;
export type SlTreeEventMap = SlSelectionChange;

declare global {
  interface HTMLElementEventMap
    extends
      SlAfterCollapse,
      SlAfterExpand,
      SlAfterHide,
      SlAfterShow,
      SlBlur,
      SlCancel,
      SlChange,
      SlClear,
      SlClose,
      SlCollapse,
      SlCopy,
      SlError,
      SlExpand,
      SlFinish,
      SlFocus,
      SlHide,
      SlHover,
      SlInitialFocus,
      SlInput,
      SlInvalid,
      SlLazyChange,
      SlLazyLoad,
      SlLoad,
      SlMutation,
      SlRemove,
      SlReposition,
      SlRequestClose,
      SlResize,
      SlSelect,
      SlSelectionChange,
      SlShow,
      SlSlideChange,
      SlStart,
      SlTabHide,
      SlTabShow {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-alert': GreyCat.Element<sl.SlAlert, SlAlertEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-animated-image': GreyCat.Element<sl.SlAnimatedImage, SlAnimatedImageEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-animation': GreyCat.Element<sl.SlAnimation, SlAnimationEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-avatar': GreyCat.Element<sl.SlAvatar, SlAvatarEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-badge': GreyCat.Element<sl.SlBadge>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-breadcrumb-item': GreyCat.Element<sl.SlBreadcrumbItem>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-breadcrumb': GreyCat.Element<sl.SlBreadcrumb>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-button': GreyCat.Element<sl.SlButton, SlButtonEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-button-group': GreyCat.Element<sl.SlButtonGroup>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-card': GreyCat.Element<sl.SlCard>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-carousel': GreyCat.Element<sl.SlCarousel, SlCarouselEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-carousel-item': GreyCat.Element<sl.SlCarouselItem>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-checkbox': GreyCat.Element<sl.SlCheckbox, SlCheckboxEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-color-picker': GreyCat.Element<sl.SlColorPicker, SlColorPickerEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-copy-button': GreyCat.Element<sl.SlCopyButton, SlCopyButtonEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-details': GreyCat.Element<sl.SlDetails, SlDetailsEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-dialog': GreyCat.Element<sl.SlDialog, SlDialogEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-divider': GreyCat.Element<sl.SlDivider>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-drawer': GreyCat.Element<sl.SlDrawer, SlDrawerEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-dropdown': GreyCat.Element<sl.SlDropdown, SlDropdownEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-format-bytes': GreyCat.Element<sl.SlFormatBytes>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-format-date': GreyCat.Element<sl.SlFormatDate>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-format-number': GreyCat.Element<sl.SlFormatNumber>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-icon': GreyCat.Element<sl.SlIcon, SlLoad & SlError>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-icon-button': GreyCat.Element<sl.SlIconButton, SlIconButtonEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-image-comparer': GreyCat.Element<sl.SlImageComparer, SlImageComparerEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-include': GreyCat.Element<sl.SlInclude, SlIncludeEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-input': GreyCat.Element<sl.SlInput, SlInputEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-menu': GreyCat.Element<sl.SlMenu, SlMenuEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-menu-item': GreyCat.Element<sl.SlMenuItem>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-menu-label': GreyCat.Element<sl.SlMenuLabel>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-mutation-observer': GreyCat.Element<sl.SlMutationObserver, SlMutationObserverEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-option': GreyCat.Element<sl.SlOption>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-popup': GreyCat.Element<sl.SlPopup, SlPopupEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-progress-bar': GreyCat.Element<sl.SlProgressBar>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-progress-ring': GreyCat.Element<sl.SlProgressRing>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-qr-code': GreyCat.Element<sl.SlQrCode>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-radio': GreyCat.Element<sl.SlRadio, SlRadioEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-radio-button': GreyCat.Element<sl.SlRadioButton, SlRadioButtonEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-radio-group': GreyCat.Element<sl.SlRadioGroup, SlRadioGroupEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-range': GreyCat.Element<sl.SlRange, SlRangeEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-rating': GreyCat.Element<sl.SlRating, SlRatingEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-relative-time': GreyCat.Element<sl.SlRelativeTime>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-resize-observer': GreyCat.Element<sl.SlResizeObserver, SlResizeObserverEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-select': GreyCat.Element<sl.SlSelect, SlSelectEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-skeleton': GreyCat.Element<sl.SlSkeleton>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-spinner': GreyCat.Element<sl.SlSpinner>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-split-panel': GreyCat.Element<sl.SlSplitPanel, SlSplitPanelEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-switch': GreyCat.Element<sl.SlSwitch, SlSwitchEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-tab': GreyCat.Element<sl.SlTab, SlClose>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-tab-group': GreyCat.Element<sl.SlTabGroup, SlTabGroupEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-tab-panel': GreyCat.Element<sl.SlTabPanel>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-tag': GreyCat.Element<sl.SlTag, SlRemove>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-textarea': GreyCat.Element<sl.SlTextarea, SlTextareaEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-tooltip': GreyCat.Element<sl.SlTooltip, SlTooltipEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-tree-item': GreyCat.Element<sl.SlTreeItem, SlTreeItemEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-tree': GreyCat.Element<sl.SlTree, SlTreeEventMap>;
        /** Please, don't use this in a React context. Use `WCWrapper`. */
        'sl-visually-hidden': GreyCat.Element<sl.SlVisuallyHidden>;
      }
    }
  }
}
