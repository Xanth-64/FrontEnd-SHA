import {
  Center,
  Grid,
  Avatar,
  Stack,
  Text,
  UnstyledButton,
} from '@mantine/core';

import { ChevronRight } from 'tabler-icons-react';

type userProps = {
  name: string;
  email: string;
  imageURL?: string;
};

const ProfileData = (props: userProps) => {
  const { name, email, imageURL } = props;
  return (
    <UnstyledButton
      style={{ margin: 10 }}
      component={Grid}
      onClick={() => {
        console.log('Hello');
      }}
      align="center"
      sx={(theme) => {
        return {
          transition: 'background-color 0.25s ease-in-out',
          '&:hover': {
            backgroundColor: theme.colors.gray[1],
          },
        };
      }}
    >
      <Grid.Col span={3}>
        <Center>
          <Avatar
            src={imageURL}
            alt="Profile picture"
            size="lg"
            color="orange"
            radius={'xl'}
          >
            {name
              ?.split(' ')
              .map((n) => n[0])
              .join('')}
          </Avatar>
        </Center>
      </Grid.Col>
      <Grid.Col span={6}>
        <Stack spacing={'xs'}>
          <Text
            size="sm"
            weight={'bold'}
            // lineClamp={1}
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '25ch',
            }}
          >
            {name}
          </Text>
          <Text
            size="xs"
            color={'dimmed'}
            // lineClamp={1}
            style={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              maxWidth: '30ch',
            }}
          >
            {email}
          </Text>
        </Stack>
      </Grid.Col>
      <Grid.Col span={3}>
        <Center>
          <ChevronRight size={18} />
        </Center>
      </Grid.Col>
    </UnstyledButton>
  );
};

export default ProfileData;
