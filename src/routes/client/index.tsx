import React, { lazy } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import LazyComponent from 'components/LazyComponent';
import PrivateRoute from 'components/Routes/PrivateRoute';
import { RoleTypeEnum } from 'generated';

const Client = ({ match }: { match: any }) => (
  <Switch>
    {/* {console.log('Client match.url', match)} */}
    <PrivateRoute
      path={`${match.url}/dashboard`}
      component={LazyComponent(lazy(() => import('./dashboard')))}
      roleType={RoleTypeEnum.Client}
      roles={['Administrator', 'Client']}
      permissions={['Dashboard']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/equipment`}
      component={LazyComponent(lazy(() => import('./equipment')))}
      roleType={RoleTypeEnum.Client}
      roles={['Administrator', 'Client']}
      permissions={['Equipment']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/service-intervals`}
      component={LazyComponent(lazy(() => import('./service-intervals')))}
      roleType={RoleTypeEnum.Client}
      roles={['Administrator']}
      permissions={['Service Intervals']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/office-locations`}
      component={LazyComponent(lazy(() => import('./office-locations')))}
      roleType={RoleTypeEnum.Client}
      roles={['Administrator', 'Client']}
      permissions={['Office Locations']}
      privilege={'View'}
    />
     <PrivateRoute
      path={`${match.url}/notifications`}
      component={LazyComponent(lazy(() => import('./notifications')))}
      roleType={RoleTypeEnum.Client}
      roles={['Administrator', 'Client']}
      permissions={['Notifications']}
      privilege={'View'}
    />
    {/* <PrivateRoute
      path={`${match.url}/jobs`}
      component={LazyComponent(lazy(() => import('./jobs')))}
      roleType={RoleTypeEnum.Client}
      roles={['Administrator', 'Client']}
      permissions={['Jobs']}
      privilege={'View'}
    /> */}
    <PrivateRoute
      path={`${match.url}/makes`}
      component={LazyComponent(lazy(() => import('./makes')))}
      roleType={RoleTypeEnum.Client}
      roles={['Administrator', 'Client']}
      permissions={['Makes']}
      privilege={'View'}
    />
    <Route path={`${match.url}/my-account`} exact component={LazyComponent(lazy(() => import('components/MyAccountForm')))} />
    <PrivateRoute
      path={`${match.url}/users`}
      component={LazyComponent(lazy(() => import('./users')))}
      roleType={RoleTypeEnum.Client}
      roles={['Administrator', 'Client']}
      permissions={['Users']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/dealers`}
      component={LazyComponent(lazy(() => import('./dealers')))}
      roleType={RoleTypeEnum.Client}
      roles={['Administrator', 'Client']}
      permissions={['Dealers']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/fluid-reports`}
      component={LazyComponent(lazy(() => import('./fluid-reports')))}
      roleType={RoleTypeEnum.Client}
      roles={['Administrator', 'Client']}
      permissions={['Fluid Reports']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/inspection-templates`}
      component={LazyComponent(lazy(() => import('./inspection-templates')))}
      roleType={RoleTypeEnum.Client}
      roles={['Administrator', 'Client']}
      permissions={['Inspection Templates']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/inspection-history`}
      component={LazyComponent(lazy(() => import('./inspection-history')))}
      roles={['Administrator', 'Client']}
      roleType={RoleTypeEnum.Client}
      permissions={['Inspection History']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/work-orders`}
      component={LazyComponent(lazy(() => import('./work-orders')))}
      roleType={RoleTypeEnum.Client}
      roles={['Administrator', 'Client']}
      permissions={['Work Orders']}
      privilege={'View'}
    />

    <PrivateRoute
      path={`${match.url}/fluid-reports`}
      component={LazyComponent(lazy(() => import('./fluid-reports')))}
      roleType={RoleTypeEnum.Client}
      roles={['Administrator', 'Client']}
      permissions={['Fluid Reports']}
      privilege={'View'}
    />

    <PrivateRoute
      path={`${match.url}/service-intervals`}
      component={LazyComponent(lazy(() => import('./service-intervals')))}
      roleType={RoleTypeEnum.Client}
      roles={['Administrator']}
      permissions={['Service Intervals']}
      privilege={'View'}
    />
    <Redirect exact from={`${match.url}/`} to={`${match.url}/clients`} />
  </Switch>
);

export default Client;
