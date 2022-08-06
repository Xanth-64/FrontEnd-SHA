import navElement from '../../types/component_schemas/navElement';
import {
  Bulb,
  Notebook,
  Ruler2,
  School,
  ChartInfographic,
} from 'tabler-icons-react';
const teacherNavList: navElement[] = [
  {
    link: '/teacher/topics',
    title: 'Gestión de Tópicos',
    color: 'green',
    icon: <Bulb size={16} />,
  },
  {
    link: '/teacher/templates',
    title: 'Gestión de Templates',
    color: 'violet',
    icon: <Notebook size={16} />,
  },
  {
    link: '/teacher/rules',
    title: 'Creación de Reglas',
    color: 'grape',
    icon: <Ruler2 size={16} />,
  },
  {
    link: '/student',
    title: 'Visualizar Curso',
    color: 'blue',
    icon: <School size={16} />,
  },
  {
    link: '/teacher/dashboard',
    title: 'Dashboard',
    color: 'cyan',
    icon: <ChartInfographic size={16} />,
  },
];

export default teacherNavList;
