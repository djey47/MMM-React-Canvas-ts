// TODO See to mock NotificationCatcher properly

import { MM2ModuleHelper } from './types/mm2';
// const mockCatcherGetInstance = jest.fn();
const mockModuleRegister = jest.fn();
const moduleMock: MM2ModuleHelper = {
  register: mockModuleRegister,
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.Module = moduleMock;

const logMock: MM2Logger = {
  info: jest.fn(),
  error: jest.fn(),
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
global.Log = logMock;

// import {
//   renderWrapper,
//   renderMainComponent,
// } from './dom/renderer';
import './module';

jest.mock('./dom/renderer');
// jest.mock('./hoc/with-notifications', () => ({
//   getInstance: mockCatcherGetInstance,
// }))

// const renderWrapperMock = renderWrapper as jest.Mock;
// const renderMainComponentMock = renderMainComponent as jest.Mock;
const sendSocketNotificationMock = jest.fn();


describe('MM2 Module client', () => {
  it('should register client implementation', () => {
    expect(mockModuleRegister).toHaveBeenCalled();

    const {name, implementation} = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);
    expect(name).toBe('MMM-React-Canvas-ts');
    expect(implementation.defaults).toEqual({});
    expect(typeof implementation.getDom).toBe('function');
    expect(typeof implementation.getHeader).toBe('function');
    expect(typeof implementation.getStyles).toBe('function');
    expect(typeof implementation.notificationReceived).toBe('function');
    expect(typeof implementation.socketNotificationReceived).toBe('function');
    expect(typeof implementation.start).toBe('function');
  });

  describe('getStyles overriden function', () => {
    it('should return correct styles', () => {
      // given
      const { implementation: { getStyles }} = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);

      // when-then
      expect(getStyles()).toEqual(['/file/styles.css', 'font-awesome.css']);
    });
  });

  describe('start overriden function', () => {
    beforeEach(() => {
      sendSocketNotificationMock.mockReset();
    });

    it('should set global state and perform initializations', () => {
      // given
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);

      // when
      implementation.start();

      // then
      expect(implementation.loaded).toBe(false);
      expect(implementation.viewEngineStarted).toBe(false);
      expect(sendSocketNotificationMock).toHaveBeenCalledWith('SET_CONFIG', {});
    });
  });
});

function checkAndExtractRegistration(call?: unknown) {
  if (!call) {
    fail('Module registration call did not happen!');
  }
  const name = mockModuleRegister.mock.lastCall[0] as string;
  const implementation = mockModuleRegister.mock.lastCall[1] as MM2ModuleImpl;

  // Add MM2 inherited bits into implementation
  const enhancedImplementation = {
    ...implementation,
    config: {},
    file: (fileName: string) => `/file/${fileName}`,
    sendSocketNotification: sendSocketNotificationMock,
  }
  // Make use of this
  enhancedImplementation.getStyles = enhancedImplementation.getStyles.bind(enhancedImplementation);
  enhancedImplementation.start = enhancedImplementation.start.bind(enhancedImplementation);

  return {
    name,
    implementation: enhancedImplementation,
  };
}
