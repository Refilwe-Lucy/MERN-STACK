import React from 'react';
import { Link } from 'react-router-dom';
import { CiLogin } from "react-icons/ci";



const NavBar: React.FC = () =>{
    return(
      
        <nav className='flex justify-between items.center px-10 py-5 justify-end'>
             <Link to = '/login'>
          <button className='text-purple-100 border border-1 px-3 py-1 flex items-center rounded-full'>Login
            <CiLogin className='w-5 h-5 text-purple-100 '/>
            </button>  </Link>
            </nav>
          
        
        
    )
}
export default NavBar;