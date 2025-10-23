declare namespace gc {
  export namespace sdk {
    export interface GreyCatWasmExports {
      memory: WebAssembly.Memory;
      /**
       * @param {number} str_ptr Pointer to `const char *str`
       * @param {number} len `str_ptr` length
       * @param {number} tz `core::TimeZone` field offset
       * @param {number} out_epoch_us_ptr address of the result epoch `i64_t *out_epoch_us`
       * @result `1`=success, `0`=error
       */
      gc_dtz_time__parse(
        str_ptr: number,
        len: number,
        tz: number,
        out_epoch_us_ptr: number,
      ): number;

      /**
       * i64_t epoch_us, u32_t tz, const char *format_c_str, char *out, u32_t out_cap
       * @param {bigint} epoch_us timestamp in microseconds
       * @param {number} tz `core::TimeZone` field offset
       * @param {number} format_ptr pointer to a c-string format specifier
       * @param {number} out_ptr pointer to the print buffer to write to
       * @param {number} out_cap maximum capacity of the print buffer
       * @return {number} the number of bytes written to print buffer
       */
      gc_dtz_time__print(
        epoch_us: bigint,
        tz: number,
        format_ptr: number,
        out_ptr: number,
        out_cap: number,
      ): number;
    }
  }

  interface $TypesMap {}
  type AllTypes = keyof $TypesMap extends never ? string : keyof $TypesMap;
  export type $Types = AllTypes;
  interface $FieldsMap {}
  type AllFields = keyof $FieldsMap extends never ? string : keyof $FieldsMap;
  export type $Fields = AllFields;
  interface $FunctionsMap {}
  type AllFunctions = keyof $FunctionsMap extends never ? string : keyof $FunctionsMap;
  export type $Functions = AllFunctions;

  namespace runtime {
    // @ts-ignore
    interface Task<T> {
      /**
       * Downloads the returned value of a task (its `result.gcb`) and deserializes it.
       */
      getFile(filepath: 'result.gcb', g?: gc.sdk.GreyCat, signal?: AbortSignal): Promise<T>;
      /**
       * Downloads a GCB task file.
       *
       * The given `filepath` will be concatenated with the task path eg. `/files/${task.user_id}/tasks/${task.task_id}/${filepath}`
       *
       * Returns a `T[]` because ".gcb" files can contain multiple values.
       *
       * Note that, by default, the `T` is always unknown. It is just given for convenience if you know for sure
       * what is inside the requested file. But it gives no verifications on the content of the data.
       */
      getFile<T = unknown>(
        filepath: `${string}.gcb`,
        g?: gc.sdk.GreyCat,
        signal?: AbortSignal,
      ): Promise<T[]>;
      /**
       * Downloads a task file.
       *
       * The given `filepath` will be concatenated with the task path eg. `/files/${task.user_id}/tasks/${task.task_id}/${filepath}`
       *
       * Returns either a `T` or a `T[]` based on the extension of the file. All files will return `T` except ".gcb" files which
       * can contain more than one value, therefore `T[]`.
       *
       * Note that, by default, the `T` is always unknown. It is just given for convenience if you know for sure
       * what is inside the requested file. But it gives no verifications on the content of the data.
       */
      getFile<T = unknown>(
        filepath: string,
        g?: gc.sdk.GreyCat,
        signal?: AbortSignal,
      ): Promise<T | T[]>;

      /**
       * Awaits for the completion of the task and returns the deserialized content of its `result.gcb`.
       *
       * If an error has been thrown during the execution of the task then this call will also throw an error with the `core.Error`
       *
       * @param opts configuration options for the wait
       * @param g
       * @param signal
       */
      result(opts?: sdk.TaskOptions, g?: gc.sdk.GreyCat, signal?: AbortSignal): Promise<T>;

      /**
       * Whether or not this task is live or completed.
       * @param g
       * @param signal
       */
      isRunning(g?: gc.sdk.GreyCat, signal?: AbortSignal): Promise<boolean>;
      on(type: 'progress', callback: (p: number | null | undefined) => void, pollEvery?: number): void;
      /**
       * Returns the current progress of the task.
       * @param g
       */
      getProgress(g?: gc.sdk.GreyCat): number | undefined | null;
    }
  }

  namespace io {
    interface File {
      children?: gc.io.File[];

      /**
       * Lists the current children of this file.
       *
       * If this file is not a directory, returns `undefined`.
       */
      list(g?: gc.sdk.GreyCat, signal?: globalThis.AbortSignal): Promise<gc.io.File[] | undefined>;

      /**
       * Resolves this file's children recursively to a maximum depth of `maxDepth` (defaults to `5`)
       */
      resolve(
        maxDepth?: number,
        g?: gc.sdk.GreyCat,
        signal?: globalThis.AbortSignal,
      ): Promise<void>;

      /**
       * Downloads the content of this file. This method interprets the extension in order to
       * call the appropriate deserializer.
       *
       * *This is nothing more than sugar on top of `gc.$.default.getFile(this.path)`*
       */
      download<T = unknown>(
        offset?: number,
        max?: number,
        g?: gc.sdk.GreyCat,
        signal?: globalThis.AbortSignal,
      ): Promise<T>;
    }
  }

  namespace core {
    interface Date {
      /**
       * ISO8601-ish representation of this date
       */
      toString(opts?: gc.sdk.ToStringOptions): string;
    }
  }
}
