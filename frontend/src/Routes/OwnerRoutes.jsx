import React from 'react'
import {Route,Routes} from 'react-router-dom'


import OwnerLogin from '../pages/Owner/OwnerLogin';
import OwnerRegister from '../pages/Owner/OwnerRegister';
import OwnerHome from '../pages/Owner/OwnerHome';
import OwnerProfile from '../pages/Profile/Ownerprofile';
import OwnerProtectedRoutes from './OwnerProtectedRoutes';
import OwnerPublicRoutes from './OwnerPublicRoutes';
const OwnerRoutes =()=>{
    return (
        <>
         <Routes>
         <Route path="/login" element={<OwnerPublicRoutes><OwnerLogin /></OwnerPublicRoutes>} />
          <Route path="/owner_register" element={<OwnerPublicRoutes><OwnerRegister /></OwnerPublicRoutes>} />
          <Route path="/home" element={<OwnerProtectedRoutes><OwnerHome /></OwnerProtectedRoutes>} />
          <Route path="/ownerprofile" element={<OwnerProtectedRoutes><OwnerProfile/></OwnerProtectedRoutes>} />
            
            </Routes>
        </>
      )
}
export default OwnerRoutes