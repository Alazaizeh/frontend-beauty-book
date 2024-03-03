import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import styled from '@mui/system/styled';
import { Icon } from '@iconify/react';


export default function HeadLine({ Title, TitleIcon, SubTitle,Inv }) {

    const DividerStyled = styled(Divider)(({ theme }) => ({
        borderWidth:Inv?"#fff": 1.5,
        width: '100%',
        borderColor: Inv?"#transparent": theme.palette.secondary.light,
      }));
      const SubDividerStyled = styled(Divider)(({ theme }) => ({
          borderWidth: 1.335,
          width: '100%',
          borderColor: theme.palette.secondary.light,
        }));
      const TypographyStyled = styled('div')(({ theme }) => ({
        backgroundColor: Inv?"#transparent":theme.palette.background.paper,
        color: Inv?"#fff": theme.palette.primary.main,
        padding: theme.spacing(1),
        paddingLeft:0,
        fontWeight: 'bold',
        fontSize: '18px'
      }));
      const SubTypographyStyled = styled('div')(({ theme }) => ({
        backgroundColor:Inv?"#transparent": theme.palette.background.paper,
        color: Inv?"#fff":theme.palette.primary.main,
        padding: theme.spacing(1),
        paddingLeft:0,
        fontWeight: 'bold',
        fontSize: '15px'
      }));
      const VerticalBoxStyled = styled(Box)(({ theme }) => ({
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        width: 'fit-content',
      }));
      
      const BoxStyled = styled(Box)(({ theme }) => ({
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        color:  Inv?"#fff":theme.palette.secondary['400'],
        fontWeight: 'bold',
        fontSize: '18px',
        gap: 10
      }));
  return (
    <VerticalBoxStyled>
      <BoxStyled>
       {TitleIcon && <Icon icon={TitleIcon} />} 
        {SubTitle ? <SubTypographyStyled>{Title}</SubTypographyStyled> : <TypographyStyled>{Title}</TypographyStyled>}
      </BoxStyled>
      {SubTitle ? <SubDividerStyled /> : <DividerStyled />}
    </VerticalBoxStyled>
  );
}
