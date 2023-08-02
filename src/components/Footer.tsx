import { Typography, Box } from '@mui/material';

export default function Footer() {
  return (
    <Box mt={5} py={3} textAlign="center">
      <Typography variant="body2" color="text.secondary">
        © 2023 Niwa graden
      </Typography>
    </Box>
  );
}