import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';
import CardHolder from '../../../components/templates/CardHolder';
import CreateTopicCard from '../../../components/organisms/CreateTopicCard';
import TopNavigation from '../../../components/organisms/TopNavigation';
import { useState } from 'react';
import teacherTopicTabList from '../../../lib/constants/tabLists/teacherTopicTabList';
import CreatePrecedenceCard from '../../../components/organisms/CreatePrecedenceCard';
import PrecedenceGraphCard from '../../../components/organisms/PrecedenceGraphCard';
import topic from '../../../types/api_schemas/topic';
import prelation from '../../../types/api_schemas/prelation';
import axiosInstance from '../../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../../lib/utils/ShowFailedNotification';
import NonSSRWrapper from '../../../components/overlays/NonSSRWrapper';

const Topics: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>(
    teacherTopicTabList[0].value
  );
  const [graphData, setGraphData] = useState<{
    nodes: topic[];
    links: prelation[];
  }>({ nodes: [], links: [] });
  const [loading, setLoading] = useState<boolean>(false);
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
