import {
  Button,
  Card,
  Group,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  Transition,
  useMantineTheme,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useScrollIntoView } from '@mantine/hooks';
import RichTextEditor from '../atoms/RichText';
import { X } from 'tabler-icons-react';
import { useEffect, useState } from 'react';
import handleImageUpload from '../../lib/utils/handleImageUpload';
import LearningContentCreationSchema from '../../schemas/LearningContentCreationSchema';
import createLearningContentCardProps from '../../types/component_schemas/createLearningContentCardProps';
import axiosInstance from '../../lib/constants/axiosInstance';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';

const CreateLearningContentCard = ({
  displayContent,
  onClose,
  currentTemplate,
}: createLearningContentCardProps) => {
  const form = useForm({
    validate: zodResolver(LearningContentCreationSchema),
    initialValues: {
      title: '',
      content: '',
    },
  });
  const [componentLoading, setComponentLoading] = useState<boolean>(false);
  const theme = useMantineTheme();
  const { scrollIntoView, targetRef } = useScrollIntoView<HTMLDivElement>();
  useEffect(() => {
    if (displayContent) {
      scrollIntoView({ alignment: 'end' });
    }
  }, [displayContent]);
  return (
    <Transition
      mounted={displayContent}
      transition={'slide-left'}
      duration={400}
    >
      {(styles) => {
        return (
          <Card shadow={'sm'} radius={'md'} style={styles} ref={targetRef}>
            <Group align={'flex-end'}>
              <X
                size={25}
                color={theme.colors.gray[7]}
                style={{ cursor: 'pointer' }}
                onClick={onClose}
              />
            </Group>
            <form
              onSubmit={form.onSubmit(async (values) => {
                setComponentLoading(true);
                try {
                  if (currentTemplate) {
                    const response = await axiosInstance.post('/pages/', {
                      template_id: currentTemplate.id,
                      learning_content: values,
                    });
                    ShowSuccessfullCreate(
                      'Contenido de aprendizaje creado exitosamente',
                      `Se ha creado el contenido de aprendizaje "${response.data.data.learning_content.title}" exitosamente`
                    );
                    onClose();
                  }
                } catch (error: any) {
                  if (error.response?.status === 400) {
                    form.setErrors({
                      title:
                        'Ya existe una página de contenido con este título.',
                    });
                  } else {
                    form.setErrors({
                      title:
                        'Ocurrió un error al crear el contenido. Intente nuevamente.',
                    });
                  }
                }
                setComponentLoading(false);
              })}
            >
              <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
                <Title order={3}>Crear Contenido de Aprendizaje</Title>
                <TextInput
                  label="Título"
                  description="Título de la Página"
                  placeholder="Construcción de Condiciones Lógicas"
                  size={'md'}
                  {...form.getInputProps('title')}
                  disabled={componentLoading}
                />
                <Text weight="bold" size="md">
                  Contenido de la Página
                </Text>
                <RichTextEditor
                  {...form.getInputProps('content')}
                  onImageUpload={handleImageUpload}
                  readOnly={componentLoading}
                  controls={[
                    ['h3', 'h4', 'h5', 'h6'],
                    ['bold', 'italic', 'underline', 'strike', 'clean'],
                    ['alignLeft', 'alignCenter', 'alignRight'],
                    ['sub', 'sup'],
                    ['link', 'image', 'video', 'blockquote'],
                    ['unorderedList', 'orderedList'],
                    ['codeBlock'],
                  ]}
                />

                <Stack align={'center'}>
                  <Button
                    radius={'lg'}
                    color={'orange'}
                    loading={componentLoading}
                    type={'submit'}
                  >
                    Crear Página de Contenido
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Card>
        );
      }}
    </Transition>
  );
};

export default CreateLearningContentCard;
