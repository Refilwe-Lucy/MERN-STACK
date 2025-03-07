import React, { useState, useContext } from 'react';
import { AppContent } from '../context/AppContext';
//import InternList from './InternList';

const AddInternFormContent: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    internId: '',
    dob: '',
    gender: '',
    maritalStatus: '',
  });

  const { registerIntern, internLoading, internError } = useContext(AppContent);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    registerIntern(formData); 
  };

  return (
    <div className="bg-white p-6  shadow-md">
      <h2 className="text-2xl mb-4">Add New Intern</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4">
          <input
            name="name"
            type="text"
            placeholder="Insert Name"
            className="border p-2 rounded"
            onChange={handleChange}
            value={formData.name}
          />
          <input
            name="email"
            type="email"
            placeholder="Insert Email"
            className="border p-2 rounded"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            name="password"
            type="password"
            placeholder="Insert Password"
            className="border p-2 rounded"
            onChange={handleChange}
            value={formData.password}
          />
          <input
            name="internId"
            type="text"
            placeholder="Intern ID"
            className="border p-2 rounded"
            onChange={handleChange}
            value={formData.internId}
          />
          <input
            name="dob"
            type="date"
            className="border p-2 rounded"
            onChange={handleChange}
            value={formData.dob}
          />
          <select
            name="gender"
            className="border p-2 rounded"
            onChange={handleChange}
            value={formData.gender}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <select
            name="maritalStatus"
            className="border p-2 rounded"
            onChange={handleChange}
            value={formData.maritalStatus}
          >
            <option value="">Select Status</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
            <option value="Divorced">Divorced</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded mt-4"
          disabled={internLoading}
        >
          {internLoading ? 'Registering...' : 'Add Intern'}
        </button>
        {internError && <div className="text-red-500 mt-2">{internError}</div>}
      </form>
    </div>
  );
};

export default AddInternFormContent;
