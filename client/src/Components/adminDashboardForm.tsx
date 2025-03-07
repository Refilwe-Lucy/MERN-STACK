/*import React, { useContext, useState } from "react";
import { AppContent } from "../context/AppContext";
import ProfileIcon from "./profileIcon";
//import axios from "axios";
//import { AppContent } from "../context/AppContext";

const AdminDashboard: React.FC = () => {
  const [formData, setFormData] = useState({
  

    name: "",
    email: "",
    employeeId: "",
    dob: "",
    gender: "",
    maritalStatus: ""

    
  });
    //  const {backendUrl, setIsLoggedin} = useContext(AppContent)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { userData } = useContext(AppContent);


  return (
   
    <div className="flex h-screen">
 
  
      <aside className="w-1/5 bg-gray-900 text-white p-4">
        <h2 className="text-xl mb-6">Welcome <br/> {userData ? userData.name : 'Welcome'}{ } </h2>
       
          
     
        <ul>
          <li className="mb-2 p-2 hover:bg-gray-700 rounded">Dashboard</li>
          <li className="mb-2 p-2 hover:bg-gray-700 rounded">Interns</li>
          <li className="mb-2 p-2 hover:bg-gray-700 rounded">Departments</li>
          <li className="mb-2 p-2 hover:bg-gray-700 rounded">Leaves</li>
          <li className="mb-2 p-2 hover:bg-gray-700 rounded">Salary</li>
          <li className="mb-2 p-2 hover:bg-gray-700 rounded">Setting</li>
        </ul>
      </aside>
    
      
      
   
      <div className="w-4/5 p-6">
      <div className="flex justify-end px-10 ">
      <ProfileIcon/>
     
        </div>
     
        <h1 className="text-2xl mb-4">Add New Intern</h1>
        <div className="bg-white p-6 rounded shadow-md">
          <div className="grid grid-cols-2 gap-4">
            <input name="name" type="text" placeholder="Insert Name" className="border p-2 rounded" onChange={handleChange} />
            <input name="email" type="email" placeholder="Insert Email" className="border p-2 rounded" onChange={handleChange} />
            <input name="employeeId" type="text" placeholder="Employee ID" className="border p-2 rounded" onChange={handleChange} />
            <input name="dob" type="date" className="border p-2 rounded" onChange={handleChange} />
            <select name="gender" className="border p-2 rounded" onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <select name="maritalStatus" className="border p-2 rounded" onChange={handleChange}>
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>
          <button className="bg-green-600 text-white px-4 py-2 rounded mt-4">Add Employee</button>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
*/
/*import React, { useContext, useState } from "react";
import { AppContent } from "../context/AppContext";
import ProfileIcon from "./profileIcon";
import AddInternFormContent from "./AddInternFormContent";
import AddInternForm from "./AddInternForm";

const AdminDashboard: React.FC = () => {
  const { userData } = useContext(AppContent);

  const [activeMenu, setActiveMenu] = useState<string>("");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <div className="flex h-screen">
      <aside className="w-1/5 bg-gray-900 text-white p-4">
        <h2 className="text-xl mb-6">
          Welcome <br /> {userData ? userData.name : "Welcome"}
        </h2>

        <ul>
          <li
            className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => handleMenuClick("dashboard")}
          >
            Dashboard
          </li>
          <li
            className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => handleMenuClick("interns")}
          >
            Interns
          </li>
          <li
            className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => handleMenuClick("departments")}
          >
            Departments
          </li>
          <li
            className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => handleMenuClick("leaves")}
          >
            Leaves
          </li>
          <li
            className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => handleMenuClick("salary")}
          >
            Salary
          </li>
          <li
            className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => handleMenuClick("settings")}
          >
            Settings
          </li>
        </ul>
      </aside>

      <div className="w-4/5 p-6">
        <div className="flex justify-end px-10">
          <ProfileIcon />
        </div>
        {activeMenu === "settings" &&(
          <>
            <AddInternForm/>
            </>
          
        
        )}

        {activeMenu === "interns" && (
          <>
            <h1 className="text-2xl mb-4"></h1>
            <AddInternFormContent />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
*/
import React, { useContext, useState } from "react";
import { AppContent } from "../context/AppContext";
import ProfileIcon from "./profileIcon";
//import AddInternFormContent from "./AddInternFormContent";
import AddInternForm from "./AddInternForm";
import ManageLeaves from './ManageLeave';
//import InternManagementLeave from "./InternManageLeaves";
//import ManageLeaves from "./ManageLeave";

const AdminDashboard: React.FC = () => {
  const { userData } = useContext(AppContent);

  const [activeMenu, setActiveMenu] = useState<string>("");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  return (
    <div className="flex h-screen">
      <aside className="w-1/5 bg-gray-900 text-white p-4">
        <h2 className="text-xl mb-6">
          Welcome <br /> {userData ? userData.name : "Welcome"}
        </h2>

        <ul>
          <li
            className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => handleMenuClick("dashboard")}
          >
            Dashboard
          </li>
          <li
            className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => handleMenuClick("interns")}
          >
            Interns
          </li>
          <li
            className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => handleMenuClick("departments")}
          >
            Departments
          </li>
          <li
            className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => handleMenuClick("leaves")}
          >
            Leaves
          </li>
          <li
            className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => handleMenuClick("salary")}
          >
            Salary
          </li>
          <li
            className="mb-2 p-2 hover:bg-gray-700 rounded cursor-pointer"
            onClick={() => handleMenuClick("settings")}
          >
            Settings
          </li>
        </ul>
      </aside>

      <div className="w-4/5 p-6">
        <div className="flex justify-end px-10">
          <ProfileIcon />
        </div>
       {/*  {activeMenu === "settings" &&(
          <>
            <AddInternForm/>
            </>
          
        
        )}*/}
       <div className="flex-1 p-5 bg-gray-100">
  
  {activeMenu === 'leaves' && <ManageLeaves />}

  </div>
        

        {activeMenu === "interns" && (
          <>
            <h1 className="text-2xl mb-4"></h1>
            <AddInternForm />
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;


