import { createGetInitialProps } from '@mantine/next';
import Document, { Head, Html, Main, NextScript } from 'next/document';

const getInitialProps = createGetInitialProps();

/* tslint:disable-next-line */
export default class _Document extends Document {
  static getInitialProps = getInitialProps;

  render() {
    return (
      <Html style={{ height: '100%' }}>
        <Head>
          <script
            src="https://cdn.jsdelivr.net/npm/iconify-icon@1.0.0-beta.2/dist/iconify-icon.min.js"
            async
          ></script>
        </Head>
        {/* <Head /> */}

        <body style={{ height: '100%' }}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
