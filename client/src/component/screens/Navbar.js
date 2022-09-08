import React, { useState, useContext } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Divider,
  MenuItem,
  Menu,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Container,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleSharpIcon from "@mui/icons-material/AccountCircleSharp";
import ShoppingCartSharpIcon from "@mui/icons-material/ShoppingCartSharp";
import { styled } from "@mui/material/styles";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";
import { Link } from "react-router-dom";

import { NavLink } from "react-router-dom";
import { GlobalContext } from "./../../GlobalContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Logo from "./../../assets/images/logo4.png";

const pages = ["Home", "Menu", "Deals"];

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const drawerWidth = 300;

function Navbar() {
  const [anchorNav, setAnchorNav] = useState(null);

  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  /* login and signup handler*/
  const handleOpenMenu = (event) => {
    setAnchorNav(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorNav(null);
  };

  const context = useContext(GlobalContext);

  const navigate = useNavigate();

  const [isLogged, setIsLogged] = context.authApi.isLogged;
  const [isAdmin, setIsAdmin] = context.authApi.isAdmin;
  const [isUser, setIsUser] = context.authApi.isUser;
  const [cart] = context.authApi.cart;

  const logoutUser = async () => {
    if (window.confirm(`Are u sure to logout`)) {
      await axios.get("/api/v1/auth/logout");
      localStorage.clear();
      if (isAdmin) {
        setIsAdmin(false);
      }
      if (isUser) {
        setIsUser(false);
      }
      setIsLogged(false);
      toast.success("logout success");
      navigate("/");
      window.location.reload();
    } else {
      toast.warning("logout terminated");
    }
  };

  /* common route */
  const commonRoute = () => {
    return (
      <Box>
        <IconButton
          sx={{ fontSize: 25, mr: 0.5 }}
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenMenu}
          color="inherit"
        >
          <AccountCircleSharpIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorNav)}
          onClose={handleCloseMenu}
          sx={{
            display: "block",
          }}
        >
          
          <MenuItem onClick={handleCloseMenu}>
            <Typography
              component={Link}
              to={`/profile`}
              color="black"
              sx={{ textDecoration: "none" }}
            >
              Profile
            </Typography>
          </MenuItem>

          {
              isUser ? (
          <MenuItem onClick={handleCloseMenu}>

                <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to={`/orders`}
              >
                My Orders
              </NavLink>
          </MenuItem>
          
          ) : null
        }

        {
          isAdmin ? (
            <MenuItem onClick={handleCloseMenu}>
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to={`/admin/dashboard`}
              >
                Admin dashboard
              </NavLink>
            </MenuItem>
          ) : null
        }

          {/* <MenuItem onClick={handleCloseMenu}>
            {isUser ? (
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to={`/user/dashboard`}
              >
                User dashboard
              </NavLink>
            ) : null}

            {isAdmin ? (
              <NavLink
                style={{ textDecoration: "none", color: "black" }}
                to={`/admin/dashboard`}
              >
                Admin dashboard
              </NavLink>
            ) : null}  
          </MenuItem > */}
          
           {/* new entry */}
            {
              isAdmin ? ( 
                <MenuItem onClick={handleCloseMenu}>
                  <NavLink style={{ textDecoration: "none", color: "black" }} to={`/admin/allOrders`}>All Orders</NavLink>
                </MenuItem>
              ): null
            }
           
          <Divider color="black"/>

          <MenuItem onClick={handleCloseMenu} sx={{display:'flex',justifyContent:'center'}}>
            <Button
              variant="contained"
              onClick={logoutUser}
              color="error"
              sx={{ textDecoration: "none" }}
            >
              Logout
            </Button>
          </MenuItem>
        </Menu>
      </Box>
    );
  };

  // background: "rgba(255,255,255,0.9)"

  return (
    <React.Fragment>
      <AppBar position="sticky" sx={{ background: "rgba(255,255,255,0.9)" }}>
        <Toolbar>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
            sx={{color:'black'}}
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: { xs: "center", md: "flex-start" },
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <img src={Logo} style={{ height: "40px" }} alt="no image found" />
            {isAdmin ? (
              <NavLink
                to={`/`}
                style={{
                  textDecoration: "none",
                  "&:hover": {
                    color: "black",
                  },
                }}
              >
                <Typography sx={{ color: "black" }}>
                  Admin <span style={{ color: "red" }}> Dashboard </span>
                </Typography>
              </NavLink>
            ) : (
              <NavLink
                to={`/`}
                style={{
                  textDecoration: "none",
                  "&:hover": {
                    color: "black",
                  },
                }}
              >
                <Typography sx={{ color: "black" }}>
                  Chicken <span style={{ color: "red" }}> King </span>
                </Typography>
              </NavLink>
            )}
          </Box>

          <Box sx={{ display: { xs: "none", md: "flex" }, flexGrow: 1,gap:5 }}>
            <Typography
              style={{
                textDecoration: "none",
                color:'black',
                "&:hover": {
                  color: "black",
                },
              }}
              component={Link}
              to={`/`}
            >
              Home
            </Typography>
            <Typography
              style={{
                textDecoration: "none",
                color:'black',
                "&:hover": {
                  color: "black",
                },
              }}
              component={Link}
              to={`/Menu`}
            >
              Menu
            </Typography>
            <Typography
              style={{
                textDecoration: "none",
                color:'black',
                "&:hover": {
                  color: "black",
                },
              }}
              component={Link}
              to={`/Deals`}
            >
              Deals
            </Typography>
          </Box>

          <Box>
            <IconButton
              sx={{ fontSize: 25, mr: 0.5,color:'black' }}
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenMenu}
            >
              <AccountCircleSharpIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorNav)}
              onClose={handleCloseMenu}
              sx={{
                display: "block",
              }}
            >
              <MenuItem onClick={handleCloseMenu}>
                <Typography
                  component={Link}
                  to={`/login`}
                  color="black"
                  sx={{ textDecoration: "none" }}
                >
                  Login
                </Typography>
              </MenuItem>
              <MenuItem onClick={handleCloseMenu}>
                <Typography
                  component={Link}
                  to={`/register`}
                  color="black"
                  sx={{ textDecoration: "none" }}
                >
                  Register
                </Typography>
              </MenuItem>
              {isLogged ? (
                commonRoute()
              ) : (
                <Menu>
                  <MenuItem>
                    <NavLink to={"/login"}>Login</NavLink>
                  </MenuItem>

                  <MenuItem>
                    <NavLink to={"/register"}>Register</NavLink>
                  </MenuItem>
                </Menu>
              )}
            </Menu>
          </Box>

          {
              isAdmin ? null : (
                <Divider
                  orientation="vertical"
                  variant="middle"
                  flexItem
                  color="black"
                />
              )
            }

          <Box>
            {
              isAdmin ? null :(
                <NavLink to={`/product/cart`}>
                  <IconButton sx={{ color: "black", ml: 0.5 }}>
                  <Badge color="error" badgeContent={cart.length > 0 ? cart.length : 0}>
                  <ShoppingCartSharpIcon sx={{ fontSize: 25,color:"rgba(254,0,0,0.6)"}} />
                  </Badge>
                  </IconButton>
                  
                </NavLink>
              )
            }
            
          </Box>
        </Toolbar>
      </AppBar>

      {/* Drawer component */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="temporary"
        anchor="left"
        onClose={() => {
          handleDrawerClose();
        }}
        open={open}
        
      >
        <DrawerHeader>
        <img src={Logo} style={{ height: "40px" }} alt="no image found" />
          <Typography sx={{ flexGrow: 1 }}>  Chicken <span style={{ color: "red" }}> King </span> </Typography>
          <IconButton onClick={handleDrawerClose}>
            <CloseSharpIcon />
          </IconButton>
        </DrawerHeader>

        <Divider />

        <List >
          <ListItem onClick={handleDrawerClose} button component={Link} to={`/`}>
            <ListItemText primary="Home" />
          </ListItem>

          <ListItem onClick={handleDrawerClose} button component={Link} to={`/Menu`}>
            <ListItemText primary="Menu"/>
          </ListItem>

          <ListItem onClick={handleDrawerClose} button component={Link} to={`/Deals`}>
            <ListItemText primary="Deals"/>
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>
  );
}

export default Navbar;


/* {
  isAdmin ? null : (
    <li className = "nav-item">
    <NavLink to={`/product/cart`} className="nav-link text-light">
    <i className="bi bi-cart-fill"></i>
    </NavLink>
    </li>
  )
} */
