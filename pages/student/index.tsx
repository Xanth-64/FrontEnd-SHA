import type { NextPage } from 'next';
import type { GetStaticPropsContext } from 'next';

const StudentScreen: NextPage = () => {
  return <h1>StudentScreen Screen</h1>;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'student',
    },
  };
}

export default StudentScreen;
