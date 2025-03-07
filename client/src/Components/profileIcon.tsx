/*import React, { useState, useEffect } from 'react';

interface ProfileData {
  success: boolean;
  initials: string;
  message?: string;
}

const ProfileIcon: React.FC = () => {
  const [initials, setInitials] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Fetch the admin profile when the component mounts
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            //credentials: 'include',
          },
        });

        const data: ProfileData = await response.json();
      
        


        if (data.success) {
          setInitials(data.initials); // Set the initials from the API response
        } else {
          setError(data.message || 'Unknown error'); // Handle error (e.g., admin not found)
        }
      } catch (error) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }
    

  return (
    <div className="flex relative inline-block">
      <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-lg">
        {initials}
      </div>
    </div>
  );
};

export default ProfileIcon;
*/

/*import React, { useState, useEffect } from 'react';

interface ProfileData {
  success: boolean;
  initials: string;
  message?: string;
}

const ProfileIcon: React.FC = () => {
  const [initials, setInitials] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Assume you have the email of the logged-in admin
        const email = 'admin@example.com'; // Replace with actual logged-in email

        const response = await fetch('http://localhost:5000/api/user/profile', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }), // Send the email in the body
        });

        const data: ProfileData = await response.json();
        console.log(data); // Debugging the response

        if (data.success) {
          setInitials(data.initials); // Set the initials from the API response
        } else {
          setError(data.message || 'Unknown error'); // Handle error (e.g., admin not found)
        }
      } catch (error) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex relative inline-block">
      <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-lg">
        {initials}
      </div>
    </div>
  );
};

export default ProfileIcon;
*/

/*import React, { useState, useEffect } from 'react';

interface ProfileData {
  success: boolean;
  initials: string;
  message?: string;
}

const ProfileIcon: React.FC = () => {
  const [initials, setInitials] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        
        const email = 'makuwalucy@gmail.com'; // Replace with actual logged-in email
        //const email = process.env.ADMIN_EMAIL;

        // Using URLSearchParams to add email as a query parameter
        const url = new URL('http://localhost:5000/api/user/profile');
        url.searchParams.append('email', email);  // Append the email to the URL
        //const adminEmail = process.env.ADMIN_EMAIL;

        const response = await fetch(url.toString(), {
          method: 'GET', // GET request
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Check if the response is successful
        const data: ProfileData = await response.json();
        console.log(data); // Debugging the response

        if (data.success) {
          setInitials(data.initials); // Set the initials from the API response
        } else {
          setError(data.message || 'Unknown error'); // Handle error (e.g., admin not found)
        }
      } catch (error) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []); // Empty dependency array ensures this runs once on mount

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex relative inline-block">
      <div className="w-12 h-12 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold text-lg">
        {initials}
      </div>
    </div>
  );
};

export default ProfileIcon;
*/
/*import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";



interface ProfileData {
  success: boolean;
  initials: string;
  name: string;
  email: string;
  message?: string;
}

const ProfileIcon: React.FC = () => {
  const [initials, setInitials] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [adminData, setAdminData] = useState<{name: string; email: string; password: string}>({name: '', email: '', password: ''});
  const [newPassword, setNewPassword] = useState<string>('');
 


  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/user/profile`, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const data: ProfileData = await response.data;

        if (data.success) {
          setInitials(data.initials);
          setAdminData({ name: data.name, email: data.email, password: '' }); 
        } else {
          setError(data.message || 'Unknown error occurred');
        }
      } catch (error) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [backendUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

 const viewProfile = () =>{
   setIsProfileOpen(true);
   setIsDropdownOpen(false);
 }

 const closeProfileForm = () =>{
  setIsProfileOpen(false);
 }

 const handlePasswordChange = async () =>{
    try{
      const response = await axios.put(`${backendUrl}/api/user/update-password`, {
        password: newPassword,
      });
      if(response.data.success){
        alert('Password updated successfully');
      }else{
        alert('Failed to update password');
      }
    }catch(error){
      alert('Error while updating password');
    }
 };

 const openSetting = () =>{
  console.log("Setting Clicked");
}

 const logOut = () =>{
  console.log("Logout clicked")
 }
  

  const toggleDropdown = () =>{
    setIsDropdownOpen(prevState => !prevState);
  };

  return (
    <div className="flex relative inline-block">
      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-lg" onClick={toggleDropdown }>
        {initials}
         </div>
         {isDropdownOpen &&(
              <div className="absolute top-12 right-0 z-10 bg-white border rounded shadow-lg w-45 py-6">
                  <ul>
                    <div className="mb-4">
                    <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center " onClick={viewProfile}><CgProfile className="mr-2" />
                    Profile</li>
                    </div>
      <div className="mb-4">
      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" onClick={openSetting}><MdOutlineSettings className="mr-2"/>
      Settings</li>
      </div>
      
      
      <div className="mb-4">
      <li className=" px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" onClick={logOut }><LuLogOut className="mr-2"/>Logout</li>
     
      </div>
    </ul>
    </div>
         )}
        
  
 </div>
)};
{isProfileOpen && (
  <div className="absolute top-12 right-0 z-10 bg-white border rounded shadow-lg w-96 py-6 px-4">
    <h2 className="text-lg font-semibold mb-4">Profile</h2>
    <form onSubmit={(e) => e.preventDefault()}>
      <div className="mb-4">
        <label className="block text-gray-700">Name</label>
        <input
          type="text"
          value={adminData.name}
          disabled
          className="w-full px-4 py-2 border rounded-md mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={userData.email}
          disabled
          className="w-full px-4 py-2 border rounded-md mt-1"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full px-4 py-2 border rounded-md mt-1"
        />
      </div>
      <button
        type="button"
        onClick={handlePasswordChange}
        className="w-full py-2 bg-blue-500 text-white rounded-md mt-4"
      >
        Change Password
      </button>
    </form>
    <button
      onClick={closeProfileForm}
      className="w-full py-2 bg-gray-300 text-gray-700 rounded-md mt-4"
    >
      Close
    </button>
  </div>
)};



export default ProfileIcon;

*/
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { LuLogOut } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { MdOutlineSettings } from "react-icons/md";
import { FaEye, FaEyeSlash } from "react-icons/fa";


interface ProfileData {
  success: boolean;
  initials: string;
  name: string;
  email: string;
  password: string;
  message?: string;
}

const ProfileIcon: React.FC = () => {
  const [initials, setInitials] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  //const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [adminData, setAdminData] = useState<{name: string; email: string; password: string}>({name: '', email: '', password: ''});
  const [newPassword, setNewPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  //const [newName, setNewName] = useState<string>(''); 
  //const [newEmail, setNewEmail] = useState<string>('');
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
 
  useEffect(() => {
    const fetchProfile = async () => {
      const id = sessionStorage.getItem('id');
      const token = sessionStorage.getItem('token');
      if(!id || !token){
        setError('No user ID found in session storage');
        return;
      }
      console.log('User ID from sessionStorage:', id);
      console.log('Token from sessionStorage:', token);
      try {
        const response = await axios.get(`${backendUrl}/api/user/profile/${id}`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Fetched Profile:', response.data);
        const data: ProfileData = await response.data;

        if (data.success) {
          setInitials(data.initials);
          setAdminData({ name: data.name, email: data.email, password: data.password }); 
          //setNewEmail(data.email);

        } else {
          setError(data.message || 'Unknown error occurred');
        }
      } catch (error) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [backendUrl]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  const viewProfile = () => {
    setIsProfileOpen(true);
    setIsDropdownOpen(false);
  }

  const closeProfileForm = () => {
    setIsProfileOpen(false);
  }

  const handlePasswordChange = async () => {
    try {
      const response = await axios.put(`${backendUrl}/api/admin/updateAdminProfile`, {
        password: newPassword,
      });

      if (response.data.success) {
        alert('Password updated successfully');
      } else {
        alert('Failed to update password');
      }
    } catch (error) {
      alert('Error while updating password');
    }
  };

  const openSetting = () => {
   //setIsSettingsOpen(true);
   setIsDropdownOpen(false);
  }

  const logOut = () => {
    console.log("Logout clicked");
  }

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="flex relative inline-block">
      <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center text-white text-lg" onClick={toggleDropdown}>
        {initials}
      </div>

      {isDropdownOpen && (
        <div className="absolute top-12 right-0 z-10 bg-white border rounded shadow-lg w-45 py-6">
          <ul>
            <div className="mb-4">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" onClick={viewProfile}>
                <CgProfile className="mr-2" />
                Profile
              </li>
            </div>
            <div className="mb-4">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" onClick={openSetting}>
                <MdOutlineSettings className="mr-2"/>
                Settings
              </li>
            </div>
            <div className="mb-4">
              <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center" onClick={logOut}>
                <LuLogOut className="mr-2"/>
                Logout
              </li>
            </div>
          </ul>
        </div>
      )}

      {isProfileOpen && (
        <div className="absolute top-12 right-0 z-10 bg-white border rounded shadow-lg w-96 py-6 px-4">
          <h2 className="text-lg font-semibold mb-4">Profile</h2>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="mb-4">
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                value={adminData.name}
                disabled
                className="w-full px-4 py-2 border rounded-md mt-1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                value={adminData.email}
                disabled
                className="w-full px-4 py-2 border rounded-md mt-1"
              />
            </div>
            <div className="mb-4 relative">
              <label className="block text-gray-700">Password
              </label>
              <input 
                type={passwordVisible ? 'text' : 'password'}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 border rounded-md mt-1 pr-10"
                 

                
              />
              
          <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-2 text-gray-500"
                style={{ background: 'transparent', border: 'none' }}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            <button
              type="button"
              onClick={handlePasswordChange}
              className="w-full  py-2 bg-green-500 text-white rounded-md mt-4"
            >
              Change Password
            </button>
          </form>
          <button
            onClick={closeProfileForm}
            className="w-full py-2 bg-gray-300 text-gray-900 rounded-md mt-4"
          >
            Close
          </button>
        </div>
      )}
      
    </div>
   
  );
};


export default ProfileIcon;










