import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = (props) => {

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [userDetails,setuserDetails] = useState(null);
  const [userProfile,setuserProfile] = useState(null);
  const [isLoggedIn,setisLoggedIn] = useState(()=>{
    return localStorage.getItem("jwtToken") != null;
  });

  const [jwtToken, setjwtToken] = useState(() => {
    return localStorage.getItem("jwtToken") || null;
  });
  const [isJwtExist, setisJwtExist] = useState(() => {
    return localStorage.getItem("jwtToken") != null;
  });

  const [isAdmin, setIsAdmin] = useState(() => {
    const token = localStorage.getItem("jwtToken");
    return token ? true : false;
  });

  const getUserData = async () => {
    
    if(isLoggedIn==false || !isJwtExist) {
      setuserDetails(null);
      return;
    }

    const res = await axios.get(`${BACKEND_URL}/user/currentUser`,{
      headers:{
        Authorization: `Bearer ${jwtToken}`
      }
    });

    if(res.data!=null && res.data!==undefined){
      setuserDetails(res.data);
    }
    else{
      setuserDetails(null);
    }
  }

  const getUserProfileData = async () => {
    try{
      const res = await axios.get(`${BACKEND_URL}/userProfile/get`,{
        headers:{
          Authorization : `Bearer ${jwtToken}`
        }
      })
      if(res.data.status===1){
        // console.log("User Profile Data : ");
        // console.log(res.data.data);
        setuserProfile(res.data.data);
      }
      else{
        setuserProfile(null);
      }
    }
    catch(e){
      throw new Error();
    }
  }

  useEffect(()=>{
    getUserData();
    getUserProfileData();
  },[isLoggedIn]);

  const values = { jwtToken, setjwtToken, isJwtExist, setisJwtExist, isAdmin, setIsAdmin,setuserDetails,setisLoggedIn,getUserData,userDetails,userProfile, getUserProfileData};

  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
};
