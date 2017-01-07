import React, { lazy } from 'react';
import { RouteComponentProps, Switch, Route } from 'react-router';
import LazyComponent from 'components/LazyComponent';

const InspectionTemplates = ({ match }: RouteComponentProps<any>) => {
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={LazyComponent(lazy(() => import('./InspectionTemplateList')))} />
      <Route path={`${match.url}/add`} exact component={LazyComponent(lazy(() => import('components/InspectionTemplatesForm')))} />
      <Route path={`${match.url}/:id([0-9]+-[A-Z])`} exact component={LazyComponent(lazy(() => import('components/InspectionTemplatesForm')))} />
    </Switch>
  );
};

export default InspectionTemplates;
