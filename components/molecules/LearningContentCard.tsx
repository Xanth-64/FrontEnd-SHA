import {
  Card,
  Title,
  TypographyStylesProvider,
  Stack,
  Transition,
  Group,
  ThemeIcon,
  UnstyledButton,
} from '@mantine/core';
import { useHover } from '@mantine/hooks';
import { useRouter } from 'next/router';
import { Edit, Trash } from 'tabler-icons-react';
import useUser from '../../lib/hooks/useUser';
import learningContentCardProps from '../../types/component_schemas/learningContentCardProps';
const LearningContentCard = ({ page }: learningContentCardProps) => {
  const { user } = useUser();
  const role_name = user?.role[0].role_name;
  const { hovered, ref } = useHover();
  const router = useRouter();
  return (
    <Card shadow={'sm'} radius={'md'} ref={ref}>
      <Stack spacing={'xl'}>
        <Group position={'apart'}>
          <Title order={3}>{page.learning_content?.title}</Title>
          {role_name === 'teacher' ? (
            <Transition mounted={hovered} transition={'fade'}>
              {(styles) => {
                return (
                  <Group position={'right'} style={styles}>
                    <UnstyledButton>
                      <ThemeIcon color={'red'} variant={'light'} size={'lg'}>
                        <Trash size={25} />
                      </ThemeIcon>
                    </UnstyledButton>
                    <UnstyledButton
                      onClick={() => {
                        router.push(
                          `/teacher/learning_content/${page.learning_content?.id}`
                        );
                      }}
                    >
                      <ThemeIcon color={'gray'} variant={'light'} size={'lg'}>
                        <Edit size={25} />
                      </ThemeIcon>
                    </UnstyledButton>
                  </Group>
                );
              }}
            </Transition>
          ) : null}
        </Group>

        <TypographyStylesProvider>
          {page.learning_content?.content ? (
            <div
              dangerouslySetInnerHTML={{
                __html: page.learning_content.content,
              }}
            />
          ) : null}
        </TypographyStylesProvider>
      </Stack>
    </Card>
  );
};

export default LearningContentCard;
