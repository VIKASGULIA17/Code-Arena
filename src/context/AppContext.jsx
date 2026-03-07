import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = (props) => {

  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [userDetails,setuserDetails] = useState(null);
  const [userProfile,setuserProfile] = useState(null);
  const [username,setUsername] = useState(null);
  const [allProblem,setallProblems] = useState(null);
  const [allContest,setallContest] = useState(null);
  const [users, setUsers] = useState(null);
  const [totalActiveUsers,settotalActiveUsers] = useState(0);
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
      // console.log(res.data.username);
      setUsername(res.data.username);
      setuserDetails(res.data);
    }
    else{
      setuserDetails(null);
    }
  }

  async function showAllProblems(){
      const result = await axios.get(`${BACKEND_URL}/problem/fetch`,{
        headers : {
          Authorization : `Bearer ${jwtToken}`
        }
      })
      if(result.data!=null){
        console.log(result.data);
        setallProblems(result.data);
      }
      else{
        setallProblems(null);
      }
    }


    async function showAllContest(){
      const result = await axios.get(`${BACKEND_URL}/public/fetchAllContest`,{
        headers : {
          Authorization : `Bearer ${jwtToken}`
        }
      })
      if(result.data!=null){
        // console.log(result.data);
        setallContest(result.data);
      }
      else{
        setallContest(null);
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
      setuserProfile(null);
    }
  }

  async function getAllUsers() {
      const result = await axios.get(`${BACKEND_URL}/admin/fetchUsers`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setUsers(result.data);
      if(result.data!=null){
        settotalActiveUsers(result.data.length);
      }
      else{
        settotalActiveUsers(0);
      }
    }

  useEffect(()=>{
    getUserData();
    getUserProfileData();
    showAllProblems();
    showAllContest();
    getAllUsers();
  },[isLoggedIn]);

  const values = { jwtToken, setjwtToken, isJwtExist, setisJwtExist, isAdmin, setIsAdmin,setuserDetails,setisLoggedIn,getUserData,userDetails,userProfile, getUserProfileData,username,allProblem,allContest,showAllContest,showAllProblems,getAllUsers,users,totalActiveUsers};

  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
};
