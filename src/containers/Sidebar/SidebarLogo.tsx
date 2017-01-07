import React from 'react';
import { Link } from 'react-router-dom';

import { NAV_STYLE_DRAWER, NAV_STYLE_FIXED, NAV_STYLE_MINI_SIDEBAR, NAV_STYLE_NO_HEADER_MINI_SIDEBAR, TAB_SIZE, THEME_TYPE_LITE } from 'constants/ThemeSetting';
import withSettingsContext, { ISettingsContext } from 'contexts/SettingsContext';

class SidebarLogo extends React.Component<ISettingsContext> {
  render() {
    const {
      values: { width, themeType, navCollapsed },
    } = this.props;
    let {
      values: { navStyle },
    } = this.props;
    if (width < TAB_SIZE && navStyle === NAV_STYLE_FIXED) {
      navStyle = NAV_STYLE_DRAWER;
    }
    return (
      <div className="upm-layout-sider-header">
        {navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR ? (
          <div className="upm-linebar">
            <i
              className={`upm-icon-btn icon icon-${navStyle === NAV_STYLE_MINI_SIDEBAR ? 'menu-unfold' : 'menu-fold'} ${
                themeType !== THEME_TYPE_LITE ? 'upm-text-white' : ''
              }`}
              onClick={() => {
                if (navStyle === NAV_STYLE_DRAWER) {
                  this.props.toggleCollapsedSideNav(!navCollapsed);
                } else if (navStyle === NAV_STYLE_FIXED) {
                  this.props.onNavStyleChange(NAV_STYLE_MINI_SIDEBAR);
                } else if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
                  this.props.toggleCollapsedSideNav(!navCollapsed);
                } else {
                  this.props.onNavStyleChange(NAV_STYLE_FIXED);
                }
              }}
            />
          </div>
        ) : null}

        <Link to="/" className="upm-site-logo">
          {navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR && width >= TAB_SIZE ? (
            <img alt="" src={require('assets/images/UptimePM-Logo-Dark.svg')} />
          ) : themeType === THEME_TYPE_LITE ? (
            <img alt="" src={require('assets/images/UptimePM-Logo-Dark.svg')} />
          ) : (
            <img alt="" src={require('assets/images/UptimePM-Logo-Dark.svg')} style={{ maxWidth: width < TAB_SIZE ? '80%' : '100%', marginTop: width < TAB_SIZE ? 15 : 0 }} />
          )}
        </Link>
      </div>
    );
  }
}

export default withSettingsContext(SidebarLogo);
