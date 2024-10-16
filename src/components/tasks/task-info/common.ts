import { std } from '../../../exports.js';
import type { GuiTaskInfoDialog } from './task-info-dialog.js';
import type { GuiUpdateEvent } from '../../events.js';
import { GuiTaskInfo } from './task-info.js';

export type TaskInfoLike = {
  user_id: number | bigint;
  task_id: number | bigint;
} & Partial<std.runtime.TaskInfo>;

export class GuiFilesClickEvent extends CustomEvent<void> {
  static readonly NAME = 'gui-files-click';
  constructor() {
    super(GuiFilesClickEvent.NAME, { cancelable: true });
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'gui-task-info': GuiTaskInfo;
    'gui-task-info-dialog': GuiTaskInfoDialog;
  }

  interface GuiTaskInfoEventMap {
    [GuiFilesClickEvent.NAME]: GuiFilesClickEvent;
    [GuiUpdateEvent.NAME]: GuiUpdateEvent;
  }

  interface HTMLElementEventMap extends GuiTaskInfoEventMap {}

  namespace GreyCat {
    namespace JSX {
      interface IntrinsicElements {
        /**
         * Please, don't use this in a React context. Use `WCWrapper`.
         */
        'gui-task-info': GreyCat.Element<GuiTaskInfo, GuiTaskInfoEventMap>;
        /**
         * Please, don't use this in a React context. Use `WCWrapper`.
         */
        'gui-task-info-dialog': GreyCat.Element<GuiTaskInfoDialog, GuiTaskInfoEventMap>;
      }
    }
  }
}
