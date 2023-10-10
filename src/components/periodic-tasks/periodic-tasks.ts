import * as sdk from '@greycat/sdk';
import { GreyCat, runtime, core } from '@greycat/sdk';
import { GuiEnumSelect } from '../index.js';

type PeriodicTaskProperties = {
  name: string;
  user_id: bigint | number;
  args: string | null;
  start: sdk.std.core.time;
  every: sdk.std.core.duration;
};

type PeriodicTaskPropertyType = 'name' | 'user_id' | 'args' | 'start' | 'every';
const PeriodicTaskPropertyNamesList = ['name', 'user_id', 'args', 'start', 'every'];

export class GuiPeriodicTasks extends HTMLElement {
  private _greycat: GreyCat = window.greycat.default;
  private _periodicTasks: Array<runtime.PeriodicTask> = [];
  private _createPeriodicTaskButton: HTMLButtonElement = document.createElement('button');
  private _deleteSelectedButton: HTMLButtonElement = document.createElement('button');
  private _selectAllCheckbox: HTMLInputElement = document.createElement('input');
  private _table: HTMLTableElement = document.createElement('table');
  private _headers: Array<string> = PeriodicTaskPropertyNamesList;
  private _periodicTaskDialog: HTMLDialogElement = document.createElement('dialog');
  private _periodicTaskForm: HTMLFormElement = document.createElement('form');
  private _userIdInput: HTMLInputElement = document.createElement('input');
  private _timeZone: core.TimeZone = core.TimeZone.Europe_Luxembourg(this._greycat);
  private _timeZoneSelect: GuiEnumSelect = document.createElement('gui-enum-select');
  private _durationInput: HTMLInputElement = document.createElement('input');
  private _durationUnitSelect: HTMLSelectElement = document.createElement('select');
  private _startTimeInput: HTMLInputElement = document.createElement('input');
  private _individualTimeZoneSelect: GuiEnumSelect = document.createElement('gui-enum-select');
  private _periodicTaskNameInput: HTMLInputElement = document.createElement('input');
  private _taskArgsComponent = document.createElement('gui-task-args');
  private stringToDurationUnit: { [name: string]: core.DurationUnit } = {
    microseconds: core.DurationUnit.microseconds(this._greycat),
    milliseconds: core.DurationUnit.milliseconds(this._greycat),
    seconds: core.DurationUnit.seconds(this._greycat),
    minutes: core.DurationUnit.minutes(this._greycat),
    hours: core.DurationUnit.hours(this._greycat),
    days: core.DurationUnit.days(this._greycat),
    weeks: core.DurationUnit.weeks(this._greycat),
    months: core.DurationUnit.months(this._greycat),
    years: core.DurationUnit.years(this._greycat),
  };

  connectedCallback() {
    this._createPeriodicTaskButton.textContent = 'Create Periodic Task';
    this._createPeriodicTaskButton.classList.add('create-periodic-task-button');
    this._deleteSelectedButton.classList.add('delete-selected-button');
    this._deleteSelectedButton.disabled = true;
    this._deleteSelectedButton.textContent = 'Delete';

    this._selectAllCheckbox.type = 'checkbox';
    this._selectAllCheckbox.name = 'selectAll';

    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    this._headers.forEach((headerName) => {
      const thElement = document.createElement('th');
      thElement.textContent = headerName;
      thElement.classList.add('table-header');
      headerRow.appendChild(thElement);
    });

    const selectAllHeader = document.createElement('th');
    selectAllHeader.appendChild(this._selectAllCheckbox);
    headerRow.appendChild(selectAllHeader);

    thead.appendChild(headerRow);
    this._table.appendChild(thead);
    this._timeZoneSelect.greycat = this._greycat;
    this._timeZoneSelect.fqn = 'core::TimeZone';
    this._timeZoneSelect.selected = this._timeZone;

    this._timeZoneSelect.addEventListener('change', (ev) => {
      if (ev.detail) {
        // Ensured type casting by setting fqn of timeZoneSelect
        this._timeZone = ev.detail as core.TimeZone;
        this.render();
      }
    });

    const topLineContainer = document.createElement('div');
    topLineContainer.classList.add('flex-container');

    topLineContainer.appendChild(this._createPeriodicTaskButton);
    topLineContainer.appendChild(this._deleteSelectedButton);
    topLineContainer.appendChild(this._timeZoneSelect);

    this.appendChild(topLineContainer);
    this.appendChild(this._table);

    this._periodicTaskDialog.id = 'periodic-task-dialog';

    this._userIdInput.type = 'text';
    this._userIdInput.name = 'userId';
    this._userIdInput.placeholder = 'User ID';
    this._userIdInput.readOnly = true;

    this._startTimeInput.classList.add('start-time-input');
    this._startTimeInput.type = 'datetime-local';
    this._startTimeInput.name = 'startTime';
    this._startTimeInput.placeholder = 'Start Time';
    this._startTimeInput.value = this._formatDate(new Date());

    this._durationInput.classList.add('duration-input');
    this._durationInput.type = 'number';
    this._durationInput.min = '0';
    this._durationInput.name = 'duration';
    this._durationInput.placeholder = 'Duration';

    this._durationUnitSelect.name = 'durationUnit';
    const durationUnits = [
      { value: 'microseconds', label: 'Microseconds' },
      { value: 'milliseconds', label: 'Milliseconds' },
      { value: 'seconds', label: 'Seconds' },
      { value: 'minutes', label: 'Minutes' },
      { value: 'hours', label: 'Hours' },
      { value: 'days', label: 'Days' },
      { value: 'weeks', label: 'Weeks' },
      { value: 'months', label: 'Months' },
      { value: 'years', label: 'Years' },
    ];

    durationUnits.forEach((unit) => {
      const option = document.createElement('option');
      option.value = unit.value;
      option.textContent = unit.label;
      this._durationUnitSelect.appendChild(option);
    });

    this._individualTimeZoneSelect.greycat = this._greycat;
    this._individualTimeZoneSelect.fqn = 'core::TimeZone';
    this._individualTimeZoneSelect.selected = this._timeZone;

    const durationContainer = document.createElement('div');
    durationContainer.classList.add('flex-container');

    durationContainer.appendChild(this._durationInput);
    durationContainer.appendChild(this._durationUnitSelect);

    this._periodicTaskNameInput.type = 'text';
    this._periodicTaskNameInput.name = 'periodicTaskName';
    this._periodicTaskNameInput.classList.add('periodic-task-name');
    this._periodicTaskNameInput.placeholder = 'eg. <module>(.<type>)?.<fn>';

    const submitButton = document.createElement('button');
    submitButton.classList.add('submit-button');
    submitButton.textContent = 'Submit';

    this._periodicTaskForm.appendChild(this._labelHTMLElement('Current User', this._userIdInput));
    this._periodicTaskForm.appendChild(
      this._labelHTMLElement('Start date time', this._startTimeInput),
    );
    this._periodicTaskForm.appendChild(this._individualTimeZoneSelect);
    this._periodicTaskForm.appendChild(this._labelHTMLElement('Every', durationContainer));
    this._periodicTaskForm.appendChild(
      this._labelHTMLElement('Module and function', this._periodicTaskNameInput),
    );
    this._periodicTaskForm.appendChild(this._taskArgsComponent);
    this._periodicTaskForm.appendChild(submitButton);

    this._periodicTaskDialog.appendChild(this._periodicTaskForm);
    this.appendChild(this._periodicTaskDialog);

    this._periodicTaskNameInput.addEventListener('input', () => {
      // Whenever external task name input is updated,
      // we update the gui-task-args-input taskName value.
      // So that, gui-task-args-input component becomes dynamic.
      this._taskArgsComponent.taskName = this._periodicTaskNameInput.value;
    });

    this._createPeriodicTaskButton.addEventListener('click', () => {
      this._showPeriodicTaskPopup();
    });
    this._deleteSelectedButton.addEventListener('click', () => {
      this._deleteSelectedTasks();
    });

    try {
      runtime.PeriodicTask.all(this._greycat)
        .then((tasks) => {
          this._periodicTasks = tasks;
          this.render();
        })
        .catch((error) => {
          throw error;
        });
      runtime.User.current(this._greycat)
        .then((user_id) => {
          this._userIdInput.value = user_id.toString();
        })
        .catch((error) => {
          throw error;
        });
      this._selectAllCheckbox.addEventListener('change', () => {
        const checkboxes = this.querySelectorAll<HTMLInputElement>('input[name="selectedTasks"]');

        checkboxes.forEach((checkbox) => {
          checkbox.checked = this._selectAllCheckbox.checked;
        });

        this.updateDeleteButtonState();
      });
      submitButton.addEventListener('click', (event: Event) => {
        if (!this._isDetailCustomEvent(event)) {
          throw new Error(
            `Unexpected event has been sent to 'click on submit button' custom event`,
          );
        }
        this._handleSubmit(event);
      });
    } catch (error) {
      this._handleError(error);
    }

    this.render();
  }

  set greycat(greycat: sdk.GreyCat) {
    this._greycat = greycat;
    this.render();
  }

  private _formatDate(date: Date): string {
    // Format: YYYY-MM-DDTHH:MM
    return date.toISOString().slice(0, 16);
  }

  private _labelHTMLElement(label: string, element: unknown): HTMLDivElement {
    const labelElement = document.createElement('label');
    labelElement.textContent = label;
    const divElement = document.createElement('div');
    divElement.appendChild(labelElement);
    divElement.appendChild(element as HTMLElement);
    return divElement;
  }

  private _isDetailCustomEvent(event: Event): event is CustomEvent {
    return 'detail' in event;
  }

  private _timeToDate(time: sdk.core.time, timeZone: core.TimeZone): string {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    };
    return time.format(timeZone, options);
  }

  private getTimeZoneOffsetMinutes(timeZone: string) {
    const currentDate = new Date();
    const localOffset = currentDate.getTimezoneOffset();
    const targetOffset =
      (-1 *
        (currentDate.getTime() -
          new Date(currentDate.toLocaleString('en-US', { timeZone })).getTime())) /
      (60 * 1000);
    const timeZoneOffset = targetOffset - localOffset;
    return timeZoneOffset;
  }

  private _convertToTimezone(
    datetimeInput: HTMLInputElement | null,
    initialTimeZone: core.TimeZone,
  ): Date {
    const inputValue = datetimeInput?.value;

    if (!inputValue || !initialTimeZone.value || !this._timeZone.value) {
      throw new Error('Start time or timezone inputs are invalid.');
    }

    const initialDateTime = new Date(inputValue);
    const initialTimeZoneValue = initialTimeZone.value.toString();
    const targetTimeZone = this._timeZone.value.toString();

    // Get the time zone offsets
    const initialTimeZoneOffset = this.getTimeZoneOffsetMinutes(initialTimeZoneValue);
    const targetTimeZoneOffset = this.getTimeZoneOffsetMinutes(targetTimeZone);
    const timeZoneOffsetDifference = (initialTimeZoneOffset - targetTimeZoneOffset) * 60 * 1000;

    // Apply the offset difference to convert to the target time zone
    const convertedDateTime = new Date(initialDateTime.getTime() - timeZoneOffsetDifference);

    const formattedConvertedDateTime = convertedDateTime;
    return formattedConvertedDateTime;
  }

  private _createDuration(value: number, unit: core.DurationUnit): core.duration {
    switch (unit.key) {
      default:
      case 'microseconds':
        return core.duration.create(value);
      case 'milliseconds':
        return core.duration.from_ms(value);
      case 'seconds':
        return core.duration.from_secs(value);
      case 'minutes':
        return core.duration.from_mins(value);
      case 'hours':
        return core.duration.from_hours(value);
      case 'days':
        return core.duration.from_days(value);
      case 'weeks':
        return core.duration.from_weeks(value);
      case 'months':
        return core.duration.from_months(value);
      case 'years':
        return core.duration.from_years(value);
    }
  }

  private async _handleSubmit(submitEvent: CustomEvent) {
    submitEvent.preventDefault();
    try {
      const durationNumber = parseInt(this._durationInput.value ?? '0');
      const durationUnitName = this._durationUnitSelect.value ?? 'minutes';
      const durationUnit = this.stringToDurationUnit[durationUnitName];
      const individualTimeZone = this._individualTimeZoneSelect.selected as core.TimeZone;
      const updatedDateWithTimeZone = this._convertToTimezone(
        this._startTimeInput,
        individualTimeZone,
      );
      const args = this._taskArgsComponent.arguments;

      const formData: PeriodicTaskProperties = {
        name: this._periodicTaskNameInput.value ?? '',
        user_id: parseInt(this._userIdInput.value ?? '0'),
        // TODO: This should be passed as Array<any>, but not string. When runtime.PeriociTask.set() is fixed.
        args: args.toString(),
        start: core.time.fromDate(updatedDateWithTimeZone),
        every: this._createDuration(durationNumber, durationUnit),
      };

      await this._addPeriodicTask(formData);
      this._periodicTaskDialog.close();
    } catch (error) {
      this._handleError(error);
    }
  }

  private _handleError(error: unknown) {
    // TODO: replace with User friendly error notification
    console.error(error);
  }

  private _showPeriodicTaskPopup() {
    this._periodicTaskNameInput.value = '';
    this._startTimeInput.value = this._formatDate(new Date());
    this._durationInput.value = '0';
    this._durationUnitSelect.value = 'minutes';
    this._individualTimeZoneSelect.selected = this._timeZone;

    this._periodicTaskDialog.showModal();
  }

  private async _addPeriodicTask(periodicTaskFormData: PeriodicTaskProperties) {
    try {
      this._periodicTasks = await runtime.PeriodicTask.all(this._greycat);
      const periodicTaskIndex = this._periodicTasks.findIndex(
        (periodicTask) =>
          `${periodicTask.name}${periodicTask.args}` ===
          `${periodicTaskFormData.name}${periodicTaskFormData.args}`,
      );
      if (periodicTaskIndex !== -1) {
        throw new Error('Periodic Task with the same function name and arguments already exists');
      } else {
        const newPeriodicTask = runtime.PeriodicTask.create(
          periodicTaskFormData.name,
          periodicTaskFormData.user_id,
          periodicTaskFormData.args,
          periodicTaskFormData.start,
          periodicTaskFormData.every,
          this._greycat,
        );
        await runtime.PeriodicTask.set([...this._periodicTasks, newPeriodicTask], this._greycat);
        this._periodicTasks = await runtime.PeriodicTask.all(this._greycat);
        this.render();
      }
    } catch (error) {
      this._handleError(error);
    }
  }

  private _getPeriodicTaskProperty(
    periodicTask: runtime.PeriodicTask,
    propertyName: string,
  ): PeriodicTaskProperties[PeriodicTaskPropertyType] {
    if (!PeriodicTaskPropertyNamesList.includes(propertyName)) {
      throw new Error(`Unexpected property name for runtime.PeriodicTask`);
    }
    // Ensured that propertyName is one of the valid names in the if-statement
    const validPropertyName = propertyName as PeriodicTaskPropertyType;
    return periodicTask[validPropertyName];
  }

  private async _deleteSelectedTasks() {
    const selectedCheckboxes = this.querySelectorAll<HTMLInputElement>(
      'input[name="selectedTasks"]:checked',
    );
    const selectedTaskNamesAndArgs = Array.from(selectedCheckboxes).map(
      (checkbox) => checkbox.value,
    );

    try {
      this._periodicTasks = await runtime.PeriodicTask.all(this._greycat);
      const updatedPeriodicTasks = this._periodicTasks.filter(
        (task) => !selectedTaskNamesAndArgs.includes(`${task.name}${task.args}`),
      );

      await runtime.PeriodicTask.set(updatedPeriodicTasks, this._greycat);
      this._periodicTasks = await runtime.PeriodicTask.all(this._greycat);
      this.render();
    } catch (error) {
      this._handleError(error);
    }
  }

  private updateDeleteButtonState() {
    const selectedCheckboxes = this.querySelectorAll<HTMLInputElement>(
      'input[name="selectedTasks"]:checked',
    );
    this._deleteSelectedButton.disabled = selectedCheckboxes.length === 0;
  }

  private async render() {
    const tbody = this._table.querySelector('tbody');
    if (tbody) {
      tbody.remove();
    }

    const newTbody = document.createElement('tbody');

    this._periodicTasks.forEach((periodicTask) => {
      const row = document.createElement('tr');
      const selectedPeriodicTaskAttirbutes = this._headers.map((headerName) => {
        try {
          const periodicTaskPropertyValue = this._getPeriodicTaskProperty(periodicTask, headerName);
          if (periodicTaskPropertyValue !== undefined) {
            if (headerName === 'start') {
              return this._timeToDate(periodicTaskPropertyValue as core.time, this._timeZone);
            } else if (headerName === 'every') {
              return (periodicTaskPropertyValue as core.duration).toString();
            } else {
              return periodicTaskPropertyValue;
            }
          } else {
            return '';
          }
        } catch (error) {
          this._handleError(error);
          return '';
        }
      });
      selectedPeriodicTaskAttirbutes.forEach((periodicTaskDetail) => {
        const tdElement = document.createElement('td');
        tdElement.textContent = periodicTaskDetail?.toString() ?? 'undefined';
        row.appendChild(tdElement);
      });

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'selectedTasks';
      checkbox.value = `${periodicTask.name}${periodicTask.args}`;
      checkbox.addEventListener('change', () => {
        this.updateDeleteButtonState();
      });
      row.appendChild(document.createElement('td')).appendChild(checkbox);

      newTbody.appendChild(row);
    });

    this._table.appendChild(newTbody);
  }
}

if (!customElements.get('gui-periodic-tasks')) {
  customElements.define('gui-periodic-tasks', GuiPeriodicTasks);
}

declare global {
  interface Window {
    GuiPeriodicTasks: typeof GuiPeriodicTasks;
  }
  interface HTMLElementTagNameMap {
    'gui-periodic-tasks': GuiPeriodicTasks;
  }
}