/*import nodemailer from 'nodemailer';
import bcrypt from 'bcryptjs';
import userModel from '../models/userModels.js';


 export const createAdmin = async(req, res) =>{

  const { email, password, role, name } = req.body;
  

   if(!email || !password || !role || !name){
    return res.json({success: false, message: 'Please provide valid email, password or  role'});
}

    try{
          const adminName = process.env.ADMIN_FULLNAMES;
          const adminEmail = process.env.ADMIN_EMAIL;
          const adminPassword = process.env.ADMIN_PASS;

          if (!adminName || !adminEmail || !adminPassword) {
            return res.json({ success: false, message: 'Incorrect Credentials' });
          }

          const hashedPassword = await bcrypt.hash(adminPassword, 10);

            const admin = new userModel({
            email: adminEmail,
            password: hashedPassword ,
            name: adminName,
            role: 'admin',
          });

            await admin.save();

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: process.env.SENDER_EMAIL,
                    
                
                },
            });
            const mailOption = {
                from: process.env.SENDER_EMAIL,
                to: admin.email,
                subject: `Hello Admin, \n\nYour login credentials are:\nEmail: ${adminEmail}\nPassword: ${adminPassword}\n\nPlease change your password after your first login.`
            };
            transporter.sendMail(mailOption, (error, info) => {
                if (error) {
                  return res.json({success: false, message: 'error occured'});
                }
                res.json({success: true, message: 'Email sent:' + info.response});
               // console.log('Email sent: ' + info.response);
              });
              res.json({success: true, message: 'Admin account created and credentials sent to email'});
    
        }catch(error){
            res.json({success: false, message: error.message});

        }  
    }
        */
    //import nodemailer from 'nodemailer';
    import bcrypt from 'bcryptjs';
    import  jwt  from 'jsonwebtoken';
    import userModel from '../models/userModels.js';
    import transporter from '../config/nodeMailer.js';



    export const createAdmin = async (req, res) => {
      const { name, email, password, role } = req.body;

      const getInitials = (name) => {
        return name
            .split(' ')
            .map(word => word.charAt(0).toUpperCase())
            .join('');
    };
    
    

      if (!email || !password || !role || !name) {
        return res.json({ success: false, message: 'Missing Details' });
      }
    
      try {
    
        const adminName = process.env.ADMIN_FULLNAMES;
        const adminEmail = process.env.ADMIN_EMAIL;
        const adminPassword = process.env.EMAIL_PASS;

        if (!adminName || !adminEmail || !adminPassword) {
          return res.json({ success: false, message: 'Admin credentials missing in environment variables' });
        }

         const existingUser = await userModel.findOne({email}); //check the existing user by email, checks if the user exists
         
             if(existingUser){
                return res.json({success: false, message: 'User already exists'}) //if the user already exists return the message: return user alraedy exist
             }

         if(name !== adminName ){
          return res.json({success: false, message: 'Incorrect name'});
        }
        if(email !== adminEmail){
          return res.json({success: false, message: 'Incorrect email'});
        } 
        if(password !== adminPassword){
          return res.json({success: false, message: 'Incorrect Password'});
        }
        if(role !== 'admin'){
          return res.json({success: false, message: 'Incorrect role'})
          
        }

        

        const initials = getInitials(name);

       
        const hashedPassword = await bcrypt.hash(adminPassword , 10);
    
        
        const admin = new userModel({
          email: adminEmail,
          password: hashedPassword,
          name: adminName,
          role: 'admin', 
          initials
        });
    
        await admin.save();

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});

        res.cookie('token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
          maxAge: 7 * 24 * 60  * 60 * 1000 
      });
        
       
        
        /*const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: process.env.SENDER_EMAIL,  
            pass: process.env.SMTP_PASS,    
          },
        });
        */
    
  
        const mailOptions = {
          from: process.env.SENDER_EMAIL, 
          to: admin.email,                 
          subject: `Hello Admin.`,
           text: `Hello Admin, \n\nYour login credentials are:\nEmail: ${adminEmail}\nPassword: ${adminPassword}\n\nPlease change your password after your first login.`
        };
    
        await transporter.sendMail(mailOptions);
            

        return res.json({success: true, message:  `${role.charAt(0).toUpperCase() + role.slice(1)} login successful`, initials: initials})
    
      } catch (error) {
      
        res.json({ success: false, message: error.message });
      }
    };


    export const updateAdminProfile = async (req, res) => {
      const getInitials = (name) => {
          return name
              .split(' ')
              .map(word => word.charAt(0).toUpperCase())
              .join('');
      };
  
      const { email } = req.body;
      const user = await userModel.findOne({ email });
  
      if (user) {
          
          user.name = req.body.name || user.name;
          user.email = req.body.email || user.email;
  
          
          if (req.body.password) {
            const hashedPassword = await bcrypt.hash(req.body.password, 10);
            user.password = hashedPassword;
          }
  
          
          if (user.name) {
              const initials = getInitials(user.name);  
              user.initials = initials; 
          }
  
          
          const updatedUser = await user.save();  
  
          
          res.json({
              email: updatedUser.email,
              name: updatedUser.name,
              initials: updatedUser.initials  
          });
      } else {
          res.status(404).json({ success: false, message: "User not found!" });
      }
  };
  