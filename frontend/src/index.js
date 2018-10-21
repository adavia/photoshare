import React from 'react';
import { render } from 'react-dom';
import {
  InMemoryCache,
  ApolloClient,
  split
} from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { createUploadLink } from 'apollo-upload-client';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { injectGlobal } from 'emotion';

import App from './components/App';
import * as serviceWorker from './serviceWorker';

const GRAPHQL_URI = 'http://localhost:4000/graphql';
const GRAPHQL_WS_URI = 'ws://localhost:4000/graphql';

const httpLink = createUploadLink({ 
  uri: GRAPHQL_URI,
  credentials: 'include'
});

const wsLink = new WebSocketLink({
  uri: GRAPHQL_WS_URI,
  options: { reconnect: true }
});

const link = split(
  ({ query }) => {
    const { kind, operation } = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({  
  link,
  cache: new InMemoryCache()
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

if (module.hot) {                                       
  module.hot.accept('./components/App', () => {                    
    const NextApp = require('./components/App').default;
    render(
      <ApolloProvider client={client}>
        <NextApp />
      </ApolloProvider>,
      document.getElementById('root')
    );
  });
}

injectGlobal`
  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'Raleway', sans-serif;
    min-height: 100%;
    margin: 0;
    padding: 0; 
  }
`

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
