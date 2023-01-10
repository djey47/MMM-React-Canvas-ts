/* eslint-disable @typescript-eslint/ban-ts-comment */

import { FunctionComponent } from "react";
import { act, create, ReactTestRenderer } from 'react-test-renderer';
import { withNotifications, NotificationCatcher } from "./with-notifications";

describe('with-notifications HOC', () => {
  beforeAll(() => {
    // @ts-ignore
    global.Log = {
      log: jest.fn(),
    };
  });

  describe('withNotifications function', () => {
    it('should enhance props without notification', () => {
      // given-when
      const ActualEnhanced = withNotifications(TestComponent, ['TOPIC']);

      // then
      const tree = create(<ActualEnhanced prop1="val1" />).toJSON();
      expect(tree).toMatchSnapshot();
    });    
    
    it('should enhance props with notification and data', () => {
      // given
      const ActualEnhanced = withNotifications(TestComponent, ['TOPIC']);
      let root: ReactTestRenderer;
      act(() => {
        root = create(<ActualEnhanced prop1="val1" />)
      }); 

      // when
      act(() => {
        NotificationCatcher.getInstance().catchNotification('TOPIC', { data: 1});
        root.update(<ActualEnhanced prop1="val1" prop2="val2" />)
      });

      // then
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(root!.toJSON()).toMatchSnapshot();
    });

    it('should enhance props with notification and no data', () => {
      // given
      const ActualEnhanced = withNotifications(TestComponent, ['TOPIC']);
      let root: ReactTestRenderer;
      act(() => {
        root = create(<ActualEnhanced prop1="val1" />)
      }); 

      // when
      act(() => {
        NotificationCatcher.getInstance().catchNotification('TOPIC');
        root.update(<ActualEnhanced prop1="val1" prop2="val2" />)
      });

      // then
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      expect(root!.toJSON()).toMatchSnapshot();
    });
  });

  describe('NotificationCatcher class', () => {
    describe('constructor', () => {
      it('should init correctly with default options', () => {
        // given-when
        const actual = new NotificationCatcher();

        // then
        expect(actual.isInitialized).toBe(false);
        expect(actual.subscribedNotifications).toEqual(['*']);
        expect(actual.options).toEqual({ isDebugMode: false });
        expect(typeof actual.notificationHandler).toBe('function');
      });      
      
      it('should init correctly with custom options', () => {
        // given-when
        const actual = new NotificationCatcher({ isDebugMode: true });

        // then
        expect(actual.options).toEqual({ isDebugMode: true });
      });
    });

    describe('switchHandler method', () => {
      it('should not change subscription if same handler reference provided', () => {
        // given
        const catcher = new NotificationCatcher();
        const defaultHandler = catcher.notificationHandler;

        // when
        catcher.switchHandler(defaultHandler, []);

        // then
        expect(catcher.subscribedNotifications).toEqual(['*']);
      }); 

      it('should change subscription and handler', () => {
        // given
        const catcher = new NotificationCatcher();
        const handler = (n: string, p?: unknown) => {
          console.info('Test notification handler:', { n, p });
        };

        // when
        catcher.switchHandler(handler, ['TOPIC']);

        // then
        expect(catcher.notificationHandler).toBe(handler);
        expect(catcher.subscribedNotifications).toEqual(['TOPIC']);
      }); 
    });

    describe('catchNotification method', () => {
      const handlerMock = jest.fn()
 
      beforeEach(() => {
        handlerMock.mockReset();
        getLogMock().mockReset();
      });

      it('should not invoke handler if notification does not match subscription', () => {
        // given
        const catcher = new NotificationCatcher();
        catcher.switchHandler(handlerMock, ['NOTIF']);

        // when
        catcher.catchNotification('NOTIF2', {});

        // then
        expect(handlerMock).not.toHaveBeenCalled();
      });      
      
      it('should invoke handler if notification matches subscription', () => {
        // given
        const catcher = new NotificationCatcher();
        catcher.switchHandler(handlerMock, ['NOTIF']);

        // when
        catcher.catchNotification('NOTIF', {});

        // then
        expect(handlerMock).toHaveBeenCalledWith('NOTIF', {});
      });      

      it('should invoke handler if subscription to everything', () => {
        // given
        const catcher = new NotificationCatcher();
        catcher.switchHandler(handlerMock, ['*']);

        // when
        catcher.catchNotification('NOTIF', {});

        // then
        expect(handlerMock).toHaveBeenCalledWith('NOTIF', {});
      });

      it('should invoke default handler', () => {
        // given
        const catcher = new NotificationCatcher();

        // when
        catcher.catchNotification('NOTIF', {});

        // then
        expect(getLogMock()).toHaveBeenCalledTimes(1);
        expect(getLogMock()).toHaveBeenCalledWith('**** with-notifications: Notification catcher ready for initialization');
      });      
      
      it('should invoke default handler with debug mode', () => {
        // given
        const catcher = new NotificationCatcher({ isDebugMode: true });

        // when
        catcher.catchNotification('NOTIF', {});

        // then
        expect(getLogMock()).toHaveBeenCalledTimes(3);
        expect(getLogMock()).toHaveBeenNthCalledWith(1, '**** with-notifications: Notification catcher ready for initialization');
        expect(getLogMock()).toHaveBeenNthCalledWith(2, '**** with-notifications: Notification catcher relaying notification {NOTIF:[object Object]}');
        expect(getLogMock()).toHaveBeenNthCalledWith(3, '**** with-notifications: Notification catcher processing notification with default handler {NOTIF:[object Object]}');
      });
    });

    function getLogMock() {
      // @ts-ignore
      return global.Log.log;
    }

    describe('getInstance static method', () => {
      it('should return existing instance', () => {
        // given-when-then
        expect(NotificationCatcher.getInstance()).toBeDefined();
      });      
      
      it('should return existing instance updating options', () => {
        // given-when
        const actual = NotificationCatcher.getInstance({ isDebugMode: true });

        // then
        expect(actual.options.isDebugMode).toBe(true);
      });
    });
  });
});

interface TestComponentProps {
  prop1: string;
  prop2?: string;
  data_TOPIC?: object;
}

const TestComponent: FunctionComponent<TestComponentProps> = (props: TestComponentProps) => {
  return (<div {...props}>Test component</div>);
};
