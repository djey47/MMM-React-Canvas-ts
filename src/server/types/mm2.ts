/**
 * MM2 'backend' helper definition
 */
export interface MM2Helper {
  /** MM2-inherited */
  config?: object;
  /** MM2-inherited */
  sendSocketNotification?(notif: string): void;
  socketNotificationReceived(notif: string, payload: object): void;
  start(): void;
  /** MM2-inherited */
  started?: boolean;
}
