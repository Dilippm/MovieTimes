import React, { useEffect, useState } from 'react';

import { Box, Button, FormLabel, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import TextField from '@mui/material/TextField';
import { ToastContainer, toast } from 'react-toastify';
import AdminHeader from '../../components/AdminHeader'

const EditMovie = () => {
  return (
    <>
    <AdminHeader />
    <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={3}>
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '65vh' }}>
        <Box sx={{ width: 500, height: 600, backgroundColor: '#eeeeee'}}>
          <Typography variant='h4' textAlign='center' marginTop={3}>
            <b>Edit Movie</b>
          </Typography>
          <form >
            <Box padding={6} display='flex' justifyContent='center' flexDirection='column' width={400} margin='auto'>
            {/* {imageUrl ? (
<label htmlFor="imageInput">
  <img src={imageUrl} alt="Profile" style={{ width: '50%', height: '50%', marginTop: '10px', margin: 'auto', cursor: 'pointer', marginLeft: '90px' }} />
  <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
</label>
) : (
<label htmlFor="imageInput">
  <div style={{ width: '50%', height: '50%', margin: 'auto', cursor: 'pointer' }}>
    <AccountCircleIcon style={{ fontSize: '200px' }} />
  </div>
  <input id="imageInput" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
</label>
)} */}

              <FormLabel sx={{ mt: 1, mb: 1 }}>Title</FormLabel>
              <TextField
                value=" "
                
                margin='normal'
                variant='standard'
                type='text'
                name='Movie Name'
              />

              <FormLabel sx={{ mt: 1, mb: 1 }}>Language</FormLabel>
              <TextField
                value=" "
              
                margin='normal'
                variant='standard'
                type='text'
                name='Language'
              />

              <FormLabel sx={{ mt: 1, mb: 1 }}>Description</FormLabel>
              <TextField
                value=" "
               
                margin='normal'
                variant='standard'
                type='text'
                name='description'
              />

              <Button sx={{ mt: 8, borderRadius: 10, bgcolor: '#2b2d42' }} type='submit' fullWidth variant='contained'>
                <b>Update</b>
              </Button>
            </Box>
          </form>
        </Box>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Box>
    </Box>
  </>
  )
}

export default EditMovie
