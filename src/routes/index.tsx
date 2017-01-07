import React from 'react';
import { Route, Switch } from 'react-router-dom';

import Corporate from './corporate';
import Client from './client';

// import Components from '../demo/routes/components/index';
// import CustomViews from '../demo/routes/customViews/index';
// import Extensions from '../demo/routes/extensions/index';
// import ExtraComponents from '../demo/routes/extraComponents/index';
// import InBuiltApps from '../demo/routes/inBuiltApps/index';
// import SocialApps from '../demo/routes/socialApps/index';
// import Main from '../demo/routes/main/index';
// import Documents from '../demo/routes/documents/index';

const App = ({ match }: { match: any }) => (
  <div className="upm-main-content-wrapper">
    <Switch>
      <Route path={`${match.url}corporate`} component={Corporate} />
      <Route path={`${match.url}client`} component={Client} />

      {/* <Route path={`${match.url}main`} component={Main} />

      <Route path={`${match.url}components`} component={Components} />
      <Route path={`${match.url}custom-views`} component={CustomViews} />
      <Route path={`${match.url}extensions`} component={Extensions} />
      <Route path={`${match.url}extra-components`} component={ExtraComponents} />
      <Route path={`${match.url}in-built-apps`} component={InBuiltApps} />
      <Route path={`${match.url}social-apps`} component={SocialApps} />
      <Route path={`${match.url}documents`} component={Documents} /> */}
    </Switch>
  </div>
);

export default App;
