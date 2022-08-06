import type { NextPage } from 'next';
import type { GetStaticPropsContext} from 'next';

const Settings: NextPage = () => {
  return <h1>Settings Screen</h1>;
};

export async function getStaticProps(context: GetStaticPropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'student',
    },
  };
}

export default Settings;
