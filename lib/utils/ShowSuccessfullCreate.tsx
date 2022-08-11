import { showNotification } from '@mantine/notifications';
import { MoodHappy } from 'tabler-icons-react';

const ShowSuccessfullCreate = (title: string, message: string) => {
  showNotification({
    title: title,
    message: message,
    autoClose: 10000,
    color: 'green',
    icon: <MoodHappy />,
  });
};

export default ShowSuccessfullCreate;
