import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import CreateTemplateCard from '../../../components/organisms/CreateTemplateCard';
import SelectTopicCard from '../../../components/organisms/SelectTopicCard';
import CardHolder from '../../../components/templates/CardHolder';

const Templates: NextPage = () => {
  const [currentTopic, setCurrentTopic] = useState<string>('');
  return (
    <CardHolder>
      <SelectTopicCard
        getActiveTopic={currentTopic}
        setActiveTopic={setCurrentTopic}
      >
        {currentTopic ? <CreateTemplateCard topic={currentTopic} /> : null}
      </SelectTopicCard>
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

export default Templates;
