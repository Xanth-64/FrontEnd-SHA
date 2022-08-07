import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';

const TeacherScreen: NextPage = () => {
  return <h1>TeacherScreen Screen</h1>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'teacher',
    },
  };
}

export default TeacherScreen;
