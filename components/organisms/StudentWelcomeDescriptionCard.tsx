import { getValue } from '@firebase/remote-config';
import { Anchor, Card, Stack, Text, Title } from '@mantine/core';

import firebaseApp from '../../lib/constants/firebaseApp';
import generateRemoteConfig from '../../lib/constants/firebaseRemoteConfig';

const StudentWelcomeDescriptionCard = () => {
  const manualHref = getValue(
    generateRemoteConfig(firebaseApp),
    'student_manual'
  ).asString();
  return (
    <Card shadow={'sm'} radius={'md'}>
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <Title order={3}>
          Bienvenido al Sistema de Hipermedia Adaptativa para Algoritmos y
          Programación
        </Title>
        <Text>
          Este es un prototipo de un Sistema de Hipermedia Adaptativa para la
          enseñanza de la asignatura Algoritmos y Programación. Esperamos que
          sea particularmente de su agrado.
        </Text>
        {manualHref ? (
          <Anchor
            color={'orange'}
            weight={'bold'}
            variant={'link'}
            underline
            style={{ cursor: 'pointer' }}
            href={manualHref}
            target="_blank"
          >
            Ver Manual
          </Anchor>
        ) : null}
      </Stack>
    </Card>
  );
};

export default StudentWelcomeDescriptionCard;
