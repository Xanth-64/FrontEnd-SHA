import topNavigationTab from '../../../types/component_schemas/topNavigationTab';
import { SquarePlus, ArrowsLeftRight } from 'tabler-icons-react';

const teacherTopicTabList: topNavigationTab[] = [
  {
    label: 'Añadir Páginas',
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
