import { ComponentType } from 'react';
import useWithNotifications from '../../hooks/with-notifications/with-notifications';

interface OwnProps {
  prop1: string;
}

interface NotificationData {
  data_NOTIF?: object;
}

const SubscribedSample: ComponentType<OwnProps> = (
  props: OwnProps
) => {
  const notificationData = useWithNotifications(['NOTIF']) as NotificationData;
  const data_NOTIF = notificationData?.data_NOTIF;

  return (
    <div className="subscribed">
      <p className="subscribed__text">Subscribed component to 'NOTIF' event</p>
      <p className="subscribed__props">
        Own props: {JSON.stringify(props)}
      </p>
      <p className="subscribed__value">
        Last received value: {JSON.stringify(data_NOTIF)}
      </p>
    </div>
  );
};

export default SubscribedSample;
