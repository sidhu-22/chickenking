import React, { useContext, useRef, useState } from 'react';
import { colors, Divider, Slide } from '@mui/material';
import { Grid, Stack, Container, Box, Typography } from '@mui/material';
import { LoginPaper, StyledTextField, DividerRoot } from '../styles/login';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Avatar from '@mui/material/Avatar';
import { Colors } from '../styles/theme';
import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import EmailIcon from '@mui/icons-material/EmailOutlined';
import { NavLink, useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import HandshakeIcon from '@mui/icons-material/Handshake';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
// import { useGlobalState } from '../GlobalContext'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import useInput from '../../src/hooks/use-input';
import { GlobalState } from '../GlobalContext';



function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Box
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Box>{children}</Box>
                </Box>
            )}
        </Box>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function LogIn() {

    const [value, setValue] = useState(0);

    const data = useContext(GlobalState)
    const { googleSignIn } = data

    const handleGoogleSignIn = async () => {
        try {
            await googleSignIn()
            // await axios.post(`/api/v1/auth/login`, user)
        } catch (err) {
            toast.error(err.msg)
        }
    }

    const emailRegex = /[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,8}(.[a-z{2,8}])?/g;
    const IsEmail = value => emailRegex.test(value);

    const {
        value: enteredEmail,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        valueBlurHandler: emailBlurHandler,

    } = useInput(IsEmail);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const email = useRef()
    const password = useRef()

    const navigate = useNavigate()

    const submitHandler = async (e) => {
        e.preventDefault()

        const user = {
            email: email.current.value,
            password: password.current.value
        };
        try {
            await axios.post(`/api/v1/auth/login`, user).then(res => {
                toast.success('user logged Successfully');
                localStorage.setItem('loginToken', true);
                navigate('/')
                window.location.reload();
            }).catch(err => toast.error(err.response.data.msg))
        } catch (error) {
            toast.error(error.response.user.msg)
        }
    }

    const commonRoute = () => {
        return (
            <>
                <List>
                    <ListItemButton>
                        <NavLink to={"#"} >Account</NavLink>
                    </ListItemButton>
                </List>
                <List>
                    <ListItemButton>
                        <NavLink to={`/profile`}>Profiles</NavLink>
                    </ListItemButton>
                    <ListItemButton>
                        <NavLink to={`/orders`}>Orders</NavLink>
                    </ListItemButton>
                    <ListItemButton>
                        <NavLink to={`/`}>Profiles</NavLink>
                    </ListItemButton>
                </List>
            </>
        )
    }

    return (
        <Stack direction="column">
            <Container>
                <Slide direction='right' in={true} timeout={1000}>
                    <Grid container mt={11}>
                        <Grid item xs={12} sm={8} md={5} lg={4} sx={{ margin: "10px auto" }}>
                            <Tabs value={value} onChange={handleChange} sx={{ bgcolor: Colors.secondary, mx: "25px" }}>
                                <Tab label="User Login" {...a11yProps(0)} sx={{ fontWeight: "bold", mx: "20px" }} />
                                <Tab label="Delivery" {...a11yProps(1)} sx={{ fontWeight: "bold", mx: "20px" }} />
                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <LoginPaper elevation={10}>
                                    <Box component="form" autoComplete='off' onSubmit={submitHandler} noValidate>
                                        <Grid item align="center">
                                            <Avatar sx={{ bgcolor: Colors.secondary, marginBottom: "10px" }} display=""><LockOutlinedIcon /></Avatar>
                                            <Typography style={{ marginBottom: "0px", fontFamily: "Bai Jamjuree", fontSize: "24px", fontWeight: "bold" }}>Login</Typography>
                                        </Grid>

                                        <StyledTextField onBlur={emailBlurHandler} onChange={emailChangeHandler} type="email" label="Username" id="username" variant='standard' fullWidth required sx={{ marginBottom: "10px" }} InputLabelProps={{
                                            style: { color: Colors.black }
                                        }} inputRef={email} helperText={emailHasError && "Please enter valid Email-Id"} />
                                        <StyledTextField label="Password" id="password" variant='standard' type="password" fullWidth required InputLabelProps={{
                                            style: { color: Colors.black }
                                        }} inputRef={password} />
                                        <Button size='large' variant="contained" type="submit" fullWidth color='secondary' sx={{ marginBottom: "10px", color: "black", marginTop: "20px", fontWeight: "bold" }}>Log In</Button>

                                        <Typography component="h3" style={{ fontFamily: "Bai Jamjuree", marginTop: "0px" }}>Forgot your password?
                                        <NavLink to={'/resetPass'} style={{ textDecoration: "none", color: Colors.secondary }}> Click here</NavLink>
                                    </Typography>
                                        <DividerRoot>
                                            <Divider><Chip label="Or" /></Divider>
                                        </DividerRoot>

                                        {/* <h3 style={{ fontFamily: "Bai Jamjuree" }}>New to food-Bang?
                                            <NavLink to={'/signup'} style={{ textDecoration: "none", color: Colors.secondary }}> Create Account</NavLink>
                                        </h3> */}
                                    </Box>
                                    <Button size='large' variant="outlined" fullWidth color='secondary' sx={{ marginBottom: "20px", color: "black" }} startIcon={<EmailIcon style={{ fontSize: "24px" }} color='secondary' />}>Continue With Email</Button>

                                    <Button onClick={handleGoogleSignIn} size='large' variant="outlined" fullWidth color='secondary' sx={{ color: "black", marginBottom: "20px" }} startIcon={<svg width="40" height="20" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.87566 13.2946L4.10987 16.1534L1.31093 16.2126C0.474461 14.6611 0 12.886 0 10.9997C0 9.17565 0.443609 7.45552 1.22994 5.94092H1.23054L3.72238 6.39776L4.81396 8.87465C4.5855 9.54071 4.46097 10.2557 4.46097 10.9997C4.46106 11.8072 4.60732 12.5808 4.87566 13.2946Z" fill="#FBBB00"></path><path d="M21.8082 8.94507C21.9345 9.61048 22.0004 10.2977 22.0004 11C22.0004 11.7875 21.9176 12.5557 21.7598 13.2967C21.2243 15.8183 19.8252 18.0201 17.8869 19.5782L17.8863 19.5776L14.7477 19.4175L14.3035 16.6445C15.5896 15.8902 16.5947 14.7098 17.1242 13.2967H11.2422V8.94507H17.21H21.8082Z" fill="#518EF8"></path><path d="M17.8865 19.5778L17.8871 19.5784C16.002 21.0937 13.6073 22.0002 11.0006 22.0002C6.81152 22.0002 3.16945 19.6588 1.31152 16.2132L4.87625 13.2952C5.8052 15.7744 8.19679 17.5392 11.0006 17.5392C12.2057 17.5392 13.3348 17.2134 14.3036 16.6447L17.8865 19.5778Z" fill="#28B446"></path><path d="M18.0208 2.53241L14.4573 5.44981C13.4546 4.82307 12.2694 4.46102 10.9996 4.46102C8.13229 4.46102 5.69596 6.30682 4.81356 8.87494L1.23009 5.9412H1.22949C3.06022 2.41154 6.74823 0 10.9996 0C13.6686 0 16.1158 0.950726 18.0208 2.53241Z" fill="#F14336"></path></svg>} >Continue With Google</Button>
                                    
                                </LoginPaper>
                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <LoginPaper elevation={10}>
                                    <Grid align="center">
                                        <Avatar sx={{ bgcolor: Colors.secondary, marginBottom: "10px" }} display=""><DeliveryDiningIcon /></Avatar>
                                        {/* <h2 style={{ marginBottom: "0px", fontFamily: "Bai Jamjuree" }}>Delivery LogIn</h2> */}
                                    </Grid>
                                    <StyledTextField label="UserName" id="standard-basic" variant='standard' fullWidth required sx={{ marginBottom: "10px" }} InputLabelProps={{
                                        style: { color: Colors.black }
                                    }} />
                                    <StyledTextField label="Password" id="standard-basic" variant='standard' type="password" fullWidth required InputLabelProps={{
                                        style: { color: Colors.black }
                                    }} />
                                    <FormControlLabel control={<Checkbox defaultChecked color='secondary' />} label="Remember Me" sx={{ marginTop: "20px" }} />

                                    <Button size='large' variant="contained" fullWidth color='secondary' sx={{ marginBottom: "20px", color: "black", marginTop: "20px", fontWeight: "bold" }}>Log In</Button>

                                    {/* <h3 style={{ fontFamily: "Bai Jamjuree" }}>New to food-Bang?
                                        <NavLink to={'/signup'} style={{ textDecoration: "none", color: Colors.secondary }}> Contact Admin</NavLink>
                                    </h3>
                                    <h3 style={{ fontFamily: "Bai Jamjuree", marginTop: "20px" }}>
                                        <NavLink to={'/signup'} style={{ textDecoration: "none", color: Colors.black, fontWeight: "lighter" }}>Forgot Password ?</NavLink>
                                    </h3> */}
                                </LoginPaper>
                            </TabPanel>
                        </Grid>
                    </Grid>
                </Slide>
            </Container>
        </Stack>

    );
}

export default LogIn;