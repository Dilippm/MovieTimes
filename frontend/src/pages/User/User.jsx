import React, { useState } from 'react';
import { Box, Button, FormLabel, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import {  useNavigate } from "react-router-dom";
import { sendUserAuthRequest } from '../../api-helpers/api-helpers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from "react-redux"
import {userActions} from "../../store"
import Header from "../../components/Header"


const User = () => {
  const dispatch= useDispatch();
  const navigate = useNavigate()
  const [inputs, setInputs] = useState(
    {  email: '', password: '' }
  );
  //const [isSignup, setSignup] = useState(false);
//   const [open, setOpen] = useState(true);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const resData = await sendUserAuthRequest(inputs); 

    if (resData) {
      dispatch(userActions.login());
      localStorage.setItem("userId",resData.id)
      localStorage.setItem("token",resData.token)
      // Login success
      toast.success(resData.message);
      navigate('/');
    } 
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data && err.response.data.error) {
      toast.error(err.response.data.error); 
    } else {
      toast.error('An error occurred. Please try again.'); 
  }
}
  }
  

  return (
    <> < Header /> <Box width={"100%"} height={"100%"} margin={"auto"} marginTop={2}>  
     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '70vh' }}>
  <Box
    sx={{
      width: 500,
      height: 500,
      backgroundColor: '#eeeeee',
      
    }}
  >
     <Typography variant='h4' textAlign='center' marginTop={3}>
      <b> LOGIN</b>
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box
          padding={6}
          display='flex'
          justifyContent='center'
          flexDirection='column'
          width={400}
          margin='auto'>
         
          <FormLabel
            sx={{
              mt: 1,
              mb: 1
            }}>Email</FormLabel>
          <TextField
            value={inputs.email}
            onChange={handleChange}
            margin='normal'
            variant='standard'
            type='email'
            name='email' />
          <FormLabel
            sx={{
              mt: 1,
              mb: 1
            }}>Password</FormLabel>
          <TextField
            value={inputs.password}
            onChange={handleChange}
            variant='standard'
            type='password'
            name='password' /> 
          <Button sx={{ mt: 8, borderRadius: 10, bgcolor: '#2b2d42' }} type='submit' fullWidth variant='contained'>
            <b> Login</b>
          </Button>
          <Link
              sx={{
                mt: 5,
                fontSize: 20,
                textDecoration: 'none',
                '&:hover': {
                  color: 'red',
                  cursor: 'pointer',
                },
                textAlign: 'center'
              }}
              onClick={() => {
                navigate('/register')
              }}
            >
              <b> Register</b>

            </Link>

        
         
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
    </Box></>
   

  
  )
}

export default User
