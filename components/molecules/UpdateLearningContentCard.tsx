import { Card, Title, Stack, Text, Button } from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { DeviceFloppy } from 'tabler-icons-react';
import axiosInstance from '../../lib/constants/axiosInstance';
import handleImageUpload from '../../lib/utils/handleImageUpload';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import ShowSuccessfullCreate from '../../lib/utils/ShowSuccessfullCreate';
import LearningContentEditionSchema from '../../schemas/LearningContentEditionSchema';
import updateLearningContentCardProps from '../../types/component_schemas/updateLearningContentCardProps';
import RichTextEditor from '../atoms/RichText';
import CustomLoadingOverlay from '../overlays/CustomLoadingOverlay';

const UpdateLearningContentCard = ({
  currentLearningContent,
  fetchLearningContent,
  loading,
}: updateLearningContentCardProps) => {
  const [componentLoading, setComponentLoading] = useState<boolean>(false);
  const form = useForm({
    validate: zodResolver(LearningContentEditionSchema),
    initialValues: { content: currentLearningContent?.content ?? '' },
  });
  useEffect(() => {
    if (currentLearningContent) {
      form.setValues({ content: currentLearningContent.content });
    }
  }, [currentLearningContent]);
  return (
    <Card shadow={'sm'} radius={'md'}>
      <CustomLoadingOverlay visible={loading} />
      <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
        <form
          onSubmit={form.onSubmit(async (values) => {
            setComponentLoading(true);
            try {
              if (currentLearningContent) {
                const response = await axiosInstance.put(
                  `/learning_content/${currentLearningContent.id}`,
                  {
                    content: values.content,
                  }
                );
                ShowSuccessfullCreate(
                  'Contenido de aprendizaje actualizado exitosamente',
                  `Se ha actualizado el contenido de aprendizaje "${response.data.data.title}" exitosamente`
                );
                fetchLearningContent();
              }
            } catch (error: any) {
              ShowFailedNotification(
                'Error al actualizar el contenido de aprendizaje',
                'Ocurrió un error al actualizar el contenido de aprendizaje'
              );
            }
            setComponentLoading(false);
          })}
        >
          <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
            <Title order={3}>Editar Contenido de Aprendizaje</Title>
            <Text weight="bold" size="md">
              Modificar Contenido de la Página
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
                leftIcon={<DeviceFloppy size={25} />}
              >
                Guardar
              </Button>
            </Stack>
          </Stack>
        </form>
      </Stack>
    </Card>
  );
};

export default UpdateLearningContentCard;
