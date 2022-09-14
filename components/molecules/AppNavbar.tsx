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
import axiosInstance from '../../lib/constants/axiosInstance';
import topic from '../../types/api_schemas/topic';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/router';
const AppNavbar = () => {
  const { displayNavbar } = useNavbarContext();
  const { width } = useViewportSize();
  const theme = useMantineTheme();
  const { user } = useUser();
  const [navList, setNavList] = useState<navElement[]>([]);
  const router = useRouter();
  // Generate a list of colors to pick at random
  const colors = Object.keys(theme.colors);
  useEffect(() => {
    const inner_function = async () => {
      if (user?.role[0].role_name === 'teacher') {
        setNavList(teacherNavList);
        return;
      }
      if (user?.role[0].role_name === 'student') {
        const { data } = await axiosInstance.get('/topics/with_pagination', {
          params: {
            sort_key: 'relative_position',
          },
        });
        // NOTE For now we pick a color at random. On upgrade we may allow the user to pick the color themselves
        const navList: navElement[] = data.data.items.map(
          (topic: topic, index: number) => {
            return {
              icon: <Icon icon={topic.icon_name ?? ''} fontSize={24} />,
              link: `/student/topic/${topic.id}`,
              title: topic.title,
              topic_id: topic.id,
              color: colors[index % colors.length],
            };
          }
        );
        setNavList(navList);
        return;
      }
    };
    inner_function();
  }, [user, router.pathname]);
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
