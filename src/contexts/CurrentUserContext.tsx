import React, { Context } from 'react';
import { some } from 'lodash';
import { RouteComponentProps, withRouter } from 'react-router';
import { LoggedInUser, RoleTypeEnum } from 'generated/index';
import { withApollo, WithApolloClient } from 'react-apollo';
import { removeTypename } from 'helpers/utils';

export interface ICurrentUserContext {
  user: Partial<LoggedInUser>;
  client: any;
  setUser(user: Partial<LoggedInUser> | undefined): void;
  setNotificationCount(value: number): void;
  onLogin(user: Partial<LoggedInUser> | undefined, token?: string): void;
  onLogout(): void;
  isLoggedIn: boolean;
  notificationCount: number;
  clientUser: () => boolean;
  corporateUser: () => boolean;
}

export const CurrentUserContext: Context<ICurrentUserContext> = React.createContext<ICurrentUserContext>({} as any);
const { Provider, Consumer } = CurrentUserContext;

// export const withCurrentUserContext = (Component: React.ComponentType<any>) => {
//   return props => (
//     <CurrentUserContext.Consumer>
//       {state => {
//         return <Component {...props} user={state.currentUser} userContext={state} />;
//       }}
//     </CurrentUserContext.Consumer>
//   );
// };

// export default <P extends {}>(Component: React.ComponentClass<P & ICurrentUserContext> | React.StatelessComponent<P & ICurrentUserContext>): any => {
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
export function withUser<P extends ICurrentUserContext>(Component: React.ComponentType<P>) {
  // tslint:disable-next-line:only-arrow-functions
  return function ThemedComponent(props: Pick<P, Exclude<keyof P, keyof ICurrentUserContext>>) {
    return <Consumer>{context => <Component {...(props as P)} {...context} />}</Consumer>;
  };
}

class CurrentUserProvider extends React.Component<WithApolloClient<RouteComponentProps<any>>> {
  state = {
    currentUser: {} as LoggedInUser,
    isLoggedIn: localStorage.getItem('token') ? true : false,
    notificationCount: 0,
    // clientUser: false,
    // corporateUser: false,
  };

  componentDidMount() {
    const user = localStorage.getItem('user');
    if (user) {
      const usr = removeTypename(JSON.parse(user));
      // console.log(usr);
      this.setState({ currentUser: usr, notificationCount: usr.notificationCount });
      // console.log(this.state.notificationCount);
    }
  }

  handleLogin = (user: LoggedInUser, token?: string) => {
    localStorage.setItem('user', JSON.stringify(removeTypename(user)));
    localStorage.setItem('token', token ? token : '');
    this.setState({
      currentUser: removeTypename(user),
      isLoggedIn: true,
      notificationCount: user.notificationCount ? user.notificationCount : 0,
    });
  };

  setUser = (user: LoggedInUser) => {
    localStorage.setItem('user', JSON.stringify(removeTypename(user)));
    this.setState({
      currentUser: removeTypename(user),
      isLoggedIn: true,
    });
  };

  setNotificationCount = (value: number) => {
    this.setState({
      ...this.state,
      notificationCount: value,
    });
  };

  handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    this.props.client.clearStore().then(() => {
      this.props.client.resetStore();
      this.setState({ currentUser: undefined, isLoggedIn: false });
      this.props.history.push('/signin');
    });
  };

  clientUser = () => {
    return some(this.state.currentUser ? this.state.currentUser.roles : [], role => role.type === RoleTypeEnum.Client);
  };

  corporateUser = () => {
    return some(this.state.currentUser ? this.state.currentUser.roles : [], role => role.type === RoleTypeEnum.Corporate);
  };

  render() {
    return (
      <Provider
        value={{
          user: this.state.currentUser,
          client: this.props.client,
          setUser: this.setUser,
          onLogin: this.handleLogin,
          onLogout: this.handleLogout,
          isLoggedIn: this.state.isLoggedIn,
          clientUser: this.clientUser,
          corporateUser: this.corporateUser,
          notificationCount: this.state.notificationCount,
          setNotificationCount: this.setNotificationCount,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

const wrappedProvider = withRouter(withApollo<RouteComponentProps<any>>(CurrentUserProvider));

export { wrappedProvider as CurrentUserProvider, Consumer as CurrentUserConsumer };
