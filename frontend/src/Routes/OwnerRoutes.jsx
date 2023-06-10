import React from 'react'
import {Route,Routes} from 'react-router-dom'


import OwnerLogin from '../pages/Owner/OwnerLogin';
import OwnerRegister from '../pages/Owner/OwnerRegister';
import OwnerHome from '../pages/Owner/OwnerHome';
import OwnerProfile from '../pages/Profile/Ownerprofile';
const OwnerRoutes =()=>{
    return (
        <>
         <Routes>
         <Route path="/login" element={<OwnerLogin />} />
          <Route path="/owner_register" element={<OwnerRegister />} />
          <Route path="/home" element={<OwnerHome />} />
          <Route path="/ownerprofile" element={<OwnerProfile/>} />
            
            </Routes>
        </>
      )
}
export default OwnerRoutes