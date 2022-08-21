import { Group, Text, useMantineTheme, Stack } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons';
import { Dropzone, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import axios from 'axios';
import customDropzoneProps from '../../types/component_schemas/customDropzoneProps';
import { useState } from 'react';

const CustomDropzone = (props: customDropzoneProps) => {
  const { fileUrl, setFileUrl,dropZonePrompt, ...dropzoneProps } = props;
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const theme = useMantineTheme();
  const uploadUrl = 'https://api.cloudinary.com/v1_1/unimet/upload';
  return (
    <Stack spacing={'lg'}>
      <Dropzone
        onDrop={async (files) => {
          try {
            // Convert the file to a Base 64 URI
            const file = files[0];
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
              const base64data = reader.result;
              const response = await axios.post(uploadUrl, {
                file: base64data,
                upload_preset: 'ml_default',
              });
              response.data.public_id && setFileUrl(response.data.secure_url);
              setSuccessMessage('Imagen cargada exitosamente.');
            };
            setErrorMessage(null);
          } catch (error: any) {
            setSuccessMessage(null);
            setErrorMessage(error.message);
          }
        }}
        onReject={(files) => {
          setSuccessMessage(null);
          setErrorMessage('No se pudo cargar la imagen.');
        }}
        maxSize={3 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        maxFiles={1}
        {...dropzoneProps}
      >
        <Group
          position="center"
          spacing="xl"
          style={{ minHeight: 220, pointerEvents: 'none' }}
        >
          <Dropzone.Accept>
            <IconUpload
              size={50}
              stroke={1.5}
              color={
                theme.colors[theme.primaryColor][
                  theme.colorScheme === 'dark' ? 4 : 6
                ]
              }
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              size={50}
              stroke={1.5}
              color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto size={50} stroke={1.5} />
          </Dropzone.Idle>

          <div>
            <Text size="xl" inline>
              {dropZonePrompt}
            </Text>
            <Text size="sm" color="dimmed" inline mt={7}>
              Arrastre y suelte la imagen a utilizar en este recuadro
            </Text>
          </div>
        </Group>
      </Dropzone>
      <Text color={theme.colors.green[theme.colorScheme === 'dark' ? 4 : 6]}>
        {successMessage}
      </Text>
      <Text color={theme.colors.red[theme.colorScheme === 'dark' ? 4 : 6]}>
        {errorMessage}
      </Text>
    </Stack>
  );
};

export default CustomDropzone;
