import topNavigationTab from '../../../types/component_schemas/topNavigationTab';
import { SquarePlus, ArrowsLeftRight, Ruler2 } from 'tabler-icons-react';

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
  {
    label: 'Configurar Adaptación',
    value: 'configureadaptation',
    icon: Ruler2,
  },
];

export default teacherTopicTabList;
