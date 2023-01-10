/** MM2 provided libraries */

/**
 * That is the core helper allowing your own helper instantiation.
 */
declare module 'node_helper' {
  /**
   * @param helper Check MM2Helper interface in mm2.ts
   */
  declare function create(helper: MM2Helper);
}

/**
 * The MagicMirror contains a convenience wrapper for logging. Currently, this logger is a simple proxy to the original console.log methods.
 * But it might get additional features in the future.
 */
declare module 'logger' {
  declare function error(data: string);
  declare function info(data: string);
  declare function log(data: string);
}
