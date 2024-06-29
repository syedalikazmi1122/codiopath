import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import Home from './Pages/Home/Home';
import { Route ,Routes } from "react-router-dom";
import Adminlogin from './Pages/Login/adminlogin';
function App() {
  return (
    <div className='' >
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/about" element={<About />} /> */}
        <Route path="/admin-login" element={<Adminlogin />} />
      </Routes>
    
    </div>
  );
}

export default App;
