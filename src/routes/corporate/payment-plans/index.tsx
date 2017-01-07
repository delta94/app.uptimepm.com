import React, { lazy } from 'react';
import { RouteComponentProps, Switch } from 'react-router';
import LazyComponent from 'components/LazyComponent';
import PrivateRoute from 'components/Routes/PrivateRoute';
import { RoleTypeEnum } from 'generated';

const Equipment = ({ match }: RouteComponentProps<any>) => {
  return (
    <Switch>
      <PrivateRoute
        path={`${match.url}/`}
        exact
        component={LazyComponent(lazy(() => import('./PaymentList')))}
        roles={['Administrator']}
        roleType={RoleTypeEnum.Corporate}
        permissions={['Makes']}
        privilege={'View'}
      />
      <PrivateRoute
        path={`${match.url}/add`}
        exact
        component={LazyComponent(lazy(() => import('./form')))}
        roles={['Administrator']}
        roleType={RoleTypeEnum.Corporate}
        permissions={['Makes']}
        privilege={'Add'}
      />
      <PrivateRoute
        path={`${match.url}/:id([0-9]+-[A-Z])`}
        exact
        component={LazyComponent(lazy(() => import('./form')))}
        roles={['Administrator']}
        roleType={RoleTypeEnum.Corporate}
        permissions={['Makes']}
        privilege={'Edit'}
      />
    </Switch>
  );
};

export default Equipment;
