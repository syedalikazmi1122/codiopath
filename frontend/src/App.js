import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import { Route ,Routes } from "react-router-dom";
import Adminlogin from './Pages/Login/adminlogin';
import Categories from './Pages/Categories/category';
import Postaresource from './Pages/Resources/Postaresource';
function App() {
  return (
    <div className='' >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/admin-login" element={<Adminlogin />} />
        <Route path="/post-resources" element={<Postaresource />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    
    </div>
  );
}

export default App;
