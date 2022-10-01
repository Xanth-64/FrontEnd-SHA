import { Modal, ModalProps, Stack, Text } from '@mantine/core';

const AppInformationModal = (props: ModalProps) => {
  return (
    <Modal {...props}>
      <Stack spacing={'md'}>
        <Text weight={'bold'}>Desarrollado Por: Andrés Betancourt</Text>
        <Text weight={'bold'}>Tutor Académico: Dinarle Milagro Ortega</Text>
        <Text size="sm">
          El presente aplicativo fue desarrollado como un prototipo funcional de
          un Sistema de Hipermedia Adaptativa. Para el Apoyo en la Enseñanza de
          Algoritmos y Programación.{' '}
        </Text>
        <Text size={'xs'}>
          Copyright © 2022 - Universidad Metropolitana. Todos los derechos
          reservados{' '}
        </Text>
      </Stack>
    </Modal>
  );
};

export default AppInformationModal;
