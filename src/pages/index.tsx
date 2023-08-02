"use client";

import Link from 'next/link';
import { Container, Box, Typography, Button, Grid, CardMedia } from '@mui/material';

export default function HomePage() {
  return (
    <Container>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="60vh">
        <Typography variant="h3" gutterBottom>
          Video site temp
        </Typography>
        <Link href="/portfolio" passHref>
            <Button variant="contained" color="primary">
            Browse site
            </Button>
        </Link>
      </Box>
    </Container>
  );
}