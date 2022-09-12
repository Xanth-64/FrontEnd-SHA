import { Card, Select, Stack, Title, Transition } from '@mantine/core';
import { GetServerSidePropsContext, NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CreatePracticeTestCard from '../../../../components/molecules/CreatePracticeTestCard';
import CreateAdaptativeEventCard from '../../../../components/organisms/CreateAdaptativeEventCard';
import TopNavigation from '../../../../components/organisms/TopNavigation';
import CustomLoadingOverlay from '../../../../components/overlays/CustomLoadingOverlay';
import NonSSRWrapper from '../../../../components/overlays/NonSSRWrapper';
import CardHolder from '../../../../components/templates/CardHolder';
import axiosInstance from '../../../../lib/constants/axiosInstance';
import teacherPracticeTestTabList from '../../../../lib/constants/tabLists/teacherPracticeTestTabList';
import ShowFailedNotification from '../../../../lib/utils/ShowFailedNotification';
import practiceTest from '../../../../types/api_schemas/practiceTest';

const PracticeTestDisplay: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>('configureadaptation');
  const [currentPracticeTest, setCurrentPracticeTest] = useState<
    practiceTest | undefined
  >(undefined);
  const [currentQuestionAdaptativeObject, setCurrentQuestionAdaptativeObject] =
    useState<string | null>('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { practiceTestID } = router.query;
  const fetchTestData = () => {
    const inner_function = async () => {
      if (practiceTestID) {
        setLoading(true);
        try {
          const response = await axiosInstance.get(
            `/practice_tests/teacher/${practiceTestID}`
          );
          setCurrentPracticeTest(response.data.data);
        } catch (error: any) {
          ShowFailedNotification(
            'Error al cargar la prueba',
            'Error obteniendo la información de la prueba. Intente nuevamente.'
          );
        }
        setLoading(false);
      }
    };
    inner_function();
  };
  useEffect(fetchTestData, [practiceTestID]);
  return (
    <CardHolder>
      <CustomLoadingOverlay visible={loading} />
      <TopNavigation
        links={teacherPracticeTestTabList}
        getActiveTab={currentTab}
        setActiveTab={setCurrentTab}
      >
        {currentTab === 'configureadaptation' ? (
          <NonSSRWrapper>
            <CardHolder>
              <Card shadow={'sm'} radius={'md'}>
                <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
                  <Title order={2}>Reglas Adaptativas de Prueba</Title>
                </Stack>
              </Card>
              <CreateAdaptativeEventCard
                adaptative_object_id={
                  currentPracticeTest?.page?.adaptative_object_id
                }
                supported_adaptative_events={[
                  'HIGHLIGHT',
                  'OBSCURE',
                  'DISABLE',
                  'HIDE',
                  'NOTIFY_POSITIVE',
                  'NOTIFY_NEGATIVE',
                ]}
                supported_adaptative_variables={[
                  'TOPIC_KNOWLEDGE',
                  'TEMPLATE_KNOWLEDGE',
                  'LEARNING_STYLE_AURAL_AFFINITY',
                  'LEARNING_STYLE_VISUAL_AFFINITY',
                  'LEARNING_STYLE_READING_AFFINITY',
                  'LEARNING_STYLE_KINESTHETIC_AFFINITY',
                ]}
              />
              <Card shadow={'sm'} radius={'md'}>
                <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
                  <Title order={2}>Reglas Adaptativas de Preguntas</Title>
                  <Select
                    data={
                      currentPracticeTest?.test_questions?.map(
                        (testQuestion, questionIndex) => {
                          return {
                            label: `Pregunta ${questionIndex + 1}`,
                            value: testQuestion.adaptative_object_id ?? '',
                          };
                        }
                      ) ?? []
                    }
                    searchable
                    dropdownPosition={'bottom'}
                    withinPortal
                    value={currentQuestionAdaptativeObject}
                    onChange={(value) => {
                      setCurrentQuestionAdaptativeObject(value);
                    }}
                  />
                </Stack>
              </Card>
              <Transition
                mounted={
                  currentQuestionAdaptativeObject !== '' &&
                  currentQuestionAdaptativeObject !== null
                }
                transition="slide-right"
                duration={800}
              >
                {(styles) => {
                  return (
                    <Stack style={styles}>
                      <CreateAdaptativeEventCard
                        adaptative_object_id={
                          currentQuestionAdaptativeObject ?? ''
                        }
                        supported_adaptative_events={[
                          'DISPLAY_HINT',
                          'REDUCE_ALTERNATIVES',
                        ]}
                        supported_adaptative_variables={[
                          'TOPIC_KNOWLEDGE',
                          'TEMPLATE_KNOWLEDGE',
                        ]}
                      />
                    </Stack>
                  );
                }}
              </Transition>
            </CardHolder>
          </NonSSRWrapper>
        ) : null}
        {currentTab === 'edittest' ? (
          <NonSSRWrapper>
            <Stack>
              <CreatePracticeTestCard
                displayContent={true}
                currentPracticeTest={currentPracticeTest}
                refetchData={fetchTestData}
              />
            </Stack>
          </NonSSRWrapper>
        ) : null}
      </TopNavigation>
    </CardHolder>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'teacher',
    },
  };
}

export default PracticeTestDisplay;
