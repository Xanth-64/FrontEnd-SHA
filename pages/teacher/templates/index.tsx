import type { NextPage } from 'next';
import type { GetStaticPropsContext } from 'next';

const Templates: NextPage = () => {
  return <h1>Templates Screen</h1>;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'teacher',
    },
  };
}

export default Templates;
