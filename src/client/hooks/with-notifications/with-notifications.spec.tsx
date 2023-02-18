/* eslint-disable @typescript-eslint/ban-ts-comment */

import { FunctionComponent } from 'react';
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { NotificationCatcher } from './notification-catcher';
import useWithNotifications from './with-notifications';

describe('with-notifications hook', () => {
  beforeAll(() => {
    // @ts-ignore
    global.Log = {
      log: jest.fn(),
    };
  });

  describe('withNotifications function', () => {
    it('should do nothing without notification', () => {
      // given-when-then
      const tree = create(<TestComponent prop1="val1" />).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should provide data from notification', () => {
      // given
      let root: ReactTestRenderer;
      act(() => {
        root = create(<TestComponent prop1="val1" />);
      });

      // when
      act(() => {
        NotificationCatcher.getInstance().catchNotification('TOPIC', {
          data: 1,
        });
        root.update(<TestComponent prop1="val1" prop2="val2" />);
      });

      // then
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(root!.toJSON()).toMatchSnapshot();
    });

    it('should handle notification without data', () => {
      // given
      let root: ReactTestRenderer;
      act(() => {
        root = create(<TestComponent prop1="val1" />);
      });

      // when
      act(() => {
        NotificationCatcher.getInstance().catchNotification('TOPIC');
        root.update(<TestComponent prop1="val1" prop2="val2" />);
      });

      // then
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(root!.toJSON()).toMatchSnapshot();
    });
  });
});

interface TestComponentProps {
  prop1: string;
  prop2?: string;
}

const TestComponent: FunctionComponent<TestComponentProps> = (
  props: TestComponentProps
) => {
  const hookData = useWithNotifications(['TOPIC']);
  return <div {...props}>Test component: {JSON.stringify(hookData, null, 2)}</div>;
};
