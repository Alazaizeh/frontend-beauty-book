import React from 'react'
import {  
    Button,
    Stack,
    Typography,
    useTheme,
} from '@mui/material'
import { Link } from 'react-router-dom'
const Paragraph = ({ text, maxWidth, mx, textAlign }) => {
    return (
      <Typography
      sx={{
        maxWidth: maxWidth,
        mx: mx,
        textAlign: textAlign,
        py: 3,
        color: '#7b7b7b',
      }}
      >
          {text}
      </Typography>
    )
  }
  const Title = ({ text, textAlign }) => {
    return (
      <Typography 
      variant='h4'
      component='h3'
      sx={{ 
        fontWeight: '700',
        textAlign: textAlign,
     }}
      >
        {text}
      </Typography>
    )
  }
const GetInTouch = () => {

    const theme = useTheme();

    return (
        <Stack 
        component='section'
        bgcolor={theme.palette.primary.light}
        direction="column"
        justifyContent= 'center'
        alignItems='center'
        sx={{
            py: 10,
        }}
        >
            <Title 
            text={
                'Own a hair & beauty business? Bring it online.'
                } 
            textAlign={'center'}
            />
            <Paragraph 
            text={
                 `Supercharge your business for free with the world's top booking platform for salons and spas. Independently voted no. 1 by industry professionals. `
            }
            maxWidth = {'sm'}
            mx={0}
            textAlign={'center'}
            />
        </Stack>
    )
}

export default GetInTouch;