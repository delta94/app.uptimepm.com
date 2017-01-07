import React, { lazy } from 'react';
import { Redirect, Switch, Route } from 'react-router-dom';
import LazyComponent from 'components/LazyComponent';
import PrivateRoute from 'components/Routes/PrivateRoute';
import { RoleTypeEnum } from 'generated/index';

const Corporate = ({ match }: { match: any }) => (
  <Switch>
    {/* {console.log('Corporate match.url=', match)} */}
    <PrivateRoute
      path={`${match.url}/equipment`}
      component={LazyComponent(lazy(() => import('./equipment')))}
      roleType={RoleTypeEnum.Corporate}
      roles={['Administrator', 'Corporate']}
      permissions={['Equipment']}
      privilege={'View'}
    />
    <Route path={`${match.url}/my-account`} exact component={LazyComponent(lazy(() => import('components/MyAccountForm')))} />
    <PrivateRoute
      path={`${match.url}/jobs`}
      component={LazyComponent(lazy(() => import('./jobs')))}
      roleType={RoleTypeEnum.Corporate}
      roles={['Administrator', 'Corporate']}
      permissions={['Jobs']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/notifications`}
      component={LazyComponent(lazy(() => import('./notifications')))}
      roleType={RoleTypeEnum.Corporate}
      roles={['Administrator', 'Notifications']}
      permissions={['Notifications']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/clients`}
      component={LazyComponent(lazy(() => import('./clients')))}
      roleType={RoleTypeEnum.Corporate}
      roles={['Administrator', 'Corporate']}
      permissions={['Clients']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/office-locations`}
      component={LazyComponent(lazy(() => import('./office-locations')))}
      roleType={RoleTypeEnum.Corporate}
      roles={['Administrator', 'Corporate']}
      permissions={['Office Locations']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/fluid-reports`}
      component={LazyComponent(lazy(() => import('./fluid-reports')))}
      roleType={RoleTypeEnum.Corporate}
      roles={['Administrator', 'Corporate']}
      permissions={['Fluid Reports']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/users`}
      component={LazyComponent(lazy(() => import('./users')))}
      roleType={RoleTypeEnum.Corporate}
      roles={['Administrator', 'Corporate']}
      permissions={['Users']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/dealers`}
      component={LazyComponent(lazy(() => import('./dealers')))}
      roleType={RoleTypeEnum.Corporate}
      roles={['Administrator', 'Corporate']}
      permissions={['Dealers']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/inspection-templates`}
      component={LazyComponent(lazy(() => import('./inspection-templates')))}
      roleType={RoleTypeEnum.Corporate}
      roles={['Administrator', 'Corporate']}
      permissions={['Inspection Templates']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/inspection-history`}
      component={LazyComponent(lazy(() => import('./inspection-history')))}
      roleType={RoleTypeEnum.Corporate}
      roles={['Administrator', 'Corporate']}
      permissions={['Inspection History']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/work-orders`}
      component={LazyComponent(lazy(() => import('./work-orders')))}
      roleType={RoleTypeEnum.Corporate}
      roles={['Administrator', 'Corporate']}
      permissions={['Work Orders']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/roles`}
      component={LazyComponent(lazy(() => import('./roles')))}
      roleType={RoleTypeEnum.Corporate}
      roles={['Administrator', 'Corporate']}
      permissions={['Roles']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/role-permissions`}
      component={LazyComponent(lazy(() => import('./role-permissions')))}
      roleType={RoleTypeEnum.Corporate}
      roles={['Administrator', 'Corporate']}
      permissions={['Role Permissions']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/makes`}
      component={LazyComponent(lazy(() => import('./makes')))}
      roleType={RoleTypeEnum.Corporate}
      roles={['Administrator', 'Corporate']}
      permissions={['Makes']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/payment-plans`}
      component={LazyComponent(lazy(() => import('./payment-plans')))}
      roleType={RoleTypeEnum.Corporate}
      roles={['Administrator', 'Corporate']}
      permissions={['Makes']}
      privilege={'View'}
    />
    <PrivateRoute
      path={`${match.url}/service-intervals`}
      component={LazyComponent(lazy(() => import('./service-intervals')))}
      roleType={RoleTypeEnum.Corporate}
      roles={['Administrator']}
      permissions={['Service Intervals']}
      privilege={'View'}
    />
    <Redirect exact from={`${match.url}/`} to={`${match.url}/clients`} />
  </Switch>
);

export default Corporate;
