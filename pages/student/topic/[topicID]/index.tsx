import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import StudentTemplateCardDisplay from '../../../../components/organisms/StudentTemplateCardDisplay';
import NonSSRWrapper from '../../../../components/overlays/NonSSRWrapper';

const Topic: NextPage = () => {
  const router = useRouter();
  const { topicID } = router.query;
  return (
    <NonSSRWrapper>
      <StudentTemplateCardDisplay topicId={topicID} />
    </NonSSRWrapper>
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

export default Topic;
