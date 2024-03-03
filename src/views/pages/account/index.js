// AccountSettings.js

import React, { useState } from 'react';
import { TextField, Button, Typography, Container, Grid, Avatar, Card } from '@mui/material';
import { Box } from '@mui/system';
import HeadLine from 'utils/HeadLine';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

const AccountSettings = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const user = useSelector((state) => state.auth);

  const handleChangePassword = () => {
    alert("Under Development .....!")
    // Handle password change logic here
    // You might want to send a request to your server to update the password
    console.log('Password changed');
  };

  // Function to get the first character of the user's name for the avatar
  const getAvatarInitials = (name) => {
    return name ? name.charAt(0).toUpperCase() : '';
  };

  // Dummy user data (replace with actual user data from your app)
 
 

  return (
    <Box>
      <Card sx={{ p: 2, mb: 2, border: '1px solid #eee' }}>
   
   
        <Grid container spacing={3} alignItems="center" padding={4} >
          <Grid item xs={12}>
            <HeadLine Title={'Personal Information'} TitleIcon={"wpf:name"} SubTitle={true} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="Full Name" fullWidth defaultValue={user.first_name + " " + user.last_name } disabled />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Email" fullWidth defaultValue={user.email} disabled />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Role" fullWidth defaultValue={user.role} disabled />
          </Grid>

          <Grid item xs={12}>
            <HeadLine Title={'Activity'} TitleIcon={"fluent:shifts-activity-16-filled"} SubTitle={true} />
          </Grid>
          
          <Grid item xs={6}>
            <TextField label="Last Login" fullWidth defaultValue={user.last_login} disabled />
          </Grid>
          <Grid item xs={6}>
            <TextField label="Registration Date" fullWidth defaultValue={user.registration_date} disabled />
          </Grid>
        
          <Grid item xs={12}>
            <HeadLine Title={'Change Password'} TitleIcon={"ic:outline-password"} SubTitle={true} />
          </Grid>
          <Grid item xs={12}>
            <TextField label="New Password" type="password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" color="primary" onClick={handleChangePassword}>
              Change Password
            </Button>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default AccountSettings;
