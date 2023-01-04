/**
 * Magic Mirror
 * Module bootstrap
 */

import * as Notifications from '../support/notifications';
import {
  renderWrapper,
  renderMainComponent,
} from './dom/renderer';

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
  // Define module defaults
  defaults: {},

  /**
   * Defines required scripts.
   */
  getStyles: function(): string[] {
    return [
      this.file ? this.file('styles.css') : '',      // Webpack bundle
      'font-awesome.css',
    ];
  },

  /**
   * Defines start sequence.
   */
  start: function(): void {
    Log.info(`**Starting module: ${this.name}`);

    // Global state
    this.loaded = false;
    this.viewEngineStarted = false;
  },

  /**
   * What's being written on top
   */
  getHeader: function(): string {
    return 'MM2 Module Header';
  },

  /**
   * Overrides DOM generator.
   * At first, it will create module wrapper and return it to be correctly attached to MM2 app.
   * When module is loaded (configuration updated server-side), will start REACT engine.
   */
  getDom: function(): HTMLDivElement | undefined {
    if (this.viewEngineStarted) {
      return undefined;
    }
    return renderWrapper(getWrapperId());
  },

  /**
   * Intercepts local events
   */
  notificationReceived: function(notification: string) {
    if (this.config?.debug) Log.info(`**${this.name} notificationReceived: ${notification}`);

    if (notification === Notifications.NOTIF_DOM_OBJECTS_CREATED) {
      renderMainComponent(getWrapperId());
      this.viewEngineStarted = true;
    }
  },

  /**
   * Intercepts server side events
   */
  socketNotificationReceived: function(notification: string, payload: object): void {
    if (this.config?.debug) {
      Log.info(`**${this.name} socketNotificationReceived: ${notification}`);
      Log.info(`**${this.name} socketNotificationReceived: ${JSON.stringify(payload, null, 2)}`);
    }

    switch(notification) {
      case Notifications.NOTIF_INIT:
        this.loaded = true;
        break;
    }
  },
});
