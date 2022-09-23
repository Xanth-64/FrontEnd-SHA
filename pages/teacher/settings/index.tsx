import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';

import NonSSRWrapper from '../../../components/overlays/NonSSRWrapper';

import CardHolder from '../../../components/templates/CardHolder';

import ChangePasswordCard from '../../../components/organisms/ChangePasswordCard';
import EnableInstructorsCard from '../../../components/organisms/EnableInstructorsCard';
import TweakProfileCard from '../../../components/organisms/TweakProfileCard';

const Settings: NextPage = () => {
  return (
    <CardHolder>
      <TweakProfileCard />
      <ChangePasswordCard />
      <NonSSRWrapper>
        <EnableInstructorsCard />
      </NonSSRWrapper>
    </CardHolder>
  );
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      protected: true,
      expected_role: 'teacher',
    },
  };
}

export default Settings;
