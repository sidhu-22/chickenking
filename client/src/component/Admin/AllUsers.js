import {
    Box,
    Button,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
  } from "@mui/material";
  import { Container } from "@mui/system";
  import React, { useContext, useState } from "react";
  import { GlobalContext } from "../../GlobalContext";
  import EditIcon from "@mui/icons-material/Edit";
  
  function AllUsers() {
    const data = useContext(GlobalContext);
    const [allUsers] = data.authApi.allUsers;
  
    const [isEdit, setIsEdit] = useState(false);
    const [editableUser, setEditableUser] = useState(false);
  
    const toggleEdit = (userId) => {
      let user = allUsers.find((item) => item._id === userId);
      setEditableUser(user);
    };
  
    return (
      <Container sx={{ paddingTop: "80px" }}>
        <Typography align="center" variant="h4">
          All Users
        </Typography>
        <TableContainer component={Paper} sx={{ marginTop: "30px" }}>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Name
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Eamil
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Mobile
                </TableCell>
                <TableCell sx={{ fontWeight: 600 }} align="center">
                  Role
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {allUsers &&
                allUsers.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{item.name}</TableCell>
                    <TableCell align="center">{item.email}</TableCell>
                    <TableCell align="center">{item.mobile}</TableCell>
                    <TableCell align="center">
                      {item.role}
                      <Button
  
                        variant="outlined"
                        sx={{ padding: "0px", minWidth: "35px" }}
                        onClick={() => toggleEdit(item._id)}
                      >
                        <EditIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    );
  }
  
  export default AllUsers;