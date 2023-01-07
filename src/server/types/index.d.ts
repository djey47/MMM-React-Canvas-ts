/** MM2 provided libraries */

/**
 * Core helper
 */
declare module 'node_helper' {
  /**
   * @param helper Check interface in mm2.ts
   */
  declare function create(helper: MM2Helper);
}

/**
 * Simple console logger
 */
declare module 'logger' {
  /**
   * @param data item to be displayed
   */
  declare function log(...data: unknown[]);
}
