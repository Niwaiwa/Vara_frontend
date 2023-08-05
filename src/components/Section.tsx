import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../globalRedux/store';


interface SectionProps {
    sx?: CSSObject;
    children?: React.ReactNode;
}

const SectionContent = styled('section')<SectionProps>(({ theme }) => ({
    paddingTop: "100px!important" as any,
    paddingBottom: 40,
    paddingLeft: 74,
    flex: 1,
    display: "flex",
}));

const SectionContentOpen = styled('section')<SectionProps>(({ theme }) => ({
    paddingTop: "100px!important" as any,
    paddingBottom: 40,
    paddingLeft: 250,
    flex: 1,
    display: "flex",
}));


const Section = (props: SectionProps) => {
    const open = useSelector((state: RootState) => state.sidebar.open);

    return (
        <>
            {!open ? 
            <SectionContent>
                {props.children}
            </SectionContent>
            :
            <SectionContentOpen>
                {props.children}
            </SectionContentOpen>
            }
        </>
    );
}





export default Section;