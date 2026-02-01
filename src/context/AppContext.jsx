import { createContext, useContext, useState } from "react";

const AppContext = createContext();
export const useAppContext = () => useContext(AppContext);

export const AppProvider = (props) => {
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

  const values = { jwtToken, setjwtToken, isJwtExist, setisJwtExist, isAdmin, setIsAdmin };

  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
};
