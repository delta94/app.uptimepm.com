import React, { lazy } from 'react';
import { RouteComponentProps, Switch, Route } from 'react-router';
import LazyComponent from 'components/LazyComponent';

const InspectionHistory = ({ match }: RouteComponentProps<any>) => {
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={LazyComponent(lazy(() => import('./InspectionList')))} />
      <Route path={`${match.url}/filter/Equipment/:id([0-9]+-[A-Z])`} exact component={LazyComponent(lazy(() => import('components/InspectionsFilter')))} />
      <Route path={`${match.url}/add`} exact component={LazyComponent(lazy(() => import('components/InspectionHistoryForm')))} />
      <Route path={`${match.url}/:id([0-9]+-[A-Z])`} exact component={LazyComponent(lazy(() => import('components/InspectionHistoryForm')))} />
    </Switch>
  );
};

export default InspectionHistory;
