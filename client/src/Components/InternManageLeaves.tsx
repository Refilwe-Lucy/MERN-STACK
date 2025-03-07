/*import React, { useState, useEffect, useContext } from "react";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const ManageLeaves: React.FC = () => {
  const { getLeaveRequests, leaveRequests, leaveLoading, leaveError } = useContext(AppContent);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();


  const employeeId = "currentEmployeeId"; 
  
  useEffect(() => {
    getLeaveRequests(); 
  }, [getLeaveRequests]);


  const employeeLeaves = leaveRequests.filter((leave) => leave.internId === employeeId);
  
 
  const statusChangedLeaves = employeeLeaves.filter(leave => leave. status === true);
  
 
  const filteredLeaves = employeeLeaves.filter((leave) =>
    leave.status.toLowerCase().includes(search.toLowerCase())
  );

  
  const handleAddLeave = () => {
    navigate("/apply-leave");
  };


  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US"); 
  };

  return (
    <div className="w-4/5 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Your Leave Requests</h1>
        {statusChangedLeaves.length > 0 && (
          <span className="text-green-500 text-lg">•</span> 
        )}
      </div>

      <button
        className="bg-green-600 text-white px-4 py-2 rounded"
        onClick={handleAddLeave}
      >
        Add Leave
      </button>

      <input
        type="text"
        placeholder="Search By Status"
        className="border p-2 rounded w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)} 
      />

      {leaveLoading && <p>Loading leaves...</p>}
      {leaveError && <p className="text-red-500">{leaveError}</p>}

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">SNO</th>
            <th className="border p-2">LEAVE TYPE</th>
            <th className="border p-2">FROM</th>
            <th className="border p-2">TO</th>
            <th className="border p-2">DESCRIPTION</th>
            <th className="border p-2">APPLIED DATE</th>
            <th className="border p-2">STATUS</th>
            <th className="border p-2">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center py-4">No leave requests found.</td>
            </tr>
          ) : (
            filteredLeaves.map((leave, index) => (
                <tr key={leave.id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{leave.type}</td>
                <td className="border p-2">{formatDate(leave.from)}</td>
                <td className="border p-2">{formatDate(leave.to)}</td>
                <td className="border p-2">{leave.description}</td>
                <td className="border p-2">{formatDate(leave.appliedDate)}</td>
                <td className="border p-2 text-red-600">{leave.status}</td>
                <td className="border p-2">
                  {leave.status === "Approved" && <span className="text-green-500">✔️</span>}
                  {leave.status === "Rejected" && <span className="text-red-500">❌</span>}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageLeaves;

*/
import { useState, useContext, useEffect } from 'react';
import { AppContent } from '../context/AppContext'; 
import { useNavigate } from 'react-router-dom';
//import { LeaveRequestData } from '../context/AppContext';
import { toast } from 'react-toastify';

const InternManagementLeave = () => {
  const { internId, leaveRequests, leaveLoading, leaveError, getLeaveRequests } = useContext(AppContent);
  const navigate = useNavigate();
  const [search, setSearch] = useState<string>('');

  useEffect(() => {
     if(internId){
      getLeaveRequests(); 
     }else{
      console.log('No Id')
     }
   
  }, [internId, getLeaveRequests]);

 
  const filteredLeaveRequests = leaveRequests.filter(
    (leave) =>
      leave.status.toLowerCase().includes(search.toLowerCase()) &&
      leave.internId === internId
  );

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US');
  };


  /*const handleAddLeaveClick = () => {
    navigate('/apply-leave'); 
  };
  */
  const handleAddLeaveClick = () => {
    if (!internId) {
      toast.error('Intern ID is not available');
      return;
    }
    navigate('/apply-leave');
  };


  return (
    <div className="w-4/5 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">My Leave Requests</h1>
          
        <button
        
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={ handleAddLeaveClick }
        >
          Add Leave
        </button>
      </div>

      <input
        type="text"
        placeholder="Search By Status"
        className="border p-2 rounded w-full mb-4"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {leaveLoading && <p>Loading leave requests...</p>}
      {leaveError && <p className="text-red-500">{leaveError}</p>}

      <table className="w-full border-collapse border">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">SNO</th>
            <th className="border p-2">LEAVE TYPE</th>
            <th className="border p-2">FROM</th>
            <th className="border p-2">TO</th>
            <th className="border p-2">DESCRIPTION</th>
            <th className="border p-2">APPLIED DATE</th>
            <th className="border p-2">STATUS</th>
          </tr>
        </thead>
        <tbody>
          {filteredLeaveRequests.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-4">
              You have no leave requests.
              </td>
            </tr>
          ) : (
            filteredLeaveRequests.map((leave, index) => (
              <tr key={leave.id} className="text-center">
                <td className="border p-2">{index + 1}</td>
                <td className="border p-2">{leave.type}</td>
                <td className="border p-2">{formatDate(leave.from)}</td>
                <td className="border p-2">{formatDate(leave.to)}</td>
                <td className="border p-2">{leave.description}</td>
                <td className="border p-2">{formatDate(leave.appliedDate)}</td>
                <td className="border p-2 text-red-600">{leave.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default InternManagementLeave;




