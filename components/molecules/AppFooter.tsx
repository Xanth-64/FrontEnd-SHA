import {
  Center,
  Footer,
  Grid,
  MediaQuery,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useState } from 'react';
import { InfoCircle } from 'tabler-icons-react';

import AppInformationModal from '../atoms/AppInformationModal';

const AppFooter = () => {
  const theme = useMantineTheme();
  const [openModal, setOpenModal] = useState(false);
  return (
    <Footer
      height={59}
      style={{ padding: '0 20px', display: 'flex', alignItems: 'center' }}
      fixed
    >
      <Grid justify={'space-between'} align="center" style={{ width: '100%' }}>
        <MediaQuery smallerThan={'xs'} styles={{ display: 'None' }}>
          <Grid.Col xs={6}>
            {' '}
            <Text
              size={'sm'}
              weight={'bold'}
              style={{
                lineClamp: 3,
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
              }}
            >
              Desarrollado por: Andrés Betancourt - 2022. Asesoría: Dinarle
              Milagro Ortega
            </Text>
          </Grid.Col>
        </MediaQuery>
        <Grid.Col xs={6}>
          <Grid>
            <Grid.Col xs={2} offsetXs={10}>
              <Center>
                <InfoCircle
                  size={44}
                  color={theme.colors.dark[3]}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setOpenModal(true);
                  }}
                />
              </Center>
            </Grid.Col>
          </Grid>
        </Grid.Col>
      </Grid>
      <AppInformationModal
        opened={openModal}
        centered
        title={<InfoCircle size={24} color={theme.colors.dark[3]} />}
        onClose={() => {
          setOpenModal(false);
        }}
      />
    </Footer>
  );
};

export default AppFooter;
