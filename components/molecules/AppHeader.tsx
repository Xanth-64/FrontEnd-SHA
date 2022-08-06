import { Header, Center, Group, MediaQuery, Burger } from '@mantine/core';
import ApplicationLogo from '../../public/application_logo.svg';
import ApplicationTitle from '../../public/application_title.svg';
import { useNavbarContext } from '../../lib/contexts/NavbarContext';
import useUser from '../../lib/hooks/useUser';

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
          <MediaQuery smallerThan="xs" styles={{ display: 'None' }}>
            <ApplicationTitle />
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
