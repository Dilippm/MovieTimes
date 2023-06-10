import { Routes, Route, useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




import OwnerLogin from './pages/Owner/OwnerLogin';
import OwnerRegister from './pages/Owner/OwnerRegister';
import OwnerHome from './pages/Owner/OwnerHome';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { adminActions, userActions } from './store';

import OwnerProfile from './pages/Profile/Ownerprofile';

import UserRoutes from './Routes/Userroutes';
import AdminRoutes from './Routes/AdminRoutes';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAdminLoggedIn = useSelector((state) => state.admin.isLoggedIn);
  const isUserLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const isOwnerLoggedIn = useSelector((state) => state.owner.isLoggedIn);
  console.log("isAdminLoggedin", isAdminLoggedIn);
  console.log("isUserLoggedin", isUserLoggedIn);
  console.log("isOwnerLoggedin", isOwnerLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      dispatch(userActions.login());
    } else if (localStorage.getItem("adminId")) {
      dispatch(adminActions.login());
    }
  }, [dispatch]);

  useEffect(() => {
    if (!isUserLoggedIn && window.location.pathname === "/profile") {
      navigate("/");
    }
  }, [isUserLoggedIn, navigate]);
useEffect(()=>{
  if(isUserLoggedIn && (window.location.pathname === "/login" || window.location.pathname === "/register" )){
    navigate("/");
  }
})
  return (
    <div>
      <ToastContainer />

     
        <Routes>
         <Route exact path ="/*" element= {<UserRoutes/>}/>
         <Route exact path ="/admin/*" element ={<AdminRoutes/>}/>
         
        </Routes>
     

      

      <section>
        <Routes>
          <Route path="/owner" element={<OwnerLogin />} />
          <Route path="/owner_register" element={<OwnerRegister />} />
          <Route path="/owner_home" element={<OwnerHome />} />
          <Route path="/ownerprofile" element={<OwnerProfile/>} />
        </Routes>
      </section>
    </div>
  );
};

export default App;
