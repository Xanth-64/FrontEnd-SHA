import { Ruler2, Writing } from 'tabler-icons-react';

import topNavigationTab from '../../../types/component_schemas/topNavigationTab';

const teacherPageTabList: topNavigationTab[] = [
  {
    label: 'Configurar Adaptación',
    value: 'configureadaptation',
    icon: Ruler2,
  },
  {
    label: 'Editar Contenido',
    value: 'editcontent',
    icon: Writing,
  },
];

export default teacherPageTabList;
