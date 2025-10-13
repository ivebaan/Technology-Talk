import React from "react";
import Register from "./auth/Register";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/" element={<Home />} />
          {/* <Route path="/trending" element={<Trending />} />
            <Route path="/communities" element={<Communities />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
