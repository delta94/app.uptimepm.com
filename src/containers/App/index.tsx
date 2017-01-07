import React from 'react';
import URLSearchParams from '@ungap/url-search-params';
import { Redirect, Route, Switch, RouteComponentProps } from 'react-router-dom';
import { LocaleProvider } from 'antd';
import { IntlProvider } from 'react-intl';

import AppLocale from '../../lngProvider/index';
import MainApp from './MainApp';
import SignIn from 'routes/public/Signin/SignIn';
import ForgotPassword from 'routes/public/ForgotPassword/ForgotPassword';
import ResetPassword from 'routes/public/ForgotPassword/ResetPassword';
import SignUp from 'routes/public/SignUp/SignUp';
import Privacy from 'routes/public/Privacy';
import Eula from 'routes/public/Eula';
import PrivacyMobile from 'routes/public/PrivacyMobile';

import Terms from 'routes/public/Terms';
import withSettingsContext, { ISettingsContext } from 'contexts/SettingsContext';
import { CurrentUserContext } from 'contexts/CurrentUserContext';

import {
  LAYOUT_TYPE_BOXED,
  LAYOUT_TYPE_FRAMED,
  LAYOUT_TYPE_FULL,
  NAV_STYLE_ABOVE_HEADER,
  NAV_STYLE_BELOW_HEADER,
  NAV_STYLE_DARK_HORIZONTAL,
  NAV_STYLE_DEFAULT_HORIZONTAL,
  NAV_STYLE_INSIDE_HEADER_HORIZONTAL,
} from 'constants/ThemeSetting';

const RestrictedRoute = ({ component: Component, authUser, ...rest }: any) => {
  // console.log('Restricted routes');
  const user = React.useContext(CurrentUserContext);

  return (
    <Route
      {...rest}
      render={props => {
        // const returnComp = user.isLoggedIn ? (
        //   <Component {...props} />
        // ) : (
        //   <Redirect
        //     to={{
        //       pathname: '/signin',
        //       state: { from: props.location },
        //     }}
        //   />
        // );
        let returnComp;
        if (user.isLoggedIn) {
          returnComp = <Component {...props} />;
        } else {
          // console.log('REdirect!');

          returnComp = (
            <Redirect
              to={{
                pathname: '/signin',
                state: { from: props.location },
              }}
            />
          );
        }

        return returnComp;
      }}
    />
  );
};

interface AppProps extends RouteComponentProps<any>, ISettingsContext {
  authUser: any;
  initURL: any;
  setInitUrl: any;
}

class App extends React.Component<AppProps, {}> {
  setLayoutType = (layoutType: string) => {
    if (layoutType === LAYOUT_TYPE_FULL) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('full-layout');
    } else if (layoutType === LAYOUT_TYPE_BOXED) {
      document.body.classList.remove('full-layout');
      document.body.classList.remove('framed-layout');
      document.body.classList.add('boxed-layout');
    } else if (layoutType === LAYOUT_TYPE_FRAMED) {
      document.body.classList.remove('boxed-layout');
      document.body.classList.remove('full-layout');
      document.body.classList.add('framed-layout');
    }
  };

  setNavStyle = (navStyle: string) => {
    if (
      navStyle === NAV_STYLE_DEFAULT_HORIZONTAL ||
      navStyle === NAV_STYLE_DARK_HORIZONTAL ||
      navStyle === NAV_STYLE_INSIDE_HEADER_HORIZONTAL ||
      navStyle === NAV_STYLE_ABOVE_HEADER ||
      navStyle === NAV_STYLE_BELOW_HEADER
    ) {
      document.body.classList.add('full-scroll');
      document.body.classList.add('horizontal-layout');
    } else {
      document.body.classList.remove('full-scroll');
      document.body.classList.remove('horizontal-layout');
    }
  };

  componentWillMount() {
    if (this.props.initURL === '') {
      this.props.setInitUrl(this.props.history.location.pathname);
    }
    const params = new URLSearchParams(this.props.location.search);

    if (params.has('theme')) {
      this.props.setThemeType(params.get('theme') as string);
    }
    if (params.has('nav-style')) {
      this.props.onNavStyleChange(params.get('nav-style') as string);
    }
    if (params.has('layout-type')) {
      this.props.onLayoutTypeChange(params.get('layout-type') as string);
    }
  }

  render() {
    const {
      match,
      location,
      values: { layoutType, navStyle, locale },
      authUser,
      // initURL,
    } = this.props;

    if (location.pathname === '/') {
      // if (authUser === null) {
      //   return <Redirect to={'/signin'} />;
      // } else if (initURL === '' || initURL === '/' || initURL === '/signin' || initURL === undefined) {
      return <Redirect to={'/corporate'} />;
      // } else {
      //   return <Redirect to={initURL} />;
      // }
    }
    this.setLayoutType(layoutType);

    this.setNavStyle(navStyle);

    const currentAppLocale = AppLocale[locale.locale];
    return (
      <LocaleProvider locale={currentAppLocale.antd}>
        <IntlProvider locale={currentAppLocale.locale} messages={currentAppLocale.messages}>
          <Switch>
            <Route exact path="/signin" component={SignIn} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/forgot-password" component={ForgotPassword} />
            <Route exact path="/reset-password/:token" component={ResetPassword} />
            <Route exact path="/terms" component={Terms} />
            <Route exact path="/privacy" component={Privacy} />
            <Route exact path="/eula" component={Eula} />
            <Route exact path="/privacyMobile" component={PrivacyMobile} />
            <RestrictedRoute path={`${match.url}`} authUser={authUser} component={MainApp} />
          </Switch>
        </IntlProvider>
      </LocaleProvider>
    );
  }
}

export default withSettingsContext(App);
