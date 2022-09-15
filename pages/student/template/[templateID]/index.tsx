import type { NextPage } from 'next';
import type { GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NonSSRWrapper from '../../../../components/overlays/NonSSRWrapper';
import axiosInstance from '../../../../lib/constants/axiosInstance';
import ShowFailedNotification from '../../../../lib/utils/ShowFailedNotification';
import template from '../../../../types/api_schemas/template';
import TemplatePageDisplay from '../../../../components/organisms/TemplatePageDisplay';
import CardHolder from '../../../../components/templates/CardHolder';
import StudentTemplateCard from '../../../../components/molecules/StudentTemplateCard';

const Template: NextPage = () => {
  const router = useRouter();
  const { templateID } = router.query;
  const [loading, setLoading] = useState<boolean>(false);
  const [currentTemplate, setCurrentTemplate] = useState<template>();
  const fetchTemplate = () => {
    const inner_function = async () => {
      setLoading(true);
      try {
        const { data } = await axiosInstance.get(`/templates/${templateID}`);
        setCurrentTemplate(data.data);
      } catch (error: any) {
        ShowFailedNotification(
          'Error al cargar el template',
          'Error obteniendo la información del template. Intente nuevamente.'
        );
      }
      setLoading(false);
    };
    inner_function();
  };
  useEffect(fetchTemplate, [templateID]);
  return (
    <NonSSRWrapper>
      <CardHolder>
        {currentTemplate ? (
          <StudentTemplateCard template={currentTemplate} displayHeaderImage />
        ) : null}
        <TemplatePageDisplay
          currentTemplate={currentTemplate}
          loading={loading}
        />
      </CardHolder>
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

export default Template;
