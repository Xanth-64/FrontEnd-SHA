import { Center, Loader, Stack } from '@mantine/core';
import { v4 } from 'uuid';

import navElement from '../../types/component_schemas/navElement';

import NavElement from '../ions/NavElement';

type Props = {
  navElementList: navElement[];
};

const NavbarList = (props: Props) => {
  const { navElementList } = props;
  return (
    <Stack spacing="md" style={{ width: '100%', padding: '10px' }}>
      {navElementList.length === 0 ? (
        <Center>
          <Loader color={'orange'} />
        </Center>
      ) : null}
      {navElementList.map((element: navElement) => (
        <NavElement {...element} key={v4()} />
      ))}
    </Stack>
  );
};

export default NavbarList;
