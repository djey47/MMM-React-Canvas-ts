import { Log } from './utils/mm2_facades';
import {
  NOTIF_INIT,
  NOTIF_SET_CONFIG,
} from '../support/notifications';
import { MM2Helper } from './types/mm2';
import { startProcessing } from './processing/custom-processor';

/**
 * Magic Mirror
 * Custom NodeHelper implementation
 */
const mm2Helper: MM2Helper = {
  start: function() {
    Log.log('**** mm2Helper:start');
    this.started = false;
  },

  socketNotificationReceived: function(notification: string, payload: object) {
    Log.log('**** mm2Helper:socketNotificationReceived', { notification, payload });
    if (notification === NOTIF_SET_CONFIG && !this.started) {
      this.config = payload;
      this.started = true;
      // Calling inherited method
      if (this.sendSocketNotification) {
        this.sendSocketNotification(NOTIF_INIT);
      }

      startProcessing(this);
    }
  },
};

module.exports = mm2Helper;
