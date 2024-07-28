import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import { Route, Routes, Navigate } from "react-router-dom";
import Adminlogin from "./Pages/Login/adminlogin";
import Categories from "./Pages/Categories/category";
import Courseincategory from "./Pages/Categories/coursesinacategory";
import Postaresource from "./Pages/Resources/Postaresource";
import Viewresources from "./Pages/Resources/viewresources";
import Vieweachresource from "./Pages/Resources/vieweachresouce";
import Contactus from "./Pages/Contactus/Contactus";
import ConfirmResources from "./Pages/Resources/ConfirmResources";
import useLoginStore from "./Zustand/Loginstore";
import Footer from "./Components/Footer";

function App() {
  const { isAuthenticated } = useLoginStore();
  const [loginstatus, setLoginStatus] = useState(isAuthenticated);

  useEffect(() => {
    setLoginStatus(isAuthenticated);
  }, [isAuthenticated]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin-login"
          element={loginstatus ? <Navigate to="/" /> : <Adminlogin />}
        />
        <Route path="/post-resources" element={<Postaresource />} />
        <Route path="/see-resources" element={<Viewresources />} />
        <Route path="/see-each-resources/:id" element={<Vieweachresource />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/category/course/:category" element={<Courseincategory/>} />
        <Route
          path="/confirm-resources"
          element={
            loginstatus ? <ConfirmResources /> : <Navigate to="/admin-login" />
          }
        />
        <Route path="/contact-us" element={<Contactus />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
