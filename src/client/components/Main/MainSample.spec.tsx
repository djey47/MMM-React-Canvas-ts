import renderer from 'react-test-renderer';
import MainSample from './MainSample';

jest.mock('../Subscribed/Subscribed', () => (props: object) => (
  <div {...props}>Subscribed component</div>
));

describe('MainSample component', () => {
  it('should render correctly with default props', () => {
    const tree = renderer.create(<MainSample />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
