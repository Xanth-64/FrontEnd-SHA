import { Adjustments, Ruler2, SquarePlus } from 'tabler-icons-react';

import topNavigationTab from '../../../types/component_schemas/topNavigationTab';

const teacherTemplateTabList: topNavigationTab[] = [
  {
    label: 'Añadir Páginas',
    value: 'createpages',
    icon: SquarePlus,
  },
  {
    label: 'Configurar Template',
    value: 'configuretemplate',
    icon: Adjustments,
  },
  {
    label: 'Configurar Adaptación',
    value: 'configureadaptation',
    icon: Ruler2,
  },
];

export default teacherTemplateTabList;
