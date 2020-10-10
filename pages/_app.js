import { ApolloProvider } from '@apollo/client';
import { LightTheme, BaseProvider } from 'baseui';
import React from 'react';
import { Provider as StyletronProvider } from 'styletron-react';

import { styletron, debug } from '../styletron';
import Layout from '../components/layout';
import { useApollo } from '../utilities/apollo-client';

// eslint-disable-next-line import/no-unassigned-import
import '../css/global.css';

const MyApp = ({ Component, pageProps }) => {
  const client = useApollo(pageProps.initialApolloState);

  return (
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
};

export default MyApp;
