import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';
import { useEffect, useState } from 'react';

import axiosInstance from '../../../lib/constants/axiosInstance';
import teacherTopicTabList from '../../../lib/constants/tabLists/teacherTopicTabList';
import ShowFailedNotification from '../../../lib/utils/ShowFailedNotification';

import prelation from '../../../types/api_schemas/prelation';
import topic from '../../../types/api_schemas/topic';

import NonSSRWrapper from '../../../components/overlays/NonSSRWrapper';

import CardHolder from '../../../components/templates/CardHolder';

import CreateAdaptativeEventCard from '../../../components/organisms/CreateAdaptativeEventCard';
import CreatePrecedenceCard from '../../../components/organisms/CreatePrecedenceCard';
import CreateTopicCard from '../../../components/organisms/CreateTopicCard';
import PrecedenceGraphCard from '../../../components/organisms/PrecedenceGraphCard';
import SelectTopicCard from '../../../components/organisms/SelectTopicCard';
import TopNavigation from '../../../components/organisms/TopNavigation';

const Topics: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>(
    teacherTopicTabList[0].value
  );
  const [currentTopic, setCurrentTopic] = useState<string>('');
  const [currentAdaptativeObject, setCurrentAdaptativeObject] =
    useState<string>('');
  const [graphData, setGraphData] = useState<{
    nodes: topic[];
    links: prelation[];
  }>({ nodes: [], links: [] });
  const [loading, setLoading] = useState<boolean>(false);
  const fetchTopicDetail = () => {
    const inner_function = async () => {
      if (currentTopic) {
        try {
          const { data } = await axiosInstance.get(`/topics/${currentTopic}`);
          setCurrentAdaptativeObject(data.data.adaptative_object_id);
        } catch (error: any) {
          ShowFailedNotification(
            'Error al recuperar la información del Tópico.',
            'Ocurrió un error inesperado al recuperar la información del tópico. Intente nuevamente.'
          );
        }
      }
    };
    inner_function();
  };
  const fetchTopicsAndPrecedences = () => {
    const inner_function = async () => {
      try {
        const response = await axiosInstance.get('/topics/');
        setGraphData(({ links }) => {
          return {
            nodes: [...response.data.data],
            links: [...links],
          };
        });
      } catch (error) {
        ShowFailedNotification(
          'Error recuperando información de los Tópicos',
          'El grafo de prelaciones no ha podido recuperar la información de los tópicos.'
        );
      }
      try {
        const response = await axiosInstance.get('/topics/prelations/');
        setGraphData(({ nodes }) => {
          return {
            nodes: [...nodes],
            links: [
              ...response.data.data.map((prelation: prelation) => {
                return {
                  id: prelation.id,
                  label: `${prelation.predecessor?.title} -> ${prelation.successor?.title}`,
                  predecessor: prelation.predecessor?.id,
                  successor: prelation.successor?.id,
                };
              }),
            ],
          };
        });
      } catch (error) {
        ShowFailedNotification(
          'Error recuperando información de las prelaciones',
          'El grafo de prelaciones no ha podido recuperar la información de las prelaciones.'
        );
      }
    };
    setLoading(true);
    inner_function();
    setLoading(false);
  };
  useEffect(fetchTopicDetail, [currentTopic]);
  return (
    <CardHolder>
      <TopNavigation
        getActiveTab={currentTab}
        setActiveTab={setCurrentTab}
        links={teacherTopicTabList}
      >
        {currentTab === 'createtopics' ? (
          <NonSSRWrapper>
            <CreateTopicCard />
          </NonSSRWrapper>
        ) : null}
        {currentTab === 'manageprecedences' ? (
          <NonSSRWrapper>
            <CreatePrecedenceCard
              updatePrecedenceGraph={fetchTopicsAndPrecedences}
            />
          </NonSSRWrapper>
        ) : null}
        {currentTab === 'manageprecedences' ? (
          <NonSSRWrapper>
            <PrecedenceGraphCard
              updatePrecedenceGraph={fetchTopicsAndPrecedences}
              graphData={graphData}
              loadingState={loading}
            />
          </NonSSRWrapper>
        ) : null}
        {currentTab === 'configureadaptation' ? (
          <NonSSRWrapper>
            <SelectTopicCard
              getActiveTopic={currentTopic}
              setActiveTopic={setCurrentTopic}
            >
              {currentAdaptativeObject ? (
                <CreateAdaptativeEventCard
                  adaptative_object_id={currentAdaptativeObject}
                  supported_adaptative_events={[
                    'HIGHLIGHT',
                    'OBSCURE',
                    'DISABLE',
                    'HIDE',
                  ]}
                  supported_adaptative_variables={[
                    'TOPIC_KNOWLEDGE',
                    'LEARNING_STYLE_AURAL_AFFINITY',
                    'LEARNING_STYLE_VISUAL_AFFINITY',
                    'LEARNING_STYLE_READING_AFFINITY',
                    'LEARNING_STYLE_KINESTHETIC_AFFINITY',
                  ]}
                />
              ) : null}
            </SelectTopicCard>
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

export default Topics;
