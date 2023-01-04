/**
 * MM2 internal logger
 */
declare const Log: MM2Logger;

/**
 * MM2 Module helper
 */
declare const Module: MM2ModuleHelper;

interface MM2Logger {
  info(message: string): void;
  error(message: string): void;
}

interface MM2ModuleHelper {
  register(moduleName: string, moduleImplementation: MM2ModuleImpl): void;
}

interface MM2ModuleImpl {
  config?: {
    debug: boolean;
  };
  defaults: object;
  file?(fileName: string): string;
  getDom(): HTMLDivElement | undefined;
  getHeader(): string;
  getStyles(): string[];
  loaded?: boolean;
  name?: string;
  notificationReceived(notif: string);
  socketNotificationReceived(notif: string, payload: object);
  start(): void;
  viewEngineStarted?: boolean;
}
