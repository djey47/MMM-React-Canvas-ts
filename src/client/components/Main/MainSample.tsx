import classnames from 'classnames';
import { PureComponent } from 'react';
import ConfigurationContext from '../../contexts/ConfigurationContext';
import Subscribed from '../Subscribed/Subscribed';

import '../../styles/module.scss';
import '../../styles/reset.scss';
import './MainSample.scss';

interface Props {
  oneProp?: string;
}

interface State {
  oneStateProperty?: number;
}

/**
 * MagicMirror
 * Main REACT component sample
 * Rename this component and associated resources to your convenience
 */
class MainSample extends PureComponent<Props, State> {
  static defaultProps = {};

  constructor(props: Props) {
    super(props);
  }

  /**
   * @return component markup
   */
  render() {
    return (
      <ConfigurationContext.Consumer>
        {(configuration) => (
          <div className={classnames('main-sample', 'dimmed', 'light', 'small')}>
            <p className="main-sample__description">
              Main component sample for MM2's React-Typescript template
            </p>
            <p className="main-sample__configuration">
              Configuration in context:
              <pre>
                <code>
                  {JSON.stringify(configuration)}
                </code>
              </pre>
            </p>
            <Subscribed prop1="text" />
          </div>
        )}
      </ConfigurationContext.Consumer>
    );
  }
}

export default MainSample;
