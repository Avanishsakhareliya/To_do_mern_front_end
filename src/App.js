import './App.css';
import { Routes, Route, Navigate } from "react-router-dom";
import Signup from './Component/Signup';
import Login from './Component/Login';
import Home from './Component/Home';
import Nav from './Component/Nav';
import React from 'react';



const PrivateRoutes = ({ path, component }) => {


  const geted_token = localStorage.getItem("user_token")
  console.log("gettoken", geted_token);
  return (<>
    <Routes>
      {geted_token && geted_token !== "" ? <Route path={path} element={component} /> : <Route element={
        <Navigate exact to="/" state={{ from: <Signup /> }} />
      } />
      }
    </Routes>
  </>)
}


function App() {

  const geted_token = localStorage.getItem("user_token")
  console.log("getted", geted_token);
  return (
    <>
      <Nav />
      <Routes>

        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/login" element={<Login />} exact />
        <Route exact path="/" index element={<Signup />} />

      </Routes>
      <PrivateRoutes
        path="/home"
        component={<Home />}
      />


    </>
  );
}

export default App;
