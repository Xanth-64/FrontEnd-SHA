import { showNotification } from '@mantine/notifications';
import { MoodSad } from 'tabler-icons-react';

const ShowFailedNotification = (title: string, message: string) => {
  showNotification({
    title: title,
    message: message,
    autoClose: 10000,
    color: 'red',
    icon: <MoodSad />,
  });
};

export default ShowFailedNotification;
