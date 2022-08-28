import { Button, Menu } from '@mantine/core';
import { useEffect, useState } from 'react';
import { Notes, Plus, QuestionMark } from 'tabler-icons-react';
import axiosInstance from '../../lib/constants/axiosInstance';
import useUser from '../../lib/hooks/useUser';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';
import page from '../../types/api_schemas/page';
import templatePageDisplayProps from '../../types/component_schemas/templatePageDisplayProps';
import CreateLearningContentCard from '../molecules/CreateLearningContentCard';
import CreatePracticeTestCard from '../molecules/CreatePracticeTestCard';
import LearningContentCard from '../molecules/LearningContentCard';
import PracticeTestCard from '../molecules/PracticeTestCard';
import CustomLoadingOverlay from '../overlays/CustomLoadingOverlay';
import CardHolder from '../templates/CardHolder';
const TemplatePageDisplay = ({
  currentTemplate,
  loading,
}: templatePageDisplayProps) => {
  const { user } = useUser();
  const role_name = user?.role[0].role_name;
  const [pageList, setPageList] = useState<page[]>([]);
  const [componentLoading, setComponentLoading] = useState<boolean>(false);
  const [displayLearningContentCard, setDisplayLearningContentCard] =
    useState<boolean>(false);
  const [displayPracticeTestCard, setDisplayPracticeTestCard] =
    useState<boolean>(false);

  const openLearningContentCard = () => {
    setDisplayPracticeTestCard(false);
    setDisplayLearningContentCard(true);
  };
  const openPracticeTestCard = () => {
    setDisplayLearningContentCard(false);
    setDisplayPracticeTestCard(true);
  };

  const fetchTemplatePages = () => {
    const inner_function = async () => {
      setComponentLoading(true);
      try {
        const templateId = currentTemplate?.id;
        if (templateId) {
          const response = await axiosInstance.get('/pages/with_pagination', {
            params: {
              sort_key: 'relative_position',
              template_id: templateId,
            },
          });
          setPageList(response.data.data.items);
        }
      } catch (error: any) {
        ShowFailedNotification(
          'Error al cargar las paginas de contenido',
          'Error obteniendo la información de las paginas de contenido. Intente nuevamente.'
        );
      }
      setComponentLoading(false);
    };
    inner_function();
  };
  useEffect(fetchTemplatePages, [
    currentTemplate,
    displayLearningContentCard,
    displayPracticeTestCard,
  ]);
  return (
    <>
      <CustomLoadingOverlay visible={loading || componentLoading} />
      <CardHolder>
        {role_name === 'teacher' ? (
          <>
            <CreateLearningContentCard
              displayContent={displayLearningContentCard}
              onClose={() => {
                setDisplayLearningContentCard(false);
              }}
              currentTemplate={currentTemplate}
            />
            <CreatePracticeTestCard
              displayContent={displayPracticeTestCard}
              onClose={() => {
                setDisplayPracticeTestCard(false);
              }}
              currentTemplate={currentTemplate}
            />
          </>
        ) : null}

        {pageList.length > 0
          ? pageList.map((page: page) => {
              if (page.learning_content) {
                return (
                  <LearningContentCard
                    key={page.id}
                    page={page}
                    updatePageList={fetchTemplatePages}
                  />
                );
              }
              if (page.practice_test) {
                return (
                  <PracticeTestCard
                    key={page.id}
                    page={page}
                    updatePageList={fetchTemplatePages}
                  />
                );
              }
              return null;
            })
          : null}
        {role_name === 'teacher' ? (
          <Menu>
            <Menu.Target>
              <Button
                radius={'lg'}
                color="orange"
                leftIcon={<Plus size={25} />}
                fullWidth
              >
                Nueva Página
              </Button>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item
                onClick={openLearningContentCard}
                icon={<Notes size={18} />}
              >
                Crear Contenido de Aprendizaje
              </Menu.Item>
              <Menu.Item
                onClick={openPracticeTestCard}
                icon={<QuestionMark size={18} />}
              >
                Crear Prueba de Práctica
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : null}
      </CardHolder>
    </>
  );
};

export default TemplatePageDisplay;
