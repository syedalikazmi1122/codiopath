import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import { Route ,Routes } from "react-router-dom";
import Adminlogin from './Pages/Login/adminlogin';
import Categories from './Pages/Categories/category';
import Postaresource from './Pages/Resources/Postaresource';
import Viewresources from './Pages/Resources/viewresources';
import Vieweachresource from './Pages/Resources/vieweachresouce';
import Aboutus from './Pages/aboutus';
function App() {
  return (
    <div className='' >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/admin-login" element={<Adminlogin />} />
        <Route path="/post-resources" element={<Postaresource />} />
        <Route path="/see-resources" element={<Viewresources />} />
        <Route path="/see-each-resources" element={<Vieweachresource />} />
        <Route path="/categories" element={<Categories />} />
        <Route path ="/about-us" element = {<Aboutus />} />
      </Routes>
    
    </div>
  );
}

export default App;
