export const clearAuthCookies = (res) =>{
    res.clearCookie("jwt_token");
    res.clearCookie("refreshToken");
};