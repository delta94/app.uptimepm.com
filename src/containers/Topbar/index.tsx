import React from 'react';
import { Layout, Popover } from 'antd';
import { Link } from 'react-router-dom';

import languageData from './languageData';
import UserInfo from '../../components/UserInfo';

import { NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, TAB_SIZE } from 'constants/ThemeSetting';
import withSettingsContext, { ISettingsContext } from 'contexts/SettingsContext';

const { Header } = Layout;

interface TopBarState {
  searchText: string;
}

class TopBar extends React.Component<ISettingsContext, TopBarState> {
  state = {
    searchText: '',
  };

  languageMenu = () => (
    <ul className="upm-sub-popover" style={{ margin: '5px 0' }}>
      {languageData.map(language => (
        <li
          className="upm-media upm-pointer"
          style={{ width: '100%', minWidth: 125, textAlign: 'center', padding: 10 }}
          key={JSON.stringify(language)}
          onClick={(e: any) => this.props.switchLanguage(language)}
        >
          <i className={`flag flag-24 upm-mr-2 flag-${language.icon}`} />
          <span className="upm-language-text" style={{ position: 'relative', top: 3 }}>
            {language.name}
          </span>
        </li>
      ))}
    </ul>
  );

  updateSearchChatUser = (evt: any) => {
    this.setState({
      searchText: evt.target.value,
    });
  };

  render() {
    const {
      values: { locale, width, navCollapsed, navStyle },
    } = this.props;
    return (
      <>
        {width <= TAB_SIZE ? (
          <Header>
            {navStyle === NAV_STYLE_DRAWER || ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR) && width < TAB_SIZE) ? (
              <div className="upm-linebar upm-mr-1">
                <i
                  className="upm-icon-btn icon icon-menu"
                  onClick={() => {
                    this.props.toggleCollapsedSideNav(!navCollapsed);
                  }}
                />
              </div>
            ) : null}
            <Link to="/" className="upm-d-block upm-d-lg-none upm-pointer" style={{ width: 150 }}>
              <img alt="" src={require('../../assets/images/UptimePM-Logo-White-Dark.svg')} />
            </Link>

            <ul className="upm-header-notifications upm-ml-auto">
              <li className="upm-language">
                <Popover overlayClassName="upm-popover-horizontal" placement="bottomRight" content={this.languageMenu()} trigger="click">
                  <span className="upm-pointer upm-flex-row upm-align-items-center">
                    <i className={`flag flag-24 flag-${locale.icon}`} />
                    <span className="upm-pl-2 upm-language-name">{locale.name}</span>
                    <i className="icon icon-chevron-down upm-pl-2" />
                  </span>
                </Popover>
              </li>
              {width >= TAB_SIZE ? null : (
                <>
                  <li className="upm-user-nav">
                    <UserInfo />
                  </li>
                </>
              )}
            </ul>
          </Header>
        ) : null}
      </>
    );
  }
}

export default withSettingsContext(TopBar);
