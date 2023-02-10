jest.mock('./utils/mm2_facades', () => ({
  Log: {
    log: jest.fn(),
  },
  NodeHelper: {},
}));

const mockStartProcessing = jest.fn();
jest.mock('./processing/custom-processor', () => ({
  startProcessing: mockStartProcessing,
}));

import * as impl from './helper_impl';
import { MM2Helper } from './types/mm2';

const nodeHelper = impl as MM2Helper;

describe('MM2 helper implementation', () => {
  describe('start function', () => {
    it('should set started flag to false', () => {
      // given-when
      nodeHelper.start();

      // then
      expect(nodeHelper.started).toBe(false);
    });
  });

  describe('socketNotificationReceived function', () => {
    beforeEach(() => {
      mockStartProcessing.mockReset();
    });

    it('should do nothing when notif is not SET_CONFIG', () => {
      // given-when
      nodeHelper.socketNotificationReceived('NOTIF', {});

      // then
      expect(mockStartProcessing).not.toHaveBeenCalled();
    });

    it('should register config when notif is SET_CONFIG', () => {
      // given
      const sendSocketNotificationMock = jest.fn();
      nodeHelper.sendSocketNotification = sendSocketNotificationMock;

      // when
      nodeHelper.socketNotificationReceived('SET_CONFIG', { key1: 'value1' });

      // then
      expect(nodeHelper.config).toEqual({ key1: 'value1' });
      expect(nodeHelper.started).toBe(true);
      expect(sendSocketNotificationMock).toHaveBeenCalledWith('INIT');
      expect(mockStartProcessing).toHaveBeenCalledWith(nodeHelper);
    });
  });

  describe('stop function', () => {
    it('should do nothing by default', () => {
      // given-when-then
      nodeHelper.stop();
    });
  });
});
