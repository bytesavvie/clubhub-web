import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';
import { Provider as StyletronProvider } from 'styletron-react';

import { styletron } from '../styletron';

// eslint-disable-next-line functional/no-class
class MyDocument extends Document {
  static getInitialProps({ renderPage }) {
    const page = renderPage((App) => (props) => (
      <StyletronProvider value={styletron}>
        <App {...props} />
      </StyletronProvider>
    ));
    const stylesheets = styletron.getStylesheets() || [];

    return { ...page, stylesheets };
  }

  render() {
    // eslint-disable-next-line functional/no-this-expression
    const { stylesheets } = this.props;

    return (
      <Html>
        <Head>
          {stylesheets.map((sheet, i) => (
            <style
              // eslint-disable-next-line react/no-array-index-key
              key={i}
              className="_styletron_hydrate_"
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={{ __html: sheet.css }}
              media={sheet.attrs.media}
              data-hydrate={sheet.attrs['data-hydrate']}
            />
          ))}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
