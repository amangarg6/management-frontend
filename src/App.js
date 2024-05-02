import React, {} from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Register from './Component/Register';
import Login from './Component/Login';
import Employee from './Component/Employee';
import Home from './Component/Home';
import PrivateRoute from './Component/PrivateRoute';
import Navbar from './Component/Navbar';
import Company from './Component/Company';
import Designation from './Component/Designation';
import UserEmployee from './Component/UserEmployee';
import ApplyButton from './Component/ApplyButton';
import Search from './Component/Search';


function App() {
  const location = useLocation();
  const pathname = location.pathname;
  const userData = localStorage.getItem('userData');
  const user = userData ? JSON.parse(userData) : null;

  
  return (
    <div>
      { pathname !== '/' && pathname !== '/register' && pathname !== '/login' && <Navbar />}
      {/* private routes */}
      
      <Routes>
        <Route path="/app" element={<PrivateRoute />}>
          <Route path="/app/home" element={<Home />} />
          <Route path="/app/employee" element={<Employee />} />
          <Route path="/app/company" element={<Company />} />
          <Route path="/app/designation" element={<Designation />} />
          <Route path="/app/useremployee" element={<UserEmployee />} />
     <Route path="/app/applybutton" element={<ApplyButton />} />
     <Route path="/app/search" element={<Search />} />
          
          
        </Route>
        {/* public routes */}
        <Route path="/" element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register /> } />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </div>
  );
}

export default App;



