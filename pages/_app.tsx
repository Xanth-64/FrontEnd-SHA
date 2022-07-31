import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NavbarProvider } from '../lib/NavbarContext';
import { NotificationsProvider } from '@mantine/notifications';
import CustomAppShell from '../components/organisms/CustomAppshell';
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
          colorScheme: 'light',
        }}
      >
        <NavbarProvider>
          <CustomAppShell>
            <NotificationsProvider>
              <Component {...pageProps} style={{ height: '100%' }} />
            </NotificationsProvider>
          </CustomAppShell>
        </NavbarProvider>
      </MantineProvider>
    </>
  );
}
