declare const Log: MM2Logger;

declare const Module: MM2ModuleHelper;

/**
 * The MagicMirror contains a convenience wrapper for logging. Currently, this logger is a simple proxy to the original console.log methods.
 * But it might get additional features in the future.
 * @see https://docs.magicmirror.builders/development/logger.html
 */
interface MM2Logger {
  error(...data: unknown[]): void;
  info(...data: unknown[]): void;
  log(...data: unknown[]): void;
}

/**
 * @see https://docs.magicmirror.builders/development/core-module-file.html
 */
interface MM2ModuleHelper {
  /**
   * This function has to be called for the module to be used
   * @param moduleName the name of the module
   * @param moduleProperties an object with the module properties
   */
  register(moduleName: string, moduleProperties: MM2ModuleProperties): void;
}

/**
 * @see https://docs.magicmirror.builders/development/core-module-file.html#available-module-instance-properties
 */
interface MM2ModuleProperties {
  /**
   * The configuration of the module instance as set in the user's config.js file.
   * This config will also contain the module's defaults if these properties are not over-written by the user config.
   */
  config?: {
    debug?: boolean;
  };
  /**
   * Any properties defined in the defaults object, will be merged with the module config as defined in the user's config.js file.
   * This is the best place to set your modules' configuration defaults.
   */
  defaults: object;
  /**
   * If you want to create a path to a file in your module folder, use the file() method.
   * It returns the path to the filename given as the attribute.
   * This method comes in handy when configuring the getScripts and getStyles methods.
   * @param fileName The name of the file you want to create the path for.
   */
  file?(fileName: string): string;
  /**
   * Whenever the MagicMirror needs to update the information on screen
   * (because it starts, or because your module asked a refresh using this.updateDom()),
   * the system calls the getDom method. This method should therefore return a dom object.
   */
  getDom(): HTMLDivElement | undefined;
  /**
   * Whenever the MagicMirror needs to update the information on screen
   * (because it starts, or because your module asked a refresh using this.updateDom()),
   * the system calls the getHeader method to retrieve the module's header.
   * This method should therefore return a string.
   * If this method is not subclassed, this function will return the user's configured header.
   * If you want to use the original user's configured header, reference this.data.header.
   * NOTE: If the user did not configure a default header, no header will be displayed and thus this method will not be called.
   */
  getHeader(): string;
  /**
   * The getStyles method is called to request any additional stylesheets that need to be loaded.
   * This method should therefore return an array with strings.
   * If you want to return a full path to a file in the module folder, use the this.file('filename.css') method.
   * In all cases the loader will only load a file once. It even checks if the file is available in the default vendor folder.
   */
  getStyles(): string[];
  /**
   * React Canvas additional property for internal use.
   * Indicates if node helper is loaded and has received module configuration.
   */
  helperLoaded?: boolean;
  /**
   * The name of the module.
   */
  name?: string;
  /**
   * That MagicMirror core has the ability to send notifications to modules.
   * Or even better: the modules have the possibility to send notifications to other modules.
   * @param notif The notification identifier.
   * @param payload The payload of a notification.
   * @param sender The sender of the notification. If this argument is undefined, the sender of the notification is the core system.
   */
  notificationReceived(notif: string, payload?: unknown, sender?: unknown);
  /**
   * If you want to send a notification to the node_helper, use the sendSocketNotification(notification, payload).
   * Only the node_helper of this module will receive the socket notification.
   * @param notif The notification identifier.
   * @param payload The payload of a notification.
   */
  sendSocketNotification?(notif: string, payload?: unknown);
  /**
   * When using a node_helper, the node helper can send your module notifications.
   * @param notif The notification identifier.
   * @param payload The payload of a notification.
   */
  socketNotificationReceived(notif: string, payload: unknown);
  /**
   * This method is called when all modules are loaded and the system is ready to boot up.
   * Keep in mind that the dom object for the module is not yet created.
   * The start method is a perfect place to define any additional module properties
   */
  start(): void;
  /**
   * React Canvas additional property for internal use.
   * Indicates if the React view engine is started and ready to render components.
   */
  viewEngineStarted?: boolean;
  /**
   * React Canvas additional property for internal use.
   * Writes data via the embedded logger only if debug mode is enabled.
   */
  debugLog(...data: unknown[]): void;
}
