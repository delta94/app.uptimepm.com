import React from 'react';
import { Layout } from 'antd';

import withSettingsContext, { ISettingsContext } from 'contexts/SettingsContext';
import Sidebar from '../Sidebar/index';
import HorizontalDefault from '../Topbar/HorizontalDefault/index';
import HorizontalDark from '../Topbar/HorizontalDark/index';
import InsideHeader from '../Topbar/InsideHeader/index';
import AboveHeader from '../Topbar/AboveHeader/index';
import BelowHeader from '../Topbar/BelowHeader/index';

import Topbar from '../Topbar/index';
import App from 'routes/index';
import Customizer from 'containers/Customizer';

import {
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
} from 'constants/ThemeSetting';
import NoHeaderNotification from '../Topbar/NoHeaderNotification/index';
import { RouteComponentProps, withRouter } from 'react-router';

const { Content } = Layout;

interface MainAppProps extends RouteComponentProps<any> {}

class MainApp extends React.Component<MainAppProps & ISettingsContext> {
  getContainerClass = (navStyle: string) => {
    switch (navStyle) {
      case NAV_STYLE_DARK_HORIZONTAL:
        return 'upm-container-wrap';
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return 'upm-container-wrap';
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return 'upm-container-wrap';
      case NAV_STYLE_BELOW_HEADER:
        return 'upm-container-wrap';
      case NAV_STYLE_ABOVE_HEADER:
        return 'upm-container-wrap';
      default:
        return '';
    }
  };
  getNavStyles = (navStyle: string) => {
    switch (navStyle) {
      case NAV_STYLE_DEFAULT_HORIZONTAL:
        return <HorizontalDefault />;
      case NAV_STYLE_DARK_HORIZONTAL:
        return <HorizontalDark />;
      case NAV_STYLE_INSIDE_HEADER_HORIZONTAL:
        return <InsideHeader />;
      case NAV_STYLE_ABOVE_HEADER:
        return <AboveHeader />;
      case NAV_STYLE_BELOW_HEADER:
        return <BelowHeader />;
      case NAV_STYLE_FIXED:
        return <Topbar />;
      case NAV_STYLE_DRAWER:
        return <Topbar />;
      case NAV_STYLE_MINI_SIDEBAR:
        return <Topbar />;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
        return <NoHeaderNotification />;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <NoHeaderNotification />;
      default:
        return null;
    }
  };

  getSidebar = (navStyle: string, width: number) => {
    if (width < TAB_SIZE) {
      return <Sidebar />;
    }
    switch (navStyle) {
      case NAV_STYLE_FIXED:
        return <Sidebar />;
      case NAV_STYLE_DRAWER:
        return <Sidebar />;
      case NAV_STYLE_MINI_SIDEBAR:
        return <Sidebar />;
      case NAV_STYLE_NO_HEADER_MINI_SIDEBAR:
        return <Sidebar />;
      case NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR:
        return <Sidebar />;
      default:
        return null;
    }
  };

  render() {
    const {
      match,
      values: { width, navStyle },
    } = this.props;
    // console.log('navStyle', navStyle);
    return (
      <Layout className="upm-app-layout">
        {this.getSidebar(navStyle, width)}
        <Layout>
          {this.getNavStyles(navStyle)}
          <Content className={`upm-layout-content ${this.getContainerClass(navStyle)} `}>
            <App match={match} />
            {/* <Footer>
              <div className="upm-layout-footer-content">Test</div>
            </Footer> */}
          </Content>
        </Layout>
        <Customizer />
      </Layout>
    );
  }
}

export default withRouter(withSettingsContext(MainApp));
