import jwt from  "jsonwebtoken"

const generateAccessToken = (user) =>{
    const jwtOptions = {
        expires: "15min",
        issuer: "Lucy.com",
        audience: "API V1",
    }

    return jwt.sign(
        {
        id: user._id,
        },
        user.jwt_secret, jwtOptions
);
}
export default generateAccessToken;