import './App.css';
import { Route, Routes} from 'react-router-dom';
import {BrowserRouter} from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Homepage from './components/homepage';
import StaffDashboard from './components/staff-dashboard';
import ManagerDashboard from './components/manager-dashboard';
import StudentDashboard from './components/student-dashboard';
import Private from './components/protectedroutes';


function App() {

  return (
    <BrowserRouter>
        <Routes>
            {/* <Route path="/" element={<Login/>}/>
            <Route path="/" element={<Signup/>}/> */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/homepage" element={<Homepage />} />
            {/* <Route path="/staff-dashboard" element={<StaffDashboard />} /> */}
            <Route path="/manager-dashboard" element={<Private Component={ManagerDashboard} />} />
            <Route path="/student-dashboard" element={<Private Component={StudentDashboard} />} />
            <Route path="/staff-dashboard" element={<Private Component={StaffDashboard} />} />
           
        </Routes>
      </BrowserRouter>
    
  )
}

export default App;
