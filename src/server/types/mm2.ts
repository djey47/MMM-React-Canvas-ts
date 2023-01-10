/**
 * The node helper is able to do some backend task to support your module.
 * For every module type, only one node helper instance will be created.
 */
export interface MM2Helper {
  /**
   * React Canvas additional property.
   * Allows to store and retrieve module configuration by helper side.
   */
  config?: {
    debug?: boolean;
  };
  /**
   * If you want to send a notification to all your modules, use this method.
   * Only the module of your helper type will receive the socket notification.
   * NOTE: Since all instances of your module will receive the notifications,
   * it's your task to make sure the right module responds to your messages.
   * @param notif The notification identifier.
   * @param payload Optional. A notification payload.
   */
  sendSocketNotification?(notif: string, payload?: object): void;
  /**
   * With this method, your node helper can receive notifications from your modules.
   * @param notif The notification identifier.
   * @param payload The payload of a notification.
   */
  socketNotificationReceived(notif: string, payload?: unknown): void;
  /**
   * This method is called when all node helpers are loaded and the system is ready to boot up.
   * The start method is a perfect place to define any additional module properties.
   */
  start(): void;
  /**
   * React Canvas additional property for internal use.
   * Indicates if the helper is started with the configuration ready.
   */
  started?: boolean;
}
