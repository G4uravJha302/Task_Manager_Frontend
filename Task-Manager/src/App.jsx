import RegistrationPage from './Pages/Auth/Registration.jsx';
import Login from './Pages/Auth/Login_Page.jsx';
import Dashboard from './Pages/DashBoard/Dash_Board.jsx';
import './App.css'
import { Routes, Route } from "react-router";
 

function App() {
  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<RegistrationPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>


      
    </>
  )
}

export default App
