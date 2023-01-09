import { Log } from '../utils/mm2_facades';
import { MM2Helper } from '../types/mm2';

export function startProcessing(moduleContext: MM2Helper) {
  Log.log('**** custom-processor:startProcessing', moduleContext);

  let iterationIndex = 0;
  setInterval(() => {
    if (moduleContext.sendSocketNotification) {
      moduleContext.sendSocketNotification('NOTIF', { iterationIndex });
    }
    iterationIndex += 1;
  }, 5000);
}
