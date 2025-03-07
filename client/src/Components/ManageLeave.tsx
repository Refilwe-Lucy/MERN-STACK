/*import React, { useState, useEffect, useContext  } from "react";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const ManageLeaves: React.FC = () => {
  const { getLeaveRequests, leaveRequests, leaveLoading, leaveError, updateLeaveStatus } = useContext(AppContent);
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    getLeaveRequests();
  },[getLeaveRequests])

  const filteredLeaves = leaveRequests.filter((leave) =>
    leave.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddLeave = () => {
    navigate("/apply-leave"); 
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    updateLeaveStatus(id, newStatus); // Update leave status
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US"); // "MM/DD/YYYY" format
  };

  return (
    <div className="w-4/5 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Leaves</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleAddLeave} 
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
          </tr>
        </thead>
        <tbody>
          {filteredLeaves.map((leave, index) => (
            <tr key={leave.internId} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{leave.type}</td>
              <td className="border p-2">{formatDate(leave.from)}</td>
              <td className="border p-2">{formatDate(leave.to)}</td>
              <td className="border p-2">{leave.description}</td>
              <td className="border p-2">{formatDate(leave.appliedDate)}</td>
              <td className="border p-2 text-red-600">{leave.status}</td>
              <td className="border p-2">
                <select

                 className="p-2"
                 value={leave.status}
                 onChange={(e) => handleStatusChange(leave.internId.toString(), e.target.value)}>
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                 </select>
                 </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageLeaves;
*/
import React, { useState, useEffect, useContext } from "react";
import { AppContent } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const ManageLeaves: React.FC = () => {
  const { getLeaveRequests, leaveRequests, leaveLoading, leaveError, updateLeaveStatus } = useContext(AppContent);
  const [search, setSearch] = useState("");
  const navigate = useNavigate(); 

  useEffect(() => {
    getLeaveRequests();
  }, []);

  const filteredLeaves = leaveRequests.filter((leave) =>
    leave.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddLeave = () => {
    navigate("/apply-leave");
  };

  const handleStatusChange = (id: string, newStatus: string) => {
    updateLeaveStatus(id, newStatus); 
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US"); 
  };
  if (leaveLoading) {
    return <p>Loading leave requests...</p>;
  }


  return (
    <div className="w-4/5 p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Manage Leaves</h1>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={handleAddLeave}
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
          {filteredLeaves.map((leave, index) => (
            <tr key={leave.internId} className="text-center">
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{leave.type}</td>
              <td className="border p-2">{formatDate(leave.from)}</td>
              <td className="border p-2">{formatDate(leave.to)}</td>
              <td className="border p-2">{leave.description}</td>
              <td className="border p-2">{formatDate(leave.appliedDate)}</td>
              <td className="border p-2 text-red-600">{leave.status}</td>
              <td className="border p-2">
                <select
                  className="p-2"
                  value={leave.status}
                  onChange={(e) => handleStatusChange(leave.id, e.target.value)} 
                >
                  <option value="Pending">Pending</option>
                  <option value="Approved">Approved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageLeaves;





