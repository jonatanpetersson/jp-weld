import { CatchType } from '../model/enums.js';

export function tryCatch(
  functionToTry: Function,
  catchType: CatchType,
  printError: boolean = true,
  customMessage?: string
): any | undefined {
  const colour =
    catchType === CatchType.Warning
      ? '\x1b[93m%s\x1b[0m'
      : catchType === CatchType.Error
      ? '\x1b[91m%s\x1b[0m'
      : '\x1b[0m%s\x1b[0m';

  const createMessage = (err: any): string => {
    let message = `\n  ${catchType.toUpperCase()}`;
    message = printError ? `${message}\n  ${err}` : message;
    message = customMessage ? `${message}\n  ${customMessage}` : message;
    message = message + '\n';
    return message;
  };

  try {
    return functionToTry();
  } catch (error: any) {
    const message = createMessage(error);
    console.log(colour, message);
    return undefined;
  }
}
