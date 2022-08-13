import {
  Center,
  Grid,
  Avatar,
  Stack,
  Text,
  UnstyledButton,
  Menu,
} from '@mantine/core';
import { ChevronRight, Settings, Logout } from 'tabler-icons-react';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useNavbarContext } from '../../lib/contexts/NavbarContext';
type userProps = {
  name: string;
  email: string;
  imageURL?: string;
  role?: string;
};

const ProfileData = (props: userProps) => {
  const { name, email, imageURL, role } = props;
  const { displayNavbar, toggleDisplay } = useNavbarContext();

  const router = useRouter();
  return (
    <Menu loop>
      <Menu.Target>
        <UnstyledButton
          style={{ margin: 10 }}
          component={Grid}
          align="center"
          sx={(theme) => {
            return {
              transition: 'background-color 0.25s ease-in-out',
              '&:hover': {
                backgroundColor: theme.colors.gray[1],
              },
            };
          }}
        >
          <Grid.Col span={3}>
            <Center>
              <Avatar
                src={imageURL}
                alt="Profile picture"
                size="lg"
                color="orange"
                radius={'xl'}
              >
                {name
                  ?.split(' ')
                  .map((n) => n[0])
                  .join('')}
              </Avatar>
            </Center>
          </Grid.Col>
          <Grid.Col span={6}>
            <Stack spacing={'xs'}>
              <Text
                size="sm"
                weight={'bold'}
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '25ch',
                }}
              >
                {name ? name : 'Usuario'}
              </Text>
              <Text
                size="xs"
                color={'dimmed'}
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '30ch',
                }}
              >
                {email}
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={3}>
            <Center>
              <ChevronRight size={18} />
            </Center>
          </Grid.Col>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          onClick={() => {
            if (displayNavbar) {
              toggleDisplay();
            }
            router.push(`/${role}/settings`);
          }}
          icon={<Settings size={18} />}
        >
          Configuración
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            if (displayNavbar) {
              toggleDisplay();
            }
            deleteCookie('idToken');
            router.push('/home');
          }}
          icon={<Logout size={18} />}
          color={'red'}
        >
          Cerrar sesión
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default ProfileData;
