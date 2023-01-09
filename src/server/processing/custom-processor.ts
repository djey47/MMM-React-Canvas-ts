import { Log } from '../utils/mm2_facades';
import { MM2Helper } from '../types/mm2';

export function startProcessing(helperContext: MM2Helper) {
  if (helperContext.config?.debug) {
    Log.log('**** custom-processor:startProcessing', helperContext);
  }

  let iterationIndex = 0;
  setInterval(() => {
    if (helperContext.sendSocketNotification) {
      helperContext.sendSocketNotification('NOTIF', { iterationIndex });
    }
    iterationIndex += 1;
  }, 5000);
}
