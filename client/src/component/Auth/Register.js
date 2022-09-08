import React, { useState } from 'react'
import { Container, Grid, Paper, TextField, Stack, Button, Box, Typography } from '@mui/material';
import HowToRegSharpIcon from '@mui/icons-material/HowToRegSharp';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function Register(props) {
  const [user,setUser] = useState({
    email:"",
    password:"",
    name:"",
    mobile:""
  }) 

  const navigate = useNavigate();

  const [valName,setValName] = useState('');
  const [valEmail,setValEmail] = useState('');
  const [valMobile,setValMobile] = useState('');
  const [valPassword,setValPassword] = useState('');

  const [formError,setFormError] = useState(false);

  const readValue = (e) =>{
    const { name, value } = e.target;
    setUser({...user, [name]:value})
  }

  const submitHandler = async(e)=>{
    e.preventDefault();

    if(valName.length == 0 || valEmail.length==0 || valMobile.length==0 || valPassword.length==0){
      setFormError(true);
    }

    /*
                if(valName && valEmail && valMobile && valAddress){ 
                  UserApi.create(data).then(res=>{
                  toast.success('user created successfully');
                  navigate("/");
                }).catch(err => toast.error(err.message));
              }else{
                toast.error("error")
              }  
     */

    /* org data
     try{
      await axios.post(`/api/v1/auth/register`,user).then(res =>{
        toast.success("user registered successfully")
        navigate('/')
      }).catch(err => toast.error(err.response.data.msg));
    }catch(error){
      toast.error(error.response.data.msg)
    } */


    try{
      if(valName && valEmail && valMobile && valPassword){
        await axios.post(`/api/v1/auth/register`,user).then(res =>{
          toast.success("user registered successfully")
          navigate('/')
        }).catch(err => toast.error(err.response.data.msg));
      } else{
        toast.error("error")
      }  
    }catch(error){
      toast.error(error.response.data.msg)
    }
  }


  return (
    <Container>
      <Grid container sx={{display:'flex',justifyContent:'center',my:10}} >
        <Grid item xs={12} md={6}>
         <Paper elevation={10}>
          <Stack component='form' onSubmit={submitHandler} spacing={2} sx={{padding:2}}>
            <Box sx={{flexGrow:1,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
              <Typography variant="h4">
                Register
              </Typography>
              <HowToRegSharpIcon color='warning' fontSize='large'/>
            </Box>
            <TextField color="secondary" label="Name" type="text" name='name' value={user.name} onChange={readValue} onBlur={e=>setValName(e.target.value)}   />
              {formError && valName.length<=0 ?
                <Typography variant='p' color='error' >Name must be filled</Typography> : ""}

            <TextField color="secondary" label="Email" type="email" name='email' value={user.email} onChange={readValue} onBlur={e=>setValEmail(e.target.value)}   />
            {formError && valEmail.length<=0 ?
                <Typography variant='p' color='error' >Email must be filled</Typography> : ""}

            <TextField color="secondary" label="Mobile" type="number" name='mobile' value={user.mobile} onChange={readValue} onBlur={e=>setValMobile(e.target.value)}  />
            {formError && valMobile.length<=0 ?
                <Typography variant='p' color='error' >Mobile number must be filled</Typography> : ""}

            <TextField color="secondary" label="Password" type='password' name='password' value={user.password} onChange={readValue} onBlur={e=>setValPassword(e.target.value)}  />
            {formError && valPassword.length<=0 ?
                <Typography variant='p' color='error' >Password must be filled</Typography> : ""}

            <Box sx={{display:'flex',justifyContent:'center'}}>
              <Button type='submit' color='warning' variant='contained'>Sign Up</Button>
            </Box>
          </Stack>
          
         </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Register