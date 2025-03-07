import React, { useContext, useState } from "react";
import {  useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppContent } from "../context/AppContext";
import bgImage from '../assets/Images/bg-image.jpg'
import axios from "axios";
//import { Navigate } from 'react-router-dom'

interface LoginResponce {
    message: string;
    token?: string;
    role?: string;
    _id?: string
}


const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole ] = useState<string>('intern');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [successMessage, setSuccessMessage] = useState<string>('');
  const navigate = useNavigate();
  
  const { backendUrl, setIsLoggedin, getAdminProfile } = useContext( AppContent); 

  const loginSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');
   // console.log('Login submitted with:', { email, password });

  try{
    axios.defaults.withCredentials = true;
    const response = await axios.post(`${ backendUrl}/api/login/auth`, {
      email,
      password,
      role,

    });
    

    const data: LoginResponce = await response.data;

        if(!response.data.success){
            //setErrorMessage(data.message);
            //toast.error(data.message || "Login failed, please try again.");
        }else{
            setSuccessMessage(data.message); 
            setIsLoggedin(true);
            
            toast.success(data.message || "Login successful!");
            console.log(data._id);
            const id = data._id || '';
           sessionStorage.setItem("id", id);
            localStorage.setItem("token", data.token || "");
            localStorage.setItem("adminName", data.message || "");

            if(data.role === 'admin'){
                navigate('/adminDashboard');
                toast.success("Login Successfull!");
                setIsLoggedin;
                getAdminProfile();
              
            }else if(data.role === 'intern'){
                navigate('/internDashboard');
            }else{
                setErrorMessage("Role not recognized");
                //toast.error("Role not recognized");
            }
        }

  
     }catch(error : any){
        setErrorMessage("An error occurred, please try again.");
        toast.error("An error occurred, please try again.");

   }finally{
    setIsLoading(false);
   }
   
  };

  return (
    
    <div  style={{
      backgroundImage: `url(${bgImage})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh', // Ensure the div takes up full height
      padding: '20px', // Add padding to avoid the form being too close to the edges
    }}>
    <div className="flex justify-center items-center">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-lg mt-30" style={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(2px)',
          borderRadius: '12px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)'
        }}>
            <div className="">
            <h1 className="text-2xl text-center py-10 text-gray-900">
            Login to Your Account
          </h1>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          {successMessage && <p className="text-green-500">{successMessage}</p>}

          <form onSubmit={loginSubmitHandler}> 
            <div className="mb-10">
              <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full rounded-md p-3 border border-gray-500 focus:outline-none focus:ring-purple-100 focus:border-purple-100 text-gray-800"
                placeholder="Your Email"
              />
            </div>

            <div className="mb-8">
              <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full rounded-md p-3 border border-gray-500 focus:outline-none focus:ring-purple-100 focus:border-purple-100 text-gray-800"
              />
            </div>
            <div className="mb-8">
                <label htmlFor="role" className="block text-sm font-medium text-gray-900">
                  Select Role
                </label>
                <select
                  id="role"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="mt-1 block w-full bg-gray-800 p-3 rounded-md border border-purple-100 shadow-sm focus:outline-none focus:ring-purple-100 focus:border-purple-100 text-gray-400"
                >
                  <option value="admin">Admin</option>
                  <option value="intern">Intern</option>
                </select>
              </div>

            <div className="mb-8">
                
                <button
                type="submit"
                className="w-full bg-gray-500  text-gray-900 py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-700 "
                disabled={isLoading}>
                Submit
              </button>
                
            
            </div>

            <div className=" flex justify-between px-2">
                
                <p className="text-gray-900">Forgot password?</p>
                <p className="text-gray-900">Admin</p>
           
            </div>
           
          </form>

            </div>
         
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginForm;







