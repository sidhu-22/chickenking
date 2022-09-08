import React, {useState} from 'react'
import { Container, Grid, Paper, TextField, Stack, Button, Box, Typography } from '@mui/material';
import KeySharpIcon from '@mui/icons-material/KeySharp';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

function Login(props) {
  const [user,setUser] = useState({
    email:"",
    password:"",
  }) 

  const navigate = useNavigate();

  const readValue = (e) =>{
    const { name, value } = e.target;
    setUser({...user, [name]:value})
  }

  const submitHandler = async(e)=>{
    e.preventDefault();
    try{
      await axios.post(`/api/v1/auth/login`,user).then(res =>{
        toast.success("login successful")
        localStorage.setItem('loginToken', true)
        navigate('/')
        window.location.reload();
      }).catch(err => toast.error(err.response.data.msg));
    }catch(error){
      toast.error(error.response.data.msg)
    }
  }


  return (
    <Container>
      <Grid container sx={{display:'flex',justifyContent:'center',my:10}} >
        <Grid item xs={12} md={6}>
         <Paper elevation={10}>
          <Stack component='form' autoComplete='off' onSubmit={submitHandler} spacing={2} sx={{padding:2}}>
            <Box sx={{flexGrow:1,display:'flex',alignItems:'center',justifyContent:'center',flexDirection:'column'}}>
              <Typography variant="h4">
                Login
              </Typography>
              <KeySharpIcon color='success' fontSize='large'/>
            </Box>

              <TextField color="secondary" label="Email" type='email' name='email' value={user.email} onChange={readValue} />
              <TextField color="secondary" label="Password" type='password' name='password' value={user.password} onChange={readValue} />
              <Box sx={{display:'flex',justifyContent:'center'}}>
                <Button type='submit' color='success' variant='contained'>Login</Button>
              </Box>

          </Stack>
          
         </Paper>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login