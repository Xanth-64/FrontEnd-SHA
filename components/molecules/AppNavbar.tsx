import { Navbar, ScrollArea, Divider, Transition } from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useNavbarContext } from '../../lib/NavbarContext';
import NavbarList from '../atoms/NavbarList';
import ProfileData from '../atoms/ProfileData';

import navElement from '../../types/navElement';

const AppNavbar = () => {
  const { displayNavbar } = useNavbarContext();
  const { width } = useViewportSize();
  // TODO: Replace mock data with real data

  const mockNavList: navElement[] = [
    { link: '', icon: 'mdi:account', title: 'Example', color: 'green' },
    { link: '', icon: 'mdi:account', title: 'Example', color: 'red' },
    { link: '', icon: 'mdi:account', title: 'Example', color: 'blue' },
    { link: '', icon: 'mdi:account', title: 'Example', color: 'orange' },
  ];
  const mobile = width <= 576;
  return (
    <>
      {mobile ? (
        <Transition
          mounted={displayNavbar}
          transition="slide-right"
          duration={800}
        >
          {(styles) => (
            <Navbar fixed style={styles} width={{ base: '100%' }}>
              <Navbar.Section
                grow
                component={ScrollArea}
                style={{ width: '100%' }}
              >
                <NavbarList navElementList={mockNavList} />
              </Navbar.Section>
              <Navbar.Section>
                {/* TODO: Replace mock data with real data */}
                <Divider size={'xs'} />
                <ProfileData
                  name="Andres Eloy"
                  email="30258079@correo.unimet.edu.ve"
                />
              </Navbar.Section>
            </Navbar>
          )}
        </Transition>
      ) : (
        <Navbar width={{ base: 300 }}>
          <Navbar.Section grow component={ScrollArea}>
            <div>
              <NavbarList navElementList={mockNavList} />
            </div>
          </Navbar.Section>
          <Navbar.Section>
            <Divider size={'xs'} />
            {/* TODO: Replace mock data with real data */}
            <ProfileData
              name="Andres Eloy"
              email="30258079@correo.unimet.edu.ve"
            />
          </Navbar.Section>
        </Navbar>
      )}
    </>
  );
};

export default AppNavbar;
