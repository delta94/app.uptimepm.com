import React, { Context } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import { NAV_STYLE_FIXED, LAYOUT_TYPE_FULL, THEME_TYPE_SEMI_DARK, THEME_COLOR_SELECTION_PRESET } from 'constants/ThemeSetting';

interface SettingsProviderState {
  values: ISettingsState;
}

export interface ILocale {
  languageId: string;
  locale: string;
  name: string;
  icon: string;
}

export interface ISettingsState {
  navCollapsed: boolean;
  navStyle: string;
  layoutType: string;
  themeType: string;
  colorSelection: string;

  pathname: string;
  width: number;
  isDirectionRTL: boolean;
  locale: ILocale;
}

export interface ISettingsContext {
  values: ISettingsState;
  toggleCollapsedSideNav(navCollapsed: boolean): void;
  updateWindowWidth(width: number): void;
  setThemeType(themeType: string): void;
  setThemeColorSelection(colorSelection: string): void;
  onNavStyleChange(navStyle: string): void;
  onLayoutTypeChange(layoutType: string): void;
  switchLanguage(locale: ILocale): void;
}

const SettingsContext: Context<ISettingsContext> = React.createContext<ISettingsContext>({} as any);
const { Provider, Consumer } = SettingsContext;

// tslint:disable-next-line:only-arrow-functions
// export function withStoreContext<C extends ISettingsContext>(Component: React.ComponentType<C>): React.ComponentType<C & ISettingsContext> {
//   return (((props: any) => (
//     <SettingsContext.Consumer>{context => <Component {...props} {...context} />}</SettingsContext.Consumer>
//   )) as any) as React.ComponentType<C & ISettingsContext>;
// }

// tslint:disable-next-line:only-arrow-functions
export function withSettingContext<C extends React.ComponentClass>(Component: C): C {
  return (((props: any) => <Consumer>{context => <Component {...props} context={context} />}</Consumer>) as any) as C;
}

// tslint:disable-next-line:only-arrow-functions
export default <P extends {}>(Component: React.ComponentType<P & ISettingsContext>): any => {
  class WrappedComponent extends React.Component<P & ISettingsContext> {
    render(): React.ReactNode {
      return (
        <Consumer>
          {context => {
            return <Component {...this.props} {...context} />;
          }}
        </Consumer>
      );
    }
  }
  return WrappedComponent;
};

// export default <P extends {}>(
//   Component: React.ComponentClass<P & ICurrentUserContext> | React.StatelessComponent<P & ICurrentUserContext>
// ): any => {
//   class WrappedComponent extends React.Component<P & ICurrentUserContext> {
//     render() {
//       return (
//         <Consumer>
//           {context => {
//             return <Component {...this.props} {...context} />;
//           }}
//         </Consumer>
//       );
//     }
//   }
//   return WrappedComponent;
// };

// tslint:disable-next-line:only-arrow-functions
export function withSettings<P extends {}>(Component: React.ComponentType<P>) {
  // tslint:disable-next-line:only-arrow-functions
  return function SettingsComponent(props: Pick<P, Exclude<keyof P, keyof ISettingsContext>>) {
    return <Consumer>{context => <Component {...props as P} {...context} />}</Consumer>;
  };
}

class SettingsProvider extends React.Component<RouteComponentProps<any>, SettingsProviderState> {
  state: SettingsProviderState = {
    values: {
      navCollapsed: true,
      layoutType: localStorage.getItem('app.layout') || NAV_STYLE_FIXED,
      navStyle: localStorage.getItem('app.nav') || LAYOUT_TYPE_FULL,
      themeType: localStorage.getItem('app.theme') || THEME_TYPE_SEMI_DARK,
      colorSelection: THEME_COLOR_SELECTION_PRESET,

      pathname: this.props.location.pathname,
      width: window.innerWidth,
      isDirectionRTL: false,
      locale: {
        languageId: 'english',
        locale: 'en',
        name: 'English',
        icon: 'us',
      },
    },
  };

  toggleCollapsedSideNav = (navCollapsed: boolean) => {
    this.setState(prevState => ({
      values: { ...prevState.values, navCollapsed },
    }));
  };

  updateWindowWidth = (width: number) => {
    this.setState(prevState => ({
      values: { ...prevState.values, width },
    }));
  };

  setThemeType = (themeType: string) => {
    this.setState(prevState => ({
      values: { ...prevState.values, themeType },
    }));
  };

  setThemeColorSelection = (colorSelection: string) => {
    this.setState(prevState => ({
      values: { ...prevState.values, colorSelection },
    }));
  };

  onNavStyleChange = (navStyle: string) => {
    this.setState(prevState => ({
      values: { ...prevState.values, navStyle },
    }));
  };

  onLayoutTypeChange = (layoutType: string) => {
    this.setState(prevState => ({
      values: { ...prevState.values, layoutType },
    }));
  };

  switchLanguage = (locale: ILocale) => {
    this.setState(prevState => ({
      values: { ...prevState.values, locale },
    }));
  };

  componentDidMount() {
    // const layoutType = localStorage.getItem('app.layout') || NAV_STYLE_FIXED;
    // const navStyle = localStorage.getItem('app.nav') || LAYOUT_TYPE_FULL;
    // const themeType = localStorage.getItem('app.theme') || THEME_TYPE_SEMI_DARK;
    // this.setState({
    //   ...this.state,
    //   values: {
    //     ...this.state.values,
    //     navStyle,
    //     layoutType,
    //     themeType,
    //     pathname: this.props.location.pathname,
    //   },
    // });
  }

  componentWillReceiveProps(newProps: RouteComponentProps<any>) {
    if (newProps.location.pathname !== this.state.values.pathname) {
      this.setState(
        prevState => ({
          values: {
            ...prevState.values,
            pathname: newProps.location.pathname,
            navCollapsed: true,
          },
        }),
        () => {
          window.scrollTo(0, 0);
        }
      );
    }
  }

  openSiteSettings = (): any => {
    return undefined;
  };

  render(): any {
    return (
      <Provider
        value={{
          values: this.state.values,
          toggleCollapsedSideNav: this.toggleCollapsedSideNav,
          updateWindowWidth: this.updateWindowWidth,
          setThemeType: this.setThemeType,
          setThemeColorSelection: this.setThemeColorSelection,
          onNavStyleChange: this.onNavStyleChange,
          onLayoutTypeChange: this.onLayoutTypeChange,
          switchLanguage: this.switchLanguage,
        }}
      >
        <>{this.props.children}</>
      </Provider>
    );
  }
}

const WrapperSettingsProvider = withRouter(SettingsProvider);

export { WrapperSettingsProvider as SettingsProvider, Consumer as SettingsConsumer, SettingsContext };
