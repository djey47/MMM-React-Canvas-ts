export interface MM2Logger {
  info(message: string): void;
  error(message: string): void;
}

export interface MM2ModuleHelper {
  register(moduleName: string, moduleImplementation: MM2ModuleImpl): void;
}
