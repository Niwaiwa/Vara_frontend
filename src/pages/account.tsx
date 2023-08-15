import React from 'react';
import ContainerFluid from '../components/ContainerFluid';
import AccountSettingsPage from '@/components/account/AccountSettingsPage';


const AccountPage: React.FC = () => {
  return (
    <ContainerFluid>
        <AccountSettingsPage />
    </ContainerFluid>
  );
};

export default AccountPage;