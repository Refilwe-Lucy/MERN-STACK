
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Home';
import Login from './pages/LoginPage';
import EmailVerify from './pages/EmailVerify';
import ResetPassword from './pages/ResetPassword';
import DashboardPage from './pages/dashboardPage'
import InternPage from './pages/InternPage';
import ManageLeaves from './Components/ManageLeave';
import LeaveApplicationForm from './Components/LeaveApplicationForm';


function App() {


  return (
   <div>
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/adminDashboard' element={<DashboardPage />}/>
      <Route path='/internDashboard' element={<InternPage />}/>
      <Route path="/" element={<ManageLeaves />} />
      <Route path="/apply-leave" element={<LeaveApplicationForm />} />
      <Route path='/email-verify' element={<EmailVerify/>}/>
      <Route path='/ResetPassword' element={<ResetPassword/>}/>
      
      

    </Routes>
   </div>
  )
}

export default App
