import type { sl } from './exports.js';

export type ModalInfoProps = {
  message: string | Node;
  /** The modal title label */
  title?: string;
};

export type ModalConfirmProps = {
  message: string | Node;
  /** The modal title label */
  title?: string;
  /** The confirm button text */
  confirm?: string;
  /** The cancel button text */
  cancel?: string;
};

export type ModalInputProps = {
  /** The modal title label */
  title?: string;
  /** The confirm button text */
  confirm?: string;
  /** Properties to pass to the underlying sl-input */
  inputProps?: SlInputProps;
};

export type ModalSelectProps = {
  options: string[];
  /** The modal title label */
  title?: string;
  /** The confirm button text */
  confirm?: string;
  /** Properties to pass to the underlying sl-input */
  selectProps?: SlSelectProps;
};

export const modal = {
  info({ message, title = 'Information' }: ModalInfoProps): void {
    const dialog = (
      <sl-dialog>
        <header slot="label">{title}</header>
        {message}
      </sl-dialog>
    ) as sl.SlDialog;

    document.body.appendChild(dialog);
    setTimeout(() => {
      dialog.show();
    });
    dialog.addEventListener('sl-after-hide', () => {
      dialog.remove();
    });
  },

  confirm({
    message,
    title = 'Confirm',
    confirm = 'Yes',
    cancel = 'No',
  }: ModalConfirmProps): Promise<boolean> {
    let resolved = false;
    const promise = new Promise<boolean>((resolve) => {
      const dialog = (
        <sl-dialog label={title}>
          {message}
          <sl-button
            slot="footer"
            onclick={() => {
              resolved = true;
              dialog.hide().then(() => {
                resolve(false);
              });
            }}
          >
            {cancel}
          </sl-button>
          <sl-button
            slot="footer"
            variant="primary"
            onclick={() => {
              resolved = true;
              dialog.hide().then(() => {
                resolve(true);
              });
            }}
          >
            {confirm}
          </sl-button>
        </sl-dialog>
      ) as sl.SlDialog;

      document.body.appendChild(dialog);
      setTimeout(() => {
        dialog.show();
      });
      dialog.addEventListener('sl-after-hide', () => {
        dialog.remove();
        if (!resolved) {
          resolve(false);
        }
      });
    });

    return promise;
  },

  /**
   * Shows a simple modal with an input field. Returns the content on succes or `undefined` if empty or closed.
   * @returns if `undefined` the input has not been given or is empty
   */
  input({
    title = 'Input',
    confirm = 'Ok',
    inputProps,
  }: ModalInputProps): Promise<string | undefined> {
    let resolved = false;

    const promise = new Promise<string | undefined>((resolve) => {
      const input = (<sl-input autofocus {...inputProps} />) as sl.SlInput;

      const dialog = (
        <sl-dialog label={title}>
          {input}
          <sl-button
            slot="footer"
            variant="primary"
            onclick={() => {
              resolved = true;
              dialog.hide().then(() => {
                const value = input.value;
                if (value.length === 0) {
                  resolve(undefined);
                } else {
                  resolve(value);
                }
              });
            }}
          >
            {confirm}
          </sl-button>
        </sl-dialog>
      ) as sl.SlDialog;

      dialog.addEventListener('sl-after-hide', () => {
        dialog.remove();
        if (!resolved) {
          resolve(undefined);
        }
      });

      dialog.addEventListener('sl-after-show', () => {
        input.focus();
        input.addEventListener('keydown', (ev) => {
          if (ev.key === 'Enter' && input.value.length > 0) {
            resolved = true;
            dialog.hide().then(() => {
              resolve(input.value);
            });
          }
        });
      });

      document.body.appendChild(dialog);
      setTimeout(() => {
        dialog.show();
      }, 0);
    });

    return promise;
  },

  /**
   * Shows a simple modal with a select field. Returns the selected value(s) on succes or `undefined` if none or closed.
   * @returns if `undefined` the input has not been given or is empty
   */
  select({
    options,
    title = 'Select',
    confirm = 'Ok',
    selectProps,
  }: ModalSelectProps): Promise<string | string[] | undefined> {
    let resolved = false;

    const promise = new Promise<string | string[] | undefined>((resolve) => {
      const select = (<sl-select placement="bottom" {...selectProps} hoist />) as sl.SlSelect;
      for (const opt of options) {
        select.appendChild(<sl-option value={opt}>{opt}</sl-option>);
      }

      const dialog = (
        <sl-dialog label={title}>
          {select}
          <sl-button
            slot="footer"
            variant="primary"
            onclick={() => {
              resolved = true;
              dialog.hide().then(() => {
                const value = select.value;
                if (value.length === 0) {
                  resolve(undefined);
                } else {
                  resolve(value);
                }
              });
            }}
          >
            {confirm}
          </sl-button>
        </sl-dialog>
      ) as sl.SlDialog;

      dialog.addEventListener('sl-after-hide', (ev) => {
        if (ev.target === dialog) {
          // sl-select bubbles the same events, so we need to check
          dialog.remove();
          if (!resolved) {
            resolve(undefined);
          }
        }
      });

      dialog.addEventListener('sl-after-show', (ev) => {
        if (ev.target === dialog) {
          // sl-select bubbles the same events, so we need to check
          select.focus();
        }
      });

      document.body.appendChild(dialog);

      setTimeout(() => {
        dialog.show();
      }, 0);
    });

    return promise;
  },
};

export type SlInputProps = {
  value?: string;
  type?:
    | 'date'
    | 'datetime-local'
    | 'email'
    | 'number'
    | 'password'
    | 'search'
    | 'tel'
    | 'text'
    | 'time'
    | 'url';
  label?: string;
  size?: 'small' | 'medium' | 'large';
  filled?: boolean;
  pill?: boolean;
  placeholder?: string;
  defaultValue?: string;
  helpText?: string;
  disabled?: boolean;
  readonly?: boolean;
  passwordToggle?: boolean;
  passwordVisible?: boolean;
  noSpinButtons?: boolean;
  required?: boolean;
  pattern?: string;
  minlength?: number;
  maxlength?: number;
  min?: number | string;
  max?: number | string;
  step?: number | 'any';
  autocapitalize?: 'off' | 'none' | 'on' | 'sentences' | 'words' | 'characters';
  autocorrect?: 'on' | 'off';
  autocomplete?: string;
  autofocus?: boolean;
  enterkeyhint?: 'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send';
  spellcheck?: boolean;
  inputmode?: 'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url';
};

export type SlSelectProps = {
  value?: string | string[];
  defaultValue?: string | string[];
  size?: 'small' | 'medium' | 'large';
  placeholder?: string;
  multiple?: boolean;
  /** Maximum number of selected options. Set to 0 to remove the limit. */
  maxOptionsVisible?: number;
  disabled?: boolean;
  clearable?: boolean;
  open?: boolean;
  filled?: boolean;
  pill?: boolean;
  label?: string;
  placement?: 'top' | 'bottom';
  helpText?: string;
  required?: boolean;
};
