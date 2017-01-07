import React from 'react';
import { Drawer, Layout } from 'antd';

import withSettingsContext, { ISettingsContext } from 'contexts/SettingsContext';

import SidebarContent from './SidebarContent';
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
  THEME_TYPE_LITE,
} from 'constants/ThemeSetting';

const { Sider } = Layout;

class Sidebar extends React.Component<ISettingsContext> {
  onToggleCollapsedNav = () => {
    this.props.toggleCollapsedSideNav(!this.props.values.navCollapsed);
  };

  componentDidMount() {
    window.addEventListener('resize', () => {
      this.props.updateWindowWidth(window.innerWidth);
    });
  }

  render() {
    const {
      values: { themeType, navCollapsed, width, navStyle },
    } = this.props;
    let drawerStyle = 'upm-collapsed-sidebar';

    if (navStyle === NAV_STYLE_FIXED) {
      drawerStyle = '';
    } else if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      drawerStyle = 'upm-mini-sidebar upm-mini-custom-sidebar';
    } else if (navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      drawerStyle = 'upm-custom-sidebar';
    } else if (navStyle === NAV_STYLE_MINI_SIDEBAR) {
      drawerStyle = 'upm-mini-sidebar upm-mini-sidebar-collapsed';
    } else if (navStyle === NAV_STYLE_DRAWER) {
      drawerStyle = 'upm-collapsed-sidebar';
    }
    if ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) && width < TAB_SIZE) {
      drawerStyle = 'upm-collapsed-sidebar';
    }
    return (
      <Sider
        className={`upm-app-sidebar ${drawerStyle} ${themeType !== THEME_TYPE_LITE ? 'upm-layout-sider-dark' : null}`}
        trigger={null}
        collapsed={width < TAB_SIZE ? false : navStyle === NAV_STYLE_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR}
        theme={themeType === THEME_TYPE_LITE ? 'light' : 'dark'}
        collapsible
      >
        {navStyle === NAV_STYLE_DRAWER || width < TAB_SIZE ? (
          <Drawer
            className={`upm-drawer-sidebar ${themeType !== THEME_TYPE_LITE ? 'upm-drawer-sidebar-dark' : null}`}
            placement="left"
            closable={false}
            onClose={() => this.onToggleCollapsedNav()}
            visible={!navCollapsed}
          >
            <SidebarContent />
          </Drawer>
        ) : (
          <SidebarContent />
        )}
      </Sider>
    );
  }
}

export default withSettingsContext(Sidebar);
