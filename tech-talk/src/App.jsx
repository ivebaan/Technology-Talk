import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import Login from "./auth/Login";
import Register from "./auth/Register";
import Home from "./pages/Home";
import Communities from "./pages/Communities";
import Landing from "./layout/Landing";
import Settings from "./pages/Settings";


function App() {
  return ( 
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/technology" element={<Landing/>}/>

        
        <Route path="/app" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="communities" element={<Communities />} />
          <Route path="settings" element={<Settings/>} />
        </Route>
      </Routes> 
      </BrowserRouter>  
  );
}

export default App;
