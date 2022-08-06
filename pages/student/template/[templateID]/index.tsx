import type { NextPage } from 'next';
import type { GetStaticPropsContext} from 'next';

const Template: NextPage = () => {
  return <h1>Template Screen</h1>;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'student',
    },
  };
}

export default Template;
