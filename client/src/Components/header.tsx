import React from 'react'
import NavBar from './Navbar';
import bgImage from '../assets/Images/bg-image-2.jpg'
//import Login from '../pages/LoginPage'


const Header: React.FC = () =>{
    
    return(
    
        <header style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <NavBar/>  
            
            <h1 className='text-purple-100 text-2xl px-10 text-center py-10  '>Welcome to our Website</h1>
            <div className='flex h-screen items items-center justify-center'>
            <div className=" flex items-center justify-center bg-gray-900 text-white">
        <div className="text-center">
       
          
        </div>
      </div>

      
      <div className=""></div>

    
      
      </div>

           
            
              

      
          
      </header>
     
      
    )
}
    export default Header;