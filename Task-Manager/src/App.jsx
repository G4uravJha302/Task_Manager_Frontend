import Registration from './Pages/Auth/Registration.jsx';
import Login from './Pages/Auth/Login_Page.jsx';
import Dashboard from './Pages/DashBoard/Dash_Board.jsx';
import AddTask from './Pages/HomePage/Add_Task.jsx';
import './App.css'
import { Routes, Route } from "react-router";
 

function App() {
  return (
    <>
    <div>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/AddTask" element={<AddTask />} />
      </Routes>
    </div>


      
    </>
  )
}

export default App
