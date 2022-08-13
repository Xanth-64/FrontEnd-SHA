import { Card, Select } from '@mantine/core';
import selectTopicCardProps from '../../types/component_schemas/selectTopicCardProps';

const SelectTopicCard = ({
  children,
  getActiveTopic,
  setActiveTopic,
}: selectTopicCardProps) => {
  return (
    <>
      <Card style={{ width: '100%' }} withBorder shadow={'xs'}>
        <Select
          data={[{ value: 'Example', label: 'Example' }]}
          label={'Seleccionar Tópico'}
          value={getActiveTopic}
          onChange={setActiveTopic}
          searchable
          dropdownPosition={'bottom'}
          withinPortal
          style={{ width: '50%' }}
        />
      </Card>
      {children}
    </>
  );
};

export default SelectTopicCard;
