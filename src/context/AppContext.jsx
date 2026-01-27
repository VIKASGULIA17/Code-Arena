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

  const values = { jwtToken, setjwtToken, isJwtExist, setisJwtExist };

  return (
    <AppContext.Provider value={values}>{props.children}</AppContext.Provider>
  );
};
