import React, { useContext } from "react";
import { GlobalContext } from "../../GlobalContext";
import { NavLink } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";

function AdminDashboard() {
  const data = useContext(GlobalContext);
  const [products] = data.productApi.products;
  const [allUsers] = data.authApi.allUsers

  return (
    <Container sx={{ paddingTop: "80px",  }}>
      <Typography variant="h4" align="center" sx={{ paddingTop: 3 }}>
        Admin Dashboard
      </Typography>
      <Grid container spacing={3} sx={{display: 'flex', justifyContent: 'center', mt: 3}}>
        <Grid item lg={4} align="center">
          <Card>
            <CardHeader title="Total Products" />
            <CardContent>
              <Typography variant="h3">{products.length}</Typography>
            </CardContent>
            <CardActions sx={{display: 'felx', justifyContent: 'center'}}>
              <Button
                variant="contained"
                color="success"
              >
                <NavLink
                  style={{ textDecoration: "none", color: "#fff" }}
                  to={`/product/create`}
                >
                  Add Product
                </NavLink>
              </Button>
            </CardActions>
          </Card>
        </Grid>

        <Grid item lg={4} align="center">
          <Card>
            <CardHeader title="All users" />
            <CardContent>
              <Typography variant="h3">{allUsers.length}</Typography>
            </CardContent>
            <CardActions sx={{display: 'felx', justifyContent: 'center'}}>
              <Button
                variant="contained"
                color="success"
              >
                <NavLink
                  style={{ textDecoration: "none", color: "#fff" }}
                  to={`/admin/allUsers`}
                >
                  View
                </NavLink>
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminDashboard;