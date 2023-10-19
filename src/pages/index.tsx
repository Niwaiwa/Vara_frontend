"use client";

import Link from 'next/link';
import { Container, Box, Typography, Button, Grid, CardMedia } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { GetServerSideProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function HomePage() {
  const { t } = useTranslation();
  return (
    <Container>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h3" gutterBottom>
          Video site Portofolio
        </Typography>
        <Link href="/videos" passHref>
            <Button variant="contained" color="primary">
              Browse videos
            </Button>
        </Link>
      </Box>
    </Container>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const locale = context.locale || 'en';
  return { props: { ...(await serverSideTranslations(locale)) } };
};