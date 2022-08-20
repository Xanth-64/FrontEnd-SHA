import { forwardRef } from 'react';
import { Group, Text } from '@mantine/core';
import { Icon } from '@iconify/react';
interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  label: string;
  icon: string;
  value: string;
}

const TopicSelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ label, icon, value, ...others }: ItemProps, ref) => {
    return (
      <div ref={ref} {...others}>
        <Group noWrap>
          <Icon icon={icon} style={{ fontSize: '36px' }} />
          <Text
            size="sm"
            weight={'bold'}
            style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
          >
            {label}
          </Text>
        </Group>
      </div>
    );
  }
);
TopicSelectItem.displayName = 'TopicSelectItem';

export default TopicSelectItem;
