
import { styled } from '@mui/material/styles';

const DivFluid = styled('div')(({ theme }) => ({
    display: "flex",
    flexDirection: "column",
    maxWidth: 1200,
    marginRight: "auto",
    marginLeft: "auto",
    paddingRight: 15,
    paddingLeft: 15,
    width: "100%",
}));

export default function ContainerFluid(props: any) {
  return (
    <DivFluid>
        {props.children}
    </DivFluid>
  );
}