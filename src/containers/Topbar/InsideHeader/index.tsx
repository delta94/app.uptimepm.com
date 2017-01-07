import React from 'react';
import { Button, Dropdown, Icon, Layout, Menu, message, Popover } from 'antd';
import CustomScrollbars from '../../../util/CustomScrollbars';

import languageData from '../languageData';
import SearchBox from '../../../components/SearchBox';
import UserInfo from '../../../components/UserInfo';
import AppNotification from '../../../components/AppNotification';
import MailNotification from '../../../components/MailNotification';
import HorizontalNav from '../HorizontalNav';
import { Link } from 'react-router-dom';
import IntlMessages from '../../../util/IntlMessages';
import withSettingsContext, { ISettingsContext } from 'contexts/SettingsContext';

const { Header } = Layout;

const handleMenuClick = (e: any) => {
  message.info('Click on menu item.');
};

const menu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">Products</Menu.Item>
    <Menu.Item key="2">Blog</Menu.Item>
    <Menu.Item key="3">Apps</Menu.Item>
  </Menu>
);

interface InsideHeaderState {
  searchText: string;
}

class InsideHeader extends React.Component<ISettingsContext, InsideHeaderState> {
  state = {
    searchText: '',
  };

  languageMenu = () => (
    <CustomScrollbars className="upm-popover-lang-scroll">
      <ul className="upm-sub-popover">
        {languageData.map(language => (
          <li className="upm-media upm-pointer" key={JSON.stringify(language)} onClick={(e: any) => this.props.switchLanguage(language)}>
            <i className={`flag flag-24 upm-mr-2 flag-${language.icon}`} />
            <span className="upm-language-text">{language.name}</span>
          </li>
        ))}
      </ul>
    </CustomScrollbars>
  );

  updateSearchChatUser = (evt: any) => {
    this.setState({
      searchText: evt.target.value,
    });
  };

  render() {
    const {
      values: { locale, navCollapsed },
    } = this.props;

    return (
      <div className="upm-header-horizontal upm-header-horizontal-dark upm-inside-header-horizontal">
        <div className="upm-header-horizontal-top">
          <div className="upm-container">
            <div className="upm-header-horizontal-top-flex">
              <div className="upm-header-horizontal-top-left">
                <i className="icon icon-alert upm-mr-3" />
                <p className="upm-mb-0 upm-text-truncate">
                  <IntlMessages id="app.announced" />
                </p>
              </div>
              <ul className="upm-login-list">
                <li>Login</li>
                <li>Signup</li>
              </ul>
            </div>
          </div>
        </div>

        <Header className="upm-header-horizontal-main">
          <div className="upm-container">
            <div className="upm-header-horizontal-main-flex">
              <div className="upm-d-block upm-d-lg-none upm-linebar upm-mr-xs-3 6e">
                <i
                  className="upm-icon-btn icon icon-menu"
                  onClick={() => {
                    this.props.toggleCollapsedSideNav(!navCollapsed);
                  }}
                />
              </div>
              <Link to="/" className="upm-d-block upm-d-lg-none upm-pointer upm-mr-xs-3 upm-pt-xs-1 upm-w-logo">
                <img alt="" src={require('assets/images/UptimePM-Logo-Light.svg')} />
              </Link>
              <Link to="/" className="upm-d-none upm-d-lg-block upm-pointer upm-mr-xs-5 upm-logo">
                <img alt="" src={require('assets/images/UptimePM-Logo-Light.svg')} />
              </Link>

              <div className="upm-header-horizontal-nav upm-header-horizontal-nav-curve upm-d-none upm-d-lg-block">
                <HorizontalNav />
              </div>
              <ul className="upm-header-notifications upm-ml-auto">
                <li className="upm-notify upm-notify-search">
                  <Popover
                    overlayClassName="upm-popover-horizontal"
                    placement="bottomRight"
                    content={
                      <div className="upm-d-flex">
                        <Dropdown overlay={menu}>
                          <Button>
                            Category <Icon type="down" />
                          </Button>
                        </Dropdown>
                        <SearchBox
                          styleName="upm-popover-search-bar"
                          placeholder="Search in app..."
                          onChange={this.updateSearchChatUser.bind(this)}
                          value={this.state.searchText}
                        />
                      </div>
                    }
                    trigger="click"
                  >
                    <span className="upm-pointer upm-d-block">
                      <i className="icon icon-search-new" />
                    </span>
                  </Popover>
                </li>

                <li className="upm-notify">
                  <Popover overlayClassName="upm-popover-horizontal" placement="bottomRight" content={<AppNotification />} trigger="click">
                    <span className="upm-pointer upm-d-block">
                      <i className="icon icon-notification" />
                    </span>
                  </Popover>
                </li>

                <li className="upm-msg">
                  <Popover overlayClassName="upm-popover-horizontal" placement="bottomRight" content={<MailNotification />} trigger="click">
                    <span className="upm-pointer upm-status-pos upm-d-block">
                      <i className="icon icon-chat-new" />
                      <span className="upm-status upm-status-rtl upm-small upm-orange" />
                    </span>
                  </Popover>
                </li>
                <li className="upm-language">
                  <Popover overlayClassName="upm-popover-horizontal" placement="bottomRight" content={this.languageMenu()} trigger="click">
                    <span className="upm-pointer upm-flex-row upm-align-items-center">
                      <i className={`flag flag-24 flag-${locale.icon}`} />
                    </span>
                  </Popover>
                </li>
                <li className="upm-user-nav">
                  <UserInfo />
                </li>
              </ul>
            </div>
          </div>
        </Header>
      </div>
    );
  }
}

export default withSettingsContext(InsideHeader);
