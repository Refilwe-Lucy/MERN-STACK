export const DaysExpired = {
     after30days: new Date(Date.now() + 30 * 24 *  60 * 60 * 1000),
     after7days: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),


};
export const OTPExpiration = {
    verifyOTP: Date.now() + 24 * 60 * 60 * 1000,  
    resetOTP: Date.now() + 15 * 60 * 1000,         
  };
  export const maxAge = 7 * 24 * 60 * 60 * 1000;

