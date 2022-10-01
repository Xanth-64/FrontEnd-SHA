import {
  Burger,
  Center,
  Group,
  Header,
  MediaQuery,
  Title,
} from '@mantine/core';

import { useNavbarContext } from '../../lib/contexts/NavbarContext';
import useUser from '../../lib/hooks/useUser';

import ApplicationLogo from '../../public/application_logo.svg';

const AppHeader = () => {
  const { displayNavbar, toggleDisplay } = useNavbarContext();
  const title = displayNavbar ? 'Close navigation' : 'Open navigation';
  const { user } = useUser();
  return (
    <Header height={60}>
      <Center style={{ height: 60 }}>
        <Group spacing="xs">
          <MediaQuery smallerThan="md" styles={{ display: 'None' }}>
            <ApplicationLogo />
          </MediaQuery>
          <MediaQuery smallerThan="md" styles={{ display: 'None' }}>
            <Title order={1}>Algoritmos y Programación</Title>
          </MediaQuery>
          {user ? (
            <MediaQuery largerThan="md" styles={{ display: 'None' }}>
              <Burger
                opened={displayNavbar}
                title={title}
                onClick={() => {
                  toggleDisplay();
                }}
              />
            </MediaQuery>
          ) : null}
        </Group>
      </Center>
    </Header>
  );
};

export default AppHeader;
