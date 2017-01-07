import React from 'react';
import { Router as BrowserRouter } from 'react-router';
import { Route, Switch } from 'react-router-dom';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { HttpLink } from 'apollo-link-http';
// import { createBrowserHistory } from 'history';
import { createBrowserHistory } from 'history';
import { ApolloProvider } from 'react-apollo';
import { I18nProvider } from '@lingui/react';
import { message as antdMessage } from 'antd';
// import { history } from 'history';

import './assets/vendors/style';
import './styles/wieldy.less';
import App from 'containers/App';
import { SettingsProvider } from 'contexts/SettingsContext';
import { CurrentUserProvider } from 'contexts/CurrentUserContext';

const catalogsEn = require('./locales/en/messages.js');
const catalogsEs = require('./locales/es/messages.js');
const catalogs = { en: catalogsEn, es: catalogsEs };

const history = createBrowserHistory();

const authMiddleware = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token');
  if (token) {
    operation.setContext({
      headers: {
        authorization: `Bearer ${token}`
      }
    });
  }
  // tslint:disable-next-line:no-null-keyword
  return forward ? forward(operation) : null;
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onError(({ graphQLErrors, networkError }) => {
      if (graphQLErrors)
        graphQLErrors.map(({ message, locations, path }) => {
          // if (module.hot && path && path[0] !== 'signin') {
          //   antdMessage.error(message);
          // }

          // console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
          if (message === 'Not Logged In') {
            // console.log(`[GraphQL error]: NOT Logged In`);
            history.push('/signin');
          } else {
            antdMessage.error(message);
            // console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`);
          }
          return null;
        });
      if (networkError) console.log(`[Network error]: ${networkError}`);
    }),
    authMiddleware,
    new HttpLink({
      uri: process.env.REACT_APP_GRAPHQL_SERVER,
      credentials: 'same-origin'
    })
  ]),
  cache: new InMemoryCache()
});

const NextApp = () => (
  <ApolloProvider client={client}>
    <I18nProvider language="en" catalogs={catalogs}>
      <BrowserRouter history={history}>
        <CurrentUserProvider>
          <SettingsProvider>
            <Switch>
              <Route path="/" component={App} />
            </Switch>
          </SettingsProvider>
        </CurrentUserProvider>
      </BrowserRouter>
    </I18nProvider>
  </ApolloProvider>
);

export default NextApp;
