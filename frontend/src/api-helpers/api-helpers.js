import axios from 'axios';
import BaseURL from '../config'



export const getAllMovies = async () => {
  try {
    const res = await axios.get(`${BaseURL}movie/movies`);
    console.log("resdatmves",res);
    if (res.status !== 200) {
      console.log('No Data');
      return null;
    }
    const data = res.data;
    return data;
  } catch (err) {
    console.log(err);
    return null;
  }
};
/** user Login */
export const sendUserAuthRequest = async (data) => {
  try {
    const res = await axios.post(`${BaseURL}user/login`, {
      email: data.email,
      password: data.password
    });

    const resData = res.data;
    return resData;
  } catch (err) {
    console.log(err);
    throw err
  }
};
/**User Register */
export const sendUserRegister = async(data)=>{
  try {
    const res = await axios.post(`${BaseURL}user/register`, {
      name:data.name,
      email: data.email,
      password: data.password,
      phone: data.phone
    });

    const resData = res.data;
    return resData;
  } catch (err) {
    console.log(err);
    throw err
  }
}

/** Admin Login  */
export const adminLogin = async (data) => {
  try {
    const res = await axios.post(`${BaseURL}admin/login`, {
      email: data.email,
      password: data.password,
    });

    const resData = res.data;
    console.log("resData admin:" ,resData);
    localStorage.setItem("admintoken",resData.token)
    return resData;
  } catch (err) {
    console.log(err);
    throw err
    
  }
};


/** Owner Login */
export const ownerLogin = async(data)=>{
  try {
    const res = await axios.post(`${BaseURL}owner/login`, {
     
      email: data.email,
      password: data.password,
      
    });

    const resData = res.data;
    return resData;
  } catch (err) {
    console.log(err);
    throw err
   
  }
}


/**Owner Register */
export const OwnerSignup = async(data)=>{
  try {
    const res = await axios.post(`${BaseURL}owner/register`, {
      name:data.name,
      email: data.email,
      password: data.password,
      phone: data.phone
    });

    const resData = res.data;
    return resData;
  } catch (err) {
    console.log(err);
    throw err
  }
}

/** Get user Profile */
export const UserProfiles = async()=>{
  const id= localStorage.getItem("userId");
  const res = await axios.get(`${BaseURL}user/${id}`);
  if(res.status!==200){
    return console.log("unexpected error");
  }


  const resData = res.data;
  console.log("resData:",resData);
  return resData
}
/**update user profile */
export const updateUserProfile= async(data,image)=>{
  
try {
  const id= localStorage.getItem("userId");
  const formData = new FormData();
  formData.append("image",image);
  formData.append("userdata",JSON.stringify(data))
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
     
    },
    withCredentials: true,
  };
  const res = await axios.post(`${BaseURL}user/${id}`,formData,config);
  const resData = res.data;
    return resData;
  
} catch (error) {
  console.log(error);
    throw error
  
}
}
/** Get Admin Profile */
export const AdminProfiles = async()=>{
  const id= localStorage.getItem("adminId");
  const res = await axios.get(`${BaseURL}admin/${id}`);
  if(res.status!==200){
    return console.log("unexpected error");
  }


  const resData = res.data;
  console.log("resData:",resData);
  return resData
}
/**update admin profile */
export const updateAdminProfile= async(data,image)=>{
  
  try {
    const id= localStorage.getItem("adminId");
    const formData = new FormData();
    formData.append("image",image);
    formData.append("admindata",JSON.stringify(data))
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
       
      },
      withCredentials: true,
    };
    const res = await axios.post(`${BaseURL}admin/${id}`,formData,config);
    const resData = res.data;
      return resData;
    
  } catch (error) {
    console.log(error);
      throw error
    
  }
  }

  /** Get Owner Profile */
export const OwnerProfiles = async()=>{
  const id= localStorage.getItem("ownerId");
  const res = await axios.get(`${BaseURL}owner/${id}`);
  if(res.status!==200){
    return console.log("unexpected error");
  }


  const resData = res.data;
  console.log("resData:",resData);
  return resData
}
/**update owner profile */
export const updateOwnerProfile= async(data,image)=>{
  
  try {
    const id= localStorage.getItem("ownerId");
    const formData = new FormData();
    formData.append("image",image);
    formData.append("ownerdata",JSON.stringify(data))
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
       
      },
      withCredentials: true,
    };
    const res = await axios.post(`${BaseURL}owner/${id}`,formData,config);
    const resData = res.data;
      return resData;
    
  } catch (error) {
    console.log(error);
      throw error
    
  }
  }

  /**get all users */
  export const getUsers = async()=>{
    const id= localStorage.getItem("adminId");
    const res = await axios.get(`${BaseURL}admin/users/${id}`);
    if(res.status!==200){
      return console.log("unexpected error");
    }
    const resData = res.data;
    console.log("resData:",resData);
    return resData
  
  }
  /* get movies*/
  export const getMovies = async()=>{
    const id= localStorage.getItem("adminId");
    const res = await axios.get(`${BaseURL}admin/movies/${id}`);
    if(res.status!==200){
      return console.log("unexpected error");
    }
    const resData = res.data;
    console.log("resData:",resData);
    return resData
  
  }
  /* Add Movie*/
  export const AddMovie = async (movieData, file) => {
    try {
      const id = localStorage.getItem('adminId');
      const formData = new FormData();
      formData.append('image', file);
      formData.append('admindata', JSON.stringify(movieData));
      const admintoken = localStorage.getItem('admintoken')
  
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${admintoken}`,
        },
        withCredentials: true,
      };
  
      const res = await axios.post(`${BaseURL}admin/movie/${id}`, formData, config);
      const resData = res.data;
      return resData;
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
 
 