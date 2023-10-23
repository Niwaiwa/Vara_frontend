"use client";

import RegisterForm from '../components/RegisterForm';
import ContainerFluid from '../components/ContainerFluid';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';


export default function RegisterPage() {
  return (
    <ContainerFluid>
        <RegisterForm />
    </ContainerFluid>
  );
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.locale || 'en';
  return { props: { ...(await serverSideTranslations(locale)) } };
};