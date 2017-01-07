import React, { Component } from 'react';

import IntlMessages from '../../../util/IntlMessages';
import withSettingsContext, { ISettingsContext } from 'contexts/SettingsContext';

class NoHeaderNotification extends Component<ISettingsContext> {
  render() {
    const {
      values: { navCollapsed },
      toggleCollapsedSideNav,
    } = this.props;
    return (
      <div className="upm-no-header-horizontal">
        <div className="upm-d-block upm-d-lg-none upm-linebar upm-mr-xs-3">
          <i
            className="upm-icon-btn icon icon-menu"
            onClick={() => {
              toggleCollapsedSideNav(!navCollapsed);
            }}
          />
        </div>
        <div className="upm-no-header-horizontal-top">
          <div className="upm-no-header-horizontal-top-center">
            <i className="icon icon-alert upm-mr-3" />
            <p className="upm-mb-0 upm-text-truncate">
              <IntlMessages id="app.announced" />
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default withSettingsContext(NoHeaderNotification);
