import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = (props) => {
  const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
  const [userDetails, setuserDetails] = useState(null);
  const [userProfile, setuserProfile] = useState(null);
  const [username, setUsername] = useState(null);
  const [avatar, setAvatar] = useState(null);
  const [allProblem, setallProblems] = useState(null);
  const [allContest, setallContest] = useState(null);
  const [users, setUsers] = useState(null);
  const [totalActiveUsers, settotalActiveUsers] = useState(0);
  const [isLoggedIn, setisLoggedIn] = useState(() => {
    return localStorage.getItem("jwtToken") != null;
  });

  const [isTokenExpired, setisTokenExpired] = useState(false);

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
    if (isLoggedIn == false || !isJwtExist) {
      setuserDetails(null);
      return;
    }

    const res = await axios.get(`${BACKEND_URL}/user/currentUser`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });

    if (res.data != null && res.data !== undefined) {
      console.log("here");
      console.log(res.data);
      setUsername(res.data.username);
      setuserDetails(res.data);
    } else {
      setuserDetails(null);
    }
  };

  async function showAllProblems() {
    const result = await axios.get(`${BACKEND_URL}/public/fetchAllProblem`);
    if (result.data != null) {
      // console.log(result.data);
      setallProblems(result.data);
    } else {
      setallProblems(null);
    }
  }

  async function showAllContest() {
    const result = await axios.get(`${BACKEND_URL}/public/fetchAllContest`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    if (result.data != null) {
      // console.log(result.data);
      setallContest(result.data);
    } else {
      setallContest(null);
    }
  }

  const getUserProfileData = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/userProfile/get`, {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      if (res.data.status === 1) {
        // console.log("User Profile Data : ");
        // console.log(res.data.data);
        setuserProfile(res.data.data);
        if (res.data.data?.avatarLink) {
          setAvatar(res.data.data.avatarLink);
        }
      } else {
        setuserProfile(null);
      }
    } catch (e) {
      setuserProfile(null);
    }
  };

  async function getAllUsers() {
    const result = await axios.get(`${BACKEND_URL}/admin/fetchUsers`, {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    });
    setUsers(result.data);
    if (result.data != null) {
      settotalActiveUsers(result.data.length);
    } else {
      settotalActiveUsers(0);
    }
  }

  useEffect(() => {
    getUserData();
    getUserProfileData();
    showAllProblems();
    showAllContest();
    getAllUsers();
  }, [isLoggedIn]);

  useEffect(() => {
    const checkToken = () => {
      // console.log("check Token calling...");
      const token = localStorage.getItem("jwtToken") || null;
      console.log("token : ",token);

      if (token) {
        const { exp } = jwtDecode(token);
        const expiryTime = new Date(exp * 1000);
        const currentTime = new Date();
        // console.log("current time : ",currentTime);
        // console.log("expiry time : ",expiryTime);
        if (currentTime >= expiryTime) {
          localStorage.removeItem("jwtToken");
          setjwtToken(null);
          setisJwtExist(false);
          setisTokenExpired(true);
          setisLoggedIn(false);
          setuserDetails(null);
          setuserProfile(null);
          setUsername(null);
          setAvatar(null);
          setallProblems(null);
          setallContest(null);
          setUsers(null);
          settotalActiveUsers(0);
          // console.log("token expired");
        } else {
          // console.log("Token is not expired yet.");
          setisTokenExpired(false);
        }
      } else {
        // console.log("No token found in localStorage.");
        setisTokenExpired(true);
      }
    };

    checkToken(); // on initial load

    const interval = setInterval(checkToken, 60 * 1000); // every minute

    return () => clearInterval(interval);
  }, []);

  const values = {
    jwtToken,
    setjwtToken,
    isJwtExist,
    setisJwtExist,
    isAdmin,
    setIsAdmin,
    setuserDetails,
    setisLoggedIn,
    getUserData,
    userDetails,
    userProfile,
    getUserProfileData,
    username,
    allProblem,
    allContest,
    showAllContest,
    showAllProblems,
    getAllUsers,
    users,
    totalActiveUsers,
    avatar,
    setAvatar,
    setisTokenExpired,
  };

  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
};
