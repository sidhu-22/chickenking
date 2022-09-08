import React, { useContext, useState } from "react";
import { GlobalContext } from "./../../GlobalContext";
import axios from "axios";
import { Container, Grid, Typography, Card, CardMedia, CardContent, CardHeader, Divider, Button } from '@mui/material';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import PhoneAndroidRoundedIcon from '@mui/icons-material/PhoneAndroidRounded';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import ShoppingCartRoundedIcon from '@mui/icons-material/ShoppingCartRounded';
import { NavLink } from 'react-router-dom';

function Profile(props) {
  const data = useContext(GlobalContext);
  const [user] = data.authApi.userData;
  const [isUser] = data.authApi.isUser;

  const [isEdit,setEdit] = useState(false)

  const toggleEdit = () => {
    setEdit(!isEdit)
  }

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12} textAlign="center">
          <Typography sx={{py:2}} variant="h4">
            My Profile
          </Typography>
        </Grid>

        <Grid item xs={12} sm={4} md={4}>
         <Card sx={{height:'350px'}}>
         {user.image ? (
          <CardMedia component='img' image={user.image.url} alt={user.name} />  
            ) : (
              <CardContent> 
                <Typography variant="h5"> No image found </Typography>
              </CardContent>
            )}
         </Card>
        </Grid>

        <Grid item xs={12} sm={8} md={8} >
          <Card sx={{height:'350px'}} >
            <CardHeader component="h1" sx={{textAlign:'center',textTransform:"capitalize", background:'rgb(240,230,140)' }} title={user.name} />
            
            <CardContent>
              <div style={{display:'flex',justifyContent:'space-between',padding:'10px'}}>
                <Typography><EmailRoundedIcon/> <strong>Email</strong> </Typography>
                <span>{user.email}</span>
              </div>
              <Divider/>

              <div style={{display:'flex',justifyContent:'space-between',padding:'10px'}}>
                <Typography><PhoneAndroidRoundedIcon/> <strong>Mobile</strong> </Typography>
                <span>{user.mobile}</span>
              </div>
              <Divider/>

              <div style={{display:'flex',justifyContent:'space-between',padding:'10px'}}>
                <Typography><PersonRoundedIcon/> <strong>Role</strong> </Typography>
                <span>{user.role}</span>
              </div>
              <Divider/>

              {
                  isUser ? (
                    <div style={{display:'flex',justifyContent:'space-between',padding:'10px'}}>
                      <Typography> <ShoppingCartRoundedIcon/><strong>Orders</strong></Typography>
                      <span>{user.orders.length}</span>
                    </div>
                  ): null
              }

              <Divider color='black' />

              <NavLink style={{textDecoration:'none'}} to={`/profile/update/${user._id}`}>
                <div style={{padding:'10px'}}>
                  <Button variant="contained" color="warning">Edit</Button>
                </div>
              </NavLink>

            </CardContent>
          </Card>

        </Grid>

      </Grid>

      

      
    </Container>
  );
}

export default Profile;
