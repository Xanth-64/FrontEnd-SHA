import { Card, SegmentedControl, Center, Group, Text } from '@mantine/core';
import topNavigationProps from '../../types/component_schemas/topNavigationProps';

const TopNavigation = ({
  links,
  getActiveTab,
  setActiveTab,
  children,
}: topNavigationProps) => {
  return (
    <>
      <Card style={{ width: '100%' }} withBorder shadow={'xs'}>
        <SegmentedControl
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
      </Card>
      {children}
    </>
  );
};

export default TopNavigation;
