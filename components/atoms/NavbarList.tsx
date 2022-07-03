import navElement from '../../types/navElement';
import { Stack, ThemeIcon, Text, Grid } from '@mantine/core';
import { v4 } from 'uuid';
import { Icon } from '@iconify/react';

type Props = {
  navElementList: navElement[];
};

const NavbarList = (props: Props) => {
  const { navElementList } = props;
  return (
    <Stack spacing="md" style={{ width: '100%', padding: '10px' }}>
      {navElementList.map((element: navElement) => {
        return (
          <Grid
            key={v4()}
            align="center"
            gutter={10}
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
                <Icon icon={element?.icon ?? ''} />
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
