import mongoose from "mongoose";

const leaveRequestSchema = new mongoose.Schema({
  internId: { 
    type: String, 
    required: true 
  },
  type: {
    type: String,
    enum: ['Sick', 'Vacation', 'Personal'],
    required: true,
  },
  from: {
    type: Date,
    required: true,
  },
  to: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending', 
  },
});

const LeaveRequest = mongoose.models.LeaveRequest || mongoose.model('LeaveRequest', leaveRequestSchema);

export default LeaveRequest;
