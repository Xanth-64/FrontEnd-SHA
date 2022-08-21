import { DropzoneProps } from '@mantine/dropzone';

interface customDropzoneProps extends Partial<DropzoneProps> {
  fileUrl: string;
  setFileUrl: (fileUrl: string) => void;
  dropZonePrompt: string;
}

export default customDropzoneProps;
