import { Anchor, Card, Stack, Text, Title } from '@mantine/core';
import { getValue } from 'firebase/remote-config';
import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';

import firebaseApp from '../../lib/constants/firebaseApp';
import generateRemoteConfig from '../../lib/constants/firebaseRemoteConfig';

import NonSSRWrapper from '../../components/overlays/NonSSRWrapper';

import CardHolder from '../../components/templates/CardHolder';

import TeacherWelcomeDescriptionCard from '../../components/organisms/TeacherWelcomeDescriptionCard';

const TeacherScreen: NextPage = () => {
  return (
    <NonSSRWrapper>
      <CardHolder>
        <TeacherWelcomeDescriptionCard />
      </CardHolder>
    </NonSSRWrapper>
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

export default TeacherScreen;
