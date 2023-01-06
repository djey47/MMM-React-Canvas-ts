import React, { PureComponent } from 'react';
import classnames from 'classnames';
import Subscribed from '../Subscribed/Subscribed';

import '../../styles/reset.scss';
import '../../styles/module.scss';
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
  static defaultProps = {}

  constructor(props: Props) {
    super(props);
  }

  /**
   * @return component markup
   */
  render() {
    return (
      <div className={classnames('main-sample', 'dimmed', 'light', 'small')}>
        <p className="main-sample__description">
          Main component sample for MM2's React-Typescript template
        </p>
        <Subscribed prop1="text" />
      </div>
    );
  }
}

export default MainSample;
