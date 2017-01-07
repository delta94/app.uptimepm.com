import React from 'react';
import { Route, Redirect, RouteComponentProps } from 'react-router-dom';
import { allowed } from './Access';
import { RoleTypeEnum, useMeQuery } from 'generated';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import LoadingSpinner from 'components/LoadingSpinner';
import { WithApolloClient } from 'react-apollo';

interface CorporateRouteProps extends WithApolloClient<RouteComponentProps<any>> {
  component: React.ComponentType;
  roles?: string[];
  roleType: RoleTypeEnum;
  permissions?: string[];
  privilege?: string;
  route?: string;
}

export const PrivateRoute = <P extends CorporateRouteProps>({ component: Component, route, client, roles, roleType, permissions, privilege, ...rest }: P & any) => {
  const userContext = React.useContext(CurrentUserContext);
  // const token = localStorage.getItem('token');
  const { loading, data, error } = useMeQuery({
    // context: {
    //   headers: {
    //     authorization: `Bearer ${token}`
    //   }
    // },
    fetchPolicy: 'network-only'
  });
  if (loading) return <LoadingSpinner tip="Loading Your details..." />;
  if (error) return <div className="error">Error while fetching user details </div>;
  const isAllowed = allowed(data!.me ? data!.me.user : undefined, roles, roleType, permissions, privilege);
  if (data && data.me && data.me.user && !isAllowed) {
    // debugger;
    return (
      <Route
        {...rest}
        render={props => (
          <Redirect
            to={{
              pathname: '/signin',
              state: { from: props.location }
            }}
          />
        )}
      />
    );
  } else {
    if (data && data.me && data.me.user) {
      userContext.user = data!.me.user;
    }
    return <Route {...rest} render={props => <Component {...props} />} />;
  }
};

export default PrivateRoute;
