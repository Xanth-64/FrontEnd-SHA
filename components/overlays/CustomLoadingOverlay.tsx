import { Loader, LoadingOverlay, LoadingOverlayProps } from '@mantine/core';

const CustomLoadingOverlay = (Props: LoadingOverlayProps) => {
  return (
    <LoadingOverlay
      {...Props}
      loaderProps={{ size: 'lg', color: 'orange' }}
      overlayBlur={2}
    />
  );
};

export default CustomLoadingOverlay;
