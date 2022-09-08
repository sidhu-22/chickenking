import styled from '@emotion/styled';
import { Box, Typography, Stack, Container, Grid, Button, Divider, IconButton } from '@mui/material';
import React from 'react'
import Footerimage from './../../assets/images/footerimg2.jpg'
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';


const Banner = styled.div`
background:linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.4),rgba(255,118,2,0.9)),url(${Footerimage});
height:100%;
background-repeat: no-repeat;
background-size: cover;

`;

const FooterStyle = () => {
  return (
    <>
    <Banner>
        <Container sx={{pt:8,pb:4}}>
            <Grid container spacing={2} sx={{display:'flex',justifyContent:'center'}}>
                <Grid item xs={10}>
                    <Typography variant='h6' color="white" sx={{textAlign:'center'}}>Want to Partner with us??</Typography>
                </Grid>
                <Grid item xs={10}>
                    <Typography color="white" sx={{textAlign:'center'}}> Lorem ipsum dolor sit amet consectetur, adipisicing elit. Id hic, ex aspernatur iusto error corporis omnis itaque ullam nemo eum temporibus optio nihil eos architecto corrupti, laboriosam rerum et quae.  </Typography>
                </Grid>
                <Grid item xs={10} sx={{display:'flex',justifyContent:'center'}}>
                    <Button variant='contained' color='warning' > Get Started </Button>
                </Grid>

               
            </Grid>

            <Divider color="white" sx={{paddingY:'1px',marginY:'20px'}}/>

            <Grid container spacing={1} sx={{display:'flex',justifyContent:{xs:'flex-start',md:'center'}}}>
                <Grid item xs={6} sm={3} md={2} sx={{color:'white'}}>
                    <Typography variant='h6'>Company</Typography>
                    <Typography variant="body2">About</Typography>
                    <Typography variant="body2">Care</Typography> 
                </Grid>  
                <Grid item xs={6} sm={3} md={2} sx={{color:'white'}}>
                    <Typography variant='h6'> Legal </Typography>
                    <Typography variant="body2">Terms and Condition</Typography>
                    <Typography variant="body2">Disclaimer</Typography>
                    <Typography variant="body2">Caution notice</Typography>
                </Grid>
                <Grid item xs={6} sm={3} md={2} sx={{color:'white'}}>
                    <Typography variant='h6'> Terms </Typography>
                    <Typography variant="body2">Terms and Condition</Typography>
                    <Typography variant="body2">Privacy Policy</Typography>
                    <Typography variant="body2">Disclaimer</Typography>
                    <Typography variant="body2">Caution notice</Typography>
                </Grid>   
                <Grid item xs={6} sm={3} md={2} sx={{color:'white'}}>
                    <Typography variant='h6'> Support </Typography>
                    <Typography variant="body2">Get Help</Typography>
                    <Typography variant="body2">Feedback</Typography>
                    <Typography variant="body2">Contact us</Typography>
                    <Typography variant="body2">Privacy Policy</Typography>
                </Grid >       
                
             

            </Grid>

            <Divider color="white" sx={{paddingY:'1px',marginY:'20px'}}/>

            <Grid container spacing={2} sx={{color:'white'}}>
                <Grid item xs={12} md={6} sx={{display:'flex',justifyContent:{xs:'center',md:'flex-start'}}}>
                    <Typography variant='p'>Copyright © KFC Corporation 2021 All Rights Reserved</Typography>
                </Grid>

                <Grid item xs={12} md={6} sx={{display:'flex',justifyContent:{xs:'center',md:'flex-end'}}}>               
                        <FacebookIcon sx={{mr:2}}/>                                      
                        <InstagramIcon sx={{mr:2}} />                                      
                        <TwitterIcon sx={{mr:2}} />                 
                        <YouTubeIcon/>                    
                </Grid>
            </Grid>
        </Container>
    </Banner>
    </>
  )
}

export default FooterStyle

    
