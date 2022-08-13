import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';
import CardHolder from '../../../components/templates/CardHolder';
import CreateTopicCard from '../../../components/organisms/CreateTopicCard';
import TopNavigation from '../../../components/organisms/TopNavigation';
import { useState } from 'react';
import teacherTopicTabList from '../../../lib/constants/tabLists/teacherTopicTabList';
import CreatePrecedenceCard from '../../../components/organisms/CreatePrecedenceCard';
import PrecedenceGraphCard from '../../../components/organisms/PrecedenceGraphCard';
const Topics: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>(
    teacherTopicTabList[0].value
  );
  return (
    <CardHolder>
      <TopNavigation
        getActiveTab={currentTab}
        setActiveTab={setCurrentTab}
        links={teacherTopicTabList}
      >
        {currentTab === 'createtopics' ? <CreateTopicCard /> : null}
        {currentTab === 'manageprecedences' ? <CreatePrecedenceCard /> : null}
        {currentTab === 'manageprecedences' ? <PrecedenceGraphCard /> : null}
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
