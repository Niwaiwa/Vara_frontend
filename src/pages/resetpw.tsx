"use client";

import ResetPWForm from '../components/ResetPWForm';
import ContainerFluid from '../components/ContainerFluid';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export default function resetpwPage() {
  return (
    <ContainerFluid>
        <ResetPWForm />
    </ContainerFluid>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.locale || 'en';
  return { props: { ...(await serverSideTranslations(locale)) } };
};