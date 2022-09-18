import navElement from '../../types/component_schemas/navElement';
import { Stack, Loader, Center } from '@mantine/core';
import { v4 } from 'uuid';
type Props = {
  navElementList: navElement[];
};
import NavElement from '../ions/NavElement';

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
