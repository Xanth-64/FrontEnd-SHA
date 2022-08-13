import {
  Navbar,
  ScrollArea,
  Divider,
  Transition,
  useMantineTheme,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';
import { useNavbarContext } from '../../lib/contexts/NavbarContext';
import useUser from '../../lib/hooks/useUser';
import NavbarList from '../atoms/NavbarList';
import ProfileData from '../atoms/ProfileData';
import { useEffect, useState } from 'react';
import navElement from '../../types/component_schemas/navElement';
import teacherNavList from '../../lib/constants/navLists/teacherNavlist';
const AppNavbar = () => {
  const { displayNavbar } = useNavbarContext();
  const { width } = useViewportSize();
  const theme = useMantineTheme();
  const { user } = useUser();
  const [navList, setNavList] = useState<navElement[]>([]);
  useEffect(() => {
    if (user?.role[0].role_name === 'teacher') {
      setNavList(teacherNavList);
      return;
    }
    if (user?.role[0].role_name === 'student') {
      setNavList([]);
      return;
    }
  }, [user]);
  const mobile = width <= theme.breakpoints.md;
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
                <NavbarList navElementList={navList} />
              </Navbar.Section>
              <Navbar.Section>
                <Divider size={'xs'} />
                <ProfileData
                  name={
                    user
                      ? `${user.user.first_name} ${user.user.last_name}`.trim()
                      : ''
                  }
                  email={user ? user.user.email : ''}
                  imageURL={user ? user.user.image_url : ''}
                  role={user ? user.role[0].role_name : ''}
                />
              </Navbar.Section>
            </Navbar>
          )}
        </Transition>
      ) : (
        <Navbar width={{ base: 300 }}>
          <Navbar.Section grow component={ScrollArea}>
            <div>
              <NavbarList navElementList={navList} />
            </div>
          </Navbar.Section>
          <Navbar.Section>
            <Divider size={'xs'} />
            <ProfileData
              name={
                user
                  ? `${user.user.first_name} ${user.user.last_name}`.trim()
                  : ''
              }
              email={user ? user.user.email : ''}
              imageURL={user ? user.user.image_url : ''}
              role={user ? user.role[0].role_name : ''}
            />
          </Navbar.Section>
        </Navbar>
      )}
    </>
  );
};

export default AppNavbar;
