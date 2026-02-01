import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = (props) => {

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [userDetails,setuserDetails] = useState(null);
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

  useEffect(()=>{
    getUserData();
  },[isLoggedIn]);

  const values = { jwtToken, setjwtToken, isJwtExist, setisJwtExist, isAdmin, setIsAdmin,setuserDetails,setisLoggedIn,getUserData,userDetails };

  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
};
