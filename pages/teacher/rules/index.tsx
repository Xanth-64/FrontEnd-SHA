import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';

const Rules: NextPage = () => {
  return <h1>Rules Screen</h1>;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'teacher',
    },
  };
}

export default Rules;
