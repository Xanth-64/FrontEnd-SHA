import { DropzoneProps } from '@mantine/dropzone';

interface customDropzoneProps extends Partial<DropzoneProps> {
  fileUrl: string;
  setFileUrl: (fileUrl: string) => void;
}

export default customDropzoneProps;
