import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';

const Templates: NextPage = () => {
  return <h1>Templates Screen</h1>;
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
