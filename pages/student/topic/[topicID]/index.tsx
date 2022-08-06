import type { NextPage } from 'next';
import type { GetStaticPropsContext} from 'next';

const Topic: NextPage = () => {
  return <h1>Topic Screen</h1>;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'student',
    },
  };
}

export default Topic;
