/*import React, { useState } from 'react';
import { RxDashboard } from "react-icons/rx";
import { FaTimesCircle } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import ManageLeaves from "../Components/leaveForm";






const internDashboard: React.FC = () =>{

    const [activeMenu, setActiveMenu] = useState<string>("");
    const handleMenuClick = (menu: string) => {
      setActiveMenu(menu);
    };

  return(
    
    <div className="flex h-screen ">
      <div>
      
      </div>
      

     <aside className="w-1/9 bg-gray-900">
     <ul>
     <li className="text-xl font-semibold mb-4 text-gray-400 py-4 px-5 flex items-center hover:by-gray-700 rounded cursor-pointer " onClick={() => handleMenuClick("dashboard")}><RxDashboard className="mr-4"/>
     Dashboard</li>
     <li className="text-gray-400 text-xl mb-4 font-semibold px-5 flex items-center py-4 hover:bg-gray-700 rounded cursor-pointer"  onClick={() => handleMenuClick("leave")}><FaTimesCircle  className="mr-4"/>
     Leave</li>
     <li className="text-gray-400 text-xl px-5 py-4 mb-4 font-semibold flex items-center hover:bg-gray-700 rounded cursor-pointer" onClick={() =>handleMenuClick("Attendance")}><FaCalendar  className="mr-4"/>
     Attendance</li>
     
     <li className="text-gray-400 text-xl items-center flex py-4 px-5 font-semibold hover:bg-gray-700 rounded cursor-pointer" onClick={() => handleMenuClick("settings")}><MdOutlineSettings className="mr-4 w-6 h-8"/>
     Settings</li>
     
    

     </ul>
     
  
     </aside>
    
     {activeMenu === 'leave' && (
      <>
        <ManageLeaves/>
      
      </>
     )}
    
     </div> 
    
    
    
    
  )
}
  

 
     
    
 

export default internDashboard;
*/
import React, { useState } from 'react';
import { RxDashboard } from "react-icons/rx";
import { FaTimesCircle } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";
import { FaCalendar } from "react-icons/fa";
import InternManagementLeave from "./InternManageLeaves";
import ProfileIcon from './profileIcon';
//import ManageLeaves from './ManageLeave';
//import InternManagementLeave from './InternManageLeaves';
//import ManageLeaves from "./ManageLeave";
//import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'; 
//import LeaveApplicationForm from './LeaveApplicationForm';

const internDashboard: React.FC = () => {

    const [activeMenu, setActiveMenu] = useState<string>("");

    const handleMenuClick = (menu: string) => {
      setActiveMenu(menu);
    };

  return(
    <div className="flex h-screen flex-col">

   
      <div className="bg-gray-800 text-white py-4 px-6 flex items-center justify-between shadow-md">
        <h1 className="text-2xl font-semibold"></h1>
        <div className="flex items-center">
       
          <div className="text-white">Welcome</div>
        </div>
      </div>

     
      <div className="flex flex-1">
      
      
        <aside className="w-1/9 bg-gray-900">
          <ul>
            <li className="text-xl font-semibold mb-4 text-gray-400 py-4 px-5 flex items-center hover:bg-gray-700 rounded cursor-pointer " onClick={() => handleMenuClick("dashboard")}>
              <RxDashboard className="mr-4"/>
              Dashboard
            </li>
            <li className="text-gray-400 text-xl mb-4 font-semibold px-5 flex items-center py-4 hover:bg-gray-700 rounded cursor-pointer" onClick={() => handleMenuClick("leave")}>
              <FaTimesCircle className="mr-4"/>
              Leave
            </li>
            <li className="text-gray-400 text-xl px-5 py-4 mb-4 font-semibold flex items-center hover:bg-gray-700 rounded cursor-pointer" onClick={() =>handleMenuClick("attendance")}>
              <FaCalendar className="mr-4"/>
              Attendance
            </li>
            <li className="text-gray-400 text-xl items-center flex py-4 px-5 font-semibold hover:bg-gray-700 rounded cursor-pointer" onClick={() => handleMenuClick("settings")}>
              <MdOutlineSettings className="mr-4 w-6 h-8"/>
              Settings
            </li>
          </ul>
        </aside>
        

        <div className="flex-1 p-5 bg-gray-100">
  
          {activeMenu === 'leave' && <InternManagementLeave />}
        
        </div>
        <div className="flex justify-end px-10">
          <ProfileIcon />
        </div>
        
      </div>
    
    </div> 
  );
}

export default internDashboard;
