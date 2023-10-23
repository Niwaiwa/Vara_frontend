import React from 'react';
import ContainerFluid from '../components/ContainerFluid';
import AccountSettingsPage from '@/components/account/AccountSettingsPage';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


const AccountPage: React.FC = () => {
  return (
    <ContainerFluid>
        <AccountSettingsPage />
    </ContainerFluid>
  );
};

export default AccountPage;


export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.locale || 'en';
  return { props: { ...(await serverSideTranslations(locale)) } };
};