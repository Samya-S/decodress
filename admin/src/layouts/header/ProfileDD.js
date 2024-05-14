"use client"
import React, { useEffect, useState } from "react";
import FeatherIcon from "feather-icons-react";
import Image from "next/image";
import userimg from "@/admin/assets/images/users/3.jpg";
import {
  Box,
  Menu,
  Typography,
  ListItemButton,
  List,
  ListItemText,
  Button,
  Divider,
} from "@mui/material";

const ProfileDD = () => {
  const [anchorEl4, setAnchorEl4] = React.useState(null);

  const handleClick4 = (event) => {
    setAnchorEl4(event.currentTarget);
  };

  const handleClose4 = () => {
    setAnchorEl4(null);
  };

  const [accountDetails, setAccountDetails] = useState({ name: '', email: '', phone: '', isAdmin: false })

  useEffect(() => {
    // get user details
    fetch(`/api/getUserDetails`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: localStorage.getItem('token')
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.success && data.user.isAdmin) {
          setAccountDetails({ ...accountDetails, name: data.user.name, email: data.user.email, phone: data.user.phone, isAdmin: data.user.isAdmin })
        }
        else {
        }
      })
      .catch((error) => {
        console.error('Error:', error)
      })
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Button
        aria-label="menu"
        color="inherit"
        aria-controls="profile-menu"
        aria-haspopup="true"
        onClick={handleClick4}
      >
        <Box display="flex" alignItems="center">
          <Image
            src={userimg}
            alt={userimg}
            width="30"
            height="30"
            className="roundedCircle"
          />
          <Box
            sx={{
              display: {
                xs: "none",
                sm: "flex",
              },
              alignItems: "center",
            }}
          >
            <Typography
              color="textSecondary"
              variant="h5"
              fontWeight="400"
              sx={{ ml: 1 }}
            >
              Hi,
            </Typography>
            <Typography
              variant="h5"
              fontWeight="700"
              sx={{
                ml: 1,
              }}
            >
              {accountDetails.name}
            </Typography>
            <FeatherIcon icon="chevron-down" width="20" height="20" />
          </Box>
        </Box>
      </Button>
      <Menu
        id="profile-menu"
        anchorEl={anchorEl4}
        keepMounted
        open={Boolean(anchorEl4)}
        onClose={handleClose4}
        sx={{
          "& .MuiMenu-paper": {
            width: "300px",
          },
        }}
      >
        <Box>
          <Box px={2}>
            <List
              component="nav"
              aria-label="secondary mailbox folder"
              onClick={handleClose4}
            >
              <ListItemButton>
                <ListItemText primary="Edit Profile" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Account" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="Change Password" />
              </ListItemButton>
              <ListItemButton>
                <ListItemText primary="My Settings" />
              </ListItemButton>
            </List>
          </Box>
          {/* <Divider />
          <Box p={2}>
            <Link href="/">
              <Button fullWidth variant="contained" color="primary">
                Logout
              </Button>
            </Link>
          </Box> */}
        </Box>
      </Menu>
    </>
  );
};

export default ProfileDD;
