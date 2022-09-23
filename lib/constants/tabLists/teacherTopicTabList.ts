import { ArrowsLeftRight, Ruler2, SquarePlus } from 'tabler-icons-react';

import topNavigationTab from '../../../types/component_schemas/topNavigationTab';

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
