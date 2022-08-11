import { forwardRef } from 'react';
import { Group, Text } from '@mantine/core';
import { Icon } from '@iconify/react';
interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  description: string;
  value: string;
}

const IconSelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, description, value, ...others }: ItemProps, ref) => {
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Icon icon={value} style={{ fontSize: '36px' }} />
          <Text size="sm" weight={'bold'}>
            {label}
          </Text>
          <Text size="xs" color="dimmed">
            {description}
          </Text>
        </Group>
      </div>
    );
  }
);
IconSelectItem.displayName = 'IconSelectItem';

export default IconSelectItem;
