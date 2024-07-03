class ModalManager {
  readonly element: HTMLDialogElement;
  readonly icon = document.createElement('span');
  readonly title = document.createTextNode('');
  readonly body = document.createElement('div');
  readonly footer = document.createElement('footer');
  readonly closeBtn = document.createElement('button');
  readonly confirmBtn = document.createElement('button');
  triggerConfirm: () => void = () => void 0;
  triggerClose: () => void = () => void 0;

  constructor() {
    // this.body.className = 'p-1';
    this.icon.className = 'pr-1';

    this.closeBtn.className = 'outline';
    this.closeBtn.textContent = 'Close';
    this.closeBtn.onclick = () => this.element.close();

    this.confirmBtn.textContent = 'Yes';
    this.confirmBtn.onclick = () => this.element.close();

    this.footer.appendChild(this.closeBtn);

    this.element = (
      <dialog className="gui-dialog">
        <article>
          <header>
            <div>
              {this.icon}
              {this.title}
            </div>
          </header>
          {this.body}
          {this.footer}
        </article>
      </dialog>
    ) as HTMLDialogElement;
  }

  info(
    message: string | JSX.Element,
    {
      icon,
      title = 'Information',
      confirm = 'Got it',
    }: { icon?: Node; title?: string; confirm?: string; cancel?: string } = {
      title: 'Information',
      confirm: 'Got it',
    },
  ) {
    if (icon) {
      this.icon.replaceChildren(icon);
    } else {
      this.icon.replaceChildren();
    }
    this.title.textContent = title;
    this.body.replaceChildren(
      typeof message === 'string' ? document.createTextNode(message) : message,
    );
    this.closeBtn.textContent = confirm;
    this.footer.replaceChildren(this.closeBtn);
    if (!this.element.isConnected) {
      document.body.appendChild(this.element);
    }
    this.element.showModal();
  }

  confirm(
    message: string | JSX.Element,
    {
      icon,
      title = 'Confirm',
      confirm = 'Got it',
      cancel = 'Cancel',
    }: { icon?: Node; title?: string; confirm?: string; cancel?: string } = {
      title: 'Confirm',
      confirm: 'Got it',
      cancel: 'Cancel',
    },
  ): Promise<boolean> {
    if (icon) {
      this.icon.replaceChildren(icon);
    } else {
      this.icon.replaceChildren();
    }
    this.title.textContent = title;
    this.body.replaceChildren(
      typeof message === 'string' ? document.createTextNode(message) : message,
    );
    this.closeBtn.textContent = cancel;
    this.confirmBtn.textContent = confirm;
    this.footer.replaceChildren(this.closeBtn, this.confirmBtn);
    if (!this.element.isConnected) {
      document.body.appendChild(this.element);
    }
    this.element.showModal();
    return new Promise((resolve) => {
      this.triggerConfirm = () => {
        this.close();
        resolve(true);
      };
      this.triggerClose = () => {
        this.close();
        resolve(false);
      };

      this.closeBtn.onclick = () => {
        this.close();
        resolve(false);
      };
      this.confirmBtn.onclick = () => {
        this.close();
        resolve(true);
      };
    });
  }

  input(
    {
      icon,
      label,
      defaultValue,
      description,
      title = 'Input',
      confirm = 'Ok',
      cancel = 'Cancel',
    }: {
      icon?: Node;
      label: string;
      defaultValue: string;
      description?: string;
      title?: string;
      confirm?: string;
      cancel?: string;
    } = {
      label: 'Value',
      defaultValue: '',
      title: 'Input',
      confirm: 'Ok',
      cancel: 'Cancel',
    },
  ): Promise<string | undefined> {
    if (icon) {
      this.icon.replaceChildren(icon);
    } else {
      this.icon.replaceChildren();
    }
    this.title.textContent = title;
    let value = defaultValue;
    const input = (
      <input
        type="text"
        defaultValue={defaultValue}
        onchange={(ev) => {
          const input = ev.target as HTMLInputElement;
          value = input.value;
        }}
      />
    ) as HTMLInputElement;
    this.body.replaceChildren(
      <fieldset>
        <legend>{label}</legend>
        {input}
        {description ? <small>{description}</small> : undefined}
      </fieldset>,
    );
    this.closeBtn.textContent = cancel;
    this.confirmBtn.textContent = confirm;
    this.footer.replaceChildren(this.closeBtn, this.confirmBtn);
    if (!this.element.isConnected) {
      document.body.appendChild(this.element);
    }
    this.element.showModal();
    return new Promise((resolve) => {
      this.triggerConfirm = () => {
        this.close();
        resolve(value);
      };
      this.triggerClose = () => {
        this.close();
        resolve(value);
      };

      this.closeBtn.onclick = () => {
        this.close();
        resolve(undefined);
      };
      input.onkeyup = (ev) => {
        if (ev.key === 'Enter') {
          this.close();
          resolve(value);
        }
      };
      this.confirmBtn.onclick = () => {
        this.close();
        resolve(value);
      };
    });
  }

  close() {
    this.element.close();
    this.closeBtn.onclick = () => this.element.close();
    this.confirmBtn.onclick = () => this.element.close();
  }

  /**
   * Whether or not a dialog is currently open
   */
  open(): boolean {
    return this.element.open;
  }
}

export const modal = new ModalManager();
