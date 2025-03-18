import { createContext, useState, ReactNode, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

interface UserData {
  name: string;
  email: string;
  initials?: string;  
  password: string;
  internId: string;
}

interface AppContextType {
  backendUrl: string;
  isLoggedin: boolean;
  setIsLoggedin: React.Dispatch<React.SetStateAction<boolean>>;
  userData: UserData | null;
  setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  getAdminProfile: () => void;
  getAuthState: () => void;
  registerIntern: (formData: InternData) => void;
  internList: InternData[];
  internLoading: boolean;
  internError: string | null;
  getIntern: () => void;
  internId: string | null;
  createLeaveRequest: (formData:  LeaveRequestData) => void;
  leaveRequests: LeaveRequestData[];
  leaveLoading: boolean;
  leaveError: string | null;
  getLeaveRequests: () => void;
  updateLeaveStatus: (id: string, status: string) => void;  
 
};

interface InternData{
  name: string;
  email: string;
  password: string;
  internId: string;
  dob: string;
  gender: string;
  maritalStatus: string;
}
interface AuthResponse{
  success: boolean;
  message?: string;
}

export interface LeaveRequestData {
  id: string,
  internId: string | null;
  type: string;
  from: string;
  to: string;
  description: string;
  appliedDate: string;
  status: string;
 

}

const defaultContextValue: AppContextType = {
  backendUrl: '',
  isLoggedin: false,
  setIsLoggedin: () => {},
  userData: null,
  setUserData: () => {},
  getAdminProfile: () => {},
  getAuthState: () => {},
  registerIntern: () => {},
  internList: [],
  internLoading: false,
  internError: null,
  getIntern: () =>{},
  createLeaveRequest: () => {},
  leaveRequests: [],
  leaveLoading: false,
  leaveError: null,
  getLeaveRequests: () => {},
  updateLeaveStatus: () => {},
  internId: null,
};

export const AppContent = createContext<AppContextType>(defaultContextValue);

interface AppContextProviderProps {
  children: ReactNode;
}

export const AppContextProvider: React.FC<AppContextProviderProps> = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [isLoggedin, setIsLoggedin] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [internList, setInternList] = useState<InternData[]>([]);
  const [internLoading, setInternLoading] = useState<boolean>(false);
  const [internError, setInternError] = useState<string | null>(null);
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequestData[]>([]);
  const [leaveLoading, setLeaveLoading] = useState<boolean>(false);
  const [leaveError, setLeaveError] = useState<string | null>(null);


  
  const getAuthState = async () => {
    try {
      const { data } = await axios.get<AuthResponse>(`${backendUrl}/api/login/is-auth`,{
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
        },
      });
      
      if (data.success) {
        setIsLoggedin(true);
        getAdminProfile(); 
      } else {
        setIsLoggedin(false);
        toast.error('You are not authenticated');
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication check failed');
    }
  };

  const getAdminProfile = async () => {

    const id = sessionStorage.getItem('id');
    const token = sessionStorage.getItem('token');
    if(!id || !token){
      toast.error('No user ID found in session storage');
      return;
    }
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/profile/${id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (data.success) {
        setUserData(data);  
        setIsLoggedin(true); 
      } else {
        toast.error(data.message || 'Failed to fetch user data');
      }
    } catch (error: any) {
      toast.error(error.message || 'Something went wrong');
    }
  };

  const registerIntern = async (formData: InternData) =>{
    setInternLoading(true);
    setInternError(null);

    try{
      const response = await axios.post(`${backendUrl}/api/auth/register`, formData);
         //console.log(req.body);
        if(response.data.success){
          toast.success('Intern registered successfully');
        }else{
          toast.error(response.data.message || 'failed to register intern.');
          setInternError(response.data.message);
        }
    }catch(error){
      toast.error('Error while registering intern: ' + (error instanceof Error ? error.message : 'Unknown error'));
      setInternError('Failed to register intern.')
    }finally{
      setInternLoading(false);
    }
  }

  const getIntern = async () =>{
    setInternLoading(true);
    setInternError(null);

    try{
      const response = await axios.get(`${backendUrl}/api/user/internList`);
      console.log('API Response internData:', response.data);
      if(response.data.success){
        setInternList(response.data.internData);
        //console.log("Updated intern list:", response.data.internData);
      }else{
        setInternError(response.data.message || 'Failed to fetch intern data' );
      }
    }catch(error){
      setInternError('Error fetching intern data' + (error instanceof Error ? error.message : 'Unknown error'));
    }finally{
      setInternLoading(false);
    }
  };

  
  
  useEffect(()=>{
    getAuthState();
  },[]);
  

  useEffect(() => {
   /* const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedin(true);
      getUserData(); // Fetch user data if the user is logged in
    }
      */
     getAdminProfile();
  },[]);

  useEffect(() =>{
    getIntern();
  }, []);

 const createLeaveRequest = async (formData: LeaveRequestData) =>{
    setLeaveLoading(true);
    setLeaveError(null);

    try{

      const response = await axios.post(`${backendUrl}/api/leave/apply-leave`, {
        internId: formData.internId,
        type: formData.type,
        from: formData.from,
        to: formData.to,
        description: formData.description

      });
      if(response.data.success){
        toast.success('Leave request created successfully');
        getLeaveRequests();
      }else{
        toast.error(response.data.message || 'Failed to create leave request');
        setLeaveError(response.data.message);
      }
    }catch(error){
      toast.error('Error while creating leave request: ' + (error instanceof Error ? error.message : 'Unknown error'));
      setLeaveError('Failed to create leave request.');
    }finally {
      setLeaveLoading(false);
    }
 }
 // Get All Leave Requests
 const getLeaveRequests = async () => {
  setLeaveLoading(true);
  setLeaveError(null);

  try {
    const response = await axios.get(`${backendUrl}/api/leave/get-leave-requests`);
    console.log(response.data);
    if (response.data.success) {
      const leaveData = response.data.leaveRequests;
      console.log(leaveData)
      setLeaveRequests(leaveData);
    } else {
      setLeaveError('Failed to fetch leave requests');
    }
  } catch (error) {
    setLeaveError('Error fetching leave requests' + (error instanceof Error ? error.message : 'Unknown error'));
  } finally {
    setLeaveLoading(false);
  }
};

//Update Leave Request Status
  const updateLeaveStatus = async (id: string, status: string) => {
    setLeaveLoading(true);
    setLeaveError(null);

    try {
      const response = await axios.post(`${backendUrl}/api/leave/admin/approve-reject`, { 
        leaveId: id,
        action: status
       });
      if (response.data.success) {
        toast.success(`Leave request${status}d successfully`);
        getLeaveRequests(); // Refresh the list after updating status
      } else {
        toast.error(response.data.message || 'Failed to update leave status');
        setLeaveError(response.data.message);
      }
    } catch (error) {
      setLeaveError('Error updating leave status' + (error instanceof Error ? error.message : 'Unknown error'));
    } finally {
      setLeaveLoading(false);
    }
  };

  const value: AppContextType = {
    backendUrl,
    isLoggedin,
    setIsLoggedin,
    userData,
    setUserData,
    getAuthState,
    getAdminProfile,
    registerIntern,
    internLoading,
    internError,
    internList,
    getIntern,
    createLeaveRequest,
    leaveRequests,
    leaveLoading,
    leaveError,
    getLeaveRequests,
    updateLeaveStatus,
    internId: userData?.internId || null,
    

  };

  return <AppContent.Provider value={value}>{children}</AppContent.Provider>;
};















