import React from 'react'
import {Route,Routes} from 'react-router-dom'
import AdminLogin from '../pages/Admin/AdminLogin';
import Admin from '../pages/Admin/AdminHome';
import AdminProfile from '../pages/Profile/AdminProfile';
import UserDetails from '../pages/Admin/UserDetails';
import AdminPublicRoutes from './AdminPublicRoutes';
import AdminProtectedRoutes from './AdminProtectedRoutes';
import GetMovies from '../pages/Movies/GetMovies';
import AdminHeader from '../components/AdminHeader';
import AddMovie from '../components/Movie/AddMovie';
import EditMovie from '../components/Movie/EditMovie';

const AdminRoutes = () => {
  return (
    <>
    <AdminHeader/>
     <Routes>
          <Route path="/admin" element={<AdminPublicRoutes><AdminLogin /></AdminPublicRoutes>} />
          <Route path="/home" element={<AdminProtectedRoutes><Admin /></AdminProtectedRoutes>} />
          <Route path="/adminprofile" element={<AdminProtectedRoutes><AdminProfile /></AdminProtectedRoutes>} />
          <Route path ="/admin_users" element={<AdminProtectedRoutes><UserDetails/></AdminProtectedRoutes>}/>
          <Route path ="/admin_movies" element={<AdminProtectedRoutes><GetMovies/></AdminProtectedRoutes>}/>
          <Route path ="/add_movie" element={<AdminProtectedRoutes><AddMovie/></AdminProtectedRoutes>}/>
          <Route path ='/editmovie/:id'element ={<AdminProtectedRoutes><EditMovie/></AdminProtectedRoutes>}/>
         
        </Routes>
    </>
  )
}

export default AdminRoutes
