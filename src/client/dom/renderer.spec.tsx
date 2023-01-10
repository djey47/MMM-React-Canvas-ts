/**
 * @jest-environment jsdom
 */
/* eslint-disable @typescript-eslint/ban-ts-comment */

const mockRender = jest.fn();
jest.mock('react-dom/client', () => ({
  createRoot: () => ({
    render: mockRender,
  }),
}));

jest.mock('../components/Main/MainSample', () => () => (
  <div>MainSample component</div>
));

import MainSample from '../components/Main/MainSample';
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
      mockRender.mockReset();
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
      expect(mockRender).not.toHaveBeenCalled();
    });

    it('should render with wrapper DOM element', () => {
      // given
      const wrapper = renderWrapper('wrapper-id');
      document.body.appendChild(wrapper);

      // when
      renderMainComponent('wrapper-id');

      // then
      // @ts-ignore
      expect(global.Log.error).not.toHaveBeenCalled();
      expect(mockRender).toHaveBeenCalledWith(<MainSample />);
    });
  });
});
