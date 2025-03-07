import jwt from 'jsonwebtoken';


const userAuth = async(req, res, next)=>{
    const token = req.cookies.token; 

     console.log('Token:', token); 

    if(!token){
        return res.json({success: false, message: 'Not Authorized. Login Again'})
    }
    
    try{
        
        const tokenDecoded =  jwt.verify(token, process.env.JWT_SECRET);

        console.log('Decoded Token:', tokenDecoded);
        if(tokenDecoded.id){

            req.user = {id: tokenDecoded.id};
        }else{
            return res.json({success: false, message: 'Not Authorized'})
        }
         next(); 

    }catch(error){
        res.json({success: false, message: error.message});

    }
}
export default userAuth;




