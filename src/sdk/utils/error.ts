namespace greycat {
  export namespace utils {
    export function prettyError(err: unknown, defaultMsg: string): string {
      if (err instanceof Error) {
        // native JS error
        return err.message;
      }
      if (typeof err === 'string') {
        // string error
        return err;
      }
      if (err instanceof greycat.core.Error) {
        // GreyCat error
        return err.message ?? defaultMsg;
      }
      return defaultMsg;
    }
  }
}
