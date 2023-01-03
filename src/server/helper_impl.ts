import {
  NOTIF_INIT,
  NOTIF_SET_CONFIG,
} from '../support/notifications';
import { MM2Helper } from '../support/types';

/**
 * Magic Mirror
 * Custom NodeHelper implementation
 */
const mm2Helper: MM2Helper = {
  start: function() {
    this.started = false;
  },

  socketNotificationReceived: function(notification: string, payload: object) {
    if (notification === NOTIF_SET_CONFIG && !this.started) {
      this.config = payload;
      this.started = true;
      // Calling inherited method
      if (this.sendSocketNotification) {
        this.sendSocketNotification(NOTIF_INIT);
      }
    }
  },
};

export default mm2Helper;
