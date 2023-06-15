import React from 'react'
import {Route,Routes} from 'react-router-dom'

import UserPublicRoutes from './UserPublicRoutes'
import UserProtectedRoutes from './UserProtectedRoutes';
import Home from '../pages/Home';
import Movies from '../pages/Movies/Movies';

import User from '../pages/User/User';
import UserProfile from '../pages/Profile/userProfile';
import UserRegistration from '../pages/User/UserRegister';
import MoviePage from '../pages/User/MoviePage';
import SeatSelection from '../pages/User/SeatSelection';
const UserRoutes = () => {
  return (
    <>
      <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/movies" element={<Movies />} />
          <Route exact path="/login" element={<UserPublicRoutes><User /></UserPublicRoutes>} />
          <Route exact path="/register" element={<UserPublicRoutes><UserRegistration /></UserPublicRoutes>} />
          <Route path="/profile" element={<UserProtectedRoutes><UserProfile /></UserProtectedRoutes>} />
          <Route path ='/viewmovie/:id' element ={<MoviePage/>}/>
          <Route path='/movieseats' element ={<SeatSelection/>}/>
       
         
        </Routes>
    </>
  )
}

export default UserRoutes
