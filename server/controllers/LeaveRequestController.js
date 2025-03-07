import LeaveRequest from "../models/LeaveRequestModel.js";
//import userModel from "../models/userModels.js";

export const createLeaveRequest = async (req, res) =>{
    try{

        const { type, from, to, description } = req.body;

        const internId = req.user.id;

        const newLeaveRequest = new LeaveRequest({
            internId,
            type,
            from,
            to,
            description,
           
        });

          await newLeaveRequest.save();

          return res.status(201).json({success: true, message: 'Application submitted'});
       

    }catch(error){

        return res.status(500).json({success: false, message: 'Error submitting application'});
        //console.error(error.stack);
    }

};

export const getLeaveRequests = async(req, res) =>{
  try{
    const internId  = req.user.id;

    const leaveRequest = await LeaveRequest.find({ internId });

    if(leaveRequest.length === 0){
      return res.status(404).json({success: true, message: 'No leave found for this intern.'});
    }

    res.status(200).json({ success: true, leaveRequest });
  }catch(error){
    console.status(500).json({ success: false, message: 'Error fetching leave requests' })
  }
}

export const getPendingLeaveRequests = async (req, res) => {
    try {
   
      const pendingRequests = await LeaveRequest.find({ status: 'Pending' }).populate('internId');
  
      if (!pendingRequests === 0) {
        return res.status(404).json({ message: "No pending leave requests found." });
      }
  
      res.status(200).json({ success: true, leaveRequests: pendingRequests });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching pending leave requests" });
    }
  };

export const approveRejectLeave  = async (req, res) =>{
   
    try {
        const { leaveId, action } = req.body;
    
     
        if (action !== 'approve' && action !== 'reject') {
          return res.status(400).json({ message: "Invalid action. Use 'approve' or 'reject'." });
        }
    

        const leaveRequest = await LeaveRequest.findById(leaveId);
    
        if (!leaveRequest) {
          return res.status(404).json({ message: "Leave request not found." });
        }

        leaveRequest.status = action === 'approve' ? 'Approved' : 'Rejected';
    
    
        await leaveRequest.save();
    
        res.status(200).json({ message: `Leave request ${action}d successfully.` });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error processing leave request" });
      }

    
}


