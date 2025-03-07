import express from 'express';
import { createLeaveRequest, getPendingLeaveRequests, approveRejectLeave, getLeaveRequests  } from '../controllers/LeaveRequestController.js';
import userAuth from '../middleware/userAuth.js';
//import LeaveRequest from '../models/LeaveRequestModel.js';

const leaveRoutes = express.Router();

leaveRoutes.post('/apply-leave', userAuth, createLeaveRequest);

leaveRoutes.get('/get-leave-requests', userAuth, getLeaveRequests)

leaveRoutes.get('/admin/pending-leave',  getPendingLeaveRequests);

leaveRoutes.patch('/admin/approve-reject', approveRejectLeave );


export default leaveRoutes;









