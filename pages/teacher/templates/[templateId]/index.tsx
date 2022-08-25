import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';
import CardHolder from '../../../../components/templates/CardHolder';
import TopNavigation from '../../../../components/organisms/TopNavigation';
import { useEffect, useState } from 'react';
import teacherTemplateTabList from '../../../../lib/constants/tabLists/teacherTemplateTabList';
import TemplatePageDisplay from '../../../../components/organisms/TemplatePageDisplay';
import TemplateInfoEditorCard from '../../../../components/organisms/TemplateInfoEditorCard';
import TemplateAdaptationCard from '../../../../components/organisms/TemplateAdaptationCard';
import TemplateInitialTestCard from '../../../../components/organisms/TemplateInitialTestCard';
import TemplateRulesCard from '../../../../components/organisms/TemplateRulesCard';
import NonSSRWrapper from '../../../../components/overlays/NonSSRWrapper';
import template from '../../../../types/api_schemas/template';
import { useRouter } from 'next/router';
import ShowFailedNotification from '../../../../lib/utils/ShowFailedNotification';
import axiosInstance from '../../../../lib/constants/axiosInstance';
const TemplateDetail: NextPage = () => {
  const [currentTab, setCurrentTab] = useState<string>(
    teacherTemplateTabList[0].value
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [currentTemplate, setCurrentTemplate] = useState<template | undefined>(
    undefined
  );
  const router = useRouter();
  const { templateId } = router.query;
  const fetchTemplate = () => {
    const inner_function = async () => {
      if (templateId) {
        setLoading(true);
        try {
          const response = await axiosInstance.get(`/templates/${templateId}`);
          setCurrentTemplate(response.data.data);
        } catch (error: any) {
          ShowFailedNotification(
            'Error al cargar el template',
            'Error obteniendo la información del template. Intente nuevamente.'
          );
        }
        setLoading(false);
      }
    };
    inner_function();
  };
  useEffect(fetchTemplate, [templateId]);
  return (
    <CardHolder>
      <TopNavigation
        links={teacherTemplateTabList}
        getActiveTab={currentTab}
        setActiveTab={setCurrentTab}
      >
        {currentTab === 'createpages' ? (
          <NonSSRWrapper>
            <TemplatePageDisplay
              currentTemplate={currentTemplate}
              loading={loading}
            />
          </NonSSRWrapper>
        ) : null}
        {currentTab === 'configuretemplate' ? (
          <>
            <NonSSRWrapper>
              <TemplateInfoEditorCard
                currentTemplate={currentTemplate}
                loading={loading}
                fetchTemplate={fetchTemplate}
              />
              <TemplateAdaptationCard
                currentTemplate={currentTemplate}
                loading={loading}
                fetchTemplate={fetchTemplate}
              />
              <TemplateInitialTestCard
                currentTemplate={currentTemplate}
                loading={loading}
                fetchTemplate={fetchTemplate}
              />
            </NonSSRWrapper>
          </>
        ) : null}
        {currentTab === 'configureadaptation' ? (
          <>
            <NonSSRWrapper>
              <TemplateRulesCard />
            </NonSSRWrapper>
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
