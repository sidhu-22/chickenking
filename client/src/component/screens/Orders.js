import React,{ useContext,useEffect,useState}from 'react'
import { GlobalContext } from '../../GlobalContext'
import axios from 'axios'
import { Container, width } from '@mui/system';
import { Box, Button, Card, CardContent, CardMedia, Grid, IconButton, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';

function Orders() {
  const context = useContext(GlobalContext);
  const [token] = context.token
  const [userData] = context.authApi.userData

  const [orders,setOrders] = useState([])

  useEffect(() => {
  const getOrders = async () => {
    let res = await axios.get(`/api/v1/auth/orders`, {
      headers: { Authorization: token }
    })
    setOrders(res.data.orders)
  } 
  getOrders()
},[])


if(orders.length === 0) {
  return(
    <>
  <Typography>Hi , {userData.name},No Orders</Typography>
  <NavLink to={'/menu'}>Keep Shopping</NavLink>
  </>
  )
}
  return (
    <Container>
      <Typography mt={3} mb={2} variant='h4' color='black' sx={{display:'flex' ,justifyContent:'center'}}>My Orders</Typography>
      <Grid item xs={12} sm={12} md={6} lg={8}>
        <TableContainer component={Paper} elevation={8}>
          <Table>
              <TableHead >
                <TableRow>
                  <TableCell align="left"><Typography variant='h6' color='chocolate'>Order Id</Typography></TableCell>
                  <TableCell align="left"><Typography variant='h6' color='chocolate'>Date</Typography></TableCell>
                  
                  <TableCell align="left"><Typography variant='h6' color='chocolate'>Status</Typography></TableCell>
                  <TableCell align="left"><Typography variant='h6' color='chocolate'>Cart</Typography></TableCell>
                  <TableCell align="left"><Typography variant='h6' color='chocolate'>Total</Typography></TableCell>
                  <TableCell align="left"><Typography variant='h6' color='chocolate'>Payment Status</Typography></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {
                    orders && orders.map((item, index) => {
                      return (
                        <TableRow key={index}>
                          <TableCell>
                              {item.orderId}
                          </TableCell>
                          <TableCell>
                              {new Date(item.createdAt).toLocaleString()}
                          </TableCell>
                          <TableCell>
                              { item.orderStatus }
                          </TableCell>

                          <TableCell>
                            <details>
                              <summary>Show cart</summary>
                              {
                                item.cart.map((item,index) => {
                                  return(
                                          <Paper>
                                            <Grid container p={1} key={index} spacing={1}>
                                              <Grid item xs={5} >
                                                <img src={item.image.url} style={{height:'100px',width:'100px'}} alt="" />
                                              </Grid>
                                              <Grid item xs={7}>
                                                <Typography textAlign='center' variant='h6'>{item.title}</Typography>
                                                <Box sx={{display:'flex',justifyContent:"space-between"}}>
                                                  <Typography><strong>Price</strong></Typography>
                                                  <Typography>&#8377;{item.price}</Typography>
                                                </Box>

                                                <Box sx={{display:'flex',justifyContent:"space-between"}}>
                                                  <Typography><strong>Quantity</strong></Typography>
                                                  <Typography>{item.qnty}</Typography>
                                                </Box>

                                                <Box sx={{display:'flex',justifyContent:"space-between"}}>
                                                  <Typography><strong>Total items</strong></Typography>
                                                  <Typography>{item.quantity}</Typography>
                                                </Box>
                                               
                                              </Grid>
                                            </Grid>
                                          </Paper>
                           
                          )
                        })
                      }
                            </details>
                          </TableCell>


                          <TableCell>
                              &#8377;{item.finalTotal}
                          </TableCell>
                          <TableCell>
                              {item.paymentStatus}
                          </TableCell>
                        </TableRow>
                      )
                    })
                  }
              </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Container>
  )
}

export default Orders



 