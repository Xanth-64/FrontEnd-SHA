import { Ruler2, Writing } from 'tabler-icons-react';

import topNavigationTab from '../../../types/component_schemas/topNavigationTab';

const teacherPracticeTestTabList: topNavigationTab[] = [
  {
    label: 'Configurar Adaptación',
    value: 'configureadaptation',
    icon: Ruler2,
  },
  {
    label: 'Editar Prueba',
    value: 'edittest',
    icon: Writing,
  },
];

export default teacherPracticeTestTabList;
