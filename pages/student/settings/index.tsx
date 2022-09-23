import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';

import CardHolder from '../../../components/templates/CardHolder';

import ChangePasswordCard from '../../../components/organisms/ChangePasswordCard';
import TweakProfileCard from '../../../components/organisms/TweakProfileCard';

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
