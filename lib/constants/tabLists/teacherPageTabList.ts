import topNavigationTab from '../../../types/component_schemas/topNavigationTab';
import { Writing, Ruler2 } from 'tabler-icons-react';

const teacherPageTabList: topNavigationTab[] = [
  {
    label: 'Editar Contenido',
    value: 'editcontent',
    icon: Writing,
  },
  {
    label: 'Configurar Adaptación',
    value: 'configureadaptation',
    icon: Ruler2,
  },
];

export default teacherPageTabList;
