import { LightTheme, BaseProvider } from 'baseui';
import React from 'react';
import { Provider as StyletronProvider } from 'styletron-react';

import { styletron, debug } from '../styletron';
import Layout from '../components/layout';

// eslint-disable-next-line import/no-unassigned-import
import '../css/global.css';

const MyApp = ({ Component, pageProps }) => (
  <StyletronProvider debugAfterHydration value={styletron} debug={debug}>
    <BaseProvider theme={LightTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </BaseProvider>
  </StyletronProvider>
);

export default MyApp;
