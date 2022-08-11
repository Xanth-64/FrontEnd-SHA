import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';
import CardHolder from '../../../components/templates/CardHolder';
import CreateTopicCard from '../../../components/organisms/CreateTopicCard';

const Topics: NextPage = () => {
  return (
    <CardHolder>
      <CreateTopicCard />
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
