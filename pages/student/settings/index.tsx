import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';
import ChangePasswordCard from '../../../components/organisms/ChangePasswordCard';
import TweakProfileCard from '../../../components/organisms/TweakProfileCard';
import CardHolder from '../../../components/templates/CardHolder';

const Settings: NextPage = () => {
  return (
    <CardHolder>
      <TweakProfileCard />
      <ChangePasswordCard />
    </CardHolder>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'student',
    },
  };
}

export default Settings;
