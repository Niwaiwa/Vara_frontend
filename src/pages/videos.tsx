import React from 'react';
import ContainerFluid from '../components/ContainerFluid';
import VideosPage from '../components/videos/VideosPage';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'; 


const Videos: React.FC = () => {
  return (
    <ContainerFluid>
      <VideosPage />
    </ContainerFluid>
  );
};

export default Videos;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.locale || 'en';
  return { props: { ...(await serverSideTranslations(locale)) } };
};