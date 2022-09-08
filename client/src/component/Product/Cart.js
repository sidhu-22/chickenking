import React, {useContext, useState,useEffect} from 'react'
import { NavLink } from 'react-router-dom';
import { GlobalContext } from './../../GlobalContext';
import axios from 'axios';
import { Container, Grid, Table, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, TableBody, IconButton, Card, CardHeader, CardContent, CardActions, Divider, Button } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverRoundedIcon from '@mui/icons-material/DeleteForeverRounded';

function Cart() {
    const data = useContext(GlobalContext)
         const [cart, setCart] = data.authApi.cart;
         const orderUpdate = data.authApi.orderUpdate;
         const [token] = data.token;
         const [finalTotal, setFinalTotal] = data.authApi.finalTotal
         const [order, setOrder] = data.authApi.order;
    
         const [total, setTotal] = useState(0); // total price
         const [gst, setGst] = useState(5);  // gst -> cgst & sgst
         const [dc, setDC] = useState(30); // delivery charge
    
    
         useEffect(() => {
             const getTotal = () => {
                 const total = cart.reduce((prev, item) => {
                     return prev + (item.price * item.quantity)
                 }, 0)
    
                 setTotal(total)
                let gstTotal = Math.round(total * (5/ 100))
                 let final = total + gstTotal + dc;
                 setFinalTotal(final)
             }
             getTotal()
         },[cart])
    
    
         // inc count of items
         const incCount = (id) => {
             cart.forEach(item => {
                 if (item._id === id) {
                     item.quantity += 1
                 }
             });
             setCart([...cart])
             updateCart(cart)
    
             setOrder(cart,finalTotal)
             storeOrder(cart,finalTotal)
         }
    
         // to dec count of items
         const decCount = (id) => {
             cart.forEach(item => {
                 if(item._id === id) {
                     item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1;
                 }
             })
             setCart([...cart])
             updateCart(cart)
    
    
             setOrder(cart,finalTotal)
             storeOrder(cart,finalTotal)
         }
    
         // to update cart
         const updateCart = async (cart) => {
             await axios.patch(`/api/v1/auth/addToCart`, { cart }, {
                 headers: {Authorization: token}
             })
         }
    
         // delete item from cart
         const delItem = (id) => {
             if (window.confirm(`Do you want to remove product?`)) {
                 cart.forEach((item, index) => {
                     if (item._id === id) {
                         cart.splice(index, 1)
                     }
                 });
                 setCart([...cart]);
                 updateCart(cart)
    
    
                 // setOrder(cart,finalTotal)
                 // storeOrder(cart,finalTotal)
             }
         }
    
         // final order save and continue to check out
         const storeOrder = async (cart, finalTotal) => {
             await orderUpdate(cart,finalTotal)
         }
    
         if (cart.length === 0) {
             return (
                <Container>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant='h2' sx={{textAlign:'center'}}>Cart is Empty</Typography>
                        </Grid>
                    </Grid>
                </Container>
             )
         }

  return (
    <Container>
        <Grid container>
            <Grid item xs={12}>
                <Typography variant='h2' sx={{textAlign:'center',py:5}}> My cart </Typography>
            </Grid>
        </Grid>

        <Grid container spacing={2}>
            <Grid item xs={12}>
                <TableContainer component={Paper} sx={{p:2}}>
                    <Table  >
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">Title</TableCell>
                                <TableCell align="center">Image</TableCell>
                                <TableCell align="center">Price</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Count</TableCell>
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {
                                cart && cart.map((item,index) => {
                                    const {_id,title,image,price,qnty,quantity} = item
                                    return(
                                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                            <TableCell align="center" component="th" scope="row">{title}</TableCell>
                                            <TableCell align="center"><img src={image.url} style={{width:'100px'}} alt="" /></TableCell>
                                            <TableCell align="center">&#8377; {price}</TableCell>
                                            <TableCell align="center">{qnty}</TableCell>
                                            <TableCell align="center">
                                                <IconButton >
                                                    <RemoveIcon color="error" onClick={() => decCount(_id)} />
                                                </IconButton>
                                                <strong style={{border:'2px solid black',padding:'5px'}}> {quantity} </strong>
                                                <IconButton>
                                                    <AddIcon color='success' onClick={() => incCount(_id)} />
                                                </IconButton>
                                            </TableCell>
                                            <TableCell align="center">
                                                <IconButton>
                                                    <DeleteForeverRoundedIcon onClick={() => delItem(_id)} color="error"/>
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    )
                                })
                            }
                        </TableBody>
                    </Table>
                </TableContainer>

            </Grid>

            <Grid item xs={12} >
                <Card>
                    <CardHeader title='Cart info' align="center"/>
                    <Divider color="black"/>
                    <CardContent>
                        <div style={{display:'flex',justifyContent:"space-between"}}>
                            <strong>Sub Total</strong>
                            <span> &#8377; {total} </span>
                        </div>
                        <div style={{display:'flex',justifyContent:"space-between",paddingTop:'10px'}}>
                        <strong>Gst (cgst+sgst) </strong>
                        <span> {gst} % </span>
                        </div>
                        <div style={{display:'flex',justifyContent:"space-between",paddingTop:'10px',paddingBottom:'10px'}}>
                        <strong>Delivery Charges</strong>
                        <span> &#8377; {dc} </span>
                        </div>
                        
                        <Divider color="black"/>
                        <div style={{display:'flex',justifyContent:"space-between",paddingTop:'10px'}}>
                            <strong>Total value</strong>
                            <span> &#8377; {finalTotal} </span>
                        </div>

                    </CardContent>
                    <CardActions sx={{display:'flex',justifyContent:'center'}}>
                        <NavLink to={`/checkout`} style={{textDecoration:"none"}} >
                            <Button variant='outlined' color="warning">
                                Continue
                            </Button>   
                        </NavLink>

                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    </Container>
  )
}

export default Cart







