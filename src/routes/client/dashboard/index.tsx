import React, { lazy } from 'react';
import { RouteComponentProps, Switch, Route } from 'react-router';
import LazyComponent from 'components/LazyComponent';

const Equipment = ({ match }: RouteComponentProps<any>) => {
  return (
    <Switch>
      <Route path={`${match.url}/`} exact component={LazyComponent(lazy(() => import('./Dashboard')))} />
    </Switch>
  );
};

export default Equipment;
