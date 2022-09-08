import React, { useContext } from 'react'
import { Grid, Typography, Container} from '@mui/material';
import Footer from './Footer';

import { toast } from 'react-toastify';
import axios from 'axios';

import Product from '../Product/Product';
import { GlobalContext } from './../../GlobalContext';


function Menu() {

  const data = useContext(GlobalContext)
  const [products, setProducts] = data.productApi.products;
  const [isUser] = data.authApi.isUser;
  const [isAdmin] = data.authApi.isAdmin;

  const [token] = data.token

  const delHandler = async (id) => {
    if (window.confirm(`Are you sure to delete product?`)) {
      try {
        let product = await axios.get(`/api/v1/product/get/${id}`)
        if (!product) {
          toast.error('no product found')
        } else {
            // delete image
          axios.post(`/api/v1/image/product/destroy`, { public_id: product.public_id }, {
              headers: {Authorization: token}
           })
           await axios.delete(`/api/v1/product/delete/${id}`, {
              headers: {Authorization: token}
           })
            .then(res => {
              toast.success("Product deleted succssfully");
              window.location.reload();
          }).catch(err => toast.error(err.message))
        }

        } catch (err) {
          toast.error(err.message)
        }
    } else {
      toast.warning('delete terminated')
    }
  }

  return (
    <>
    <Container sx={{py:10}}>
      <Grid container>
        <Grid item xs={12} md={3} pb={5}>
          <Grid container >
            <Grid item xs={12} sx={{display:'flex',justifyContent:{xs:'center',md:'flex-start'},pb:4}}>
              <Typography variant='h4'>Menu Items</Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={12}>
              <Typography component='h6' sx={{my:1,textTransform:'uppercase'}} variant='body1'>Hot deals</Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={12}>
              <Typography component='h6' sx={{my:1,textTransform:'uppercase'}} variant='body1'>Chicken Buckets</Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={12}>
              <Typography component='h6' sx={{my:1,textTransform:'uppercase'}} variant='body1'>Hot launches</Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={12}>
              <Typography component='h6' sx={{my:1,textTransform:'uppercase'}} variant='body1'>Snacks</Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={12}>
              <Typography component='h6' sx={{my:1,textTransform:'uppercase'}} variant='body1'>Box Meals</Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={12}>
              <Typography component='h6' sx={{my:1,textTransform:'uppercase'}} variant='body1'>Burgers</Typography>
            </Grid>

            <Grid item xs={6} sm={3} md={12}>
              <Typography component='h6' sx={{my:1,textTransform:'uppercase'}} variant='body1'>Biryani buckets</Typography>
            </Grid>

          </Grid>
          
        </Grid>

        

        <Grid item xs={12} md={9} >

          <Grid container sx={{padding:2,background:'rgb(240,230,140)'}}>
            <Grid item xs={12} pb={4}>
              <Typography>HOT DEALS</Typography>
            </Grid>
            
            <Grid container> 
              {
                products && products.map((item,index)=>{
                  return(
                      <Product key={index} {...item} isUser={isUser} isAdmin={isAdmin} del={delHandler} />
                  )
                })
              }
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
    <Footer/>
    </>
  )
}

export default Menu