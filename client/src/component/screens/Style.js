import styled from '@emotion/styled';
import { Box, Typography, Stack } from '@mui/material';
import React from 'react'
import Bannerimg from './../../assets/images/img1.jpg'


const Banner = styled.div`
background:linear-gradient(rgba(0,0,0,0.5),rgba(255,255,255,0.5)),url(${Bannerimg});
height:80vh;
background-repeat: no-repeat;
background-size: cover;
`;

const Style = () => {
  return (
    <>
    <Banner/> 
    </>
  )
}

export default Style


// export const Image = styled(Box)(() => ({}))

// const Image = styled(Box)(() => ({}))

//cont theme = createTheme({})