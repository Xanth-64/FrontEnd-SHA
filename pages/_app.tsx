import { AppProps } from 'next/app';
import Head from 'next/head';
import { MantineProvider } from '@mantine/core';
import { NavbarProvider } from '../lib/contexts/NavbarContext';
import { NotificationsProvider } from '@mantine/notifications';
import CustomAppShell from '../components/organisms/CustomAppshell';
import useUser from '../lib/hooks/useUser';
import { useRouter } from 'next/router';
import { showNotification } from '@mantine/notifications';
import { ShieldLock } from 'tabler-icons-react';
import { useEffect } from 'react';

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const { user, isLoading } = useUser();
  const router = useRouter();
  const validateAuth = () => {
    if (!isLoading) {
      if (pageProps.protected) {
        if (!user) {
          router.push('/home');
          showNotification({
            title: 'Autenticación Requerida',
            message:
              'Su autenticación es requerida para acceder a esta página.',
            autoClose: 10000,
            color: 'yellow',
            icon: <ShieldLock />,
          });
          return;
        }
        if (pageProps.expected_role === 'teacher') {
          if (user?.role[0].role_name !== 'teacher') {
            router.push('/student');
            showNotification({
              title: 'No Autorizado',
              message:
                'Usted no posee los permisos necesarios para acceder a esta página.',
              autoClose: 10000,
              color: 'red',
              icon: <ShieldLock />,
            });
            return;
          }
        }
        if (pageProps.expected_role === 'student') {
          if (
            !user.user.vark_completed &&
            router.route.search('vark_test') === -1
          ) {
            router.push('/student/vark_test');
          }
        }
      } else {
        if (user) {
          router.push(`/${user.role[0].role_name}`);
        }
      }
    }
  };
  useEffect(validateAuth, [user, isLoading, router.route]);
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
          loader: 'bars',
        }}
      >
        <NavbarProvider>
          <CustomAppShell>
            <NotificationsProvider
              limit={1}
              position={'top-right'}
              zIndex={1000}
            >
              <Component {...pageProps} style={{ height: '100%' }} />
            </NotificationsProvider>
          </CustomAppShell>
        </NavbarProvider>
      </MantineProvider>
    </>
  );
}
