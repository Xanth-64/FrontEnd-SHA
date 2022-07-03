import { Header, Center, Group, MediaQuery, Burger } from '@mantine/core';
import ApplicationLogo from '../../public/application_logo.svg';
import ApplicationTitle from '../../public/application_title.svg';
import { useNavbarContext } from '../../lib/NavbarContext';
const AppHeader = () => {
  const { displayNavbar, toggleDisplay } = useNavbarContext();
  const title = displayNavbar ? 'Close navigation' : 'Open navigation';
  return (
    <Header height={60}>
      <Center style={{ height: 60 }}>
        <Group spacing="xs">
          <MediaQuery smallerThan="xs" styles={{ display: 'None' }}>
            <ApplicationLogo />
          </MediaQuery>
          <ApplicationTitle />
          <MediaQuery largerThan="xs" styles={{ display: 'None' }}>
            <Burger
              opened={displayNavbar}
              title={title}
              onClick={() => {
                toggleDisplay();
              }}
            />
          </MediaQuery>
        </Group>
      </Center>
    </Header>
  );
};

export default AppHeader;
