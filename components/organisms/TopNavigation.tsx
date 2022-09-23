import {
  Card,
  Center,
  Group,
  SegmentedControl,
  Stack,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useViewportSize } from '@mantine/hooks';

import topNavigationProps from '../../types/component_schemas/topNavigationProps';

const TopNavigation = ({
  links,
  getActiveTab,
  setActiveTab,
  children,
}: topNavigationProps) => {
  const theme = useMantineTheme();
  const { width } = useViewportSize();
  const mobile = width <= theme.breakpoints.md;
  return (
    <>
      <Card style={{ width: '100%' }} withBorder shadow={'xs'}>
        <Stack align={'center'}>
          <SegmentedControl
            orientation={mobile ? 'vertical' : 'horizontal'}
            fullWidth={mobile}
            data={links.map((value) => {
              return {
                value: value.value,
                label: (
                  <Center>
                    <Group position={'center'} spacing={'xs'} noWrap>
                      <value.icon size={16} />
                      <Text align={'center'}>{value.label}</Text>
                    </Group>
                  </Center>
                ),
              };
            })}
            value={getActiveTab}
            onChange={setActiveTab}
          />
        </Stack>
      </Card>
      {children}
    </>
  );
};

export default TopNavigation;
