import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';

const Topic: NextPage = () => {
  return <h1>Topic Screen</h1>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'student',
    },
  };
}

export default Topic;
