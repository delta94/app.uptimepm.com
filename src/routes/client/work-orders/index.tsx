import React, { lazy } from 'react';
import { RouteComponentProps, Switch, Route } from 'react-router';
import LazyComponent from 'components/LazyComponent';

const WorkOrders = ({ match }: RouteComponentProps<any>) => {
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={LazyComponent(lazy(() => import('./WorkOrderList')))} />
      <Route path={`${match.url}/add`} exact component={LazyComponent(lazy(() => import('components/WorkOrdersForm')))} />
      <Route path={`${match.url}/:id([0-9]+-[A-Z])`} exact component={LazyComponent(lazy(() => import('components/WorkOrdersForm')))} />
    </Switch>
  );
};

export default WorkOrders;
