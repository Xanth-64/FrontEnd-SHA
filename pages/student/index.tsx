import { Card, Stack, Text, Title } from '@mantine/core';
import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';

import axiosInstance from '../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../lib/utils/ShowFailedNotification';

import page from '../../types/api_schemas/page';

import CustomLoadingOverlay from '../../components/overlays/CustomLoadingOverlay';
import NonSSRWrapper from '../../components/overlays/NonSSRWrapper';

import CardHolder from '../../components/templates/CardHolder';

import StudentWelcomeDescriptionCard from '../../components/organisms/StudentWelcomeDescriptionCard';

import LearningContentCard from '../../components/molecules/LearningContentCard';
import PracticeTestCard from '../../components/molecules/PracticeTestCard';

const StudentScreen: NextPage = () => {
  const [practiceTestList, setPracticeTestList] = useState<page[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const fetchPracticeTestList = () => {
    const inner_function = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          '/practice_tests/generic/starting_tests',
          {
            params: {
              sort_key: 'relative_position',
            },
          }
        );
        setPracticeTestList(response.data.data.items);
      } catch (error: any) {
        ShowFailedNotification(
          'Error al cargar las pruebas iniciales',
          'Error obteniendo la información de las pruebas iniciales. Intente nuevamente.'
        );
      }
      setLoading(false);
    };
    inner_function();
  };
  useEffect(fetchPracticeTestList, []);
  return (
    <NonSSRWrapper>
      <CardHolder>
        <StudentWelcomeDescriptionCard />
        <CardHolder>
          <CustomLoadingOverlay visible={loading} />
          {practiceTestList.length > 0 ? (
            <>
              <Card shadow={'sm'} radius={'md'}>
                <Stack spacing={'xl'} style={{ padding: '36px 28px' }}>
                  <Title order={2}>Pruebas Iniciales</Title>
                  <Text>
                    A continuación se presentan una serie de pruebas de nivel
                    inicial que puede tomar para medir sus conocimientos.
                  </Text>
                </Stack>
              </Card>
              {practiceTestList.map((page: page) => {
                if (page.learning_content) {
                  return (
                    <LearningContentCard
                      key={page.id}
                      page={page}
                      updatePageList={fetchPracticeTestList}
                    />
                  );
                }
                if (page.practice_test) {
                  return (
                    <PracticeTestCard
                      key={page.id}
                      page={page}
                      updatePageList={fetchPracticeTestList}
                    />
                  );
                }
                return null;
              })}
            </>
          ) : null}
        </CardHolder>
      </CardHolder>
    </NonSSRWrapper>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'student',
    },
  };
}

export default StudentScreen;
