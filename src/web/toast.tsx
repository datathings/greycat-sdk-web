import { type sl } from './exports.js';

export interface Toast {
  message: Node | string;
  variant?: sl.SlAlert['variant'];
  iconLibrary?: string;
  icon?: string;
  duration?: number;
  countdown?: sl.SlAlert['countdown'];
}

function notify(toast: Toast | string) {
  if (typeof toast === 'string') {
    toast = { message: toast };
  }
  const { message, variant = 'primary', iconLibrary, icon, duration = 5000, countdown } = toast;

  const alert = document.createElement('sl-alert');
  alert.variant = variant;
  alert.closable = true;
  alert.duration = duration;
  if (isFinite(duration) && !countdown) {
    alert.countdown = 'rtl';
  }
  if (icon) {
    alert.appendChild(Object.assign(document.createElement('sl-icon'), { icon, iconLibrary }));
  }
  if (typeof message === 'string') {
    alert.appendChild(document.createTextNode(message));
  } else {
    alert.appendChild(message);
  }

  document.body.append(alert);
  return alert.toast();
}

function error(err: unknown) {
  if (typeof err === 'string') {
    return notify({ message: err, variant: 'danger' });
  } else if (err instanceof Error || err instanceof greycat.core.Error) {
    return notify({
      message: <pre>{err.message}</pre>,
      variant: 'danger',
    });
  } else if (err instanceof Node) {
    return notify({ message: err, variant: 'danger' });
  }
  return notify({ message: `${err}`, variant: 'danger' });
}

function warning(toast: Toast | string) {
  if (typeof toast === 'string') {
    return notify({ message: toast, variant: 'warning' });
  }
  return notify(Object.assign(toast, { variant: 'warning' }));
}

export const toast = { notify, error, warning };
