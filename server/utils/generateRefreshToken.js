import crypto from "crypto";

const generateRefreshToken = async(user) =>{
    const random = crypto.randomBytes(64);
    const refreshToken = random.toString("hex");


    return refreshToken;
}

export default generateRefreshToken;