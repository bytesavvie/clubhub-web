import { LightTheme, BaseProvider } from 'baseui';
import React from 'react';
import { Provider as StyletronProvider } from 'styletron-react';

import { styletron, debug } from '../styletron';

const MyApp = ({ Component, pageProps }) => (
  <StyletronProvider debugAfterHydration value={styletron} debug={debug}>
    <BaseProvider theme={LightTheme}>
      <Component {...pageProps} />
    </BaseProvider>
  </StyletronProvider>
);

export default MyApp;
