import type { NextPage } from 'next';
import type { GetStaticPropsContext } from 'next';

const TeacherScreen: NextPage = () => {
  return <h1>TeacherScreen Screen</h1>;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'teacher',
    },
  };
}

export default TeacherScreen;
