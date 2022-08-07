import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';

const Template: NextPage = () => {
  return <h1>Template Screen</h1>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'student',
    },
  };
}

export default Template;
