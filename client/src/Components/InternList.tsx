import React, { useEffect, useContext} from 'react';
import { AppContent } from '../context/AppContext';


const InternList: React.FC = () =>{
  const { internList = [], internLoading, internError, getIntern} = useContext(AppContent);

  useEffect(() =>{
    getIntern();
  }, []);

  if(internLoading) return <p>Loading interns...</p>

  if(internError) return <p className="text-red-500">{internError}</p>

  return(
    <div className="bg-white p-6 rounded shadow-xl">
      <h2 className="text-2xl mb-5">Intern List</h2>
        {internList.length === 0 ? (
            <p> No interns found</p>
        ): (
            
          <table className="min-w-full table-auto border-collapse">
          <thead className="">
            <tr className="border-b ">
              <th className="px-4 py-2 text-left border-r border-1">Full Names</th>
              <th className="px-4 py-2 text-left border-r border-1">Email Address</th>
              <th className="px-4 py-2 text-left border-r border-1">Date of birth</th>
              <th className="px-4 py-2 text-left border-r border-1">Employee ID</th>
              <th className="px-4 py-2 text-left border-r border-1">Gender</th>
              <th className="px-4 py-2 text-left border-r border-1">Marital Status</th>
              </tr>
              </thead>
              <tbody>
              {internList.map((intern, index) =>(
                 <tr key={index} className="border-b">
                 <td className="px-4 py-2 border-1">{intern.name}</td>
                 <td className="px-4 py-2 border-r">{intern.internId}</td>
                 <td className="px-4 py-2 border-r">{new Date(intern.dob).toLocaleDateString()}</td>
                 <td className="px-4 py-2 border-r">{intern.gender}</td>
                 <td className="px-4 py-2 border-r">{intern.maritalStatus}</td>
                 <td className="px-4 py-2 border-r">{intern.email}</td>
               </tr>
              ))}
             </tbody>
          </table>
       )}

    </div>
  );
};
export default InternList;


