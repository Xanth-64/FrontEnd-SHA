import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';
import CardHolder from '../../../../components/templates/CardHolder';
import TopNavigation from '../../../../components/organisms/TopNavigation';
import { useState } from 'react';
import teacherTemplateTabList from '../../../../lib/constants/tabLists/teacherTemplateTabList';
import TemplatePageDisplay from '../../../../components/organisms/TemplatePageDisplay';
import TemplateInfoEditorCard from '../../../../components/organisms/TemplateInfoEditorCard';
import TemplateAdaptationCard from '../../../../components/organisms/TemplateAdaptationCard';
import TemplateInitialTestCard from '../../../../components/organisms/TemplateInitialTestCard';
import TemplateRulesCard from '../../../../components/organisms/TemplateRulesCard';
const TemplateDetail: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>(
    teacherTemplateTabList[0].value
  );
  return (
    <CardHolder>
      <TopNavigation
        links={teacherTemplateTabList}
        getActiveTab={currentTab}
        setActiveTab={setCurrentTab}
      >
        {currentTab === 'createpages' ? <TemplatePageDisplay /> : null}
        {currentTab === 'configuretemplate' ? (
          <>
            <TemplateInfoEditorCard />
            <TemplateAdaptationCard />
            <TemplateInitialTestCard />
          </>
        ) : null}
        {currentTab === 'configureadaptation' ? (
          <>
            <TemplateRulesCard />
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

export default TemplateDetail;
