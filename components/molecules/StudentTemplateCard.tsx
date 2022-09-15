import { Button, Card, Center, Image, Stack, Text, Title } from '@mantine/core';
import { useRouter } from 'next/router';
import studentTemplateCardProps from '../../types/component_schemas/studentTemplateCardProps';

const StudentTemplateCard = ({
  template,
  displayNavigationButton,
  displayHeaderImage,
}: studentTemplateCardProps) => {
  const router = useRouter();
  return (
    <Card shadow={'sm'} radius={'md'} style={{ padding: '36px 28px' }}>
      {displayHeaderImage ? (
        <Card.Section>
          <Center>
            <Image
              src={template.image_url}
              withPlaceholder
              alt={`Representative Image for: ${template.title}`}
              style={{ maxWidth: '450px', minHeight: '100px' }}
              height={template.title ? 200 : undefined}
            />
          </Center>
        </Card.Section>
      ) : null}
      <Stack
        spacing={'xl'}
        justify={'center'}
        align={'center'}
        style={{ padding: '36px 28px' }}
      >
        <Title order={3} style={{ width: '100%' }} align={'left'}>
          {template.title}
        </Title>
        <Text style={{ width: '100%' }} align={'left'}>
          {template.description}
        </Text>
        {displayNavigationButton ? (
          <Button
            onClick={() => {
              router.push(`/student/template/${template.id}`);
            }}
            color={'dark'}
            radius={'md'}
            size={'lg'}
          >
            Revisar Tópico
          </Button>
        ) : null}
      </Stack>
    </Card>
  );
};

export default StudentTemplateCard;
