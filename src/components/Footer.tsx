import { Typography, Box } from '@mui/material';
import ContainerFluid from '../components/ContainerFluid';
import { styled, CSSObject } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { RootState } from '../globalRedux/store';

interface FooterProps {
  sx?: CSSObject;
  children?: React.ReactNode;
}

const FooterContent = styled('footer')<FooterProps>(({ theme }) => ({
  paddingTop: 40,
  paddingBottom: 40,
  paddingLeft: 74,
  flex: 1,
  display: "flex",
}));

const FooterContentOpen = styled('section')<FooterProps>(({ theme }) => ({
  paddingTop: 40,
  paddingBottom: 40,
  paddingLeft: 250,
  flex: 1,
  display: "flex",
}));

export default function Footer() {
  const open = useSelector((state: RootState) => state.sidebar.open);
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
    <>
    {!open ? 
    <FooterContent>
      <FooterBody />
    </FooterContent>
    :
    <FooterContentOpen>
      <FooterBody />
    </FooterContentOpen>
    }
</>
  );
}