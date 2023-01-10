/**
 * The MagicMirror contains a convenience wrapper for logging. Currently, this logger is a simple proxy to the original console.log methods.
 * But it might get additional features in the future.
 * @see https://docs.magicmirror.builders/development/logger.html
 */
export interface MM2Logger {
  error(data: string): void;
  info(data: string): void;
  log(data: string): void;
}

/**
 * @see https://docs.magicmirror.builders/development/core-module-file.html
 */
export interface MM2ModuleHelper {
  /**
   * This function has to be called for the module to be used
   * @param moduleName the name of the module
   * @param moduleProperties an object with the module properties
   */
  register(moduleName: string, moduleProperties: MM2ModuleProperties): void;
}
