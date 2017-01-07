import React, { lazy } from 'react';
import { RouteComponentProps, Switch } from 'react-router';
import LazyComponent from 'components/LazyComponent';
import PrivateRoute from 'components/Routes/PrivateRoute';
import { RoleTypeEnum } from 'generated/index';

const Users = ({ match }: RouteComponentProps<any>) => {
  return (
    <Switch>
      <PrivateRoute
        path={`${match.url}/`}
        exact
        component={LazyComponent(lazy(() => import('./UserList')))}
        roles={['Administrator']}
        roleType={RoleTypeEnum.Corporate}
        permissions={['Users']}
      />
      <PrivateRoute
        path={`${match.url}/add`}
        exact
        component={LazyComponent(lazy(() => import('components/UserForm')))}
        roles={['Administrator']}
        roleType={RoleTypeEnum.Corporate}
        permissions={['Users']}
        privilege={'Add'}
      />
      <PrivateRoute
        path={`${match.url}/:id([0-9]+-[A-Z])`}
        exact
        component={LazyComponent(lazy(() => import('components/UserForm')))}
        roles={['Administrator']}
        roleType={RoleTypeEnum.Corporate}
        permissions={['Users']}
        privilege={'Edit'}
      />
    </Switch>
  );
};

export default Users;
