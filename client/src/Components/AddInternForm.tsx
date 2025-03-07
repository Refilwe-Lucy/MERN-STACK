import React, { useState } from 'react';
//import { AppContent } from '../context/AppContext';
import InternList from './InternList';  
import AddInternFormContent from './AddInternFormContent'; 

const AddInternForm: React.FC = () => {
  const [showForm, setShowForm] = useState(false); 

  const toggleFormVisibility = () => {
    setShowForm((prevState) => !prevState); 
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={toggleFormVisibility}
          className="bg-green-500 text-white p-2 rounded"
        >
          {showForm ? 'Close Form' : 'Add New Intern'}
        </button>
      </div>

      {showForm && <AddInternFormContent />}
      <InternList /> 
    </div>
  );
};

export default AddInternForm;
