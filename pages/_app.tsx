import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NavbarProvider } from '../lib/NavbarContext';
import CustomAppShell from '../components/CustomAppshell';
export default function App(props: AppProps) {
  const { Component, pageProps } = props;

  return (
    <>
      <Head>
        <title>Algoritmos y Programación</title>
        <link rel="icon" href="/favicon.ico"></link>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>

      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          /** Put your mantine theme override here */
          colorScheme: 'light',
        }}
      >
        <NavbarProvider>
          <CustomAppShell>
            <Component {...pageProps} />
          </CustomAppShell>
        </NavbarProvider>
      </MantineProvider>
    </>
  );
}
