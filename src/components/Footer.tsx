import { Typography, Box } from '@mui/material';
import ContainerFluid from '../components/ContainerFluid';
import { styled, CSSObject } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../globalRedux/store';


export default function Footer() {
  const FooterBody = () => {
    return (
      <ContainerFluid>
        <Box mt={5} py={3} textAlign="center">
          <Typography variant="body2" color="text.secondary">
            © 2023 Niwa graden
          </Typography>
        </Box>
      </ContainerFluid>
    )
  };
  
  return (
    <FooterBody />
  );
}