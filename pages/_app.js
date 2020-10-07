import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { LightTheme, BaseProvider } from 'baseui';
import React from 'react';
import { Provider as StyletronProvider } from 'styletron-react';

import { styletron, debug } from '../styletron';
import Layout from '../components/layout';

// eslint-disable-next-line import/no-unassigned-import
import '../css/global.css';

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache(),
});

const MyApp = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <StyletronProvider debugAfterHydration value={styletron} debug={debug}>
      <BaseProvider theme={LightTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </BaseProvider>
    </StyletronProvider>
  </ApolloProvider>
);

export default MyApp;
