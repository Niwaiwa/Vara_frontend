import React from 'react';
import ContainerFluid from '../components/ContainerFluid';
import FriendPage from '@/components/friend/FriendPage';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const Friend: React.FC = () => {
  return (
    <ContainerFluid>
      <FriendPage />
    </ContainerFluid>
  );
};

export default Friend;


export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.locale || 'en';
  return { props: { ...(await serverSideTranslations(locale)) } };
};