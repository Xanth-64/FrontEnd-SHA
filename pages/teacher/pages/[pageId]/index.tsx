import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';
import { useState } from 'react';
import EditPageContentCard from '../../../../components/organisms/EditPageContentCard';
import PageInteractionsCard from '../../../../components/organisms/PageInteractionsCard';
import PageRulesCard from '../../../../components/organisms/PageRulesCard';
import TopNavigation from '../../../../components/organisms/TopNavigation';
import CardHolder from '../../../../components/templates/CardHolder';
import teacherPageTabList from '../../../../lib/constants/tabLists/teacherPageTabList';

const PageDisplay: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>(
    teacherPageTabList[0].value
  );
  return (
    <CardHolder>
      <TopNavigation
        links={teacherPageTabList}
        getActiveTab={currentTab}
        setActiveTab={setCurrentTab}
      >
        {currentTab === 'editcontent' ? <EditPageContentCard /> : null}
        {currentTab === 'configureadaptation' ? (
          <>
            <PageInteractionsCard />
            <PageRulesCard />
          </>
        ) : null}
      </TopNavigation>
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

export default PageDisplay;
