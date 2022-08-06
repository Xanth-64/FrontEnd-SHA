import type { NextPage } from 'next';
import type { GetStaticPropsContext} from 'next';
const Topics: NextPage = () => {
  return <h1>Topics Screen</h1>;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'teacher',
    },
  };
}

export default Topics;
