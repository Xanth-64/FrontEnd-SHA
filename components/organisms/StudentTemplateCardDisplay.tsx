import { useEffect, useState } from 'react';

import axiosInstance from '../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';

import template from '../../types/api_schemas/template';
import studentTemplateCardDisplayProps from '../../types/component_schemas/studentTemplateCardDisplayProps';

import CardHolder from '../templates/CardHolder';

import StudentTemplateCard from '../molecules/StudentTemplateCard';

const StudentTemplateCardDisplay = ({
  topicId,
}: studentTemplateCardDisplayProps) => {
  const [templateList, setTemplateList] = useState<template[]>([]);
  const fetchTemplates = () => {
    const inner_function = async () => {
      if (topicId) {
        try {
          const { data } = await axiosInstance.get(
            '/templates/with_pagination',
            {
              params: {
                topic_id: topicId,
                sort_key: 'relative_position',
              },
            }
          );
          setTemplateList(data.data.items);
        } catch (error: any) {
          ShowFailedNotification(
            'Error al cargar las plantillas',
            'Error obteniendo la información de las plantillas. Intente nuevamente.'
          );
        }
      }
    };
    inner_function();
  };
  useEffect(fetchTemplates, [topicId]);
  return (
    <CardHolder>
      {templateList.map((template) => (
        <StudentTemplateCard
          key={template.id}
          template={template}
          displayHeaderImage
          displayNavigationButton
        />
      ))}
    </CardHolder>
  );
};

export default StudentTemplateCardDisplay;
