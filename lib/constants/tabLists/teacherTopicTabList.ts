import topNavigationTab from '../../../types/component_schemas/topNavigationTab';
import { SquarePlus, ArrowsLeftRight } from 'tabler-icons-react';

const teacherTopicTabList: topNavigationTab[] = [
  {
    label: 'Crear Tópicos',
    value: 'createtopics',
    icon: SquarePlus,
  },
  {
    label: 'Gestionar Prelaciones',
    value: 'manageprecedences',
    icon: ArrowsLeftRight,
  },
];

export default teacherTopicTabList;
