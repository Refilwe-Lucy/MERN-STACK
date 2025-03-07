/*import React, { useState, useContext } from 'react';
import { AppContent } from '../context/AppContext'; // Correct import path for the context
import { toast } from 'react-toastify';

const ApplyLeaveForm = () => {
  const { createLeaveRequest, leaveLoading, leaveError } = useContext(AppContent);


  const [leaveType, setLeaveType] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!leaveType || !fromDate || !toDate || !description) {
      toast.error('Please fill all fields');
      return;
    }

    const leaveRequestData = {
      id: '',
      internId: '',  // Ensure this is set to the logged-in intern's ID
      type: leaveType,
      from: fromDate,
      to: toDate,
      description: description,
      status: 'Pending',
      appliedDate: new Date().toISOString(),
      statusChanged: false,
    };

    createLeaveRequest(leaveRequestData);
  };

  return (
    <div>
      <h2>Apply for Leave</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Leave Type</label>
          <select value={leaveType} onChange={(e) => setLeaveType(e.target.value)}>
            <option value="">Select Leave Type</option>
            <option value="Sick">Sick</option>
            <option value="Vacation">Vacation</option>
            <option value="Personal">Personal</option>
          </select>
        </div>
        <div>
          <label>From Date</label>
          <input type="date" value={fromDate} onChange={(e) => setFromDate(e.target.value)} />
        </div>
        <div>
          <label>To Date</label>
          <input type="date" value={toDate} onChange={(e) => setToDate(e.target.value)} />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        {leaveError && <p style={{ color: 'red' }}>{leaveError}</p>}
        <button type="submit" disabled={leaveLoading}>Submit</button>
      </form>
    </div>
  );
};

export default ApplyLeaveForm;

*/
import React, { useState, useContext } from 'react';
import { AppContent } from '../context/AppContext'; 
import { toast } from 'react-toastify';

const ApplyLeaveForm = () => {
  const { internId, createLeaveRequest, leaveLoading, leaveError } = useContext(AppContent);

  const [leaveType, setLeaveType] = useState<string>('');
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [description, setDescription] = useState<string>('');

 
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

   
    if (!leaveType || !fromDate || !toDate || !description) {
      toast.error('Please fill all fields');
      return;
    }

 
    const leaveRequestData = {
      id: '',
      internId: internId,  
      type: leaveType,
      from: fromDate,
      to: toDate,
      description: description,
      status: 'Pending',  
      appliedDate: new Date().toISOString(), 
      statusChanged: false,  
    };

    
    createLeaveRequest(leaveRequestData);
  };

  return (
    <div className="flex items-center justify-center min-h py-20">
    <div className="w-2/7 p-4 shadow-2xl rounded-xl">
    <div className=" flex items-center justify-center">
    <h2 className="text-2xl font-bold mb-4 ">Apply for Leave</h2>

    </div>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="leaveType" className="block mb-2">Leave Type</label>
          <select
            id="leaveType"
            value={leaveType}
            onChange={(e) => setLeaveType(e.target.value)}
            className="border p-2 rounded w-full"
          >
            <option value="">Select Leave Type</option>
            <option value="Sick">Sick</option>
            <option value="Vacation">Vacation</option>
            <option value="Personal">Personal</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="fromDate" className="block mb-2">From Date</label>
          <input
            type="date"
            id="fromDate"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="toDate" className="block mb-2">To Date</label>
          <input
            type="date"
            id="toDate"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block mb-2">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded w-full"
            rows={4}
          />
        </div>

        {leaveError && <p className="text-red-500 mb-4">{leaveError}</p>}

        <button
          type="submit"
          className="bg-green-500 text-white w-full py-2 rounded-xl"
          disabled={leaveLoading} 
        >
          {leaveLoading ? 'Submitting...' : 'Submit'}
        </button>
      </form>
    </div>
    </div>
  );
};

export default ApplyLeaveForm;




