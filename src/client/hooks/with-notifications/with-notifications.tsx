import { useState } from 'react';
import { NotificationCatcher } from './notification-catcher';

interface WithNotificationsData {
  [key: string]: unknown | object;
}

/**
 * Provides a React hook acting as a gateway between MM2 notifications and components.
 *
 * This hook relies upon a catcher singleton which has to be plugged into MM2 module lifecycle.
 *
 * @param subscribed list of notification codes to store and relay payload data from
 */
const useWithNotifications = (subscribed: string[]): WithNotificationsData => {
  const [data, setData] = useState({});

  NotificationCatcher.getInstance().switchHandler(
    handleNotificationReceived,
    subscribed
  );

  function handleNotificationReceived(notif: string, payload?: unknown) {
    const dataKey = `data_${notif}`;
    setData({
      ...data,
      [dataKey]: payload || {},
    });
  }

  return { ...data };
}

export default useWithNotifications;
