import { ComponentType } from 'react';
import { withNotifications } from '../../hoc/with-notifications';

interface OwnProps {
  prop1: string;
}

interface WithNotificationDataProps extends OwnProps {
  data_NOTIF?: object;
}

const SubscribedSample: ComponentType<WithNotificationDataProps> = (
  props: WithNotificationDataProps
) => {
  return (
    <div className="subscribed">
      <p className="subscribed__text">Subscribed component to 'NOTIF' event</p>
      <p className="subscribed__value">
        Last received value: {JSON.stringify(props.data_NOTIF)}
      </p>
    </div>
  );
};

export default withNotifications(SubscribedSample, ['*']);
