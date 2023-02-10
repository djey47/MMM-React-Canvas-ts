import renderer from 'react-test-renderer';
import ConfigurationContext from '../../contexts/ConfigurationContext';
import MainSample from './MainSample';

jest.mock('../Subscribed/Subscribed', () => (props: object) => (
  <div {...props}>Subscribed component</div>
));

describe('MainSample component', () => {
  it('should render correctly with default props', () => {
    const tree = renderer.create(<MainSample />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('should render correctly with configuration context', () => {
    const tree = renderer.create(
      <ConfigurationContext.Provider value={{debug: true}}>
        <MainSample />
      </ConfigurationContext.Provider>
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
