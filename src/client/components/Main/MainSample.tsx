import React, { PureComponent } from 'react';
import classnames from 'classnames';

import '../../styles/reset.scss';
import '../../styles/module.scss';
import './MainSample.scss';

interface Props {}

interface State {}

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
      <div className={classnames('MainSample', 'dimmed', 'light', 'small')}>
        <p className="MainSample__description">
          Main component sample for MM2's React-Typescript template
        </p>
      </div>
    );
  }
}

export default MainSample;
