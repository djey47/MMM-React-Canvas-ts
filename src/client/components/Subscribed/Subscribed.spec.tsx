// Must be located BEFORE the imports
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockUseWithNotifications = jest.fn();

import renderer from 'react-test-renderer';
import Subscribed from './Subscribed';

jest.mock('../../hooks/with-notifications/with-notifications', () => mockUseWithNotifications);

describe('Subscribed component', () => {
  beforeEach(() => {
    mockUseWithNotifications.mockReset();
  });

  it('should render correctly without notif data', () => {
    const tree = renderer.create(<Subscribed prop1="val1" />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(mockUseWithNotifications).toHaveBeenCalledWith(['NOTIF']);
  });

  it('should render correctly with notif data', () => {
    // given
    mockUseWithNotifications.mockReturnValue({ data_NOTIF: { key: 'value' }});

    // when-then
    const tree = renderer
      .create(<Subscribed prop1="val1" />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
