import { Card, Select } from '@mantine/core';
import { useEffect, useState } from 'react';
import axiosInstance from '../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import topic from '../../types/api_schemas/topic';
import selectTopicCardProps from '../../types/component_schemas/selectTopicCardProps';
import TopicSelectItem from '../atoms/TopicSelectItem';
import CustomLoadingOverlay from '../overlays/CustomLoadingOverlay';

const SelectTopicCard = ({
  children,
  getActiveTopic,
  setActiveTopic,
}: selectTopicCardProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [topicList, setTopicList] = useState([]);
  useEffect(() => {
    const inner_function = async () => {
      try {
        const response = await axiosInstance.get('/topics/');
        setTopicList(
          response.data.data.map((topic: topic) => {
            return {
              value: topic.id,
              label: topic.title,
              icon: topic.icon_name,
            };
          })
        );
      } catch (error: any) {
        ShowFailedNotification(
          'Error recuperando los tópicos',
          'Error al recuperar los tópicos, intente nuevamente.'
        );
      }
    };
    setLoading(true);
    inner_function();
    setLoading(false);
  }, []);
  return (
    <>
      <Card style={{ width: '100%' }} withBorder shadow={'xs'}>
        <CustomLoadingOverlay visible={loading} />
        <Select
          data={topicList}
          label={'Seleccionar Tópico'}
          value={getActiveTopic}
          onChange={setActiveTopic}
          searchable
          dropdownPosition={'bottom'}
          withinPortal
          itemComponent={TopicSelectItem}
          style={{ width: '50%' }}
        />
      </Card>
      {children}
    </>
  );
};

export default SelectTopicCard;
