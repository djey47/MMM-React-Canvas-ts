// Must be located BEFORE the imports
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const mockWithNotifications = jest.fn((c, s) => c);

import renderer from 'react-test-renderer';
import Subscribed from './Subscribed';

jest.mock('../../hoc/with-notifications', () => ({
  withNotifications: mockWithNotifications,
}));

describe('Subscribed component', () => {
  it('should render correctly without notif data', () => {
    const tree = renderer.create(<Subscribed prop1="val1" />).toJSON();
    expect(tree).toMatchSnapshot();
    expect(mockWithNotifications).toHaveBeenCalled();
    expect(mockWithNotifications.mock.calls[0][1]).toEqual(['*']);
  });

  it('should render correctly with notif data', () => {
    const tree = renderer
      .create(<Subscribed prop1="val1" data_NOTIF={{ key: 'value' }} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
