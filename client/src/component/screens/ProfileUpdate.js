import axios from "axios";
import React, { useState, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import { GlobalContext } from "../../GlobalContext";
import { useNavigate, useParams } from "react-router-dom";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
  TextField,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const LoadingSpinner = () => {
    return (
        <div
          className="spinner-border text-success"
          style={{ width: "3em", height: "3em" }}
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      );
    }

function ProfileUpdate() {
  //context
  const data = useContext(GlobalContext);
  const [user] = data.authApi.userData;
  const [isUser] = data.authApi.isUser;
  const [token] = data.token;

  //ref for navigation
  const navigate = useNavigate();
  const params = useParams();

  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile: "",
    role: user.role,
  });

  useEffect(() => {
    setUserData(user);
    setImage(user.image);
  }, []);

  //image upload handler
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      //to read file content from input
      const file = e.target.files[0];
      if (!file) return toast.error("file not exists..");
      //file size
      if (file.size > 1 * 1024 * 1024)
        return toast.error("file size is too large");
      //ref formData
      let formData = new FormData();
      formData.append("profileImg", file);

      setLoading(true);
      const res = await axios.post(`/api/v1/image/profile/upload`, formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      //after upload
      setLoading(false);
      setImage(res.data);
      //   setImage(res.data)
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  //image delete handler
  const handleDestroy = async (e) => {
    try {
      if (window.confirm("are you sure to delete image?")) {
        setLoading(true);
        await axios.post(
          `/api/v1/image/profile/destroy`,
          { public_id: image.public_id },
          {
            headers: { Authorization: token },
          }
        );
        setImage(false);
        setLoading(false);
      } else {
        toast.warning("delete terminated");
      }
    } catch (err) {
      toast.error(err.response.data.msg);
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!image) return toast.error("Image doesn't exists");

    const res = await axios.patch(
      `/api/v1/auth/updateProfile/${params.id}`,
      { ...userData, image },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setImage(false);
    toast.success("Profile Updated successfully");
    navigate(`/profile`);
  };
  const readValue = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  return (
    <Container sx={{ mt: "50px" }}>
      <Typography variant="h3" align="center">
        Update Profile
      </Typography>
      <Grid container sx={{ mt: 2 }}>
        <Grid item lg={5} sm={12} md={6}>
          <Card elevation={10} sx={{margin:'20px'}}>
            <CardContent>
              <TextField
                variant="filled"
                type="file"
                name="profileImg"
                onChange={handleUpload}
                required
                style={{
                  border: "2px solid #726f6f",
                  padding: "10px",
                  borderRadius: "5px",
                }}
              />
            </CardContent>
            <CardActions>
              {loading ? (
                <Box>
                  <LoadingSpinner />
                </Box>
              ) : (
                <Box>
                  <img
                    src={image ? image.url : ""}
                    width={"100%"}
                    height={200}
                    alt=""
                  />
                  <Box onClick={handleDestroy}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: "#f4474a",
                        ":hover": { backgroundColor: "#f4474a" },
                      }}
                      endIcon={<DeleteIcon />}
                    >
                      Delete
                    </Button>
                  </Box>
                </Box>
              )}
            </CardActions>
          </Card>
        </Grid>

        <Grid item lg={7} sm={12} md={6}>
          <Card elevation={8} sx={{ margin: "20px", padding: "20px",backgroundColor:'lightcyan' }}>
            <Box variant="form">
              <TextField
                style={{ marginTop: "10px" }}
                type="text"
                label="Name"
                variant="outlined"
                fullWidth
                value={userData.name}
                onChange={readValue}
                name="name"
                required
              />

              <TextField
                style={{ marginTop: "10px" }}
                type="text"
                label="Email"
                variant="outlined"
                onChange={readValue}
                fullWidth
                disabled
                name="email"
                value={userData.email}
                required
              />

              <TextField
                style={{ marginTop: "10px" }}
                type="number"
                label="Mobile"
                variant="outlined"
                onChange={readValue}
                fullWidth
                name="mobile"
                value={userData.mobile}
                required
              />

              <TextField
                sx={{ marginTop: "10px" }}
                type="text"
                label="Role"
                variant="outlined"
                onChange={readValue}
                fullWidth
                disabled
                name="role"
                value={userData.role}
                required
              />
              <Button
                variant="contained"
                color="primary"
                sx={{ marginTop: "20px", padding: "10px" }}
                type="submit"
                fullWidth
                onClick={(event) => submitHandler(event)}
              >
                Submit
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProfileUpdate;