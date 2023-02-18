export interface NotificationCatcherOptions {
  isDebugMode?: boolean;
}

/**
 * Catcher singleton to be module-wide used
 *
 * It must be instantiated in an early module lifecycle step.
 * Its goal is to relay notifications coming from related lifecycle functions.
 * This will provide a way to plug React components (via HOC) to (socket/non socket) notifications.
 */
export class NotificationCatcher {
  static instance?: NotificationCatcher = undefined;
  notificationHandler: (n: string, p?: unknown) => void;
  subscribedNotifications: string[];
  isInitialized: boolean;
  options: NotificationCatcherOptions;

  constructor(options?: NotificationCatcherOptions) {
    this.notificationHandler = this.defaultHandler;
    this.subscribedNotifications = ['*'];
    this.isInitialized = false;
    this.options = {
      isDebugMode: false,
      ...options,
    };

    Log.log(
      '**** with-notifications: Notification catcher ready for initialization'
    );
  }

  /**
   * @returns the one and only notification catcher instance
   */
  public static getInstance(options?: NotificationCatcherOptions) {
    if (!NotificationCatcher.instance) {
      NotificationCatcher.instance = new NotificationCatcher();
    }

    // Update options if necessary
    NotificationCatcher.instance.options = {
      ...NotificationCatcher.instance.options,
      ...options,
    };

    return NotificationCatcher.instance;
  }

  /**
   * Makes catcher instance process notifications with a custom handler
   * @param handler relay function to be invoked on subscribed notification received
   * @param subscribed list of notification codes to store and relay payload data from ('*' will relay everything)
   */
  public switchHandler(
    handler: (n: string, p?: unknown) => void,
    subscribed: string[]
  ) {
    if (
      handler.toString() === this.notificationHandler.toString() &&
      subscribed === this.subscribedNotifications
    ) {
      return;
    }

    this.notificationHandler = handler;
    this.subscribedNotifications = subscribed;

    this.debugLog(
      `Notification catcher switched to handler ${handler} for ${subscribed}`
    );
  }

  /**
   * Passes a notification to the catcher if satisfies subscription
   *
   * To be used typically in MM2 lifecycle functions
   *
   * @param notif notification code
   * @param payload notification contents, eventually
   */
  public catchNotification(notif: string, payload?: unknown) {
    if (
      this.subscribedNotifications.includes('*') ||
      this.subscribedNotifications.includes(notif)
    ) {
      this.debugLog(
        `Notification catcher relaying notification {${notif}:${payload}}`
      );

      this.notificationHandler(notif, payload);
    } else {
      this.debugLog(
        `Notification catcher rejecting notification without subscription {${notif}:${payload}}`
      );
    }
  }

  private defaultHandler(n: string, p?: unknown) {
    this.debugLog(
      `Notification catcher processing notification with default handler {${n}:${p}}`
    );
  }

  private debugLog(message: string) {
    if (this.options.isDebugMode) {
      Log.log(`**** with-notifications: ${message}`);
    }
  }
}
