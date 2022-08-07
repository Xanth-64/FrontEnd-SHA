import navElement from '../../types/component_schemas/navElement';
import { Stack, ThemeIcon, Text, Grid } from '@mantine/core';
import { v4 } from 'uuid';
import { useRouter } from 'next/router';
type Props = {
  navElementList: navElement[];
};
import { useNavbarContext } from '../../lib/contexts/NavbarContext';

const NavbarList = (props: Props) => {
  const { navElementList } = props;
  const router = useRouter();
  const { displayNavbar, toggleDisplay } = useNavbarContext();
  return (
    <Stack spacing="md" style={{ width: '100%', padding: '10px' }}>
      {navElementList.map((element: navElement) => {
        return (
          <Grid
            align="center"
            gutter={10}
            onClick={() => {
              if (element.link) {
                router.push(element.link);
                if (displayNavbar) {
                  toggleDisplay();
                }
              }
            }}
            key={v4()}
            style={{
              height: '56px',
              cursor: 'pointer',
            }}
            sx={(theme) => {
              return {
                transition: 'background-color 0.25s ease-in-out',
                '&:hover': {
                  backgroundColor: theme.colors.gray[1],
                },
              };
            }}
          >
            <Grid.Col span={2}>
              <ThemeIcon
                color={element?.color}
                variant="light"
                size={'lg'}
                radius="sm"
              >
                {element.icon ?? null}
              </ThemeIcon>
            </Grid.Col>
            <Grid.Col span={10}>
              <Text
                size="md"
                weight={500}
                style={{
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '25ch',
                }}
              >
                {element.title}
              </Text>
            </Grid.Col>
          </Grid>
        );
      })}
    </Stack>
  );
};

export default NavbarList;
