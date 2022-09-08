import React from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import Style from "./Style";
import Chickencard from "./../../assets/images/chicken.png";
import OrderOnline from "./../../assets/images/orderonline.jpg";
import NightDine from "./../../assets/images/nightdine.jpg";
import Dinein  from "./../../assets/images/dining.jpg";

//browse cat photos
import Bc1  from "./../../assets/images/bc1.jpg";
import Bc2  from "./../../assets/images/bc2.jpg";
import Bc3  from "./../../assets/images/bc3.jpg";
import Bc4  from "./../../assets/images/bc4.jpg";
import Bc5  from "./../../assets/images/bc5.jpg";
import Bc6  from "./../../assets/images/bc6.jpg";

import { Link,NavLink } from "react-router-dom";
import Footer from "./Footer";

function Home() {
  return (
    <>
      <Style />
      <Container>
        <Grid container spacing={4} py={5}>
          <Grid item xs={12} sm={4} md={4}>
            <Card sx={{borderRadius:'20px'}}>
              <CardMedia component="img" height='200px' image={OrderOnline}/>
              <CardContent>
                <Typography variant='h6'>Order Online</Typography>
                <Typography variant='p' color='gray'>Stay Home and Order to your Doorstep</Typography>
              </CardContent>
            </Card>
        </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <Card sx={{borderRadius:'20px'}}>
              <CardMedia component="img" height='200px' image={Dinein}/>
              <CardContent>
                <Typography variant='h6'>Dining</Typography>
                <Typography variant='p' color='gray'>Chill and enjoy our Ambience</Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={4} md={4}>
            <Card sx={{borderRadius:'20px'}}>
              <CardMedia component="img" height='200px' image={NightDine}/>
              <CardContent>
                <Typography variant='h6'>NightLife and Clubs</Typography>
                <Typography variant='p' color='gray'>Explore the city's top nightlife outlets</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
      </Container>

      <Container sx={{pb:5}}>
        <Box
        sx={{
            display: "flex",
            justifyContent: { xs: "center", md: "flex-start" },
            alignItems: "center",
            paddingTop:'80px',
        }}
        >
        <Typography
            component="h4"
            variant="h4"
            sx={{ textTransform: "uppercase" }}
        >
            Browse Categories
        </Typography> 
        </Box>

        <Divider color='black' sx={{mt:2,mb:4}} />

        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius:'20px' }}>
              <CardMedia component="img" sx={{height:'200px'}} image="https://res.cloudinary.com/sid-waycool/image/upload/v1661320739/sid%20waycool/bc1_rykfkm.jpg" />
              <CardContent sx={{ background:'rgb(240,230,140)' }}>
                <NavLink  to={"/Menu"} style={{textDecoration:'none','&:hover':{color:'black'}}}>
                <Typography sx={{color:"black",textAlign:'center'}}>HOT DEALS</Typography>
                </NavLink>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius:'20px' }}>
              <CardMedia component="img" sx={{height:'200px'}} image="https://res.cloudinary.com/sid-waycool/image/upload/v1661320738/sid%20waycool/bc2_izshs1.jpg" />
              <CardContent sx={{ background:'rgb(240,230,140)' }}>
              <NavLink  to={"/Menu"} style={{textDecoration:'none','&:hover':{color:'black'}}}>
                <Typography sx={{color:"black",textAlign:'center'}}>CHICKEN BUCKET</Typography>
                </NavLink>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ borderRadius:'20px' }}>
              <CardMedia component="img" sx={{height:'200px'}} image="https://res.cloudinary.com/sid-waycool/image/upload/v1661320739/sid%20waycool/bc3_xwjtmh.jpg" />
              <CardContent sx={{ background:'rgb(240,230,140)' }}>
              <NavLink  to={"/Menu"} style={{textDecoration:'none','&:hover':{color:'black'}}}>
                <Typography sx={{color:"black",textAlign:'center'}}>BURGER</Typography>
                </NavLink>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card  sx={{ borderRadius:'20px' }}>
              <CardMedia component="img" sx={{height:'200px'}} image="https://res.cloudinary.com/sid-waycool/image/upload/v1661320740/sid%20waycool/bc4_dqxhqu.jpg" />
              <CardContent sx={{ background:'rgb(240,230,140)' }}>
              <NavLink  to={"/Menu"} style={{textDecoration:'none','&:hover':{color:'black'}}}>
                <Typography sx={{color:"black",textAlign:'center'}}>PIZZA</Typography>
                </NavLink>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card  sx={{ borderRadius:'20px' }}>
              <CardMedia component="img" sx={{height:'200px'}} image="https://res.cloudinary.com/sid-waycool/image/upload/v1661320740/sid%20waycool/bc5_kdyqfm.jpg" />
              <CardContent sx={{ background:'rgb(240,230,140)' }}>
              <NavLink  to={"/Menu"} style={{textDecoration:'none','&:hover':{color:'black'}}}>
                <Typography sx={{color:"black",textAlign:'center'}}>SNACKS</Typography>
                </NavLink>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card  sx={{ borderRadius:'20px' }}>
              <CardMedia component="img" sx={{height:'200px'}} image="https://res.cloudinary.com/sid-waycool/image/upload/v1661320740/sid%20waycool/bc6_frnfet.jpg" />
              <CardContent sx={{background:'rgb(240,230,140)'}}>
              <NavLink  to={"/Menu"} style={{textDecoration:'none','&:hover':{color:'black'}}}>
                <Typography sx={{color:"black",textAlign:'center'}}>HOT LAUNCHES</Typography>
                </NavLink>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Footer/>

    </>
  );
}

export default Home;
