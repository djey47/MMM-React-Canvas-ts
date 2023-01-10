/* eslint-disable @typescript-eslint/ban-ts-comment */

import { MM2ModuleHelper } from './types/mm2';
const mockModuleRegister = jest.fn();
const moduleMock: MM2ModuleHelper = {
  register: mockModuleRegister,
}
// @ts-ignore
global.Module = moduleMock;

const logMock: MM2Logger = {
  error: jest.fn(),
  info: jest.fn(),
  log: jest.fn(),
}
// @ts-ignore
global.Log = logMock;

const mockRenderMainComponent = jest.fn();
const mockRenderWrapper = jest.fn();
jest.mock('./dom/renderer', () => ({
  renderMainComponent: mockRenderMainComponent,
  renderWrapper: mockRenderWrapper,
}));

const mockCatchNotification = jest.fn();
const mockCatcherGetInstance = jest.fn(() => ({
  catchNotification: mockCatchNotification,
}));
jest.mock('./hoc/with-notifications', () => ({
  NotificationCatcher: {
    getInstance: mockCatcherGetInstance,
  },
}));

import './module';

const sendSocketNotificationMock = jest.fn();

describe('MM2 Module client', () => {
  it('should register client implementation', () => {
    expect(mockModuleRegister).toHaveBeenCalled();

    const {name, implementation} = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);
    expect(name).toBe('MMM-React-Canvas-ts');
    expect(implementation.defaults).toEqual({ debug: false });
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
    
    it('should return correct styles when file utility not available', () => {
      // given
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);
      implementation.file = undefined;

      // when-then
      expect(implementation.getStyles()).toEqual(['', 'font-awesome.css']);
    });
  });

  describe('start overriden function', () => {
    beforeEach(() => {
      sendSocketNotificationMock.mockReset();
      mockCatcherGetInstance.mockClear();
    });

    it('should set global state and perform initializations', () => {
      // given
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);

      // when
      implementation.start();

      // then
      expect(implementation.helperLoaded).toBe(false);
      expect(implementation.viewEngineStarted).toBe(false);
      expect(sendSocketNotificationMock).toHaveBeenCalledWith('SET_CONFIG', { debug: false });
      expect(mockCatcherGetInstance).toHaveBeenCalledWith({ isDebugMode: false });
    });

    it('should set Catcher options to debug mode when proper config', () => {
      // given
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);
      if(implementation.config) {
        implementation.config.debug = true;
      }

      // when
      implementation.start();

      // then
      expect(mockCatcherGetInstance).toHaveBeenCalledWith({ isDebugMode: true });
    });
  });

  describe('getHeader overriden function', () => {
    it('should return header string', () => {
      // given
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);
      
      // when-then
      expect(implementation.getHeader()).toBe('MM2 Module Header');
    });

  });  
  
  describe('getDom overriden function', () => {
    beforeEach(() => {
      mockRenderWrapper.mockReset();
    });

    it('should return undefined when react render engine is started', () => {
      // given
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);
      implementation.viewEngineStarted = true;

      // when-then
      expect(implementation.getDom()).toBeUndefined();
    });    
    
    it('should return wrapper div when react render engine is not started', () => {
      // given
      mockRenderWrapper.mockImplementation(() => ({}));
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);
      implementation.viewEngineStarted = false;
      
      // when
      const actual = implementation.getDom();

      // then
      expect(actual).toEqual({});
      expect(mockRenderWrapper).toHaveBeenCalledWith('MMMReactCanvastsWrapper')
    });
  });

  describe('notificationReceived overriden function', () => {
    beforeEach(() => {
      mockRenderMainComponent.mockReset();
      mockCatchNotification.mockReset();
    });

    it('should handle notification without configuration', () => {
      // given
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);
      implementation.config = undefined;

      // when-then
      implementation.notificationReceived('NOTIF');
    });       
    
    it('should handle notification in debug mode', () => {
      // given
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);
      if (implementation.config) {
        implementation.config.debug = true;
      }

      // when-then
      implementation.notificationReceived('NOTIF');
    });     
    
    it('should invoke renderMainComponent function when DOM_OBJECTS_CREATED notification received', () => {
      // given
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);

      // when
      implementation.notificationReceived('DOM_OBJECTS_CREATED');

      // then
      expect(implementation.viewEngineStarted).toBe(true);
      expect(mockRenderMainComponent).toHaveBeenCalledWith('MMMReactCanvastsWrapper');
      expect(mockCatchNotification).toHaveBeenCalledWith('DOM_OBJECTS_CREATED');
    });    
    
    it('should invoke NotificationCatcher when notification received', () => {
      // given
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);

      // when
      implementation.notificationReceived('NOTIF');

      // then
      expect(mockRenderMainComponent).not.toHaveBeenCalled();
      expect(mockCatchNotification).toHaveBeenCalledWith('NOTIF');
    });
  });

  describe('socketNotificationReceived overriden function', () => {
    beforeEach(() => {
      mockCatchNotification.mockReset();
    });

    it('should handle socket notification without configuration', () => {
      // given
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);
      implementation.config = undefined;

      // when-then
      implementation.socketNotificationReceived('NOTIF', {});
    });       

    it('should handle socket notification in debug mode', () => {
      // given
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);
      if (implementation.config) {
        implementation.config.debug = true;
      }

      // when-then
      implementation.socketNotificationReceived('NOTIF', {});
    });  

    it('should invoke NotificationCatcher when socket notification received', () => {
      // given
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);

      // when
      implementation.socketNotificationReceived('NOTIF', {});

      // then
      expect(mockCatchNotification).toHaveBeenCalledWith('NOTIF', {});
    });    
    
    it('should switch helperLoaded flag to true when INIT socket notification received', () => {
      // given
      const { implementation } = checkAndExtractRegistration(mockModuleRegister.mock.lastCall);

      // when
      implementation.socketNotificationReceived('INIT', {});

      // then
      expect(implementation.helperLoaded).toBe(true);
      expect(mockCatchNotification).toHaveBeenCalledWith('INIT', {});
    });

  });
});

function checkAndExtractRegistration(call?: unknown) {
  if (!call) {
    fail('Module registration call did not happen!');
  }
  const name = mockModuleRegister.mock.lastCall[0] as string;
  const implementation = mockModuleRegister.mock.lastCall[1] as MM2ModuleProperties;

  // Add MM2 inherited bits into implementation
  const enhancedImplementation: MM2ModuleProperties = {
    ...implementation,
    config: {
      debug: false,
    },
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
