/**
 * Magic Mirror
 * Module bootstrap
 */

import * as Notifications from '../support/notifications';
import {
  renderWrapper,
  renderMainComponent,
} from './dom/renderer';
import { NotificationCatcher } from './hoc/with-notifications';

/**
 * Custom MM2 module name
 */
const MODULE_NAME = 'MMM-React-Canvas-ts';

/**
 * @private
 * @return DIV Wrapper identifier
 */
const getWrapperId = (): string => {
  return `${MODULE_NAME}Wrapper`.replace(/-/g,'');
};

/**
 * Register specified module to MagicMirror
 */
Module.register(MODULE_NAME, {
  defaults: {
    debug: false,
  },

  getStyles: function(): string[] {
    return [
      this.file ? this.file('styles.css') : '',      // Webpack bundle
      'font-awesome.css',
    ];
  },

  start: function(): void {
    Log.info(`**Starting module: ${this.name}`);
    Log.info(`**Module configuration: ${JSON.stringify(this.config)}`);

    // Global state
    this.helperLoaded = false;
    this.viewEngineStarted = false;

    Log.info('**Starting up notification catcher...');
    NotificationCatcher.getInstance();

    Log.info('**Sending configuration to helper...');
    if (this.sendSocketNotification) {
      this.sendSocketNotification(Notifications.NOTIF_SET_CONFIG, this.config);
    }
  },

  getHeader: function(): string {
    return 'MM2 Module Header';
  },

  /**
   * Overrides DOM generator.
   * At first, it will create module wrapper and return it to be correctly attached to MM2 app.
   * When helper is loaded (configuration updated server-side), will start REACT engine.
   */
  getDom: function(): HTMLDivElement | undefined {
    if (this.viewEngineStarted) {
      return undefined;
    }
    const wrapperId = getWrapperId();
    return renderWrapper(wrapperId);
  },

  notificationReceived: function(notification: string) {
    if (this.config?.debug) {
      Log.info(`**${this.name} notificationReceived: ${notification}`);
    }

    if (notification === Notifications.NOTIF_DOM_OBJECTS_CREATED) {
      renderMainComponent(getWrapperId());
      this.viewEngineStarted = true;
    }

    NotificationCatcher.getInstance().catchNotification(notification);
  },

  socketNotificationReceived: function(notification: string, payload: unknown): void {
    if (this.config?.debug) {
      Log.info(`**${this.name} socketNotificationReceived: ${notification}`);
      Log.info(`**${this.name} socketNotificationReceived: ${JSON.stringify(payload, null, 2)}`);
    }

    switch(notification) {
      case Notifications.NOTIF_INIT:
        this.helperLoaded = true;
        break;
      /* Handle other notification types here ... */
    }

    NotificationCatcher.getInstance().catchNotification(notification, payload);
  },
});
