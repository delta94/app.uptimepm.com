import React, { lazy } from 'react';
import { RouteComponentProps, Switch } from 'react-router';
import LazyComponent from 'components/LazyComponent';
import PrivateRoute from 'components/Routes/PrivateRoute';
import { RoleTypeEnum } from 'generated';

const ServiceIntervals = ({ match }: RouteComponentProps<any>) => {
  return (
    <Switch>
      <PrivateRoute
        path={`${match.url}/`}
        exact
        component={LazyComponent(lazy(() => import('./ServiceIntervalList')))}
        roles={['Administrator']}
        roleType={RoleTypeEnum.Client}
        permissions={['Service Intervals']}
        privilege={'View'}
      />
      <PrivateRoute
        path={`${match.url}/add`}
        exact
        component={LazyComponent(lazy(() => import('components/ServiceIntervalForm')))}
        roles={['Administrator']}
        roleType={RoleTypeEnum.Client}
        permissions={['Service Intervals']}
        privilege={'Add'}
      />
      <PrivateRoute
        path={`${match.url}/:id([0-9]+-[A-Z])`}
        exact
        component={LazyComponent(lazy(() => import('components/ServiceIntervalForm')))}
        roles={['Administrator']}
        roleType={RoleTypeEnum.Client}
        permissions={['Service Intervals']}
        privilege={'Edit'}
      />
    </Switch>
  );
};

export default ServiceIntervals;
