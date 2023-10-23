"use client";

import LoginForm from '../components/LoginForm';
import ContainerFluid from '../components/ContainerFluid';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export default function LoginPage() {
  return (
    <ContainerFluid>
        <LoginForm />
    </ContainerFluid>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.locale || 'en';
  return { props: { ...(await serverSideTranslations(locale)) } };
};