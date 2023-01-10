/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */

const mockReactDOMRender = jest.fn();
jest.mock('react-dom', () => ({
  render: mockReactDOMRender,
}));

import { renderMainComponent, renderWrapper } from './renderer';

describe('MM2 module React renderer', () => {
  beforeAll(() => {
    // @ts-ignore
    global.Log = {
      error: jest.fn(),
    };
  });

  describe('renderWrapper function', () => {
    it('should return wrapper DOM element', () => {
      // given-when
      const actual = renderWrapper('wrapper-id');

      // then
      expect(actual).toBeDefined();
      expect(actual.id).toBe('wrapper-id');
      expect(actual.className).toBe('wrapper-id');
    });
  });

  describe('renderMainComponent function', () => {
    // TODO add nominal render case when migrating to React18 syntax
    beforeEach(() => {
      mockReactDOMRender.mockReset();
      // @ts-ignore
      global.Log.error.mockReset();

      const wrapper = document.getElementById('wrapper-id');
      if (wrapper) {
        document.removeChild(wrapper);
      }
    });

    it('should not render without wrapper DOM element', () => {
      // given-when
      renderMainComponent('wrapper-id');

      // then
      // @ts-ignore
      expect(global.Log.error).toHaveBeenCalled();
      expect(mockReactDOMRender).not.toHaveBeenCalled();
    });
  });
});
