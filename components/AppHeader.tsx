import { Header, Center, Group, MediaQuery } from '@mantine/core';
import ApplicationLogo from '../public/application_logo.svg';
import ApplicationTitle from '../public/application_title.svg';

const AppHeader = () => {
  return (
    <Header height={60}>
      <Center style={{ height: 60 }}>
        <Group spacing="xs">
          <MediaQuery smallerThan="xs" styles={{ display: 'None' }}>
            <ApplicationLogo />
          </MediaQuery>
          <ApplicationTitle />
        </Group>
      </Center>
    </Header>
  );
};

export default AppHeader;
